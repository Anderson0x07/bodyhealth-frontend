import React, { useState } from 'react';
import { procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


function CambiarPasswordModal(props) {

    const { entrenador, showModalCambioPassword, setShowModalCambioPassword } = props;

    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({});


    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowModalCambioPassword(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        try {
            console.log(data)
            const respuesta = await procesarPeticionPost(`entrenador/verificar-token`, data);
            setLoading(false);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowModalCambioPassword(false);

        } catch (error) {
            setLoading(false);

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
        <Dialog open={showModalCambioPassword} onClose={handleCancelar} >
            <DialogTitle>Cambio de contraseña</DialogTitle>
            <DialogContent>


                <TextField margin="normal" type="text" name="token" label="Token"
                    onChange={handleChange} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="newPassword" label="Contraseña nueva"
                    onChange={handleChange} fullWidth variant="outlined" />

                
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancelar}>Cancelar</Button>
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

export default CambiarPasswordModal