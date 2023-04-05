import React, { useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
} from '@mui/material';
import { CheckCircleRounded, Receipt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../dashboard/scrollbar/Scrollbar';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarventasProductosModal(props) {

    const { pedidos, showModalVentasProducto, setShowModalVentasProducto } = props;
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleCancelarAndOk = () => {
        setShowModalVentasProducto(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - pedidos.length) : 0;


    return (
        <Dialog open={showModalVentasProducto} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Venta del producto</DialogTitle>
            <DialogContent>

                <Container>

                    <Scrollbar>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow hover >

                                        <TableCell align="center"># Pedido</TableCell>

                                        <TableCell align="center">Cliente</TableCell>

                                        <TableCell align="center">Fecha de compra</TableCell>

                                        <TableCell align="center">Cantidad</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {pedidos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_pedido, compra, cantidad } = row;

                                        return (
                                            <TableRow hover key={id_pedido} >

                                                <TableCell align="center">{id_pedido}</TableCell>

                                                <TableCell align="center">{compra.cliente.nombre + " " + compra.cliente.apellido}</TableCell>

                                                <TableCell align="center">{compra.fecha_compra}</TableCell>

                                                <TableCell align="center">{cantidad}</TableCell>
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
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={pedidos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Container>



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

export default MostrarventasProductosModal;