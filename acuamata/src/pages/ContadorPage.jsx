import { useEffect, useState } from 'react';
import axios from 'axios';
import ContadorForm from '../components/ContadorForm';
import CodigoDeBarras from '../components/CodigoDeBarras';

function ContadoresPage() {
  const [contadores, setContadores] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [contadorEditando, setContadorEditando] = useState(null);
  const [codigoActual, setCodigoActual] = useState(null);

  const obtenerContadores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/contadores');
      setContadores(response.data);
    } catch (error) {
      console.error('Error al obtener contadores:', error);
    }
  };

  useEffect(() => {
    obtenerContadores();
  }, []);

  const handleCrearNuevo = () => {
    setContadorEditando(null);
    setMostrarFormulario(true);
  };

  const handleEditar = (contador) => {
    setContadorEditando(contador);
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
    if (confirm('¿Seguro que deseas eliminar este contador?')) {
      await axios.delete(`http://localhost:3001/api/contadores/${id}`);
      obtenerContadores();
    }
  };

  const handleFormularioCerrado = () => {
    setContadorEditando(null);
    setMostrarFormulario(false);
  };

  const handleContadorGuardado = () => {
    obtenerContadores();
    handleFormularioCerrado();
  };

  const handleMostrarCodigo = (numeroSerie) => {
    setCodigoActual(numeroSerie);
    const barcodeSection = document.getElementById('barcode-section');
    if (barcodeSection) {
      barcodeSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="container mt-4">
      {!mostrarFormulario ? (
        <>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="text-primary fs-2">Lista de Contadores</h1>
            <button className="btn btn-primary" onClick={handleCrearNuevo}>
              Crear Contador
            </button>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover text-center">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>N° Serie</th>
                  <th>Cliente</th>
                  <th>Dirección</th>
                  <th>Estado</th>
                  <th>Lectura Actual (m³)</th>
                  <th>Características</th>
                  <th>Fecha de Última Lectura</th>
                  <th>Lectura Registrada (m³)</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {contadores.map((contador) => (
                  <tr key={contador.id}>
                    <td>{contador.id}</td>
                    <td>{contador.numero_serie}</td>
                    <td>{contador.cliente_nombre || 'N/A'}</td>
                    <td>{contador.direccion}</td>
                    <td>
                      <span className={`badge ${contador.estado === 'activo' ? 'bg-success' : 'bg-danger'}`}>
                        {contador.estado}
                      </span>
                    </td>
                    <td>{contador.lectura_actual}</td>
                    <td>{contador.caracteristicas || '-'}</td>
                    <td>
                      {contador.estado === 'inactivo'
                        ? 'Contador inactivo'
                        : contador.ultima_lectura_fecha
                        ? new Date(contador.ultima_lectura_fecha).toLocaleDateString('es-CO')
                        : 'Falta por tomar lectura'}
                    </td>
                    <td>
                      {contador.estado === 'inactivo'
                        ? 'Contador inactivo'
                        : contador.ultima_lectura_valor
                        ? `${contador.ultima_lectura_valor} m³`
                        : 'Falta por tomar lectura'}
                    </td>
                    <td>
                      <div className="btn-group" role="group">
                        <button className="btn btn-warning btn-sm" onClick={() => handleEditar(contador)}>
                          Modificar
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleEliminar(contador.id)}>
                          Eliminar
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleMostrarCodigo(contador.numero_serie)}
                        >
                          Código de Barras
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {contadores.length === 0 && (
                  <tr>
                    <td colSpan="10" className="text-center text-muted py-3">
                      No hay contadores registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {codigoActual && (
            <div id="barcode-section" className="mt-5 text-center border rounded p-4 bg-light">
              <h5 className="mb-4">Código de Barras del Contador</h5>
              <CodigoDeBarras value={codigoActual} />
              <button className="btn btn-outline-secondary mt-3" onClick={() => setCodigoActual(null)}>
                Ocultar
              </button>
            </div>
          )}
        </>
      ) : (
        <ContadorForm
          onContadorCreado={handleContadorGuardado}
          onClose={handleFormularioCerrado}
          contadorEditando={contadorEditando}
        />
      )}
    </div>
  );
}

export default ContadoresPage;