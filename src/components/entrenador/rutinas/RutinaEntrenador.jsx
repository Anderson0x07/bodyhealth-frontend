import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';
//import EditarRutinaModal from './EditarRutinaModal';
import Swal from 'sweetalert2';
//import AsignarEntrenadorModal from './AsignarEntrenadorModal';
import { ArrowBack, Edit, RemoveRedEye } from '@mui/icons-material';
import { Avatar, Button, Container, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import EditarRutinaModal from './EditarRutinaModal';
import MostrarRutinaEjerciciosModal from './MostrarRutinaEjerciciosModal';
import MostrarClienteRutinasModal from './MostrarClienteRutinasModal';
import MostrarUsosRutinaModal from './MostrarUsosRutinaModal';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function RutinaEntrenador() {
    const [rutina, setRutina] = useState({});
    const [error, setError] = useState("");
    const [logo, setLogo] = useState("");

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
                setClienteRutinas(response.data.rutina.clienteRutinas);

                const res = await procesarPeticionGet('infobasica/logo/1');
                setLogo(res.data.logo);

            } catch (error) {
                setError(error.response.data.error)
            }
        };
        getRutina();
    }, []);


    const handleBack = () => {
        navigate(`/bodyhealth-frontend/entrenador/dashboard/rutinas`);
    };

    const handleUpdate = (updatedData) => {
        console.log(updatedData)
        setRutina(updatedData)
    }


    return (
        <>
            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                    <Typography variant="h4" gutterBottom>
                        Datos de la rutina
                    </Typography>
                </Stack>

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Container>
                            {logo != ""
                                ? <Avatar src={url + logo} style={{ width: '350px', height: '200px', borderRadius: 0, }} />
                                : false}
                        </Container>
                    </Grid>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <TableContainer  >
                            <Table style={{ border: "1px solid black" }}>
                                <TableBody>
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

                    {rutinaEjercicios.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalRutinaEjercicios(true)}>Ver Ejercicios</Button>
                        </Grid>
                        : false
                    }
                    {clienteRutinas.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalClienteRutinas(true)}>Ver Clientes</Button>
                        </Grid>
                        : <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalEditarRutina(true)}>Editar</Button>
                        </Grid>
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

            {/* MODAL PARA VER LOS USOS DE LA RUTINA */}
            {showModalUsosRutina && (
                <MostrarUsosRutinaModal
                    rutina={rutina}
                    clienteRutinas={clienteRutinas}
                    rutinaEjercicios={rutinaEjercicios}
                    showModalUsosRutina={showModalUsosRutina}
                    setShowModalUsosRutina={setShowModalUsosRutina}
                />
            )}

            {/* MODAL PARA VER LOS EJERCICIOS DE LA RUTINA */}
            {showModalRutinaEjercicios && (
                <MostrarRutinaEjerciciosModal
                    rutinaEjercicios={rutinaEjercicios}
                    showModalRutinaEjercicios={showModalRutinaEjercicios}
                    setShowModalRutinaEjercicios={setShowModalRutinaEjercicios}
                />
            )}

            {/* MODAL PARA VER CLIENTES QUE USAN LA RUTINA */}
            {showModalClienteRutinas && (
                <MostrarClienteRutinasModal
                    clienteRutinas={clienteRutinas}
                    showModalClienteRutinas={showModalClienteRutinas}
                    setShowModalClienteRutinas={setShowModalClienteRutinas}
                />
            )}
        </>
    );
}

export default RutinaEntrenador;