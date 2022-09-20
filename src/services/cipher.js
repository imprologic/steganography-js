import { AES, enc } from 'crypto-js';
import sha256 from 'crypto-js/sha256';

/**
 * Returns the sha2 hash of a password as an array of bytes.
 * @param {String} text 
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
 * @param {String} message 
 * @param {String} key 
 * @returns {String}
 */
export const encrypt = (message, key) => AES.encrypt(JSON.stringify(message), key).toString();


/**
 * Decript a ciphertext.
 * @param {String} ciphertext 
 * @param {String} key 
 * @returns {String}
 */
export const decrypt = (ciphertext, key) => {
	const bytes = AES.decrypt(ciphertext, key);
	return JSON.parse(bytes.toString(enc.Utf8));
};