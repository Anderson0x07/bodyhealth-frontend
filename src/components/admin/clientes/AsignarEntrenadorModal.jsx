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
    const [entrenador, setEntrenador] = useState(null);
    const clienteEntrenador = {};

    //Entrenadores por jornada...
    const [entrenadores, setEntrenadores] = useState(null);

    useEffect(() => {
        getEntrenadores();
        console.log(entrenadores)
    }, [])

    const getEntrenadores = async () => {
        console.log("entrando a obtener trainers")
        console.log(cliente.jornada)
        try {
            const respuesta = await procesarPeticionGet(`entrenador/all/jornada/${cliente.jornada}`);
            setEntrenadores(respuesta.data.entrenadores)
            console.log(respuesta.data.entrenadores)

        } catch (error) {
            console.log("errorr")
            console.log(error);
        }
    }

    let seleccionar = 'S';
    const handleEntrenador = (event) => {
        seleccionar = "Uno";
        const trainer = event.target.value;
        setEntrenador(trainer.id_usuario);
    }

    const handleCancelar = () => {
        setShowModalAsignarEntrenador(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        

        if (seleccionar === 'S') {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un entrenador',
                icon: 'warning'
            })

        } else {
            clienteEntrenador.entrenador = entrenador;
            clienteEntrenador.cliente = cliente;

            setLoading(true);

            console.log(clienteEntrenador)

            try {
                const respuesta = await procesarPeticionPost(`entrenadorcliente/editar/${clienteEntrenador.id_asignacion}`, clienteEntrenador);
                setLoading(false);
                console.log(respuesta)
                Swal.fire('Información', respuesta.data.message, 'success')

                setShowModalAsignarEntrenador(false);
                onUpdate(clienteEntrenador);

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
            <DialogTitle>Editar asignacion de entrenador</DialogTitle>
            <DialogContent>

                <TextField name="entrenador" margin="normal" select label="Entrenador" onChange={handleEntrenador}
                    fullWidth variant="outlined" defaultValue={seleccionar} helperText="Por favor seleccione el entrenador">
                    
                    <MenuItem key="S" value="S">Seleccionar</MenuItem>
                    {entrenadores != null ? entrenadores.map((trainer) => (
                        <MenuItem key={trainer.id_usuario} value={trainer.id_usuario}>
                            {trainer.nombre + " " + trainer.apellido}
                        </MenuItem>
                    )) : console.log("cargando") }
                    
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