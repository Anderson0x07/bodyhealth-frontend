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
import Scrollbar from '../../dashboard/scrollbar/Scrollbar';
import { useNavigate } from 'react-router-dom';
import { procesarPeticionDelete } from '../../../../utils/HandleApi';
import Swal from 'sweetalert2';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarRutinaEjerciciosModal(props) {
    const navigate = useNavigate();

    const { rutinaEjercicios, showModalRutinaEjercicios, setShowModalRutinaEjercicios, eliminar, setEliminar, ejercicio, setEjercicio } = props;
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleCancelarAndOk = () => {
        setShowModalRutinaEjercicios(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                text: `¿Está seguro que desea eliminar la ejercicio?.... Esto eliminará ${rutinaEjercicios.length > 1 ? "las rutinaEjercicios que lo cotienen." : "la rutinaEjercicio que contiene."}`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, elimínalo',
                customClass: {
                    container: 'my-swal'
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await procesarPeticionDelete(`ejercicio/eliminar/${ejercicio.id_ejercicio}`);
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success'
                    }).then(() => {
                        navigate(`/admin/dashboard/ejercicios`);
                    })
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productos.length) : 0;
    const emptyRowsrutinaEjercicios = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rutinaEjercicios.length) : 0;



    return (
        <Dialog open={showModalRutinaEjercicios} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del Proveedor</DialogTitle>
            <DialogContent>
                <Grid item xs={6} sm={3} md={5} ml={1}>

                    <Typography variant="subtitle2" align="center" >
                        Rutinas Ejercicio
                    </Typography>

                    <Scrollbar>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow hover >

                                        <TableCell align="center"># RutinaEjercicio</TableCell>

                                        <TableCell align="center">Nombre rutina</TableCell>

                                        <TableCell align="center">Descripción ejercicio</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {rutinaEjercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_rutina_ejercicio, rutina, ejercicio } = row;

                                        return (
                                            <TableRow hover key={id_rutina_ejercicio} >
                                                <TableCell align="center">{id_rutina_ejercicio}</TableCell>

                                                <TableCell align="center">{rutina.nombre_rutina}</TableCell>

                                                <TableCell align="center">{ejercicio.descripcion}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRowsrutinaEjercicios > 0 && (
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
                        count={rutinaEjercicios.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancelarAndOk}>Cancelar</Button>
                {eliminar==true
                ?
                <LoadingButton
                    color="secondary"
                    onClick={handleDelete}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<CheckCircleRounded />}
                    variant="contained"
                >
                    Eliminar
                </LoadingButton>
            :
            <LoadingButton
                    color="secondary"
                    onClick={handleCancelarAndOk}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<CheckCircleRounded />}
                    variant="contained"
                >
                    ¡Vale!
                </LoadingButton>}
                
            </DialogActions>
        </Dialog>
    )
}

export default MostrarRutinaEjerciciosModal;