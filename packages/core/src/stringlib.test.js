import { 
	stringToBytes, 
	bytesToString,
} from './stringlib.js';


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
