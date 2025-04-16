// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Clientes from './pages/Cliente';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Clientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;