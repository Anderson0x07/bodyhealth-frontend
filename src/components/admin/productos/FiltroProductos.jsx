import { FilterList } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { procesarPeticionGet } from '../../../utils/HandleApi';

function FiltroProductos({ getAll, setProductos, filtro, setFiltro, admin}) {


    const [openMenu, setOpenMenu] = useState(null);


    const handleOpenFilter = (event) => {
        setOpenMenu(event.currentTarget);
    }

    const handleCloseFilter = () => {
        setOpenMenu(null);
    }

    const filtrar = async (filtro) => {

        setFiltro(filtro)

        try {

            let response;

            if(admin){
                response = await procesarPeticionGet("producto/filtro/" + filtro);
            } else {
                response = await procesarPeticionGet("producto/filtro/activos/" + filtro);
            }
            
            setProductos(response.data.productos);
        } catch (error) {

            Swal.fire({
                title: 'Atención',
                text: 'No hay productos de ' + ((filtro == "BCAA") ? "BCAA (Aminoacidos)" : filtro),
                icon: 'error',
                customClass: {
                    container: 'my-swal'
                }
            });
            setOpenMenu(null)
            getAll();
            setFiltro("all")
        }
    }



    return (
        <>
            <Button disableRipple color="inherit" endIcon={<FilterList />} onClick={handleOpenFilter} >
                Filtros
            </Button>

            <Menu
                keepMounted
                anchorEl={openMenu}
                open={Boolean(openMenu)}
                onClose={handleCloseFilter}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >

                <MenuItem sx={{ typography: 'body2' }} onClick={() => getAll()} selected={filtro === "all"}>
                    Todos
                </MenuItem>

                <MenuItem sx={{ typography: 'body2' }} onClick={() => filtrar("Creatinas")} selected={filtro === "Creatinas"}>
                    Creatinas
                </MenuItem>

                <MenuItem onClick={() => filtrar("Proteinas en polvo")} sx={{ typography: 'body2' }} selected={filtro === "Proteinas en polvo"}>
                    Proteínas en polvo
                </MenuItem>

                <MenuItem onClick={() => filtrar("Pre-entrenos")} sx={{ typography: 'body2' }} selected={filtro === "Pre-entrenos"}>
                    Pre-entrenos
                </MenuItem>

                <MenuItem onClick={() => filtrar("BCAA (Aminoacidos)")} sx={{ typography: 'body2' }} selected={filtro === "BCAA (Aminoacidos)"}>
                    BCAA (Aminoácidos)
                </MenuItem>

                <MenuItem onClick={() => filtrar("Vitaminas")} sx={{ typography: 'body2' }} selected={filtro === "Vitaminas"}>
                    Vitaminas
                </MenuItem>


            </Menu>
        </>

    )
}

export default FiltroProductos