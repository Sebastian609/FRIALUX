
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";
import Users from "../pages/users/Users";
import ModulePage from "@/pages/module/ModulePage";
import ModulesTable from "@/pages/module/Module";
import ConfigurationPage from "@/pages/configuration/ConfigurationPage";
import Login from "@/pages/Login";
import PrivateRoute from "./PrivateRoute";
import Settings from "@/pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/finance" element={<PrivateRoute><Users /></PrivateRoute>} />
      <Route path="/modules" element={<PrivateRoute><ModulesTable /></PrivateRoute>} />
      <Route path="/module/:id" element={<PrivateRoute><ModulePage /></PrivateRoute>} />
      <Route path="modules/configuration/:id" element={<PrivateRoute><ConfigurationPage /></PrivateRoute>} />
      <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
    </Routes>
  );
}
