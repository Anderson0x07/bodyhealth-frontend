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

        } else if(metodoPagoSeleccionado === "S") {
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

            // Obtener la fecha actual como una cadena en el formato deseado
            //const fechaActualFormateada = fechaActual.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-');

            data.fecha_inicio = fechaActual;

            const mesesASumar = 3;

            const anio = fechaActual.getFullYear();
            const mes = fechaActual.getMonth();
            const dia = fechaActual.getDate();
            const nuevaFecha = new Date(anio, mes + mesesASumar, dia);

            data.fecha_fin = nuevaFecha;


            setLoading(true);

            console.log("D-A-T-A DEL PLAN ASIGNADO")
            console.log(data)

            try {
                const respuesta = await procesarPeticionPost(`clientedetalle/guardar`, data);
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
                setShowModalAsignarPlan(false);

                const response = await procesarPeticionGet(`clientedetalle/${respuesta.data.id_factura}`);
                console.log(response)

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
                        ? planes.map((plan) => (
                            <MenuItem key={plan.id_plan} value={plan.id_plan}>
                                {plan.plan + " por " + plan.meses+ (plan.meses==1 ? " mes":" meses")}
                            </MenuItem>
                        )) 
                        : console.log("cargando planes") 
                    }
                    
                </TextField>

                <TextField name="metodoPago" margin="normal" select label="Método de pago" onChange={handleSeleccionMetodoPago}
                    fullWidth variant="outlined" value={metodoPagoSeleccionado} helperText="Por favor seleccione el metodo de pago">
                    <MenuItem key="S" value="S">
                            Seleccionar
                    </MenuItem>
                    {metodos != null 
                        ? metodos.map((metodo) => (
                            <MenuItem key={metodo.id_metodopago} value={metodo.id_metodopago}>
                                {metodo.descripcion}
                            </MenuItem>
                        )) 
                        : console.log("cargando metodos de pago") 
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