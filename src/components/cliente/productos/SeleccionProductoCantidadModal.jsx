import { LoadingButton } from '@mui/lab';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useContext, useState } from 'react';
import { CartContext } from '../carrito/ShoppingCartContext';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function SeleccionProductoCantidadModal(props) {

    const navigate = useNavigate();


    const { producto, showModalAgregarProducto, setShowModalAgregarProducto } = props;

    const [cantidad, setCantidad] = useState(0);

    const [cart, setCart] = useContext(CartContext);

    const handleCancelar = () => {
        setShowModalAgregarProducto(false);
    }



    const handleAgregarProducto = () => {
        setCart((currItems) => {
            const isItemsFound = currItems.find((item) => item.id_producto === producto.id_producto);
            
            if (isItemsFound) {
                return currItems.map((item) => {
                    if (item.id_producto === producto.id_producto) {
                        return { ...item, cantidad: item.cantidad + cantidad};
                    } else {
                        return item;
                    }
                });
            } else {
                return [...currItems, { 
                    id_producto: producto.id_producto, 
                    foto: producto.foto,
                    cantidad: cantidad, 
                    precioUnitario: producto.precio,
                }];
            }
        });

        Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            title: 'Información',
            text: "Producto añadido con exito",
            icon: 'success'
        })

        producto.stock -= cantidad;

        setShowModalAgregarProducto(false);

    }


    const handleCantidadChange = (event) => {
        const valor = event.target.value;
        if (valor === '' || (valor >= 1 && valor <= producto.stock)) { // valida el rango del valor ingresado
            setCantidad(parseInt(valor));
        }
    };

    const isCantidadInvalid = cantidad !== '' && (cantidad < 0 || cantidad > producto.stock); // determina si el valor es inválido
    const isCantidadEmpty = cantidad === ''; // determina si el valor es vacío


    return (
        <Dialog open={showModalAgregarProducto} onClose={handleCancelar} >
            <DialogTitle>Agregar producto</DialogTitle>
            <DialogContent>

                <TextField
                    margin="normal"
                    type="number"
                    name="cantidad"
                    label="Cantidad"
                    fullWidth
                    variant="outlined"
                    value={cantidad}
                    onChange={handleCantidadChange}
                    error={isCantidadInvalid || isCantidadEmpty} // muestra el error si el valor es inválido o vacío
                    helperText={isCantidadInvalid ? 'Ingrese un valor entre 0 y ' + producto.stock : isCantidadEmpty ? 'Ingrese un valor' : ''} // muestra el mensaje de error
                    inputProps={{ min: 0, max: producto.stock }} // valores mínimo y máximo
                />

            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancelar}>Cancelar</Button>
                <LoadingButton
                    color="secondary"
                    onClick={handleAgregarProducto}
                    startIcon={<Add />}
                    variant="contained"
                >
                    Agregar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )

}

export default SeleccionProductoCantidadModal