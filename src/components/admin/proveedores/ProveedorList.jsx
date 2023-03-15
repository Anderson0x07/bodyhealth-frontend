import axios from "axios";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

function ProveedorList() {
    
  const [proveedores, setProveedores] = useState([]);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const url = "http://localhost:8080/proveedor/all";
      const response = await axios.get(url);

      console.log("ERROR:")
      console.log(response);

      if(response.data.error == null){
        setProveedores(response.data.Proveedores);
      } else {
        console.log(response.data.error)
      }
      setStatus(response.status);
      

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
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
          {status != 200 ? (
            <tr><td>No datos disponibles</td></tr>
          ) : (
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
    </div>
  );
}

export default ProveedorList;
