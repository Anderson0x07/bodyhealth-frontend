import React, { useEffect, useState } from "react";

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
    IconButton,
    TableContainer,
    TablePagination,
    Alert,
    AlertTitle,
} from '@mui/material';
// components

import TableHead from "../../admin/dashboard/TableHead"
import TableBuscar from '../../admin/dashboard/TableBuscar';

//icons
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


import { procesarPeticionGet } from "../../../utils/HandleApi";
import AgregarMusculoModal from "./AgregarMusculoModal";

const TABLE_HEAD = [
    { id: 'nombre', label: 'Nombre', alignRight: false },
    { id: 'grupo_muscular', label: 'Grupo muscular', alignRight: false },
    { id: 'descripcion', label: 'Descripcion', alignRight: false },
    { id: '' }
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
        return filter(array, (_musculo) => (_musculo.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
                                            _musculo.descripcion.toLowerCase().indexOf(query.toLowerCase()) !== -1))

    }
    return stabilizedThis.map((el) => el[0]);
}


function MusculoList() {

    const [musculos, setMusculos] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [proveedor, setProveedor] = useState({})


    const [showModalEditarProveedor, setShowModalEditarProveedor] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('nombre');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const agregarMusculos = (musculos) => {
        setMusculos(musculos);
    }


    //FUNCION DE EDITAR
    const handleActualizarproveedor = (musculosActualizados) => {
        setMusculos(musculosActualizados)
    }

    const handleExpandMusculo = (id_musculo) => {
        navigate(`/bodyhealth-frontend/entrenador/dashboard/musculos/${id_musculo}`);
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


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - musculos.length) : 0;

    const filteredmusculos = applySortFilter(musculos, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredmusculos.length && !!filterName;

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("musculo/all");
            setStatus(response.status);
            setMusculos(response.data.musculos);
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
                        Musculos
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
                        Nuevo
                    </Button>

                    {showModal && (
                        <AgregarMusculoModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            agregarMusculos={agregarMusculos}
                        />
                    )}
                </Stack>

                <Stack mb={5}>
                    <TableBuscar filterName={filterName} onFilterName={handleFilterByName} />
                </Stack>

                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <TableHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {filteredmusculos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                const { id_musculo, nombre, grupo_muscular, descripcion } = row;

                                return (

                                    <TableRow hover key={id_musculo} >
                                        <TableCell>
                                            <Typography variant="subtitle2" noWrap>
                                                {nombre}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" noWrap>
                                                {grupo_muscular}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" noWrap>
                                                {descripcion}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton size="large" color="inherit" onClick={() => handleExpandMusculo(id_musculo)}>
                                                <ReadMoreIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}

                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={4} />
                                </TableRow>
                            )}
                        </TableBody>
                        {isNotFound && (
                            <TableBody>
                                <TableRow>
                                    <TableCell align="center" colSpan={4} sx={{ py: 3 }}>
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
                    count={musculos.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />

            </Container>
            {showModalEditarProveedor && (
                <EditarProveedorModal
                    proveedor={proveedor}
                    showModalEditarProveedor={showModalEditarProveedor}
                    setShowModalEditarProveedor={setShowModalEditarProveedor}
                    onUpdate={handleActualizarproveedor}
                />
            )}
        </>
    )
}

export default MusculoList
