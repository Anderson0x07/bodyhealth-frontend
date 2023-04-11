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
import { procesarPeticionPdf } from '../../../utils/HandleApi';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function VerComprasModal(props) {

    const { clienteCompras, showModalComprasCliente, setShowModalComprasCliente } = props;

    const [loading, setLoading] = useState(false);
    const [loadingPdf, setLoadingPdf] = useState(false);


    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleCancelarAndOk = () => {
        setShowModalComprasCliente(false);
    };

    const handleVerFactura = async (id_compra) => {

        setLoadingPdf(true);
        try {
            const response = await procesarPeticionPdf(`pedido/pdf/${id_compra}`)
            console.log(response)

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url);

            setLoadingPdf(false);

        } catch (error) {
            console.log(error);
            setLoadingPdf(false);
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clienteCompras.length - page * rowsPerPage);

    return (
        <Dialog open={showModalComprasCliente} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Compras realizadas</DialogTitle>
            <DialogContent>

                <Container>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center"># Factura</TableCell>

                                    <TableCell align="center">Fecha de compra</TableCell>

                                    <TableCell align="center">Método de pago</TableCell>

                                    <TableCell align="center">Total de compra</TableCell>

                                    <TableCell align="center">Generar reporte</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {clienteCompras.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { id_compra, fecha_compra, metodoPago, total } = row;

                                    return (
                                        <TableRow hover key={id_compra} >

                                            <TableCell align="center">{id_compra}</TableCell>

                                            <TableCell align="center">{fecha_compra}</TableCell>

                                            <TableCell align="center">{metodoPago.descripcion}</TableCell>

                                            <TableCell align="center">{total}</TableCell>

                                            <TableCell align="center">
                                                <LoadingButton
                                                    size="large"
                                                    color="inherit"
                                                    onClick={() => handleVerFactura(id_compra)}
                                                    loading={loadingPdf}
                                                    variant="text"
                                                >
                                                    <Receipt />
                                                </LoadingButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={5} />
                                    </TableRow>
                                )}
                            </TableBody>


                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={clienteCompras.length}
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

export default VerComprasModal;