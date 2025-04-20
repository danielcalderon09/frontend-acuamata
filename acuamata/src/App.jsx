import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './layout/Layout';
import Clientes from './pages/Cliente';
import ContadoresPage from './pages/ContadorPage';

// Placeholder temporal para usuarios
const Usuarios = () => <h1 className="text-2xl font-bold">Sección de Usuarios</h1>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/clientes" />} />
          <Route path="clientes" element={<Clientes />} />
          <Route path="contadores" element={<ContadoresPage />} />
          <Route path="usuarios" element={<Usuarios />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
