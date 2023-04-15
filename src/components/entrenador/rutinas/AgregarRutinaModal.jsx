import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, TextField, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';




function AgregarRutinaModal(props) {
    const { showModal, setShowModal, agregarRutinas } = props;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [nivel, setNivel] = useState("Seleccionar");
    const [duracion, setDuracion] = useState("Seleccionar");
    const [errors, setErrors] = useState([]);

    const handleNivel = (event) => {
        setNivel(event.target.value);

    }
    const handleDuracion = (event) => {
        setDuracion(event.target.value);
    }

    const handleCancelar = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(data)
        if (nivel === 'Seleccionar') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un nivel.',
                icon: 'warning'
            })
        } else if (duracion === 'Seleccionar') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar una duración.',
                icon: 'warning'
            })

        } else {
            setLoading(true);
            data.nivel = nivel;
            data.duracion = duracion;


            try {
                const respuesta = await procesarPeticionPost(`rutina/guardar`, data);
                console.log("-----------------------------")
                console.log(respuesta)
                setLoading(false);
                console.log(respuesta);
                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })

                setShowModal(false);
                const response = await procesarPeticionGet("rutina/all");

                agregarRutinas(response.data.rutinas);
            } catch (error) {
                setLoading(false);
                console.log(error);
                const errorMessage = error.response.data.errors[0].split(' ');
                let message = "";
                if(errorMessage[0] === "nombre_rutina"){
                    message = error.response.data.errors[0].replace("nombre_rutina","");
                }else{
                    message = error.response.data.errors[0].replace("descripcion","");
                }
                console.log(message)
                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Atención',
                    text: message,
                    icon: 'error'
                })
            }

        }
    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <Dialog open={showModal} onClose={handleCancelar} >
            <DialogTitle>Agregar Rutina</DialogTitle>
            <DialogContent>
                <TextField margin="normal" type="text" name="nombre_rutina" label="Nombre"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el nombre de la rutina." />

                <TextField select margin="normal" type="text" name="nivel" label="Nivel"
                    onChange={handleNivel} fullWidth variant="outlined" value={nivel} helperText="Por favor ingrese el nivel de la rutina.">
                    <MenuItem key="S" value="Seleccionar">Seleccionar</MenuItem>
                    <MenuItem key="Fácil" value="Fácil">Fácil</MenuItem>
                    <MenuItem key="Intermedio" value="Intermedio">Intermedio</MenuItem>
                    <MenuItem key="Avanzado" value="Avanzado">Avanzado</MenuItem>
                </TextField>

                <TextField select margin="normal" type="text" name="duracion" label="Duración"
                    onChange={handleDuracion} fullWidth variant="outlined" value={duracion} helperText="Por favor ingrese la duración de la rutina.">
                    <MenuItem key="S" value="Seleccionar">Seleccionar</MenuItem>
                    <MenuItem key="10 min" value="10 min">10 min</MenuItem>
                    <MenuItem key="15 min" value="15 min">15 min</MenuItem>
                    <MenuItem key="20 min" value="20 min">20 min</MenuItem>
                    <MenuItem key="25 min" value="25 min">25 min</MenuItem>
                    <MenuItem key="30 min" value="30 min">20 min</MenuItem>
                    <MenuItem key="35 min" value="35 min">35 min</MenuItem>
                    <MenuItem key="40 min" value="40 min">40 min</MenuItem>
                    <MenuItem key="45 min" value="45 min">45 min</MenuItem>
                    <MenuItem key="50 min" value="50 min">50 min</MenuItem>
                    <MenuItem key="55 min" value="55 min">55 min</MenuItem>
                    <MenuItem key="60 min" value="60 min">60 min</MenuItem>
                </TextField>

                <TextField margin="normal" type="text" name="descripcion" label="Descripción"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese la descripcion de la rutina." />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelar}>Cancelar</Button>

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

export default AgregarRutinaModal
