import React, { useState } from 'react';
import {
    Button,
    Container,
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
import { CheckCircleRounded, Delete } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { procesarPeticionDelete } from '../../../utils/HandleApi';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function MostrarUsosProveedorModal(props) {
    const navigate = useNavigate();

    const { proveedor, productos, maquinas, showModalUsosProveedor, setShowModalUsosProveedor } = props;
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleDelete = () => {
        try {

            Swal.fire({
                title: 'Atención',
                icon: 'warning',
                showCancelButton: true,
                text: "¿Está seguro que desea eliminar el proveedor?  ,\n Se eliminará el proveedor junto con todos los productos y máquinas que tenga enlazado.",
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, elimínalo',
                customClass: {
                    container: 'my-swal'
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const response = await procesarPeticionDelete(`proveedor/eliminar/${proveedor.id_proveedor}`);
                    Swal.fire({
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success',
                        customClass: {
                            container: 'my-swal'
                        }
                    }

                    ).then(() => {
                        navigate(`/bodyhealth-frontend/admin/dashboard/proveedores`);
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
        setShowModalUsosProveedor(false);
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
        <Dialog open={showModalUsosProveedor} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
            <DialogTitle>Usos del proveedor</DialogTitle>
            <DialogContent>
                {productos.length > 0 && maquinas.length > 0
                    ?
                    <Grid container columns={{ xs: 6, sm: 9, md: 13 }} m={1}>
                        <Grid item xs={6} sm={4} md={6} mr={1}>
                            <Typography variant="subtitle2" align="center" >
                                Productos que tiene el Proveedor
                            </Typography>

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
                        <Grid item xs={6} sm={4} md={6} ml={1}>

                            <Typography variant="subtitle2" align="center" >
                                Máquinas que tiene el Proveedor
                            </Typography>

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
                                            <TableRow style={{ height: 53 * emptyRowsMaquinas }}>
                                                <TableCell colSpan={2} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                    </Grid>
                    :
                    productos.length > 0
                        ?
                        <Grid item columns={{ xs: 6, sm: 8, md: 12 }} >

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
                        :
                        <Grid item columns={{ xs: 6, sm: 8, md: 12 }} >
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
                                                <TableRow style={{ height: 53 * emptyRowsMaquinas }}>
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

export default MostrarUsosProveedorModal;