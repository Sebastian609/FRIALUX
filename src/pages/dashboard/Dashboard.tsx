import DashboardCard from "@/components/card/DashboardCard"
import ModuleList from "@/components/lists/ModuleList"
import { NotificationList } from "@/components/lists/notification-list";
import { Module } from "@/types/module.type"
import { User2Icon, Thermometer, BellIcon } from "lucide-react"


const modules: Module[] = Array.from({ length: 30 }, (_, i) => ({
  id: i + 1,
  name: `Central punto ${i + 1}`,
  webSocketCode: `CP${i + 1}`
}));

export default function Dashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <DashboardCard color="white" amount={3} currency="" icon={Thermometer} title="Módulos Activos" />
      <DashboardCard color="white" amount={10} currency="" icon={BellIcon} title="Notificaciones" />
      <DashboardCard color="white" amount={2} currency="" icon={User2Icon} title="Usuarios Activos" />

      <div className="col-span-2 h-[calc(100vh-16rem)] min-h-[300px]">
        <div className="grid grid-cols-1 gap-4 h-full">
         
          <div className="col-span-1   overflow-auto h-full rounded-lg bg-card text-card-foreground shadow-sm">
            <ModuleList  modules={modules}/>
          </div>
          
        </div>
      </div>
      <div className="col-span-1 h-[calc(100vh-16rem)] min-h-[300px]">
        <div className="grid grid-cols-1 gap-4 h-full">
         
          <div className="col-span-1   overflow-auto h-full rounded-lg bg-card text-card-foreground shadow-sm">
            <NotificationList/>
          </div>
          
        </div>
      </div>
    </div>
  )
}
