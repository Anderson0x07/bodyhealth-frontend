import { Container, Box, Card, Grid, Stack, Typography, styled, Button, Tooltip } from '@mui/material';

import { fCurrency } from '../../../utils/formatNumber';
import Label from '../dashboard/label/Label';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../../utils/HandleApi';
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import AgregarProductoModal from "./AgregarProductoModal";
import FiltroProductos from './FiltroProductos';


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
  const [showModal, setShowModal] = useState();

  const [filtro, setFiltro] = useState("all");


  const navigate = useNavigate();

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    setFiltro("all")
    try {
      const response = await procesarPeticionGet("producto/all");
      setProductos(response.data.productos);
    } catch (error) {
      console.log(error)
    }
  };

  const handleExpandProducto = (id_producto) => {
    navigate(`/admin/dashboard/productos/${id_producto}`);
  };
  const agregarProducto = (productos) => {
    setProductos(productos);
  }

  return (
    <>
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Productos
        </Typography>


        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={12} sx={{ mb: 5 }}>

          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
            Nuevo
          </Button>


          <FiltroProductos getAll={getAll} setProductos={setProductos} filtro={filtro} setFiltro={setFiltro} admin={true}/>

          {
            showModal && (
              <AgregarProductoModal
                showModal={showModal}
                setShowModal={setShowModal}
                agregarProducto={agregarProducto}
              />
            )
          }


        </Stack>


        <Grid container spacing={3}>
          {productos != null &&
            productos.map((producto) => (
              <Grid key={producto.id_producto} item xs={12} sm={6} md={3}>
                <Card>
                  <Box sx={{ pt: '100%', position: 'relative' }}>
                    <Label
                      variant="filled"
                      color={(producto.estado === false && 'error') || 'info'}
                      sx={{
                        zIndex: 9,
                        top: 16,
                        right: 16,
                        position: 'absolute',
                        textTransform: 'uppercase',
                      }}
                    >
                      {producto.estado === true ? "Disponible" : "No disponible"}
                    </Label>
                    <ImagenProductoEstilo alt={producto.nombre} src={url + producto.foto} onClick={() => handleExpandProducto(producto.id_producto)} />
                  </Box>

                  <Stack spacing={2} sx={{ p: 3 }}>
                    <Typography variant="subtitle2" noWrap>
                      {producto.nombre}
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
                        {fCurrency(producto.precio)}
                      </Typography>
                    </Stack>
                  </Stack>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </>
  );
}

export default ProductoList;