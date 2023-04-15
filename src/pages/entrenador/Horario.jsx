import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { CheckCircle, Cancel, Edit } from '@mui/icons-material';

function Horario() {

    const horario = [
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
        { hora: '5:00 pm' }
    ];

    return (
        <TableContainer sx={{ minWidth: 800 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell className='clave'>Hora</TableCell>
                        <TableCell className='clave'>Lunes</TableCell>
                        <TableCell className='clave'>Martes</TableCell>
                        <TableCell className='clave'>Miércoles</TableCell>
                        <TableCell className='clave'>Jueves</TableCell>
                        <TableCell className='clave'>Viernes</TableCell>
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
                                        <CheckCircle/>
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
                                        <CheckCircle/>
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
                                        <CheckCircle/>
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
                                        <CheckCircle/>
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
                                        <CheckCircle/>
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
    );
}

export default Horario