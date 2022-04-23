import { FilePicker } from '../widgets';
import { useState } from 'react';
import { stringToBytes, downloadBlob, embedMessage } from '../services/util';


const Embed = () => {

	const [ content, setContent ] = useState(null);
	const text = 'The rain in Spain...';

	const onImageSelected = (content) => {
		setContent(content);
	};


	const process = async () => {
		if (content) {
			const message = stringToBytes(text);
			const file = await embedMessage(content, message);
			downloadBlob(file, 'test.png', 'image/png');
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