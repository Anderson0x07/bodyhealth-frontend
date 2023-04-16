import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';


function Page404() {
  return (
    <>
      <Container sx={{ textAlign: 'center', alignItems: 'center', display:'flex',  justifyContent: 'center', minHeight: '100vh', maxWidth: 480, flexDirection: 'column'}}>
          <Typography variant="h3" paragraph>
            ¡Página no encontrada!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Lo sentimos, no pudimos encontrar la página que estás buscando. ¿Quizás has escrito mal la URL? Asegúrese de revisar su ortografía.
          </Typography>

          <Box
            component="img"
            src="https://img.freepik.com/vector-premium/archivo-no-encontrado-ilustracion-personas-confundidas-sosteniendo-gran-lupa-buscar-resultados_258153-336.jpg"
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />
          {/*
          <Button to="/" size="large" variant="contained" component={RouterLink}>
            Ir a Inicio
          </Button>
          */}
      </Container>
    </>
  );
}

export default Page404;