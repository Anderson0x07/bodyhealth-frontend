import React, { useState } from 'react'
import { Box, Container, Stack, Typography } from '@mui/material'
import { Edit } from '@mui/icons-material';
import CambiarPasswordModal from './CambiarPasswordModal';
import Swal from 'sweetalert2';
import { procesarPeticionPost } from '../../../utils/HandleApi';
import { LoadingButton } from '@mui/lab';
import PerfilDetalles from './PerfilDetalles';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function MiPerfil({ admin }) {

    const [showModalCambioPassword, setShowModalCambioPassword] = useState(false);

    const [changePassword, setChangePassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const handleTokenPassword = async () => {
        setLoading(true);

        try {
            const respuesta = await procesarPeticionPost(`admin/restablecer-password/${admin.id_usuario}`);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setChangePassword(true);
            setLoading(false);


        } catch (error) {
            console.log(error)
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
    }

    return (
        <>

            <Box component="main" sx={{ flexGrow: 1 }}>
                <Container maxWidth="lg">

                    <Stack spacing={3}>
                        <div>

                            <Stack direction="row" justifyContent="space-between" mb={3} >
                                <Typography variant="h4">
                                    Mi Cuenta
                                </Typography>

                                {!changePassword ?
                                    <LoadingButton
                                        color="secondary"
                                        onClick={handleTokenPassword}
                                        loading={loading}
                                        loadingPosition="start"
                                        startIcon={<Edit />}
                                        variant="contained"
                                    >
                                        Solicitar cambio de contraseña
                                    </LoadingButton>
                                    : <LoadingButton
                                        color="secondary"
                                        onClick={() => setShowModalCambioPassword(true)}
                                        loading={loading}
                                        loadingPosition="start"
                                        startIcon={<Edit />}
                                        variant="contained"
                                    >
                                        Cambiar Contraseña
                                    </LoadingButton>
                                }
                            </Stack>
                        </div>

                        <div>
                            <PerfilDetalles admin={admin} url={url} />
                        </div>
                    </Stack>
                </Container>
            </Box>

            {/* MODAL PARA CAMBIAR CONTRASEÑA */}
            {showModalCambioPassword && (
                <CambiarPasswordModal
                    admin={admin}
                    showModalCambioPassword={showModalCambioPassword}
                    setShowModalCambioPassword={setShowModalCambioPassword}
                />
            )}

        </>
    )
}

export default MiPerfil