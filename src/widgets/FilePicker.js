
const FilePicker = () => {

	const readHandler = (event) => {
		const content = event.target.result;
		console.log(content);
	};

	const changeHandler = (event) => {
		const file = event.target.files[0];
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