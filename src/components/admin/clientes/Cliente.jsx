import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { v } from "../../../style/Variables";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button'
import imagen from '../../../assets/Logo-BodyHealth.jpeg';
import { procesarPeticionGet } from '../../../util/HandleApi';
import { useNavigate } from 'react-router-dom';



function Cliente() {
    const [cliente, setCliente] = useState({});
    const [editedCliente, setEditedCliente] = useState({});
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);


    const navigate = useNavigate();
    console.log(navigate)

    const pagina = window.location.href;
    const urlParts = pagina.split("/");
    const id = urlParts[urlParts.length - 1];

    useEffect(() => {
        getCliente();
    }, []);

    const getCliente = async () => {
        try {
            const response = await procesarPeticionGet(`cliente/${id}`);
            setCliente(response.data.cliente);
        } catch (error) {
            setError(error.response.data.error)
        }
    };

    const handleBack = () => {
        window.location.href = `/clientes`;
    };

    const handleDelete = () => {
        navigate(`/clientes/expand-delete/${cliente.id_cliente}`);
    };

    const handleEditar = () => {
        setEditedCliente(cliente);
        setShowEditModal(true);
    };

    const handleUpdate = (updatedData) => {
        setCliente(updatedData)
    }

    return (
        <div className='container p-5'>
            <h1 className='mx-5'>Datos del cliente</h1>
            <Divider />
            <Container fluid className='p-5'>
                <Row>
                    <Col md={4}>
                        <Image src={imagen} fluid />
                    </Col>
                    <Col md={8}>
                        <Table striped bordered>
                            <tbody>
                                <tr>
                                    <td>Tipo documento</td>
                                    <td>{cliente.tipo_documento}</td>
                                </tr>
                                <tr>
                                    <td>Documento</td>
                                    <td>{cliente.documento}</td>
                                </tr>
                                <tr>
                                    <td>Telefono</td>
                                    <td>{cliente.telefono}</td>
                                </tr>
                                <tr>
                                    <td>Direccion</td>
                                    <td>{cliente.direccion}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
                <Divider />
                <Row className="justify-content-end py-3">
                    <Col md={4} className="ml-auto">
                        <Button variant="dark" className="mx-3" onClick={() => handleBack()}>Regresar</Button>
                    </Col>
                    <Col md={4} className="ml-auto">
                        <Button variant="secondary" className="mx-3" onClick={() => handleEditar()}>Editar</Button>
                    </Col>
                    <Col md={4} className="ml-auto">
                        <Button variant="danger" className="mx-3" onClick={() => handleDelete()}>Eliminar</Button>
                    </Col>
                </Row>
            </Container>
            {showEditModal && (
                <EditarclienteModal
                    cliente={cliente}
                    showEditModal={showEditModal}
                    setShowEditModal={setShowEditModal}
                    onUpdate={handleUpdate}
                />
            )}
        </div>
    );
}

const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg3};
  margin: ${v.lgSpacing} 0;
`;

export default Cliente;