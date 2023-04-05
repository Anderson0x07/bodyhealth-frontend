import React, { useEffect, useState } from "react";
import { procesarPeticionDelete, procesarPeticionGet } from "../../../utils/HandleApi";
import AgregarMusculoModal from './AgregarMusculoModal'

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
import Label from '../../../components/admin/dashboard/label';
import Scrollbar from '../../../components/admin/dashboard/scrollbar';

import TableHead from '../../../components/admin/dashboard/TableHead';
import TableBuscar from '../../../components/admin/dashboard/TableBuscar';

//icons
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";
import { Delete, Edit, MoreVert } from "@mui/icons-material";
import Swal from "sweetalert2";
import EditarMusculoModal from "./EditarMusculoModal";

const TABLE_HEAD = [
    { id: 'descripcion', label: 'Nombre', alignRight: false },
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
        return filter(array, (_musculos) => (_musculos.descripcion.toLowerCase().indexOf(query.toLowerCase()) !== -1))

    }
    return stabilizedThis.map((el) => el[0]);
}


function MusculoList() {

    const [musculos, setMusculos] = useState([]);
    const [status, setStatus] = useState(0);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [musculo,setMusculo]=useState({})
    

    const [showModalEditarMusculo, setShowModalEditarMusculo] = useState(false);

    const [page, setPage] = useState(0);

    const [order, setOrder] = useState('asc');

    const [orderBy, setOrderBy] = useState('nombre');

    const [filterName, setFilterName] = useState('');

    const [rowsPerPage, setRowsPerPage] = useState(5);

    const navigate = useNavigate();

    const agregarMusculos = (musculos) => {
        setMusculos(musculos);
    }

    const handleDelete = (id_musculo) => {
console.log(id_musculo)
        try {
            Swal.fire({
                title: 'Atención',
                text: "¿Está seguro que desea eliminar el musculo?",
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

                    const response = await procesarPeticionDelete(`musculo/eliminar/${id_musculo}`);
      
                    Swal.fire({
                        customClass: {
                            container: 'my-swal'
                        },
                        title: 'Información',
                        text: response.data.message,
                        icon: 'success'

                    }).then(async () => {
                        const response = await procesarPeticionGet("musculo/all");
                        setMusculos(response.data.musculos);
                        navigate(`/admin/dashboard/musculos`);
                    })
                }
            })

        } catch (error) {
            Swal.fire('Atención', error.response.data.error, 'error');
        }


    };

    const handleEditarMusculo = (row) => {
        setShowModalEditarMusculo(true);
        setMusculo(row)
    }
    //FUNCION DE EDITAR
    const handleActualizarMusculo = (musculosActualizados) => {
        setMusculos(musculosActualizados)
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


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - musculos.length) : 0;

    const filteredMusculos = applySortFilter(musculos, getComparator(order, orderBy), filterName);

    const isNotFound = !filteredMusculos.length && !!filterName;

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
                                    {filteredMusculos.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                                        const { id_musculo, descripcion } = row;

                                        return (
                                            
                                                <TableRow hover key={id_musculo} >
                                                    <TableCell align="left">
                                                        <Typography variant="subtitle2" noWrap>
                                                            {descripcion}
                                                        </Typography>

                                                    </TableCell>

                                                    <TableCell align="right">
                                                    <IconButton  size="large" color="inherit" onClick={()=>handleEditarMusculo(row)}>
                                                            <Edit /> 
                                                        </IconButton>
                                                        <IconButton  size="large" sx={{color:'red'}} onClick={()=>handleDelete(id_musculo)}>
                                                            <Delete  /> 
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
                        count={musculos.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />


                </Container>
                {showModalEditarMusculo && (
                    <EditarMusculoModal
                        musculo={musculo}

                        showModalEditarMusculo={showModalEditarMusculo}
                        setShowModalEditarMusculo={setShowModalEditarMusculo}
                        onUpdate={handleActualizarMusculo}
                    />
                )}

            </>
        </div>
    )
}

export default MusculoList