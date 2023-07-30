import React, { useEffect, useState } from "react";
import { procesarPeticionGet, procesarPeticionPdf } from "../../../utils/HandleApi";

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
  TableContainer,
  TablePagination,
  Alert,
  AlertTitle,
  Avatar,
} from '@mui/material';
// components

import TableHead from '../dashboard/TableHead';
import TableBuscar from '../dashboard/TableBuscar';

import FacturaItem from "../configuracion/FacturaItem";

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

const TABLE_HEAD = [
  { id: 'id_compra', label: '# Compra', alignRight: false },
  { id: 'cliente', label: 'Cliente', alignRight: false },
  { id: 'fecha_compra', label: 'Fecha de compra', alignRight: false },
  { id: 'metodoPago', label: 'Metodo de pago', alignRight: false },
  { id: 'total', label: 'Total de compra', alignRight: false },
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
    return filter(array, (_factPedido) => (_factPedido.cliente.nombre.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
      _factPedido.cliente.apellido.toLowerCase().indexOf(query.toLowerCase()) !== -1))

  }
  return stabilizedThis.map((el) => el[0]);
}


function FactPedidoList() {
  const [fact, setFact] = useState([]);
  const [status, setStatus] = useState(0);
  const [error, setError] = useState("");



  const [page, setPage] = useState(0);


  const [order, setOrder] = useState('asc');

  const [orderBy, setOrderBy] = useState('id_compra');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);



  const handleGenerarFactura = async (id_compra) => {

    try {
      const response = await procesarPeticionPdf(`pedido/pdf/${id_compra}`)

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url);


    } catch (error) {
      console.log(error);
    }

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
      const response = await procesarPeticionGet("compra/all");
      setStatus(response.status);
      setFact(response.data.compras);
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
            Facturación de pedidos
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

                const { id_compra, cliente, fecha_compra, total, metodoPago } = row;

                return (
                  <TableRow hover key={id_compra} >


                    <TableCell align="center">{id_compra}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={cliente.nombre} src={url + cliente.foto} />
                        <Typography variant="subtitle2" noWrap>
                          {cliente.nombre + " " + cliente.apellido}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell align="left">{fecha_compra}</TableCell>
                    <TableCell align="left">{metodoPago.descripcion} </TableCell>
                    <TableCell align="left">{"$ "+total.toLocaleString()}</TableCell>
                    <TableCell align="center">
                      <FacturaItem
                        key={id_compra}
                        id_factura={id_compra}
                        handleVerFactura={handleGenerarFactura}
                      />
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

export default FactPedidoList
