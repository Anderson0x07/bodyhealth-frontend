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


function AsignarPlanModal(props) {

    const { cliente, showModalAsignarPlan, setShowModalAsignarPlan, onUpdate } = props;
    const [loading, setLoading] = useState(false);
    const [planSeleccionado, setPlanSeleccionado] = useState('S');
    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('S');

    const data = {};

    //Planes y metodos disponibles
    const [planes, setPlanes] = useState(null);
    const [metodos, setMetodos] = useState(null);
    const [meses, setMeses] = useState(0);

    useEffect(() => {
        getPlanesAndMetodos();
    }, [])

    const getPlanesAndMetodos = async () => {
        try {
            const respuesta = await procesarPeticionGet('plan/all');

            setPlanes(respuesta.data.planes)

            const response = await procesarPeticionGet('metodopago/all');

            setMetodos(response.data.metodospago)

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
            setShowModalAsignarPlan(false);
        }
    }


    const handleSeleccionPlan = (event) => {
        setPlanSeleccionado(event.target.value);
        const planSeleccionado = planes.find(plan => plan.id_plan === event.target.value);

        setMeses(planSeleccionado.meses);
    }

    const handleSeleccionMetodoPago = (event) => {
        setMetodoPagoSeleccionado(event.target.value);

    }


    const handleCancelar = () => {
        setShowModalAsignarPlan(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();



        if (planSeleccionado === "S") {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un plan',
                icon: 'warning'
            })

        } else if (metodoPagoSeleccionado === "S") {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un metodo de pago',
                icon: 'warning'
            })
        } else {

            data.cliente = cliente;

            data.plan = {
                id_plan: planSeleccionado
            }

            data.metodoPago = {
                id_metodopago: metodoPagoSeleccionado
            }

            const fechaActual = new Date();

            data.fecha_inicio = fechaActual;

            const anio = fechaActual.getFullYear();
            const mes = fechaActual.getMonth();
            const dia = fechaActual.getDate();
            const nuevaFecha = new Date(anio, mes + meses, dia);

            data.fecha_fin = nuevaFecha;


            setLoading(true);

            try {
                const respuesta = await procesarPeticionPost(`clientedetalle/guardar`, data);

                
                const res = await procesarPeticionPut(`cliente/cambiar-estado/${cliente.id_usuario}/1`,null);
                
                //onUpdate(res.data.cliente);

                setLoading(false);

                Swal.fire({
                    customClass: {
                        container: 'my-swal'
                    },
                    title: 'Información',
                    text: respuesta.data.message,
                    icon: 'success'
                })
                setShowModalAsignarPlan(false);

                const response = await procesarPeticionGet(`clientedetalle/${respuesta.data.id_factura}`);

                onUpdate(response.data.clientedetalle);

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
        <Dialog open={showModalAsignarPlan} onClose={handleCancelar} >
            <DialogTitle>Asignación de plan</DialogTitle>
            <DialogContent>

                <TextField name="plan" margin="normal" select label="Plan" onChange={handleSeleccionPlan}
                    fullWidth variant="outlined" value={planSeleccionado} helperText="Por favor seleccione el plan">
                    <MenuItem key="S" value="S">
                        Seleccionar
                    </MenuItem>
                    {planes != null
                        && planes.map((plan) => (
                            <MenuItem key={plan.id_plan} value={plan.id_plan}>
                                {plan.plan + " por " + plan.meses + (plan.meses == 1 ? " mes" : " meses")}
                            </MenuItem>
                        ))
                    }

                </TextField>

                <TextField name="metodoPago" margin="normal" select label="Método de pago" onChange={handleSeleccionMetodoPago}
                    fullWidth variant="outlined" value={metodoPagoSeleccionado} helperText="Por favor seleccione el metodo de pago">
                    <MenuItem key="S" value="S">
                        Seleccionar
                    </MenuItem>
                    {metodos != null
                        && metodos.map((metodo) => (
                            <MenuItem key={metodo.id_metodopago} value={metodo.id_metodopago}>
                                {metodo.descripcion}
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

export default AsignarPlanModal;