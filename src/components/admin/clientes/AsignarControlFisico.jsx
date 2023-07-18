import React, { useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';


function AsignarControlFisico(props) {

  const { cliente, showModalAsignarControl, setShowModalAsignarControl, onUpdate } = props;
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCancelar = () => {
    setShowModalAsignarControl(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    data.cliente = cliente;

    const fechaActual = new Date();

    data.fecha = fechaActual;

    setLoading(true);


    try {
      const respuesta = await procesarPeticionPost(`control/guardar`, data);
      setLoading(false);

      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'Información',
        text: respuesta.data.message,
        icon: 'success'
      })

      setShowModalAsignarControl(false);

      const response = await procesarPeticionGet(`control/${respuesta.data.id_control}`);

      onUpdate(response.data.controlcliente);

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

  };

  return (
    <Dialog open={showModalAsignarControl} onClose={handleCancelar} >
      <DialogTitle>Asignación de plan</DialogTitle>
      <DialogContent>

        <TextField margin="normal" type="text" name="peso" label="Peso"
          onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el peso" />

        <TextField margin="normal" type="text" name="estatura" label="Estatura"
          onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese la estatura" />


      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleCancelar}>Cancelar</Button>
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

export default AsignarControlFisico;