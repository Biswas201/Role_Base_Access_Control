import { Routes, Route } from "react-router-dom";
import Users from "./pages/Users";
import Roles from "./pages/Roles";
import Permissions from "./pages/Permissions";

const AppRoutes = () => (
  <Routes>
    <Route path="/users" element={<Users />} />
    <Route path="/roles" element={<Roles />} />
    <Route path="/permissions" element={<Permissions />} />
  </Routes>
);

export default AppRoutes;
