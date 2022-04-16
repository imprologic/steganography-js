import { useState } from 'react';

const FilePicker = () => {
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);

	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		console.log(event.target.files[0]);
		setIsFilePicked(true);
	};


	return (
		<div>
			<input type="file" name="file" onChange={changeHandler} />
		</div>
	);
};


export default FilePicker;