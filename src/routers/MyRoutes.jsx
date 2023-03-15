import { Route, Routes } from "react-router-dom";
import Tablero from "../pages/admin/Tablero";
import Maquinas from "../pages/admin/Maquinas";
import Rutinas from "../pages/admin/Rutinas";
import Musculo from "../pages/admin/Musculos";
import Proveedor from "../pages/admin/Proveedores";

function MyRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Tablero />} />
      <Route path="/maquinas" element={<Maquinas />} />
      <Route path="/rutinas" element={<Rutinas />} />
      <Route path="/musculos" element={<Musculo />} />
      <Route path="/proveedores" element={<Proveedor />} />
    </Routes>
  );
}

export default MyRoutes;
