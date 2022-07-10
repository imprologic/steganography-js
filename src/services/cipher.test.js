import { encrypt, decrypt } from './cipher';


test('encrypt & decrypt', () => {
	const message = 'Atlas Shrugged';
	const key = 'Ayn Rand';
	
	// Encrypt
	const ciphertext = encrypt(message, key);
	
	// Decrypt
	const result = decrypt(ciphertext, key);
	expect(result).toEqual(message);
});