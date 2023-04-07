import React, { useState } from 'react';
import {
    Button,
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
import { Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../dashboard/scrollbar/Scrollbar';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarComprasMetodoModal(props) {

    const { compras, showModalComprasMetodo, setShowModalComprasMetodo } = props;


    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalComprasMetodo(false);
    };

    const handleDelete = () => {
        setLoading(true);

        Swal.fire({
            title: 'Atención',
            text: 'No se puede eliminar el método de pago, está siendo utilizado en otros servicios.',
            icon: 'error',
            customClass: {
                container: 'my-swal'
            }
        });

        setLoading(false);
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRowsCompras = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - compras.length) : 0;

    return (
        <Dialog open={showModalComprasMetodo} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del método de pago</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={3} md={5} ml={1}>

                    <Typography variant="subtitle2" align="center" >
                        Compras donde se usó el método de pago
                    </Typography>

                    <Scrollbar>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow hover >

                                        <TableCell align="center"># Compra</TableCell>

                                        <TableCell align="center">Fecha de Compra</TableCell>

                                        <TableCell align="center">Cliente</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {compras.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_compra, fecha_compra, cliente } = row;

                                        return (
                                            <TableRow hover key={id_compra} >

                                                <TableCell align="center">{id_compra}</TableCell>

                                                <TableCell align="center">{fecha_compra}</TableCell>

                                                <TableCell align="center">{cliente.nombre + " " + cliente.apellido}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRowsCompras > 0 && (
                                        <TableRow style={{ height: 53 * emptyRowsCompras }}>
                                            <TableCell colSpan={3} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={compras.length}
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
                    onClick={handleDelete}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Delete />}
                    variant="contained"
                >
                    Eliminar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default MostrarComprasMetodoModal;