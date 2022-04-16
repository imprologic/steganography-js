import { Link } from 'react-router-dom';

import './MainMenu.css';

const MainMenu = () => {
	return (
		<div className="MainMenu">
			<Link to="/">Embed</Link>
			<Link to="/extract">Extract</Link>
		</div>
	);
};

export default MainMenu;