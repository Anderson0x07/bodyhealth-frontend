import { Alert, AlertTitle, Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Unstable_Grid2 as Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Edit, PhotoCamera, RemoveRedEye, Save } from '@mui/icons-material';
import EditarPerfilAdminModal from './EditarPerfilClienteModal';
import EditarPerfilClienteModal from './EditarPerfilClienteModal';
import { obtenerDiferenciaDias } from '../../../utils/obtenerDiasRestantesPlan';
import VerPlanesCompradosModal from '../../admin/clientes/VerPlanesCompradosModal';
import VerRutinasAsignadasModal from '../../admin/clientes/VerRutinasAsignadasModal';
import VerComprasModal from '../../admin/clientes/VerComprasModal';
import VerControlFisicoModal from '../../admin/clientes/VerControlFisicoModal';
import VerEntrenadorAsignadoModal from './VerEntrenadorAsignadoModal';
import ComentarioModal from './ComentarioModal';


function PerfilDetalles({ cliente, url }) {

    const [data, setData] = useState(cliente);

    const [showModalPlanesCliente, setShowModalPlanesCliente] = useState(false);
    const [showModalRutinasCliente, setShowModalRutinasCliente] = useState(false);
    const [showModalComprasCliente, setShowModalComprasCliente] = useState(false);
    const [showModalControlesCliente, setShowModalControlesCliente] = useState(false);
    const [showModalVerEntrenador, setShowModalVerEntrenador] = useState(false);
    const [showModalComentario, setShowModalComentario] = useState(false);


    const [clienteDetalles, setClienteDetalles] = useState(cliente.clienteDetalles);
    const [clienteRutinas, setClienteRutinas] = useState(cliente.clienteRutinas);
    const [clienteCompras, setClienteCompras] = useState(cliente.compras);
    const [controlesCliente, setControlesCliente] = useState(cliente.controlClientes);
    const [clienteEntrenador, setClienteEntrenador] = useState(cliente.clienteEntrenadores);


    const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);


    const handleActualizarPerfil = (infoActualizada) => {
        infoActualizada.fecha_nacimiento = infoActualizada.fecha_nacimiento.slice(0, 10);
        setData(infoActualizada)
    }

    const obtenerUltimoPlan = () => {
        if (clienteDetalles.length === 0) {
            return null;
        }

        return clienteDetalles.reduce((maxClienteDetalle, clienteDetalle) => {
            if (clienteDetalle.id_factura > maxClienteDetalle.id_factura) {
                return clienteDetalle;
            } else {
                return maxClienteDetalle;
            }
        });

    }


    return (
        <>
            <Grid container spacing={2}>
                {clienteDetalles.length > 0 && obtenerDiferenciaDias(obtenerUltimoPlan().fecha_fin) > 0
                    &&

                    <Grid sx={{ flexGrow: 1 }} container justifyContent="center" spacing={3}>

                        <Grid item xs={12} md={6} lg={4} >
                            <Alert severity="success" color="info">
                                <AlertTitle>Cuentas con el {obtenerUltimoPlan().plan.plan}</AlertTitle>
                            </Alert>

                        </Grid>

                        <Grid item xs={12} md={6} lg={4} >
                            <Alert severity="success" color="info">
                                <AlertTitle>Tiempo restante {obtenerDiferenciaDias(obtenerUltimoPlan().fecha_fin)} dias</AlertTitle>
                            </Alert>

                        </Grid>

                        <Grid item xs={12} md={6} lg={4} >
                            <Alert severity="success" color="info">
                                <AlertTitle>Finaliza:  {obtenerUltimoPlan().fecha_fin}</AlertTitle>
                            </Alert>

                        </Grid>
                    </Grid>
                }
                <Grid item xs={12} md={6} lg={4}>
                    <Card>

                        <CardContent>
                            <Divider />
                            <Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', my: 5 }}>

                                <Avatar sx={{ height: 150, mb: 2, width: 150 }} src={url + data.foto} />

                                <Typography gutterBottom variant="h5">
                                    {data.nombre + " " + data.apellido}
                                </Typography>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <img style={{ marginRight: 2 }} loading="lazy" width="20" src="https://flagcdn.com/w20/co.png" srcSet="https://flagcdn.com/w40/co.png 2x" />
                                    <Typography color="text.secondary" variant="body2">
                                        {" +57 " + data.telefono}
                                    </Typography>
                                </div>
                                <Typography color="text.secondary" variant="body2">
                                    {data.email}
                                </Typography>
                            </Box>
                            <Divider />
                        </CardContent>

                    </Card>

                    <Grid container justifyContent="center" spacing={5} order={{ xs: 3, sm: 2 }}>
                        

                        {clienteEntrenador.length > 0
                            &&
                            <Grid item xs={12} md={6} >
                                <Button fullWidth variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalVerEntrenador(true)}>Entrenador</Button>
                            </Grid>
                        }

                        {clienteDetalles.length > 0
                            &&
                            <Grid item xs={12} md={6} >
                                <Button fullWidth variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalPlanesCliente(true)}>Planes</Button>
                            </Grid>
                        }

                        {clienteRutinas.length > 0
                            &&
                            <Grid item xs={12} md={6} >
                                <Button fullWidth variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalRutinasCliente(true)}>Rutinas</Button>
                            </Grid>
                        }

                        {clienteCompras.length > 0
                            &&
                            <Grid item xs={12} md={6} >
                                <Button fullWidth variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalComprasCliente(true)}>Compras</Button>
                            </Grid>
                        }

                        {controlesCliente.length > 0
                            &&
                            <Grid item xs={12} md={6} >
                                <Button fullWidth variant="contained" startIcon={<RemoveRedEye />} onClick={() => setShowModalControlesCliente(true)}>Control fisico</Button>
                            </Grid>
                        }
                        <Grid item xs={12} md={6} >
                            <Button fullWidth variant="contained" startIcon={<Edit />} onClick={() => setShowModalComentario(true)}>Sugerencia</Button>
                        </Grid>
                    </Grid>



                </Grid>
                <Grid item xs={12} md={6} lg={8}>
                    <Card>
                        <CardHeader subheader="La información puede ser editada" title="Perfil" />
                        <CardContent sx={{ pt: 2 }}>
                            <Box sx={{ m: 0 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="text" label="Tipo de documento"
                                            fullWidth variant="outlined" value={data.tipo_documento} InputProps={{ readOnly: true }} />

                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="number" label="Documento" fullWidth
                                            value={data.documento} variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="text" label="Nombre"
                                            value={data.nombre} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="text" label="Apellido"
                                            value={data.apellido} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="text" label="Teléfono"
                                            value={"+57 " + data.telefono} fullWidth variant="outlined"
                                            InputProps={{
                                                readOnly: true,
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <img loading="lazy" width="20" src={`https://flagcdn.com/w20/co.png`} srcSet={`https://flagcdn.com/w40/co.png 2x`} />
                                                    </InputAdornment>
                                                )
                                            }}
                                        />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="date" label="Fecha de nacimiento"
                                            value={data.fecha_nacimiento} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>

                                    <Grid item xs={12} md={12}>
                                        <TextField margin="normal" type="email" label="Email"
                                            value={data.email} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="text" label="Sugerencia"
                                            value={data.comentario} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="text" label="Jornada"
                                            value={data.jornada == "Manana" ? "Mañana" : "Tarde"} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>

                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider />
                        <CardActions sx={{ justifyContent: 'flex-end', mb: 1, mr: 2 }} >
                            <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalEditarPerfil(true)}>Editar Información</Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

            {/* MODAL PARA EDITAR LA INFO */}
            {showModalEditarPerfil && (
                <EditarPerfilClienteModal
                    cliente={data}
                    showModalEditarPerfil={showModalEditarPerfil}
                    setShowModalEditarPerfil={setShowModalEditarPerfil}
                    onUpdate={handleActualizarPerfil}
                />
            )}

            {/* MODAL PARA VER PLANES ADQUIRIDOS */}
            {showModalPlanesCliente && (
                <VerPlanesCompradosModal
                    clienteDetalles={clienteDetalles}
                    showModalPlanesCliente={showModalPlanesCliente}
                    setShowModalPlanesCliente={setShowModalPlanesCliente}
                />
            )}
            {/* MODAL PARA VER RUTINAS ASIGNADAS */}
            {showModalRutinasCliente && (
                <VerRutinasAsignadasModal
                    clienteRutinas={clienteRutinas}
                    showModalRutinasCliente={showModalRutinasCliente}
                    setShowModalRutinasCliente={setShowModalRutinasCliente}
                />
            )}

            {/* MODAL PARA VER COMPRAS DEL CLIENTE */}
            {showModalComprasCliente && (
                <VerComprasModal
                    clienteCompras={clienteCompras}
                    showModalComprasCliente={showModalComprasCliente}
                    setShowModalComprasCliente={setShowModalComprasCliente}
                />
            )}

            {/* MODAL PARA VER CONTROL FISICO DEL CLIENTE */}
            {showModalControlesCliente && (
                <VerControlFisicoModal
                    controlesCliente={controlesCliente}
                    showModalControlesCliente={showModalControlesCliente}
                    setShowModalControlesCliente={setShowModalControlesCliente}
                />
            )}

            {/* MODAL PARA VER ENTRENADOR ASIGNADO */}
            {showModalVerEntrenador && (
                <VerEntrenadorAsignadoModal
                    clienteEntrenador={clienteEntrenador}
                    showModalVerEntrenador={showModalVerEntrenador}
                    setShowModalVerEntrenador={setShowModalVerEntrenador}
                />
            )}

            {/* MODAL PARA REALIZAR UN COMENTARIO */}
            {showModalComentario && (
                <ComentarioModal
                    cliente={data}
                    showModalComentario={showModalComentario}
                    setShowModalComentario={setShowModalComentario}
                    onUpdate={handleActualizarPerfil}
                />
            )}

        </>


    )
}

export default PerfilDetalles