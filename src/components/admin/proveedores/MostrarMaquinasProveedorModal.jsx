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

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarMaquinasProveedorModal(props) {

    const { maquinas, showModalMaquinasProveedor, setShowModalMaquinasProveedor } = props;

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalMaquinasProveedor(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRowsMaquinas = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - maquinas.length) : 0;

    return (
        <Dialog open={showModalMaquinasProveedor} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del Proveedor</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={8} md={12} >

                    <Typography variant="subtitle2" align="center" >
                        Máquinas que tiene el Proveedor
                    </Typography>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center">Id Máquina</TableCell>

                                    <TableCell align="center">Nombre</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {maquinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { id_maquina, nombre } = row;

                                    return (
                                        <TableRow hover key={id_maquina} >

                                            <TableCell align="center">{id_maquina}</TableCell>

                                            <TableCell align="center">{nombre}</TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRowsMaquinas > 0 && (
                                    <TableRow style={{ height: 53 * emptyRowsMaquinas }}>
                                        <TableCell colSpan={2} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={maquinas.length}
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

export default MostrarMaquinasProveedorModal;