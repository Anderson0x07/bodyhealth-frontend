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
import Swal from 'sweetalert2';
import { procesarPeticionDelete } from '../../../utils/HandleApi';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarUsosRutinaModal(props) {
    const navigate = useNavigate();

    const { rutina, rutinaEjercicios, clienteRutinas, showModalUsosRutina, setShowModalUsosRutina } = props;
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                icon: 'warning',
                showCancelButton: true,
                text: "¿Está seguro que desea eliminar la rutina?  ,\n Se eliminará la rutina junto con todos las rutinaEjercicios y clienteRutinas que tenga enlazado.",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, elimínalo',
                customClass: {
                    container: 'my-swal'
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await procesarPeticionDelete(`rutina/eliminar/${rutina.id_rutina}`);
                    Swal.fire({
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success',
                        customClass: {
                            container: 'my-swal'
                        }
                    }

                    ).then(() => {
                        navigate(`/admin/dashboard/rutinas`);
                    })
                }
            })

        } catch (error) {
            console.log(error.response.data.error);
            Swal.fire('Atención', error.response.data.error, 'error');
        }
    };

    const handleCancelarAndOk = () => {
        setShowModalUsosRutina(false);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rutinaEjercicios.length) : 0;
    const emptyRowsclienteRutinas = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clienteRutinas.length) : 0;



    return (
        <Dialog open={showModalUsosRutina} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos de la rutina</DialogTitle>
            <DialogContent>
                {rutinaEjercicios.length > 0 && clienteRutinas.length > 0
                    ?
                    <Grid container columns={{ xs: 6, sm: 9, md: 13 }} m={1}>
                        <Grid item xs={6} sm={4} md={6} mr={1}>
                            <Typography variant="subtitle2" align="center" >
                                rutinaEjercicios que tiene la rutina
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow hover >

                                            <TableCell align="center"># Rutina Ejercicio</TableCell>

                                            <TableCell align="center">Ejercicio</TableCell>

                                            <TableCell align="center">Musculo</TableCell>

                                            <TableCell align="center">Rutina</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {rutinaEjercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            const { id_rutina_ejercicio, rutina, ejercicio } = row;

                                            return (
                                                <TableRow hover key={id_rutina_ejercicio} >

                                                    <TableCell align="center">{id_rutina_ejercicio}</TableCell>

                                                    <TableCell align="center">{ejercicio.descripcion}</TableCell>

                                                    <TableCell align="center">{ejercicio.musculo.nombre}</TableCell>

                                                    <TableCell align="center">{rutina.nombre_rutina}</TableCell>
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
                                count={rutinaEjercicios.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                        <Grid item xs={6} sm={4} md={6} ml={1}>

                            <Typography variant="subtitle2" align="center" >
                                ClienteRutinas que tiene la rutina
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow hover >

                                            <TableCell align="center"># Cliente Rutina</TableCell>

                                            <TableCell align="center">Documento</TableCell>

                                            <TableCell align="center">Nombre</TableCell>

                                            <TableCell align="center">Rutina</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clienteRutinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            const { id_clienterutina, cliente, rutina } = row;

                                            return (
                                                <TableRow hover key={id_clienterutina} >

                                                    <TableCell align="center">{id_clienterutina}</TableCell>

                                                    <TableCell align="center">{cliente.documento}</TableCell>

                                                    <TableCell align="center">{cliente.nombre}</TableCell>

                                                    <TableCell align="center">{rutina.nombre_rutina}</TableCell>
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
                                count={clienteRutinas.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Grid>
                    </Grid>
                    :
                    rutinaEjercicios.length > 0
                        ?
                        <Grid item columns={{ xs: 6, sm: 8, md: 12 }} >

                            <Typography variant="subtitle2" align="center" >
                                rutinaEjercicios que tiene la rutina
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow hover >

                                            <TableCell align="center"># Rutina Ejercicio</TableCell>

                                            <TableCell align="center">Ejercicio</TableCell>

                                            <TableCell align="center">Musculo</TableCell>

                                            <TableCell align="center">Rutina</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {rutinaEjercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            const { id_rutina_ejercicio, rutina, ejercicio } = row;

                                            return (
                                                <TableRow hover key={id_rutina_ejercicio} >

                                                    <TableCell align="center">{id_rutina_ejercicio}</TableCell>

                                                    <TableCell align="center">{ejercicio.descripcion}</TableCell>

                                                    <TableCell align="center">{ejercicio.musculo.nombre}</TableCell>

                                                    <TableCell align="center">{rutina.nombre_rutina}</TableCell>
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
                                count={rutinaEjercicios.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </Grid>
                        :
                        <Grid item columns={{ xs: 6, sm: 8, md: 12 }} >
                            <Typography variant="subtitle2" align="center" >
                                ClienteRutinas que tiene la rutina
                            </Typography>

                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow hover >

                                            <TableCell align="center"># Cliente Rutina</TableCell>

                                            <TableCell align="center">Documento</TableCell>

                                            <TableCell align="center">Nombre</TableCell>

                                            <TableCell align="center">Rutina</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clienteRutinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            const { id_clienterutina, cliente, rutina } = row;

                                            return (
                                                <TableRow hover key={id_clienterutina} >

                                                    <TableCell align="center">{id_clienterutina}</TableCell>

                                                    <TableCell align="center">{cliente.documento}</TableCell>

                                                    <TableCell align="center">{cliente.nombre}</TableCell>

                                                    <TableCell align="center">{rutina.nombre_rutina}</TableCell>
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
                                count={clienteRutinas.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />

                        </Grid>

                }
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancelarAndOk}>Cancelar</Button>
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
            </DialogActions>
        </Dialog>
    )
}

export default MostrarUsosRutinaModal;