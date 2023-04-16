import { Container } from '@mui/material'
import React from 'react'
import MiPerfil from '../../components/admin/mi-perfil/MiPerfil';

function ProfilePage({admin}) {
    return (
        <Container>
            <MiPerfil admin={admin}/>
        </Container>
    )
}

export default ProfilePage;