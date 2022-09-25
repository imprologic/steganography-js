import { FilePicker, FormWrapper } from '../widgets';
import { useState } from 'react';
import { FormGroup, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { stringToBytes } from '../services/stringlib';
import { downloadBlob, embedMessage } from '../services/pngutil';
import { encrypt } from '../services/cipher';


const Embed2 = () => {

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
			<div className="page-wrapper">
				<h1 className="mb-3">(Test) Embed Text into PNG</h1>
				<p>This page encrypts and then embeds a message into a PNG file by making imperceptible changes to some pixels.</p>
				<p>Once the message is embedded, you will be prompted to save the altered PNG file.</p>
				<p>To extract the embeded message, go to the <a href="/extract">Extract</a> page.</p>

				<FormWrapper>
					<Form>

						<FormGroup className="mt-1">
							<Form.Label>PNG in which to embed the text</Form.Label>
							<FilePicker onImageSelected={onImageSelected} />
							<Form.Text className="text-muted">Select a PNG file from your device. Ideally, the PNG should contain a lot of details, ex: a photo.</Form.Text>
						</FormGroup>

						<FormGroup className="mt-3">
							<Form.Label>Message</Form.Label>
							<Form.Control as="textarea" onChange={ (e) => setText(e.target.value) } />
							<Form.Text className="text-muted">The mesage to embed in the above file.</Form.Text>
						</FormGroup>

						<FormGroup className="mt-3">
							<Form.Label>Passphrase</Form.Label>
							<Form.Control type="text" onChange={ (e) => setPass(e.target.value) } />
							<Form.Text className="text-muted">Passphrase used to encrypt the above message. Make sure to remember the passphrase, or you won't be able to recover the message.</Form.Text>
						</FormGroup>

						<Button variant="primary" type="button" onClick={process} className="mt-4">
							Embed
						</Button>
					</Form>
				</FormWrapper>

			</div>
		</>
	);
};

export default Embed2; 