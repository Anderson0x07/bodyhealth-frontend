import React, { useState } from 'react';
import { procesarPeticionPut } from '../../../utils/HandleApi';
import Swal from 'sweetalert2';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  TextField
} from '@mui/material';
import { PhotoCamera, Save } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { esMayorDe18 } from '../../../utils/esMayorDe15';

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function EditarEntrenadorModal(props) {

  const { entrenador, showModalEditarEntrenador, setShowModalEditarEntrenador, onUpdate } = props;

  const [fileName, setFileName] = useState(null);
  const [image, setImage] = useState(url + entrenador.foto);
  const [previsualizar, setPrevisualizar] = useState(url + entrenador.foto);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState(entrenador);
  const [jornada, setJornada] = useState(entrenador.jornada);

  const handleJornada = (event) => {
    setJornada(event.target.value);
  }

  const handleImageUpload = (event) => {
    const reader = new FileReader();
    const file = event.target.files[0];
    setFileName(file.name)
    reader.onload = (event) => {
      const base64String = event.target.result.split(',')[1];
      setImage(base64String);
      const previsualizar = event.target.result;
      setPrevisualizar(previsualizar);

    };

    reader.readAsDataURL(file);
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCancelar = () => {
    setShowModalEditarEntrenador(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (jornada === 'S') {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'Atención',
        text: 'Debe seleccionar una jornada',
        icon: 'warning'
      })

    } else if (!esMayorDe18(data.fecha_nacimiento)) {
      Swal.fire({
        customClass: {
          container: 'my-swal'
        },
        title: 'Atención',
        text: 'Debes ser mayor a 18 años',
        icon: 'warning'
      })

    } else {
      data.jornada = jornada;

      if (!image.startsWith("https")) {
        data.foto = image + " " + fileName;
      }
      setLoading(true);
      try {
        const respuesta = await procesarPeticionPut(`entrenador/editar/${entrenador.id_usuario}`, data);
        setLoading(false);

        Swal.fire({
          customClass: {
            container: 'my-swal'
          },
          title: 'Información',
          text: respuesta.data.message,
          icon: 'success'
        })

        setShowModalEditarEntrenador(false);
        onUpdate(respuesta.data.entrenador);

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


    }
  };
  return (
    <Dialog open={showModalEditarEntrenador} onClose={handleCancelar} >
      <DialogTitle>Editar entrenador</DialogTitle>
      <DialogContent>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField margin="normal" type="text" name="tipo_documento" label="Tipo de documento" onChange={handleChange}
              fullWidth variant="outlined" defaultValue={entrenador.tipo_documento}
              InputProps={{
                readOnly: true,
              }} />

          </Grid>
          <Grid item xs={6}>
            <TextField margin="normal" type="number" name="documento" label="Documento"
              fullWidth onChange={handleChange} defaultValue={entrenador.documento} variant="outlined"
              InputProps={{
                readOnly: true,
              }} />
          </Grid>
        </Grid>

        <TextField margin="normal" type="text" name="nombre" label="Nombre"
          onChange={handleChange} defaultValue={entrenador.nombre} fullWidth variant="outlined" />

        <TextField margin="normal" type="text" name="apellido" label="Apellido"
          onChange={handleChange} defaultValue={entrenador.apellido} fullWidth variant="outlined" />

        <TextField margin="normal" type="text" name="telefono" label="Teléfono"
          onChange={handleChange} defaultValue={entrenador.telefono} fullWidth variant="outlined" />

        <TextField margin="normal" type="date" name="fecha_nacimiento"
          onChange={handleChange} defaultValue={entrenador.fecha_nacimiento} fullWidth variant="outlined" label="Fecha de nacimiento" />

        <TextField margin="normal" type="email" name="email" label="Email"
          onChange={handleChange} defaultValue={entrenador.email} fullWidth variant="outlined" />

        <TextField name="jornada" margin="normal" select label="Jornada" onChange={handleJornada}
          fullWidth variant="outlined" defaultValue={entrenador.jornada} helperText="Por favor seleccione jornada">
          <MenuItem key="S" value="S">Seleccionar</MenuItem>
          <MenuItem key="M" value="Manana">Mañana</MenuItem>
          <MenuItem key="T" value="Tarde">Tarde</MenuItem>
        </TextField>

        <TextField margin="normal" type="text" name="experiencia" label="Experiencia"
          fullWidth onChange={handleChange} defaultValue={entrenador.experiencia} variant="outlined"
          InputProps={{
            readOnly: true,
          }} />

        <TextField margin="normal" type="text" name="titulo_academico" label="Titulo academico"
          fullWidth onChange={handleChange} defaultValue={entrenador.titulo_academico} variant="outlined"
          InputProps={{
            readOnly: true,
          }} />

        <TextField margin="normal" type="text" name="hoja_vida" label="Hoja de vida"
          fullWidth onChange={handleChange} defaultValue={entrenador.hoja_vida} variant="outlined"
          InputProps={{
            readOnly: true,
          }} />

        <Button variant="outlined" component="label" size="large" >
          Cambiar foto de perfil
          <input hidden accept="image/*" type="file" name="foto" onChange={handleImageUpload} />
        </Button>
        <IconButton color="primary" aria-label="upload picture" component="label">
          <input hidden accept="image/*" type="file" name='foto' onChange={handleImageUpload} />
          <PhotoCamera />
        </IconButton>

        {previsualizar && <Avatar style={{ margin: '0 auto', width: '200px', height: '200px' }} src={previsualizar} />}

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

export default EditarEntrenadorModal;