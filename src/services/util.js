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


export const pngToBuffer = (png) => {
	return PNG.sync.write(png);
}


export const stringToBytes = (text) => {
	const utf8Encode = new TextEncoder();
	return utf8Encode.encode(text);
};


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


export const downloadBlob = (data, fileName, mimeType) => {
	var blob, url;
	blob = new Blob([data], {
		type: mimeType
	});
	url = window.URL.createObjectURL(blob);
	downloadURL(url, fileName);
	setTimeout(function () {
		return window.URL.revokeObjectURL(url);
	}, 1000);
};


export const downloadURL = (data, fileName) => {
	var a;
	a = document.createElement('a');
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = 'display: none';
	a.click();
	a.remove();
};