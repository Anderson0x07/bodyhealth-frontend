import React from 'react'
import { useState,useEffect } from 'react';
import { procesarPeticionPut,procesarPeticionGet } from '../../../utils/HandleApi';
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


function EditarEjercicioModal(props) {
 const { showEditModal, setShowEditModal, ejercicio, onUpdate } = props;

    const [data, setData] = useState(ejercicio);
    const [loading, setLoading] = useState(false);
    const [musculoSeleccionado, setMusculoSeleccionado] = useState(ejercicio.musculo.id_musculo)
    const [musculos, setMusculos] = useState(null)

    const getMusculos = async () => {
      try {
          const respuesta = await procesarPeticionGet(`musculo/all`);
          console.log(respuesta)
          setMusculos(respuesta.data.musculos)
          

      } catch (error) {
          console.log(error);
      }
  }
  useEffect(() => {
     
      getMusculos();

  }, [])

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleCancelar = () => {
        setShowEditModal(false);
    };

    const handleSubmit = async (event) => {
      event.preventDefault();

      data.musculo = {
          id_musculo: musculoSeleccionado
      }

      setLoading(true);
      console.log(data)
      try {
          const respuesta = await procesarPeticionPut(`ejercicio/editar/${ejercicio.id_ejercicio}`, data);
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
        
          setShowEditModal(false);
          onUpdate(respuesta.data.ejercicio);
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
    
    const handleMusculo = (event) => {
      setMusculoSeleccionado(event.target.value);
  }
    return (
         <Dialog open={showEditModal} onClose={handleCancelar} >
            <DialogTitle>Editar ejercicio</DialogTitle>
            <DialogContent>

            <TextField margin="normal" type="text" name="descripcion" label="Descripción"
                    onChange={handleChange} defaultValue={ejercicio.descripcion} fullWidth variant="outlined" />
                    
            <TextField margin="normal" type="text" name="series" label="Series"
                    onChange={handleChange} defaultValue={ejercicio.series} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="repeticiones" label="Repeticiones"
                    onChange={handleChange} defaultValue={ejercicio.repeticiones} fullWidth variant="outlined" />

                <TextField margin="normal" type="text" name="url_video" label="URL Video"
                    onChange={handleChange} defaultValue={ejercicio.url_video} fullWidth variant="outlined" />

                <TextField select margin="normal" type="text" name="musculo" label="Musculo" onChange={handleMusculo}
                    fullWidth variant="outlined" value={musculoSeleccionado} helperText="Por favor seleccione un musculo">
                    <MenuItem key="S" value="S">Seleccionar</MenuItem>
                    {musculos != null ? musculos.map((musculo) => (
                        <MenuItem key={musculo.id_musculo} value={musculo.id_musculo}>
                            {musculo.nombre}
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

export default EditarEjercicioModal
