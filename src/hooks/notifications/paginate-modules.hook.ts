import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "@/types/users/fetchUsers.type";
import { fetch } from "@tauri-apps/plugin-http";
import { API_BASE_URL } from "@/config/config";
import { Notification } from "@/types/notifications/notification.type";

export function usePaginateNotifications(page: number, itemsPerPage: number) {
  return useQuery<PaginatedResponse<Notification>>({
    queryKey: ["notifications", page, itemsPerPage],
    queryFn: () => fetchData(page, itemsPerPage),
    placeholderData: (previousData) => previousData,
  });
}

const fetchData = async (
  page: number,
  itemsPerPage: number
): Promise<PaginatedResponse<Notification>> => {
  const response = await fetch(
    `${API_BASE_URL}notifications?page=${page}&items=${itemsPerPage}`
  );
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message || "Error desconocido al actualizar la configuracion"
    );
  }
  return response.json();
};
