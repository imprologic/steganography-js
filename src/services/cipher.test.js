import { 
	getHash,
	encrypt, 
	decrypt,
} from './cipher';


test('getHash', () => {
	const pass = 'Ragnar Danneskjöld';
	const result = getHash(pass).map(
		byte => (byte).toString(16).padStart(2, '0')
	).join('');
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