import { Route, Routes, useNavigate } from 'react-router-dom';

import Clientes from '../pages/admin/clientes/Clientes';
import Configuracion from '../pages/admin/configuracion/Configuracion';
import Entrenadores from '../pages/admin/entrenadores/Entrenadores';
import FactPedidos from '../pages/admin/fact-pedidos/FactPedidos';
import FactPlanes from '../pages/admin/fact-planes/FactPlanes';
import HomeAdmin from '../pages/admin/HomeAdmin';
import Maquinas from '../pages/admin/maquinas/Maquinas';
import Page404 from '../pages/admin/Page404';
import Productos from '../pages/admin/productos/Productos';
import Proveedores from '../pages/admin/proveedores/Proveedores';
import Cliente from '../components/admin/clientes/Cliente';
import Producto from '../components/admin/productos/Producto';
import Maquina from '../components/admin/maquinas/Maquina';
import Proveedor from '../components/admin/proveedores/Proveedor';
import Musculos from '../pages/admin/musculos/Musculos';
import Ejercicios from '../pages/admin/ejercicios/Ejercicios';
import Ejercicio from '../components/admin/ejercicios/Ejercicio';
import LoginPage from '../pages/LoginPage';
import Musculo from '../components/admin/musculos/Musculo';
import Rutinas from '../pages/admin/rutinas/Rutinas';
import Rutina from '../components/admin/rutinas/Rutina';
import Planes from '../pages/admin/planes/Planes';
import Plan from '../components/admin/planes/Plan';
import MetodosPago from '../pages/admin/metodo-pago/MetodosPago';
import { ProtectedRouteAdmin } from './ProtectedRoute';
import { useEffect, useState } from 'react';
import { procesarPeticionGet } from '../utils/HandleApi';
import Home from '../pages/Home';
import DashboardAdmin from '../layouts/dashboard-admin/DashboardAdmin';
import DashboardEntrenador from '../layouts/dashboard-trainer/DashboardEntrenador';
import Entrenador from '../components/admin/entrenadores/Entrenador';
import ProfilePage from '../pages/admin/ProfilePage';
import HomeEntrenador from '../pages/entrenador/HomeEntrenador';
import ClientesEntrenador from '../pages/entrenador/clientes/ClientesEntrenador';
import ClienteEntrenador from '../components/entrenador/clientes/ClienteEntrenador';
import MusculosEntrenador from '../pages/entrenador/musculos/MusculosEntrenador';
import MusculoEntrenador from '../components/entrenador/musculos/MusculoEntrenador';
import EjerciciosEntrenador from '../pages/entrenador/ejercicios/EjerciciosEntrenador';
import EjercicioEntrenador from '../components/entrenador/ejercicios/EjercicioEntrenador';
import RutinasEntrenador from '../pages/entrenador/rutinas/RutinasEntrenador';
import RutinaEntrenador from '../components/entrenador/rutinas/RutinaEntrenador';
import Horario from '../pages/entrenador/Horario';
import MiPerfilCliente from '../pages/cliente/MiPerfilCliente';
import PlanesCliente from '../pages/cliente/PlanesCliente';
import ProductosCliente from '../pages/cliente/ProductosCliente';
import { ShoppingCartProvider } from '../components/cliente/carrito/ShoppingCartContext';
import CarritoCliente from '../pages/cliente/CarritoCliente';
import HorarioAdmin from '../pages/admin/HorarioAdmin';
import MiPerfilEntrenador from '../pages/entrenador/MiPerfilEntrenador';




const email = localStorage.getItem('email');

