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


function AsignarRutinaModal(props) {

    const { cliente, showModalAsignarRutina, setShowModalAsignarRutina, onUpdate } = props;   
    
    const [loading, setLoading] = useState(false);
    const [rutinaSeleccionada, setRutinaSeleccionada] = useState('S');

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

    const handleSeleccionRutina = (event) => {
        setRutinaSeleccionada(event.target.value);
    }

    const handleCancelar = () => {
        setShowModalAsignarRutina(false);
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

            console.log("D-A-T-A DE LA RUTINA ASIGNADA")
            console.log(data)

            try {
                const respuesta = await procesarPeticionPost(`clienterutina/guardar`, data);
                console.log(respuesta)
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
                console.log(response)

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
            <DialogTitle>Asignación de rutina</DialogTitle>
            <DialogContent>

                <TextField name="rutina" margin="normal" select label="Rutina" onChange={handleSeleccionRutina}
                    fullWidth variant="outlined" value={rutinaSeleccionada} helperText="Por favor seleccione la rutina">
                    <MenuItem key="S" value="S">
                            Seleccionar
                    </MenuItem>
                    {rutinas != null 
                        ? rutinas.map((rutina) => (
                            <MenuItem key={rutina.id_rutina} value={rutina.id_rutina}>
                                {rutina.nombre_rutina}
                            </MenuItem>
                        )) 
                        : console.log("cargando rutinas") 
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

export default AsignarRutinaModal;