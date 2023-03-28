import { Routes, Route } from "react-router-dom";
import Tablero from "../pages/admin/Tablero";
import Maquinas from "../pages/admin/maquinas/Maquinas";
import Rutinas from "../pages/admin/rutinas/Rutinas";
import Musculo from "../pages/admin/musculos/Musculos";
import Proveedor from "../pages/admin/proveedores/Proveedores";
import ProveedorEdit from '../pages/admin/proveedores/ProveedorEdit'
import NotFound from "../pages/NotFound";
import ProveedorDelete from "../components/admin/proveedores/ProveedorDelete";
import LoginForm from "../pages/LoginForm";
import Logout from "../pages/Logout";
import Clientes from "../pages/admin/clientes/Clientes";
import Cliente from "../components/admin/clientes/Cliente";

function MyRoutes() {


  return (
      <Routes>
          <Route path="/" element={<Tablero/>} />
          <Route path="/maquinas" element={<Maquinas/>} />
          <Route path="/clientes" element={<Clientes/>} />
          {/*<Route path="/clientes/expand/:id" element={<Cliente/>} />*/}
          <Route path="/rutinas" element={<Rutinas/>} />
          <Route path="/musculos" element={<Musculo/>} />
          <Route path="/proveedores" element={<Proveedor/>} />
          <Route path="/proveedores/expand/:id" element={<ProveedorEdit/>}/>
          <Route path="/proveedores/expand-delete/:id" element={<ProveedorDelete/>}/>
          <Route path="*" element={<NotFound/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/logout" element={<Logout/>}/>
      </Routes>
    
  );
}

export default MyRoutes;
