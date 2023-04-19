import { useState } from 'react';
import { procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

function EditarRutinaModal(props) {
    const { rutina, showModalEditarRutina, setShowModalEditarRutina, onUpdate } = props;

    const [nivel, setNivel] = useState(rutina.nivel);
    const [duracion, setDuracion] = useState(rutina.duracion);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(rutina);


    const handleNivel = (event) => {
        setNivel(event.target.value);

    }
    const handleDuracion = (event) => {
        setDuracion(event.target.value);
    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowModalEditarRutina(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("DATA");
        console.log(data);
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
                const respuesta = await procesarPeticionPut(`rutina/editar/${rutina.id_rutina}`, data);
                setLoading(false);
                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })

                setShowModalEditarRutina(false);

                onUpdate(respuesta.data.rutina);

            } catch (error) {
                console.log(error)
                setLoading(false);

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
        <Dialog open={showModalEditarRutina} onClose={handleCancelar} >
            <DialogTitle>Editar Rutina</DialogTitle>
            <DialogContent>

                <TextField margin="normal" type="text" name="nombre_rutina" label="Nombre"
                    onChange={handleChange} defaultValue={rutina.nombre_rutina} fullWidth variant="outlined" />

                <TextField select margin="normal" type="text" name="nivel" label="Nivel"
                    onChange={handleNivel} fullWidth variant="outlined" defaultValue={rutina.nivel} >
                    <MenuItem key="Seleccionar" value="Seleccionar">Seleccionar</MenuItem>
                    <MenuItem key="Fácil" value="Fácil">Fácil</MenuItem>
                    <MenuItem key="Intermedio" value="Intermedio">Intermedio</MenuItem>
                    <MenuItem key="Avanzado" value="Avanzado">Avanzado</MenuItem>
                </TextField>

                <TextField select margin="normal" type="text" name="duracion" label="Duración"
                    onChange={handleDuracion} fullWidth variant="outlined" defaultValue={rutina.duracion} >
                    <MenuItem key="Seleccionar" value="Seleccionar">Seleccionar</MenuItem>
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
                    onChange={handleChange} defaultValue={rutina.descripcion} fullWidth variant="outlined" />

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

export default EditarRutinaModal