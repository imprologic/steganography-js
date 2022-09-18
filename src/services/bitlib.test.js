import { 
	byteToBits, 
	bitsToByte, 
	getLsb,
	setLsb,
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



describe('getLsb', () => {

	test('even number', () => {
		expect(getLsb(126)).toEqual(0);
	});

	test('odd number', () => {
		expect(getLsb(127)).toEqual(1);
	});

});


describe('setLsb', () => {

	test('flip lsb to 1', () => {
		expect(setLsb(126, 1)).toEqual(127);
	});

	test('flip lsb to 0', () => {
		expect(setLsb(127, 0)).toEqual(126);
	});

	test('leave lsb unchanged - even', () => {
		expect(setLsb(126, 0)).toEqual(126);
	});

	test('leave lsb unchanged - odd', () => {
		expect(setLsb(127, 1)).toEqual(127);
	});


});

