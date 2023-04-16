import React, { useEffect, useState } from 'react';
import {
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    Slide,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { CheckCircleRounded, OpenInNewRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { procesarPeticionGet } from '../../../utils/HandleApi';

// ----------------------------------------------------------------------

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function VerRutinasAsignadasModal(props) {

    const { clienteRutinas, showModalRutinasCliente, setShowModalRutinasCliente } = props;


    const [rutinasCompletas, setRutinasCompletas] = useState([]);
    const [termina, setTermina] = useState(false);


    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const getRutina = async () => {
            for (let i = 0; i < clienteRutinas.length; i++) {
                try {
                    const response = await procesarPeticionGet('rutina/ejercicios/' + clienteRutinas[i].rutina.id_rutina);
                    rutinasCompletas[i] = response.data.rutina;
                } catch (error) {
                    console.log(error)
                }
            }
            setTermina(true);
        }

        getRutina();

    }, []);

    useEffect(() => {
        if (termina && rutinasCompletas.length > 0) {
            setIsLoading(false);
        }
    }, [termina]);


    const handleCancelarAndOk = () => {
        setShowModalRutinasCliente(false);
    };

    const handleAbrirRecurso = (url_video) => {
        window.open(url_video, '_blank');
    }

    return (

        <div>
            {isLoading && (<div>Cargando</div>)}

            <Dialog open={showModalRutinasCliente} onClose={handleCancelarAndOk} TransitionComponent={Transition} maxWidth={'xl'}>
                <DialogTitle>Rutinas Asignadas</DialogTitle>

                <DialogContent>
                    <>
                        {rutinasCompletas.length > 0
                            ?
                            rutinasCompletas.map((rutina) => {
                                if (rutina != null) {
                                    const { id_rutina, nombre_rutina } = rutina;
                                    return (
                                        <Container key={id_rutina}>
                                            {rutina.rutinaEjercicios.length > 0
                                                ?
                                                <Container sx={{ mb: 2 }} key={id_rutina}>
                                                    <Typography variant="subtitle2" align="center" >
                                                        {nombre_rutina}
                                                    </Typography>
                                                    <Table>
                                                        <TableHead>
                                                            <TableRow hover >
                                                                <TableCell align="center"># Ejercicio</TableCell>
                                                                <TableCell align="center">Musculo</TableCell>
                                                                <TableCell align="center">Ejercicio</TableCell>
                                                                <TableCell align="center">Series</TableCell>
                                                                <TableCell align="center">Repeticiones</TableCell>
                                                                <TableCell align="center">Abrir recurso</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {rutina.rutinaEjercicios.map((row) => {
                                                                const { ejercicio } = row;
                                                                return (
                                                                    <TableRow hover key={ejercicio.id_ejercicio} >
                                                                        <TableCell align="center">{ejercicio.id_ejercicio}</TableCell>
                                                                        <TableCell align="center">{ejercicio.musculo.nombre}</TableCell>
                                                                        <TableCell align="center">{ejercicio.descripcion}</TableCell>
                                                                        <TableCell align="center">{ejercicio.series}</TableCell>
                                                                        <TableCell align="center">{ejercicio.repeticiones}</TableCell>
                                                                        <TableCell align="center">
                                                                            <IconButton size="large" color="inherit" onClick={() => handleAbrirRecurso(ejercicio.url_video)}>
                                                                                <OpenInNewRounded />
                                                                            </IconButton>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                );
                                                            })

                                                            }
                                                        </TableBody>

                                                    </Table>
                                                </Container>
                                                : console.log("cargando tablas")
                                            }
                                        </Container>
                                    )
                                }
                            })
                            : console.log("cargando rutinas")
                        }
                    </>
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
        </div>
    )
}

export default VerRutinasAsignadasModal;