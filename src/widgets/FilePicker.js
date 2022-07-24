import Form from 'react-bootstrap/Form';


const FilePicker = ({
	onImageSelected
}) => {


	const readHandler = (event) => {
		const content = event.target.result;
		onImageSelected(content);
	};

	const changeHandler = (event) => {
		const [ file ] = event.target.files;
		const reader = new FileReader();
		reader.onload = readHandler;
		reader.readAsArrayBuffer(file);
	};


	return (
		<>
			<Form.Control type="file" name="file" onChange={changeHandler} accept=".png" />
		</>
	);
};


export default FilePicker;