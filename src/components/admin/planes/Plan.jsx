import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet } from "../../../utils/HandleApi";

import Swal from 'sweetalert2';
import logo from "../../../assets/Logo-BodyHealth.jpeg";
import { ArrowBack, Cancel, CheckCircleRounded, Delete, Edit, OpenInNewRounded, RemoveRedEyeRounded } from '@mui/icons-material';

import { Avatar, Button, Card, Container, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import EditarPlanModal from './EditarPlanModal';
import MostrarUsosPlanModal from './MostrarUsosPlanModal';
import { LoadingButton } from '@mui/lab';

function Plan() {

    const [plan, setPlan] = useState({});
    const [editedPlan, setEditedPlan] = useState({});
    const [error, setError] = useState("");
    const [showModalEditarPlan, setShowModalEditarPlan] = useState(false);
    const [showModalFactura, setShowModalFactura] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [facturas, setFacturas] = useState([]);

    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getPlan = async () => {
            try {
                const response = await procesarPeticionGet(`plan/${id}`);
                console.log("******************************")
                console.log(response)
                setPlan(response.data.plan);
                setFacturas(response.data.plan.clienteDetalles);

            } catch (error) {
                setError(error.response.data.error)
            }
        };

        getPlan();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/planes`);
    };


    const handleEditarPlan = () => {
        setEditedPlan(plan);
        setShowModalEditarPlan(true);
    };

    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el plan?",
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
                    const response = await procesarPeticionDelete(`plan/eliminar/${id}`);
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success'
                    }).then(() => {
                        navigate(`/admin/dashboard/planes`);
                    })
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };



    const handleShowFacturas = () => {
        setShowModalFactura(true)
        setEliminar(false)
    }
    const handleUpdate = (updatedData) => {
        setPlan(updatedData)
    }


    return (
        <div>
            <Container >
                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del plan
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
                                        <TableCell className='clave' ># Plan</TableCell>
                                        <TableCell className='value' align="right">{plan.id_plan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>nombre</TableCell>
                                        <TableCell className='value' align="right">{plan.plan}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Meses</TableCell>
                                        <TableCell className='value' align="right">{plan.meses}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Precio</TableCell>
                                        <TableCell className='value' align="right">{plan.precio}</TableCell>
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
                    {facturas.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEyeRounded />} onClick={handleShowFacturas}>Uso de plan</Button>
                        </Grid>
                        : <><Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<Edit />} onClick={handleEditarPlan}>Editar</Button>
                        </Grid>
                            <Grid item xs={2} sm={2} md={3} >
                                <Button variant="contained" startIcon={<Cancel />} onClick={handleDelete}>eliminar</Button>
                            </Grid>
                        </>

                    }

                </Grid>

            </Container>

            {showModalEditarPlan && (
                <EditarPlanModal
                    plan={plan}
                    showEditModal={showModalEditarPlan}
                    setShowEditModal={setShowModalEditarPlan}
                    onUpdate={handleUpdate}
                />
            )}

            {/* MODAL PARA VER ejercicios DEL musculo */}
            {showModalFactura && (
                <MostrarUsosPlanModal
                    facturas={facturas}
                    showModalFactura={showModalFactura}
                    setShowModalFactura={setShowModalFactura}
                    
                />
            )}
        </div>
    )
}

export default Plan
