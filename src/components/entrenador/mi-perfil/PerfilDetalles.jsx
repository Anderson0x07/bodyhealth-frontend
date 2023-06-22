import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, Unstable_Grid2 as Grid, InputAdornment, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Edit } from '@mui/icons-material';
import EditarPerfilEntrenadorModal from './EditarPerfilEntrenadorModal';


function PerfilDetalles({ entrenador, url }) {

    const [data, setData] = useState(entrenador);



    const [showModalEditarPerfil, setShowModalEditarPerfil] = useState(false);


    const handleActualizarPerfil = (infoActualizada) => {
        infoActualizada.fecha_nacimiento = infoActualizada.fecha_nacimiento.slice(0, 10);
        setData(infoActualizada)
    }



    return (
        <>
            <Grid container spacing={3}>
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
                                        <TextField margin="normal" type="text" label="Jornada"
                                            value={data.jornada === "Manana" ? "Mañana" : "Tarde"} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                    </Grid>

                                    <Grid item xs={12} md={6}>
                                        <TextField margin="normal" type="text" label="Título Académico"
                                            value={data.titulo_academico} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
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
                <EditarPerfilEntrenadorModal
                    entrenador={data}
                    showModalEditarPerfil={showModalEditarPerfil}
                    setShowModalEditarPerfil={setShowModalEditarPerfil}
                    onUpdate={handleActualizarPerfil}
                />
            )}

        </>


    )
}

export default PerfilDetalles