import React, { useState, useEffect } from 'react'
import { procesarPeticionDelete, procesarPeticionGet } from "../../../utils/HandleApi";
import AgregarMetodoPagoModal from './AgregarMetodoPagoModal'
import { filter } from 'lodash';
// @mui
import {
    Table,
    Stack,
    Paper,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Alert,
    AlertTitle,
} from '@mui/material';

import TableHead from '../dashboard/TableHead';
import TableBuscar from '../dashboard/TableBuscar';

import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "@mui/icons-material";
import Swal from "sweetalert2";
import EditarMetodoPago from './EditarMetodoPago';
import MostrarComprasMetodoModal from './MostrarComprasMetodoModal';
import MostrarPlanesMetodoModal from './MostrarPlanesMetodoModal';
import MostrarUsosMetodoModal from './MostrarUsosMetodoModal';


const TABLE_HEAD = [
    { id: 'descripcion', label: 'Método de Pago', alignRight: false },
    { id: '' },
];



function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {

    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_metodoPago) => (_metodoPago.descripcion.toLowerCase().indexOf(query.toLowerCase()) !== -1))

    }
    return stabilizedThis.map((el) => el[0]);
}
function MetodoPagoList() {

    const [metodos, setMetodos] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [metodo, setMetodo] = useState({})

    const [compras, setCompras] = useState([]);
    const [planes, setPlanes] = useState([]);

    const [showModalUsosMetodo, setShowModalUsosMetodo] = useState(false);
    const [showModalComprasMetodo, setShowModalComprasMetodo] = useState(false);
    const [showModalPlanesMetodo, setShowModalPlanesMetodo] = useState(false);


    const [showModalEditarMetodoPago, setShowModalEditarMetodoPago] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('descripcion');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const agregarMetodoPago = (metodo) => {
        setMetodos(metodo);
    }

    const handleDelete = async (metodo) => {

        console.log(metodo);

        console.log(metodo.compras);
        console.log(metodo.clienteDetalles);
        setCompras(metodo.compras);
        setPlanes(metodo.clienteDetalles);

        if (metodo.compras.length > 0 && metodo.clienteDetalles.length > 0) {
            //mostrarModalAmbos
            console.log("Entre")
            setShowModalUsosMetodo(true);
        }
        else if (metodo.compras.length > 0) {
            //mostrarModalCompras

            setShowModalComprasMetodo(true);
        } else if (metodo.clienteDetalles.length > 0) {
            //mostrarModalPlanes
            setShowModalPlanesMetodo(true);
        } else {
            try {
                Swal.fire({
                    title: 'Atención',
                    text: "¿Está seguro que desea eliminar este método de pago?",
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

                        const response = await procesarPeticionDelete(`metodopago/eliminar/${metodo.id_metodopago}`);

                        Swal.fire({
                            customClass: {
                                container: 'my-swal'
                            },
                            title: 'Información',
                            text: response.data.message,
                            icon: 'success'

                        }).then(async () => {
                            const response = await procesarPeticionGet("metodopago/all");
                            setMetodos(response.data.metodospago);
                            navigate(`/admin/dashboard/metodospago`);
                        })
                    }
                })

            } catch (error) {
                Swal.fire('Atención', error.response.data.error, 'error');
            }
        }

    };

    const handleEditarMetodoPago = (metodo) => {
        setShowModalEditarMetodoPago(true);
        setMetodo(metodo)
    }
    //FUNCION DE EDITAR
    const handleActualizarMetodoPago = (metodoPagosActualizados) => {
        setMetodos(metodoPagosActualizados)
    }

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(0);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - metodos.length) : 0;

    const filteredMetodoPago = applySortFilter(metodos, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredMetodoPago.length && !!filterName;

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("metodopago/all");

            setStatus(response.status);
            setMetodos(response.data.metodospago);
        } catch (error) {
            setError(error.response.data.error);
            setStatus(error.response.status);
        }
    };
    return (
        <div>
            <>
                <Container>
                    {status !== 200 && (
                        <Alert sx={{ marginBottom: '50px' }} variant="outlined" severity="error">
                            <AlertTitle>Error</AlertTitle>
                            {error}
                        </Alert>
                    )}

                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Métodos de pago
                        </Typography>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
                            Nuevo
                        </Button>

                        {showModal && (
                            <AgregarMetodoPagoModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                                agregarMetodoPago={agregarMetodoPago}
                            />
                        )}
                    </Stack>

                    <Stack mb={5}>
                        <TableBuscar filterName={filterName} onFilterName={handleFilterByName} />
                    </Stack>

                        <TableContainer sx={{ minWidth: 500 }}>
                            <Table>
                                <TableHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredMetodoPago.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_metodopago, descripcion } = row;

                                        return (

                                            <TableRow hover key={id_metodopago} >
                                                <TableCell align="left">
                                                    <Typography variant="subtitle2" noWrap>
                                                        {descripcion}
                                                    </Typography>

                                                </TableCell>

                                                <TableCell align="right">
                                                    <Button variant="contained" sx={{ marginRight: '10px' }} color="inherit" onClick={() => handleEditarMetodoPago(row)}>
                                                        <Edit /> Editar
                                                    </Button>
                                                    <Button variant="contained" color="inherit" onClick={() => handleDelete(row)}>
                                                        <Delete /> Eliminar
                                                    </Button>

                                                </TableCell>


                                            </TableRow>


                                        );

                                    })}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 53 * emptyRows }}>
                                            <TableCell colSpan={2} />
                                        </TableRow>
                                    )}

                                </TableBody>
                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={2} sx={{ py: 3 }}>
                                                <Paper sx={{ textAlign: 'center' }}>
                                                    <Typography variant="h6" paragraph>
                                                        No Encontrado
                                                    </Typography>

                                                    <Typography variant="body2">
                                                        No hay resultados para &nbsp;
                                                        <strong>&quot;{filterName}&quot;</strong>.
                                                        <br /> Intente verificar errores tipográficos o usar palabras completas.
                                                    </Typography>
                                                </Paper>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                )}
                            </Table>
                        </TableContainer>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={metodos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </Container>

                {showModalEditarMetodoPago && (
                    <EditarMetodoPago
                        metodo={metodo}

                        showModalEditarMetodoPago={showModalEditarMetodoPago}
                        setShowModalEditarMetodoPago={setShowModalEditarMetodoPago}
                        onUpdate={handleActualizarMetodoPago}
                    />
                )}

                {/* MODAL PARA VER COMPRAS DEL METODO */}
                {showModalComprasMetodo && (
                    <MostrarComprasMetodoModal
                        compras={compras}
                        showModalComprasMetodo={showModalComprasMetodo}
                        setShowModalComprasMetodo={setShowModalComprasMetodo}
                    />
                )}

                {/* MODAL PARA VER PLANES DEL METODO */}
                {showModalPlanesMetodo && (
                    <MostrarPlanesMetodoModal
                        planes={planes}
                        showModalPlanesMetodo={showModalPlanesMetodo}
                        setShowModalPlanesMetodo={setShowModalPlanesMetodo}
                    />
                )}

                {/* MODAL PARA VER USOS DEL METODO */}
                {showModalUsosMetodo && (
                    <MostrarUsosMetodoModal
                        compras={compras}
                        planes={planes}
                        showModalUsosMetodo={showModalUsosMetodo}
                        setShowModalUsosMetodo={setShowModalUsosMetodo}
                    />

                )}





            </>
        </div>
    )
}

export default MetodoPagoList
