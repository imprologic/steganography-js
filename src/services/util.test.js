import { stringToBytes, byteToBits } from './util';


test('stringToBytes', () => {
	const bytes = stringToBytes('AB');
	const expected = Uint8Array.from([65,66]);
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
