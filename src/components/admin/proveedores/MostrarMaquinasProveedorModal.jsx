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

function MostrarMaquinasProveedorModal(props) {
    const navigate = useNavigate();

    const { maquinas, showModalMaquinasProveedor, setShowModalMaquinasProveedor } = props;
    const [loading, setLoading] = useState(false);

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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productos.length) : 0;
    const emptyRowsMaquinas = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - maquinas.length) : 0;



    return (
        <Dialog open={showModalMaquinasProveedor} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del Proveedor</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={3} md={5} ml={1}>

                    <Typography variant="subtitle2" align="center" >
                        Máquinas que tiene el Proveedor
                    </Typography>

                    <Scrollbar>
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
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={2} />
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>
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

export default MostrarMaquinasProveedorModal;