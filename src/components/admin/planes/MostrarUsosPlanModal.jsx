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
import { CheckCircleRounded, Delete, Receipt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../dashboard/scrollbar/Scrollbar';
import { useNavigate } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionPdf } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarUsosPlanModal(props) {

    const { facturas, showModalFactura, setShowModalFactura } = props;
    const [loading, setLoading] = useState(false);
    const [loadingPdf, setLoadingPdf] = useState(false)

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleVerFactura = async (id_factura) => {

        setLoadingPdf(true);
        try {
            const response = await procesarPeticionPdf(`clientedetalle/pdf/${id_factura}`)
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
    const handleCancelarAndOk = () => {
        setShowModalFactura(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };



    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - facturas.length) : 0;
    return (
        <Dialog open={showModalFactura} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del plan</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={8} md={12}>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center"># Factura</TableCell>

                                    <TableCell align="center">Cliente</TableCell>

                                    <TableCell align="center">Fecha de inicio</TableCell>

                                    <TableCell align="center">Fecha de fin</TableCell>

                                    <TableCell align="center">Metodo de pago</TableCell>

                                    <TableCell align="center">Generar reporte</TableCell>


                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {facturas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { id_factura, cliente, fecha_inicio, fecha_fin, metodoPago } = row;

                                    return (
                                        <TableRow hover key={id_factura} >

                                            <TableCell align="center">{id_factura}</TableCell>

                                            <TableCell align="center">{cliente.nombre + "" + cliente.apellido}</TableCell>

                                            <TableCell align="center">{fecha_inicio}</TableCell>

                                            <TableCell align="center">{fecha_fin}</TableCell>

                                            <TableCell align="center">{metodoPago.descripcion}</TableCell>

                                            <TableCell align="center">
                                                <LoadingButton key={id_factura}
                                                    size="large"
                                                    color="inherit"
                                                    onClick={() => handleVerFactura(id_factura)}
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
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={facturas.length}
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

export default MostrarUsosPlanModal
