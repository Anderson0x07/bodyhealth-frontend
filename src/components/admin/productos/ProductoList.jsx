import { Container, Box, Card, Grid, Stack, Typography, styled } from '@mui/material';

//import PRODUCTS from '../_mock/products'; //este es el arreglo de productos, cambiarlo a un estado como lo maneja con las tablas

import { fCurrency } from '../../../utils/formatNumber';
import Label from '../dashboard/label/Label';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../../utils/HandleApi';
import { useNavigate } from "react-router-dom";


const ImagenProductoEstilo = styled('img')({
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
const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function ProductoList() {
    const [productos, setProductos] = useState(null);
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("producto/all");
            console.log(response)
            setStatus(response.status);
            setProductos(response.data.productos);
        } catch (error) {
            setError(error.response.data.error);
            setStatus(error.response.status);
        }
    };


  
  const handleExpandProduct = (id_producto) => {
    navigate(`/admin/dashboard/productos/${id_producto}`);
  };

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>

            {/* ACA IRÍA UN BOTON PARA FILTRAR O EL COMPONENTE DE BUSQUEDA DE SIEMPRE */}
          </Stack>
        </Stack>

        <Grid container spacing={3}>
        {productos != null ? 
          productos.map((product) => (
            <Grid key={product.id_producto} item xs={12} sm={6} md={3}>
              <Card>
                <Box sx={{ pt: '100%', position: 'relative' }}>
                    <Label
                      variant="filled"
                      color={(product.estado === false && 'error') || 'info'}
                      sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                      }}
                    >
                      {product.estado === true ? "Disponible" : "No disponible"}
                    </Label>
                  <ImagenProductoEstilo alt={product.nombre} src={url + product.foto} onClick={() => handleExpandProduct(product.id_producto)} />
                </Box>

                <Stack spacing={2} sx={{ p: 3 }}>
                  <Typography variant="subtitle2" noWrap>
                    {product.nombre}
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
                      {fCurrency(product.precio)}
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          )): console.log("se toteó")}
        </Grid>
      </Container>
    </>
  );
}

export default ProductoList;