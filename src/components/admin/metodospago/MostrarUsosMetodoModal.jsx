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
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarUsosMetodoModal(props) {

    const { compras, planes, showModalUsosMetodo, setShowModalUsosMetodo } = props;

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


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
    };

    const handleCancelarAndOk = () => {
        setShowModalUsosMetodo(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRowsCompras = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - compras.length) : 0;
    const emptyRowsPlanes = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - planes.length) : 0;

    return (
        <Dialog open={showModalUsosMetodo} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del método de pago</DialogTitle>
            <DialogContent>
                {compras.length > 0 && planes.length > 0
                    ?
                    <Grid container columns={{ xs: 7, sm: 9, md: 13 }} m={1}>
                        <Grid item xs={6} sm={4} md={6} mr={1}>
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

                        <Grid item xs={6} sm={4} md={6} ml={1}>
                            <Typography variant="subtitle2" align="center" >
                                Planes que se compraron utilizado el método de pago
                            </Typography>

                            <Scrollbar>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow hover >

                                                <TableCell align="center"># Factura</TableCell>

                                                <TableCell align="center">Cliente</TableCell>

                                                <TableCell align="center">Plan</TableCell>

                                                <TableCell align="center">Fecha de Inicio</TableCell>

                                                <TableCell align="center">Fecha de Fin</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {planes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                                const { id_factura, cliente, plan, fecha_inicio, fecha_fin } = row;

                                                return (
                                                    <TableRow hover key={id_factura} >

                                                        <TableCell align="center">{id_factura}</TableCell>

                                                        <TableCell align="center">{cliente.nombre + " " + cliente.apellido}</TableCell>

                                                        <TableCell align="center">{plan.plan}</TableCell>

                                                        <TableCell align="center">{fecha_inicio}</TableCell>

                                                        <TableCell align="center">{fecha_fin}</TableCell>

                                                    </TableRow>
                                                );
                                            })}
                                            {emptyRowsPlanes > 0 && (
                                                <TableRow style={{ height: 53 * emptyRowsPlanes }}>
                                                    <TableCell colSpan={5} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Scrollbar>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={planes.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                    :
                    console.log("Cargando ambas tablas")
                }
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

export default MostrarUsosMetodoModal;