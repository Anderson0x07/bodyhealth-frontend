import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    MenuItem,
    OutlinedInput,
    TextField
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


function AgregarProductoModal(props) {
    const { showModal, setShowModal, agregarProducto } = props;

    const [data, setData] = useState({});
    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState('');
    const [previsualizar, setPrevisualizar] = useState('');

    const [loading, setLoading] = useState(false);

    const [proveedor, setProveedor] = useState("Seleccionar");
    const [proveedores, setProveedores] = useState(null);

    const [tipo, setTipo] = useState("Seleccionar");


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

    const handleProveedor = (event) => {
        setProveedor(event.target.value);
    }

    const handleTipo = (event) => {
        setTipo(event.target.value);
    }

    const handleCancelar = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (proveedor === 'Seleccionar') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un proveedor',
                icon: 'warning'
            })
        } else if (tipo === 'Seleccionar') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un tipo de producto',
                icon: 'warning'
            })
        } else {
            setLoading(true);
            if (data.stock > 0) {
                data.estado = true;
            } else {
                data.estado = false;
            }

            data.proveedor = {
                id_proveedor: proveedor
            }

            data.tipo = tipo

            if (image != "") {
                data.foto = image + " " + fileName;
            } else {
                data.foto = "";
            }


            try {
                const respuesta = await procesarPeticionPost(`producto/guardar`, data);
                setLoading(false);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })

                setShowModal(false);

                const response = await procesarPeticionGet("producto/all");

                agregarProducto(response.data.productos);

            } catch (error) {
                setLoading(false);
                console.log(error);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Atención',
                    text: error.response.data.errors != null ? "Revisar los campos!!" : error.response.data.error,
                    icon: 'error'
                })
            }
        }
    }

    const tipos_productos = [{id:1, descripcion: "Creatinas"},
                        {id:2, descripcion: "Proteinas en polvo"},
                        {id:3, descripcion: "Pre-entrenos"},
                        {id:4, descripcion: "BCAA (aminoacidos)"},
                        {id:5, descripcion: "Vitaminas"}]

    return (

        <Dialog open={showModal} onClose={handleCancelar} >
            <DialogTitle>Nuevo producto</DialogTitle>
            <DialogContent>
                <TextField select margin="normal" type="text" name="proveedor" label="Proveedor" onChange={handleProveedor}
                    fullWidth variant="outlined" value={proveedor} helperText="Por favor seleccione un proveedor">
                    <MenuItem key="S" value="Seleccionar">Seleccionar</MenuItem>
                    {proveedores != null && proveedores.map((proveedor) => (
                        <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                            {proveedor.nombre_empresa}
                        </MenuItem>
                    ))}

                </TextField>

                <TextField select margin="normal" type="text" name="tipo" label="Tipo de producto" onChange={handleTipo}
                    fullWidth variant="outlined" value={tipo} helperText="Por favor seleccione el tipo de producto">
                    <MenuItem key="S" value="Seleccionar">Seleccionar</MenuItem>
                    {tipos_productos.map((tipo) => (
                        <MenuItem key={tipo.id} value={tipo.descripcion}>
                            {tipo.descripcion}
                        </MenuItem>
                    ))}

                </TextField>

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el nombre" />

                <TextField margin="normal" type="number" name="stock" label="Stock"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el stock disponible" />

                <TextField margin="normal" type="number" name="precio" label="Precio"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el precio" />

                <Button variant="outlined" component="label" size="large" >
                    Subir foto de producto
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

    );
}

export default AgregarProductoModal;


