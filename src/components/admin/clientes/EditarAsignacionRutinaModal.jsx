import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost, procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


function EditarAsignacionRutinaModal(props) {

    const { cliente, rutinaAsignada, showModalEditarAsignacionRutina, setShowModalEditarAsignacionRutina, onUpdate } = props;   

    const [loading, setLoading] = useState(false);
    const [rutinaSeleccionada, setRutinaSeleccionada] = useState(rutinaAsignada[rutinaAsignada.length-1].rutina.id_rutina);

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
            setShowModalEditarAsignacionRutina(false);
        }
    }

    const handleSeleccionRutina = (event) => {
        setRutinaSeleccionada(event.target.value);
    }

    const handleCancelar = () => {
        setShowModalEditarAsignacionRutina(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        
        if (rutinaSeleccionada === "S") {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar una rutina',
                icon: 'warning'
            })

        } else {
            
            data.cliente = cliente;

            data.rutina = {
                id_rutina: rutinaSeleccionada
            }

            setLoading(true);

            try {
                const respuesta = await procesarPeticionPut(`clienterutina/editar/${rutinaAsignada[rutinaAsignada.length-1].id_clienterutina}`, data);
                setLoading(false);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })
                setShowModalEditarAsignacionRutina(false);

                onUpdate(respuesta.data.clienterutina);

            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        }
    };

    return (
        <Dialog open={showModalEditarAsignacionRutina} onClose={handleCancelar} maxWidth={'xl'}>
            <DialogTitle>Cambio de rutina</DialogTitle>
            <DialogContent>

                <TextField name="rutina" margin="normal" select label="Rutina" onChange={handleSeleccionRutina}
                    fullWidth variant="outlined" value={rutinaSeleccionada} helperText="Por favor seleccione la rutina">
                    <MenuItem key="S" value="S">
                            Seleccionar
                    </MenuItem>
                    {rutinas != null && 
                        rutinas.map((rutina) => (
                            <MenuItem key={rutina.id_rutina} value={rutina.id_rutina}>
                                {rutina.nombre_rutina}
                            </MenuItem>
                        ))
                    }
                    
                </TextField>

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

export default EditarAsignacionRutinaModal;