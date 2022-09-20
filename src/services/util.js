import { PNG } from 'pngjs/browser';
import { getHash } from './cipher';

import { 
	byteToBits, 
	bitsToByte 
} from './bitlib';

import { findValues } from './arraylib';



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
 * @param {*} pass String
 * TODO: Make sure the message + terminator does not overflow the PNG buffer
 */
export const embedMessage = async (arrayBuffer, message, pass) => {
	const png = await arrayBufferToPng(arrayBuffer);
	const data = png.data;
	// write the data and return the index
	const terminatorIndex = writeToArrayLsb(data, message, 0);
	// write the terminator
	const terminator = getHash(pass);
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


/**
 * Download a file from a base64 URL.
 * @param {String} data 
 * @param {String} fileName 
 */
export const downloadURL = (data, fileName) => {
	const a = document.createElement('a');
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = 'display: none';
	a.click();
	a.remove();
};





export const extractMessage = async (arrayBuffer, pass) => {
	const png = await arrayBufferToPng(arrayBuffer);
	const data = readFromArrayLsb(png.data, png.data.length);
	console.log('data', data);
	const terminator = getHash(pass);
	console.log('terminator', terminator);
	const terminatorIndex = findValues(data, terminator);
	if (terminatorIndex === -1) {
		throw new Error('Could not extract embedded message. Please check your password.');
	}
	return data.slice(0, terminatorIndex);
}
