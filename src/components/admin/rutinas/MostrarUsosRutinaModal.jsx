import React, { useState } from 'react';
import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
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
import { Delete, OpenInNewRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { procesarPeticionDelete } from '../../../utils/HandleApi';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

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
                text: "¿Está seguro que desea eliminar la rutina?  ,\n Se eliminará la rutina junto con todos los ejercicios y de los clientes.",
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
            Swal.fire({
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                }
            });
        }
    };

    const handleCancelarAndOk = () => {
        setShowModalUsosRutina(false);
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

    const emptyRowsRutinaEjercicios = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rutinaEjercicios.length) : 0;
    const emptyRowsClienteRutinas = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clienteRutinas.length) : 0;

    return (
        <Dialog open={showModalUsosRutina} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos de la rutina</DialogTitle>
            <DialogContent>
                {rutinaEjercicios.length > 0 && clienteRutinas.length > 0
                    ?
                    <Grid container columns={{ xs: 6, sm: 9, md: 13 }} m={1}>
                        <Grid item xs={6} sm={4} md={6} mr={1}>
                            <Typography variant="subtitle2" align="center" >
                                Ejercicios de la rutina
                            </Typography>
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
                                                    <TableCell align="center">{ejercicio.musculo.nombre}</TableCell>
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
                                        {emptyRowsRutinaEjercicios > 0 && (
                                            <TableRow style={{ height: 53 * emptyRowsRutinaEjercicios }}>
                                                <TableCell colSpan={6} />
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
                                Clientes que utlizan la rutina
                            </Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow hover >

                                            <TableCell align="center">Nombres</TableCell>
                                            <TableCell align="center">Telefono</TableCell>
                                            <TableCell align="center">Email</TableCell>

                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {clienteRutinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            const { cliente } = row;

                                            return (
                                                <TableRow hover key={cliente.id_usuario} >

                                                    <TableCell align="center">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar alt={cliente.nombre} src={url + cliente.foto} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {cliente.nombre + " " + cliente.apellido}
                                                            </Typography>
                                                        </Stack>

                                                    </TableCell>

                                                    <TableCell align="center">{cliente.telefono}</TableCell>

                                                    <TableCell align="center">{cliente.email}</TableCell>

                                                </TableRow>
                                            );
                                        })}
                                        {emptyRowsClienteRutinas > 0 && (
                                            <TableRow style={{ height: 53 * emptyRowsClienteRutinas }}>
                                                <TableCell colSpan={3} />
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
                                Ejercicios de la rutina
                            </Typography>
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
                                                    <TableCell align="center">{ejercicio.musculo.nombre}</TableCell>
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
                                        {emptyRowsRutinaEjercicios > 0 && (
                                            <TableRow style={{ height: 53 * emptyRowsRutinaEjercicios }}>
                                                <TableCell colSpan={6} />
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
                                Clientes que utlizan la rutina
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
                                        {clienteRutinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                            const { cliente } = row;

                                            return (
                                                <TableRow hover key={cliente.id_usuario} >

                                                    <TableCell align="center">
                                                        <Stack direction="row" alignItems="center" spacing={2}>
                                                            <Avatar alt={cliente.nombre} src={url + cliente.foto} />
                                                            <Typography variant="subtitle2" noWrap>
                                                                {cliente.nombre + " " + cliente.apellido}
                                                            </Typography>
                                                        </Stack>

                                                    </TableCell>

                                                    <TableCell align="center">{cliente.email}</TableCell>

                                                    <TableCell align="center">{cliente.tipo_documento + " - " + cliente.documento}</TableCell>

                                                    <TableCell align="center">{cliente.telefono}</TableCell>

                                                </TableRow>
                                            );
                                        })}
                                        {emptyRowsClienteRutinas > 0 && (
                                            <TableRow style={{ height: 53 * emptyRowsClienteRutinas }}>
                                                <TableCell colSpan={3} />
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
                    startIcon={<Delete />}
                    variant="contained"
                >
                    Eliminar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default MostrarUsosRutinaModal;