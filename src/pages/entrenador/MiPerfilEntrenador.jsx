import { Container } from '@mui/material'
import React from 'react'
import MiPerfil from '../../components/entrenador/mi-perfil/MiPerfil';

function MiPerfilEntrenador({entrenador}) {
    return (
        <Container>
            <MiPerfil entrenador={entrenador}/>
        </Container>
    )
}

export default MiPerfilEntrenador;