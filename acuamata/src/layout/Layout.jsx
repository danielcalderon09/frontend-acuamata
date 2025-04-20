import { Link, Outlet, useLocation } from 'react-router-dom';
import logo from '../assets/logo-acuamata.jpg';

const Layout = () => {
  const location = useLocation();
  const current = location.pathname;

  const navItemClass = (path) =>
    `nav-link ${current === path ? 'active bg-primary text-white' : 'text-dark'}`;

  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <aside className="bg-light p-4 border-end" style={{ width: '250px' }}>
        <div className="d-flex align-items-center mb-4">
          <img src={logo} alt="Logo Acueducto" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
          <h2 className="h5 text-primary m-0">Acueducto ACUAMATA</h2>
        </div>
        <nav className="nav flex-column gap-2">
          <Link to="/clientes" className={navItemClass('/clientes')}>
            Clientes
          </Link>
          <Link to="/contadores" className={navItemClass('/contadores')}>
            Contadores
          </Link>
          <Link to="/usuarios" className={navItemClass('/usuarios')}>
            Usuarios
          </Link>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow-1 p-4 bg-white overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;