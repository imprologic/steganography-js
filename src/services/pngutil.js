import { PNG } from 'pngjs/browser';
import { getHash, encrypt, decrypt } from './cipher';

import { 
	bytesToBits,
	bitsToBytes
} from './bitlib';

import { findValues, setLsbWithMask, getLsbWithMask } from './arraylib';
import { stringToBytes, bytesToString } from './stringlib';


/**
 * Convert an array buffer (as received from a file upload) to a PNG structure
 * @param {ArrayBuffer} arrayBuffer 
 * @returns {Promise<PNG>}
 */
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


/**
 * Writes a PNG structure to an ArrayBuffer
 * @param {PNG} png 
 * @returns {ArrayBuffer}
 */
export const pngToBuffer = (png) => {
	return PNG.sync.write(png);
}


/**
 * Return the hash of the password
 * Online tool: https://emn178.github.io/online-tools/sha256.html
 * @param {string} password 
 * @returns {number[]}
 */
export const getPrefix = (password) => {
	return getHash(password);
}


/**
 * Return the hash of the reversed password
 * Online tools:
 * - https://codebeautify.org/reverse-string
 * - https://emn178.github.io/online-tools/sha256.html
 * @param {string} password 
 * @returns {number[]}
 */
export const getSuffix = (password) => {
	return getHash(password.split('').reverse().join(''));
}


/**
 * Wrap the encrypted message with a prefix and a suffix and return as a byte array
 * @param {string} message 
 * @param {string} password 
 * @returns {number[]}
 */
export const getWrappedBytes = (text, password) => {
	const prefix = getPrefix(password);
	const suffix = getSuffix(password);
	return [].concat(
		prefix,
		stringToBytes(encrypt(text, password)),
		suffix,
	);
}


/**
 * Write an encrypted text with prefix and suffix to the LSBs of a PNG data array.
 * Skips the transparency bytes.
 * @param {Uint8Array} pngData 
 * @param {string} text 
 * @param {string} password 
 */
export const writeToPngData = (pngData, text, password) => {
	const wrappedBytes = getWrappedBytes(text, password);
	const bits = bytesToBits(wrappedBytes);
	const bitCount = bits.length;
	console.log('bitCount:', bitCount);
	const neededPixels = Math.ceil(bitCount / 3);
	console.log('neededPixels:', neededPixels);
	const actualPixels = pngData.length / 4;
	console.log('actualPixels:', actualPixels);
	if (neededPixels > actualPixels) {
		throw new Error(`PNG should have at least ${neededPixels} pixels, the actual pixel count is ${actualPixels}.`);
	}
	// TODO: Get the index of an aria with high color variance.
	// TODO: Move this to a separate function to make it testable
	const startPixel = Math.round((actualPixels - neededPixels) * Math.random()); 
	console.log('startPixel:', startPixel);
	const startIndex = startPixel * 4;
	console.log('startIndex:', startIndex);
	setLsbWithMask(pngData, startIndex, bits, [1, 1, 1, 0]);
};


/**
 * Read an encrypted text with prefix and suffix from the LSBs of a PNG data array.
 * Skips the transparency bytes.
 * @param {Uint8Array} pngData 
 * @param {string} password 
 */
export const readFromPngData = (pngData, password) => {
	const bits = getLsbWithMask(pngData, [1, 1, 1, 0]);
	// find the prefix
	const prefix = bytesToBits(getPrefix(password));
	const prefixIndex = findValues(bits, prefix);
	console.log('prefixIndex:', prefixIndex);
	if (prefixIndex === -1) {
		throw new Error('Prefix not found');
	}
	// find the suffix
	const suffix = bytesToBits(getSuffix(password));
	const suffixIndex = findValues(bits, suffix);
	console.log('suffixIndex:', suffixIndex);
	if (suffixIndex <= 0) {
		throw new Error('Suffix not found');
	}
	// extract the cipher
	const cipherStart = prefixIndex + prefix.length;
	const cipherEnd = suffixIndex;
	const cipherBits = bits.slice(cipherStart, cipherEnd);
	const cipher = bytesToString(bitsToBytes(cipherBits));
	return decrypt(cipher, password);
};


/**
 * Takes an array buffer, decodes it as PNG, embeds the text and then encodes the array buffer back to PNG.
 * @param {ArrayBuffer} arrayBuffer Image bytes in PNG format
 * @param {string} text Byte array
 * @param {string} password String
 * @returns {Promise<Buffer>} Buffer containing the compressed PNG.
 * TODO: Make sure the message + terminator does not overflow the PNG buffer
 */
export const embedText = async (arrayBuffer, text, password) => {
	const png = await arrayBufferToPng(arrayBuffer);
	writeToPngData(png.data, text, password);
	return pngToBuffer(png);
}



/**
 * Extract a text from an array buffer representing a compressed PNG file
 * @param {ArrayBuffer} arrayBuffer 
 * @param {string} password 
 * @returns {Promise<string>}
 */
export const extractText = async (arrayBuffer, password) => {
	const png = await arrayBufferToPng(arrayBuffer);
	return readFromPngData(png.data, password);
}


/**
 * Download a file by creating a Blob and injecting it in an object URL
 * @param {Buffer} buffer The buffer containing the file data
 * @param {*} fileName The name of the file to download
 * @param {*} mimeType The content type of the file to download
 */
export const downloadBlob = (buffer, fileName, mimeType) => {
	const blob = new Blob([buffer], {
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
 * @param {string} data 
 * @param {string} fileName 
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
