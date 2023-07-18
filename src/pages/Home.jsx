import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { Box, Container, Typography, styled } from '@mui/material'
import { FitnessCenter, Newspaper, ShoppingCart, ArrowRightAlt } from '@mui/icons-material'
import CustomButton from './CustomButton';

import Noticias from './HomeNoticia';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { procesarPeticionGet } from '../utils/HandleApi';
import Footer from './Footer';
import Chat from '../components/cliente/Chat';

import '../components/cliente/bot/chatbot.css'

function Home({ cliente }) {

    const navigate = useNavigate();

    const [data, setData] = useState(null);

    //USEEFFECT INFO BASICA
    const getInfo = async () => {
        try {
            const respuesta = await procesarPeticionGet(`infobasica/${1}`);
            setData(respuesta.data.infobasica);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getInfo();
    }, []);



    const CustomBox = styled(Box)(({ theme }) => ({
        display: "flex",
        justifyContent: "center",
        gap: theme.spacing(5),
        marginTop: theme.spacing(3),
        paddingBottom: theme.spacing(4),
        [theme.breakpoints.down("md")]: {
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
        },
    }));

    const Title = styled(Typography)(({ theme }) => ({
        fontSize: "64px",
        color: "#000336",
        fontWeight: "bold",
        margin: theme.spacing(4, 0, 4, 0),
        [theme.breakpoints.down("sm")]: {
            fontSize: "40px",
        },
    }));


    return (
        <>
            <Box sx={{ backgroundColor: "#E6F0FF", minHeight: "80vh" }}>
                <Container>
                    <Navbar cliente={cliente} />
                    <CustomBox>
                        <Box sx={{ flex: "1" }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: "18px",
                                    color: "#687690",
                                    fontWeight: "500",
                                    mt: 10,
                                    mb: 4,
                                }}
                            >
                                Bienvenido a {data != null ? data.nombre_empresa : false}
                            </Typography>

                            <Title variant='h1'>
                                Descubre el mejor lugar para entrenar y estar saludable.
                            </Title>
                            <Typography
                                variant="body2"
                                sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
                            >
                                Atrévete a DARLA TODA EN {data != null ? data.nombre_empresa : false}
                            </Typography>

                            <div onClick={() => navigate("/home/planes")}>
                                <CustomButton
                                    backgroundColor="#0F1B4C"
                                    color="#fff"
                                    buttonText="Ver planes"
                                    heroBtn={true}
                                />
                            </div>
                        </Box>
                        <Box sx={{ flex: "1.25" }}>
                            <img
                                src={"https://img.freepik.com/foto-gratis/hombre-fuerte-entrenando-gimnasio_1303-23478.jpg"}
                                alt="heroImg"
                                style={{ maxWidth: "100%", marginTop: "6rem" }}
                            />
                        </Box>
                    </CustomBox>
                </Container>
            </Box>



            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 5
                }}
            >
                <div
                    style={{
                        width: "5%",
                        height: "5px",
                        backgroundColor: "#000339",
                        margin: "0 auto",
                    }}
                ></div>

                <Typography
                    variant="h3"
                    sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
                >
                    ¿QUIENES SOMOS?
                </Typography>

                <Box width={"80%"}>
                    <Typography
                        variant="body2"
                        sx={{
                            fontSize: "16px",
                            fontWeight: "500",
                            color: "#5A6473",
                            textAlign: "center",
                        }}
                    >
                        {data != null && data.pie_pagina}
                    </Typography>
                </Box>

                <Box display={"flex"} justifyContent={"space-around"} width={"70%"} m={5}>
                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} marginTop={5}>
                        <ShoppingCart sx={{ fontSize: "6rem" }} />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: "500",
                                fontSize: "20px",
                                color: "#3B3c45",
                                my: 1,
                            }}
                        >
                            Productos
                        </Typography>
                        <Box
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
                                onClick={() => navigate("/home/productos")}
                            >
                                Ir a comprar
                            </Typography>
                            <ArrowRightAlt style={{ color: "#0689FF" }} />
                        </Box>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} marginTop={5}>
                        <FitnessCenter sx={{ fontSize: "6rem" }} />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: "500",
                                fontSize: "20px",
                                color: "#3B3c45",
                                my: 1,
                            }}
                        >
                            Planes
                        </Typography>
                        <Box
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
                                onClick={() => navigate("/home/planes")}
                            >
                                Ver planes
                            </Typography>
                            <ArrowRightAlt style={{ color: "#0689FF" }} />
                        </Box>
                    </Box>

                    <Box display={"flex"} flexDirection={"column"} alignItems={"center"} marginTop={5}>
                        <Newspaper sx={{ fontSize: "6rem" }} />
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: "500",
                                fontSize: "20px",
                                color: "#3B3c45",
                                my: 1,
                            }}
                        >
                            Noticias
                        </Typography>
                        <Box
                            sx={{
                                cursor: "pointer",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{ fontWeight: "bold", fontSize: "14px", color: "#0689FF" }}
                                onClick={() => Swal.fire('Atención', 'Por implementar sección de noticias..', 'warning')}
                            >
                                Ver noticias
                            </Typography>
                            <ArrowRightAlt style={{ color: "#0689FF" }} />
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Noticias />


            <Box sx={{ backgroundColor: "#E6F0FF" }} mt={5} >
                <Container>
                    <Navbar cliente={cliente} />

                    <Footer data={data} />
                    
                    <div className="estilo-card">
                        <Chat />
                    </div>
                    
                </Container>
            </Box>


        </>
    )
}

export default Home