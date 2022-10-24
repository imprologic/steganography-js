import Form from 'react-bootstrap/Form';


const FilePicker = ({
	onImageSelected
}) => {

	const makeReadHandler = (filePath) => {
		return (event) => {
			const content = event.target.result;
			onImageSelected(content, filePath);
		};
	};

	const changeHandler = (event) => {
		const [ file ] = event.target.files;
		const reader = new FileReader();
		reader.onload = makeReadHandler(event.target.value);
		reader.readAsArrayBuffer(file);
	};


	return (
		<>
			<Form.Control type="file" name="file" onChange={changeHandler} accept=".png" />
		</>
	);
};


export default FilePicker;