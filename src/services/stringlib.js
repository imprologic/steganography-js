import { byteToBits } from './bitlib';

/**
 * Convert a string to an array of bytes
 * @param {string} text The string to convert
 * @returns {number[]} An array of bytes representing the UTF-8 encoding of the string
 */
export const stringToBytes = (text) => {
	const utf8Encode = new TextEncoder();
	return Array.from(utf8Encode.encode(text));
};


export const bytesToString = (bytes) => {
	const utf8EDecoder = new TextDecoder();
	return utf8EDecoder.decode(new Uint8Array(bytes));
};



export const stringToBits = (text) => {
	const nested = stringToBytes(text).map(byteToBits);
	return [].concat(...nested);
};
