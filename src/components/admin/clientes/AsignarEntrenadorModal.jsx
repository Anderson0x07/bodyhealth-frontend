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


function AsignarEntrenadorModal(props) {

    const { cliente, showModalAsignarEntrenador, setShowModalAsignarEntrenador, onUpdate } = props;
    const [loading, setLoading] = useState(false);
    const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState('S');

    const clienteEntrenador = {};

    //Entrenadores por jornada...
    const [entrenadores, setEntrenadores] = useState(null);

    useEffect(() => {
        getEntrenadores();
    }, [])

    const getEntrenadores = async () => {
        try {
            const respuesta = await procesarPeticionGet('entrenador/all/jornada/'+cliente.jornada);
            setEntrenadores(respuesta.data.entrenadores)

        } catch (error) {
            console.log(error);
        }
    }

    
    const handleEntrenador = (event) => {
        setEntrenadorSeleccionado(event.target.value);
    }

    const handleCancelar = () => {
        setShowModalAsignarEntrenador(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        

        if (entrenadorSeleccionado === "S") {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un entrenador',
                icon: 'warning'
            })

        } else {
            clienteEntrenador.entrenador = {
                id_usuario: entrenadorSeleccionado
            }
            clienteEntrenador.cliente = cliente;

            setLoading(true);


            try {
                const respuesta = await procesarPeticionPost(`entrenadorcliente/guardar`, clienteEntrenador);
                setLoading(false);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })
                setShowModalAsignarEntrenador(false);

                const response = await procesarPeticionGet(`entrenadorcliente/${respuesta.data.id_asignacion}`);

                onUpdate(response.data.entrenadorcliente);

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
        <Dialog open={showModalAsignarEntrenador} onClose={handleCancelar} >
            <DialogTitle>Asignación de entrenador</DialogTitle>
            <DialogContent>

                <TextField name="entrenador" margin="normal" select label="Entrenador" onChange={handleEntrenador}
                    fullWidth variant="outlined" value={entrenadorSeleccionado} helperText="Por favor seleccione el entrenador">
                    <MenuItem key="S" value="S">
                            Seleccionar
                    </MenuItem>
                    {entrenadores != null 
                        && entrenadores.map((trainer) => (
                            <MenuItem key={trainer.id_usuario} value={trainer.id_usuario}>
                                {trainer.nombre + " " + trainer.apellido}
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

export default AsignarEntrenadorModal;