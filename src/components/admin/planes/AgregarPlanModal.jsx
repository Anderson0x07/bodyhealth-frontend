import React, { useEffect, useState } from 'react';
import { procesarPeticionGet, procesarPeticionPost } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, MenuItem, OutlinedInput, TextField, InputLabel } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Save } from '@mui/icons-material';

function AgregarPlanModal(props) {
  const { showModal, setShowModal, agregarPlanes } = props;

    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);


    const handleCancelar = () => {
      setShowModal(false);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
      setLoading(true);
      console.log(data)
      try {
          const respuesta = await procesarPeticionPost(`plan/guardar`, data);
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

          const response = await procesarPeticionGet("plan/all");

          agregarPlanes(response.data.planes);

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
  return (
    <Dialog open={showModal} onClose={handleCancelar} >
    <DialogTitle>Agregar plan</DialogTitle>
    <DialogContent>
        <TextField margin="normal" type="text" name="plan" label="Nombre del plan"
            onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el plan" />

        <TextField margin="normal" type="text" name="meses" label="Meses"
            onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese la duracion del plan" />

        <TextField margin="normal" type="text" name="precio" label="Precio"
            onChange={handleChange} fullWidth variant="outlined" helperText="Por favor ingrese el precio del plan" />
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

export default AgregarPlanModal
