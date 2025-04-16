// src/components/ClienteForm.jsx
import { useState, useEffect } from 'react';

export default function ClienteForm({ onSubmit, clienteEditando, setClienteEditando }) {
    const [cliente, setCliente] = useState({
      nombre: '',
      apellido: '',
      direccion: '',
      telefono: ''
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
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center">{clienteEditando ? 'Editar Cliente' : 'Crear Cliente'}</h2>
        <div className="grid grid-cols-1 gap-4">
          <input
            name="nombre"
            placeholder="Nombre"
            value={cliente.nombre}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            name="apellido"
            placeholder="Apellido"
            value={cliente.apellido}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            name="direccion"
            placeholder="Dirección"
            value={cliente.direccion}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <input
            name="telefono"
            placeholder="Teléfono"
            value={cliente.telefono}
            onChange={handleChange}
            required
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
        <button type="submit" className="w-full py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors">
          {clienteEditando ? 'Actualizar' : 'Crear'} Cliente
        </button>
      </form>
    );
  }