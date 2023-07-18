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
    InputAdornment,
    MenuItem,
    TextField
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function EditarPerfilEntrenadorModal(props) {

    const { entrenador, showModalEditarPerfil, setShowModalEditarPerfil, onUpdate } = props;


    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState(url + entrenador.foto);
    const [previsualizar, setPrevisualizar] = useState(url + entrenador.foto);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(entrenador);

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
            const respuesta = await procesarPeticionPut(`entrenador/editar/${entrenador.id_usuario}`, data);
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

            onUpdate(respuesta.data.entrenador);

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
                            fullWidth variant="outlined" defaultValue={entrenador.tipo_documento}
                            InputProps={{
                                readOnly: true,
                            }} />

                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="normal" type="number" name="documento" label="Documento"
                            fullWidth onChange={handleChange} defaultValue={entrenador.documento} variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }} />
                    </Grid>
                </Grid>

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} defaultValue={entrenador.nombre} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="apellido" label="Apellido"
                    onChange={handleChange} defaultValue={entrenador.apellido} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="telefono" label="Teléfono"
                    onChange={handleChange} defaultValue={entrenador.telefono} fullWidth variant="outlined" 
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <img loading="lazy" width="20" src={`https://flagcdn.com/w20/co.png`} srcSet={`https://flagcdn.com/w40/co.png 2x`} />
                            </InputAdornment>
                        )
                    }}
                />

                <TextField margin="normal" type="date" name="fecha_nacimiento"
                    onChange={handleChange} defaultValue={entrenador.fecha_nacimiento} fullWidth variant="outlined" label="Fecha de nacimiento" />

                <TextField margin="normal" type="email" name="email" label="Email"
                    onChange={handleChange} defaultValue={entrenador.email} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="jornada" label="Jornada" onChange={handleChange}
                    fullWidth variant="outlined" defaultValue={entrenador.jornada === "Manana" ? "Mañana" : "Tarde"}
                    InputProps={{
                        readOnly: true,
                    }} />

                <TextField sx={{mb:5}} margin="normal" type="text" name="titulo_academico" label="Titulo acádemico" onChange={handleChange}
                    fullWidth variant="outlined" defaultValue={entrenador.titulo_academico}
                    InputProps={{
                        readOnly: true,
                    }} />


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

export default EditarPerfilEntrenadorModal