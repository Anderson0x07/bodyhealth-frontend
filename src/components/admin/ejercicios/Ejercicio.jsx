import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet } from "../../../utils/HandleApi";

import Swal from 'sweetalert2';
import { ArrowBack, Delete, Edit, OpenInNewRounded, RemoveRedEyeRounded } from '@mui/icons-material';

import { Avatar, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import EditarEjercicioModal from './EditarEjercicioModal';
import MostrarRutinaEjerciciosModal from './MostrarRutinaEjerciciosModal';
import { LoadingButton } from '@mui/lab';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Ejercicio() {
    const [ejercicio, setEjercicio] = useState({});
    const [error, setError] = useState("");

    const [logo, setLogo] = useState("");

    const [showModalEditarEjercicio, setShowModalEditarEjercicio] = useState(false);
    const [showModalRutinaEjercicios, setShowModalRutinaEjercicios] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [rutinaEjercicios, setRutinaEjercicios] = useState([]);


    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getEjercicio = async () => {
            try {
                
                const response = await procesarPeticionGet(`ejercicio/${id}`);
                setEjercicio(response.data.ejercicio);
                setRutinaEjercicios(response.data.ejercicio.rutinaEjercicios);
                
                const res = await procesarPeticionGet('infobasica/logo/1');
                setLogo(res.data.logo);
                

            } catch (error) {
                setError(error.response.data.error)
            }
        };

        getEjercicio();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/ejercicios`);
    };


    const handleEditarEjercicio = () => {
        setShowModalEditarEjercicio(true);
    };

    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el ejercicio?",
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
                    const response = await procesarPeticionDelete(`ejercicio/eliminar/${id}`);
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success'
                    }).then(() => {
                        navigate(`/admin/dashboard/ejercicios`);
                    })
                }
            })

        } catch (error) {
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };

    const handleDeletePass = () => {
        setShowModalRutinaEjercicios(true)
        setEliminar(true)
    }

    const handleShowRutinaEjercicios = () => {
        setShowModalRutinaEjercicios(true)
        setEliminar(false)
    }

    const handleAbrirRecurso = (url_video) => {
        window.open(url_video, '_blank');
    }

    const handleUpdate = (updatedData) => {
        setEjercicio(updatedData)
    }
    const nombreMusculo = ejercicio.musculo?.nombre;
    return (
        <div>
            <Container >
                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del Ejercicio
                </Typography>

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Container>
                            {logo != "" && <Avatar src={url + logo} style={{ width: '350px', height: '200px', borderRadius: 0, }} />}
                        </Container>
                    </Grid>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <TableContainer  >
                            <Table style={{ border: "1px solid black" }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='clave' ># Ejercicio</TableCell>
                                        <TableCell className='value' align="right">{ejercicio.id_ejercicio}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Descripción</TableCell>
                                        <TableCell className='value' align="right">{ejercicio.descripcion}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Series</TableCell>
                                        <TableCell className='value' align="right">{ejercicio.series}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Repeticiones</TableCell>
                                        <TableCell className='value' align="right">{ejercicio.repeticiones}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>URL Video</TableCell>
                                        <TableCell className='value' align="right">


                                            <LoadingButton
                                                size="large"
                                                color="inherit"
                                                onClick={() => handleAbrirRecurso(ejercicio.url_video)}
                                                variant="text"
                                            >
                                                <OpenInNewRounded /> Abrir
                                            </LoadingButton>

                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Musculo</TableCell>
                                        <TableCell className='value' align="right">{nombreMusculo}</TableCell>
                                    </TableRow>
                                </TableBody>

                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>



                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={handleBack}>Atras</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Edit />} onClick={handleEditarEjercicio}>Editar</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Delete />} onClick={rutinaEjercicios.length > 0 ? handleDeletePass : handleDelete}>Eliminar</Button>
                    </Grid>
                    {rutinaEjercicios.length > 0 &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEyeRounded />} onClick={handleShowRutinaEjercicios}>Rutina Ejercicios</Button>
                        </Grid>
                    }

                </Grid>

            </Container>

            {showModalEditarEjercicio && (
                <EditarEjercicioModal
                    ejercicio={ejercicio}
                    showEditModal={showModalEditarEjercicio}
                    setShowEditModal={setShowModalEditarEjercicio}
                    onUpdate={handleUpdate}
                />
            )}

            {/* MODAL PARA VER RutinaEjercicios DEL Ejercicio */}
            {showModalRutinaEjercicios && (
                <MostrarRutinaEjerciciosModal
                    rutinaEjercicios={rutinaEjercicios}
                    showModalRutinaEjercicios={showModalRutinaEjercicios}
                    setShowModalRutinaEjercicios={setShowModalRutinaEjercicios}
                    eliminar={eliminar}
                    setEliminar={setEliminar}
                    ejercicio={ejercicio}
                    setEjercicio={setEjercicio}
                />
            )}
        </div>
    );
}

export default Ejercicio
