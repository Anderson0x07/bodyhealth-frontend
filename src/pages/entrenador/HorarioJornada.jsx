import { TableCell, TableRow, Typography } from '@mui/material';
import React from 'react'
import { CheckCircle } from '@mui/icons-material';

function HorarioJornada({horario}) {
  return (
    horario.map((row) =>{
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
    })
  )
}

export default HorarioJornada