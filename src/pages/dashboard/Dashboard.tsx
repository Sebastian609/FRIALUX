import { usePaginateModules } from "@/hooks/modules/paginate-modules.hook";
import DashboardCard from "@/ui/card/DashboardCard"
import ModuleList from "@/ui/lists/ModuleList"
import { NotificationList } from "@/ui/lists/notification-list";
import { User2Icon, Thermometer, BellIcon } from "lucide-react"


export default function Dashboard() {

  const { data: getModules } = usePaginateModules()

  if (!getModules) {
    return <div>Cargando módulos...</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <DashboardCard color="white" amount={3} currency="" icon={Thermometer} title="Módulos Activos" />
      <DashboardCard color="white" amount={10} currency="" icon={BellIcon} title="Notificaciones" />
      <DashboardCard color="white" amount={2} currency="" icon={User2Icon} title="Usuarios Activos" />

      <div className="col-span-2 h-[calc(100vh-16rem)] min-h-[300px]">
        <div className="grid grid-cols-1 gap-4 h-full">
         
          <div className="col-span-1   overflow-auto h-full rounded-lg bg-card text-card-foreground shadow-sm">
            <ModuleList  modules={getModules.response.data}/>
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
