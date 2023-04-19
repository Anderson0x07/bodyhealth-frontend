import { Suspense, useState } from 'react';
// @mui
import { alpha, styled } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function AccountPopover({ cliente }) {

  const navigate = useNavigate();

  const [open, setOpen] = useState(null);


  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    window.location.reload();

  }

  const handleMiPerfil = () => {
    console.log("MI PERFIL cliente")
    console.log(cliente)
    navigate("/home/mi-perfil")
  }


  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
  }));

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <IconButton
          onClick={handleOpen}
          sx={{
            p: 0,
            ...(open && {
              '&:before': {
                zIndex: 1,
                content: "''",
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                position: 'absolute',
              },
            }),
          }}
        >
          <StyledAccount>
            <Avatar src={url + cliente.foto} alt="photoURL" />
            <Typography variant="subtitle2" noWrap>
              {cliente.nombre + " " + cliente.apellido}
            </Typography>
          </StyledAccount>
        </IconButton>

        <Popover
          open={Boolean(open)}
          anchorEl={open}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          transformOrigin={{ vertical: 'top', horizontal: 'center' }}
          PaperProps={{
            sx: {
              p: 0,
              mt: 1.5,
              ml: 0.75,
              width: 180,
              '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
              },
            },
          }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle2" noWrap>
              {cliente.nombre + " " + cliente.apellido}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {cliente.email}
            </Typography>
          </Box>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack sx={{ p: 1 }}>

            <MenuItem onClick={() => {
              navigate("/home");
              setOpen(null);
            }}>Inicio</MenuItem>
            <MenuItem onClick={handleMiPerfil}>Mi Perfil</MenuItem>

          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
            Cerrar sesión
          </MenuItem>
        </Popover>

      </Suspense>
    </>
  );
}

export default AccountPopover;
