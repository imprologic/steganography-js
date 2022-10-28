import { render, screen } from '@testing-library/react';
import Embed, { getFileName } from './Embed';
import { MemoryRouter } from 'react-router-dom';


describe('png/Embed', () => {

	const downloadFileRegex = /^.+-[0-9]+\.png$/;

	test('should parse a simple file name', () => {
		const original = 'SomeFileName.png';
		const result = getFileName(original);
		expect(result).toMatch(downloadFileRegex);
	});

	test('should parse a file name with dashes', () => {
		const original = 'some-file-name.png';
		const result = getFileName(original);
		expect(result).toMatch(downloadFileRegex);
	});

	test('should parse a file name with multiple dots', () => {
		const original = 'some.file.name.png';
		const result = getFileName(original);
		expect(result).toMatch(downloadFileRegex);
	});

	test('should parse a file name with multiple png extensions', () => {
		const original = 'some_file_name.png.png';
		const result = getFileName(original);
		expect(result).toMatch(downloadFileRegex);
	});

	test('should parse a file name without png extension', () => {
		const original = 'some_file_name';
		const result = getFileName(original);
		expect(result).toMatch(downloadFileRegex);
	});


	test('should render the component', () => {
		render(
			<MemoryRouter>
				<Embed />
			</MemoryRouter>
		);

		const heading = screen.getByText('Embed Text into PNG');
		expect(heading).toBeInTheDocument();
	});


});