function RutasRoles() {

    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isAuthenticated'));

    useEffect(() => {
        const getUser = async () => {
            if (email != null) {
                try {
                    const response = await procesarPeticionGet(`usuario/login/${encodeURIComponent(email)}`);
                    setUsuario(response.data.usuario);
                    console.log(response)
                } catch (error) {
                    localStorage.clear();
                    navigate("/bodyhealth-frontend/home");
                }
            } else {
                navigate("/bodyhealth-frontend/home");
            }
        }

        getUser();
    }, [])

    useEffect(() => {
        if (localStorage.length === 0) {
            navigate("/bodyhealth-frontend/");
            setIsLoading(false);
        } else {
            if (isAuthenticated == 'true' && usuario != null) {
                setIsLoading(false);
            }
        }

    }, [isAuthenticated, usuario]);


    return (
        <div >

            {isLoading
                ? <h2>Cargando...</h2>

                :
                <ShoppingCartProvider>
                    <Routes>

                        {/* RUTAS PARA ADMINISTRADOR PROTEGIDAS */}
                        <Route element={<ProtectedRouteAdmin isAllowed={isAuthenticated && usuario.rol.nombre === "ADMIN"} redirectTo="/home" />}>
                            <Route path='/bodyhealth-frontend/admin/dashboard' element={<DashboardAdmin admin={usuario} />}>
                                <Route exact path="home" element={<HomeAdmin admin={usuario} />} />
                                <Route exact path="clientes" element={<Clientes />} />
                                <Route exact path="clientes/:id" element={<Cliente />} />
                                <Route exact path="entrenadores" element={<Entrenadores />} />
                                <Route exact path="entrenador/:id" element={<Entrenador />} />
                                <Route exact path="planes" element={<Planes />} />
                                <Route exact path="planes/:id" element={<Plan />} />
                                <Route exact path="maquinas" element={<Maquinas />} />
                                <Route exact path="maquinas/:id" element={<Maquina />} />
                                <Route exact path="productos" element={<Productos />} />
                                <Route exact path="productos/:id" element={<Producto />} />
                                <Route exact path="proveedores" element={<Proveedores />} />
                                <Route exact path="proveedores/:id" element={<Proveedor />} />
                                <Route exact path="musculos" element={<Musculos />} />
                                <Route exact path="musculos/:id" element={<Musculo />} />
                                <Route exact path="ejercicios" element={<Ejercicios />} />
                                <Route exact path="ejercicios/:id" element={<Ejercicio />} />
                                <Route exact path="rutinas" element={<Rutinas />} />
                                <Route exact path="rutinas/:id" element={<Rutina />} />
                                <Route exact path="metodospago" element={<MetodosPago />} />
                                <Route exact path="fact-pedidos" element={<FactPedidos />} />
                                <Route exact path="fact-planes" element={<FactPlanes />} />
                                <Route exact path="horarios" element={<HorarioAdmin/>} />
                                <Route exact path="configuracion" element={<Configuracion />} />
                                <Route exact path="mi-perfil" element={<ProfilePage admin={usuario} />} />
                                <Route exact path="*" element={<Page404 />} />
                            </Route>
                        </Route>


                        {/* RUTAS PARA ENTRENADOR PROTEGIDAS */}
                        <Route element={<ProtectedRouteAdmin isAllowed={isAuthenticated && usuario.rol.nombre === "TRAINER"} redirectTo="/home" />}>
                            <Route path='/bodyhealth-frontend/entrenador/dashboard' element={<DashboardEntrenador entrenador={usuario} />}>
                                <Route exact path="home" element={<HomeEntrenador entrenador={usuario}/>} />
                                <Route exact path="clientes" element={<ClientesEntrenador entrenador={usuario} />} />
                                <Route exact path="clientes/:id" element={<ClienteEntrenador />} />
                                <Route exact path="musculos" element={<MusculosEntrenador />} />
                                <Route exact path="musculos/:id" element={<MusculoEntrenador />} />
                                <Route exact path="ejercicios" element={<EjerciciosEntrenador />} />
                                <Route exact path="ejercicios/:id" element={<EjercicioEntrenador />} />
                                <Route exact path="rutinas" element={<RutinasEntrenador />} />
                                <Route exact path="rutinas/:id" element={<RutinaEntrenador />} />
                                <Route exact path="mi-perfil" element={<MiPerfilEntrenador entrenador={usuario}/>} />
                                <Route exact path="horario" element={<Horario entrenador={usuario}/>} />
                            </Route>
                        </Route>

                        {/* RUTAS PARA EL CLIENTE */}
                        <Route element={<ProtectedRouteAdmin isAllowed={isAuthenticated && usuario.rol.nombre === "CLIENTE"} redirectTo="/login" />}>
                            <Route exact path="/bodyhealth-frontend/home" element={<Home cliente={usuario} />} />
                            <Route exact path="/bodyhealth-frontend/home/planes" element={<PlanesCliente cliente={usuario} />} />
                            <Route exact path="/bodyhealth-frontend/home/productos" element={<ProductosCliente cliente={usuario} />} />
                            <Route exact path="/bodyhealth-frontend/home/mi-perfil" element={<MiPerfilCliente cliente={usuario} />} />
                            <Route path="/bodyhealth-frontend/home/carrito" element={<CarritoCliente cliente={usuario} />} />

                        </Route>

                        {/* PAGINA DE LOGIN */}
                        <Route exact path='/bodyhealth-frontend/login' element={<LoginPage />} />

                        {/* PAGINA HOME */}
                        <Route element={<ProtectedRouteAdmin isAllowed={localStorage.length == 0} redirectTo="/bodyhealth-frontend/home" />}>
                            <Route path="/bodyhealth-frontend/" element={<Home />} />
                        </Route>
                        
                        <Route path='/bodyhealth-frontend/*' element={<Page404 />} />

                    </Routes>

                </ShoppingCartProvider>
            }


        </div>
    )
}

export default RutasRoles;