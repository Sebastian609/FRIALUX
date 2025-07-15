import Button from "@/components/shared/buttons/Button";
import { usePaginateNotifications } from "@/hooks/notifications/paginate-modules.hook";
import ErrorFetching from "@/pages/users/ErrorFetchingUsers";
import Loading from "@/pages/users/LoadingUsers";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import React from "react";

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  type: NotificationType;
}

export type NotificationType = "info" | "success" | "warning" | "error";

// Simulación de notificaciones

export type PaginationTemplate = {
  page: number;
  itemsPerPage: number;
};

export function NotificationList() {
  const [pagintion, setPagination] = React.useState<PaginationTemplate>({
    itemsPerPage: 15,
    page: 1,
  });

  const {
    data: notifications,
    isLoading,
    isError,
  } = usePaginateNotifications(pagintion.page, pagintion.itemsPerPage);

  const getNextPage = () => {
    if (!notifications?.pagination.hasNextPage) return;
    setPagination((prev) => ({
      ...prev,
      page: prev.page + 1,
    }));
  };

  const getBackPage = () => {
    if (!notifications?.pagination.hasPreviousPage) return;
    setPagination((prev) => ({
      ...prev,
      page: prev.page - 1,
    }));
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetching error="Error al cargar notificaciones" />;
  }

  if (!notifications || notifications.response.data.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        No hay notificaciones
      </div>
    );
  }
  
  return (
    <div className="max-h-[500px] bg-white shadow-lg rounded-lg border border-gray-200 overflow-y-auto">
      <div className="sticky top-0 flex flex-row justify-between bg-white z-10 px-4 py-2 border-b border-gray-300 font-semibold text-lg">
        <p>Notificaciones</p>
        <div className="flex flex-row items-center justify-center gap-3">
          <Button
            onClick={getBackPage}
            variant="ghost"
            leftIcon={ArrowLeftIcon}
            disabled={!notifications?.pagination.hasPreviousPage}
          >
            back
          </Button>
          <Button
            onClick={getNextPage}
            variant="ghost"
            type="button"
            leftIcon={ArrowRightIcon}
            disabled={!notifications?.pagination.hasNextPage}
          >
            next
          </Button>
        </div>
      </div>

      <div className="divide-y divide-gray-200">
        {notifications.response.data.map((notification) => (
          <div
            key={notification.id}
            className={`px-4 py-3 ${
              notification.id ? "bg-gray-50" : "bg-red-50"
            }`}
          >
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-sm text-red-700">
                Lecturas fuera de rango
              </p>
              <span className="text-xs text-gray-500">
                {new Date(notification.sentAt).toLocaleString()}
              </span>
            </div>
            <p className="text-sm text-gray-700">{notification.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
