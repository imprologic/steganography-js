import { findValues, getLsbWithMask, setLsbWithMask } from './arraylib';


describe('findValues', () => {

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
	

});



describe('getLsbWithMask', () => {


	test('no mask', () => {
		const data = [0, 1, 2, 3, 4];
		const result = getLsbWithMask(data);
		expect(result).toEqual([0, 1, 0, 1, 0]);
	});


	test('even mask', () => {
		const data = [0, 1, 2, 3, 4];
		const mask = [1, 0];
		const result = getLsbWithMask(data, mask);
		expect(result).toEqual([0, 0, 0]);
	});


	test('odd mask', () => {
		const data = [0, 1, 2, 3, 4];
		const mask = [0, 1];
		const result = getLsbWithMask(data, mask);
		expect(result).toEqual([1, 1]);
	});


	test('rgba mask', () => {
		const data = [1, 1, 1, 0, 1, 1, 1, 0];
		const mask = [1, 1, 1, 0];
		const result = getLsbWithMask(data, mask);
		expect(result).toEqual([1, 1, 1, 1, 1, 1]);
	});


});



describe('setLsbWithMask', () => {

	test('no index, no mask', () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const startIndex = 0;
		const bits = [0, 1, 0, 1, 0, 0, 1, 1, 0];
		setLsbWithMask(data, startIndex, bits);
		expect(data).toEqual([0, 3, 2, 5, 4, 6, 7, 9, 8]);
	});


	test('index, no mask', () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const startIndex = 2;
		const bits = [0, 1, 0, 1, 0, 0, 1];
		setLsbWithMask(data, startIndex, bits);
		expect(data).toEqual([1, 2, 2, 5, 4, 7, 6, 8, 9]);
	});


	test('no index, mask', () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const startIndex = 0;
		const bits = [0, 1, 0, 1, 0, 1];
		const mask = [1, 1, 1, 0];
		setLsbWithMask(data, startIndex, bits, mask);
		expect(data).toEqual([0, 3, 2, 4, 5, 6, 7, 8, 9]);
	});


	test('index, mask', () => {
		const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];
		const startIndex = 1;
		const bits = [0, 1, 0, 1, 0, 1];
		const mask = [1, 1, 1, 0];
		setLsbWithMask(data, startIndex, bits, mask);
		expect(data).toEqual([1, 2, 3, 4, 5, 7, 6, 9, 9]);
	});


});
