import { Container, Box, Card, Grid, Stack, Typography, styled, Alert, AlertTitle } from '@mui/material';

import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../admin/dashboard/label/Label';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../../utils/HandleApi';
import SeleccionPlanModal from './SeleccionPlanModal';
import { obtenerDiferenciaDias } from '../../../utils/obtenerDiasRestantesPlan';


const ImagenPlanEstilo = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    ':hover': {
        transform: 'scale(1.1)',
    },
});

// ----------------------------------------------------------------------

function Planes({ cliente }) {
    const [planes, setPlanes] = useState(null);
    const [showModalComprarPlan, setShowModalComprarPlan] = useState(false);

    const [plan, setPlan] = useState(null);



    useEffect(() => {
        getPlanes();
    }, []);

    const getPlanes = async () => {
        try {
            const response = await procesarPeticionGet("plan/all");
            setPlanes(response.data.planes);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            {cliente.clienteDetalles.length > 0 && obtenerDiferenciaDias(cliente.clienteDetalles[0].fecha_fin) > 0
                ?

                <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>

                        <Grid item xs={6} sm={4} md={6} pb={5}>
                            <Alert variant="standard" severity="success">
                                <AlertTitle>Cuentas con el {cliente.clienteDetalles[0].plan.plan}</AlertTitle>
                            </Alert>

                        </Grid>

                        <Grid item xs={6} sm={4} md={6} pb={5}>
                            <Alert variant="standard" severity="success">
                                <AlertTitle>Tiempo restante {obtenerDiferenciaDias(cliente.clienteDetalles[0].fecha_fin)} dias</AlertTitle>
                            </Alert>

                        </Grid>

                        <Grid item xs={6} sm={4} md={6} pb={5}>
                            <Alert variant="standard" severity="success">
                                <AlertTitle>Fecha de inicio {cliente.clienteDetalles[0].fecha_inicio}</AlertTitle>
                            </Alert>

                        </Grid>

                        <Grid item xs={6} sm={4} md={6} pb={5}>
                            <Alert variant="standard" severity="success">
                                <AlertTitle>Fecha de finalización {cliente.clienteDetalles[0].fecha_fin}</AlertTitle>
                            </Alert>

                        </Grid>
                </Grid>




                : <Container>
                    <Typography variant="h4" sx={{ mb: 5 }}>
                        Planes
                    </Typography>

                    <Grid container spacing={3}>
                        {planes != null ?
                            planes.map((plan) => (
                                <Grid key={plan.id_plan} item xs={12} sm={6} md={3}>
                                    <Card onClick={() => { setPlan(plan); setShowModalComprarPlan(true) }}>
                                        <Box sx={{ pt: '100%', position: 'relative' }}>
                                            <Label
                                                variant="filled"
                                                color={(plan.meses > 1 && 'error') || 'info'}
                                                sx={{
                                                    zIndex: 9,
                                                    top: 16,
                                                    right: 16,
                                                    position: 'absolute',
                                                    textTransform: 'uppercase',
                                                }}
                                            >
                                                {plan.meses > 1 ? plan.meses + " meses" : plan.meses + " mes"}
                                            </Label>
                                            <ImagenPlanEstilo alt={plan.id_plan} src={"https://www.cambiatufisico.com/wp-content/uploads/plantilla-entrenamiento1.jpg"} />
                                        </Box>

                                        <Stack spacing={2} sx={{ p: 3 }}>
                                            <Typography variant="subtitle2" noWrap>
                                                {plan.plan}
                                            </Typography>

                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Typography variant="subtitle1">
                                                    <Typography
                                                        component="span"
                                                        variant="body1"
                                                        sx={{
                                                            color: 'text.disabled',
                                                            textDecoration: 'line-through',
                                                        }}
                                                    >
                                                    </Typography>
                                                    &nbsp;
                                                    {fCurrency(plan.precio)}
                                                </Typography>
                                            </Stack>
                                        </Stack>



                                    </Card>
                                </Grid>
                            )) : console.log("se toteó")}
                    </Grid>

                    {showModalComprarPlan && (
                        <SeleccionPlanModal
                            plan={plan}
                            cliente={cliente}
                            showModalComprarPlan={showModalComprarPlan}
                            setShowModalComprarPlan={setShowModalComprarPlan}

                        />
                    )}

                </Container>
            }

        </>
    );
}

export default Planes;