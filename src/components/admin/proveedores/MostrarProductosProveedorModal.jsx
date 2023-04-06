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
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarProductosProveedorModal(props) {
    const navigate = useNavigate();

    const { productos, showModalProductosProveedor, setShowModalProductosProveedor } = props;
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalProductosProveedor(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productos.length) : 0;



    return (
        <Dialog open={showModalProductosProveedor} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del Proveedor</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={3} md={5} mr={1}>
                    <Typography variant="subtitle2" align="center" >
                        Productos que tiene el Proveedor
                    </Typography>

                    <Scrollbar>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow hover >

                                        <TableCell align="center">Id Producto</TableCell>

                                        <TableCell align="center">Nombre</TableCell>

                                        <TableCell align="center">Precio</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {productos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_producto, nombre, precio } = row;

                                        return (
                                            <TableRow hover key={id_producto} >

                                                <TableCell align="center">{id_producto}</TableCell>

                                                <TableCell align="center">{nombre}</TableCell>

                                                <TableCell align="center">{precio}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
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
                        count={productos.length}
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

export default MostrarProductosProveedorModal;