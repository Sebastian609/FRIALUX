"use client"
import { getMeasurementIcon } from "@/ui/card/ModuleCard"
import type { Lecture } from "@/types/lecture.type"
import type { Module } from "@/types/module.type"
import { useParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { AlertTriangle, CheckCircle, XCircle, Clock, Settings, TrendingUp, TrendingDown, Minus, DownloadIcon } from "lucide-react"
import { Chart, registerables } from 'chart.js'

// Registrar todos los componentes de Chart.js
Chart.register(...registerables)

interface Notification {
  id: string
  type: "error" | "warning" | "success" | "info"
  title: string
  message: string
  timestamp: Date
  resolved: boolean
}

interface HistoricalData {
  time: string
  temperature: number
  humidity: number
}

export default function ModulePage() {
  const { id } = useParams()
  const moduleId = id as unknown as number
  const [activeTab, setActiveTab] = useState("readings")
  const tempChartRef = useRef<HTMLCanvasElement>(null)
  const humidityChartRef = useRef<HTMLCanvasElement>(null)
  const [tempChart, setTempChart] = useState<Chart | null>(null)
  const [humidityChart, setHumidityChart] = useState<Chart | null>(null)

  const module: Module = {
    id: moduleId,
    name: "Módulo " + moduleId,
    webSocketCode: "i" + moduleId,
  }

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
    },
  ]

  // Datos para el gráfico
  const chartData: HistoricalData[] = [
  { time: "00:00", temperature: 22.1, humidity: 58 },
  { time: "00:30", temperature: 21.9, humidity: 59 },
  { time: "01:00", temperature: 21.7, humidity: 60 },
  { time: "01:30", temperature: 21.5, humidity: 61 },
  { time: "02:00", temperature: 21.3, humidity: 62 },
  { time: "02:30", temperature: 21.2, humidity: 63 },
  { time: "03:00", temperature: 21.0, humidity: 63 },
  { time: "03:30", temperature: 20.8, humidity: 64 },
  { time: "04:00", temperature: 20.7, humidity: 65 },
  { time: "04:30", temperature: 20.6, humidity: 65 },
  { time: "05:00", temperature: 20.5, humidity: 66 },
  { time: "05:30", temperature: 20.6, humidity: 65 },
  { time: "06:00", temperature: 20.8, humidity: 64 },
  { time: "06:30", temperature: 21.0, humidity: 63 },
  { time: "07:00", temperature: 21.3, humidity: 62 },
  { time: "07:30", temperature: 21.7, humidity: 61 },
  { time: "08:00", temperature: 22.2, humidity: 60 },
  { time: "08:30", temperature: 22.7, humidity: 59 },
  { time: "09:00", temperature: 23.2, humidity: 58 },
  { time: "09:30", temperature: 23.7, humidity: 57 },
  { time: "10:00", temperature: 24.2, humidity: 56 },
  { time: "10:30", temperature: 24.6, humidity: 55 },
  { time: "11:00", temperature: 25.0, humidity: 54 },
  { time: "11:30", temperature: 25.3, humidity: 53 },
  { time: "12:00", temperature: 25.5, humidity: 52 },
  { time: "12:30", temperature: 25.6, humidity: 51 },
  { time: "13:00", temperature: 25.7, humidity: 50 },
  { time: "13:30", temperature: 25.7, humidity: 50 },
  { time: "14:00", temperature: 25.6, humidity: 50 },
  { time: "14:30", temperature: 25.5, humidity: 50 },
  { time: "15:00", temperature: 25.3, humidity: 51 },
  { time: "15:30", temperature: 25.1, humidity: 51 },
  { time: "16:00", temperature: 24.9, humidity: 52 },
  { time: "16:30", temperature: 24.7, humidity: 52 },
  { time: "17:00", temperature: 24.5, humidity: 53 },
  { time: "17:30", temperature: 24.3, humidity: 53 },
  { time: "18:00", temperature: 24.1, humidity: 54 },
  { time: "18:30", temperature: 23.9, humidity: 54 },
  { time: "19:00", temperature: 23.7, humidity: 55 },
  { time: "19:30", temperature: 23.5, humidity: 55 },
  { time: "20:00", temperature: 23.3, humidity: 56 },
  { time: "20:30", temperature: 23.1, humidity: 56 },
  { time: "21:00", temperature: 22.9, humidity: 57 },
  { time: "21:30", temperature: 22.7, humidity: 57 },
  { time: "22:00", temperature: 22.5, humidity: 58 },
  { time: "22:30", temperature: 22.3, humidity: 58 },
  { time: "23:00", temperature: 22.1, humidity: 59 },
  { time: "23:30", temperature: 21.9, humidity: 59 }
  ]

  const notifications: Notification[] = [
    {
      id: "1",
      type: "error",
      title: "Sensor desconectado",
      message: "El sensor de temperatura no responde",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      resolved: false,
    },
    {
      id: "2",
      type: "warning",
      title: "Humedad baja",
      message: "La humedad está por debajo del rango normal",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      resolved: false,
    },
    {
      id: "3",
      type: "success",
      title: "Conexión OK",
      message: "El módulo se conectó correctamente",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      resolved: true,
    },
  ]

  useEffect(() => {
    // Inicializar gráficos cuando el componente se monta y la pestaña de gráficos está activa
    if (activeTab === "chart" && tempChartRef.current && humidityChartRef.current) {
      // Destruir gráficos existentes si los hay
      if (tempChart) tempChart.destroy()
      if (humidityChart) humidityChart.destroy()

      // Crear gráfico de temperatura
      const tempCtx = tempChartRef.current.getContext('2d')
      if (tempCtx) {
        const newTempChart = new Chart(tempCtx, {
          type: 'line',
          data: {
            labels: chartData.map(data => data.time),
            datasets: [{
              label: 'Temperatura (°C)',
              data: chartData.map(data => data.temperature),
              borderColor: 'rgb(249, 115, 22)',
              backgroundColor: 'rgba(249, 115, 22, 0.1)',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: 'rgb(249, 115, 22)',
              pointRadius: 4,
              pointHoverRadius: 6
            }]
          },
          options: {
  responsive: true,
  maintainAspectRatio: false, // Esto permite que el gráfico se estire al 100% del ancho
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false
    }
  },
  scales: {
    x: {
      grid: {
        display: false
      }
    },
    y: {
      beginAtZero: false,
      min: 20,
      max: 30,
      ticks: {
        callback: function(value) {
          return value + '°C'
        }
      }
    }
  }
}
        })
        setTempChart(newTempChart)
      }

      // Crear gráfico de humedad
      const humidityCtx = humidityChartRef.current.getContext('2d')
      if (humidityCtx) {
        const newHumidityChart = new Chart(humidityCtx, {
          type: 'line',
          data: {
            labels: chartData.map(data => data.time),
            datasets: [{
              label: 'Humedad (%)',
              data: chartData.map(data => data.humidity),
              borderColor: 'rgb(59, 130, 246)',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.3,
              fill: true,
              pointBackgroundColor: 'rgb(59, 130, 246)',
              pointRadius: 4,
              pointHoverRadius: 6
            }]
          },
          options: {
            responsive: true,maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                mode: 'index',
                intersect: false
              }
            },
            scales: {
              y: {
                beginAtZero: false,
                min: 40,
                max: 70,
                ticks: {
                  callback: function(value) {
                    return value + '%'
                  }
                }
              }
            }
          }
        })
        setHumidityChart(newHumidityChart)
      }
    }

    // Limpiar gráficos cuando el componente se desmonta
    return () => {
      if (tempChart) tempChart.destroy()
      if (humidityChart) humidityChart.destroy()
    }
  }, [activeTab])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "error":
        return XCircle
      case "warning":
        return AlertTriangle
      case "success":
        return CheckCircle
      case "info":
        return Clock
      default:
        return AlertTriangle
    }
  }

  const getNotificationStyle = (type: string) => {
    switch (type) {
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      case "success":
        return "border-green-200 bg-green-50"
      case "info":
        return "border-blue-200 bg-blue-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case "error":
        return "text-red-500"
      case "warning":
        return "text-yellow-500"
      case "success":
        return "text-green-500"
      case "info":
        return "text-blue-500"
      default:
        return "text-gray-500"
    }
  }

  const pendingNotifications = notifications.filter((n) => !n.resolved).length

  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{module.name}</h1>
            <p className="text-gray-600">Código: {module.webSocketCode}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">● En línea</span>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Configurar
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-emerald-500 transition-all flex bg-emerald-600 text-white items-center gap-2">
              <DownloadIcon className="h-4 w-4" />
              Exportar Excel
            </button>
          </div>
        </div>
      </div>

      {/* Lecturas actuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {lectures.map((lecture, index) => {
          const Icon = getMeasurementIcon(lecture.name)
          const previousValue = index === 0 ? 22.8 : 58
          const isUp = lecture.value > previousValue
          const isDown = lecture.value < previousValue

          return (
            <div
              key={index}
              className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-orange-500 mr-4">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{lecture.name}</p>
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-gray-900">{lecture.value}</span>
                      <span className="ml-1 text-orange-500 text-sm">{lecture.mesurament}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {isUp && <TrendingUp className="h-4 w-4 text-green-500" />}
                  {isDown && <TrendingDown className="h-4 w-4 text-red-500" />}
                  {!isUp && !isDown && <Minus className="h-4 w-4 text-gray-400" />}
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Navegación por tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("readings")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "readings"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Lecturas
            </button>
            <button
              onClick={() => setActiveTab("chart")}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === "chart"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Gráfico
            </button>
            <button
              onClick={() => setActiveTab("notifications")}
              className={`py-2 px-1 border-b-2 font-medium text-sm relative ${
                activeTab === "notifications"
                  ? "border-orange-500 text-orange-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Notificaciones
              {pendingNotifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {pendingNotifications}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Contenido de las tabs */}
      {activeTab === "readings" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Lecturas Detalladas</h3>
          <div className="space-y-4">
            {lectures.map((lecture, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium">{lecture.name}</p>
                  <p className="text-sm text-gray-500">
                    Última actualización: {lecture.createdAt.toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold">
                    {lecture.value} {lecture.mesurament}
                  </p>
                  <p className="text-sm text-gray-500">Normal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "chart" && (
  <div className="bg-white rounded-lg border border-gray-200 p-6">
    <h3 className="text-lg font-semibold mb-4">Historial (Últimas 24 horas)</h3>

    {/* Gráficos con Chart.js */}
    <div className="space-y-8">
      {/* Temperatura */}
      <div className="w-full">
        <h4 className="font-medium mb-3 text-orange-600">Temperatura (°C)</h4>
        <div className="relative w-full" style={{ height: '300px' }}>
          <canvas ref={tempChartRef} />
        </div>
      </div>

      {/* Humedad */}
      <div className="w-full">
        <h4 className="font-medium mb-3 text-blue-600">Humedad (%)</h4>
        <div className="relative w-full" style={{ height: '300px' }}>
          <canvas ref={humidityChartRef} />
        </div>
      </div>
    </div>
  </div>
)}

      {activeTab === "notifications" && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold mb-4">Notificaciones del Sistema</h3>
          <div className="space-y-3">
            {notifications.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay notificaciones</p>
            ) : (
              notifications.map((notification) => {
                const Icon = getNotificationIcon(notification.type)
                const style = getNotificationStyle(notification.type)
                const iconColor = getIconColor(notification.type)

                return (
                  <div
                    key={notification.id}
                    className={`border rounded-lg p-4 ${style} ${notification.resolved ? "opacity-60" : ""}`}
                  >
                    <div className="flex items-start">
                      <Icon className={`h-5 w-5 ${iconColor} mr-3 mt-0.5`} />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <div className="flex items-center gap-2">
                            {notification.resolved && (
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Resuelto</span>
                            )}
                            <span className="text-xs text-gray-500">{notification.timestamp.toLocaleTimeString()}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{notification.message}</p>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}