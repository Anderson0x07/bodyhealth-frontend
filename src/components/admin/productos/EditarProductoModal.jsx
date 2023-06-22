import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    TextField
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function EditarProductoModal(props) {

    const { showEditModal, setShowEditModal, producto, onUpdate } = props;


    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState(url + producto.foto);
    const [previsualizar, setPrevisualizar] = useState(url + producto.foto);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(producto);

    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(producto.proveedor.id_proveedor);
    const [proveedores, setProveedores] = useState(null);


    useEffect(() => {
        getProveedores();
    }, [])

    const getProveedores = async () => {
        try {
            const respuesta = await procesarPeticionGet(`proveedor/all`);
            setProveedores(respuesta.data.proveedores)

        } catch (error) {
            console.log(error);
        }
    }

    const handleProveedor = (event) => {
        setProveedorSeleccionado(event.target.value);
    }

    const handleImageUpload = (event) => {
        const reader = new FileReader();
        const file = event.target.files[0];
        setFileName(file.name)
        reader.onload = (event) => {
            const base64String = event.target.result.split(',')[1];
            setImage(base64String);
            const previsualizar = event.target.result;
            setPrevisualizar(previsualizar);
        };

        reader.readAsDataURL(file);
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowEditModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(data)

        if (proveedorSeleccionado === 'Seleccionar') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un proveedor',
                icon: 'warning'
            })
        } else {
            if (data.stock > 0) {
                data.estado = true;
            } else {
                data.estado = false;
            }

            data.proveedor = {
                id_proveedor: proveedorSeleccionado
            }

            if (!image.startsWith("https")) {
                data.foto = image + " " + fileName;
            }
            setLoading(true);
            console.log(data)

            try {
                const respuesta = await procesarPeticionPut(`producto/editar/${producto.id_producto}`, data);
                setLoading(false);
                Swal.fire({
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success',
                    customClass: {
                        container: 'my-swal'
                    }
                })
                setShowEditModal(false);
                onUpdate(respuesta.data.producto);


            } catch (error) {
                setLoading(false);
                console.log(error);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Atención',
                    text: error.response.data.error,
                    icon: 'error'
                })
            }
        }
    };

    return (
        <Dialog open={showEditModal} onClose={handleCancelar} >
            <DialogTitle>Editar producto</DialogTitle>
            <DialogContent>
                <TextField select margin="normal" type="text" name="proveedor" label="Proveedor" onChange={handleProveedor}
                    fullWidth variant="outlined" value={proveedorSeleccionado} helperText="Por favor seleccione un proveedor">
                    <MenuItem key="S" value="Seleccionar">Seleccionar</MenuItem>
                    {proveedores != null && proveedores.map((proveedor) => (
                        <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                            {proveedor.nombre_empresa}
                        </MenuItem>
                    ))}

                </TextField>

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} defaultValue={producto.nombre} fullWidth variant="outlined" />

                <TextField margin="normal" type="number" name="stock" label="Stock"
                    onChange={handleChange} defaultValue={producto.stock} fullWidth variant="outlined" />

                <TextField margin="normal" type="number" name="precio" label="Precio"
                    onChange={handleChange} defaultValue={producto.precio} fullWidth variant="outlined" />


                <Button variant="outlined" component="label" size="large" >
                    Cambiar foto de producto
                    <input hidden accept="image/*" type="file" name="foto" onChange={handleImageUpload} />
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" name='foto' onChange={handleImageUpload} />
                    <PhotoCamera />
                </IconButton>

                {previsualizar && <Avatar style={{ margin: '0 auto', width: '200px', height: '200px' }} src={previsualizar} />}

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancelar}>Cancelar</Button>
                <LoadingButton
                    color="secondary"
                    onClick={handleSubmit}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Save />}
                    variant="contained"
                >
                    Guardar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default EditarProductoModal