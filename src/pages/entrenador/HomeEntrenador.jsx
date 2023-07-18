import { Grid, Container, Typography } from '@mui/material';
import AppWidgetSummary from '../../components/admin/dashboard/AppWidgetSummary';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../utils/HandleApi';
import { AccessAlarm, Check, MonitorHeart, PeopleAltTwoTone, Person, RunCircle } from '@mui/icons-material';

// ----------------------------------------------------------------------

function HomeEntrenador({entrenador}) {
  const [info, setInfo] = useState([]);
  useEffect(() => {
    const getInfo = async () => {
            try {
                const response = await procesarPeticionGet(`entrenador/info/${entrenador.id_usuario}`);
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
          ¡Hola {entrenador.nombre+" "+entrenador.apellido}! <br></br> Aquí puedes ver información relacionada a ti y a la empresa.
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Clientes Asignados" total={info.clientes} icon={<PeopleAltTwoTone />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Rutinas Disponibles" total={info.rutinas} color="info" icon={<Check />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Musculos" total={info.musculos} color="info" icon={<MonitorHeart />} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Total Ejercicios" total={info.ejercicios} color="info" icon={<RunCircle />} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
          <AppWidgetSummary title="Jornada" total={info.jornada === 'Manana' ? 'Mañana' : 'Tarde'} color="warning" icon={<AccessAlarm />} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
          <AppWidgetSummary title="Tu ID en la empresa" total={info.id} color="warning" icon={<Person />} />
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