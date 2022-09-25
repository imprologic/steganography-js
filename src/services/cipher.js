import { AES, enc } from 'crypto-js';
import sha256 from 'crypto-js/sha256';

/**
 * Return the sha2 hash of a text as an array of bytes.
 * Online tool: https://emn178.github.io/online-tools/sha256.html
 * @param {string} text Text to hash
 * @returns {number[]} Array of bytes representing the hash
 */
export const getHash = (text) => {
	const nested = sha256(text).words.map(
		word => [
			word >>> 24,
			(word >>> 16) & 0xff,
			(word >>> 8) & 0xff,
			word & 0xff,
		]
	);
	return [].concat(...nested);
};


/**
 * Encrypt a message using AES.
 * @param {string} message 
 * @param {string} key 
 * @returns {string}
 */
export const encrypt = (message, key) => AES.encrypt(JSON.stringify(message), key).toString();


/**
 * Decript a ciphertext.
 * @param {string} ciphertext 
 * @param {string} key 
 * @returns {string}
 */
export const decrypt = (ciphertext, key) => {
	const bytes = AES.decrypt(ciphertext, key);
	return JSON.parse(bytes.toString(enc.Utf8));
};