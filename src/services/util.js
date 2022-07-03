import { PNG } from 'pngjs/browser';
import sha256 from 'crypto-js/sha256';

export const arrayBufferToPng = (arrayBuffer) => {
	const png = new PNG({ filterType: 4 });
	return new Promise(
		(resolve, reject) => {
			png.parse(
				arrayBuffer,
				(error, image) => error ? reject(error) : resolve(image)
			);
		}
	);
};


export const pngToBuffer = (png) => {
	return PNG.sync.write(png);
}


export const stringToBytes = (text) => {
	const utf8Encode = new TextEncoder();
	return Array.from(utf8Encode.encode(text));
};


export const bytesToString = (bytes) => {
	const utf8EDecoder = new TextDecoder();
	return utf8EDecoder.decode(new Uint8Array(bytes));
};


export const byteToBits = (byte) => {
	return [
		(byte >>> 7) & 1,
		(byte >>> 6) & 1,
		(byte >>> 5) & 1,
		(byte >>> 4) & 1,
		(byte >>> 3) & 1,
		(byte >>> 2) & 1,
		(byte >>> 1) & 1,
		byte & 1,
	];
};


/**
 * Converts an array of 8 bits to a byte.
 */
export const bitsToByte = (bits) => {
	return (bits[0] << 7) | 
		(bits[1] << 6) | 
		(bits[2] << 5) | 
		(bits[3] << 4) | 
		(bits[4] << 3) | 
		(bits[5] << 2) | 
		(bits[6] << 1) | 
		bits[7]
		;
};


export const stringToBits = (text) => {
	const nested = stringToBytes(text).map(byteToBits);
	return [].concat(...nested);
};



export const writeToArrayLsb = (data, message, startIndex) => {
	let index = startIndex;
	// write the actual message
	for (const byte of message) {
		const bits = byteToBits(byte);
		for (const bit of bits) {
			data[index] = (data[index] & 0xFE) | bit;
			index++;
		}
	}
	return index;
};


/**
 * Reads the embedded content from an array.
 * @param {*} data The array providing the content.
 * @param {*} endIndex The content's length. Must be a multiple of 8.
 */
export const readFromArrayLsb = (data, endIndex) => {
	if (endIndex % 8 !== 0) {
		throw new Error(`readFromArrayLsb: Argument endIndex should be a multiple of 8. Received ${endIndex}`);
	}
	const bytes = [];
	let bits = [];
	for (let index = 0; index < endIndex; index++) {
		const lsb = data[index] & 0x01;
		bits.push(lsb);
		if (bits.length === 8) {
			bytes.push(bitsToByte(bits));
			bits = [];
		}
	}
	if (bits.length > 0) {
		bytes.push(bitsToByte(bits));
	}
	return bytes;
};


/**
 * Takes an array buffer, decodes it as PNG, embeds the text and then encodes the array buffer back to PNG.
 * @param {*} arrayBuffer Image bytes in PNG format
 * @param {*} text Byte array
 * TODO: Make sure the message + terminator does not overflow the PNG buffer
 */
export const embedMessage = async (arrayBuffer, message, pass) => {
	const png = await arrayBufferToPng(arrayBuffer);
	const data = png.data;
	// write the data and return the index
	const terminatorIndex = writeToArrayLsb(data, message, 0);
	// write the terminator
	const terminator = getTerminator(pass);
	writeToArrayLsb(data, terminator, terminatorIndex);
	// return a PNG buffer
	return pngToBuffer(png);
}


export const downloadBlob = (data, fileName, mimeType) => {
	const blob = new Blob([data], {
		type: mimeType
	});
	const url = window.URL.createObjectURL(blob);
	downloadURL(url, fileName);
	setTimeout(function () {
		return window.URL.revokeObjectURL(url);
	}, 1000);
};


export const downloadURL = (data, fileName) => {
	const a = document.createElement('a');
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = 'display: none';
	a.click();
	a.remove();
};


/**
 * Returns the sha2 hash of a password as an array of bytes.
 * @param {*} pass 
 */
export const getTerminator = (pass) => {
	const nested = sha256(pass).words.map(
		word => [
			word >>> 24,
			(word >>> 16) & 0xff,
			(word >>> 8) & 0xff,
			word & 0xff,
		]
	);
	return [].concat(...nested);
};