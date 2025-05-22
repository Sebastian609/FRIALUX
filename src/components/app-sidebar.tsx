import { Link } from "react-router-dom";
import {
  CogIcon,
  LayoutDashboardIcon,
  Users2Icon,
  ThermometerSnowflake,
  BellIcon,
} from "lucide-react";
import SidebarItem from "./sidebar/SidebarItem";

const sections = [
  { icon: LayoutDashboardIcon, key: "dashboard", path: "/" },
  { icon: ThermometerSnowflake, key: "Módulos", path: "/finance" },
  { icon: Users2Icon, key: "users", path: "/users" },
  { icon: BellIcon, key: "notifications", path: "/d" },
  { icon: CogIcon, key: "settings", path: "/settings" },
];

export function AppSidebar() {
  return (
    <div className="h-full flex flex-col gap-4">
      <div className="aspect-square rounded-md overflow-hidden bg-orange-400 hover:scale-90 transition-all hover:shadow-md hover:shadow-orange-400 hover:bg-orange-700 flex items-center justify-center">
        <h6 className="text-white font-bold">FRIALUX</h6>
      </div>
      <div className="h-full shadow-md bg-zinc-800 border-2 border-orange-500 rounded-lg flex flex-col p-4 gap-4 justify-between">
        <div className="flex flex-col gap-4">
          {sections.slice(0, 4).map((section) => (
            <Link key={section.key} to={section.path}>
              <SidebarItem icon={<section.icon />} name={section.key} />
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-4">
          {sections.slice(4).map((section) => (
            <Link key={section.key} to={section.path}>
              <div className="aspect-square rounded-md overflow-hidden bg-orange-500 hover:scale-90 transition-all hover:shadow-md hover:shadow-orange-400 hover:bg-orange-700 flex items-center justify-center">
                <section.icon className="text-white w-6 h-6" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
