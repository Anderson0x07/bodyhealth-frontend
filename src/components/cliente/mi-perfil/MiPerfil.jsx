import React, { useState } from 'react'
import { Alert, AlertTitle, Avatar, Box, Button, Container, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { Edit, RemoveRedEye } from '@mui/icons-material';
import EditarPerfilModal from './EditarPerfilClienteModal';
import CambiarPasswordModal from './CambiarPasswordModal';
import Swal from 'sweetalert2';
import { procesarPeticionPost } from '../../../utils/HandleApi';
import { obtenerDiferenciaDias } from '../../../utils/obtenerDiasRestantesPlan';
import VerControlFisicoModal from '../../admin/clientes/VerControlFisicoModal';
import VerComprasModal from '../../admin/clientes/VerComprasModal';
import VerRutinasAsignadasModal from '../../admin/clientes/VerRutinasAsignadasModal';
import VerPlanesCompradosModal from '../../admin/clientes/VerPlanesCompradosModal';
import VerEntrenadorAsignadoModal from './VerEntrenadorAsignadoModal';
import ComentarioModal from './ComentarioModal';
import { LoadingButton } from '@mui/lab';
import PerfilDetalles from './PerfilDetalles';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function MiPerfil({ cliente }) {

    const [data, setData] = useState(cliente);

    const [showModalCambioPassword, setShowModalCambioPassword] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [loading, setLoading] = useState(false);


    const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);
    const [showModalPlanesCliente, setShowModalPlanesCliente] = useState(false);
    const [showModalRutinasCliente, setShowModalRutinasCliente] = useState(false);
    const [showModalComprasCliente, setShowModalComprasCliente] = useState(false);
    const [showModalControlesCliente, setShowModalControlesCliente] = useState(false);
    const [showModalVerEntrenador, setShowModalVerEntrenador] = useState(false);
    const [showModalComentario, setShowModalComentario] = useState(false);


    const [clienteDetalles, setClienteDetalles] = useState(cliente.clienteDetalles);
    const [clienteRutinas, setClienteRutinas] = useState(cliente.clienteRutinas);
    const [clienteCompras, setClienteCompras] = useState(cliente.compras);
    const [controlesCliente, setControlesCliente] = useState(cliente.controlClientes);
    const [clienteEntrenador, setClienteEntrenador] = useState(cliente.clienteEntrenadores);


    const handleActualizarPerfil = (infoActualizada) => {
        infoActualizada.fecha_nacimiento = infoActualizada.fecha_nacimiento.slice(0, 10);
        setData(infoActualizada)
    }

    const handleTokenPassword = async () => {
        setLoading(true);

        try {
            const respuesta = await procesarPeticionPost(`cliente/restablecer-password/${cliente.id_usuario}`);

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
                            <PerfilDetalles cliente={cliente} url={url} />
                        </div>
                    </Stack>
                </Container>
            </Box>


            {/* MODAL PARA CAMBIAR CONTRASEÑA */}
            {showModalCambioPassword && (
                <CambiarPasswordModal
                    cliente={cliente}
                    showModalCambioPassword={showModalCambioPassword}
                    setShowModalCambioPassword={setShowModalCambioPassword}
                />
            )}

        </>
    )
}

export default MiPerfil