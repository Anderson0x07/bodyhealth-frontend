import React, { useEffect, useState } from "react";
import { procesarPeticionGet } from "../../../utils/HandleApi";

import { filter } from 'lodash';

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

import TableHead from '../../admin/dashboard/TableHead';
import TableBuscar from '../../admin/dashboard/TableBuscar';

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import AgregarRutinaModal from "./AgregarRutinaModal";



const TABLE_HEAD = [
    { id: 'nombre_rutina', label: 'Nombre', alignRight: false },
    { id: 'nivel', label: 'Nivel', alignRight: false },
    { id: 'duracion', label: 'Duración', alignRight: false },
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
        return filter(array, (_rutinas) => (_rutinas.nombre_rutina.toLowerCase().indexOf(query.toLowerCase()) !== -1))

    }
    return stabilizedThis.map((el) => el[0]);
}


function RutinaList() {

    const [rutinas, setRutinas] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);


    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('nombre_rutina');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const agregarRutinas = (rutinas) => {
        setRutinas(rutinas);
    }

    const handleExpandRutina = (id_rutina) => {
        navigate(`/entrenador/dashboard/rutinas/${id_rutina}`);
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


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rutinas.length) : 0;

    const filteredrutinas = applySortFilter(rutinas, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredrutinas.length && !!filterName;

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("rutina/all");
            console.log("hola")
            console.log(response.data)
            setStatus(response.status);
            setRutinas(response.data.rutinas);
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
                        Rutinas
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
                        Nuevo
                    </Button>

                    {showModal && (
                        <AgregarRutinaModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            agregarRutinas={agregarRutinas}
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
                            {filteredrutinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                const { id_rutina, nombre_rutina, nivel, duracion } = row;

                                return (

                                    <TableRow hover key={id_rutina} >
                                        <TableCell align="left">
                                            <Typography variant="subtitle2" noWrap>
                                                {nombre_rutina}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" noWrap>
                                                {nivel}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="subtitle2" noWrap>
                                                {duracion}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="right">
                                            <IconButton size="large" color="inherit" onClick={() => handleExpandRutina(id_rutina)}>
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
                    count={rutinas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Container>



        </>
    )
}

export default RutinaList