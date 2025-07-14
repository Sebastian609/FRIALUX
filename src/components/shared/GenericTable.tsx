"use client"

import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { ChevronsLeft, ChevronsRight, ChevronLeft, ChevronRight, Database } from "lucide-react"

// Mock components for demo
const Loading = () => (
  <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
    <div className="relative">
      <div className="h-8 w-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      <div className="absolute inset-0 h-8 w-8 border-2 border-blue-100 rounded-full animate-pulse"></div>
    </div>
    <p className="mt-4 text-gray-600 font-medium">Cargando datos...</p>
    <p className="text-sm text-gray-500">Por favor espera un momento</p>
  </div>
)

const ErrorFetching = ({ error }: { error: string }) => (
  <div className="flex flex-col items-center justify-center p-12 bg-gradient-to-br from-red-50 to-pink-100 rounded-xl border border-red-200">
    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
    <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar los datos</h3>
    <p className="text-red-600 text-center max-w-md">{error}</p>
  </div>
)

interface GenericTableProps<T> {
  data: T[]
  columns: ColumnDef<T, any>[]
  loading?: boolean
  error?: string
  page: number
  totalPages: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  onPageChange: (page: number) => void
  title?: string
  description?: string
  emptyMessage?: string
}

export function GenericTable<T>({
  data,
  columns,
  loading,
  error,
  page,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  title = "Tabla de Datos",
  description = "Gestiona y visualiza la información",
  emptyMessage = "No hay datos disponibles",
}: GenericTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: totalPages,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: page - 1,
        pageSize: data.length,
      },
    },
    getCoreRowModel: getCoreRowModel(),
  })

  if (loading) return <Loading />
  if (error) return <ErrorFetching error={error} />

  return (
    <div className="w-full p-6">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
            <p className="text-gray-600">{description}</p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Total: {data.length} registros</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Table Header */}
            <thead className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200 bg-gradient-to-b from-transparent to-gray-50/50"
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-100">
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row, index) => (
                  <tr
                    key={row.id}
                    className={`group hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-200 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 group-hover:text-gray-800 transition-colors duration-200"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <Database className="w-10 h-10 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Sin datos</h3>
                      <p className="text-gray-500 max-w-sm text-center">{emptyMessage}</p>
                      <div className="mt-4 px-4 py-2 bg-gray-100 rounded-full text-xs text-gray-600">
                        No se encontraron registros para mostrar
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Enhanced Pagination */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            {/* Page Info */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Página</span>
                <div className="flex items-center gap-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200">
                    {page}
                  </span>
                  <span className="text-sm text-gray-500">de</span>
                  <span className="text-sm font-semibold text-gray-700">{totalPages}</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>Mostrando {data.length} registros</span>
              </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => onPageChange(1)}
                disabled={!hasPreviousPage}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                title="Primera página"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => onPageChange(page - 1)}
                disabled={!hasPreviousPage}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                title="Página anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              {/* Current Page Indicator */}
              <div className="flex items-center px-4 py-2 mx-2 text-sm font-semibold text-gray-700 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg shadow-sm">
                {page}
              </div>

              <button
                onClick={() => onPageChange(page + 1)}
                disabled={!hasNextPage}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                title="Página siguiente"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => onPageChange(totalPages)}
                disabled={!hasNextPage}
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-700 hover:border-gray-400 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-500 disabled:hover:border-gray-300 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                title="Última página"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${(page / totalPages) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
