import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet } from '../../../utils/HandleApi';
import EditarClienteModal from './EditarClienteModal';
import Swal from 'sweetalert2';
import AsignarEntrenadorModal from './AsignarEntrenadorModal';
import { ArrowBack, Cancel, CheckCircleRounded, Edit } from '@mui/icons-material';
import Label from '../dashboard/label/Label';
import { Avatar, Button, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Cliente() {
    const [cliente, setCliente] = useState({});
    const [clienteEntrenadores, setClienteEntrenadores] = useState([]);
    const [editarAsignacion, setEditarAsignacion] = useState({});
    const [editedCliente, setEditedCliente] = useState({});
    const [error, setError] = useState("");
    const [showModalEditarCliente, setShowModalEditarCliente] = useState(false);
    const [showModalAsignarEntrenador, setShowModalAsignarEntrenador] = useState(false);
    

    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getCliente = async () => {
            try {
                const response = await procesarPeticionGet(`cliente/${id}`);
                setCliente(response.data.cliente);
                setClienteEntrenadores(response.data.cliente.clienteEntrenadores);
            } catch (error) {
                setError(error.response.data.error)
            }
        };

        getCliente();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/clientes`);
    };

    const handleDesactivar = async () => {
        console.log("Entrando a desactivar cliente..")
    
        try {
            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea desactivar el cliente?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, desactívalo',
                cancelButtonText: "Cancelar",
                customClass: {
                    container: 'my-swal'
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await procesarPeticionDelete(`entrenadorcliente/eliminar/${id}`, editarAsignacion);
                    Swal.fire(
                        'Información',
                        response.data.message,
                        'success'
                    ).then(() => {
                        navigate(`/admin/dashboard/clientes/${id}`);
                    })
                }
            })
        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };

    const handleEditarCliente = () => {
        setEditedCliente(cliente);
        setShowModalEditarCliente(true);
    };

    const handleUpdate = (updatedData) => {
        setCliente(updatedData)
    }

    const handleUpdateAsignacion = (updatedData) => {
        setEditarAsignacion(updatedData);
    }
    const handleActivar = () => {
        console.log("Entrando a activar cliente..")
        setShowModalAsignarEntrenador(true);

    }

    return (
        <div>

            <Container>

                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del cliente
                </Typography>

                <Card>
                    <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={4} md={6} pb={5}>
                            <Container>
                                {cliente.foto != undefined
                                ? <Avatar src={url+cliente.foto} style={{ width: '300px', height: '300px' }}/>
                                : console.log("cargando")}
                                
                            </Container>
                        </Grid>

                        <Grid item xs={6} sm={4} md={6} pb={5}>
                                <TableContainer  >
                                    <Table style={{ border: "1px solid black" }}>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className='clave' >Tipo de documento</TableCell>
                                                <TableCell className='value' align="right">{cliente.tipo_documento+" - "+cliente.documento}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className='clave'>Nombres</TableCell>
                                                <TableCell className='value' align="right">{cliente.nombre+" "+cliente.apellido}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className='clave'>Telefono</TableCell>
                                                <TableCell className='value' align="right">{cliente.telefono}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className='clave'>Fecha de nacimiento</TableCell>
                                                <TableCell className='value' align="right">{cliente.fecha_nacimiento+''}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className='clave'>Jornada</TableCell>
                                                <TableCell className='value' align="right">{cliente.jornada}</TableCell>
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
                                        </TableBody>

                                    </Table>
                                </TableContainer>
                        </Grid>
                    </Grid>

                </Card>


                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={handleBack}>Atras</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Edit />} onClick={handleEditarCliente}>Editar</Button>
                    </Grid>

                    {clienteEntrenadores == 0
                        ? 
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained"  startIcon={<Cancel />} onClick={handleDesactivar}>Desactivar</Button> 
                        </Grid>
                        : console.log("no tiene entrenador")
                    }
                    
                    {clienteEntrenadores == 0
                        ? 
                        <Grid item xs={2} sm={2} md={3} >
                            <Button  variant="contained" startIcon={<CheckCircleRounded />} onClick={handleActivar}>Activar</Button>
                        </Grid> 
                        : console.log("tiene entrenador")
                    }

                </Grid>

            </Container>

            {showModalEditarCliente && (
                <EditarClienteModal
                    cliente={cliente}
                    showEditModal={showModalEditarCliente}
                    setShowEditModal={setShowModalEditarCliente}
                    onUpdate={handleUpdate}
                />
            )}

            {showModalAsignarEntrenador && (
                <AsignarEntrenadorModal
                    cliente={cliente}
                    showModalAsignarEntrenador={showModalAsignarEntrenador}
                    setShowModalAsignarEntrenador={setShowModalAsignarEntrenador}
                    onUpdate={handleUpdateAsignacion}
                />
            )}
        </div>
    );
}

export default Cliente;