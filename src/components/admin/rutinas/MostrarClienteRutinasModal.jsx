import React, { useState } from 'react';
import {
    Button,
    Container,
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
import { CheckCircleRounded, Receipt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../dashboard/scrollbar/Scrollbar';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarClienteRutinasModal(props) {

    const { clienteRutinas, showModalClienteRutinas, setShowModalClienteRutinas } = props;
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalClienteRutinas(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clienteRutinas.length) : 0;



    return (
        <Dialog open={showModalClienteRutinas} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos de la rutina</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={8} md={12} >
                    <Typography variant="subtitle2" align="center" >
                        clienteRutinas que tiene la rutina
                    </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow hover >

                                        <TableCell align="center"># Cliente Rutina</TableCell>

                                        <TableCell align="center">Documento</TableCell>

                                        <TableCell align="center">Nombre</TableCell>

                                        <TableCell align="center">Rutina</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {clienteRutinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_clienterutina, cliente, rutina } = row;

                                        return (
                                            <TableRow hover key={id_clienterutina} >

                                                <TableCell align="center">{id_clienterutina}</TableCell>

                                                <TableCell align="center">{cliente.documento}</TableCell>

                                                <TableCell align="center">{cliente.nombre}</TableCell>

                                                <TableCell align="center">{rutina.nombre_rutina}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={4} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={clienteRutinas.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancelarAndOk}>Cancelar</Button>
                <LoadingButton
                    color="secondary"
                    onClick={handleCancelarAndOk}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<CheckCircleRounded />}
                    variant="contained"
                >
                    ¡Vale!
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default MostrarClienteRutinasModal;