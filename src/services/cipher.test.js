import { 
	getHash,
	encrypt, 
	decrypt,
} from './cipher';


/**
 * Convert a byte array to its hex string representation 
 * @param {number[]} bytes 
 * @returns {string}
 */
export const bytesToHexString = (bytes) => {
	return bytes.map(
		byte => (byte).toString(16).padStart(2, '0')
	).join('');
};


test('getHash', () => {
	const pass = 'Ragnar Danneskjöld';
	const result = bytesToHexString(getHash(pass));
	expect(result).toEqual('6fe1371a219fed273543b619860b9b44c893060438bcde681837783a5eae9c73');
});



test('encrypt & decrypt', () => {
	const message = 'Atlas Shrugged';
	const key = 'Ayn Rand';
	
	// Encrypt
	const ciphertext = encrypt(message, key);
	
	// Decrypt
	const result = decrypt(ciphertext, key);
	expect(result).toEqual(message);
});