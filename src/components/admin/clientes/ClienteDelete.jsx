import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { procesarPeticionDelete, procesarPeticionGet } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import { Button, Card, Container, Grid, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Scrollbar from '../dashboard/scrollbar/Scrollbar';
import { ArrowBack, Delete } from '@mui/icons-material';

function ClienteDelete() {

  const [clienteRutinas, setClienteRutinas] = useState([]);
  const [clienteEntrenadores, setClienteEntrenadores] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getCliente();
  }, []);

  const getCliente = async () => {
    try {
      const response = await procesarPeticionGet(`cliente/${id}`);
      console.log(response.data.cliente)
      setClienteRutinas(response.data.cliente.clienteRutinas)
      setClienteEntrenadores(response.data.cliente.clienteEntrenadores)
    } catch (error) {
      setError(error.response.data.error)
    }
  };

  const handleBack = () => {
    navigate(`/admin/dashboard/clientes/${id}`)
  };

  const handleDelete = () => {
    try {

      Swal.fire({
        title: 'Atención',
        text: "¿Está seguro que desea eliminar el cliente?",
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
          const response = await procesarPeticionDelete(`cliente/eliminar/${id}`);
          Swal.fire(
            'Información',
            response.data.message,
            'success'
          ).then(() => {
            navigate(`/admin/dashboard/clientes`);
          })
        }
      })

    } catch (error) {
      console.log(error.response.data.error);
      Swal.fire('Atención', error.response.data.error, 'error');
    }
  };

  const renderClienteRutinas = () => {
    const items = [];
    console.log(clienteRutinas)
    for (let i = 0; i < clienteRutinas.length; i++) {
      items.push(<TableRow hover key={clienteRutinas[i].id_clienterutina} >

        <TableCell align="right">{clienteRutinas[i].id_clienterutina}</TableCell>
        <TableCell align="right">{clienteRutinas[i].rutina.nombre_rutina}</TableCell>
        <TableCell align="right">{clienteRutinas[i].rutina.descripcion}</TableCell>

      </TableRow>);

    }
    return items;
  }

  return (

    <Container>

      <Typography variant="h4" gutterBottom mb={3}>
        Datos del cliente
      </Typography>
      <Typography variant="h6" gutterBottom mb={3}>
        El cliente es usado en las siguientes funcionalidades:
      </Typography>

      <Card>

        <Grid container columns={{ xs: 6, sm: 8, md: 12 }}>

          <Grid item xs={6} sm={6} md={6} >
            <Scrollbar>
              <Typography variant="h6" gutterBottom>
                Rutinas:
              </Typography>
              <TableContainer component={Paper}>
                <Table>

                  <TableHead>
                    <TableRow>
                      <TableCell>Id cliente rutina</TableCell>
                      <TableCell align="right">Nombre rutina</TableCell>
                      <TableCell align="right">Descripción rutina</TableCell>
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {renderClienteRutinas()}
                  </TableBody>

                </Table>
              </TableContainer>
            </Scrollbar>
          </Grid>

          <Grid item xs={6} sm={6} md={6} >
          
          </Grid>

          <Grid item xs={6} sm={6} md={6} >
          
          </Grid>

        </Grid>

      </Card>


      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={6} >
          <Button variant="contained" startIcon={<ArrowBack />} onClick={handleBack}>Atras</Button>
        </Grid>
        <Grid item xs={2} sm={4} md={6} >
          <Button variant="contained" startIcon={<Delete />} onClick={handleDelete}>Eliminar</Button>
        </Grid>

      </Grid>

    </Container>
  )
}

export default ClienteDelete