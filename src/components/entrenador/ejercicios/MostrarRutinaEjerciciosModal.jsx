import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from '@mui/material';
import { CheckCircleRounded} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
// ----------------------------------------------------------------------
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarRutinaEjerciciosModal(props) {
   

    const { rutinaEjercicios, showModalRutinaEjercicios, setShowModalRutinaEjercicios } = props;
    

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalRutinaEjercicios(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

   

    const emptyRowsRutinaEjercicios = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rutinaEjercicios.length) : 0;


    return (
        <Dialog open={showModalRutinaEjercicios} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del Ejercicio</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={8} md={12}>

                    <Typography variant="subtitle2" align="center" >
                        Rutinas donde es usado el ejercicio
                    </Typography>

                   
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow hover >

                                        <TableCell align="center"># RutinaEjercicio</TableCell>

                                        <TableCell align="center">Nombre rutina</TableCell>

                                        <TableCell align="center">Descripción ejercicio</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rutinaEjercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_rutina_ejercicio, rutina, ejercicio } = row;

                                        return (
                                            <TableRow hover key={id_rutina_ejercicio} >

                                                <TableCell align="center">{id_rutina_ejercicio}</TableCell>

                                                <TableCell align="center">{rutina.nombre_rutina}</TableCell>

                                                <TableCell align="center">{ejercicio.descripcion}</TableCell>
                                                
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRowsRutinaEjercicios > 0 && (
                                        <TableRow style={{ height: 53 * emptyRowsRutinaEjercicios }}>
                                            <TableCell colSpan={3} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rutinaEjercicios.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                
                    <LoadingButton
                        color="secondary"
                        onClick={handleCancelarAndOk}
                        startIcon={<CheckCircleRounded />}
                        variant="contained"
                    >
                        ¡Vale!
                    </LoadingButton>

            </DialogActions>
        </Dialog>
    )
}

export default MostrarRutinaEjerciciosModal;