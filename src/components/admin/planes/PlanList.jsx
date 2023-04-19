import React, { useEffect, useState } from "react";
import { procesarPeticionGet } from "../../../utils/HandleApi";

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
} from '@mui/material';

import TableHead from '../../../components/admin/dashboard/TableHead';
import TableBuscar from '../../../components/admin/dashboard/TableBuscar';

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import AgregarPlanModal from "./AgregarPlanModal";

const TABLE_HEAD = [
    { id: 'plan', label: 'Nombre del plan', alignRight: false },
    { id: 'meses', label: 'Duracion del plan', alignRight: false },
    { id: 'precio', label: 'Precio', alignRight: false },
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
        return filter(array, (_plan) => (_plan.plan.toLowerCase().indexOf(query.toLowerCase()) !== -1))

    }
    return stabilizedThis.map((el) => el[0]);
}


function PlanList() {

    const [planes, setPlanes] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('plan');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const agregarPlanes = (planes) => {
        setPlanes(planes);
    }

    const handlePlanExpand = (id) => {
        navigate(`/bodyhealth-frontend/admin/dashboard/planes/${id}`)
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


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - planes.length) : 0;

    const filteredPlanes = applySortFilter(planes, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredPlanes.length && !!filterName;

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        try {
            const response = await procesarPeticionGet("plan/all");
            setStatus(response.status);
            setPlanes(response.data.planes);
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
                        Planes
                    </Typography>
                    <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
                        Nuevo
                    </Button>

                    {showModal && (
                        <AgregarPlanModal
                            showModal={showModal}
                            setShowModal={setShowModal}
                            agregarPlanes={agregarPlanes}
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
                            {filteredPlanes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                const { id_plan, plan, precio, meses } = row;

                                return (
                                    <TableRow hover key={id_plan} >
                                        <TableCell align="left">
                                            <Typography variant="subtitle2" noWrap>
                                                {plan}
                                            </Typography>
                                        </TableCell>

                                        <TableCell align="left">{meses}</TableCell>

                                        <TableCell align="left">{precio}</TableCell>

                                        <TableCell align="right">
                                            <IconButton size="large" color="inherit" onClick={() => handlePlanExpand(id_plan)}>
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
                    count={planes.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />


            </Container>

        </>
    )
}

export default PlanList
