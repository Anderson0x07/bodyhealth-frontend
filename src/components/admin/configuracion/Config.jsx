import React, { useEffect, useState } from 'react'
import { Avatar, Button, Grid, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material'
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
            console.log(respuesta)
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
            {data !== null
                ?
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

                        {data.logo_empresa != null
                            ? <Avatar src={url + data.logo_empresa} style={{ margin: '0 auto', width: '500px', height: '200px', borderRadius: 1 }} />
                            : false}
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
                                            <TableCell className='value' align="right">{data.url_facebook}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Cuenta de instagram</TableCell>
                                            <TableCell className='value' align="right">{data.url_instagram}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Cuenta de tiktok</TableCell>
                                            <TableCell className='value' align="right">{data.url_tiktok}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Cuenta de twitter</TableCell>
                                            <TableCell className='value' align="right">{data.url_twitter}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Whatsapp de empresa</TableCell>
                                            <TableCell className='value' align="right">{data.url_whatsapp}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='clave'>Canal de youtube</TableCell>
                                            <TableCell className='value' align="right">{data.url_youtube}</TableCell>
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
                : false
            }

        </>

    )
}

export default Config