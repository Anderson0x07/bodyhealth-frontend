import React, { useState } from 'react'
import { Avatar, Button, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { Edit } from '@mui/icons-material';
import EditarPerfilAdminModal from './EditarPerfilModal';
import CambiarPasswordModal from './CambiarPasswordModal';
import Swal from 'sweetalert2';
import { procesarPeticionPost } from '../../../utils/HandleApi';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function MiPerfil({ admin }) {

    const [data, setData] = useState(admin);

    const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);
    const [showModalCambioPassword, setShowModalCambioPassword] = useState(false);

    const handleActualizarPerfil = (infoActualizada) => {
        setData(infoActualizada)
    }

    const handleTokenPassword = async () => {

        try {
            const respuesta = await procesarPeticionPost(`admin/restablecer-password/${admin.id_usuario}`);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

        } catch (error) {
            console.log(error)

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error'
            })
        }
    }

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalEditarPerfil(true)}>Editar Información</Button>
                <Button variant="contained" startIcon={<Edit />} onClick={handleTokenPassword}>Solicitar cambio de contraseña</Button>
                <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalCambioPassword(true)}>Cambiar Contraseña</Button>
            </Stack>

            <div style={{ marginTop: '20px', marginBottom: '20px' }}>

                <Avatar src={url + data.foto} style={{ margin: '0 auto', width: '300px', height: '300px' }} />
            </div>

            <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                <Grid item xs={6} sm={8} md={12} pb={5}>
                    <TableContainer sx={{ minWidth: 100 }}>
                        <Table style={{ border: "1px solid black" }}>
                            <TableBody>
                                <TableRow>
                                    <TableCell className='clave' >Tipo de documento</TableCell>
                                    <TableCell className='value' align="right">{data.tipo_documento}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave' >N° Documento</TableCell>
                                    <TableCell className='value' align="right">{data.documento}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Nombre</TableCell>
                                    <TableCell className='value' align="right">{data.nombre}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Apellido</TableCell>
                                    <TableCell className='value' align="right">{data.apellido}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Teléfono</TableCell>
                                    <TableCell className='value' align="right">{data.telefono}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Fecha de nacimiento</TableCell>
                                    <TableCell className='value' align="right">{data.fecha_nacimiento}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className='clave'>Email</TableCell>
                                    <TableCell className='value' align="right">{data.email}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>

            {/* MODAL PARA EDITAR LA INFO */}
            {showModalEditarPerfil && (
                <EditarPerfilAdminModal
                    admin={data}
                    showModalEditarPerfil={showModalEditarPerfil}
                    setShowModalEditarPerfil={setShowModalEditarPerfil}
                    onUpdate={handleActualizarPerfil}
                />
            )}

            {/* MODAL PARA CAMBIAR CONTRASEÑA */}
            {showModalCambioPassword && (
                <CambiarPasswordModal
                    admin={data}
                    showModalCambioPassword={showModalCambioPassword}
                    setShowModalCambioPassword={setShowModalCambioPassword}
                />
            )}

        </>
    )
}

export default MiPerfil