import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { Save } from '@mui/icons-material';
import React, { useEffect, useState } from 'react'
import { procesarPeticionGet, procesarPeticionPdf, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SeleccionPlanModal(props) {

    const navigate = useNavigate();

    const { plan, cliente, showModalComprarPlan, setShowModalComprarPlan } = props;

    let data = {};

    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('S');


    const [metodos, setMetodos] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const getMetodos = async () => {
            try {
                const res = await procesarPeticionGet("metodopago/all")
                setMetodos(res.data.metodospago)

            } catch (error) {
                console.log(error)
            }
        }

        getMetodos();
    },[])

    const handleMetodo = (event) => {
        console.log("Metodo seleccionado: --")
        setMetodoPagoSeleccionado(event.target.value);
    }

    const handleCancelar = () => {
        setShowModalComprarPlan(false);
    }



    const handleSubmit = async (event) => {


        if (metodoPagoSeleccionado === "S") {
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: 'Debe seleccionar un método de pago',
                icon: 'warning'
            })

        } else {

            data.cliente = {
                id_usuario: cliente.id_usuario
            };
            data.plan = {
                id_plan: plan.id_plan
            };

            data.metodoPago = {
                id_metodopago: metodoPagoSeleccionado
            }

            const fechaActual = new Date();
            data.fecha_inicio = fechaActual.toISOString().slice(0, 10);

            const mesesASumar = plan.meses;

            const anio = fechaActual.getFullYear();
            const mes = fechaActual.getMonth();
            const dia = fechaActual.getDate();
            const nuevaFecha = new Date(anio, mes + mesesASumar, dia);

            data.fecha_fin = nuevaFecha.toISOString().slice(0, 10);

            setLoading(true);

            console.log("D-A-T-A DE la COMPRA")
            console.log(data)

            try {
                const respuesta = await procesarPeticionPost(`clientedetalle/guardar`, data);

                console.log(respuesta)
                setLoading(false);

                Swal.fire({
                    title: 'Información',
                    text: "Compra realizada con exito !!",
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Ver factura',
                    customClass: {
                        container: 'my-swal'
                    }
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const response = await procesarPeticionPdf(`clientedetalle/pdf/${respuesta.data.id_factura}`)

                        const blob = new Blob([response.data], { type: 'application/pdf' });
                        const url = URL.createObjectURL(blob);
                        window.open(url);

                        Swal.fire({
                            customClass: {
                                container: 'my-swal'
                            },
                            title: 'Información',
                            text: "Factura generada con éxito",
                            icon: 'success'
                        }).then(() => {
                            navigate(`/home`);
                            window.location.reload();
                        })
                    }
                })

                setShowModalComprarPlan(false);

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
                setShowModalComprarPlan(false);
            }
        }

    }

    return (
        <Dialog open={showModalComprarPlan} onClose={handleCancelar} >
            <DialogTitle>Comprar plan</DialogTitle>
            <DialogContent>


                <TextField margin="normal" type="text" name="nombre" label="Plan"
                    defaultValue={plan.plan} fullWidth variant="outlined" />

                <TextField name="metodoPago" margin="normal" select label="Método de pago" onChange={handleMetodo}
                    fullWidth variant="outlined" value={metodoPagoSeleccionado} helperText="Por favor seleccione el método de pago">
                    <MenuItem key="S" value="S">Seleccionar</MenuItem>
                    {metodos != null ? metodos.map((metodo) => (
                        <MenuItem key={metodo.id_metodopago} value={metodo.id_metodopago}>
                            {metodo.descripcion}
                        </MenuItem>
                    )) : console.log("cargando menu item metodos de pago")}

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
                    Comprar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )

}

export default SeleccionPlanModal