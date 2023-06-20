import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'

import Navbar from '../Navbar';
import Productos from '../../components/cliente/productos/Productos';
import Planes from '../../components/cliente/planes/Planes';
import { procesarPeticionGet } from '../../utils/HandleApi';
import Footer from '../Footer';


function PlanesCliente({ cliente }) {

  const [data, setData] = useState(null);

  //USEEFFECT INFO BASICA
  const getInfo = async () => {
    try {
      const respuesta = await procesarPeticionGet(`infobasica/${1}`);
      console.log(respuesta)
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
        <Planes cliente={cliente} />
      </Container>

      <Box  >
        <Container>
          <Footer data={data}/>
        </Container>
      </Box>
    </>
  )
}

export default PlanesCliente