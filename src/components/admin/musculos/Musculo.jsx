import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet } from "../../../utils/HandleApi";

import Swal from 'sweetalert2';
import logo from "../../../assets/Logo-BodyHealth.jpeg";
import { ArrowBack, Cancel, Delete, Edit, RemoveRedEyeRounded } from '@mui/icons-material';

import { Avatar, Button, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import EditarMusculoModal from './EditarMusculoModal';
import MostrarUsosMusculoModal from './MostrarUsosMusculoModal';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Musculo() {
    const [musculo, setMusculo] = useState({});
    const [error, setError] = useState("");
    const [logo, setLogo] = useState("");

    const [showModalEditarmusculo, setShowModalEditarmusculo] = useState(false);
    const [showModalEjercicios, setShowModalEjercicios] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [ejercicios, setEjercicios] = useState([]);


    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getMusculo = async () => {
            try {
                const response = await procesarPeticionGet(`musculo/${id}`);
                setMusculo(response.data.musculo);
                setEjercicios(response.data.musculo.ejercicios);

                const res = await procesarPeticionGet('infobasica/logo/1');
                setLogo(res.data.logo);

            } catch (error) {
                setError(error.response.data.error)
            }
        };

        getMusculo();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/musculos`);
    };


    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el musculo?",
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
                    const response = await procesarPeticionDelete(`musculo/eliminar/${id}`);
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success'
                    }).then(() => {
                        navigate(`/admin/dashboard/musculos`);
                    })
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };

    const handleDeletePass = () => {
        setShowModalEjercicios(true)
        setEliminar(true)
    }
    const handleShowejercicios = () => {
        setShowModalEjercicios(true)
        setEliminar(false)
    }
    const handleUpdate = (updatedData) => {
        setMusculo(updatedData)
    }


    return (
        <div>
            <Container >
                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del musculo
                </Typography>

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
                                        <TableCell className='clave' ># Musculo</TableCell>
                                        <TableCell className='value' align="right">{musculo.id_musculo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Nombre</TableCell>
                                        <TableCell className='value' align="right">{musculo.nombre}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Grupo Muscular</TableCell>
                                        <TableCell className='value' align="right">{musculo.grupo_muscular}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Descripcion</TableCell>
                                        <TableCell className='value' align="right">{musculo.descripcion}</TableCell>
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
                        <Button variant="contained" startIcon={<Edit />} onClick={() => {setShowModalEditarmusculo(true)}}>Editar</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Delete />} onClick={ejercicios.length > 0 ? handleDeletePass : handleDelete}>Eliminar</Button>
                    </Grid>
                    {ejercicios.length > 0
                        &&
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEyeRounded />} onClick={handleShowejercicios}>Ver Ejercicios</Button>
                        </Grid>
                    }

                </Grid>

            </Container>

            {showModalEditarmusculo && (
                <EditarMusculoModal
                    musculo={musculo}
                    showEditModal={showModalEditarmusculo}
                    setShowEditModal={setShowModalEditarmusculo}
                    onUpdate={handleUpdate}
                />
            )}

            {/* MODAL PARA VER ejercicios DEL musculo */}
            {showModalEjercicios && (
                <MostrarUsosMusculoModal
                    ejercicios={ejercicios}
                    showModalEjercicios={showModalEjercicios}
                    setShowModalEjercicios={setShowModalEjercicios}
                    eliminar={eliminar}
                    setEliminar={setEliminar}
                    musculo={musculo}
                    setMusculo={setMusculo}
                />
            )}
        </div>
    );
}

export default Musculo
