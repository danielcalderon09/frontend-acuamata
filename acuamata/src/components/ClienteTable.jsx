export default function ClienteTable({ clientes, onEdit, onDelete }) {
  return (
    <div className="table-responsive shadow-sm rounded">
      <table className="table table-bordered table-hover">
        <thead className="table-light text-center">
          <tr>
            <th className="align-middle">Nombre</th>
            <th className="align-middle">Apellido</th>
            <th className="align-middle">Dirección</th>
            <th className="align-middle">Teléfono</th>
            <th className="align-middle">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="text-center align-middle">
              <td className="align-middle">{cliente.nombre}</td>
              <td className="align-middle">{cliente.apellido}</td>
              <td className="align-middle">{cliente.direccion}</td>
              <td className="align-middle">{cliente.telefono}</td>
              <td className="align-middle">
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onEdit(cliente)}
                >
                  Modificar
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(cliente.id)}
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
