

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
		<div>
			<input type="file" name="file" onChange={changeHandler} />
		</div>
	);
};


export default FilePicker;