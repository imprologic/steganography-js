import { PNG } from 'pngjs/browser';

export const arrayBufferToPng = (arrayBuffer) => { 
	const png = new PNG({ filterType: 4 });
	return new Promise(
		(resolve, reject) => {
			png.parse(
				arrayBuffer,
				(error, image) => error ? reject(error) : resolve(image)
			);
		}
	);
};


export const stringToBytes = (text) => {
	const utf8Encode = new TextEncoder();
	return utf8Encode.encode(text);
};


export const byteToBits = (byte) => {
	const result = [];
	for (let position = 0; position < 8; position++) {
		result.push(byte & 0x01);
		byte = byte >> 1;
	}
	return result;
};