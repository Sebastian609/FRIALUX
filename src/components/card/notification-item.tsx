"use client"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

import { CustomButton } from "../button/custom-button"
import { Notification, NotificationType } from "../lists/notification-list"

interface NotificationItemProps {
  notification: Notification
  onMarkAsRead: (id: string) => void
  onRemove: (id: string) => void
}

export function NotificationItem({ notification, onMarkAsRead, onRemove }: NotificationItemProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Formatear la fecha relativa (ej: "hace 5 minutos")
  const formattedTime = formatDistanceToNow(notification.timestamp, {
    addSuffix: true,
    locale: es,
  })

  // Obtener el icono según el tipo de notificación
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case "info":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      case "success":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )
      case "warning":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        )
      case "error":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        )
      default:
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        )
    }
  }

  return (
    <div
      className={`relative rounded-lg p-4 transition-all ${
        notification.read ? "bg-white" : "bg-blue-50"
      } hover:bg-gray-50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5">{getIcon(notification.type)}</div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h4 className={`font-medium ${notification.read ? "" : "font-semibold"}`}>{notification.title}</h4>
            <span className="text-xs text-gray-500">{formattedTime}</span>
          </div>
          <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
        </div>
      </div>

      {/* Botones de acción (aparecen al pasar el mouse) */}
      <div
        className={`absolute right-2 top-2 flex gap-1 transition-opacity ${isHovered ? "opacity-100" : "opacity-0"}`}
      >
        {!notification.read && (
          <CustomButton
            variant="icon"
            onClick={() => onMarkAsRead(notification.id)}
            title="Marcar como leída"
            className="h-7 w-7"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="sr-only">Marcar como leída</span>
          </CustomButton>
        )}
        <CustomButton variant="icon" onClick={() => onRemove(notification.id)} title="Eliminar" className="h-7 w-7">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span className="sr-only">Eliminar</span>
        </CustomButton>
      </div>
    </div>
  )
}
