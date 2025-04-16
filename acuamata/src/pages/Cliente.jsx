import { useEffect, useState } from 'react';
import {
  getClientes,
  createCliente,
  updateCliente,
  deleteCliente,
} from '../services/clienteService';
import ClienteForm from '../components/ClienteForm';
import ClienteTable from '../components/ClienteTable';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const cargarClientes = async () => {
    const res = await getClientes();
    setClientes(res.data);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleCrearOEditar = async (cliente) => {
    if (cliente.id) {
      await updateCliente(cliente.id, cliente);
    } else {
      await createCliente(cliente);
    }
    cargarClientes();
    setMostrarFormulario(false);
    setClienteEditando(null);
  };

  const handleEliminar = async (id) => {
    await deleteCliente(id);
    cargarClientes();
  };

  const handleEditar = (cliente) => {
    setClienteEditando(cliente);
    setMostrarFormulario(true);
  };

  const handleMostrarFormulario = () => {
    setClienteEditando(null);
    setMostrarFormulario(true);
  };

  const handleCancelar = () => {
    setClienteEditando(null);
    setMostrarFormulario(false);
  };

  return (
    <div className="container mx-auto p-6">
      {!mostrarFormulario ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-yellow-500">Gestión de Clientes</h1>
            <button
              onClick={handleMostrarFormulario}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Crear Cliente
            </button>
          </div>
          <ClienteTable clientes={clientes} onEdit={handleEditar} onDelete={handleEliminar} />
        </>
      ) : (
        <ClienteForm
          onSubmit={handleCrearOEditar}
          clienteEditando={clienteEditando}
          setClienteEditando={setClienteEditando}
          onClose={handleCancelar}
        />
      )}
    </div>
  );
}
