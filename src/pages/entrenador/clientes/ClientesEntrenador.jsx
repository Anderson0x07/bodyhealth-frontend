import { Container } from '@mui/material'
import React from 'react'
import ClienteList from '../../../components/entrenador/clientes/ClienteList';

function ClientesEntrenador({entrenador}) {
  return (
    <Container>
      <ClienteList entrenador={entrenador}/>
      
    </Container>
  )
}

export default ClientesEntrenador;