import React, { useEffect, useState } from "react";

import { filter } from 'lodash';
// @mui
import {
    Table,
    Stack,
    Paper,
    Avatar,
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
import Label from '../../../components/admin/dashboard/label';
import TableHead from '../../../components/admin/dashboard/TableHead';
import TableBuscar from '../../../components/admin/dashboard/TableBuscar';

//icons
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { useNavigate } from "react-router-dom";

const TABLE_HEAD = [
    { id: 'nombre', label: 'Nombre', alignRight: false },
    { id: 'apellido', label: 'Apellido', alignRight: false },
    { id: 'documento', label: 'Documento', alignRight: false },
    { id: 'telefono', label: 'Telefono', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'estado', label: 'Estado', alignRight: false },
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
        return filter(array, (_cliente) => (_cliente.cliente.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
            _cliente.cliente.apellido.toLowerCase().indexOf(query.toLowerCase()) !== -1));
    }
    return stabilizedThis.map((el) => el[0]);
}

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";
function ClienteList({ entrenador }) {

    const [clientes, setClientes] = useState(entrenador.entrenadorClientes);

    const [status, setStatus] = useState();

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('nombre');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

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

    const handleClienteExpand = (id_usuario) => {
        navigate(`/entrenador/dashboard/clientes/${id_usuario}`)
    };


    const handleFilterByName = (event) => {
        setPage(0);
        setFilterName(event.target.value);
    };

    const Status = () => {
        if (clientes.length > 0) { setStatus(200) }
    }

    useEffect(() => {
        Status();
    }, []);

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - clientes.length) : 0;

    const filteredUsers = applySortFilter(clientes, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredUsers.length && !!filterName;

    return (
        <>
            <Container>
                {status !== 200
                    &&
                    <Alert sx={{ marginBottom: '50px' }} variant="outlined" severity="error">
                        <AlertTitle>Error</AlertTitle>
                        No tienes clientes asignados
                    </Alert>
                }

                <>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Clientes
                        </Typography>

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
                                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                    const { cliente } = row;

                                    return (
                                        <TableRow hover key={cliente.id_usuario} >
                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    <Avatar alt={cliente.nombre} src={url + cliente.foto} />
                                                    <Typography variant="subtitle2" noWrap>
                                                        {cliente.nombre}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>

                                            <TableCell align="left">{cliente.apellido}</TableCell>

                                            <TableCell align="left">{cliente.tipo_documento + ' - ' + cliente.documento}</TableCell>

                                            <TableCell align="left">{cliente.telefono}</TableCell>

                                            <TableCell align="left">{cliente.email}</TableCell>

                                            <TableCell align="left">
                                                <Label color={(cliente.estado === false && 'error') || 'success'}>{cliente.estado === true ? 'Activo' : 'Inactivo'}</Label>
                                            </TableCell>

                                            <TableCell align="right">
                                                <IconButton size="large" color="inherit" onClick={() => handleClienteExpand(cliente.id_usuario)}>
                                                    <ReadMoreIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={7} />
                                    </TableRow>
                                )}
                            </TableBody>

                            {isNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={7} sx={{ py: 3 }}>
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
                        count={clientes.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </>

            </Container>

        </>
    )
}

export default ClienteList