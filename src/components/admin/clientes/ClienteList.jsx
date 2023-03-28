import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { procesarPeticionGet } from "../../../util/HandleApi";
import { MdPendingActions } from "react-icons/md";
import AgregarClienteModal from "./AgregarClienteModal";
import { Button } from "react-bootstrap";


function ClienteList() {
    const [clientes, setClientes] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("cliente/all");
            setStatus(response.status);
            setClientes(response.data.clientes);
        } catch (error) {
            setError(error.response.data.error);
            setStatus(error.response.status);
        }

    };

    const handleShow = (id_usuario) => {
        window.location.href = `/clientes/expand/${id_usuario}`;
    };

    return (

        <div>



            <div className="container p-5">

                <Button variant="secondary" className="mx-3" onClick={() => setShowModal(true)}>Agregar cliente</Button>

                {console.log(showModal)}
                {showModal && (
                    <AgregarClienteModal
                        showModal={showModal}
                        setShowModal={setShowModal}
                    />
                )}

                <br /> <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Telefono</th>
                            <th>Fecha Nacimiento</th>
                            <th>Email</th>
                            <th>Jornada</th>
                            <th>Acciones</th>

                        </tr>
                    </thead>
                    <tbody>
                        {status === 200 &&
                            clientes.map((cliente) => (
                                <tr key={cliente.id_usuario}>
                                    <td>{cliente.tipo_documento + " - " + cliente.documento}</td>
                                    <td>{cliente.nombre}</td>
                                    <td>{cliente.apellido}</td>
                                    <td>{cliente.telefono}</td>
                                    <td>{cliente.fecha_nacimiento}</td>
                                    <td>{cliente.email}</td>
                                    <td>{cliente.jornada}</td>
                                    <td> <span className="d-inline-block" style={{ cursor: "pointer" }} onClick={() => handleShow(cliente.id_usuario)}>
                                        <MdPendingActions />
                                    </span></td>

                                </tr>
                            ))}
                    </tbody>
                </Table>
                {status !== 200 && (
                    <p className="alert alert-danger py-2 my-2 text-center">{error}</p>
                )}
            </div>



        </div>


    );
}

export default ClienteList;
