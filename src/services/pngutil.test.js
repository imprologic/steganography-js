import {
	getPrefix, getSuffix, getWrappedBytes, writeToPngData
} from './pngutil';

import {
	bytesToHexString
} from './cipher.test';
import { decrypt } from './cipher';
import { bytesToString } from './stringlib';
import { getLsbWithMask, findValues } from './arraylib';
import { bitsToBytes, bytesToBits } from './bitlib';


/**
 * 
 * @param {number} length 
 */
export const makePngData = (length) => {
	return Uint8Array.from(
		{ length },
		(_, i) => i % 256
	);
};


test('getPrefix', () => {
	const pass = 'Ragnar Danneskjöld';
	const result = bytesToHexString(getPrefix(pass));
	expect(result).toEqual('6fe1371a219fed273543b619860b9b44c893060438bcde681837783a5eae9c73');
});


test('getSuffix', () => {
	const pass = 'Ragnar Danneskjöld';
	const result = getSuffix(pass).map(
		byte => (byte).toString(16).padStart(2, '0')
	).join('');
	expect(result).toEqual('196717afcf3b05ce5be9467963b0bc8bacd0baedbbbbb23e314d0a0239e29680');
});



test('getWrappedBytes', () => {
	const text = 'Atlas Shrugged';
	const password = 'Ragnar Danneskjöld';
	const result = getWrappedBytes(text, password).toString();
	const prefix = getPrefix(password).toString();
	const suffix = getSuffix(password).toString();
	expect(result).toContain(prefix);
	expect(result).toContain(suffix);
	const cipher = bytesToString(result.replace(prefix + ',', '').replace(',' + suffix, '').split(',').map(x => parseInt(x, 10)));
	expect(decrypt(cipher, password)).toEqual(text);
});


test('writeToPngData', () => {
	const text = 'Who is John Galt?';
	const password = 'Invent0r';
	const wrappedBytes = getWrappedBytes(text, password);
	const pixelsNeeded = Math.ceil(wrappedBytes.length * 8 / 3);
	const pngData = makePngData(pixelsNeeded * 4);
	writeToPngData(pngData, text, password);
	const bits = getLsbWithMask(pngData, [1, 1, 1, 0]);
	// find the prefix
	const prefix = bytesToBits(getPrefix(password));
	const prefixIndex = findValues(bits, prefix);
	expect(prefixIndex).toBeGreaterThan(-1);
	// find the suffix
	const suffix = bytesToBits(getSuffix(password));
	const suffixIndex = findValues(bits, suffix);
	expect(suffixIndex).toBeGreaterThan(0);
	// extract the cipher
	const cipherStart = prefixIndex + prefix.length;
	const cipherEnd = suffixIndex;
	const cipherBits = bits.slice(cipherStart, cipherEnd);
	const cipher = bytesToString(bitsToBytes(cipherBits));
	const result = decrypt(cipher, password);
	expect(result).toEqual(text);
});




