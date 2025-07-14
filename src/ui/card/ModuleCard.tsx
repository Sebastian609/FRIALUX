
import { Link } from "react-router-dom";
import type { Module } from "@/types/modules/module.type";
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
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";
import { WS_BASE_URL } from "@/config/config";
import { ReceivedReadings } from "@/components/modules/LiveReadingCard";


export interface ModuleCardProps {
  module: Module;
}

// Function to get the appropriate icon based on measurement type
export function getMeasurementIcon(measurementName: string) {
  const iconMap: Record<string, any> = {
    Celcius: Thermometer,
    Humidity: Droplets,
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
  const [lectures, setLectures] = useState<Map<number, ReceivedReadings>>(new Map());

  useEffect(() => {
    const socket = io(WS_BASE_URL); // Change URL as needed

    socket.on(module.webSocketRoom, (data: ReceivedReadings) => {
      setLectures((prevLectures) => {
        const updatedLectures = new Map(prevLectures);
        if (updatedLectures.has(data.readingTypeId)) {
          updatedLectures.set(data.readingTypeId, data);
        } else {
          updatedLectures.set(data.readingTypeId, data);
        }
        return updatedLectures;
      }); 
    });

    return () => {
      socket.disconnect();
    };
  }, [module.id]);

  if( lectures.size === 0) {
    return (
      <div className="rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-zinc-100">
        <div className="px-4 py-3 flex justify-between items-center bg-white">
          <h3 className="font-medium">{module.name}</h3>
          <Link key={`/module/${module.id}`} to={`/module/${module.webSocketRoom}`} className="text-xs text-orange-600 flex items-center">
            Gestionar
          </Link>
        </div>
        <div className="p-4 text-center text-gray-500">No hay lecturas disponibles</div>
      </div>
    );
  }

  return (
    <div className="rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-zinc-100">
      {/* Header */}
      <div className="px-4 py-3 flex justify-between items-center bg-white">
        <h3 className="font-medium">{module.name}</h3>
        <Link key={`/module/${module.id}`} to={`/module/${module.webSocketRoom}`} className="text-xs text-orange-600 flex items-center">
        Gestionar
        </Link>
      </div>

    <div className="flex flex-col ">
      {Array.from(lectures.values()).map((lecture, index) => {
        const Icon = getMeasurementIcon(lecture.reading.name);

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
                <div className="text-sm">{lecture.reading.name} </div>
                <div className="flex items-baseline">
                  <span className="text-xl font-bold text-zinc-900">
                  {lecture.value}   
                  </span>
                  <span className="ml-1 text-orange-500">
                    {lecture.reading.simbol}
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
