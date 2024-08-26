import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Importa a página inicial
import Questionario from './Questionario';
import Relatorio from './components/Relatorio';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> {/* Define a página inicial */}
        <Route path="/diagnosys" element={<Questionario />} />
        <Route path="/relatorio" element={<Relatorio />} />
      </Routes>
    </Router>
  );
}

export default App;