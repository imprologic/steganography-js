import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Extract } from './pages';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/extract" element={<Extract />} />
      </Routes>
    </Router>
  );
}

export default App;
