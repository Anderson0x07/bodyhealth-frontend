import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { procesarPeticionGet, procesarPeticionPost } from '../utils/HandleApi';
import CambiarPasswordModal from '../components/cliente/mi-perfil/CambiarPasswordModal';

function ModalCambioPassword(props) {

    const data = [];
    const { changePassword, setChangePassword, showModalCambioPassword, setShowModalCambioPassword } = props;
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState(null)

    const [showModalToken, setShowModalToken] = useState(false);


    const enviarToken = async () => {

        setLoading(true);

        if (email != null) {
            try {
                const response = await procesarPeticionGet(`usuario/login/${encodeURIComponent(email)}`);

                try {
                    const respuesta = await procesarPeticionPost(`cliente/restablecer-password/${response.data.usuario.id_usuario}`);

                    
                    Swal.fire({
                        title: 'Información',
                        text: respuesta.data.message,
                        icon: 'success',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Vale!',
                        customClass: {
                            container: 'my-swal'
                        }
                    }).then((result) => {
                        if (result.isConfirmed) {
                            console.log("QUE SE ABRA EL MODAL PARA TOKEN")
                            console.log(showModalToken)
                            setShowModalToken(true)
                        }
                    })

                    setShowModalCambioPassword(false);

                    setLoading(false);


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

            } catch (error) {
                setLoading(false);
                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Atención',
                    text: "Usuario no encontrado.",
                    icon: 'error'
                })
            }
        } else {
            setLoading(false);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: "Digite su email correctamente",
                icon: 'error'
            })
        }


    }

    const handleChange = (event) => {
        setEmail(event.target.value)
    }

    const handleOk = () => {
        setShowModalCambioPassword(false)
        setChangePassword(false)
    }

    return (
        <Dialog open={showModalCambioPassword} onClose={handleOk} maxWidth={'md'}>
            <DialogTitle>Cambio de contraseña</DialogTitle>
            <DialogContent>


                <TextField margin="normal" type="text" name="email" label="Digite su email"
                    onChange={handleChange} fullWidth variant="outlined" />


            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleOk}>Cancelar</Button>
                <LoadingButton
                    color="secondary"
                    onClick={enviarToken}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Save />}
                    variant="contained"
                >
                    Enviar
                </LoadingButton>
            </DialogActions>


            
        </Dialog>
    )
}

export default ModalCambioPassword