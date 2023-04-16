import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost, procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


function ComentarioModal(props) {

    const { cliente, showModalComentario, setShowModalComentario, onUpdate } = props;

    const [data, setData] = useState(cliente);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowModalComentario(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        try {
            const respuesta = await procesarPeticionPut(`cliente/editar/${cliente.id_usuario}`, data);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })
            setShowModalComentario(false);

            onUpdate(respuesta.data.cliente);

        } catch (error) {
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
        <Dialog open={showModalComentario} onClose={handleCancelar} >
            <DialogTitle>Realizar comentario</DialogTitle>
            <DialogContent>

                <TextField name="comentario" margin="normal" label="Comentario" onChange={handleChange}
                    fullWidth variant="outlined" defaultValue={cliente.comentario} helperText="Por favor escriba el comentario">

                </TextField>

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancelar}>Cancelar</Button>
                <LoadingButton
                    color="secondary"
                    onClick={handleSubmit}
                    startIcon={<Save />}
                    variant="contained"
                >
                    Guardar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default ComentarioModal;