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


export const stringToBits = (text) => {
	const nested = stringToBytes(text).map(byteToBits);
	return [].concat(...nested);
};


/**
 * Takes an array buffer, decodes it as PNG, embeds the text and then encodes the array buffer back to PNG.
 * @param {*} arrayBuffer Image bytes in PNG format
 * @param {*} text Byte array
 */
export const embedMessage = async (arrayBuffer, message) => {
	const png = await arrayBufferToPng(arrayBuffer);
	const data = png.data;
	let index = 0;
	for (const byte of message) {
		const bits = byteToBits(byte);
		for (const bit of bits) {
			data[index] = (data[index] & 0xFE) | bit;
			index++;
		}
	}
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