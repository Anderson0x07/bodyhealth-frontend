import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'

import { CheckCircle } from '@mui/icons-material'

function HorarioAdmin() {
    const horario = [
        { hora: '5:00 am' },
        { hora: '6:00 am' },
        { hora: '7:00 am' },
        { hora: '8:00 am' },
        { hora: '9:00 am' },
        { hora: '10:00 am' },
        { hora: '11:00 am' },
        { hora: '12:00 pm' },
        { hora: '1:00 pm' },
        { hora: '2:00 pm' },
        { hora: '3:00 pm' },
        { hora: '4:00 pm' },
        { hora: '5:00 pm' },
        { hora: '6:00 pm' },
        { hora: '7:00 pm' },
        { hora: '8:00 pm' }
    ];


    return (
        <div>
            <Container>
                <Typography variant="h4" gutterBottom mb={3}>
                    Horarios
                </Typography>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell className='clave' align='center'>Hora</TableCell>
                                <TableCell className='clave' align='center'>Lunes</TableCell>
                                <TableCell className='clave' align='center'>Martes</TableCell>
                                <TableCell className='clave' align='center'>Miércoles</TableCell>
                                <TableCell className='clave' align='center'>Jueves</TableCell>
                                <TableCell className='clave' align='center'>Viernes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {horario.map((row) => {
                                const { hora } = row;
                                return (
                                    <TableRow hover key={hora} >
                                        <TableCell className='value' align='center'>
                                            <Typography variant="subtitle2" noWrap>
                                                {hora}
                                            </Typography>
                                        </TableCell>
                                        <TableCell className='value' align='center'>
                                            {hora != '12:00 pm' && hora != '1:00 pm'
                                                ?
                                                <Typography variant="subtitle2" style={{ color: 'green' }} noWrap>
                                                    <CheckCircle />
                                                </Typography>
                                                :
                                                <Typography variant="subtitle2" style={{ color: 'red' }} noWrap>
                                                    DESCANSO
                                                </Typography>
                                            }
                                        </TableCell>
                                        <TableCell className='value' align='center'>
                                            {hora != '12:00 pm' && hora != '1:00 pm'
                                                ?
                                                <Typography variant="subtitle2" style={{ color: 'green' }} noWrap>
                                                    <CheckCircle />
                                                </Typography>
                                                :
                                                <Typography variant="subtitle2" style={{ color: 'red' }} noWrap>
                                                    DESCANSO
                                                </Typography>
                                            }

                                        </TableCell>
                                        <TableCell className='value' align='center'>
                                            {hora != '12:00 pm' && hora != '1:00 pm'
                                                ?
                                                <Typography variant="subtitle2" style={{ color: 'green' }} noWrap>
                                                    <CheckCircle />
                                                </Typography>
                                                :
                                                <Typography variant="subtitle2" style={{ color: 'red' }} noWrap>
                                                    DESCANSO
                                                </Typography>
                                            }
                                        </TableCell>
                                        <TableCell className='value' align='center'>
                                            {hora != '12:00 pm' && hora != '1:00 pm'
                                                ?
                                                <Typography variant="subtitle2" style={{ color: 'green' }} noWrap>
                                                    <CheckCircle />
                                                </Typography>
                                                :
                                                <Typography variant="subtitle2" style={{ color: 'red' }} noWrap>
                                                    DESCANSO
                                                </Typography>
                                            }
                                        </TableCell>
                                        <TableCell className='value' align='center'>
                                            {hora != '12:00 pm' && hora != '1:00 pm'
                                                ?
                                                <Typography variant="subtitle2" style={{ color: 'green' }} noWrap>
                                                    <CheckCircle />
                                                </Typography>
                                                :
                                                <Typography variant="subtitle2" style={{ color: 'red' }} noWrap>
                                                    DESCANSO
                                                </Typography>
                                            }
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>

    );
}

export default HorarioAdmin