import { 
	byteToBits, 
	bitsToByte 
} from './bitlib';



describe('byteToBits', () => {

	test('all ones', () => {
		const bits = byteToBits(255);
		expect(bits).toEqual([1,1,1,1,1,1,1,1]);
	});
	
	
	test('all zeros', () => {
		const bits = byteToBits(0);
		expect(bits).toEqual([0,0,0,0,0,0,0,0]);
	});
	
	
	test('ones and zeros', () => {
		const bits = byteToBits(parseInt('10101010', 2));
		expect(bits).toEqual([1,0,1,0,1,0,1,0]);
	});
	
	
	test('zeros and ones', () => {
		const bits = byteToBits(parseInt('01010101', 2));
		expect(bits).toEqual([0,1,0,1,0,1,0,1]);
	});

});



describe('bitsToByte', () => {

	test('ones and zeros', () => {
		const byte = parseInt('10101010', 2);
		const bits = byteToBits(byte);
		const result = bitsToByte(bits);
		expect(result).toEqual(byte);
	});


	test('zeros and ones', () => {
		const byte = parseInt('01010101', 2);
		const bits = byteToBits(byte);
		const result = bitsToByte(bits);
		expect(result).toEqual(byte);
	});

});

