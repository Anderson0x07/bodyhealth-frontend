import React, { useEffect, useState } from 'react'
import { Box, Container, Typography } from '@mui/material'

import Navbar from '../Navbar';
import Productos from '../../components/cliente/productos/Productos';
import Planes from '../../components/cliente/planes/Planes';
import { procesarPeticionGet } from '../../utils/HandleApi';
import Footer from '../Footer';
import Chat from '../../components/cliente/Chat';
import '../../components/cliente/bot/chatbot.css'

function PlanesCliente({ cliente }) {

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
        <Planes cliente={cliente} />
      </Container>

      <Box  >
        <Container>
          <Footer data={data} />
        </Container>
      </Box>

      <div className="estilo-card">
        <Chat />
      </div>
    </>
  )
}

export default PlanesCliente