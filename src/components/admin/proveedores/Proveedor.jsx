import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';
//import EditarProveedorModal from './EditarProveedorModal';
import Swal from 'sweetalert2';
//import AsignarEntrenadorModal from './AsignarEntrenadorModal';
import { ArrowBack, Cancel, CheckCircleRounded, Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import Label from '../dashboard/label/Label';
import { Avatar, Button, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EditarProveedorModal from './EditarProveedorModal';
import logo from '../../../assets/Logo-BodyHealth.jpeg';
import MostrarUsosProveedorModal from './MostrarUsosProveedorModal';
import MostrarProductosProveedorModal from './MostrarProductosProveedorModal';
import MostrarMaquinasProveedorModal from './MostrarMaquinasProveedorModal';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Proveedor() {
    const [proveedor, setProveedor] = useState({});
    const [error, setError] = useState("");
    const [logo, setLogo] = useState("");

    const [showModalEditarProveedor, setShowModalEditarProveedor] = useState(false);
    const [showModalProductosProveedor, setShowModalProductosProveedor] = useState(false);
    const [showModalMaquinasProveedor, setShowModalMaquinasProveedor] = useState(false);
    const [showModalUsosProveedor, setShowModalUsosProveedor] = useState(false);
    const [maquinas, setMaquinas] = useState([]);
    const [productos, setProductos] = useState([]);



    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getProveedor = async () => {
            try {
                const response = await procesarPeticionGet(`proveedor/${id}`);
                console.log(response);
                setProveedor(response.data.proveedor);
                setMaquinas(response.data.proveedor.maquinas);
                setProductos(response.data.proveedor.productos);

                const res = await procesarPeticionGet('infobasica/logo/1');
                setLogo(res.data.logo);

            } catch (error) {
                setError(error.response.data.error)
            }
        };
        getProveedor();
    }, []);


    const handleBack = () => {
        navigate(`/bodyhealth-frontend/admin/dashboard/proveedores`);
    };

    const handleEditarProveedor = () => {
        setShowModalEditarProveedor(true);
    };

    const handleUpdate = (updatedData) => {
        console.log(updatedData)
        setProveedor(updatedData)
    }

    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el proveedor?",
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
                    const response = await procesarPeticionDelete(`proveedor/eliminar/${id}`);
                    Swal.fire({
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success',
                        customClass: {
                            container: 'my-swal'
                        }
                    }

                    ).then(() => {
                        navigate(`/bodyhealth-frontend/admin/dashboard/proveedores`);
                    })
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };


    return (
        <>

            <Container>
                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del proveedor
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
                                        <TableCell className='clave' >Id proveedor</TableCell>
                                        <TableCell className='value' align="right">{proveedor.id_proveedor}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Nombre</TableCell>
                                        <TableCell className='value' align="right">{proveedor.nombre_empresa}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Dirección</TableCell>
                                        <TableCell className='value' align="right">{proveedor.direccion}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Telefono</TableCell>
                                        <TableCell className='value' align="right">{proveedor.telefono}</TableCell>
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
                        <Button variant="contained" startIcon={<Edit />} onClick={handleEditarProveedor}>Editar</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Delete />} onClick={maquinas.length > 0 || productos.length > 0 ? () => setShowModalUsosProveedor(true) : handleDelete}>Eliminar</Button>
                    </Grid>
                    {maquinas.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalMaquinasProveedor(true)}>Ver Máquinas</Button>
                        </Grid>
                        : console.log("no tiene Máquinas.")
                    }
                    {productos.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalProductosProveedor(true)}>  Ver Productos</Button>
                        </Grid>
                        : console.log("no tiene Máquinas.")
                    }

                </Grid>
            </Container>

            {showModalEditarProveedor && (
                <EditarProveedorModal
                    proveedor={proveedor}
                    showModalEditarProveedor={showModalEditarProveedor}
                    setShowModalEditarProveedor={setShowModalEditarProveedor}
                    onUpdate={handleUpdate}
                />
            )}

            {/* MODAL PARA VER MAQUINAS/PRODUCTOS DEL PROVEEDOR */}
            {showModalUsosProveedor && (
                <MostrarUsosProveedorModal
                    proveedor={proveedor}
                    productos={productos}
                    maquinas={maquinas}
                    showModalUsosProveedor={showModalUsosProveedor}
                    setShowModalUsosProveedor={setShowModalUsosProveedor}
                />
            )}

            {/* MODAL PARA VER PRODUCTOS DEL PROVEEDOR */}
            {showModalProductosProveedor && (
                <MostrarProductosProveedorModal
                    productos={productos}
                    showModalProductosProveedor={showModalProductosProveedor}
                    setShowModalProductosProveedor={setShowModalProductosProveedor}
                />
            )}

            {/* MODAL PARA VER MAQUINAS DEL PROVEEDOR */}
            {showModalMaquinasProveedor && (
                <MostrarMaquinasProveedorModal
                    maquinas={maquinas}
                    showModalMaquinasProveedor={showModalMaquinasProveedor}
                    setShowModalMaquinasProveedor={setShowModalMaquinasProveedor}
                />
            )}

        </>
    );
}

export default Proveedor;