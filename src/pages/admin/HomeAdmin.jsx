import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from '../../components/admin/dashboard/AppWidgetSummary';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../utils/HandleApi';

// ----------------------------------------------------------------------

function HomeAdmin({admin}) {

  const [info, setInfo] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
            try {
                const response = await procesarPeticionGet(`admin/info/${admin.id_usuario}`);
                setInfo(response.data.informacion);
                console.log(response)
                
            } catch (error) {
                console.log("se toteó")
            }
    }

    getInfo();
}, [])

  return (
    <>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, {admin.nombre}! <br></br> Aquí puedes ver información relevante sobre la empresa.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Máquinas" total={info.maquinas} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Rutinas" total={info.rutinas} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Musculos" total={info.musculos} color="info" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Ejercicios" total={info.ejercicios} color="info" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
          <AppWidgetSummary title="Total Clientes" total={info.clientes} color="warning" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
          <AppWidgetSummary title="Total Entrenadores" total={info.entrenadores} color="warning" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
          <AppWidgetSummary title="Total Productos" total={info.productos} color="info" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
          <AppWidgetSummary title="Total Compras" total={info.compras} color="warning" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
          <AppWidgetSummary title="Total Proveedores" total={info.proveedores} color="info" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
          <AppWidgetSummary title="Total Pedidos" total={info.pedidos} color="warning" icon={'ant-design:bug-filled'} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomeAdmin;