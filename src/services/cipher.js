import { AES, enc } from 'crypto-js';


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