import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { procesarPeticionPut } from '../../../util/HandleApi';
import Swal from 'sweetalert2'


function EditarProveedorModal(props) {
    const {showEditModal, setShowEditModal, proveedor, onUpdate} = props;
    const [data, setData] = useState(proveedor);

    const handleChange = (event) => {
      setData({ ...data, [event.target.name]: event.target.value });
    };

  
    const handleCancelar = () => {
      setShowEditModal(false);
    };


    const handleSubmit = async (event) => {
      event.preventDefault();

      try {
        const respuesta = await procesarPeticionPut(`proveedor/editar/${proveedor.id_proveedor}`, data);
        console.log(respuesta)
        setShowEditModal(false);
        onUpdate(data);

        Swal.fire({
          icon: 'success',
          title: "Información",
          text: respuesta.data.message
        })


      } catch(error) {
        console.log(error)

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data.error
        })
      }
    };
    
    return (
      <Modal show={showEditModal} onHide={handleCancelar}>
        <Modal.Header closeButton>
          <Modal.Title>Editar proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formNombreEmpresa">
              <Form.Label>Nombre de la empresa</Form.Label>
              <Form.Control type="text" name="nombre_empresa" placeholder="Ingrese el nombre de la empresa" defaultValue={proveedor.nombre_empresa} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" name="telefono" placeholder="Ingrese el telefono" defaultValue={proveedor.telefono} onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" name="direccion" placeholder="Ingrese la direccion" defaultValue={proveedor.direccion} onChange={handleChange}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default EditarProveedorModal;

