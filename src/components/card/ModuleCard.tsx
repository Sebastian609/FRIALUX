import { Lecture } from "@/types/lecture.type";
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
function getMeasurementIcon(measurementName: string) {
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

// Function to get appropriate color based on measurement type
function getMeasurementColor(measurementName: string) {
  const colorMap: Record<string, string> = {
    Temperatura: "bg-yellow-500 text-red-50",
    Humedad: "bg-blue-500 text-blue-50",
    Presión: "bg-purple-500 text-purple-50",
    CO2: "bg-green-500 text-green-50",
    Luz: "bg-yellow-500 text-yellow-50",
    Ruido: "bg-orange-500 text-orange-50",
    Vibración: "bg-indigo-500 text-indigo-50",
    Voltaje: "bg-amber-500 text-amber-50",
    Corriente: "bg-cyan-500 text-cyan-50",
    Frecuencia: "bg-rose-500 text-rose-50",
  };

  return colorMap[measurementName] || "bg-white";
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
    <div className="rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-orange-500">
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center bg-orange-400">
        <h3 className="font-medium text-white">{module.name}</h3>
        <span className="text-xs text-white flex items-center">
          <Clock className="h-3 w-3 mr-1 text-white" />
          {new Date().toLocaleTimeString()}
        </span>
      </div>

      <div className="flex flex-col gap-2 p-2">
        {lectures.map((lecture, index) => {
          const Icon = getMeasurementIcon(lecture.name);
          const colorClass = getMeasurementColor(lecture.name);

          return (
            <div
              key={index}
              className={`rounded-sm p-3 flex items-center justify-between ${colorClass}`}
            >
              <div className="flex items-center">
                <div className="p-2 rounded-sm mr-4 bg-zinc-800">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm">{lecture.name}</div>
                  <div className="flex items-baseline">
                    <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                      {lecture.value}
                    </span>
                    <span className="ml-1 text-zinc-100 dark:text-zinc-300">
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
