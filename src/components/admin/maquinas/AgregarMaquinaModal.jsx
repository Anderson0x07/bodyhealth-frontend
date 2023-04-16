import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';


function AgregarMaquinaModal(props) {
    const { showModal, setShowModal, agregarMaquinas } = props;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState("S")
    const [proveedores, setProveedores] = useState(null)

    const getProveedores = async () => {
        try {
            const respuesta = await procesarPeticionGet(`proveedor/all`);
            setProveedores(respuesta.data.proveedores)

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getProveedores();

    }, [])


    const handleCancelar = () => {
        setShowModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        data.proveedor = {
            id_proveedor: proveedorSeleccionado
        }

        setLoading(true);
        
        console.log(data)
        try {
            const respuesta = await procesarPeticionPost(`maquina/guardar`, data);
            setLoading(false);
            console.log(respuesta);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowModal(false);

            const response = await procesarPeticionGet("maquina/all");

            agregarMaquinas(response.data.maquinas);

        } catch (error) {
            setLoading(false);
            console.log(error);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error'
            })
        }

    }

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleProveedor = (event) => {
        setProveedorSeleccionado(event.target.value);
    }

    return (
        <Dialog open={showModal} onClose={handleCancelar} >
            <DialogTitle>Agregar Maquina</DialogTitle>
            <DialogContent>
                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el nombre de la maquina" />

                <TextField margin="normal" type="text" name="id_maquina" label="Serial"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el serial de la maquina" />

                <TextField margin="normal" type="text" name="estado" label="Estado"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el estado de la maquina" />

                <TextField margin="normal" type="text" name="observacion" label="Observación"
                    onChange={handleChange} fullWidth variant="outlined" helperText="Por favor agregar una observación de la maquina" />

                <TextField select margin="normal" type="text" name="proveedor" label="Proveedor" onChange={handleProveedor}
                    fullWidth variant="outlined" value={proveedorSeleccionado} helperText="Por favor seleccione un proveedor">
                    <MenuItem key="S" value="S">Seleccionar</MenuItem>
                    {proveedores != null ? proveedores.map((proveedor) => (
                        <MenuItem key={proveedor.id_proveedor} value={proveedor.id_proveedor}>
                            {proveedor.nombre_empresa}
                        </MenuItem>
                    )) : console.log("cargando")}

                </TextField>

            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancelar}>Cancelar</Button>

                <LoadingButton
                    color="secondary"
                    onClick={handleSubmit}
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<Save />}
                    variant="contained"
                >
                    Guardar
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );

}

export default AgregarMaquinaModal




