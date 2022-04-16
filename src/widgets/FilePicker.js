import { arrayBufferToPng } from "../services/util";

const FilePicker = () => {


	const readHandler = async (event) => {
		const content = event.target.result;
		const image = await arrayBufferToPng(content);
		console.log(image);
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