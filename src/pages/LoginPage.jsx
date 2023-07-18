import React, { useState } from 'react'
import { procesarPeticionPost } from '../utils/HandleApi';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField, InputAdornment, IconButton, Alert, AlertTitle, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';


import { Facebook, Google, Login, Save, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import useResponsive from '../utils/useResponsive'

import img from '../assets/image-login.png'
import { LoadingButton } from '@mui/lab';
import CambiarPasswordModal from '../components/cliente/mi-perfil/CambiarPasswordModal';
import ModalCambioPassword from './ModalCambioPassword';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex',
    },
}));

const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------


function LoginPage() {
    const mdUp = useResponsive('up', 'md');

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [changePassword, setChangePassword] = useState(false)


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');

    const [showModalCambioPassword, setShowModalCambioPassword] = useState(false);

    const data = {};

    const [showModalToken, setShowModalToken] = useState(false);



    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        setLoading(true)

        try {
            const response = await procesarPeticionPost("login", {
                email: email,
                password: password
            }, null);

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('email', response.data.username);
            localStorage.setItem('rol', response.data.rol);
            localStorage.setItem('isAuthenticated', true);

            setLoading(false);

            if (response.data.rol === "ROLE_ADMIN") {
                navigate('/admin/dashboard/home', { replace: true });
                window.location.reload();
            }
            if (response.data.rol === "ROLE_TRAINER") {
                navigate('/entrenador/dashboard/home', { replace: true });
                window.location.reload();
            }
            if (response.data.rol === "ROLE_CLIENTE") {
                navigate('/home', { replace: true });
                window.location.reload();
            }



        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }
    };


    const handleOlvido = () => {
        setShowModalCambioPassword(true);
        setChangePassword(true);
    }

    const handleIntroducirToken = () => {
        setChangePassword(true);
        setShowModalToken(true)
    }

    return (
        <>
            <StyledRoot>
                {mdUp && (
                    <StyledSection>
                        <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                            Hola, bienvenido!
                        </Typography>
                        <img src={img} alt="login" />
                    </StyledSection>
                )}

                <Container maxWidth="md">
                    <StyledContent>
                        <Typography variant="h4" gutterBottom>
                            Iniciar sesión
                        </Typography>

                        <Typography variant="body2" sx={{ mb: 5 }}>
                            ¿No tienes cuenta? {''}
                            <Link variant="subtitle2" onClick={() => navigate('/')}>Registrate aquí</Link>
                        </Typography>



                        <>
                            <Stack spacing={3}>
                                <TextField name="username" label="Dirección de correo electrónico" value={email} onChange={handleEmailChange} />

                                <TextField
                                    name="password"
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}

                                    value={password} onChange={handlePasswordChange}
                                />
                            </Stack>

                            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
                                <Typography></Typography>

                                {!changePassword ?
                                    <Link variant="subtitle2" underline="hover" onClick={handleOlvido}>
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                    :
                                    <Link variant="subtitle2" underline="hover" onClick={handleIntroducirToken}>
                                        Cambia tu contraseña aqui
                                    </Link>
                                }
                            </Stack>

                            <LoadingButton
                                fullWidth
                                size="large"
                                variant="contained"
                                onClick={handleLogin}
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<Login />}

                            >
                                Iniciar sesion
                            </LoadingButton>

                            {error !== '' && (
                                <Alert sx={{ mt: '20px' }} variant="outlined" severity="error">
                                    <AlertTitle>Error</AlertTitle>
                                    {error}
                                </Alert>
                            )}
                        </>
                    </StyledContent>


                    {/* MODAL PARA BUSCAR EMAIL Y ENVIAR TOKEN */}
                    {showModalCambioPassword && (
                        <ModalCambioPassword
                            changePassword={changePassword}
                            setChangePassword = {setChangePassword}
                            showModalCambioPassword={showModalCambioPassword}
                            setShowModalCambioPassword={setShowModalCambioPassword}
                        />
                    )}


                    {/* MODAL PARA CAMBIAR CONTRASEÑA */}
                    {showModalToken && (
                        <CambiarPasswordModal
                            cliente={data}
                            showModalCambioPassword={showModalToken}
                            setShowModalCambioPassword={setShowModalToken}
                        />
                    )}



                </Container>
            </StyledRoot>
        </>
    );
}


export default LoginPage;