import React, { useState } from 'react';
import Swal from 'sweetalert2'
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    OutlinedInput,
    TextField
} from '@mui/material';
import { PhotoCamera, Visibility, VisibilityOff, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';
import { esMayorDe15 } from '../utils/esMayorDe15';
import { procesarPeticionPost } from '../utils/HandleApi';


function RegistroClienteModal(props) {

    const navigate = useNavigate();

    const { showModal, setShowModal } = props;

    const [data, setData] = useState({});
    const [fileName, setFileName] = useState(null);
    const [image, setImage] = useState('');
    const [previsualizar, setPrevisualizar] = useState('');

    const [loading, setLoading] = useState(false);


    const [tipoDoc, setTipoDoc] = useState("Seleccionar");
    const [jornada, setJornada] = useState("Seleccionar");


    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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


    const handleTipoDoc = (event) => {
        setTipoDoc(event.target.value);

    }
    const handleJornada = (event) => {
        setJornada(event.target.value);
    }

    const handleCancelar = () => {
        setShowModal(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (tipoDoc === 'Seleccionar') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un tipo de documento',
                icon: 'warning'
            })
        } else if (jornada === 'Seleccionar') {
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
            setLoading(true);
            data.estado = false;

            data.tipo_documento = tipoDoc;
            data.jornada = jornada;
            data.rol = {
                id_rol: 2
            }

            if (image != "") {
                data.foto = image + " " + fileName;
            } else {
                data.foto = "";
            }

            console.log("******")
            console.log(data)

            try {
                const respuesta = await procesarPeticionPost(`cliente/guardar`, data);
                console.log(respuesta)
                setLoading(false);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: 'Cuenta creada con éxito',
                    icon: 'success'
                })

                setShowModal(false);

                navigate("/bodyhealth-frontend/login");

            } catch (error) {
                setLoading(false);
                console.log(error);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Atención',
                    text: error,
                    icon: 'error'
                })
            }
        }

    }

    return (

        <Dialog open={showModal} onClose={handleCancelar} >
            <DialogTitle>Crear Cuenta</DialogTitle>
            <DialogContent>

                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField select margin="normal" type="text" name="tipo_documento" label="Tipo de documento" onChange={handleTipoDoc}
                            fullWidth variant="outlined" value={tipoDoc} helperText="Por favor seleccione tipo de documento">

                            <MenuItem key="S" value="Seleccionar">Seleccionar</MenuItem>
                            <MenuItem key="CC" value="CC">Cedula de ciudadania</MenuItem>
                            <MenuItem key="TI" value="TI">Tarjeta de identidad</MenuItem>

                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField margin="normal" type="number" name="documento" label="Documento"
                            fullWidth onChange={handleChange} variant="outlined" helperText="Por favor ingrese su documento" />
                    </Grid>
                </Grid>

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese su nombre" />

                <TextField margin="normal" type="text" name="apellido" label="Apellido"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese su apellido" />

                <TextField margin="normal" type="text" name="telefono" label="Teléfono"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese su número de telefono" />

                <TextField margin="normal" type="date" name="fecha_nacimiento"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor seleccione su fecha de nacimiento" />

                <TextField margin="normal" type="email" name="email" label="Email"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese su email" />

                <FormControl margin="normal" fullWidth variant="outlined" >
                    <InputLabel htmlFor="pass">Contraseña</InputLabel>
                    <OutlinedInput
                        id="pass"
                        name='password'
                        type={showPassword ? 'text' : 'password'}
                        onChange={handleChange}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>

                <TextField name="jornada" margin="normal" select label="Jornada" onChange={handleJornada}
                    fullWidth variant="outlined" value={jornada} helperText="Por favor seleccione jornada">
                    <MenuItem key="S" value="Seleccionar">Seleccionar</MenuItem>
                    <MenuItem key="M" value="Manana">Mañana</MenuItem>
                    <MenuItem key="T" value="Tarde">Tarde</MenuItem>
                </TextField>

                <Button variant="outlined" component="label" size="large" >
                    Subir foto de perfil
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
                    Crear cuenta
                </LoadingButton>
            </DialogActions>
        </Dialog>

    );
}

export default RegistroClienteModal;


