import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet } from '../../../utils/HandleApi';
import EditarMaquinaModal from './EditarMaquinaModal';
import Swal from 'sweetalert2';
import { ArrowBack, Delete, Edit } from '@mui/icons-material';
import { Avatar, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Maquina() {
    const [maquina, setMaquina] = useState({});
    const [error, setError] = useState("");

    const [logo, setLogo] = useState("");
    
    const [showModalEditarMaquina, setShowModalEditarMaquina] = useState(false);


    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getMaquina = async () => {
            try {
                const response = await procesarPeticionGet(`maquina/${id}`);
                setMaquina(response.data.maquina);

                const res = await procesarPeticionGet('infobasica/logo/1');
                setLogo(res.data.logo);

            } catch (error) {
                setError(error.response.data.error)
            }
        };

        getMaquina();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/maquinas`);
    };


    const handleEditarMaquina = () => {
        setShowModalEditarMaquina(true);
    };

    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar la maquina?",
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
                    const response = await procesarPeticionDelete(`maquina/eliminar/${id}`);
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success'
                    }).then(() => {
                        navigate(`/admin/dashboard/maquinas`);
                    })
                }
            })

        } catch (error) {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error'
            });
        }
    };

    const handleUpdate = (updatedData) => {
        setMaquina(updatedData)
    }
    const nombreEmpresa = maquina.proveedor?.nombre_empresa;
    return (
        <>
            <Container >
                <Typography variant="h4" gutterBottom mb={3}>
                    Datos de la maquina
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
                                        <TableCell className='clave' >Serial</TableCell>
                                        <TableCell className='value' align="right">{maquina.id_maquina}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Nombre</TableCell>
                                        <TableCell className='value' align="right">{maquina.nombre}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Estado</TableCell>
                                        <TableCell className='value' align="right">{maquina.estado}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Obsevrvacion</TableCell>
                                        <TableCell className='value' align="right">{maquina.observacion}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Proveedor</TableCell>
                                        <TableCell className='value' align="right">{nombreEmpresa}</TableCell>
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
                        <Button variant="contained" startIcon={<Edit />} onClick={handleEditarMaquina}>Editar</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Delete />} onClick={handleDelete}>Eliminar</Button>
                    </Grid>
                </Grid>
            </Container>

            {showModalEditarMaquina && (
                <EditarMaquinaModal
                    maquina={maquina}
                    showEditModal={showModalEditarMaquina}
                    setShowEditModal={setShowModalEditarMaquina}
                    onUpdate={handleUpdate}
                />
            )}
        </>
    );
}

export default Maquina
