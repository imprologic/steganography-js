import { byteToBits } from './util';

test('byteToBits - all ones', () => {
	const bits = byteToBits(255);
	expect(bits).toEqual([1,1,1,1,1,1,1,1]);
});
