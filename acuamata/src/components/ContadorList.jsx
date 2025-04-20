import React, { useEffect, useState } from 'react';
import { getContadores, deleteContador } from '../services/contadorService';

const ContadorList = () => {
  const [contadores, setContadores] = useState([]);

  const cargarContadores = async () => {
    try {
      const res = await getContadores();
      setContadores(res.data);
    } catch (err) {
      console.error('Error al cargar contadores', err);
    }
  };

  useEffect(() => {
    cargarContadores();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este contador?')) {
      await deleteContador(id);
      cargarContadores();
    }
  };

  return (
    <div>
      <h3>Lista de Contadores</h3>
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Número Serie</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Lectura Actual</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {contadores.map(cont => (
            <tr key={cont.id}>
              <td>{cont.id}</td>
              <td>{cont.numero_serie}</td>
              <td>{cont.direccion}</td>
              <td>{cont.estado}</td>
              <td>{cont.lectura_actual}</td>
              <td>
                <button onClick={() => handleDelete(cont.id)}>Eliminar</button>
                <button disabled>Editar</button>
                <button disabled>Generar código de barras</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContadorList;
