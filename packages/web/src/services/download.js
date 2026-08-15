/**
 * Download a file by creating a Blob and injecting it in an object URL
 * @param {Buffer} buffer The buffer containing the file data
 * @param {*} fileName The name of the file to download
 * @param {*} mimeType The content type of the file to download
 */
export const downloadBlob = (buffer, fileName, mimeType) => {
	const blob = new Blob([buffer], {
		type: mimeType
	});
	const url = window.URL.createObjectURL(blob);
	downloadURL(url, fileName);
	setTimeout(function () {
		return window.URL.revokeObjectURL(url);
	}, 1000);
};



/**
 * Download a file from a base64 URL.
 * @param {string} data 
 * @param {string} fileName 
 */
export const downloadURL = (data, fileName) => {
	const a = document.createElement('a');
	a.href = data;
	a.download = fileName;
	document.body.appendChild(a);
	a.style = 'display: none';
	a.click();
	a.remove();
};
