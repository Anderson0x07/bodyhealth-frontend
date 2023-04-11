import React, { useEffect, useState } from "react";
import { procesarPeticionGet } from "../../../utils/HandleApi";

import { filter } from 'lodash';
// @mui
import {
  Table,
  Stack,
  Paper,
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
import ReceiptIcon from '@mui/icons-material/Receipt';

import TableHead from '../dashboard/TableHead';
import TableBuscar from '../dashboard/TableBuscar';


import { useNavigate } from "react-router-dom";


const TABLE_HEAD = [
  { id: 'id_factura', label: '# Factura', alignRight: false },
  { id: 'cliente', label: 'Nombre', alignRight: false },
  { id: 'plan', label: 'Plan', alignRight: false },
  { id: 'fecha_inicio', label: 'Fecha de inicio', alignRight: false },
  { id: 'fecha_fin', label: 'Fecha de fin', alignRight: false },
  { id: 'metodoPago', label: 'Metodo de pago', alignRight: false },
  { id: '', label: "Generar reporte", align: "center" },
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
    return filter(array, (_factPlan) => (_factPlan.cliente.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      _factPlan.cliente.apellido.toLowerCase().indexOf(query.toLowerCase()) !== -1))

  }
  return stabilizedThis.map((el) => el[0]);
}

function FactPlanList() {

  const [fact, setFact] = useState([]);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('id_factura');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();


  const handleVerFactura = (id_factura) => {
    console.log("gereando factura")
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


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - fact.length) : 0;

  const filteredFacts = applySortFilter(fact, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredFacts.length && !!filterName;

  useEffect(() => {
    getAll();
  }, []);

  const getAll = async () => {
    try {
      const response = await procesarPeticionGet("clientedetalle/all");
      setStatus(response.status);
      setFact(response.data.clientedetalles);
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
            Facturación de planes
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
              {filteredFacts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {

                const { id_factura, cliente, plan, fecha_inicio, fecha_fin, metodoPago } = row;

                return (
                  <TableRow hover key={id_factura} >


                    <TableCell align="center">{id_factura}</TableCell>
                    <TableCell align="left">
                      <Typography variant="subtitle2" noWrap>
                        {cliente.nombre + " " + cliente.apellido}
                      </Typography>

                    </TableCell>

                    <TableCell align="left">{plan.plan}</TableCell>

                    <TableCell align="left">{fecha_inicio}</TableCell>

                    <TableCell align="left">{fecha_fin}</TableCell>

                    <TableCell align="left">{metodoPago.descripcion} </TableCell>

                    <TableCell align="center">
                      <IconButton size="large" color="inherit" onClick={() => handleVerFactura(id_factura)}>
                        <ReceiptIcon />
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
          count={fact.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />


      </Container>
    </>
  )
}

export default FactPlanList
