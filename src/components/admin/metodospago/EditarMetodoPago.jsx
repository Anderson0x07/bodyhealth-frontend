import { useState} from 'react';
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

function EditarMetodoPago(props) {
  const { metodo, showModalEditarMetodoPago, setShowModalEditarMetodoPago, onUpdate } = props;
  
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(metodo);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
};

const handleCancelar = () => {
  setShowModalEditarMetodoPago(false);
};

const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    
    console.log("DATA");
    console.log(data);
  
    try {
        const respuesta = await procesarPeticionPut(`metodopago/editar/${metodo.id_metodopago}`, data);
        setLoading(false);
        Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            title: 'Información',
            text: respuesta.data.message,
            icon: 'success'
        })

        setShowModalEditarMetodoPago(false);

        const response = await procesarPeticionGet('metodopago/all')
        console.log(response)
        onUpdate(response.data.metodospago);

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
    <Dialog open={showModalEditarMetodoPago} onClose={handleCancelar} >
            <DialogTitle>Editar metodo de pago</DialogTitle>
            <DialogContent>

                <TextField margin="normal" type="text" name="descripcion" label="Musculo"
                    onChange={handleChange} defaultValue={metodo.descripcion} fullWidth variant="outlined" />

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

export default EditarMetodoPago
