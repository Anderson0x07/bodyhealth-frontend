import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost, procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Avatar,
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
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


function AsignarRutinaModal(props) {

    const { cliente, showModalAsignarRutina, setShowModalAsignarRutina, onUpdate } = props;

    const [loading, setLoading] = useState(false);

    const [rutinaSeleccion, setRutinaSeleccion] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setRutinaSeleccion(
            typeof value === 'string' ? value.split(',') : value,
        );

    };

    const data = {};

    //rutinas disponibles
    const [rutinas, setRutinas] = useState(null);

    useEffect(() => {
        getRutinas();
    }, [])

    const getRutinas = async () => {
        try {
            const respuesta = await procesarPeticionGet('rutina/all');

            setRutinas(respuesta.data.rutinas)

        } catch (error) {
            console.log(error);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error'
            })
            setShowModalAsignarRutina(false);
        }
    }


    const handleCancelar = () => {
        setShowModalAsignarRutina(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        data.cliente = cliente;
        setLoading(true);

        for (let i = 0; i < rutinaSeleccion.length; i++) {

            data.rutina = {
                id_rutina: rutinaSeleccion[i].split(":")[0]
            }

            try {
                const respuesta = await procesarPeticionPost(`clienterutina/guardar`, data);
                setLoading(false);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })
                setShowModalAsignarRutina(false);
                
                const response = await procesarPeticionGet(`clienterutina/${respuesta.data.id_clienterutina}`);

                onUpdate(response.data.clienterutina);

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
        <Dialog open={showModalAsignarRutina} onClose={handleCancelar} maxWidth={'xl'}>
            <DialogTitle>Asignación de rutinas</DialogTitle>
            <DialogContent>


                <FormControl sx={{ m: 1, width: 300 }} fullWidth>
                    <InputLabel id="demo-multiple-checkbox-label">Rutinas</InputLabel>
                    <Select
                        multiple
                        value={rutinaSeleccion}
                        onChange={handleChange}
                        input={<OutlinedInput label="Rutinas" />}
                        renderValue={(selected) => selected.join(', ')}

                    >

                        {rutinas != null
                            && rutinas.map((rutina) => (
                                <MenuItem key={rutina.id_rutina} value={rutina.id_rutina + ":" + rutina.nombre_rutina}>
                                    <Checkbox checked={rutinaSeleccion.indexOf(rutina.id_rutina + ":" + rutina.nombre_rutina) > -1} />
                                    <ListItemText primary={rutina.nombre_rutina} />
                                </MenuItem>
                            ))
                        }
                    </Select>
                </FormControl>


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

export default AsignarRutinaModal;