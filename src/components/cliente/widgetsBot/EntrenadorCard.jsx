import { Avatar, Stack, Typography } from '@mui/material';
import React from 'react'

export default function EntrenadorCard(props) {

  const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

  return (
    <>
      {props.entrenador.map((item) => (

        <>
          <div style={{
            color: "black",
            display: "flex",
            flexDirection: "column",
            width: "320px",
            backgroundColor: "#f0ecec",
            borderRadius: "8px",
            padding: "15px"

          }}>
            <Stack direction="row" alignItems={"center"} justifyContent={"space-between"} textAlign={"left"} spacing={2} >
              <Typography variant="subtitle2" noWrap>
                <Typography variant="subtitle2" noWrap>
                  {item.nombre}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Telefono: {item.telefono}
                </Typography>
                <Typography variant="subtitle2" noWrap>
                  Email: {item.email}
                </Typography>
                {item.titulo_academico != null &&
                  <Typography variant="subtitle2" noWrap>
                    Titulo: {item.titulo_academico}
                  </Typography>
                }
              </Typography>

              <Avatar alt={item.nombre} src={url + item.foto} sx={{ width: '80px', height: '80px' }} />
            </Stack>
          </div>
        </>

      ))}
    </>
  )
}
