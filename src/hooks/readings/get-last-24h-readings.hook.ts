import { useQuery } from "@tanstack/react-query";
import { fetch } from "@tauri-apps/plugin-http";
import { Reading } from "@/types/reading/reading.type";
import { API_BASE_URL } from "@/config/config";

export function useReadings(readingTypesId: number, moduleId: string) {
  return useQuery<Reading[]>({
    // CORRECCIÓN 1: El queryKey ahora es dinámico.
    queryKey: ["readings", readingTypesId, moduleId],
    queryFn: () => fetchData(readingTypesId, moduleId),
    placeholderData: (previousData) => previousData,
    // Opcional: Deshabilitar la query si alguno de los IDs no está listo.
    enabled: !!readingTypesId && !!moduleId,
  });
}

const fetchData = async (readingTypesId: number, moduleId: string): Promise<Reading[]> => {
  // CORRECCIÓN 2: La URL es dinámica y tiene el protocolo http.
  const response = await fetch(`${API_BASE_URL}readings/last-24?readingTypeId=${readingTypesId}&moduleId=${moduleId}`);

  if (!response.ok) {
    throw new Error("Error al cargar las lecturas");
  }
  
  // Asumiendo que response.json() devuelve un Promise<any>
  const data = await response.json() as Reading[];
  return data;
};