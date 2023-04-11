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

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function EditarPerfilAdminModal(props) {

    const { admin, showModalEditarPerfil, setShowModalEditarPerfil, onUpdate } = props;


    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState(url + admin.foto);
    const [previsualizar, setPrevisualizar] = useState(url + admin.foto);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(admin);

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
        setShowModalEditarPerfil(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!image.startsWith("https")) {
            data.foto = image + " " + fileName;
        }
        setLoading(true);
        console.log(data)
        try {
            const respuesta = await procesarPeticionPut(`admin/editar/${admin.id_usuario}`, data);
            setLoading(false);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowModalEditarPerfil(false);

            onUpdate(respuesta.data.admin);

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
    };

    return (
        <Dialog open={showModalEditarPerfil} onClose={handleCancelar} >
            <DialogTitle>Editar información</DialogTitle>
            <DialogContent>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField margin="normal" type="text" name="tipo_documento" label="Tipo de documento" onChange={handleChange}
                            fullWidth variant="outlined" defaultValue={admin.tipo_documento}
                            InputProps={{
                                readOnly: true,
                            }} />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="normal" type="number" name="documento" label="Documento"
                            fullWidth onChange={handleChange} defaultValue={admin.documento} variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                </Grid>

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} defaultValue={admin.nombre} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="apellido" label="Apellido"
                    onChange={handleChange} defaultValue={admin.apellido} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="telefono" label="Teléfono"
                    onChange={handleChange} defaultValue={admin.telefono} fullWidth variant="outlined" />

                <TextField margin="normal" type="date" name="fecha_nacimiento"
                    onChange={handleChange} defaultValue={admin.fecha_nacimiento} fullWidth variant="outlined" label="Fecha de nacimiento" />

                <TextField margin="normal" type="email" name="email" label="Email"
                    onChange={handleChange} defaultValue={admin.email} fullWidth variant="outlined" />


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

export default EditarPerfilAdminModal