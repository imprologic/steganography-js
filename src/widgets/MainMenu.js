import './MainMenu.css';
import { Navbar, Container, Nav } from 'react-bootstrap';

const MainMenu = () => {
	return (
		<Navbar collapseOnSelect expand="lg" variant="dark" bg="dark">
			<Container>
				<Navbar.Brand href="/#/">steganography-js</Navbar.Brand>
				<Navbar.Toggle aria-controls="responsive-navbar-nav" />
				<Navbar.Collapse id="responsive-navbar-nav">
					<Nav className="me-auto">
					</Nav>
					<Nav>
						<Nav.Link href="/#/png/embed">Embed</Nav.Link>
						<Nav.Link href="/#/png/extract">Extract</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default MainMenu;