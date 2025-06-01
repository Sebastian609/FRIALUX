import { Lecture } from "@/types/lecture.type";
import { Link } from "react-router-dom";
import type { Module } from "@/types/module.type";
import {
  Thermometer,
  Droplets,
  Gauge,
  Wind,
  Sun,
  Volume2,
  Activity,
  Zap,
  Battery,
  Radio,
  Clock,
} from "lucide-react";

export interface ModuleCardProps {
  module: Module;
}

// Function to get the appropriate icon based on measurement type
export function getMeasurementIcon(measurementName: string) {
  const iconMap: Record<string, any> = {
    Temperatura: Thermometer,
    Humedad: Droplets,
    Presión: Gauge,
    CO2: Wind,
    Luz: Sun,
    Ruido: Volume2,
    Vibración: Activity,
    Voltaje: Zap,
    Corriente: Battery,
    Frecuencia: Radio,
  };

  return iconMap[measurementName] || Clock;
}


export default function ModuleCard({ module }: ModuleCardProps) {
  // ✅ Simulación de datos (provenientes del socket en producción)
  const lectures: Lecture[] = [
    {
      name: "Temperatura",
      value: 23.4,
      mesurament: "°C",
      createdAt: new Date(),
    },
    {
      name: "Humedad",
      value: 55,
      mesurament: "%",
      createdAt: new Date(),
    }
  ];

  return (
    <div className="rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-zinc-100">
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center bg-white">
        <h3 className="font-medium">{module.name}</h3>
        <Link key={`/module/${module.id}`} to={`/module/${module.id}`} className="text-xs text-orange-600 flex items-center">
        Gestionar
        </Link>
      </div>

      <div className="flex flex-col ">
        {lectures.map((lecture, index) => {
          const Icon = getMeasurementIcon(lecture.name);
     
          return (
            <div
              key={index}
              className={`rounded-sm p-3 flex items-center justify-between`}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-full mr-4 bg-orange-500 ">
                  <Icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-sm">{lecture.name}</div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-zinc-900">
                      {lecture.value}
                    </span>
                    <span className="ml-1 text-orange-500">
                      {lecture.mesurament}
                    </span>
                  </div>
                </div>
              </div>
             
            </div>
          );
        })}
      </div>
    </div>
  );
}
