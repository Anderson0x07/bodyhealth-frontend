import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';
//import EditarRutinaModal from './EditarRutinaModal';
import Swal from 'sweetalert2';
//import AsignarEntrenadorModal from './AsignarEntrenadorModal';
import { ArrowBack, Cancel, CheckCircleRounded, Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import Label from '../dashboard/label/Label';
import { Avatar, Button, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EditarRutinaModal from './EditarRutinaModal';
import logo from '../../../assets/Logo-BodyHealth.jpeg';
import MostrarRutinaEjerciciosModal from './MostrarRutinaEjerciciosModal';
import MostrarClienteRutinasModal from './MostrarClienteRutinasModal';
import MostrarUsosRutinaModal from './MostrarUsosRutinaModal';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Rutina() {
    const [rutina, setRutina] = useState({});
    const [error, setError] = useState("");
    const [showModalEditarRutina, setShowModalEditarRutina] = useState(false);
    const [showModalRutinaEjercicios, setShowModalRutinaEjercicios] = useState(false);
    const [showModalClienteRutinas, setShowModalClienteRutinas] = useState(false);
    const [showModalUsosRutina, setShowModalUsosRutina] = useState(false);
    const [rutinaEjercicios, setRutinaEjercicios] = useState([]);
    const [clienteRutinas, setClienteRutinas] = useState([]);


    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getRutina = async () => {
            try {
                const response = await procesarPeticionGet(`rutina/${id}`);
                console.log(response);
                setRutina(response.data.rutina);
                setRutinaEjercicios(response.data.rutina.rutinaEjercicios);
                setClienteRutinas(response.data.rutina.clienteRutinas)
            } catch (error) {
                setError(error.response.data.error)
            }
        };
        getRutina();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/rutinas`);
    };

    const handleEditarRutina = () => {
        setShowModalEditarRutina(true);
    };

    const handleUpdate = (updatedData) => {
        console.log(updatedData)
        setRutina(updatedData)
    }

    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el rutina?",
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
                    const response = await procesarPeticionDelete(`rutina/eliminar/${id}`);
                    Swal.fire({
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success',
                        customClass: {
                            container: 'my-swal'
                        }
                    }

                    ).then(() => {
                        navigate(`/admin/dashboard/rutinas`);
                    })
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };


    return (
        <div>

            <Container>

                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del rutina
                </Typography>

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Container>
                            <Avatar
                                src={logo}
                                style={{
                                    width: '350px',
                                    height: '200px',
                                    borderRadius: 0,
                                }}
                            />
                        </Container>
                    </Grid>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <TableContainer  >
                            <Table style={{ border: "1px solid black" }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='clave' >Id rutina</TableCell>
                                        <TableCell className='value' align="right">{rutina.id_rutina}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Nombre</TableCell>
                                        <TableCell className='value' align="right">{rutina.nombre_rutina}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Nivel</TableCell>
                                        <TableCell className='value' align="right">{rutina.nivel}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Duración</TableCell>
                                        <TableCell className='value' align="right">{rutina.duracion}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Descripción</TableCell>
                                        <TableCell className='value' align="right">{rutina.descripcion}</TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table >
                        </TableContainer>
                    </Grid>
                </Grid>




                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={handleBack}>Atras</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Edit />} onClick={handleEditarRutina}>Editar</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Delete />} onClick={rutinaEjercicios.length > 0 || clienteRutinas.length > 0 ? () => setShowModalUsosRutina(true) : handleDelete}>Eliminar</Button>
                    </Grid>
                    {rutinaEjercicios.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalRutinaEjercicios(true)}>Ver RutinaEjercicios</Button>
                        </Grid>
                        : console.log("no tiene rutinaEjercicios.")
                    }
                    {clienteRutinas.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalClienteRutinas(true)}>  Ver clienteRutinas</Button>
                        </Grid>
                        : console.log("no tiene Máquinas.")
                    }



                </Grid>

            </Container>

            {showModalEditarRutina && (
                <EditarRutinaModal
                    rutina={rutina}
                    showModalEditarRutina={showModalEditarRutina}
                    setShowModalEditarRutina={setShowModalEditarRutina}
                    onUpdate={handleUpdate}
                />
            )}

            {/* MODAL PARA VER rutinaEjercicios/clienteRutinas DEL rutina */}
            {showModalUsosRutina && (
                <MostrarUsosRutinaModal
                    rutina={rutina}
                    clienteRutinas={clienteRutinas}
                    rutinaEjercicios={rutinaEjercicios}
                    showModalUsosRutina={showModalUsosRutina}
                    setShowModalUsosRutina={setShowModalUsosRutina}
                />
            )}

            {/* MODAL PARA VER clienteRutinas DEL rutina */}
            {showModalRutinaEjercicios && (
                <MostrarRutinaEjerciciosModal
                    rutinaEjercicios={rutinaEjercicios}
                    showModalRutinaEjercicios={showModalRutinaEjercicios}
                    setShowModalRutinaEjercicios={setShowModalRutinaEjercicios}
                />
            )}

            {/* MODAL PARA VER rutinaEjercicios DEL rutina */}
            {showModalClienteRutinas && (
                <MostrarClienteRutinasModal
                    clienteRutinas={clienteRutinas}
                    showModalClienteRutinas={showModalClienteRutinas}
                    setShowModalClienteRutinas={setShowModalClienteRutinas}
                />
            )}

        </div>
    );
}

export default Rutina;