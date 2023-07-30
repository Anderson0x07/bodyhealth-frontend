import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'

import Navbar from '../Navbar';
import { CarritoCompras } from '../../components/cliente/carrito/CarritoCompras';
import { procesarPeticionGet } from '../../utils/HandleApi';
import Footer from '../Footer';

function CarritoCliente({ cliente }) {

    const [data, setData] = useState(null);

    //USEEFFECT INFO BASICA
    const getInfo = async () => {
        try {
            const respuesta = await procesarPeticionGet(`infobasica/${1}`);
            setData(respuesta.data.infobasica);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);


    return (
        <>
            <Container sx={{ mb: 5 }}>
                <Navbar cliente={cliente} />
                <CarritoCompras cliente={cliente} />
            </Container>

            <Box  >
                <Container>
                    <Footer data={data} />
                </Container>
            </Box>
        </>
    )
}

export default CarritoCliente