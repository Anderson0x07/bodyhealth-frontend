import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';



function EditarProveedorModal(props) {
    const { editedProveedor, setEditedProveedor, showEditModal, setShowEditModal } = props;
    const [nombreEmpresa, setNombreEmpresa] = useState(editedProveedor.nombre_empresa);
    const [telefono, setTelefono] = useState(editedProveedor.telefono);
    const [direccion, setDireccion] = useState(editedProveedor.direccion);
    const [error, setError] = useState('');
  
    const handleNombreEmpresaChange = (event) => {
      setNombreEmpresa(event.target.value);
    };
  
    const handleTelefonoChange = (event) => {
      setTelefono(event.target.value);
    };
  
    const handleDireccionChange = (event) => {
      setDireccion(event.target.value);
    };
  
    const handleEditarProveedor = async () => {
      try {
        const url = `http://localhost:8080/proveedor/editar/${editedProveedor.id_proveedor}`;
        const data = { nombre_empresa: nombreEmpresa, telefono: telefono, direccion: direccion };
        const response = await axios.put(url, data);
        setEditedProveedor(response.data.proveedor);
        setShowEditModal(false);
      } catch (error) {
        setError(error.response.error);
      }
    };
  
    const handleCancelar = () => {
      setShowEditModal(false);
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
              <Form.Control type="text" placeholder="Ingrese el nombre de la empresa" value={nombreEmpresa} onChange={handleNombreEmpresaChange} />
            </Form.Group>
            <Form.Group controlId="formTelefono">
              <Form.Label>Telefono</Form.Label>
              <Form.Control type="text" placeholder="Ingrese el telefono" value={telefono} onChange={handleTelefonoChange} />
            </Form.Group>
            <Form.Group controlId="formDireccion">
              <Form.Label>Direccion</Form.Label>
              <Form.Control type="text" placeholder="Ingrese la direccion" value={direccion} onChange={handleDireccionChange} />
            </Form.Group>
          </Form>
          {error && <p>{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelar}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleEditarProveedor}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  export default EditarProveedorModal;

