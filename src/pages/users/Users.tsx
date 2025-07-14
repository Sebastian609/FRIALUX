import { useUserStore } from "@/stores/user-store";
import { useUsers } from "@/hooks/users/user-hooks";

import SaveUser from "./SaveUser";
import UpdateUser from "./UpdateUser";
import CustomDropDown from "@/ui/dropdowns/custom-dropdown";
import DeleteUser from "@/components/users/delete-user";
import UpdateUserPassword from "@/components/users/update-user-password";
import Loading from "./LoadingUsers";
import ErrorFetching from "./ErrorFetchingUsers";
import { useCallback } from "react";


function UsersTable() {
  const {
    page,
    setPage,
    itemsPerPage,
    setItemsPerPage,
    openUpdate,
    openDelete,
    openUpdatePassword,
    setUserId,
  } = useUserStore();

  const { data, isError, error, isFetching } = useUsers();

  const pagination = data?.pagination;


    const memoizedShowDelete = useCallback((id: number) => {
    setUserId(id);
    openDelete();
  }, [setUserId, openDelete]); // Dependencias: setters de estado son estables, pero inclúyelos

  const memoizedGetUser = useCallback(async (id: number) => {
    setUserId(id);
    openUpdate();
  }, [setUserId, openUpdate]);

  const memoizedShowUpdatePassword = useCallback(async (id: number) => {
    setUserId(id);
    openUpdatePassword();
  }, [setUserId, openUpdatePassword]);


  if (isFetching) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorFetching error={error.message} />;
  }

  return (
    <div className="h-screen">
      <DeleteUser />
      <UpdateUser />

      <UpdateUserPassword />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600">
            Administra y visualiza todos los usuarios del sistema
          </p>
        </div>

        {/* Controls Card */}
        <div className="bg-white rounded-xl  shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              <SaveUser />

              <label className="text-sm font-medium text-gray-700">
                Mostrar:
              </label>
              <select
                className="bg-white border  border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setPage(1);
                }}
              >
                {[3, 5, 10, 20].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">
                registros por página
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{pagination?.totalItems || 0}</span>
              <span>usuarios en total</span>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Nombre Completo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha Creación
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data?.response.users.map((user, index) => 
                { return (
                  <tr
                    key={user.id}
                    className={`hover:bg-gray-50 transition-colors duration-150 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-25"
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-blue-600">
                            {user.id}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name} {user.firstLastname} {user.secondLastname}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600 font-mono bg-gray-100 px-2 py-1 rounded">
                        @{user.username}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Rol {user.role.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mr-2 ${
                            user.isActive ? "bg-green-400" : "bg-red-400"
                          }`}
                        ></div>
                        {user.isActive ? "Activo" : "Inactivo"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <CustomDropDown
                    text="Opciones"
                    userId={user.id} // <-- Pasa el ID del usuario
                    onEdit={memoizedGetUser}         // <-- Pasa las funciones memoizadas
                    onDelete={memoizedShowDelete}
                    onChangePassword={memoizedShowUpdatePassword}
                  />
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>

          {data?.response.users.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No hay usuarios
              </h3>
              <p className="text-gray-500">
                No se encontraron usuarios en el sistema.
              </p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {data && data?.response.users.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 px-6 py-4 mt-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-gray-600">
                Mostrando{" "}
                <span className="font-medium text-gray-900">
                  {data.response.users.length}
                </span>{" "}
                de{" "}
                <span className="font-medium text-gray-900">
                  {pagination?.totalItems}
                </span>{" "}
                registros
              </div>

              <div className="flex items-center gap-2">
                <button
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    !pagination?.hasPreviousPage || isFetching
                      ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  onClick={() => setPage(page - 1)}
                  disabled={!pagination?.hasPreviousPage || isFetching}
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Anterior
                </button>

                <div className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-50 rounded-lg border border-gray-200">
                  Página{" "}
                  <span className="font-medium mx-1">
                    {pagination?.currentPage !== undefined
                      ? pagination.currentPage + 1
                      : 1}
                  </span>
                  de{" "}
                  <span className="font-medium ml-1">
                    {pagination?.totalPages ?? 1}
                  </span>
                </div>

                <button
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    !pagination?.hasNextPage || isFetching
                      ? "bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  onClick={() => setPage(page + 1)}
                  disabled={!pagination?.hasNextPage || isFetching}
                >
                  Siguiente
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
}

export default UsersTable;
