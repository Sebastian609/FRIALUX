import { useParams, useNavigate } from "react-router-dom";
import {

  ArrowLeft,
  AlertCircle,
  Loader2,
} from "lucide-react";

import LiveReadingCard from "@/components/modules/LiveReadingCard";
import ReadingsChart from "@/components/modules/ReadingsChart";
import { useReadigTypes } from "@/hooks/readingType/get-all-readingType.hook";

export default function ModulePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error } = useReadigTypes();

  


  const room = id as string;

  // Validar parámetros
  if (!room) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            ID de módulo requerido
          </h2>
          <p className="text-gray-600 mb-4">
            No se pudo identificar el módulo a mostrar.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver
          </button>
        </div>
      </div>
    );
  }

  // Estado de carga
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
          </div>

          {/* Controls Skeleton */}
          <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="h-10 bg-gray-200 rounded flex-1 animate-pulse"></div>
              <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
            </div>
          </div>

          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-4 animate-pulse"
              >
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Error al cargar datos
          </h2>
          <p className="text-gray-600 mb-4">
            No se pudieron cargar los tipos de lectura. Por favor, intenta
            nuevamente.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
              <Loader2 className="h-4 w-4 mr-2" />
              Reintentar
            </button>
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full ">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <button
              onClick={() => navigate(-1)}
              className="inline-flex items-center text-gray-600 hover:text-gray-900 mr-4 transition-colors duration-200"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Volver
            </button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Módulo {room}
              </h1>
            </div>
          </div>

          {/* Status Bar */}
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm text-gray-600">Sistema Activo</span>
                </div>
                <div className="text-sm text-gray-500">Room: {room}</div>
              </div>
              <div className="text-sm text-gray-500">
                {new Date().toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2 w-full flex-wrap">
          {data &&
            data.map((readingType) => (
              <div key={`${room}-${readingType.id}`} >
                <LiveReadingCard
                  room={room}
                  readingTypeId={readingType.id}
                  label={readingType.name}
                  unit={"c"}
                  className={"max-w-none"}
                />
              </div>
            ))}
        </div>

        <div className="flex flex-col gap-2 w-full flex-wrap mt-4 ">
  {data?.map((readingType) => (
    <div key={`${room}-${readingType.id}`} >
      <ReadingsChart
        readingType={readingType}
        moduleId={room}
      />
    </div>
  ))}
</div>

        




      </div>
    </div>
  );
}
