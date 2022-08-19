import './MainMenu.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

const MainMenu = () => {
	return (
		<Navbar bg="light" expand="lg">
			<Container>
				<Navbar.Brand href="/">PNG Text</Navbar.Brand>
				<Nav className="me-auto">
					<Nav.Link href="/">Embed</Nav.Link>
					<Nav.Link href="/extract">Extract</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default MainMenu;