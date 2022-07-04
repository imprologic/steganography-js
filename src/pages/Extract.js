import { FilePicker } from '../widgets';
import { useState } from 'react';
import { extractMessage, bytesToString } from '../services/util';


const Extract = () => {

	const [ content, setContent ] = useState(null);
	const [ text, setText ] = useState(null);
	const [ pass, setPass ] = useState(null);

	const onImageSelected = (content) => {
		setContent(content);
	};

	const process = async () => {
		if (content) {
			const message = await extractMessage(content, pass);
			const text = bytesToString(message);
			setText(text);
		}
	};

	return (
		<>
			<h1>Extract Text from PNG</h1>
			<FilePicker onImageSelected={onImageSelected} />
			<div>
				<label>Message will be here</label>
				<div>{text}</div>
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

export default Extract;