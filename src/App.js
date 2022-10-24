import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, PngEmbed, PngExtract } from './pages';

import './App.css';
import { MainMenu } from './widgets';

function App() {
  return (
    <Router>
      <header>
        <MainMenu />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/png/embed" element={<PngEmbed />} />
        <Route path="/png/extract" element={<PngExtract />} />
      </Routes>
    </Router>
  );
}

export default App;
