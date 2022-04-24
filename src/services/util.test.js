import { PNG } from 'pngjs/browser';
import { stringToBytes, byteToBits, pngToBuffer, embedMessage, arrayBufferToPng, stringToBits, getTerminator } from './util';


test('stringToBytes', () => {
	const bytes = stringToBytes('AB');
	const expected = Uint8Array.from([65, 66]);
	expect(bytes.toString()).toEqual(expected.toString());	// Jest sees `expected` as an object rather than an array
});


test('byteToBits - all ones', () => {
	const bits = byteToBits(255);
	expect(bits).toEqual([1,1,1,1,1,1,1,1]);
});


test('byteToBits - all zeros', () => {
	const bits = byteToBits(0);
	expect(bits).toEqual([0,0,0,0,0,0,0,0]);
});


test('byteToBits - ones and zeros', () => {
	const bits = byteToBits(parseInt('10101010', 2));
	expect(bits).toEqual([1,0,1,0,1,0,1,0]);
});


test('byteToBits - zeros and ones', () => {
	const bits = byteToBits(parseInt('01010101', 2));
	expect(bits).toEqual([0,1,0,1,0,1,0,1]);
});


test('stringToBits', () => {
	const text = String.fromCharCode(63, 127);
	const expected = [
		0,0,1,1,1,1,1,1,
		0,1,1,1,1,1,1,1
	];
	const result = stringToBits(text);
	expect(result).toEqual(expected);
});


test('embedArray', async () => {
	const text = 'Who is John Galt?'
	const message = stringToBytes(text);
	const pixelsNeeded = message.length * 8 / 4;
	const imageSize = Math.ceil(Math.sqrt(pixelsNeeded));
	// generate a small PNG using a Fibonacci series
	let sum = 0;
	const data = Array.from(
		{ length: pixelsNeeded * 4 },
		( _, i ) => {
			sum += i;
			return sum % 256;
		}
	);
	const png1 = {
		width: imageSize,
		height: imageSize,
		data: Uint8Array.from(data)
	};
	const file1 = pngToBuffer(png1);
	// embed the message
	const file2 = await embedMessage(file1, message);
	// decode the resulting png file
	const png2 = await arrayBufferToPng(file2);
	const data2 = png2.data;
	// get the bits from the message and match them with the data in png2
	const bits1 = stringToBits(text);
	expect(bits1.length).toBeLessThanOrEqual(data2.length);
	for (const [index, bit] of bits1.entries()) {
		expect(data2[index] & 0x01).toBe(bit);
	}
});


test('getTerminator', () => {
	const pass = 'Ragnar Danneskjöld';
	const result = getTerminator(pass).map(
		byte => (byte).toString(16).padStart(2, '0')
	).join('');
	expect(result).toEqual('6fe1371a219fed273543b619860b9b44c893060438bcde681837783a5eae9c73');
});
