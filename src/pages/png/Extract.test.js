import { render, screen } from '@testing-library/react';
import Extract from './Extract';
import { MemoryRouter } from 'react-router-dom';


describe('png/Extract', () => {

	test('should render the component', () => {
		render(
			<MemoryRouter>
				<Extract />
			</MemoryRouter>
		);

		const heading = screen.getByText('Extract Text from PNG');
		expect(heading).toBeInTheDocument();
	});


});