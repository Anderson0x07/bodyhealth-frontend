import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function ProveedorList() {
    
  const [proveedores, setProveedores] = useState([]);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = "http://localhost:8080/proveedor/all";
      const response = await axios.get(url);

      setStatus(response.status)
      setProveedores(response.data.proveedor);
      

    } catch (error) {
      setError(error.response.data.error);
      setStatus(error.response.status);

    }
  };

  return (
    <div className="container p-5">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id Proveedor</th>
            <th>Nombre Empresa</th>
            <th>Dirección</th>
            <th>Teléfono</th>
          </tr>
        </thead>
        <tbody>
          {status === 200 && (
            proveedores.map((proveedor) => (
              <tr key={proveedor.id_proveedor}>
                <td>{proveedor.id_proveedor}</td>
                <td>{proveedor.nombre_empresa}</td>
                <td>{proveedor.direccion}</td>
                <td>{proveedor.telefono}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
        {status !== 200 && (<p className="alert alert-danger py-2 my-2 text-center">{error}</p>)}
    </div>
  );
}

export default ProveedorList;
