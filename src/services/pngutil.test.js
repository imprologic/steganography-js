import {
	getPrefix, 
	getSuffix, 
	getWrappedBytes, 
	writeToPngData, 
	pngToBuffer, 
	arrayBufferToPng, 
	embedText, 
	extractText
} from './pngutil';

import {
	bytesToHexString
} from './cipher.test';
import { decrypt } from './cipher';
import { bytesToString } from './stringlib';
import { getLsbWithMask, findValues } from './arraylib';
import { bitsToBytes, bytesToBits } from './bitlib';
import { PNG } from 'pngjs';


/**
 * Create a Uint8Array of specified size.
 * @param {number} pixelCount The number of pixels in this PNG.
 */
const makePngData = (pixelCount) => {
	return Uint8Array.from(
		{ length: pixelCount * 4 },
		(_, i) => i % 256
	);
};


const makePng = (width, height) => {
	const png = new PNG({
		width,
		height
	});
	png.data = makePngData(width * height);
	return png;
};



test('pngToBuffer & arrayBufferToPng', async () => {
	const png1 = makePng(5, 2);
	const buffer = pngToBuffer(png1);
	expect(buffer).toBeTruthy();
	const png2 = await arrayBufferToPng(buffer);
	expect(png2).toBeTruthy();
	expect(png2.width).toEqual(png1.width);
	expect(png2.height).toEqual(png1.height);
	expect(png2.data.length).toEqual(png1.data.length);
	for (let index = 0; index < png1.length; index++) {
		expect(png2.data[index]).toEqual(png1.data[index]);
	}
});



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
	const pngData = makePngData(pixelsNeeded);
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


test('Embed & extract', async () => {
	const text = 'Who is John Galt?';
	const password = 'Invent0r';
	const wrappedBytes = getWrappedBytes(text, password);
	const pixelsNeeded = Math.ceil(wrappedBytes.length * 8 / 3);
	const width = Math.ceil(Math.sqrt(pixelsNeeded));
	const height = Math.ceil(pixelsNeeded / width);
	const png = makePng(width, height);
	const buffer = pngToBuffer(png);
	const bufferWithText = await embedText(buffer, text, password);
	const extractedText = await extractText(bufferWithText, password);
	expect(extractedText).toEqual(text);
});

