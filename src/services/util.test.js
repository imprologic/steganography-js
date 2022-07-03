import { 
	stringToBytes, 
	byteToBits, 
	pngToBuffer, 
	embedMessage, 
	arrayBufferToPng, 
	stringToBits, 
	getTerminator, 
	writeToArrayLsb, 
	bytesToString,
	bitsToByte,
	readFromArrayLsb
} from './util';


test('stringToBytes', () => {
	const bytes = stringToBytes('AB');
	const expected = Uint8Array.from([65, 66]);
	expect(bytes.toString()).toEqual(expected.toString());	// Jest sees `expected` as an object rather than an array
});


test('bytesToString', () => {
	const expected = 'Ragnar Danneskjöld';
	const bytes = stringToBytes(expected);
	const result = bytesToString(bytes);
	expect(result).toEqual(expected);
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


test('bitsToByte - ones and zeros', () => {
	const byte = parseInt('10101010', 2);
	const bits = byteToBits(byte);
	const result = bitsToByte(bits);
	expect(result).toEqual(byte);
});


test('bitsToByte - zeros and ones', () => {
	const byte = parseInt('01010101', 2);
	const bits = byteToBits(byte);
	const result = bitsToByte(bits);
	expect(result).toEqual(byte);
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
	const file2 = await embedMessage(file1, [...message, ...terminator]);
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
