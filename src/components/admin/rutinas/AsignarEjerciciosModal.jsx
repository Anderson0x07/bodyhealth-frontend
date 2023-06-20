import { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost, procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

function AsignarEjerciciosModal(props) {
    const { id_rutina, showModalAsignarEjercicios, setShowModalAsignarEjercicios, onUpdate } = props;

    const [isVisible, setIsVisible] = useState(false);
    const [data, setData] = useState({});

    const [loading, setLoading] = useState(false);

    const [musculoSeleccionado, setMusculoSeleccionado] = useState("S")


    const [ejercicioSeleccion, setEjercicioSeleccion] = useState([])
    const [ejercicios, setEjercicios] = useState(null);
    const [musculos, setMusculos] = useState(null);

    const [ejerciciosGuardados, setEjerciciosGuardados] = useState([]);




    useEffect(() => {
        getMusculos();
        revisarEjerciciosGuardados();
    }, []);

    const revisarEjerciciosGuardados = async () => {
        try {
            const res = await procesarPeticionGet("rutinaejercicio/rutina/" + id_rutina);

            const arregloIds = res.data.rutinaejercicios.map(objeto => objeto.ejercicio);

            setEjerciciosGuardados(arregloIds)
            console.log(arregloIds)

        } catch (error) {
            console.log(error)
        }
    }

    const getEjerciciosFiltro = async (id_musculo) => {
        try {
            const response = await procesarPeticionGet("ejercicio/filtro/" + id_musculo);

            const ejerciciosDisponibles = response.data.ejercicios.filter((ejercicio) =>
                !ejerciciosGuardados.some((ejercicioGuardado) => ejercicioGuardado.id_ejercicio === ejercicio.id_ejercicio)
            );

            setEjercicios(ejerciciosDisponibles);
        } catch (error) {
            console.log(error)
        }
    };

    const getMusculos = async () => {
        try {
            const response = await procesarPeticionGet("musculo/all");
            setMusculos(response.data.musculos);
        } catch (error) {
            console.log(error)
        }
    };



    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setEjercicioSeleccion(
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    const handleCancelar = () => {
        setShowModalAsignarEjercicios(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        console.log("DATA");
        console.log(data);

        data.rutina = {
            id_rutina: id_rutina
        }

        if (musculoSeleccionado === 'S') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un musculo para filtrar los ejercicios.',
                icon: 'warning'
            })

        } else if (ejercicioSeleccion.length == 0) {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar al menos un ejercicio.',
                icon: 'warning'
            })
        } else {
            setLoading(true);



            try {
                for (let i = 0; i < ejercicioSeleccion.length; i++) {

                    data.ejercicio = {
                        id_ejercicio: parseInt(ejercicioSeleccion[i].split(":")[0])
                    }

                    await procesarPeticionPost(`rutinaejercicio/guardar`, data);

                }
                setLoading(false);
                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: 'Ejercicios asignados correctamente',
                    icon: 'success'
                })

                setShowModalAsignarEjercicios(false);

                const res = await procesarPeticionGet("rutinaejercicio/rutina/" + id_rutina);

                onUpdate(res.data.rutinaejercicios);

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


    const handleSeleccionMusculo = (event) => {
        setMusculoSeleccionado(event.target.value);

        const id_musculo = event.target.value;

        setIsVisible(false);
        setEjercicioSeleccion([])

        if (id_musculo > 0) {
            getEjerciciosFiltro(id_musculo);
            setIsVisible(true);
        }
    }


    return (
        <Dialog open={showModalAsignarEjercicios} onClose={handleCancelar} >
            <DialogTitle>Asignar Ejercicios</DialogTitle>
            <DialogContent>

                <TextField name="musculo" margin="normal" select label="Musculo" onChange={handleSeleccionMusculo}
                    fullWidth variant="outlined" value={musculoSeleccionado} helperText="Por favor seleccione filtro por musculo">
                    <MenuItem key="S" value="S">
                        Seleccionar
                    </MenuItem>
                    {musculos != null
                        && musculos.map((musculo) => (
                            <MenuItem key={musculo.id_musculo} value={musculo.id_musculo}>
                                {musculo.nombre}
                            </MenuItem>
                        ))
                    }

                </TextField>

                {isVisible &&
                    <FormControl margin='normal' fullWidth>
                        <InputLabel id="demo-multiple-checkbox-label">Ejercicios</InputLabel>
                        <Select
                            multiple
                            value={ejercicioSeleccion}
                            onChange={handleChange}
                            input={<OutlinedInput label="Ejercicios" />}
                            renderValue={(selected) => selected.join(', ')}

                        >

                            {ejercicios != null
                                && ejercicios.map((ejercicio) => (
                                    <MenuItem key={ejercicio.id_ejercicio} value={ejercicio.id_ejercicio + ":" + ejercicio.descripcion}>
                                        <Checkbox checked={ejercicioSeleccion.indexOf(ejercicio.id_ejercicio + ":" + ejercicio.descripcion) > -1} />
                                        <ListItemText primary={ejercicio.descripcion} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                }



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

export default AsignarEjerciciosModal