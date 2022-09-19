import { getLsb, setLsb } from './bitlib';


/**
 * Find a smaller array into a larger array.
 * @param {any[]} data An array-like set of values which may contain the sought subset
 * @param {any[]} values An array-like subset of values that we want to search for
 */
export const findValues = (data, values) => {
	for (let dataIndex = 0; dataIndex < data.length - values.length + 1; dataIndex++) {
		for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
			if (data[dataIndex + valueIndex] !== values[valueIndex]) {
				break;
			}
			if (valueIndex === values.length - 1) {
				// we checked the last value and it matches
				return dataIndex;
			}
		}
	}
	return -1;
};



/**
 * Get the LSB for each item in array with an optional mask.
 * @param {number[]} data Array of bytes
 * @param {number[]} mask Optional array of truthy and falsy items
 * @returns {number[]} Array of bits
 */
export const getLsbWithMask = (data, mask) => {
	const result = [];
	const hasMask = mask && mask.length;
	for (let dataIndex = 0; dataIndex < data.length; dataIndex++) {
		if (hasMask) {
			const maskIndex = dataIndex % mask.length;
			if (!mask[maskIndex]) {
				continue;
			}
		}
		result.push(getLsb(data[dataIndex]));
	}
	return result;
};



/**
 * Set the LSB in an array starting from a specific index
 * @param {number[]} data Array-like object containing the data to be changed
 * @param {number} startIndex The data index where the changes start
 * @param {number[]} bits Array of LSB to be set on the data array
 * @param {number[]} mask Optional
 */
export const setLsbWithMask = (data, startIndex, bits, mask) => {
	const hasMask = mask && mask.length;
	let bitIndex = 0;
	for (let dataIndex = startIndex; dataIndex < data.length; dataIndex++) {
		if (hasMask) {
			const maskIndex = (dataIndex - startIndex) % mask.length;
			if (!mask[maskIndex]) {
				continue;
			}
		}
		data[dataIndex] = setLsb(data[dataIndex], bits[bitIndex]);
		bitIndex++;
		if (bitIndex >= bits.length) {
			return;
		}
	}
};
