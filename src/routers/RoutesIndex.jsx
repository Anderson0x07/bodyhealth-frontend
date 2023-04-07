import { Route, Routes, BrowserRouter } from "react-router-dom";
import Proveedor from "../pages/admin/proveedores/Proveedores";
import NotFound from "../pages/index/NotFound";
import ProveedorDelete from "../components/admin/proveedores/ProveedorDelete";
import Logout from "../pages/index/Logout";
import Index from "../pages/index/Index";
import Noticias from "../pages/index/Noticias";
import Planes from "../pages/index/Planes";
import Productos from "../pages/index/Productos";
import ProveedorExpand from "../pages/admin/proveedores/ProveedorExpand";
import LoginPage from "../pages/index/LoginPage";

function RoutesIndex() {


  return (
      <BrowserRouter>
        <Routes>
          {/* Rutas del index */}
          <Route exact path="/" element={<Index/>} />
          <Route exact path="/noticias" element={<Noticias/>} />
          <Route exact path="/planes" element={<Planes/>} />
          <Route exact path="/productos" element={<Productos/>} />
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/logout" element={<Logout/>}/>
          <Route path="*" element={<NotFound/>}/>

          {/* Rutas de admin */}
          <Route exact path="/admin/proveedores" element={<Proveedor/>} />
          <Route exact path="/admin/proveedores/expand/:id" element={<ProveedorExpand/>}/>
          <Route exact path="/admin/proveedores/expand-delete/:id" element={<ProveedorDelete/>}/>

          {/* Rutas de entrenador
          <Route exact path="/trainer/clientes" element={<Cliente/>} />
          <Route exact path="/trainer/clientes/expand/:id" element={<ClienteExpand/>}/>*/}
        </Routes>
          

      </BrowserRouter>

    
  );
}

export default RoutesIndex;
