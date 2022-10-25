import { Link } from 'react-router-dom';

const Home = () => {
	return (
		<>
			<div className="page-wrapper">
				<h1>Steganography</h1>
				<p>Steganography is the practice of concealing a message within another message or a physical object.</p>
				<p>This utility allows embedding encrypted text messages in PNG files</p>

				<h2>TL;DR</h2>
				<p>
					<Link to="/png/embed"><b>Embed</b> encrypted text into PNG</Link>
				</p>
				<p>
					<Link to="/png/extract"><b>Extract</b> encrypted text from PNG</Link>
				</p>

				<h2>How to use</h2>
				<ol>
					<li>Bring your own PNG file. Ideally, it should be of medium size and the image should have a lot of details/color variation, ex: a landscape image.</li>
					<li>Have your secret text and your password ready. If you forget the password, you won't be able to recover (extract) your message from the PNG.</li>
					<li>Go to the <Link to="/png/embed">Embed</Link> page and follow the instructions.</li>
					<li><b>Important</b>: Always validate you can <Link to="/png/extract">Extract</Link> the embedded text from the resulting PNG file.</li>
				</ol>

				<h2>Open source</h2>
				<p>This is an open-source project, we strongly encourage you to examine its source code on <a href="https://github.com/imprologic/steganography-js" target="_blank" rel="noreferrer">Github</a></p>

				<h2>Terms of use</h2>
				<p>This software is provided as is, without guarantees of any kind. 
				By using it, you agree not to hold the developer(s) liable for any damages you may incur.</p>

				<p>Please make sure you don't forget your passphrase (password) or lose the resulting PNGs.</p>
			</div>
		</>
	);
};


export default Home;