import React, { useState } from 'react';
import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
import { procesarPeticionPdf } from '../../../utils/HandleApi';
import FacturaItem from '../configuracion/FacturaItem';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function VerPlanesCompradosModal(props) {

    const { clienteDetalles, showModalPlanesCliente, setShowModalPlanesCliente } = props;

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleCancelarAndOk = () => {
        setShowModalPlanesCliente(false);
    };

    const handleVerFactura = async (id_factura) => {

        try {
            const response = await procesarPeticionPdf(`clientedetalle/pdf/${id_factura}`)

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url);


        } catch (error) {
            console.log(error);
        }
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, clienteDetalles.length - page * rowsPerPage);


    return (
        <Dialog open={showModalPlanesCliente} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Planes Adquiridos</DialogTitle>
            <DialogContent>

                <Container>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center"># Factura</TableCell>

                                    <TableCell align="center">Plan</TableCell>

                                    <TableCell align="center">Fecha de inicio</TableCell>

                                    <TableCell align="center">Fecha de fin</TableCell>

                                    <TableCell align="center">Método de pago</TableCell>

                                    <TableCell align="center">Generar reporte</TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {clienteDetalles.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { id_factura, plan, fecha_inicio, fecha_fin, metodoPago } = row;

                                    return (
                                        <TableRow hover key={id_factura} >

                                            <TableCell align="center">{id_factura}</TableCell>

                                            <TableCell align="center">{plan.plan}</TableCell>

                                            <TableCell align="center">{fecha_inicio}</TableCell>

                                            <TableCell align="center">{fecha_fin}</TableCell>

                                            <TableCell align="center">{metodoPago.descripcion}</TableCell>

                                            <TableCell align="center">
                                                <FacturaItem
                                                    key={id_factura}
                                                    id_factura={id_factura}
                                                    handleVerFactura={handleVerFactura}
                                                />
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
                        count={clienteDetalles.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Container>

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

export default VerPlanesCompradosModal;