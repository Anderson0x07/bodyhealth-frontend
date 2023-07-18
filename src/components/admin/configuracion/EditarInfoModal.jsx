import React, { useState } from 'react';
import { procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    TextField
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function EditarInfoModal(props) {

    const { info, showModalEditarInfo, setShowModalEditarInfo, onUpdate } = props;


    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState(url + info.logo_empresa);
    const [previsualizar, setPrevisualizar] = useState(url + info.logo_empresa);
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState(info);


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
        setShowModalEditarInfo(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!image.startsWith("https")) {
            data.logo_empresa = image + " " + fileName;
        }
        setLoading(true);

        try {
            const respuesta = await procesarPeticionPut(`infobasica/editar/${info.id_configuracion}`, data);
            setLoading(false);
            Swal.fire({
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success',
                customClass: {
                    container: 'my-swal'
                }
            })
            setShowModalEditarInfo(false);
            onUpdate(respuesta.data.infobasica);


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
        <Dialog open={showModalEditarInfo} onClose={handleCancelar} >
            <DialogTitle>Editar información básica</DialogTitle>
            <DialogContent>


                <Button variant="outlined" component="label" size="large" >
                    Cambiar logo de empresa
                    <input hidden accept="image/*" type="file" name="foto" onChange={handleImageUpload} />
                </Button>
                <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" name='foto' onChange={handleImageUpload} />
                    <PhotoCamera />
                </IconButton>

                <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                    {previsualizar && <Avatar style={{ margin: '0 auto', width: '500px', height: '200px', borderRadius: 1 }} src={previsualizar} />}
                </div>

                <TextField margin="normal" type="text" name="nombre_empresa" label="Nombre empresa"
                    onChange={handleChange} fullWidth defaultValue={data.nombre_empresa} variant="outlined" />

                <TextField margin="normal" type="text" name="direccion" label="Dirección"
                    onChange={handleChange} fullWidth defaultValue={data.direccion} variant="outlined" />

                <TextField margin="normal" type="text" name="email" label="Email"
                    onChange={handleChange} fullWidth defaultValue={data.email} variant="outlined" />

                <TextField margin="normal" type="text" name="eslogan" label="Eslogan"
                    onChange={handleChange} fullWidth defaultValue={data.eslogan} variant="outlined" />

                <TextField margin="normal" type="text" name="rut" label="RUT"
                    onChange={handleChange} fullWidth defaultValue={data.rut} variant="outlined" />

                <TextField margin="normal" type="text" name="telefono" label="Teléfono"
                    onChange={handleChange} fullWidth defaultValue={data.telefono} variant="outlined" />

                <TextField margin="normal" type="text" name="url_facebook" label="Cuenta de facebook"
                    onChange={handleChange} fullWidth defaultValue={data.url_facebook} variant="outlined" />

                <TextField margin="normal" type="text" name="url_instagram" label="Cuenta de instagram"
                    onChange={handleChange} fullWidth defaultValue={data.url_instagram} variant="outlined" />

                <TextField margin="normal" type="text" name="url_tiktok" label="Cuenta de tiktok"
                    onChange={handleChange} fullWidth defaultValue={data.url_tiktok} variant="outlined" />

                <TextField margin="normal" type="text" name="url_twitter" label="Cuenta de twitter"
                    onChange={handleChange} fullWidth defaultValue={data.url_twitter} variant="outlined" />

                <TextField margin="normal" type="text" name="url_whatsapp" label="Cuenta de whatsapp"
                    onChange={handleChange} fullWidth defaultValue={data.url_whatsapp} variant="outlined" />

                <TextField margin="normal" type="text" name="url_youtube" label="Cuenta de youtube"
                    onChange={handleChange} fullWidth defaultValue={data.url_youtube} variant="outlined" />

                <TextField margin="normal" type="text" name="pie_pagina" label="Pie de página"
                    onChange={handleChange} fullWidth defaultValue={data.pie_pagina} variant="outlined" />

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

export default EditarInfoModal;