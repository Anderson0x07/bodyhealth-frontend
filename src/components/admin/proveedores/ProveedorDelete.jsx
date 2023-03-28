import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { v } from "../../../style/Variables";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'
import { procesarPeticionDelete, procesarPeticionGet } from '../../../util/HandleApi';
import Swal from 'sweetalert2'

function ProveedorDelete() {

    const [proveedor, setProveedor] = useState({});

    const pagina = window.location.href;
    const urlParts = pagina.split("/");
    const id = urlParts[urlParts.length - 1];


    useEffect(() => {
        fetchProveedor();
    }, []);

    const fetchProveedor = async () => {
        try {
            const response = await procesarPeticionGet(`proveedor/${id}`);
            setProveedor(response.data.proveedor);
        } catch (error) {
            setError(error.response.data.error)
        }
    };

    const handleBack = () => {
        window.location.href = `/proveedores/expand/${proveedor.id_proveedor}`;
    }

    const handleDelete = () => {
        try {
            
            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el proveedor?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, elimínalo'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await procesarPeticionDelete(`proveedor/eliminar/${proveedor.id_proveedor}`);
                    Swal.fire(
                        'Información',
                        response.data.message,
                        'success'
                    ).then(() => {
                        window.location.href = "/proveedores";
                    })
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
        }
    };

    return (
        <div className='container p-5'>
            <h1 className='mx-5'>Datos del proveedor</h1>
            <h4 className='mx-5'>El proveedor es usado en las siguientes maquinas y productos:</h4>
            <Divider />
            <Container fluid className='p-5'>
                
                <Row>
                    <Col md={6}>
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td>Id de maquina</td>
                                    <td>Nombre de la maquina</td>
                                </tr>

                                {proveedor.maquinas.map((maquina) => (
                                    <tr key={maquina.id}>
                                        <td>{maquina.id}</td>
                                        <td>{maquina.nombre}</td>
                                    </tr>
                                )) }

                            </tbody>
                        </Table>
                    </Col>
                    <Col md={6}>
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td>Id del producto</td>
                                    <td>Nombre del producto</td>
                                </tr>

                                {proveedor.productos.map((producto) => (
                                    <tr key={producto.id_producto}>
                                        <td>{producto.id_producto}</td>
                                        <td>{producto.nombre}</td>
                                    </tr>
                                )) }

                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Divider />
                <Row className="justify-content-end py-3">
                    <Col md={6} className="ml-auto">
                        <Button variant="dark" className="mx-3" onClick={() => handleBack()}>Regresar</Button>
                    </Col>
                    <Col md={6} className="ml-auto">
                        <Button variant="danger" className="mx-3" onClick = { handleDelete }>Eliminar</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

export default ProveedorDelete