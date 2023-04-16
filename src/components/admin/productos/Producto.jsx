import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';

import { ArrowBack, Cancel, Delete, Edit, RemoveRedEye } from '@mui/icons-material';
import Label from '../dashboard/label/Label';
import { Avatar, Button, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import Swal from 'sweetalert2';
import EditarProductoModal from './EditarProductoModal';
import MostrarVentasProductosModal from './MostrarVentasProductoModal';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Producto() {
    const [producto, setProducto] = useState({});
    const [error, setError] = useState("");
    const [showModalEditarProducto, setShowModalEditarProducto] = useState(false);
    const [showModalVentasProducto, setShowModalVentasProducto] = useState(false);
    const [proveedor, setProveedor] = useState(null);
    const [pedidos, setPedidos] = useState([]);


    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const getProducto = async () => {
            try {
                const response = await procesarPeticionGet(`producto/${id}`);
                setProducto(response.data.producto);
                setProveedor(response.data.producto.proveedor);
                setPedidos(response.data.producto.pedidos);
            } catch (error) {
                setError(error.response.data.error)
            }
        };
        getProducto();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/productos`);
    };

    const handleDesactivar = async () => {
        console.log("Entrando a desactivar producto..")

        try {
            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea desactivar el producto?, Esta acción dejará el stock del producto en 0.",
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
                    producto.stock = 0;
                    producto.estado = false;
                    const respuesta = await procesarPeticionPut(`producto/editar/${producto.id_producto}`, producto);
                    Swal.fire({
                        title: 'Información',
                        text: respuesta.data.message,
                        icon: 'success',
                        customClass: {
                            container: 'my-swal'
                        }
                    }

                    ).then(() => {
                        navigate(`/admin/dashboard/productos/${id}`);
                    })
                }
            })
        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire({
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                }
            });
        }
    };

    const handleEditarProducto = () => {
        setShowModalEditarProducto(true);
    };

    const handleUpdate = (updatedData) => {
        setProveedor(updatedData.proveedor)
        setProducto(updatedData)
    }

    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el producto?",
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
                    const response = await procesarPeticionDelete(`producto/eliminar/${id}`);
                    Swal.fire({
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success',
                        customClass: {
                            container: 'my-swal'
                        }
                    }

                    ).then(() => {
                        navigate(`/admin/dashboard/productos`);
                    })
                }
            })

        } catch (error) {
            Swal.fire({
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                }
            });
        }
    };

    return (
        <>
            <Container>
                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del producto
                </Typography>

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <Container>
                            {producto.foto != undefined
                                ? <Avatar src={url + producto.foto} style={{ width: '300px', height: '300px' }} />
                                : console.log("cargando")}

                        </Container>
                    </Grid>

                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <TableContainer  >
                            <Table style={{ border: "1px solid black" }}>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='clave' >Id producto</TableCell>
                                        <TableCell className='value' align="right">{producto.id_producto}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Nombre</TableCell>
                                        <TableCell className='value' align="right">{producto.nombre}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Stock</TableCell>
                                        <TableCell className='value' align="right">{producto.stock}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Precio</TableCell>
                                        <TableCell className='value' align="right">{producto.precio + ''}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Proveedor</TableCell>
                                        <TableCell className='value' align="right">{proveedor != null ? proveedor.nombre_empresa : console.log("NADA")}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='clave'>Estado</TableCell>
                                        <TableCell className='value' align="right">
                                            <Label color={(producto.estado === false && 'error') || 'info'}>{producto.estado === true ? 'Activo' : 'Inactivo'}</Label>
                                        </TableCell>
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
                        <Button variant="contained" startIcon={<Edit />} onClick={handleEditarProducto}>Editar</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Delete />} onClick={handleDelete}>Eliminar</Button>
                    </Grid>
                    {producto.stock > 0 ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<Cancel />} onClick={handleDesactivar}>Desactivar</Button>
                        </Grid>
                        : false}
                    {pedidos.length > 0
                        ?
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalVentasProducto(true)}>Ver Ventas</Button>
                        </Grid>
                        : console.log("no tiene pedidos")
                    }

                </Grid>
            </Container>

            {showModalEditarProducto && (
                <EditarProductoModal
                    producto={producto}
                    showEditModal={showModalEditarProducto}
                    setShowEditModal={setShowModalEditarProducto}
                    onUpdate={handleUpdate}
                />
            )}

            {/* MODAL PARA VER PLANES ADQUIRIDOS */}
            {showModalVentasProducto && (
                <MostrarVentasProductosModal
                    pedidos={pedidos}
                    showModalVentasProducto={showModalVentasProducto}
                    setShowModalVentasProducto={setShowModalVentasProducto}
                />
            )}

        </>
    );
}

export default Producto;