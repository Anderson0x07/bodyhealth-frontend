import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionGet } from '../../../utils/HandleApi';
import EditarClienteModal from './EditarClienteModal';
import AsignarEntrenadorModal from './AsignarEntrenadorModal';
import { ArrowBack, CheckCircleRounded, RemoveRedEye, WidgetsRounded } from '@mui/icons-material';
import Label from '../dashboard/label/Label';
import { Alert, AlertTitle, Avatar, Badge, Button, Container, Grid, IconButton, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import EditarAsignacionEntrenadorModal from './EditarAsignacionEntrenadorModal';
import AsignarPlanModal from './AsignarPlanModal';
import VerPlanesCompradosModal from './VerPlanesCompradosModal';
import AsignarRutinaModal from './AsignarRutinaModal';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import { obtenerDiferenciaDias } from '../../../utils/obtenerDiasRestantesPlan';
import EditarAsignacionRutinaModal from './EditarAsignacionRutinaModal';
import VerRutinasAsignadasModal from './VerRutinasAsignadasModal';
import VerComprasModal from './VerComprasModal';
import VerControlFisicoModal from './VerControlFisicoModal';
import AsignarControlFisico from './AsignarControlFisico';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Cliente() {
    const [cliente, setCliente] = useState({});
    const [clienteEntrenador, setClienteEntrenador] = useState(null);
    const [clienteRutinas, setClienteRutinas] = useState([]);
    const [clienteCompras, setClienteCompras] = useState([]);
    const [clienteDetalles, setClienteDetalles] = useState([]);
    const [controlesCliente, setControlesCliente] = useState([]);
    const [error, setError] = useState("");


    //MODALES
    const [showModalEditarCliente, setShowModalEditarCliente] = useState(false);
    const [showModalAsignarEntrenador, setShowModalAsignarEntrenador] = useState(false);
    const [showModalEditarAsignacionEntrenador, setShowModalEditarAsignacionEntrenador] = useState(false);
    const [showModalAsignarRutina, setShowModalAsignarRutina] = useState(false);
    const [showModalEditarAsignacionRutina, setShowModalEditarAsignacionRutina] = useState(false);
    const [showModalComprasCliente, setShowModalComprasCliente] = useState(false);
    const [showModalPlanesCliente, setShowModalPlanesCliente] = useState(false);
    const [showModalAsignarPlan, setShowModalAsignarPlan] = useState(false);
    const [showModalControlesCliente, setShowModalControlesCliente] = useState(false);
    const [showModalAsignarControl, setShowModalAsignarControl] = useState(false);
    const [showModalRutinasCliente, setShowModalRutinasCliente] = useState(false);



    const navigate = useNavigate();
    const { id } = useParams();


    useEffect(() => {
        getCliente();
    }, []);

    const getCliente = async () => {
        try {
            const response = await procesarPeticionGet(`cliente/${id}`);
            setCliente(response.data.cliente);
            setClienteEntrenador(response.data.cliente.clienteEntrenadores[0]);
            setClienteRutinas(response.data.cliente.clienteRutinas);
            setClienteCompras(response.data.cliente.compras);
            setClienteDetalles(response.data.cliente.clienteDetalles);
            setControlesCliente(response.data.cliente.controlClientes);

        } catch (error) {
            setError(error.response.data.error)
        }
    };


    const handleActualizarCliente = (clienteActualizado) => {
        clienteActualizado.fecha_nacimiento = clienteActualizado.fecha_nacimiento.slice(0, 10);
        setCliente(clienteActualizado)
    }

    const handleActualizarAsignacionEntrenador = (asignacionEntrenadorActualizada) => {
        setClienteEntrenador(asignacionEntrenadorActualizada);
    }

    const handleActualizarAsignacionPlan = (asignacionPlanActualizada) => {
        setClienteDetalles(prevState => [...prevState, asignacionPlanActualizada]);
    }

    const handleActualizarAsignacionRutina = (asignacionRutinaActualizada) => {
        setClienteRutinas(prevState => [...prevState, asignacionRutinaActualizada]);

    }

    const handleActualizarControl = (nuevoControl) => {
        setControlesCliente(prevState => [...prevState, nuevoControl]);
    }



    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };

    const obtenerUltimoPlan = () => {
        if (clienteDetalles.length === 0) {
            return null;
        }

        return clienteDetalles.reduce((maxClienteDetalle, clienteDetalle) => {
            if (clienteDetalle.id_factura > maxClienteDetalle.id_factura) {
                return clienteDetalle;
            } else {
                return maxClienteDetalle;
            }
        });

    }



    return (
        <div>
            <Container>
                {error != "" && (
                    <Alert sx={{ marginBottom: '50px' }} variant="outlined" severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {error}
                    </Alert>
                )}


                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" gutterBottom>
                        Datos del cliente
                    </Typography>
                    <Tooltip title="Menú" placement="left">

                        <IconButton size="large" color="inherit" onClick={handleOpenMenu}>
                            <Badge color="secondary" variant="dot">
                                <WidgetsRounded />
                            </Badge>
                        </IconButton>

                    </Tooltip>


                    <Menu
                        keepMounted
                        anchorEl={open}
                        open={Boolean(open)}
                        onClose={handleCloseMenu}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    >

                        <MenuItem selected sx={{ typography: 'body2' }} onClick={() => setShowModalEditarCliente(true)}>
                            <DriveFileRenameOutlineTwoToneIcon />Editar cliente
                        </MenuItem>

                        {clienteEntrenador != null
                            &&
                            <MenuItem onClick={() => setShowModalEditarAsignacionEntrenador(true)} sx={{ typography: 'body2' }}>
                                <DriveFileRenameOutlineTwoToneIcon />Cambiar entrenador
                            </MenuItem>
                        }

                    </Menu>

                </Stack>

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={8} md={12} pb={5} >
                            <Container>
                                {<Avatar src={url + cliente.foto} style={{ width: '300px', height: '300px' }} />}

                            </Container>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={4} md={6} columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={8} md={12} pb={5}>

                            {clienteDetalles.length > 0
                                &&
                                obtenerDiferenciaDias(obtenerUltimoPlan().fecha_fin) > 0
                                &&
                                <Alert sx={{ marginBottom: '10px' }} variant="standard" severity="success">
                                    <AlertTitle>Tiempo restante {obtenerDiferenciaDias(obtenerUltimoPlan().fecha_fin)} dias</AlertTitle>
                                </Alert>
                            }


                            <TableContainer  >
                                <Table style={{ border: "1px solid black" }}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className='clave' >Tipo de documento</TableCell>
                                            <TableCell className='value' align="right">{cliente.tipo_documento + " - " + cliente.documento}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Nombres</TableCell>
                                            <TableCell className='value' align="right">{cliente.nombre + " " + cliente.apellido}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Telefono</TableCell>
                                            <TableCell className='value' align="right">{cliente.telefono}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Fecha de nacimiento</TableCell>
                                            <TableCell className='value' align="right">{cliente.fecha_nacimiento}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Jornada</TableCell>
                                            <TableCell className='value' align="right">{cliente.jornada === 'Manana' ? 'Mañana' : 'Tarde'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Telefono</TableCell>
                                            <TableCell className='value' align="right">{cliente.telefono}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Estado</TableCell>
                                            <TableCell className='value' align="right">
                                                <Label color={(cliente.estado === false && 'error') || 'info'}>{cliente.estado === true ? 'Activo' : 'Inactivo'}</Label>
                                            </TableCell>
                                        </TableRow>

                                        <TableRow>
                                            <TableCell className='clave'>Comentario</TableCell>
                                            <TableCell className='value' align="right">{cliente.comentario != null ? cliente.comentario : 'Sin comentarios...'}</TableCell>
                                        </TableRow>

                                        {clienteEntrenador != null
                                            &&
                                            <TableRow>
                                                <TableCell className='clave'>Entrenador</TableCell>
                                                <TableCell className='value' align="right">
                                                    {clienteEntrenador.entrenador != null
                                                        ? clienteEntrenador.entrenador.nombre + " " + clienteEntrenador.entrenador.apellido
                                                        : "Entrenador sin asignar"
                                                    }

                                                </TableCell>
                                            </TableRow>
                                        }

                                        {clienteDetalles.length > 0
                                            &&
                                            <TableRow>
                                                <TableCell className='clave'>Plan</TableCell>
                                                <TableCell className='value' align="right">
                                                    {obtenerUltimoPlan().plan != null
                                                        && obtenerUltimoPlan().plan.plan + " por " + obtenerUltimoPlan().plan.meses + (obtenerUltimoPlan().plan.meses == 1 ? " mes" : " meses")
                                                    }

                                                </TableCell>
                                            </TableRow>
                                        }


                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate(`/admin/dashboard/clientes`)}>Atras</Button>
                    </Grid>
                    {clienteEntrenador == null &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<CheckCircleRounded />} onClick={() => setShowModalAsignarEntrenador(true)}>Asignar entrenador</Button>
                        </Grid>
                    }

                    {clienteDetalles.length == 0 &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<CheckCircleRounded />} onClick={() => setShowModalAsignarPlan(true)}>Asignar plan</Button>
                        </Grid>
                    }

                    {clienteDetalles.length > 0 &&
                        <>
                            {obtenerDiferenciaDias(obtenerUltimoPlan().fecha_fin) <= 0
                                && <Grid item xs={2} sm={2} md={3} >
                                    <Button variant="contained" startIcon={<CheckCircleRounded />} onClick={() => setShowModalAsignarPlan(true)}>Asignar plan</Button>
                                </Grid>
                            }
                            <Grid item xs={2} sm={2} md={3} >
                                <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalPlanesCliente(true)}>Ver planes</Button>
                            </Grid>

                        </>

                    }

                    {clienteRutinas.length == 0 &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<CheckCircleRounded />} onClick={() => setShowModalAsignarRutina(true)}>Asignar rutina</Button>
                        </Grid>
                    }

                    {clienteRutinas.length > 0 &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalRutinasCliente(true)}>Ver rutinas</Button>
                        </Grid>
                    }

                    {clienteCompras.length > 0 &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalComprasCliente(true)}>Ver compras</Button>
                        </Grid>
                    }

                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<CheckCircleRounded />} onClick={() => setShowModalAsignarControl(true)}>Asignar control</Button>
                    </Grid>

                    {controlesCliente.length > 0 &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalControlesCliente(true)}>Ver control fisico</Button>
                        </Grid>
                    }
                </Grid>

            </Container>

            {/* MODAL DE EDITAR DE CLIENTE */}
            {showModalEditarCliente && (
                <EditarClienteModal
                    cliente={cliente}
                    showEditModal={showModalEditarCliente}
                    setShowEditModal={setShowModalEditarCliente}
                    onUpdate={handleActualizarCliente}
                />
            )}

            {/* MODAL DE ASIGNACION DE ENTRENADOR */}
            {showModalAsignarEntrenador && (
                <AsignarEntrenadorModal
                    cliente={cliente}
                    showModalAsignarEntrenador={showModalAsignarEntrenador}
                    setShowModalAsignarEntrenador={setShowModalAsignarEntrenador}
                    onUpdate={handleActualizarAsignacionEntrenador}
                />
            )}

            {/* MODAL PARA CAMBIO DE ENTRENADOR */}
            {showModalEditarAsignacionEntrenador && (
                <EditarAsignacionEntrenadorModal
                    cliente={cliente}
                    asignacionEntrenador={clienteEntrenador}
                    showModalEditarAsignacionEntrenador={showModalEditarAsignacionEntrenador}
                    setShowModalEditarAsignacionEntrenador={setShowModalEditarAsignacionEntrenador}
                    onUpdate={handleActualizarAsignacionEntrenador}
                />
            )}

            {/* MODAL DE ASIGNACION DE PLAN */}
            {showModalAsignarPlan && (
                <AsignarPlanModal
                    cliente={cliente}
                    showModalAsignarPlan={showModalAsignarPlan}
                    setShowModalAsignarPlan={setShowModalAsignarPlan}
                    onUpdate={handleActualizarAsignacionPlan}
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

            {/* MODAL PARA ASIGNACION DE RUTINAS */}
            {showModalAsignarRutina && (
                <AsignarRutinaModal
                    cliente={cliente}
                    showModalAsignarRutina={showModalAsignarRutina}
                    setShowModalAsignarRutina={setShowModalAsignarRutina}
                    onUpdate={handleActualizarAsignacionRutina}
                />
            )}

            {/* MODAL PARA CAMBIO DE RUTINAS */}
            {showModalEditarAsignacionRutina && (
                <EditarAsignacionRutinaModal
                    cliente={cliente}
                    rutinaAsignada={clienteRutinas}
                    showModalEditarAsignacionRutina={showModalEditarAsignacionRutina}
                    setShowModalEditarAsignacionRutina={setShowModalEditarAsignacionRutina}
                    onUpdate={handleActualizarAsignacionRutina}
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

            {/* MODAL PARA ASIGNAR CONTROL FISICO DEL CLIENTE */}
            {showModalAsignarControl && (
                <AsignarControlFisico
                    cliente={cliente}
                    showModalAsignarControl={showModalAsignarControl}
                    setShowModalAsignarControl={setShowModalAsignarControl}
                    onUpdate={handleActualizarControl}
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



        </div>
    );
}

export default Cliente;