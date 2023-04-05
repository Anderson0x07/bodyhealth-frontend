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

function EditarMusculoModal(props) {
    const { musculo, showModalEditarMusculo, setShowModalEditarMusculo, onUpdate } = props;

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(musculo);



    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowModalEditarMusculo(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setLoading(true);
        
        console.log("DATA");
        console.log(data);
      
        try {
            const respuesta = await procesarPeticionPut(`musculo/editar/${musculo.id_musculo}`, data);
            setLoading(false);
            Swal.fire({
                customClass: {
                    container: 'my-swal'
                },
                title: 'Información',
                text: respuesta.data.message,
                icon: 'success'
            })

            setShowModalEditarMusculo(false);

            const response = await procesarPeticionGet('musculo/all')
            console.log(response)
            onUpdate(response.data.musculos);

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
        <Dialog open={showModalEditarMusculo} onClose={handleCancelar} >
            <DialogTitle>Editar musculo</DialogTitle>
            <DialogContent>

                <TextField margin="normal" type="text" name="descripcion" label="Musculo"
                    onChange={handleChange} defaultValue={ musculo.descripcion} fullWidth variant="outlined" />

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

export default EditarMusculoModal