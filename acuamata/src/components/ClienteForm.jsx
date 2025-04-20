
import { useState, useEffect } from 'react';

export default function ClienteForm({ onSubmit, clienteEditando, setClienteEditando, onClose }) {
  const [cliente, setCliente] = useState({
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
  });

  useEffect(() => {
    if (clienteEditando) setCliente(clienteEditando);
  }, [clienteEditando]);

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(cliente);
    setCliente({ nombre: '', apellido: '', direccion: '', telefono: '' });
    setClienteEditando(null);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm">
      <h2 className="h4 text-center mb-4">{clienteEditando ? 'Editar Cliente' : 'Crear Cliente'}</h2>
      <div className="mb-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={cliente.nombre}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="apellido"
          placeholder="Apellido"
          value={cliente.apellido}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          name="direccion"
          placeholder="Dirección"
          value={cliente.direccion}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="telefono"
          placeholder="Teléfono"
          value={cliente.telefono}
          onChange={handleChange}
          required
          className="form-control"
        />
      </div>
      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-warning w-100 me-2">
          {clienteEditando ? 'Actualizar' : 'Crear'} Cliente
        </button>
        <button type="button" className="btn btn-secondary w-100 ms-2" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
}
