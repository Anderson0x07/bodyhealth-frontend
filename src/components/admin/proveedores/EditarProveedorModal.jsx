import { useState, useEffect } from 'react';
import { procesarPeticionGet, procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

function EditarProveedorModal(props) {
    const { proveedor, showModalEditarProveedor, setShowModalEditarProveedor, onUpdate } = props;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(proveedor);



    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowModalEditarProveedor(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);

        console.log("DATA");
        console.log(data);

        try {
            const respuesta = await procesarPeticionPut(`proveedor/editar/${proveedor.id_proveedor}`, data);
            setLoading(false);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowModalEditarProveedor(false);

            onUpdate(respuesta.data.proveedor);

        } catch (error) {
            console.log(error)
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


    return (
        <Dialog open={showModalEditarProveedor} onClose={handleCancelar} >
            <DialogTitle>Editar proveedor</DialogTitle>
            <DialogContent>

                <TextField margin="normal" type="text" name="nombre_empresa" label="Nombre"
                    onChange={handleChange} defaultValue={proveedor.nombre_empresa} fullWidth variant="outlined" />
                <TextField margin="normal" type="text" name="direccion" label="Drección"
                    onChange={handleChange} defaultValue={proveedor.direccion} fullWidth variant="outlined" />
                <TextField margin="normal" type="text" name="telefono" label="Telefono"
                    onChange={handleChange} defaultValue={proveedor.telefono} fullWidth variant="outlined" />
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

export default EditarProveedorModal