import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from "../../../utils/HandleApi";
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, TextField, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';




function AgregarEjercicioModal(props) {
    const { showModal, setShowModal, agregarEjercicios } = props;

    const [musculoSeleccionado, setMusculoSeleccionado] = useState("S")
    const [musculos, setMusculos] = useState(null)
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleCancelar = () => {
        setShowModal(false);
    };

    const getMusculos = async () => {
        try {
            const respuesta = await procesarPeticionGet(`musculo/all`);
            setMusculos(respuesta.data.musculos)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMusculos();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        data.musculo = {
            id_musculo: musculoSeleccionado
        }

        setLoading(true);
        try {
            const respuesta = await procesarPeticionPost(`ejercicio/guardar`, data);
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
            const response = await procesarPeticionGet("ejercicio/all");

            agregarEjercicios(response.data.ejercicios);
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

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleMusculo = (event) => {
        setMusculoSeleccionado(event.target.value);
    }

    return (
        <Dialog open={showModal} onClose={handleCancelar} >
            <DialogTitle>Agregar Ejercicio</DialogTitle>
            <DialogContent>
                <TextField margin="normal" type="text" name="descripcion" label="Descripción"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese la descripción del ejercicio." />

                <TextField margin="normal" type="text" name="series" label="Series"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese las series del ejercicio." />

                <TextField margin="normal" type="number" name="repeticiones" label="Repeticiones"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese las repeticiones del ejercicio." />

                <TextField margin="normal" type="text" name="url_video" label="URL video"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese la URL del video del ejercicio." />
                <TextField select margin="normal" type="text" name="musculo" label="Musculo" onChange={handleMusculo}
                    fullWidth variant="outlined" value={musculoSeleccionado} helperText="Por favor seleccione un musculo">
                    <MenuItem key="S" value="S">Seleccionar</MenuItem>
                    {musculos != null && musculos.map((musculo) => (
                        <MenuItem key={musculo.id_musculo} value={musculo.id_musculo}>
                            {musculo.nombre}
                        </MenuItem>
                    ))}

                </TextField>
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

export default AgregarEjercicioModal
