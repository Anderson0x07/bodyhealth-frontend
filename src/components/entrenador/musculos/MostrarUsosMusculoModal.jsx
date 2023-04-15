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
import { CheckCircleRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarUsosMusculoModal(props) {
    const navigate = useNavigate();

    const { ejercicios, showModalEjercicios, setShowModalEjercicios, musculo } = props;


    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalEjercicios(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRowsMusculos = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ejercicios.length) : 0;


    return (
        <Dialog open={showModalEjercicios} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del Ejercicio</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={8} md={12}>

                    <Typography variant="subtitle2" align="center" >
                        Ejercicios donde es usado el Musculo
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center"># Ejercicio</TableCell>

                                    <TableCell align="center">Descripción</TableCell>

                                    <TableCell align="center">Nombre Musculo</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {ejercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { id_ejercicio, descripcion } = row;

                                    return (
                                        <TableRow hover key={id_ejercicio} >

                                            <TableCell align="center">{id_ejercicio}</TableCell>

                                            <TableCell align="center">{descripcion}</TableCell>

                                            <TableCell align="center">{musculo.nombre}</TableCell>

                                        </TableRow>
                                    );
                                })}
                                {emptyRowsMusculos > 0 && (
                                    <TableRow style={{ height: 53 * emptyRowsMusculos }}>
                                        <TableCell colSpan={3} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={ejercicios.length}
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

export default MostrarUsosMusculoModal;