import { render, screen } from '@testing-library/react';
import App from './App';

test('renders home page title', () => {
  render(<App />);
  const headingElement = screen.getByText(/steganography-js/i);
  expect(headingElement).toBeInTheDocument();
});
