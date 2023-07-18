import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionGet } from '../../../utils/HandleApi';
import { ArrowBack, CheckCircleRounded, RemoveRedEye, WidgetsRounded } from '@mui/icons-material';
import Label from '../../admin/dashboard/label/Label';
import { Avatar, Badge, Button, Container, Grid, IconButton, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Tooltip, Typography } from '@mui/material';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import EditarAsignacionRutinaModal from '../../admin/clientes/EditarAsignacionRutinaModal';
import VerRutinasAsignadasModal from '../../admin/clientes/VerRutinasAsignadasModal';
import VerControlFisicoModal from '../../admin/clientes/VerControlFisicoModal';
import AsignarRutinaModal from '../../admin/clientes/AsignarRutinaModal';
import AsignarControlFisico from '../../admin/clientes/AsignarControlFisico';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function ClienteEntrenador() {
    const [cliente, setCliente] = useState({});
    const [clienteRutinas, setClienteRutinas] = useState([]);
    const [controlesCliente, setControlesCliente] = useState([]);


    //MODALES

    const [showModalAsignarRutina, setShowModalAsignarRutina] = useState(false);
    const [showModalEditarAsignacionRutina, setShowModalEditarAsignacionRutina] = useState(false);
    const [showModalControlesCliente, setShowModalControlesCliente] = useState(false);
    const [showModalRutinasCliente, setShowModalRutinasCliente] = useState(false);
    const [showModalAsignarControl, setShowModalAsignarControl] = useState(false)

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getCliente();
    }, []);

    const getCliente = async () => {
        try {
            const response = await procesarPeticionGet(`cliente/${id}`);
            setCliente(response.data.cliente);
            setClienteRutinas(response.data.cliente.clienteRutinas);
            setControlesCliente(response.data.cliente.controlClientes);

        } catch (error) {
            console.log(error)
        }
    };


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

    return (
        <div>
            <Container>

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


                        {clienteRutinas.length > 0
                            &&
                            <MenuItem onClick={() => setShowModalEditarAsignacionRutina(true)} sx={{ typography: 'body2' }}>
                                <DriveFileRenameOutlineTwoToneIcon />Cambiar rutina
                            </MenuItem>
                        }
                    </Menu>

                </Stack>

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={8} md={12} pb={5} >
                            <Container>
                                {cliente.foto != null && <Avatar src={url + cliente.foto} style={{ width: '300px', height: '300px' }} />}

                            </Container>
                        </Grid>
                    </Grid>

                    <Grid item xs={6} sm={4} md={6} columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={8} md={12} pb={5}>
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


                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate(`/entrenador/dashboard/clientes`)}>Atras</Button>
                    </Grid>


                    {clienteRutinas.length == 0
                        &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<CheckCircleRounded />} onClick={() => setShowModalAsignarRutina(true)}>Asignar rutina</Button>
                        </Grid>
                    }

                    {clienteRutinas.length > 0
                        &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalRutinasCliente(true)}>Ver rutinas</Button>
                        </Grid>
                    }

                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<CheckCircleRounded />} onClick={() => setShowModalAsignarControl(true)}>Asignar control</Button>
                    </Grid>

                    {controlesCliente.length > 0
                        &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalControlesCliente(true)}>Ver control fisico</Button>
                        </Grid>
                    }
                </Grid>

            </Container>
            {/* MODAL PARA ASIGNACION DE RUTINAS */}
            {showModalAsignarRutina && (
                <AsignarRutinaModal
                    cliente={cliente}
                    showModalAsignarRutina={showModalAsignarRutina}
                    setShowModalAsignarRutina={setShowModalAsignarRutina}
                    onUpdate ={handleActualizarAsignacionRutina}

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

            {/* MODAL PARA ASIGNAR CONTROL FISICO DEL CLIENTE */}
            {showModalAsignarControl && (
                <AsignarControlFisico
                    cliente={cliente}
                    showModalAsignarControl={showModalAsignarControl}
                    setShowModalAsignarControl={setShowModalAsignarControl}
                    onUpdate = {handleActualizarControl}
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

export default ClienteEntrenador;