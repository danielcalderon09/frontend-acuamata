import React, { useState, useEffect } from 'react';
import { createContador, updateContador } from '../services/contadorService';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const ContadorForm = ({ onContadorCreado, onClose, contadorEditando }) => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    estado: 'activo',
    lectura_actual: '',
    caracteristicas: '',
    direccion: '',
    cliente_id: '',
    numero_serie: ''
  });

  useEffect(() => {
    axios.get('http://localhost:3001/api/clientes')
      .then(res => setClientes(res.data))
      .catch(err => console.error('Error cargando clientes', err));
  }, []);

  useEffect(() => {
    if (contadorEditando) {
      setFormData({
        estado: contadorEditando.estado || 'activo',
        lectura_actual: contadorEditando.lectura_actual || '',
        caracteristicas: contadorEditando.caracteristicas || '',
        direccion: contadorEditando.direccion || '',
        cliente_id: contadorEditando.cliente_id || '',
        numero_serie: contadorEditando.numero_serie || '',
        id: contadorEditando.id
      });
    } else {
      setFormData({
        estado: 'activo',
        lectura_actual: '',
        caracteristicas: '',
        direccion: '',
        cliente_id: '',
        numero_serie: ''
      });
    }
  }, [contadorEditando]);

  const generarNumeroSerie = () => 'CT-' + uuidv4().slice(0, 8).toUpperCase();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (contadorEditando && formData.id) {
        await updateContador(formData.id, formData);
      } else {
        const nuevoContador = {
          ...formData,
          numero_serie: generarNumeroSerie()
        };
        await createContador(nuevoContador);
      }

      onContadorCreado();
      onClose();
    } catch (error) {
      console.error('Error al guardar contador:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-3 mt-3">
      <h4>{contadorEditando ? 'Editar Contador' : 'Crear Contador'}</h4>

      <label>Cliente:</label>
      <select
        name="cliente_id"
        value={formData.cliente_id}
        onChange={handleChange}
        required
        className="form-select mb-2"
      >
        <option value="">Selecciona un cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>{c.nombre}</option>
        ))}
      </select>

      <label>Dirección:</label>
      <input
        name="direccion"
        value={formData.direccion}
        onChange={handleChange}
        required
        className="form-control mb-2"
      />

      <label>Estado:</label>
      <select
        name="estado"
        value={formData.estado}
        onChange={handleChange}
        className="form-select mb-2"
      >
        <option value="activo">Activo</option>
        <option value="inactivo">Inactivo</option>
      </select>

      <label>Lectura Actual (m³):</label>
      <input
        name="lectura_actual"
        type="number"
        value={formData.lectura_actual}
        onChange={handleChange}
        required
        className="form-control mb-2"
      />

      <label>Características:</label>
      <textarea
        name="caracteristicas"
        value={formData.caracteristicas}
        onChange={handleChange}
        rows="2"
        className="form-control mb-3"
      />

      <div className="d-flex justify-content-between">
        <button type="submit" className="btn btn-success">
          {contadorEditando ? 'Actualizar Contador' : 'Crear Contador'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ContadorForm;
