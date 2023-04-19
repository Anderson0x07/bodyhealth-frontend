import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./ShoppingCartContext";
import { Avatar, Button, Card, CardContent, CardHeader, Divider, Grid, MenuItem, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { procesarPeticionGet, procesarPeticionPdf, procesarPeticionPost, procesarPeticionPut } from "../../../utils/HandleApi";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { Check } from '@mui/icons-material'
import { useNavigate } from "react-router-dom";

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";


export const CarritoCompras = ({ cliente }) => {

  const navigate = useNavigate();

  const [cart, setCart] = useContext(CartContext);
  const quantity = cart.reduce((acc, curr) => {
    return acc + curr.cantidad;
  }, 0);

  const totalPrice = cart.reduce(
    (acc, curr) => acc + curr.cantidad * curr.precioUnitario,
    0
  );

  let data = {};

  const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState('S');


  const [metodos, setMetodos] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getMetodos = async () => {
      try {
        const res = await procesarPeticionGet("metodopago/all")
        setMetodos(res.data.metodospago)

      } catch (error) {
        console.log(error)
      }
    }

    getMetodos();
  }, []);

  const handleMetodo = (event) => {
    setMetodoPagoSeleccionado(event.target.value);
  }

  const handleCompra = async (event) => {


    if (metodoPagoSeleccionado === "S") {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'Atención',
        text: 'Debe seleccionar un método de pago',
        icon: 'warning'
      })

    } else {

      data.cliente = {
        id_usuario: cliente.id_usuario
      };

      data.metodoPago = {
        id_metodopago: metodoPagoSeleccionado
      }

      const fechaActual = new Date();
      data.fecha_compra = fechaActual.toISOString().slice(0, 10);

      data.total = totalPrice + (totalPrice * 0.19);

      setLoading(true);


      try {
        const respuesta = await procesarPeticionPost("compra/guardar", data);
        const id_factura = respuesta.data.id_factura;

        for (let i = 0; i < cart.length; i++) {
          const pedido = {
            producto: {
              id_producto: cart[i].id_producto
            },
            compra: {
              id_compra: id_factura
            },
            cantidad: cart[i].cantidad,
            total: cart[i].precioUnitario * cart[i].cantidad
          }
          try {
            const respuesta = await procesarPeticionPost(`pedido/guardar`, pedido);
            const res = await procesarPeticionPut(`producto/compra/${cart[i].id_producto}/${cart[i].cantidad}`);
            console.log(respuesta);
            setLoading(false);

            setCart([]);

          } catch (error) {
            console.log(error);
            setLoading(false);
          }
        }

        Swal.fire({
          title: 'Información',
          text: "Compra realizada con exito !!",
          icon: 'success',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Ver factura',
          customClass: {
            container: 'my-swal'
          }
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await procesarPeticionPdf(`pedido/pdf/${id_factura}`)

            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            window.open(url);

            Swal.fire({
              customClass: {
                container: 'my-swal'
              },
              title: 'Información',
              text: "Factura generada con éxito",
              icon: 'success'
            }).then(() => {
              navigate(`/bodyhealth-frontend/home`);
            })
          }
        })

      } catch (error) {
        console.log(error);
        setLoading(false);
      }

    }
  }



  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardHeader title="Resumen de la compra" />
          <Divider />
          <CardContent>
            <Table>
              <TableHead>
                <TableRow hover >

                  <TableCell align="center">Producto</TableCell>

                  <TableCell align="center">Cantidad</TableCell>

                  <TableCell align="center">Precio unitario</TableCell>

                  <TableCell align="center">Subtotal</TableCell>


                </TableRow>
              </TableHead>

              <TableBody>
                {cart.map((producto) => (

                  <TableRow hover key={producto.id_producto} >

                    <TableCell align="center">
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={producto.nombre} src={url + producto.foto} />
                        <Typography variant="subtitle2" noWrap>
                          {producto.nombre}
                        </Typography>
                      </Stack>

                    </TableCell>

                    <TableCell align="center">{producto.cantidad}</TableCell>

                    <TableCell align="center">$ {producto.precioUnitario}</TableCell>

                    <TableCell align="center">$ {producto.cantidad * producto.precioUnitario}</TableCell>

                  </TableRow>


                ))}

                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell align="center">
                    <Typography variant="h6" component="h3">
                      Subtotal: $ {totalPrice}
                    </Typography>
                    <Typography variant="h6" component="h3">
                      IVA: 19%
                    </Typography>
                    <Typography variant="h5" component="h2">
                      Total: $ {totalPrice + (totalPrice * 0.19)}
                    </Typography>
                  </TableCell>

                </TableRow>
              </TableBody>
            </Table>

          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Información" />
          <Divider />
          <CardContent>

            <Typography variant="body2">
              Nombre: {cliente.nombre + " " + cliente.apellido}
            </Typography>
            <Typography variant="body2">
              Teléfono: {cliente.telefono}
            </Typography>
            <Typography variant="body2">
              Email: {cliente.email}
            </Typography>


            <TextField sx={{ mt: 5 }} name="metodoPago" margin="normal" select label="Método de pago" onChange={handleMetodo}
              fullWidth variant="outlined" value={metodoPagoSeleccionado} helperText="Por favor seleccione el método de pago">
              <MenuItem key="S" value="S">Seleccionar</MenuItem>
              {metodos != null ? metodos.map((metodo) => (
                <MenuItem key={metodo.id_metodopago} value={metodo.id_metodopago}>
                  {metodo.descripcion}
                </MenuItem>
              )) : console.log("cargando menu item metodos de pago")}

            </TextField>

          </CardContent>

          <Divider />
          <CardContent>

            <LoadingButton
              color="primary"
              onClick={handleCompra}
              loading={loading}
              loadingPosition="start"
              startIcon={<Check />}
              variant="contained"
              fullWidth
            >
              Pagar
            </LoadingButton>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
