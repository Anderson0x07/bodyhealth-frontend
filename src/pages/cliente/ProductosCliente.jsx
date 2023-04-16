import React from 'react'
import { Box, Container, Typography } from '@mui/material'

import Navbar from '../Navbar';
import Productos from '../../components/cliente/productos/Productos';


function ProductosCliente({ cliente }) {

  return (
    <>
      <Container sx={{mb: 5}}>
        <Navbar cliente={cliente} />
        <Productos />
      </Container>

      <Box  >
        <Container>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 7
            }}
          >
            <div
              style={{
                width: "5%",
                height: "5px",
                backgroundColor: "#000339",
                margin: "0 auto",
              }}
            ></div>
            <Box width={"60%"} mt={3}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: "16px",
                  fontWeight: "500",
                  color: "#5A6473",
                  textAlign: "center",
                }}
              >
                Somos una página que surge con el propósito de brindar no
                solo un mejor estado de salud y bienestar corporal, sino de
                motivación, excelencia y mejora continua. Somos un gimnasio
                que llegó a revolucionar la experiencia de entrenar en la ciudad de Cúcuta.
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default ProductosCliente