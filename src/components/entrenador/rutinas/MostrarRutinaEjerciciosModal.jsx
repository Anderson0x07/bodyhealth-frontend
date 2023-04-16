import React, { useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
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
import { CheckCircleRounded, OpenInNewRounded } from '@mui/icons-material';
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

    const handleAbrirRecurso = (url_video) => {
        window.open(url_video, '_blank');
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rutinaEjercicios.length) : 0;

    return (
        <Dialog open={showModalRutinaEjercicios} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos de la rutina</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={8} md={12} >
                    <Typography variant="subtitle2" align="center" >
                        Ejercicios de la rutina
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center"># Ejercicio</TableCell>
                                    <TableCell align="center">Musculo</TableCell>
                                    <TableCell align="center">Ejercicio</TableCell>
                                    <TableCell align="center">Series</TableCell>
                                    <TableCell align="center">Repeticiones</TableCell>
                                    <TableCell align="center">Abrir recurso</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {rutinaEjercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { ejercicio } = row;

                                    return (
                                        <TableRow hover key={ejercicio.id_ejercicio} >
                                                <TableCell align="center">{ejercicio.id_ejercicio}</TableCell>
                                                <TableCell align="center">{ejercicio.musculo.nombre}</TableCell>
                                                <TableCell align="center">{ejercicio.descripcion}</TableCell>
                                                <TableCell align="center">{ejercicio.series}</TableCell>
                                                <TableCell align="center">{ejercicio.repeticiones}</TableCell>
                                                <TableCell align="center">
                                                    <IconButton size="large" color="inherit" onClick={() => handleAbrirRecurso(ejercicio.url_video)}>
                                                        <OpenInNewRounded />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
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