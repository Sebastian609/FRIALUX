import { useQuery } from "@tanstack/react-query";

import { fetch } from "@tauri-apps/plugin-http"
import { ReadingType } from "@/types/readingTypes/readingtypes.type";
import { API_BASE_URL } from "@/config/config";

export function useReadigTypes() {


  return useQuery<ReadingType[]>({
    queryKey: ["readingTypes"],
    queryFn: () => fetchData(),
    placeholderData: (previousData) => previousData,
  });
}

const fetchData = async (): Promise<ReadingType[]> => {
  const response = await fetch(`${API_BASE_URL}reading-types/list`)
  if (!response.ok) {
    throw new Error("Error al cargar usuarios")
  }
  return response.json()
}

