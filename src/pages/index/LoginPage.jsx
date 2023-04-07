import React, { useState } from 'react'
import { procesarPeticionPost } from '../../utils/HandleApi';

// @mui
import { styled } from '@mui/material/styles';
import { Link, Container, Typography, Divider, Stack, Button, TextField, InputAdornment, IconButton, Checkbox, Alert, AlertTitle } from '@mui/material';


import { Facebook, Google, Login, Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import useResponsive from '../../utils/useResponsive'

import img from '../../assets/image-login.png'
import { LoadingButton } from '@mui/lab';

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

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const [error, setError] = useState('');


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

            console.log(response);

            localStorage.setItem('token', response.data.token);

            setLoading(false)

            navigate('/admin/dashboard/home', { replace: true });

        } catch (error) {
            setError(error.response.data.message)
            setLoading(false)
        }

    };


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
                            <Link variant="subtitle2">Registrate aquí</Link>
                        </Typography>

                        <Stack direction="row" spacing={2}>
                            <Button fullWidth size="large" color="inherit" variant="outlined">
                                <Google />
                            </Button>

                            <Button fullWidth size="large" color="inherit" variant="outlined">
                                <Facebook />
                            </Button>
                        </Stack>

                        <Divider sx={{ my: 3 }}>
                            <Typography variant="body2">
                                ó
                            </Typography>
                        </Divider>

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
                                <Link variant="subtitle2" underline="hover">
                                    ¿Olvidaste tu contraseña?
                                </Link>
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
                </Container>
            </StyledRoot>
        </>
    );
}


export default LoginPage;