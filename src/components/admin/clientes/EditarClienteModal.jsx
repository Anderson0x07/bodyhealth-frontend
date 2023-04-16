import React, { useState } from 'react';
import { procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    TextField
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { esMayorDe15 } from '../../../utils/esMayorDe15';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function EditarClienteModal(props) {

    const { showEditModal, setShowEditModal, cliente, onUpdate } = props;

    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState(url+cliente.foto);
    const [previsualizar, setPrevisualizar] = useState(url+cliente.foto);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(cliente);
    const [jornada, setJornada] = useState(cliente.jornada);

    const handleJornada = (event) => {
        setJornada(event.target.value);
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

        if (jornada === 'S') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar una jornada',
                icon: 'warning'
            })

        } else if (!esMayorDe15(data.fecha_nacimiento)) {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debes ser mayor a 15 años',
                icon: 'warning'
            })

        } else {
            data.jornada = jornada;

            if (!image.startsWith("https")) {
                data.foto = image + " " + fileName;
            }
            setLoading(true);
            console.log(data)
            try {
                const respuesta = await procesarPeticionPut(`cliente/editar/${cliente.id_usuario}`, data);
                setLoading(false);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })
                
                setShowEditModal(false);

                onUpdate(respuesta.data.cliente);

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
            <DialogTitle>Editar cliente</DialogTitle>
            <DialogContent>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField margin="normal" type="text" name="tipo_documento" label="Tipo de documento" onChange={handleChange}
                            fullWidth variant="outlined" defaultValue={cliente.tipo_documento} 
                            InputProps={{
                                readOnly: true,
                            }}/>

                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="normal" type="number" name="documento" label="Documento"
                            fullWidth onChange={handleChange} defaultValue={cliente.documento} variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                </Grid>

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} defaultValue={cliente.nombre} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="apellido" label="Apellido"
                    onChange={handleChange} defaultValue={cliente.apellido} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="telefono" label="Teléfono"
                    onChange={handleChange} defaultValue={cliente.telefono} fullWidth variant="outlined" />

                <TextField margin="normal" type="date" name="fecha_nacimiento"
                    onChange={handleChange} defaultValue={cliente.fecha_nacimiento} fullWidth variant="outlined" label="Fecha de nacimiento" />

                <TextField margin="normal" type="email" name="email" label="Email"
                    onChange={handleChange} defaultValue={cliente.email} fullWidth variant="outlined" />

                <TextField name="jornada" margin="normal" select label="Jornada" onChange={handleJornada}
                    fullWidth variant="outlined" defaultValue={cliente.jornada} helperText="Por favor seleccione jornada">
                    <MenuItem key="S" value="S">Seleccionar</MenuItem>
                    <MenuItem key="M" value="Manana">Mañana</MenuItem>
                    <MenuItem key="T" value="Tarde">Tarde</MenuItem>
                </TextField>

                <Button variant="outlined" component="label" size="large" >
                    Cambiar foto de perfil
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

export default EditarClienteModal