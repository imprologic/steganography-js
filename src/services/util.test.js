import { 
	stringToBytes,
	stringToBits
} from './stringlib';

import { 
	pngToBuffer, 
	embedMessage, 
	arrayBufferToPng, 
	getTerminator, 
	writeToArrayLsb, 
	readFromArrayLsb,
	findValues
} from './util';



test('writeToArrayLsb', () => {
	const text = 'Who is John Galt?'
	const message = stringToBytes(text);
	const expected = stringToBits(text);
	const data = Array.from(
		{ length: message.length * 8 },
		( _, i ) => i % 256
	);
	const nextIndex = writeToArrayLsb(data, message, 0);
	expect(nextIndex).toEqual(data.length);
	let index = 0;
	for (const byte of data) {
		const lsb = byte & 0x01;
		expect(lsb).toEqual(expected[index]);
		index++;
	}
});


test('readFromArrayLsb', () => {
	const text = 'Who is John Galt?'
	const message = stringToBytes(text);
	const data = Array.from(
		{ length: message.length * 8 },
		( _, i ) => i % 256
	);
	writeToArrayLsb(data, message, 0);
	const result = readFromArrayLsb(data, data.length);
	expect(result).toEqual(message);
});


test('embedMessage', async () => {
	const text = 'Who is John Galt?';
	const message = stringToBytes(text);
	const pass = '4tlasShrugg3d';
	const terminator = getTerminator(pass);
	const pixelsNeeded = (message.length + terminator.length) * 8 / 4;
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
	// embed the message and the terminator
	const file2 = await embedMessage(file1, message, pass);
	// decode the resulting png file
	const png2 = await arrayBufferToPng(file2);
	const data2 = png2.data;
	// decode the data and match it with the message and the terminator
	const content = readFromArrayLsb(data2, (message.length + terminator.length) * 8);
	expect(content.slice(0, message.length)).toEqual(message);
	expect(content.slice(message.length)).toEqual(terminator);
});


test('getTerminator', () => {
	const pass = 'Ragnar Danneskjöld';
	const result = getTerminator(pass).map(
		byte => (byte).toString(16).padStart(2, '0')
	).join('');
	expect(result).toEqual('6fe1371a219fed273543b619860b9b44c893060438bcde681837783a5eae9c73');
});


test('findValues - middle', () => {
	const data = [1, 2, 3, 4, 5];
	const values = [3, 4];
	const result = findValues(data, values);
	expect(result).toEqual(2);
});


test('findValues - start', () => {
	const data = [1, 2, 3, 4, 5];
	const values = [1, 2];
	const result = findValues(data, values);
	expect(result).toEqual(0);
});


test('findValues - end', () => {
	const data = [1, 2, 3, 4, 5];
	const values = [4, 5];
	const result = findValues(data, values);
	expect(result).toEqual(3);
});


test('findValues - none', () => {
	const data = [1, 2, 3, 4, 5];
	const values = [2, 4];
	const result = findValues(data, values);
	expect(result).toEqual(-1);
});


test('findValues - just one', () => {
	const data = [1, 2, 3, 4, 5];
	const values = [4];
	const result = findValues(data, values);
	expect(result).toEqual(3);
});
