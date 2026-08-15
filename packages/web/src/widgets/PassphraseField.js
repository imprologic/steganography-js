import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';


const PassphraseField = ({
	onChange,
	required = false,
}) => {

	const [visible, setVisible] = useState(false);

	return (
		<InputGroup>
			<Form.Control
				type={visible ? 'text' : 'password'}
				onChange={onChange}
				required={required}
				autoComplete="off"
			/>
			<Button
				variant="outline-secondary"
				type="button"
				onClick={() => setVisible((v) => !v)}
				aria-label={visible ? 'Hide passphrase' : 'Show passphrase'}
				aria-pressed={visible}
			>
				{visible ? 'Hide' : 'Show'}
			</Button>
		</InputGroup>
	);
};


export default PassphraseField;
