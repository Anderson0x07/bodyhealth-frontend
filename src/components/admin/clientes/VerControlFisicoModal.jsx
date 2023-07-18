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
import { CheckCircleRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

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
            <DialogTitle>Controles Físicos</DialogTitle>
            <DialogContent>

                <Container sx={{mt:3}}>
                    <ResponsiveContainer width="100%" aspect={2}>
                        <AreaChart
                            width={800}
                            height={700}
                            data={controlesCliente}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="fecha" />
                            <YAxis />
                            <Tooltip />
                            <Legend/>
                            <Area type="monotone" dataKey="peso" stackId="1" stroke='#8884d8' fill="#8884d8" />
                        </AreaChart>
                    </ResponsiveContainer>
                </Container>

                <Container sx={{mt:5}}>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow hover >

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