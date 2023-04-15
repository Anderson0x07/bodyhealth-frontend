import React from 'react'
import { useState } from 'react';
import { procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';


function EditarMusculoModal(props) {
    const { showEditModal, setShowEditModal, musculo, onUpdate } = props;

    const [data, setData] = useState(musculo);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowEditModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        console.log(data)
        try {
            const respuesta = await procesarPeticionPut(`musculo/editar/${musculo.id_musculo}`, data);
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

            setShowEditModal(false);
            onUpdate(respuesta.data.musculo);
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


    };

    return (
        <Dialog open={showEditModal} onClose={handleCancelar} >
            <DialogTitle>Editar Musculo</DialogTitle>
            <DialogContent>

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} defaultValue={musculo.nombre} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="grupo_muscular" label="Grupo Muscular"
                    onChange={handleChange} defaultValue={musculo.grupo_muscular} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="descripcion" label="Descripción"
                    onChange={handleChange} defaultValue={musculo.descripcion} fullWidth variant="outlined" />

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

export default EditarMusculoModal
