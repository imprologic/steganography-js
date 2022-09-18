
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
				// we checked the last item and it matches
				return dataIndex;
			}
		}
	}
	return -1;
};

