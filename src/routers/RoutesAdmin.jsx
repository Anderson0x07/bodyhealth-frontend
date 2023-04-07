import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from '../layouts/dashboard';
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
import ClienteDelete from '../components/admin/clientes/ClienteDelete';
import Producto from '../components/admin/productos/Producto';
import Maquina from '../components/admin/maquinas/Maquina';
import Proveedor from '../components/admin/proveedores/Proveedor';
import Musculos from '../pages/admin/musculos/Musculos';
import MetodoPago from '../pages/admin/metodo-pago/MetodoPago';
import Ejercicios from '../pages/admin/ejercicios/Ejercicios';
import Ejercicio from '../components/admin/dashboard/ejercicios/Ejercicio';
import LoginPage from '../pages/index/LoginPage';



function RoutesAdmin() {
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
                { path: 'maquinas', element: <Maquinas /> },
                { path: 'maquinas/:id', element: <Maquina/> },
                { path: 'productos', element: <Productos /> },
                { path: 'productos/:id', element: <Producto /> },
                { path: 'proveedores', element: <Proveedores /> },
                { path: 'proveedor/:id', element: <Proveedor /> },
                { path: 'musculos', element: <Musculos /> },
                { path: 'ejercicios', element: <Ejercicios /> },
                { path: 'ejercicio/:id', element: <Ejercicio /> },
                { path: 'metodospago',element:<MetodoPago />},
                { path: 'fact-pedidos', element: <FactPedidos /> },
                { path: 'fact-planes', element: <FactPlanes /> },
                { path: 'configuracion', element: <Configuracion /> },
                
            ],
        },
        {
            children: [
                { element: <Navigate to="/admin/dashboard/home" />, index: true },
                { path: '404', element: <Page404 /> },
                { path:'login', element: <LoginPage/>},
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        {
            path: '*',
            element: <Navigate to="/404" replace />,

            
        },
    ]);

    return routes;
}

export default RoutesAdmin;