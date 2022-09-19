/**
 * Converts a byte to an array of bits (either 0 or 1).
 * The caller should ensure the `byte` argument is between 0 and 255.
 * @param {number} byte 
 * @returns {number[]} An array of zeros and ones.
 */
export const byteToBits = (byte) => {
	return [
		(byte >>> 7) & 1,
		(byte >>> 6) & 1,
		(byte >>> 5) & 1,
		(byte >>> 4) & 1,
		(byte >>> 3) & 1,
		(byte >>> 2) & 1,
		(byte >>> 1) & 1,
		byte & 1,
	];
};


/**
 * Converts an array of 8 bits to a byte.
 * @param {number[]} bits Should be an array of 8 values between 0 and 255
 * @returns {number} A value between 0 and 255.
 */
export const bitsToByte = (bits) => {
	return (bits[0] << 7) |
		(bits[1] << 6) |
		(bits[2] << 5) |
		(bits[3] << 4) |
		(bits[4] << 3) |
		(bits[5] << 2) |
		(bits[6] << 1) |
		bits[7]
		;
};


/**
 * Get the least significant bit from a byte
 * @param {number} byte 
 * @returns {number}
 */
export const getLsb = (byte) => {
	return byte & 0x01;
}


/**
 * Set the least significant bit for a byte
 * @param {number} byte 
 * @param {number} bit
 * @returns {number}
 */
export const setLsb = (byte, bit) => {
	return (byte & 0xFE) | (bit && 1);
}
