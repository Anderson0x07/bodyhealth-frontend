import React from 'react'
import { useState, useEffect } from 'react';
import { procesarPeticionPut, procesarPeticionGet } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';


function EditarMaquinaModal(props) {
    const { showEditModal, setShowEditModal, maquina, onUpdate } = props;

    const [data, setData] = useState(maquina);
    const [loading, setLoading] = useState(false);
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState(maquina.proveedor.id_proveedor)
    const [proveedores, setProveedores] = useState(null)

    const getProveedores = async () => {
        try {
            const respuesta = await procesarPeticionGet(`proveedor/all`);
            console.log(respuesta)
            setProveedores(respuesta.data.proveedores)


        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {

        getProveedores();

    }, [])

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowEditModal(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        data.proveedor = {
            id_proveedor: proveedorSeleccionado
        }

        setLoading(true);
        console.log(data)
        try {
            const respuesta = await procesarPeticionPut(`maquina/editar/${maquina.id}`, data);
            setLoading(false);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowEditModal(false);
            onUpdate(respuesta.data.maquina);
        } catch (error) {
            setLoading(false);

            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Atención',
                text: error.response.data.error,
                icon: 'error'
            })
        }


    };

    const handleProveedor = (event) => {
        setProveedorSeleccionado(event.target.value);
    }
    return (
        <Dialog open={showEditModal} onClose={handleCancelar} >
            <DialogTitle>Editar Maquina</DialogTitle>
            <DialogContent>

                <TextField margin="normal" type="text" name="id_maquina" label="Serial"
                    onChange={handleChange} defaultValue={maquina.id_maquina} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="nombre" label="Nombre"
                    onChange={handleChange} defaultValue={maquina.nombre} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="estado" label="Estado"
                    onChange={handleChange} defaultValue={maquina.estado} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="observacion" label="Observación"
                    onChange={handleChange} defaultValue={maquina.observacion} fullWidth variant="outlined" />

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
    )
}

export default EditarMaquinaModal
