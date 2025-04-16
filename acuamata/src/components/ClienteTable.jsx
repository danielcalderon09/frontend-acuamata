// src/components/ClienteTable.jsx
export default function ClienteTable({ clientes, onEdit, onDelete }) {
    return (
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-yellow-500 text-white">
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Apellido</th>
              <th className="px-4 py-2">Dirección</th>
              <th className="px-4 py-2">Teléfono</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id} className="text-center border-t border-gray-200">
                <td className="px-4 py-2">{cliente.nombre}</td>
                <td className="px-4 py-2">{cliente.apellido}</td>
                <td className="px-4 py-2">{cliente.direccion}</td>
                <td className="px-4 py-2">{cliente.telefono}</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => onEdit(cliente)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Modificar
                  </button>
                  <button
                    onClick={() => onDelete(cliente.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  