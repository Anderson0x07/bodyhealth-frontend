import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import styled from "styled-components";


export function Proveedor() {
    const [proveedores, setProveedores] = useState([]);
    const [status,setStatus]=useState(0)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const url = "http://localhost:8080/proveedor/all";
            const response = await axios.get(url);
            console.log(response)
            setProveedores(response.data.Proveedores);

            console.log(response.status)
            setStatus(response.status)

        } catch (error) {
            console.error(error);
        }
    };

    return (

        <Container>
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
                {status!=200?<tr>No datos disponibles</tr>:proveedores.map((proveedor) => (
                    <tr key={proveedor.id_proveedor}>
                        <td>{proveedor.id_proveedor}</td>
                        <td>{proveedor.nombre_empresa}</td>
                        <td>{proveedor.direccion}</td>
                        <td>{proveedor.telefono}</td>
                    </tr>
                ))}
           
            </tbody>
        </Table>
        <p></p>
        </Container>
    )
}

const Container =styled.div`
  height:100vh;
`
