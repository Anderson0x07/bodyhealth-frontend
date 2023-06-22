import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, Container, Divider, Grid, InputAdornment, Table, TableBody, TableCell, TableContainer, TableRow, TextField } from '@mui/material'
import { procesarPeticionGet } from '../../../utils/HandleApi';
import { Edit } from '@mui/icons-material';
import EditarInfoModal from './EditarInfoModal';
import { acortar } from '../../../utils/acortarCadena';


const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Config() {

    const [data, setData] = useState(null);
    const [showModalEditarInfo, setShowModalEditarInfo] = useState(false);


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

    const handleActualizarData = (infoActualizada) => {
        setData(infoActualizada)
    }

    return (
        <>
            {data != null &&
                <>

                    {data.logo_empresa != null &&
                        <Container maxWidth="md" sx={{ mb: 5 }}>
                            <Grid container justifyContent="center">
                                <Grid item xs={12} sm={6} md={6}>
                                    <Avatar
                                        src={url + data.logo_empresa}
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: 1,
                                            margin: '0 auto',
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Container>
                    }

                    <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={8} md={12} pb={5}>


                            <Card>
                                <CardHeader title="Información" />
                                <CardContent sx={{ pt: 2 }}>
                                    <Box sx={{ m: 0 }}>
                                        <Grid container spacing={2}>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Nombre empresa"
                                                    fullWidth variant="outlined" value={data.nombre_empresa != null ? data.nombre_empresa : ""} InputProps={{ readOnly: true }} />

                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Dirección" fullWidth
                                                    value={data.direccion != null ? data.direccion : ""} variant="outlined" InputProps={{ readOnly: true }} />
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
                                                <TextField margin="normal" type="text" label="RUT"
                                                    value={data.rut != null ? data.rut : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>


                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Email"
                                                    value={data.email != null ? data.email : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Eslogan"
                                                    value={data.eslogan != null ? data.eslogan : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Cuenta de facebook"
                                                    value={data.url_facebook != null ? data.url_facebook : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Cuenta de instagram"
                                                    value={data.url_instagram != null ? data.url_instagram : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Cuenta de tiktok"
                                                    value={data.url_tiktok != null ? data.url_tiktok : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Cuenta de twitter"
                                                    value={data.url_twitter != null ? data.url_twitter : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Whatsapp de empresa"
                                                    value={data.url_whatsapp != null ? data.url_whatsapp : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                            <Grid item xs={12} md={6}>
                                                <TextField margin="normal" type="text" label="Canal de Youtube"
                                                    value={data.url_youtube != null ? data.url_youtube : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>
                                            <Grid item xs={12} md={12}>


                                                <TextField margin="normal" label="Pie de página" multiline rows={4}
                                                    value={data.pie_pagina != null ? data.pie_pagina : ""} fullWidth variant="outlined" InputProps={{ readOnly: true }} />
                                            </Grid>

                                        </Grid>
                                    </Box>
                                </CardContent>
                                <Divider />
                                <CardActions sx={{ justifyContent: 'flex-end', mb: 1, mr: 2 }} >
                                    <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalEditarInfo(true)}>Editar Información</Button>
                                </CardActions>

                            </Card>
                        </Grid>
                    </Grid>

                    {/* MODAL PARA EDITAR LA INFO */}
                    {showModalEditarInfo && (
                        <EditarInfoModal
                            info={data}
                            showModalEditarInfo={showModalEditarInfo}
                            setShowModalEditarInfo={setShowModalEditarInfo}
                            onUpdate={handleActualizarData}
                        />
                    )}
                </>
            }

        </>

    )
}

export default Config