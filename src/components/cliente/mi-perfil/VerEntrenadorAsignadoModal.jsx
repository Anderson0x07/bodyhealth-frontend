import React, { useState } from 'react';
import {
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Slide,
    Stack,
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

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function VerEntrenadorAsignadoModal(props) {

    const { clienteEntrenador, showModalVerEntrenador, setShowModalVerEntrenador } = props;

    



    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalVerEntrenador(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clienteEntrenador.length) : 0;

    return (
        <Dialog open={showModalVerEntrenador} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Entrenador Asignado</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={8} md={12} >
                    <Typography variant="subtitle2" align="center" >
                        Información de entrenador
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

                                    <TableCell align="center">Nombres</TableCell>
                                    <TableCell align="center">Documento</TableCell>
                                    <TableCell align="center">Telefono</TableCell>
                                    <TableCell align="center">Email</TableCell>

                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {clienteEntrenador.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { entrenador } = row;

                                    return (
                                        <TableRow hover key={entrenador.id_usuario} >

                                            <TableCell align="center">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar alt={entrenador.nombre} src={url + entrenador.foto} />
                                                    <Typography variant="subtitle2" noWrap>
                                                        {entrenador.nombre + " " + entrenador.apellido}
                                                    </Typography>
                                                </Stack>

                                            </TableCell>

                                            <TableCell align="center">{entrenador.tipo_documento + " - " + entrenador.documento}</TableCell>

                                            <TableCell align="center">{entrenador.telefono}</TableCell>

                                            <TableCell align="center">{entrenador.email}</TableCell>
                                            
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={clienteEntrenador.length}
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

export default VerEntrenadorAsignadoModal;