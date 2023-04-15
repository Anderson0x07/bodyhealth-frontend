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
import Index from '../pages/cliente/Index';
import Home from '../pages/Home';
import DashboardAdmin from '../layouts/dashboard-admin/DashboardAdmin';
import DashboardEntrenador from '../layouts/dashboard-trainer/DashboardEntrenador';
import Entrenador from '../components/admin/Entrenadores/Entrenador';
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
                }
            } else {
                localStorage.clear();
                navigate("/login");
            }
        }

        getUser();
    }, [])

    useEffect(() => {
        if (localStorage.length === 0) {
            navigate("/login");
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

                <Routes>

                    {/* RUTAS PARA ADMINISTRADOR PROTEGIDAS */}
                    <Route element={<ProtectedRouteAdmin isAllowed={isAuthenticated && usuario.rol.nombre === "ADMIN"} redirectTo="/home" />}>
                        <Route path='/admin/dashboard' element={<DashboardAdmin admin={usuario} />}>
                            <Route exact path="home" element={<HomeAdmin />} />
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
                            <Route exact path="configuracion" element={<Configuracion />} />
                            <Route exact path="mi-perfil" element={<ProfilePage admin={usuario} />} />
                            <Route exact path="*" element={<Page404 />} />
                        </Route>
                    </Route>


                    {/* RUTAS PARA ENTRENADOR PROTEGIDAS */}
                    <Route element={<ProtectedRouteAdmin isAllowed={isAuthenticated && usuario.rol.nombre === "TRAINER"} redirectTo="/home" />}>
                        <Route path='/entrenador/dashboard' element={<DashboardEntrenador entrenador={usuario} />}>
                            <Route exact path="home" element={<HomeEntrenador />} />
                            <Route exact path="clientes" element={<ClientesEntrenador entrenador={usuario} />} />
                            <Route exact path="clientes/:id" element={<ClienteEntrenador />} />
                            <Route exact path="musculos" element={<MusculosEntrenador />} />
                            <Route exact path="musculos/:id" element={<MusculoEntrenador />} />
                            <Route exact path="ejercicios" element={<EjerciciosEntrenador />} />
                            <Route exact path="ejercicios/:id" element={<EjercicioEntrenador />} />
                            <Route exact path="rutinas" element={<RutinasEntrenador />} />
                            <Route exact path="rutinas/:id" element={<RutinaEntrenador />} />
                            <Route exact path="mi-perfil" element={<div>Mi perfil</div>} />
                            <Route exact path="horario" element={<div>horario</div>} />
                        </Route>
                    </Route>


                    {/* RUTAS PARA EL CLIENTE */}
                    <Route exact path='/cliente/dashboard/home' element={
                        <ProtectedRouteAdmin
                            isAllowed={isAuthenticated && usuario.rol.nombre === "CLIENTE"}
                            redirectTo="/home">
                            <Index cliente={usuario} />
                        </ProtectedRouteAdmin>
                    } />


                    {/* PAGINA DE LOGIN */}
                    <Route exact path='/login' element={<LoginPage />} />


                    {/* PAGINA HOME */}
                    <Route index element={<Home />} />
                    <Route exact path="/home" element={<Home />} />
                    <Route path='/*' element={<Page404 />} />

                </Routes>

            }


        </div>
    )
}

export default RutasRoles;


/*function routes() {
    const routes = useRoutes([
        {
            path: '/admin/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/admin/dashboard/home" />, index: true },
                { path: 'home', element: <HomeAdmin /> },
                { path: 'clientes', element: <Clientes /> },
                { path: 'clientes/:id', element: <Cliente /> },
                { path: 'clientes/expand-delete/:id', element: <ClienteDelete /> },
                { path: 'entrenadores', element: <Entrenadores /> },
                { path: 'planes', element: <Planes /> },
                { path: 'planes/:id', element: <Plan /> },
                { path: 'maquinas', element: <Maquinas /> },
                { path: 'maquinas/:id', element: <Maquina /> },
                { path: 'productos', element: <Productos /> },
                { path: 'productos/:id', element: <Producto /> },
                { path: 'proveedores', element: <Proveedores /> },
                { path: 'proveedor/:id', element: <Proveedor /> },
                { path: 'musculos', element: <Musculos /> },
                { path: 'musculo/:id', element: <Musculo /> },
                { path: 'ejercicios', element: <Ejercicios /> },
                { path: 'ejercicio/:id', element: <Ejercicio /> },
                { path: 'rutinas', element: <Rutinas /> },
                { path: 'rutina/:id', element: <Rutina /> },
                { path: 'metodospago', element: <MetodosPago /> },
                { path: 'fact-pedidos', element: <FactPedidos /> },
                { path: 'fact-planes', element: <FactPlanes /> },
                { path: 'configuracion', element: <Configuracion /> },

            ],
        },
        {
            children: [
                { element: <Navigate to="/admin/dashboard/home" />, index: true },
                { path: '404', element: <Page404 /> },
                { path: 'login', element: <LoginPage /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,

        },
    ]);
    return routes;
}*/