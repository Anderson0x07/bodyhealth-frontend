import React, { useEffect, useState } from 'react';
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
    Typography,
} from '@mui/material';
import { CheckCircleRounded, OpenInNewRounded, Receipt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Scrollbar from '../dashboard/scrollbar/Scrollbar';
import { procesarPeticionGet } from '../../../utils/HandleApi';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function VerRutinasAsignadasModal(props) {

    const { clienteRutinas, showModalRutinasCliente, setShowModalRutinasCliente } = props;

    const [rutina, setRutina] = useState(null);
    const [rutinaEjercicios, setRutinaEjercicios] = useState([]);

    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    useEffect(() => {
        const getRutina = async () => {
            try {
                const response = await procesarPeticionGet('rutina/' + clienteRutinas[clienteRutinas.length - 1].rutina.id_rutina);
                console.log(response);
                setRutina(response.data.rutina);
                setRutinaEjercicios(response.data.rutina.rutinaEjercicios)

            } catch (error) {
                console.log(error)
            }
        }

        getRutina();
    }, [])


    const handleCancelarAndOk = () => {
        setShowModalRutinasCliente(false);
    };

    const handleAbrirRecurso = (url_video) => {
        window.open(url_video, '_blank');
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rutinaEjercicios.length - page * rowsPerPage);

    return (
        <Dialog open={showModalRutinasCliente} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Rutinas Asignadas {rutina != null ? rutina.nombre_rutina : console.log("Cargando rutina")}</DialogTitle>
            <DialogContent>

                <Container>

                    <Typography variant="subtitle2" align="center" >
                        {rutina != null ? rutina.descripcion : console.log("Cargando descripcion")}
                    </Typography>

                    <Scrollbar>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow hover >

                                        <TableCell align="center"># Ejercicio</TableCell>

                                        <TableCell align="center">Musculo</TableCell>

                                        <TableCell align="center">Ejercicio</TableCell>

                                        <TableCell align="center">Series</TableCell>

                                        <TableCell align="center">Repeticiones</TableCell>

                                        <TableCell align="center">Abrir recurso</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rutinaEjercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { ejercicio } = row;

                                        return (
                                            <TableRow hover key={ejercicio.id_ejercicio} >

                                                <TableCell align="center">{ejercicio.id_ejercicio}</TableCell>

                                                <TableCell align="center">{ejercicio.musculo.descripcion}</TableCell>

                                                <TableCell align="center">{ejercicio.descripcion}</TableCell>

                                                <TableCell align="center">{ejercicio.series}</TableCell>

                                                <TableCell align="center">{ejercicio.repeticiones}</TableCell>

                                                <TableCell align="center">
                                                    <IconButton size="large" color="inherit" onClick={() => handleAbrirRecurso(ejercicio.url_video)}>
                                                        <OpenInNewRounded />
                                                    </IconButton>
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
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={clienteRutinas.length}
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

export default VerRutinasAsignadasModal;