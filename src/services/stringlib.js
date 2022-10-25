import { bytesToBits } from './bitlib';

/**
 * Convert a string to an array of bytes
 * @param {string} text The string to convert
 * @returns {number[]} An array of bytes representing the UTF-8 encoding of the string
 */
export const stringToBytes = (text) => {
	const utf8Encode = new TextEncoder();
	return Array.from(utf8Encode.encode(text));
};


/**
 * Convert an array of bytes to a string
 * @param {number[]} bytes The array of bytes to convert
 * @returns {string} An string representing the UTF-8 decoding of the byte array
 */
export const bytesToString = (bytes) => {
	const utf8EDecoder = new TextDecoder();
	return utf8EDecoder.decode(new Uint8Array(bytes));
};


/**
 * Convert a string to a bit array
 * @param {string} text The text to convert
 * @returns {number[]} An array of bits
 */
export const stringToBits = (text) => {
	return bytesToBits(stringToBytes(text));
};
