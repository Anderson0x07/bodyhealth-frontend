import React, { useEffect, useState } from 'react'
import { Avatar, Button, Container, Grid, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
import { procesarPeticionGet } from '../../../utils/HandleApi';
import { Edit } from '@mui/icons-material';
import EditarInfoModal from './EditarInfoModal';


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


    const acortarURL = (url, longitudMaxima) => {

        if (url != null) {
            if (url.length <= longitudMaxima) {
                return url; // La URL no necesita acortarse
            } else {
                const urlAcortada = url.substring(0, longitudMaxima - 3) + "...";
                return urlAcortada;
            }
        }
    }

    return (
        <>
            {data !== null &&
                <>
                    <Grid container spacing={{ xs: 4, sm: 6, md: 6 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={2} md={3} >
                            <Button variant="contained" startIcon={<Edit />} onClick={() => setShowModalEditarInfo(true)}>Editar Información</Button>


                            {/* MODAL PARA EDITAR LA INFO */}
                            {showModalEditarInfo && (
                                <EditarInfoModal
                                    info={data}
                                    showModalEditarInfo={showModalEditarInfo}
                                    setShowModalEditarInfo={setShowModalEditarInfo}
                                    onUpdate={handleActualizarData}
                                />
                            )}

                        </Grid>
                    </Grid>

                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>

                        {data.logo_empresa != null &&

                            <Container maxWidth="md">
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
                    </div>

                    <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>
                        <Grid item xs={6} sm={8} md={12} pb={5}>
                            <TableContainer sx={{ minWidth: 100 }}>
                                <Table style={{ border: "1px solid black" }}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className='clave' >Nombre empresa</TableCell>
                                            <TableCell className='value' align="right">{data.nombre_empresa}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Dirección</TableCell>
                                            <TableCell className='value' align="right">{data.direccion}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Telefono</TableCell>
                                            <TableCell className='value' align="right">{data.telefono}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>RUT</TableCell>
                                            <TableCell className='value' align="right">{data.rut}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Email</TableCell>
                                            <TableCell className='value' align="right">{data.email}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Eslogan</TableCell>
                                            <TableCell className='value' align="right">{data.eslogan}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Cuenta de facebook</TableCell>
                                            <TableCell className='value' align="right">{acortarURL(data.url_facebook, 25)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Cuenta de instagram</TableCell>
                                            <TableCell className='value' align="right">{acortarURL(data.url_instagram, 25)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Cuenta de tiktok</TableCell>
                                            <TableCell className='value' align="right">{acortarURL(data.url_tiktok, 25)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Cuenta de twitter</TableCell>
                                            <TableCell className='value' align="right">{acortarURL(data.url_twitter, 25)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Whatsapp de empresa</TableCell>
                                            <TableCell className='value' align="right">{acortarURL(data.url_whatsapp, 25)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Canal de youtube</TableCell>
                                            <TableCell className='value' align="right">{acortarURL(data.url_youtube, 25)}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Pie de página</TableCell>
                                            <TableCell className='value' align="right">{data.pie_pagina}</TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                </>
            }

        </>

    )
}

export default Config