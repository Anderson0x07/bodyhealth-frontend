import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet } from '../../../utils/HandleApi';
import EditarEntrenadorModal from './EditarEntrenadorModal';
import { ArrowBack, Cancel, CheckCircleRounded, MoreVert, RemoveRedEye, WidgetsRounded } from '@mui/icons-material';
import Label from '../dashboard/label/Label';
import { Alert, AlertTitle, Avatar, Badge, Button, Container, Grid, IconButton, Menu, MenuItem, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import DriveFileRenameOutlineTwoToneIcon from '@mui/icons-material/DriveFileRenameOutlineTwoTone';
import { obtenerDiferenciaDias } from '../../../utils/obtenerDiasRestantesPlan';
import MostrarUsoEntrenadorModal from './MostrarUsoEntrenadorModal';
import Swal from 'sweetalert2';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Entrenador() {
    const [entrenador, setEntrenador] = useState({});
    const [error, setError] = useState("");

    const [showModalEditarEntrenador, setShowModalEditarEntrenador] = useState(false);
    const [showModalClientesAsignados, setShowModalClientesAsignados] = useState(false);

    const [entrenadorClientes, setEntrenadorClientes] = useState([]);
    const [open, setOpen] = useState(null);


    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getEntrenador = async () => {
            try {
                const response = await procesarPeticionGet(`entrenador/${id}`);


                setEntrenador(response.data.entrenador);
                setEntrenadorClientes(response.data.entrenador.entrenadorClientes);


            } catch (error) {
                setError(error.response.data.error)
            }
        };

        getEntrenador();
    }, []);

    const handleDelete = () => {

        try {
            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar este entrenador?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, elimínalo',
                customClass: {
                    container: 'my-swal'
                }
            }).then(async (result) => {

                if (result.isConfirmed) {
                    const response = await procesarPeticionDelete(`entrenador/eliminar/${id}`);
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success'
                    }).then(() => {
                        navigate(`/admin/dashboard/entrenadores`);
                    })
                }

            })

        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setOpen(null);
    };
    const handleUpdate = (updatedData) => {
        setEntrenador(updatedData)
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
                        Datos del entrenador
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

                        <MenuItem selected sx={{ typography: 'body2' }} onClick={() => setShowModalEditarEntrenador(true)}>
                            <DriveFileRenameOutlineTwoToneIcon />Editar Entrenador
                        </MenuItem>


                    </Menu>

                </Stack>

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={8} md={12} pb={5} >
                            <Container>
                                {entrenador.foto != undefined
                                    ? <Avatar src={url + entrenador.foto} style={{ width: '400px', height: '400px' }} />
                                    : console.log("cargando")}

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
                                            <TableCell className='value' align="right">{entrenador.tipo_documento + " - " + entrenador.documento}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Nombres</TableCell>
                                            <TableCell className='value' align="right">{entrenador.nombre + " " + entrenador.apellido}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Telefono</TableCell>
                                            <TableCell className='value' align="right">{entrenador.telefono}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Fecha de nacimiento</TableCell>
                                            <TableCell className='value' align="right">{entrenador.fecha_nacimiento + ''}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Jornada</TableCell>
                                            <TableCell className='value' align="right">{entrenador.jornada === 'Manana' ? 'Mañana' : 'Tarde'}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Telefono</TableCell>
                                            <TableCell className='value' align="right">{entrenador.telefono}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Estado</TableCell>
                                            <TableCell className='value' align="right">
                                                <Label color={(entrenador.estado === false && 'error') || 'info'}>{entrenador.estado === true ? 'Activo' : 'Inactivo'}</Label>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Experencia</TableCell>
                                            <TableCell className='value' align="right">{entrenador.experiencia}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Titulo academico</TableCell>
                                            <TableCell className='value' align="right">{entrenador.titulo_academico}</TableCell>
                                        </TableRow>

                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>

                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={() => navigate(`/admin/dashboard/entrenadores`)}>Atras</Button>
                    </Grid>

                    {entrenadorClientes.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalClientesAsignados(true)}>Ver clientes</Button>
                        </Grid>
                        : <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<Cancel />} onClick={handleDelete} >eliminar</Button>
                        </Grid>
                    }


                </Grid>

            </Container>

            {showModalEditarEntrenador && (
                <EditarEntrenadorModal
                    entrenador={entrenador}
                    showModalEditarEntrenador={showModalEditarEntrenador}
                    setShowModalEditarEntrenador={setShowModalEditarEntrenador}
                    onUpdate={handleUpdate}
                />
            )}

            {showModalClientesAsignados && (
                <MostrarUsoEntrenadorModal
                    entrenadorClientes={entrenadorClientes}
                    showModalClientesAsignados={showModalClientesAsignados}
                    setShowModalClientesAsignados={setShowModalClientesAsignados}

                />
            )}

        </div>
    )
}

export default Entrenador;