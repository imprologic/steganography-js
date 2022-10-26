import { FilePicker, FormWrapper } from '../../widgets';
import { useState } from 'react';
import { FormGroup, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { extractText } from '../../services/pngutil';


const Extract = () => {

	const [content, setContent] = useState(null);
	const [text, setText] = useState('');
	const [pass, setPass] = useState(null);

	const onImageSelected = (content) => {
		setContent(content);
	};

	const process = async () => {
		if (content) {
			try {
				const text = await extractText(content, pass);
				setText(text);
			} catch (e) {
				alert(e);
			}
		}
	};

	return (
		<>
			<div className="page-wrapper">
				<h1>Extract Text from PNG</h1>
				<FormWrapper>
					<Form>

						<FormGroup className="mt-1">
							<Form.Label>PNG in which the text was embedded</Form.Label>
							<FilePicker onImageSelected={onImageSelected} />
							<Form.Text className="text-muted">Select the PNG file containing the embedded message.</Form.Text>
						</FormGroup>

						<FormGroup className="mt-3">
							<Form.Label>Passphrase</Form.Label>
							<Form.Control type="text" onChange={ (e) => setPass(e.target.value) } />
							<Form.Text className="text-muted">Passphrase used to encrypt the above message.</Form.Text>
						</FormGroup>

						<Button variant="primary" type="button" onClick={process} className="mt-4">
							Extract
						</Button>

						<hr />

						<FormGroup className="mt-3">
							<Form.Control as="textarea" value={text} placeholder="Extracted message will be shown here" readOnly />
						</FormGroup>

					</Form>
				</FormWrapper>

			</div>
		</>
	);
};

export default Extract;