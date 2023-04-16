import { Container, Box, Card, Grid, Stack, Typography, styled, Button } from '@mui/material';

import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../admin/dashboard/label/Label';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../../../utils/HandleApi';
import { Filter } from '@mui/icons-material';
import SeleccionProductoCantidadModal from './SeleccionProductoCantidadModal';


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

function Productos() {
    const [productos, setProductos] = useState(null);
    const [showModalFiltroProductos, setShowModalFiltroProductos] = useState(false);

    const [showModalAgregarProducto, setShowModalAgregarProducto] = useState(false);

    const [producto, setProducto] = useState(null);

    useEffect(() => {
        getProductos();
    }, []);

    const getProductos = async () => {
        try {
            const response = await procesarPeticionGet("producto/activos");
            console.log(response);
            setProductos(response.data.productos);
        } catch (error) {
            console.log(error)
        }
    };


    return (
        <>
            <Container>
                <Typography variant="h4" sx={{ mb: 5 }}>
                    Productos
                </Typography>

                

                <Grid container spacing={3}>
                    {productos != null ?
                        productos.map((producto) => (
                            <Grid key={producto.id_producto} item xs={12} sm={6} md={3}>
                                <Card onClick={() => { setProducto(producto); setShowModalAgregarProducto(true) }}>
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
                                        <ImagenProductoEstilo alt={producto.nombre} src={url + producto.foto} />
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
                        )) : console.log("se toteó")}
                </Grid>

                {showModalAgregarProducto && (
                        <SeleccionProductoCantidadModal
                            producto={producto}
                            showModalAgregarProducto={showModalAgregarProducto}
                            setShowModalAgregarProducto={setShowModalAgregarProducto}

                        />
                )}
            </Container>
        </>
    );
}

export default Productos;