import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';
//import EditarProductoModal from './EditarproductoModal';
import Swal from 'sweetalert2';
//import AsignarEntrenadorModal from './AsignarEntrenadorModal';
import { ArrowBack, Cancel, CheckCircleRounded, Edit } from '@mui/icons-material';
import Label from '../dashboard/label/Label';
import { Avatar, Button, Card, Container, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EditarProductoModal from './EditarProductoModal';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Producto() {
    const [producto, setProducto] = useState({});
    const [productoEntrenadores, setProductoEntrenadores] = useState([]);
    const [editarAsignacion, setDesactivarProducto] = useState({});
    const [editedproducto, setEditedproducto] = useState({});
    const [error, setError] = useState("");
    const [showModalEditarProducto, setShowModalEditarProducto] = useState(false);
    const [proveedor, setProveedor] = useState(null);


    const navigate = useNavigate();

    const { id } = useParams();


    useEffect(() => {
        const getproducto = async () => {
            try {
                const response = await procesarPeticionGet(`producto/${id}`);
                console.log(response);
                setProducto(response.data.producto);
                setProveedor(response.data.producto.proveedor);
            } catch (error) {
                setError(error.response.data.error)
            }
        };
        getproducto();
    }, []);


    const handleBack = () => {
        navigate(`/admin/dashboard/productos`);
    };

    const handleDesactivar = async () => {
        console.log("Entrando a desactivar producto..")

        try {
            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea desactivar el producto?",
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
                    const response = await procesarPeticionPut(`producto/desactivar/${id}`);
                    Swal.fire(
                        'Información',
                        response.data.message,
                        'success'
                    ).then(() => {
                        navigate(`/admin/dashboard/productos/${id}`);
                    })
                }
            })
        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };

    const handleEditarproducto = () => {
        setEditedproducto(producto);
        setShowModalEditarProducto(true);
    };

    const handleUpdate = (updatedData) => {
        setProveedor(updatedData.proveedor)
        setProducto(updatedData)
    }

    const handleUpdateAsignacion = (updatedData) => {
        setDesactivarProducto(updatedData);
    }
    const handleActivar = () => {
        console.log("Entrando a activar producto..")
        setShowModalAsignarEntrenador(true);

    }

    return (
        <div>

            <Container>

                <Typography variant="h4" gutterBottom mb={3}>
                    Datos del producto
                </Typography>

                <Card>
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

                </Card>


                <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<ArrowBack />} onClick={handleBack}>Atras</Button>
                    </Grid>
                    <Grid item xs={2} sm={2} md={3} >
                        <Button variant="contained" startIcon={<Edit />} onClick={handleEditarproducto}>Editar</Button>
                    </Grid>

                    

                </Grid>
                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                    <Grid item xs={6} sm={4} md={6} pb={5}>
                        <TableContainer>
                            <Table style={{ border: "1px solid black" }}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell >Pedido</TableCell>
                                        <TableCell >Cliente</TableCell>
                                        <TableCell >Fecha compra</TableCell>
                                        <TableCell >Cantidad</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {producto.pedidos != null
                                        ? producto.pedidos.map((pedido) => (
                                            <TableRow>
                                                <TableCell className='value'>{pedido.id_pedido}</TableCell>
                                                <TableCell className='value' align="right">{pedido.compra.cliente.nombre + " " + pedido.compra.cliente.apellido}</TableCell>
                                                <TableCell className='value' align="right">{pedido.compra.fecha_compra}</TableCell>
                                                <TableCell className='value' align="right">{pedido.cantidad}</TableCell>
                                            </TableRow>
                                        ))
                                        : console.log("No hay pedidos")
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
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

        </div>
    );
}

export default Producto;