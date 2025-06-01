
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import ModulePage from "@/pages/module/ModulePage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/finance" element={<Users />} />
       <Route path="/module/:id" element={<ModulePage />} />
    </Routes>
  );
}
