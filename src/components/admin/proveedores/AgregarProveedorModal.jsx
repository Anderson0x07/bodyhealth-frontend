import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, TextField, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';




function AgregarProveedorModal(props) {
    const { showModal, setShowModal, agregarProveedores } = props;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCancelar = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        console.log(data)
        try {
            const respuesta = await procesarPeticionPost(`proveedor/guardar`, data);
            console.log("-----------------------------")
            console.log(respuesta)
            setLoading(false);
            console.log(respuesta);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowModal(false);
            const response = await procesarPeticionGet("proveedor/all");

            agregarProveedores(response.data.proveedores);
        } catch (error) {
            setLoading(false);
            console.log(error);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error'
            })
        }

    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <Dialog open={showModal} onClose={handleCancelar} >
            <DialogTitle>Agregar proveedor</DialogTitle>
            <DialogContent>
                <TextField margin="normal" type="text" name="nombre_empresa" label="Nombre"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el nombre del proveedor." />

                <TextField margin="normal" type="text" name="direccion" label="Direccion"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese la dirección del proveedor." />

                <TextField margin="normal" type="text" name="telefono" label="Telefono"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el telefono del proveedor." />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelar}>Cancelar</Button>

                <LoadingButton
                    color="secondary"
                    onClick={handleSubmit}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Save />}
                    variant="contained"
                >
                    Guardar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );

}

export default AgregarProveedorModal
