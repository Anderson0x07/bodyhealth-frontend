import React, { useEffect, useState } from "react";
import { procesarPeticionGet } from "../../../utils/HandleApi";

import { filter } from 'lodash';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
    Alert,
    AlertTitle,
} from '@mui/material';
// components
import Label from '../dashboard/label';
import Scrollbar from '../dashboard/scrollbar';

import TableHead from '../dashboard/TableHead';
import TableBuscar from '../dashboard/TableBuscar';

//icons
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import AgregarProductoModal from "./AgregarProductoModal";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'nombre', label: 'Nombre', alignRight: false },
    { id: 'stock', label: 'Stock', alignRight: false },
    { id: 'precio', label: 'Precio', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
    { id: 'proveedor', label: 'Proveedor', alignRight: false },
    { id: '' },
];

// ----------------------------------------------------------------------

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
        return filter(array, (_producto) => (_producto.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1));
    }
    return stabilizedThis.map((el) => el[0]);
}

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function ProductoList() {
    const [productos, setProductos] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('nombre');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const agregarProducto = (productos) => {
        setProductos(productos);
    }

    const handleProductoExpand = (id_producto) => {
        navigate(`/admin/dashboard/productos/${id_producto}`)
    };


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

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - productos.length) : 0;

    const filteredProducts = applySortFilter(productos, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredProducts.length && !!filterName;

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("producto/all");
            console.log(response)
            setStatus(response.status);
            setProductos(response.data.productos);
        } catch (error) {
            setError(error.response.data.error);
            setStatus(error.response.status);
        }
    };


    return (
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
                        Productos
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
                        Nuevo
                    </Button>

                    {showModal && (
                        <AgregarProductoModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            agregarProducto={agregarProducto}
                        />
                    )}
                </Stack>

                <Stack mb={5}>
                    <TableBuscar filterName={filterName} onFilterName={handleFilterByName} />
                </Stack>
                    <Scrollbar>
                        <TableContainer sx={{ minWidth: 800 }}>
                            <Table>
                                <TableHead
                                    order={order}
                                    orderBy={orderBy}
                                    headLabel={TABLE_HEAD}
                                    onRequestSort={handleRequestSort}
                                />
                                <TableBody>
                                    {filteredProducts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_producto, nombre, precio, estado, stock, foto, proveedor } = row;

                                        return (
                                            <TableRow hover key={id_producto} >
                                                <TableCell component="th" scope="row" padding="none">
                                                    <Stack direction="row" alignItems="center" spacing={2}>
                                                        <Avatar alt={nombre} src={url + foto} />
                                                        <Typography variant="subtitle2" noWrap>
                                                            {nombre}
                                                        </Typography>
                                                    </Stack>
                                                </TableCell>

                                                <TableCell align="left">{stock}</TableCell>

                                                <TableCell align="left">{'$ '+precio}</TableCell>

                                                <TableCell align="left">
                                                    <Label color={(estado === false && 'error') || 'success'}>{estado === true ? 'Activo' : 'Inactivo'}</Label>
                                                </TableCell>

                                                <TableCell align="left">{proveedor.nombre_empresa}</TableCell>

                                                

                                                <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={() => handleProductoExpand(id_producto)}>
                                                        <ReadMoreIcon />
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

                                {isNotFound && (
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
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
            </Container>

        </>
    );
}

export default ProductoList;

