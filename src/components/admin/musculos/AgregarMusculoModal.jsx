import React, { useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from "../../../utils/HandleApi";
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';


function AgregarMusculoModal(props) {
    const { showModal, setShowModal, agregarMusculos } = props;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCancelar = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            const respuesta = await procesarPeticionPost(`musculo/guardar`, data);
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
            const response = await procesarPeticionGet("musculo/all");

            agregarMusculos(response.data.musculos);

        } catch (error) {
            setLoading(false);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: error.response.data.errors != null ? "Campos obligatorios" : error.response.data.error,
                icon: 'error'
            })
        }

    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };


    return (
        <Dialog open={showModal} onClose={handleCancelar} >
            <DialogTitle>Agregar musculo</DialogTitle>
            <DialogContent>
                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el nombre del musculo." />

                <TextField margin="normal" type="text" name="grupo_muscular" label="Grupo muscular"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el grupo muscular al que pertenece el musculo." />

                <TextField margin="normal" type="text" name="descripcion" label="Descripción"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese la descripción  del musculo." />
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

export default AgregarMusculoModal
