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

function VerControlFisicoModal(props) {

    const { controlesCliente, showModalControlesCliente, setShowModalControlesCliente } = props;


    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleCancelarAndOk = () => {
        setShowModalControlesCliente(false);
    };


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, controlesCliente.length - page * rowsPerPage);

    return (
        <Dialog open={showModalControlesCliente} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Compras realizadas</DialogTitle>
            <DialogContent>

                <Container>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center">Control #</TableCell>

                                    <TableCell align="center">Fecha de control</TableCell>

                                    <TableCell align="center">Peso</TableCell>

                                    <TableCell align="center">Estatura</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {controlesCliente.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { id_controlcliente, fecha, peso, estatura } = row;

                                    return (
                                        <TableRow hover key={id_controlcliente} >

                                            <TableCell align="center">{id_controlcliente}</TableCell>

                                            <TableCell align="center">{fecha}</TableCell>

                                            <TableCell align="center">{peso}</TableCell>

                                            <TableCell align="center">{estatura}</TableCell>


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
                        count={controlesCliente.length}
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
                    startIcon={<CheckCircleRounded />}
                    variant="contained"
                >
                    ¡Vale!
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default VerControlFisicoModal;