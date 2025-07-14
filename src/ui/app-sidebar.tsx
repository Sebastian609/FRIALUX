import { Link } from "react-router-dom";
import {
  CogIcon,
  LayoutDashboardIcon,
  Users2Icon,
  ThermometerSnowflake,
  BellIcon,
} from "lucide-react";
import SidebarItem from "./sidebar/SidebarItem";
import {
  isPermissionGranted,
  requestPermission,
  sendNotification
} from '@tauri-apps/plugin-notification'
import { useEffect } from "react";
import { io } from "socket.io-client";
import { WS_BASE_URL } from "@/config/config";

async function checkPermission() {
  try {
 
  if (!(await isPermissionGranted())) {
    return (await requestPermission()) === 'granted'
  }
  return true
  } catch (error) {
    alert("Error checking permission: " + error)
  }
}

export async function enqueueNotification( body:any) {
  if (!(await checkPermission())) {
    alert("Permission denied")
    return
  }
  let title = "ALERTA 🚨"
  sendNotification({ title, body,sound:"./../../public/sound.mp3"})
}


const sections = [
  { icon: LayoutDashboardIcon, key: "dashboard", path: "/" },
  { icon: ThermometerSnowflake, key: "Módulos", path: "/modules" },
  { icon: Users2Icon, key: "users", path: "/users" },
  { icon: BellIcon, key: "notifications", path: "/d" },
  { icon: CogIcon, key: "settings", path: "/settings" },
];

export function AppSidebar() {
    const notify = async () => {
  await enqueueNotification("hola desde frialux")

  
};


  useEffect(() => {
    const socket = io(WS_BASE_URL); // Cambia la URL según tu backend

    socket.on("notifications", (data: { message: string}) => {
      enqueueNotification(data.message);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 z-500">
      <div className="aspect-square rounded-md overflow-hidden bg-orange-400 hover:scale-90 transition-all hover:shadow-md hover:shadow-orange-400 hover:bg-orange-700 flex items-center justify-center">
        <h6 onClick={()=>notify()} className="text-white font-bold">FRIALUX</h6>
      </div>
      <div className="h-full  bg-white shadow-sm rounded-lg flex flex-col p-4 gap-4 justify-between">
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
