import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { procesarPeticionPost } from '../../../util/HandleApi';
import Swal from 'sweetalert2'
import { Modal } from 'react-bootstrap';


function AgregarClienteModal(props) {
    console.log(props)
    const { showModal, setShowModal } = props;
    const [data, setData] = useState({});
    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState('');

    const handleFileChange = (event) => {

        const reader = new FileReader();
        const file = event.target.files[0];
        setFileName(file.name)

        reader.onloadend = () => {
            setImage(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowModal(false);
    };


    const handleSubmit = async (event) => {

        console.log(data)
        data.estado = true;
        data.comentario = "hola";
        data.foto=image+" "+fileName;

        console.log(foto);

        console.log(data);

        event.preventDefault();

        try {
            const respuesta = await procesarPeticionPost(`cliente/guardar`, data);
            console.log(respuesta)
            setShowModal(false);

            Swal.fire({
                icon: 'success',
                title: "Información",
                text: respuesta.data.message
            })


        } catch (error) {
            console.log(error)

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.error
            })
        }
    }

    return (
        <Modal show={showModal} onHide={handleCancelar}>
            
            <Modal.Header closeButton>
                <Modal.Title>Agregar cliente</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formDocumento">
                        <Form.Label>Documento</Form.Label>
                        <Form.Control type='number' name="documento" placeholder="Ingrese el documento" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formTipoDocumento">
                        <Form.Label>Tipo Documento</Form.Label>
                        <Form.Control type="text" name="tipo_documento" placeholder="Ingrese el tipo de documento" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control type="text" name="nombre" placeholder="Ingrese nombre" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formApellido">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control type="text" name="apellido" placeholder="Ingrese apellido" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formTelefono">
                        <Form.Label>Telefono</Form.Label>
                        <Form.Control type="text" name="telefono" placeholder="Ingrese telefono" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formFechaNacimiento">
                        <Form.Label>Fecha de Nacimiento</Form.Label>
                        <Form.Control type="date" name="fecha_nacimiento" placeholder="Ingrese la Fecha de Nacimiento" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name="email" placeholder="Ingrese su email" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="password" placeholder="Ingrese password" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group controlId="formFoto">
                        <Form.Label>Foto</Form.Label>
                        <Form.Control type="file" name="foto" onChange={handleFileChange} />
                    </Form.Group>
                    <Form.Group controlId="formJornada">
                        <Form.Label>Jornada</Form.Label>
                        <Form.Control type="text" name="jornada" placeholder="Ingrese jornada" onChange={handleChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCancelar()}>
                    Cancelar
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Guardar cambios
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AgregarClienteModal;


