import React, { useEffect, useState } from "react";

import { filter } from 'lodash';
// @mui
import {
    Card,
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
    Popover,
    MenuItem,
} from '@mui/material';
// components

import TableHead from "../dashboard/TableHead"
import TableBuscar from '../dashboard/TableBuscar';

//icons
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


import { procesarPeticionGet } from "../../../utils/HandleApi";
import Scrollbar from "../dashboard/scrollbar";
import AgregarEjercicioModal from "./AgregarEjercicioModal";

const TABLE_HEAD = [
    { id: 'descripción', label: 'Descripción', alignRight: false },
    { id: 'series', label: 'Series', alignRight: false},
    { id: 'repeticiones', label: 'Repeticiones', alignRight: false},
    { id: 'musculo', label: 'Musculo', alignRight: false}
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
        return filter(array, (_ejercicios) => (_ejercicios.descripcion.toLowerCase().indexOf(query.toLowerCase()) !== -1))

    }
    return stabilizedThis.map((el) => el[0]);
}


function EjerciciosList() {

    const [ejercicios, setEjercicios] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [proveedor,setProveedor]=useState({})
    

    const [showModalEditarProveedor, setShowModalEditarProveedor] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('nombre');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const agregarEjercicios = (ejercicios) => {
        setEjercicios(ejercicios);
    }


    const handleEditarproveedor = (row) => {
        setShowModalEditarProveedor(true);
        setProveedor(row)
    }
    //FUNCION DE EDITAR
    const handleActualizarproveedor = (ejerciciosActualizados) => {
        setEjercicios(ejerciciosActualizados)
    }

    const handleExpandProveedor = (id_ejercicio) => {
        navigate(`/admin/dashboard/ejercicio/${id_ejercicio}`);
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


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - ejercicios.length) : 0;

    const filteredEjercicios = applySortFilter(ejercicios, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredEjercicios.length && !!filterName;

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("ejercicio/all");
            setStatus(response.status);
            setEjercicios(response.data.ejercicios);
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
                            Ejercicios
                        </Typography>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
                            Nuevo
                        </Button>

                        {showModal && (
                            <AgregarEjercicioModal
                                showModal={showModal}
                                setShowModal={setShowModal}
                                agregarEjercicios={agregarEjercicios}
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
                                    {filteredEjercicios.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_ejercicio, descripcion, series, repeticiones, musculo } = row;

                                        return (
                                            
                                                <TableRow hover key={id_ejercicio} >
                                                    <TableCell align="left">
                                                        <Typography variant="subtitle2" noWrap>
                                                            {descripcion}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                    <Typography variant="subtitle2" noWrap>
                                                            {series}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                    <Typography variant="subtitle2" noWrap>
                                                            {repeticiones}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                    <Typography variant="subtitle2" noWrap>
                                                            {musculo.descripcion}
                                                        </Typography>
                                                    </TableCell>

                                                    <TableCell align="right">
                                                    <IconButton size="large" color="inherit" onClick={() => handleExpandProveedor(id_ejercicio)}>
                                                        <ReadMoreIcon/>
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
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Scrollbar>

                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={ejercicios.length}
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
        </div>
    )
}

export default EjerciciosList