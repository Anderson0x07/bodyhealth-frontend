import React from 'react'
import { useState } from 'react';
import { procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';
function EditarPlanModal(props) {

    const { showEditModal, setShowEditModal, plan, onUpdate } = props;


    const [data, setData] = useState(plan);
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowEditModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        console.log(data)
        try {
            const respuesta = await procesarPeticionPut(`plan/editar/${plan.id_plan}`, data);
            setLoading(false);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowEditModal(false);
            onUpdate(respuesta.data.plan);
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


    };
    return (
        <Dialog open={showEditModal} onClose={handleCancelar} >
            <DialogTitle>Editar Plan</DialogTitle>
            <DialogContent>

                <TextField margin="normal" type="text" name="plan" label="Nombre del plan"
                    onChange={handleChange} defaultValue={plan.plan} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="meses" label="Duracion del plan"
                    onChange={handleChange} defaultValue={plan.meses} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="precio" label="Precio del plan"
                    onChange={handleChange} defaultValue={plan.precio} fullWidth variant="outlined" />
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
    )
}

export default EditarPlanModal
