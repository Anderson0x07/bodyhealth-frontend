import { EmailTwoTone, Facebook, Instagram, WhatsApp } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

function Footer({data}) {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 2
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
            <Box width={"100%"} mt={3} pb={5}>
                <Typography
                    variant="body2"
                    sx={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#5A6473",
                        textAlign: 'center'
                    }}
                >
                    © {new Date().getFullYear() + " " + (data != null && data.nombre_empresa) + ". Todos los derechos reservados."}

                </Typography>

                <Typography
                    sx={{
                        textAlign: 'center'
                    }}
                >
                    <IconButton
                        component="a"
                        href={data != null ? data.url_instagram : undefined}
                        target="_blank"
                    >
                        <Instagram />
                    </IconButton>
                    <IconButton
                        component="a"
                        href={data != null ? data.url_facebook : undefined}
                        target="_blank"
                    >
                        <Facebook />
                    </IconButton>
                    <IconButton
                        component="a"
                        href={data != null ? data.url_whatsapp : undefined}
                        target="_blank"
                    >
                        <WhatsApp />
                    </IconButton>
                    <IconButton
                        component="a"
                        href={data != null ? data.url_tiktok : undefined}
                        target="_blank"
                    >
                        <i className="fa-brands fa-tiktok"></i>
                    </IconButton>

                    <IconButton
                        component="a"
                        href={data != null ? ("mailto:" + data.email + "?subject=Solicitud%20de%20Descuento%20Cliente%20Nuevo&body=Cordial%20Saludo,%20") : undefined}
                        target="_blank"
                    >
                        <EmailTwoTone />
                    </IconButton>


                </Typography>

            </Box>
        </Box>
    )
}

export default Footer