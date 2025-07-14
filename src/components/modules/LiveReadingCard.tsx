"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import { io, type Socket } from "socket.io-client"
import { AlertTriangle, Wifi, WifiOff, RotateCcw, Activity } from "lucide-react"
import { WS_BASE_URL } from "@/config/config"
import { ReadingType } from "@/types/readingTypes/readingtypes.type"

export type ReceivedReadings = {
  value: number
  readingTypeId: number
  reading: ReadingType
}

type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error"

type LiveReadingCardProps = {
  room: string
  readingTypeId: number
  label: string
  unit?: string
  serverUrl?: string
  reconnectAttempts?: number
  updateInterval?: number
  className?: string
}

export default function LiveReadingCard({
  room,
  readingTypeId,
  label,
  unit = "",
  serverUrl = WS_BASE_URL,
  reconnectAttempts = 5,
  className = "",
}: LiveReadingCardProps) {
  const [latestValue, setLatestValue] = useState<number | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>("connecting")
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [reconnectCount, setReconnectCount] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const socketRef = useRef<Socket | null>(null)
  const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const connectSocket = useCallback(() => {
    if (socketRef.current?.connected) {
      return
    }

    setConnectionStatus("connecting")

    const socket = io(serverUrl, {
      reconnection: true,
      reconnectionAttempts: reconnectAttempts,
      reconnectionDelay: 1000,
      timeout: 5000,
    })

    socket.on("connect", () => {
      setConnectionStatus("connected")
      setReconnectCount(0)
      console.log(`Connected to Socket.IO server for room: ${room}`)
    })

    socket.on("disconnect", (reason) => {
      setConnectionStatus("disconnected")
      console.log(`Disconnected from Socket.IO server: ${reason}`)
    })

    socket.on("connect_error", (error) => {
      setConnectionStatus("error")
      console.error("Socket.IO connection error:", error)
    })

    socket.on("reconnect_attempt", (attemptNumber) => {
      setReconnectCount(attemptNumber)
      setConnectionStatus("connecting")
    })

    socket.on(room, (data: ReceivedReadings) => {
      if (data.readingTypeId === readingTypeId) {
        setLatestValue(data.value)
        setLastUpdate(new Date())

        // Trigger animation
        setIsAnimating(true)
        setTimeout(() => setIsAnimating(false), 300)
      }
    })

    socketRef.current = socket
  }, [room, readingTypeId, serverUrl, reconnectAttempts])

  const disconnectSocket = useCallback(() => {
    if (socketRef.current) {
      socketRef.current.disconnect()
      socketRef.current = null
    }
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
    }
  }, [])

  const manualReconnect = useCallback(() => {
    disconnectSocket()
    setTimeout(connectSocket, 500)
  }, [connectSocket, disconnectSocket])

  useEffect(() => {
    connectSocket()
    return disconnectSocket
  }, [connectSocket, disconnectSocket])

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "connecting":
        return <RotateCcw className="h-4 w-4 text-yellow-500 animate-spin" />
      case "disconnected":
      case "error":
        return <WifiOff className="h-4 w-4 text-red-500" />
    }
  }

  const getStatusBadge = () => {
    const statusConfig = {
      connected: {
        bgColor: "bg-green-100 text-green-800 border-green-200",
        label: "Conectado",
      },
      connecting: {
        bgColor: "bg-yellow-100 text-yellow-800 border-yellow-200",
        label: reconnectCount > 0 ? `Reconectando (${reconnectCount})` : "Conectando",
      },
      disconnected: {
        bgColor: "bg-red-100 text-red-800 border-red-200",
        label: "Desconectado",
      },
      error: {
        bgColor: "bg-red-100 text-red-800 border-red-200",
        label: "Error",
      },
    }

    const config = statusConfig[connectionStatus]

    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${config.bgColor}`}>
        {getStatusIcon()}
        <span className="ml-1">{config.label}</span>
      </div>
    )
  }

  const formatLastUpdate = () => {
    if (!lastUpdate) return null
    const now = new Date()
    const diff = Math.floor((now.getTime() - lastUpdate.getTime()) / 1000)

    if (diff < 60) return `hace ${diff}s`
    if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`
    return lastUpdate.toLocaleTimeString()
  }

  const getValueDisplay = () => {
    if (latestValue === null) {
      return connectionStatus === "connected" ? "Esperando datos..." : "Sin conexión"
    }
    return `${latestValue} ${unit}`
  }

  const getDataIcon = () => {
    if (latestValue !== null) {
      return (
        <Activity
          className={`h-5 w-5 text-green-500 transition-all duration-300 ${
            isAnimating ? "animate-pulse scale-110" : ""
          }`}
        />
      )
    }
    return <AlertTriangle className="h-5 w-5 text-yellow-500" />
  }

  return (
    <div
      className={`bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-sm ${className}`}
    >
      {/* Header */}
      <div className="p-4 pb-3 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-gray-600">{label}</h3>
          {getDataIcon()}
        </div>
        <div className="flex items-center justify-between">
          {getStatusBadge()}
          {(connectionStatus === "error" || connectionStatus === "disconnected") && (
            <button
              onClick={manualReconnect}
              className="inline-flex items-center px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reconectar
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div
          className={`text-2xl font-bold transition-all duration-300 ${
            latestValue !== null ? "text-gray-900" : "text-gray-500"
          } ${isAnimating ? "scale-105" : ""}`}
        >
          {getValueDisplay()}
        </div>
        {lastUpdate && <p className="text-xs text-gray-500 mt-2">Última actualización: {formatLastUpdate()}</p>}
      </div>
    </div>
  )
}
