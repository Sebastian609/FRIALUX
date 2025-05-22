import { Notification } from "@/types/notification.type"
import { Bell, CheckCircle, AlertTriangle, Info, XCircle } from "lucide-react"

const iconMap = {
  info: <Info className="h-5 w-5 text-blue-600" />,
  success: <CheckCircle className="h-5 w-5 text-green-600" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-600" />,
  error: <XCircle className="h-5 w-5 text-red-600" />,
}

const colorMap = {
  info: "bg-blue-50 border-blue-300",
  success: "bg-green-50 border-green-300",
  warning: "bg-yellow-50 border-yellow-300",
  error: "bg-red-50 border-red-300",
}

// Simulación de notificaciones
const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Sensor desconectado",
    message: "No se pudo obtener la temperatura del sensor de la sala 1",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
    read: false,
    type: "error",
  },
  {
    id: "2",
    title: "Temperatura fuera de rango",
    message: "La temperatura del servidor principal superó los 85°C",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    read: false,
    type: "error",
  },
  {
    id: "3",
    title: "Sensor congelado",
    message: "El sensor del almacén marcó -40°C, posible error de medición",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    read: false,
    type: "error",
  },
  {
    id: "4",
    title: "Lectura inestable",
    message: "Fluctuaciones inusuales en la temperatura del laboratorio",
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    read: true,
    type: "error",
  },
  {
    id: "5",
    title: "Fallo en sensor externo",
    message: "No hay lecturas desde el sensor de temperatura exterior",
    timestamp: new Date(Date.now() - 1000 * 60 * 90),
    read: true,
    type: "error",
  },
  {
    id: "6",
    title: "Temperatura crítica",
    message: "Temperatura en la cámara de servidores alcanzó 95°C",
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    read: false,
    type: "error",
  },
  {
    id: "7",
    title: "Desviación de sensor",
    message: "El sensor del área de producción reporta valores inconsistentes",
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    read: false,
    type: "error",
  },
  {
    id: "8",
    title: "Reinicio inesperado del sensor",
    message: "El sensor de temperatura se reinició sin razón aparente",
    timestamp: new Date(Date.now() - 1000 * 60 * 240),
    read: true,
    type: "error",
  },
  {
    id: "9",
    title: "Fallo de calibración",
    message: "El sensor de temperatura necesita recalibración urgente",
    timestamp: new Date(Date.now() - 1000 * 60 * 300),
    read: true,
    type: "error",
  },
  {
    id: "10",
    title: "Sin datos recibidos",
    message: "No se han recibido datos de temperatura en las últimas 6 horas",
    timestamp: new Date(Date.now() - 1000 * 60 * 360),
    read: true,
    type: "error",
  },
];


export function NotificationList() {
  return (
    <div className="max-h-[500px] bg-white shadow-lg rounded-lg border border-gray-200">
      <div className="sticky top-0 bg-white z-10 px-4 py-2 border-b border-gray-300 font-semibold text-lg">
        Notificaciones
      </div>

      <div className="divide-y divide-gray-200">
        {initialNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 ${
              notification.read ? "bg-gray-50" : "bg-red-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-sm text-red-700">
                {notification.title}
              </p>
              <span className="text-xs text-gray-500">
                {notification.timestamp.toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-700">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
