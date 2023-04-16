import React, { useState } from 'react'
import { Alert, AlertTitle, Avatar, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { Edit, RemoveRedEye } from '@mui/icons-material';
import EditarPerfilModal from './EditarPerfilModal';
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


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function MiPerfil({ cliente }) {

    const [data, setData] = useState(cliente);

    const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);
    const [showModalCambioPassword, setShowModalCambioPassword] = useState(false);
    const [showModalPlanesCliente, setShowModalPlanesCliente] = useState(false);
    const [showModalRutinasCliente, setShowModalRutinasCliente] = useState(false);
    const [showModalComprasCliente, setShowModalComprasCliente] = useState(false);
    const [showModalControlesCliente, setShowModalControlesCliente] = useState(false);
    const [showModalVerEntrenador, setShowModalVerEntrenador] = useState(false);
    const [showModalComentario, setShowModalComentario] = useState(false);

    const [changePassword, setChangePassword] = useState(false);


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

        } catch (error) {
            console.log(error)

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
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalEditarPerfil(true)}>Editar Información</Button>

                {!changePassword ?
                    <Button variant="contained" startIcon={<Edit />} onClick={handleTokenPassword}>Solicitar cambio de contraseña</Button>
                    : <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalCambioPassword(true)}>Cambiar Contraseña</Button>}
            </Stack>

            {cliente.clienteDetalles.length > 0 && obtenerDiferenciaDias(cliente.clienteDetalles[cliente.clienteDetalles.length - 1].fecha_fin) > 0
                ?

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>

                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Alert severity="success" color="info">
                            <AlertTitle>Cuentas con el {cliente.clienteDetalles[cliente.clienteDetalles.length - 1].plan.plan}</AlertTitle>
                        </Alert>

                    </Grid>

                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Alert severity="success" color="info">
                            <AlertTitle>Tiempo restante {obtenerDiferenciaDias(cliente.clienteDetalles[cliente.clienteDetalles.length - 1].fecha_fin)} dias</AlertTitle>
                        </Alert>

                    </Grid>

                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Alert severity="success" color="info">
                            <AlertTitle>Fecha de inicio {cliente.clienteDetalles[cliente.clienteDetalles.length - 1].fecha_inicio}</AlertTitle>
                        </Alert>

                    </Grid>

                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Alert severity="success" color="info">
                            <AlertTitle>Fecha de finalización {cliente.clienteDetalles[cliente.clienteDetalles.length - 1].fecha_fin}</AlertTitle>
                        </Alert>

                    </Grid>
                </Grid>
                : false
            }

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>

                <Avatar src={url + data.foto} style={{ margin: '0 auto', width: '300px', height: '300px' }} />
            </div>

            <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={8} md={12} pb={5}>
                    <TableContainer sx={{ minWidth: 100 }}>
                        <Table style={{ border: "1px solid black" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='clave' >Tipo de documento</TableCell>
                                    <TableCell className='value' align="right">{data.tipo_documento}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave' >N° Documento</TableCell>
                                    <TableCell className='value' align="right">{data.documento}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Nombre</TableCell>
                                    <TableCell className='value' align="right">{data.nombre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Apellido</TableCell>
                                    <TableCell className='value' align="right">{data.apellido}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Teléfono</TableCell>
                                    <TableCell className='value' align="right">{data.telefono}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Fecha de nacimiento</TableCell>
                                    <TableCell className='value' align="right">{data.fecha_nacimiento}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Email</TableCell>
                                    <TableCell className='value' align="right">{data.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Comentario</TableCell>
                                    <TableCell className='value' align="right">{data.comentario}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Jornada</TableCell>
                                    <TableCell className='value' align="right">{data.jornada === 'Manana' ? 'Mañana' : 'Tarde'}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ mt: 8 }}>

                    {clienteEntrenador.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalVerEntrenador(true)}>Ver entrenador</Button>
                        </Grid>
                        : false
                    }

                    {clienteDetalles.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalPlanesCliente(true)}>Ver planes</Button>
                        </Grid>
                        : false
                    }

                    {clienteRutinas.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalRutinasCliente(true)}>Ver rutinas</Button>
                        </Grid>
                        : false
                    }

                    {clienteCompras.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalComprasCliente(true)}>Ver compras</Button>
                        </Grid>
                        : false
                    }

                    {controlesCliente.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalControlesCliente(true)}>Ver control fisico</Button>
                        </Grid>
                        : false
                    }
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalComentario(true)}>Realizar comentario</Button>
                    </Grid>
                </Grid>
            </Grid>

            {/* MODAL PARA EDITAR LA INFO */}
            {showModalEditarPerfil && (
                <EditarPerfilModal
                    cliente={data}
                    showModalEditarPerfil={showModalEditarPerfil}
                    setShowModalEditarPerfil={setShowModalEditarPerfil}
                    onUpdate={handleActualizarPerfil}
                />
            )}

            {/* MODAL PARA CAMBIAR CONTRASEÑA */}
            {showModalCambioPassword && (
                <CambiarPasswordModal
                    cliente={data}
                    showModalCambioPassword={showModalCambioPassword}
                    setShowModalCambioPassword={setShowModalCambioPassword}
                />
            )}

            {/* MODAL PARA VER PLANES ADQUIRIDOS */}
            {showModalPlanesCliente && (
                <VerPlanesCompradosModal
                    clienteDetalles={clienteDetalles}
                    showModalPlanesCliente={showModalPlanesCliente}
                    setShowModalPlanesCliente={setShowModalPlanesCliente}
                />
            )}
            {/* MODAL PARA VER RUTINAS ASIGNADAS */}
            {showModalRutinasCliente && (
                <VerRutinasAsignadasModal
                    clienteRutinas={clienteRutinas}
                    showModalRutinasCliente={showModalRutinasCliente}
                    setShowModalRutinasCliente={setShowModalRutinasCliente}
                />
            )}

            {/* MODAL PARA VER COMPRAS DEL CLIENTE */}
            {showModalComprasCliente && (
                <VerComprasModal
                    clienteCompras={clienteCompras}
                    showModalComprasCliente={showModalComprasCliente}
                    setShowModalComprasCliente={setShowModalComprasCliente}
                />
            )}

            {/* MODAL PARA VER CONTROL FISICO DEL CLIENTE */}
            {showModalControlesCliente && (
                <VerControlFisicoModal
                    controlesCliente={controlesCliente}
                    showModalControlesCliente={showModalControlesCliente}
                    setShowModalControlesCliente={setShowModalControlesCliente}
                />
            )}

            {/* MODAL PARA VER ENTRENADOR ASIGNADO */}
            {showModalVerEntrenador && (
                <VerEntrenadorAsignadoModal
                    clienteEntrenador={clienteEntrenador}
                    showModalVerEntrenador={showModalVerEntrenador}
                    setShowModalVerEntrenador={setShowModalVerEntrenador}
                />
            )}

            {/* MODAL PARA REALIZAR UN COMENTARIO */}
            {showModalComentario && (
                <ComentarioModal
                    cliente={data}
                    showModalComentario={showModalComentario}
                    setShowModalComentario={setShowModalComentario}
                    onUpdate={handleActualizarPerfil}
                />
            )}

        </>
    )
}

export default MiPerfil