import { 
	byteToBits, 
	bitsToByte, 
	getLsb,
	setLsb,
	bytesToBits,
	bitsToBytes,
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


describe('bytesToBits', () => {
	const bytes = [1, 2, 3, 254, 255];
	const result = bytesToBits(bytes);
	expect(result).toEqual([
		0,0,0,0,0,0,0,1,
		0,0,0,0,0,0,1,0,
		0,0,0,0,0,0,1,1,
		1,1,1,1,1,1,1,0,
		1,1,1,1,1,1,1,1,
	]);
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



describe('bitsToBytes', () => {

	test('0 to 255', () => {
		const bytes = Array.from(
			{ length: 255 },
			(_, index) => index
		);
		const bits = bytesToBits(bytes);
		const result = bitsToBytes(bits);
		expect(result).toEqual(bytes);
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

