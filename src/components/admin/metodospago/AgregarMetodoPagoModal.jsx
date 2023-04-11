import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, TextField, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

function AgregarMetodoPagoModal(props) {
    const { showModal, setShowModal, agregarMetodoPago } = props;
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
            const respuesta = await procesarPeticionPost(`metodopago/guardar`, data);
            console.log(respuesta)
            setLoading(false);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowModal(false);
            const response = await procesarPeticionGet("metodopago/all");

            agregarMetodoPago(response.data.metodospago);
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
            <DialogTitle>Agregar Metodo de pago</DialogTitle>
            <DialogContent>
                <TextField margin="normal" type="text" name="descripcion" label="Metodo de pago"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el metodo de pago" />

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
    )
}

export default AgregarMetodoPagoModal
