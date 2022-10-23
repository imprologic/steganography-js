import { FilePicker, FormWrapper } from '../../widgets';
import { useState } from 'react';
import { FormGroup, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { downloadBlob, embedText } from '../../services/pngutil';
import { Link } from 'react-router-dom';


const getFileName = (filePath) => {
	const pathParts = filePath.split('\\');
	const [ fileName, extension ] = pathParts[pathParts.length -1].split('.');
	const timeStamp = Math.round(Date.now() / 1000);
	return [ fileName + '-' + timeStamp, extension ].join('.');
};


const Embed = () => {

	const [ content, setContent ] = useState(null);
	const [ filePath, setFilePath ] = useState(null);
	const [ text, setText ] = useState(null);
	const [ pass, setPass ] = useState(null);

	const onImageSelected = (content, filePath) => {
		setContent(content);
		setFilePath(filePath);
	};


	const process = async () => {
		if (content) {
			const file = await embedText(content, text, pass);
			downloadBlob(file, getFileName(filePath), 'image/png');
		}
	};


	return (
		<>
			<div className="page-wrapper">
				<h1 className="mb-3">Embed Text into PNG</h1>
				<p>This page encrypts and then embeds a message into a PNG file by making imperceptible changes to some pixels.</p>
				<p>Once the message is embedded, you will be prompted to save the altered PNG file.</p>
				<p>To extract the embeded message, go to the <Link to="/png/extract">Extract</Link> page.</p>

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

export default Embed; 