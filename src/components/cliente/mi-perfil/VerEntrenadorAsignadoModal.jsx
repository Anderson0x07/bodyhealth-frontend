import React from 'react';
import {
    Avatar,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Slide,
    TextField,
} from '@mui/material';
import { CheckCircleRounded, Receipt } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function VerEntrenadorAsignadoModal(props) {

    const { clienteEntrenador, showModalVerEntrenador, setShowModalVerEntrenador } = props;

    const handleCancelarAndOk = () => {
        setShowModalVerEntrenador(false);
    };

    return (
        <Dialog open={showModalVerEntrenador} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xs'}>
            <DialogTitle>Entrenador Asignado</DialogTitle>
            <DialogContent>

                {clienteEntrenador.map((row) => {
                    const { entrenador } = row;

                    return (
                        <>
                            <Avatar style={{ margin: '0 auto', width: '200px', height: '200px' }} src={url + entrenador.foto} />

                            <TextField margin="normal" type="text" label="Documento"
                                defaultValue={entrenador.tipo_documento + " - " + entrenador.documento} fullWidth variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} />

                            <TextField margin="normal" type="text" label="Nombres"
                                defaultValue={entrenador.nombre + " " + entrenador.apellido} fullWidth variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} />


                            <TextField margin="normal" type="text" label="Teléfono"
                                defaultValue={entrenador.telefono} fullWidth variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} />

                            <TextField margin="normal" type="text" label="Fecha de Nacimiento"
                                defaultValue={entrenador.fecha_nacimiento} fullWidth variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} />

                            <TextField margin="normal" type="email" label="Email"
                                defaultValue={entrenador.email} fullWidth variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }} />

                            <TextField margin="normal" type="text" label="Jornada" fullWidth variant="outlined" defaultValue={entrenador.jornada}
                                InputProps={{
                                    readOnly: true,
                                }} />

                            <TextField sx={{ mb: 5 }} margin="normal" type="text" label="Titulo acádemico"
                                fullWidth variant="outlined" defaultValue={entrenador.titulo_academico}
                                InputProps={{
                                    readOnly: true,
                                }} />

                            
                        </>
                    )
                })}

            </DialogContent>
            <DialogActions>
                <LoadingButton
                    color="secondary"
                    onClick={handleCancelarAndOk}
                    startIcon={<CheckCircleRounded />}
                    variant="contained"
                >
                    ¡Vale!
                </LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default VerEntrenadorAsignadoModal;