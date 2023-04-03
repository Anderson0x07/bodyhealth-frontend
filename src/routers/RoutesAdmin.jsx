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
import LoginForm from '../pages/index/LoginForm';
import Cliente from '../components/admin/clientes/Cliente';
import ClienteDelete from '../components/admin/clientes/ClienteDelete';



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
                { path: 'productos', element: <Productos /> },
                { path: 'proveedores', element: <Proveedores /> },
                { path: 'fact-pedidos', element: <FactPedidos /> },
                { path: 'fact-planes', element: <FactPlanes /> },
                { path: 'configuracion', element: <Configuracion /> },
                
            ],
        },
        {
            children: [
                { element: <Navigate to="/admin/dashboard/home" />, index: true },
                { path: '404', element: <Page404 /> },
                {path:'login', element: <LoginForm/>},
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