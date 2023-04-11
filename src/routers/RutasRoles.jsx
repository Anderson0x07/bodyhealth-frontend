import { Route, Routes } from 'react-router-dom';

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
import { Suspense } from 'react';
import { procesarPeticionLogin } from '../utils/HandleApi';
import Index from '../pages/cliente/Index';
import Home from '../pages/Home';
import DashboardAdmin from '../layouts/dashboard-admin/DashboardAdmin';
import DashboardEntrenador from '../layouts/dashboard-trainer/DashboardEntrenador';
import Entrenador from '../components/admin/Entrenadores/Entrenador';
import ProfilePage from '../pages/admin/ProfilePage';
import HomeEntrenador from '../pages/entrenador/HomeEntrenador';
import ClientesEntrenador from '../pages/entrenador/clientes/ClientesEntrenador';


const isAuthenticated = localStorage.getItem('isAuthenticated');
const email = localStorage.getItem('email');

let promise;

if (email != null) {
    promise = procesarPeticionLogin(`usuario/login/${encodeURIComponent(email)}`);

}

function RutasRoles() {

    let usuario = {};

    //setUsuario(response.data.usuario) no se puede hacer el set directamente :(

    let response;

    if (email != null) {
        response = promise.read();
        console.log("respuesta del user logueado")
        console.log(response)

        usuario = {
            id_usuario: response.data.usuario.id_usuario,
            clienteDetalles: response.data.usuario.clienteDetalles,
            clienteEntrenadores: response.data.usuario.clienteEntrenadores,
            clienteRutinas: response.data.usuario.clienteRutinas,
            comentario: response.data.usuario.comentario,
            compras: response.data.usuario.compras,
            confirmado: response.data.usuario.confirmado,
            controlClientes: response.data.usuario.controlClientes,
            documento: response.data.usuario.documento,
            email: response.data.usuario.email,
            entrenadorClientes: response.data.usuario.entrenadorClientes,
            estado: response.data.usuario.estado,
            experiencia: response.data.usuario.experiencia,
            fecha_nacimiento: response.data.usuario.fecha_nacimiento,
            foto: response.data.usuario.foto,
            hoja_vida: response.data.usuario.hoja_vida,
            jornada: response.data.usuario.jornada,
            nombre: response.data.usuario.nombre,
            apellido: response.data.usuario.apellido,
            password: response.data.usuario.password,
            rol: response.data.usuario.rol,
            telefono: response.data.usuario.telefono,
            tipo_documento: response.data.usuario.tipo_documento,
            titulo_academico: response.data.usuario.titulo_academico
        }
    }




    return (
        <Suspense fallback={<div>Loading...</div>}>

            <Routes>

                {/* RUTAS PARA ADMINISTRADOR PROTEGIDAS */}
                <Route element={<ProtectedRouteAdmin isAllowed={isAuthenticated && usuario.rol.nombre === "ADMIN"} redirectTo="/home"/>}>
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
                        <Route exact path="home" element={<HomeEntrenador/>} />
                        <Route exact path="clientes" element={<ClientesEntrenador entrenador={usuario}/>} />
                        <Route exact path="clientes/:id" element={<div>Home</div>} />
                        <Route exact path="musculos" element={<div>Home</div>} />
                        <Route exact path="musculos/:id" element={<div>Home</div>} />
                        <Route exact path="ejercicios" element={<div>Home</div>} />
                        <Route exact path="ejercicios/:id" element={<div>Home</div>} />
                        <Route exact path="rutinas" element={<div>Home</div>} />
                        <Route exact path="rutinas/:id" element={<div>Home</div>} />
                        <Route exact path="mi-perfil" element={<div>Mi perfil</div>} />
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
        </Suspense>
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