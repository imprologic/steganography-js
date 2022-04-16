import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Embed, Extract } from './pages';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Embed />} />
        <Route path="/extract" element={<Extract />} />
      </Routes>
    </Router>
  );
}

export default App;
