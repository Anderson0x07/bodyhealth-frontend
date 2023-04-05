import React, { useEffect, useState } from "react";
import { procesarPeticionGet } from "../../../utils/HandleApi";
import AgregarMaquinaModal from './AgregarMaquinaModal'

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
// components
import Label from '../../../components/admin/dashboard/label';
import Scrollbar from '../../../components/admin/dashboard/scrollbar';

import TableHead from '../../../components/admin/dashboard/TableHead';
import TableBuscar from '../../../components/admin/dashboard/TableBuscar';

//icons
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";


const TABLE_HEAD = [
  { id: 'nombre', label: 'Nombre', alignRight: false },
  { id: 'id_maquina', label: 'Serial máquina', alignRight: false },
  { id: 'observacion', label: 'Observacion', alignRight: false },
  { id: 'proveedor', label: 'Proveedor', alignRight: false },
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
    return filter(array, (_maquina) => (_maquina.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1))

  }
  return stabilizedThis.map((el) => el[0]);
}



function MaquinaList() {

  const [maquinas, setMaquinas] = useState([]);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('nombre');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  const agregarMaquinas = (maquinas) => {
    setMaquinas(maquinas);
  }

  const handleMaquinaExpand = (id) => {
    navigate(`/admin/dashboard/maquinas/${id}`)
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


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - maquinas.length) : 0;

  const filteredMaquinas = applySortFilter(maquinas, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredMaquinas.length && !!filterName;

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await procesarPeticionGet("maquina/all");
      setStatus(response.status);
      setMaquinas(response.data.maquinas);
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
            Maquinas
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowModal(true)}>
            Nuevo
          </Button>

          {showModal && (
            <AgregarMaquinaModal
              showModal={showModal}
              setShowModal={setShowModal}
              agregarMaquinas={agregarMaquinas}
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
                {filteredMaquinas.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                  const { id, nombre, id_maquina, observacion, proveedor, estado } = row;

                  return (
                    <TableRow hover key={id} >
                      <TableCell align="left">
                       

                          <Typography variant="subtitle2" noWrap>
                            {nombre}
                          </Typography>
                        
                      </TableCell>

                      <TableCell align="left">{id_maquina}</TableCell>

                      <TableCell align="left">{observacion}</TableCell>

                      <TableCell align="left">{proveedor.nombre_empresa}</TableCell>

                      <TableCell align="left">
                        <Label color={('warning')}>{estado}</Label>
                      </TableCell>

                      <TableCell align="right">
                        <IconButton size="large" color="inherit" onClick={() => handleMaquinaExpand(id)}>
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
          count={maquinas.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />


      </Container>

    </>
  )
}


export default MaquinaList

