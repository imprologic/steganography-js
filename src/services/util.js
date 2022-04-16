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
