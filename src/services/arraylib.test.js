import { findValues } from './arraylib';


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


