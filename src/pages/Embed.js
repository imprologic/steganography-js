import { FilePicker } from '../widgets';
import { useState } from 'react';
import { stringToBytes, downloadBlob, embedMessage } from '../services/util';
import { encrypt } from '../services/cipher';


const Embed = () => {

	const [ content, setContent ] = useState(null);
	const [ text, setText ] = useState(null);
	const [ pass, setPass ] = useState(null);

	const onImageSelected = (content) => {
		setContent(content);
	};


	const process = async () => {
		if (content) {
			const message = stringToBytes(encrypt(text, pass));
			const file = await embedMessage(content, message, pass);
			downloadBlob(file, 'test.png', 'image/png');
		}
	};


	return (
		<>
			<h1>Embed Text into PNG</h1>
			<FilePicker onImageSelected={onImageSelected} />
			<div>
				<label>Message</label>
				<input type="text" onChange={ (e) => setText(e.target.value) } />
			</div>
			<div>
				<label>Passphrase</label>
				<input type="text" onChange={ (e) => setPass(e.target.value) } />
			</div>
			<div>
				<button onClick={process}>Process</button>
			</div>
		</>
	);
};

export default Embed; 