import { Box, Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from "@mui/icons-material/Home";

import MenuIcon from "@mui/icons-material/Menu";
import CustomButton from "./CustomButton";
import { useNavigate } from "react-router-dom";
import AccountPopover from "./AccountPopover";
import { CartContext } from "../components/cliente/carrito/ShoppingCartContext";
import RegistroClienteModal from "./RegistroClienteModal";
import { procesarPeticionGet } from "../utils/HandleApi";

const url = "https://elasticbeanstalk-us-east-1-416927159758.s3.amazonaws.com/images/";

function Navbar({ cliente }) {

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

  const [showModal, setShowModal] = useState(false);

  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "Shift")
    ) {
      return;
    }

    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Inicio", "Planes", "Productos"].map(
          (text, index) => (
            <ListItem key={text} disablePadding >
              <ListItemButton onClick={() => text == "Inicio" ? navigate("/home") : navigate("/home/" + text.toLowerCase())}>
                <ListItemIcon>
                  {index === 0 && <HomeIcon />}
                  {index === 1 && <FeaturedPlayListIcon />}
                  {index === 2 && <CategoryIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          )
        )}
      </List>
    </Box>
  );


  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#fff",
    },
  }));

  const NavbarLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const CustomMenuIcon = styled(MenuIcon)(({ theme }) => ({
    cursor: "pointer",
    display: "none",
    marginRight: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      display: "block",
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const [cart, setCart] = useContext(CartContext);


  return (
    <div>

      <NavbarContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CustomMenuIcon onClick={toggleDrawer("left", true)} />
            <Drawer
              anchor="left"
              open={mobileMenu["left"]}
              onClose={toggleDrawer("left", false)}
            >

              {list("left")}

            </Drawer>
            <NavbarLogo src={data != null ? (url + data.logo_empresa) : undefined} alt="Logo empresa" width={"120px"} height={"60px"} onClick={() => navigate("/home")} />

          </Box>

          <NavbarLinksBox>
            <NavLink variant="body2" onClick={() => navigate("/home")}>Inicio</NavLink>
            <NavLink variant="body2" onClick={() => navigate("/home/planes")}>Planes</NavLink>
            <NavLink variant="body2" onClick={() => navigate("/home/productos")}>Productos</NavLink>
            {cart.length > 0 && <NavLink variant="body2" onClick={() => navigate("/home/carrito")}>Carrito de Compras</NavLink>}
          </NavbarLinksBox>
        </Box>

        {cliente != null
          ? <AccountPopover cliente={cliente} />
          : <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <NavLink variant="body2" onClick={() => navigate("/login")}>Iniciar sesión</NavLink>

            <div onClick={() => setShowModal(true)}>
              <CustomButton
                backgroundColor="#0F1B4C"
                color="#fff"
                buttonText="Registro"
              />
            </div>
          </Box>
        }

      </NavbarContainer>

      {showModal && (
        <RegistroClienteModal
          showModal={showModal}
          setShowModal={setShowModal}
        />
      )}

    </div>
  )
}

export default Navbar;