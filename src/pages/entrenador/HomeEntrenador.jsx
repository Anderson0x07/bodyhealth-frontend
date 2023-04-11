import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from '../../components/admin/dashboard/AppWidgetSummary';

// ----------------------------------------------------------------------

function HomeEntrenador() {

  return (
    <>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hola, de nuevo !
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Ventas Mensuales" total={714000} icon={'ant-design:android-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Nuevos Clientes" total={1352831} color="info" icon={'ant-design:apple-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Cantidad de Maquinas" total={1723315} color="warning" icon={'ant-design:windows-filled'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Proveedores" total={234} color="error" icon={'ant-design:bug-filled'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default HomeEntrenador;