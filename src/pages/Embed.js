import { FilePicker } from '../widgets';
import { useState } from 'react';
import { arrayBufferToPng, stringToBytes } from '../services/util';


const Embed = () => {

	const [ content, setContent ] = useState(null);
	const message = 'The rain in Spain...';

	const onImageSelected = (content) => {
		setContent(content);
	};


	const process = async () => {
		if (content) {
			const image = await arrayBufferToPng(content);
			console.log(image);
		}
		const bytes = stringToBytes(message);
		console.log(bytes);
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