import { FilePicker } from '../widgets';
import { useState } from 'react';
import { arrayBufferToPng, stringToBytes, byteToBits, pngToBuffer, downloadBlob } from '../services/util';


const Embed = () => {

	const [ content, setContent ] = useState(null);
	const message = 'The rain in Spain...';

	const onImageSelected = (content) => {
		setContent(content);
	};


	const process = async () => {
		const bytes = stringToBytes(message);
		if (content) {
			const image = await arrayBufferToPng(content);
			const data = image.data;
			console.log(data);
			let index = 0;
			for (const byte of bytes) {
				const bits = byteToBits(byte);
				for (const bit of bits) {
					data[index] = (data[index] & 0xFE) | bit;
					index++;
				}
			}
			console.log(data);
			const buffer = pngToBuffer(image);
			console.log(buffer);
			downloadBlob(buffer, 'test.png', 'image/png');
		}
	};


	return (
		<>
			<h1>Embed Text into PNG</h1>
			<FilePicker onImageSelected={onImageSelected} />
			<div>
				<button onClick={process}>Process</button>
			</div>
		</>
	);
};

export default Embed; 