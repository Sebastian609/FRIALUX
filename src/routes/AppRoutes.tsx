
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import ModulePage from "@/pages/module/ModulePage";
import ModulesTable from "@/pages/module/Module";
import ConfigurationPage from "@/pages/configuration/ConfigurationPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/users" element={<Users />} />
      <Route path="/finance" element={<Users />} />
      <Route path="/modules" element={<ModulesTable />} />
      <Route path="/module/:id" element={<ModulePage />} />
      <Route path="modules/configuration/:id" element={<ConfigurationPage />} />
    </Routes>
  );
}
