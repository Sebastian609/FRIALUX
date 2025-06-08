import type React from "react";

import { PlusIcon, X } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import { useCreateUser } from "@/hooks/user.save-hook";
import { CustomToast } from "@/ui/modal/custom-toast";
import { useState } from "react";
import toast from "react-hot-toast";

export default function SaveUser() {
  const { isModalOpen, closeModal, setFormData, openModal, formData } =
    useUserStore();
  const { mutate } = useCreateUser();

  

  const handleInputChange = (field: string, value: string | number) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData, {
      onSuccess: () => {
       toast.success("Usuario creado")
        closeModal(); // Cierra el modal después de éxito
      },
      onError: (err: any) => {
   
        toast.error(err.message)
      },
    });
  };



  return (
    <div>

   
      

      {/* Botón para abrir modal */}
      <button
        onClick={openModal}
        className="bg-orange-500 text-white px-4 rounded-sm py-2 flex flex-row items-center gap-2 hover:bg-orange-600 transition-colors"
      >
        <PlusIcon className="h-4 w-4" />
        Crear
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
            onClick={() => closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Crear Nuevo Usuario
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Completa los datos para crear un nuevo usuario en el sistema.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Nombre */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="nombre"
                    required
                  />
                </div>

                {/* Usuario */}
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Usuario
                  </label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="usuario"
                    required
                  />
                </div>

                {/* Primer Apellido */}
                <div>
                  <label
                    htmlFor="firstLastname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Primer Apellido
                  </label>
                  <input
                    type="text"
                    id="firstLastname"
                    value={formData.firstLastname}
                    onChange={(e) =>
                      handleInputChange("firstLastname", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="apellido paterno"
                    required
                  />
                </div>

                {/* Segundo Apellido */}
                <div>
                  <label
                    htmlFor="secondLastname"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Segundo Apellido
                  </label>
                  <input
                    type="text"
                    id="secondLastname"
                    value={formData.secondLastname}
                    onChange={(e) =>
                      handleInputChange("secondLastname", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="apellido materno"
                    required
                  />
                </div>

                {/* Contraseña */}
                <div className="col-span-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contraseña
                  </label>
                  <input
                    type="password"
                    id="password"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="contraseña"
                    required
                  />
                </div>

                {/* Rol */}
                <div className="col-span-2">
                  <label
                    htmlFor="roleId"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rol
                  </label>
                  <select
                    id="roleId"
                    value={formData.roleId}
                    onChange={(e) =>
                      handleInputChange(
                        "roleId",
                        Number.parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  >
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuario</option>
                  </select>
                </div>
              </div>

              {/* Footer Buttons */}
              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-transparent rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                >
                  Crear Usuario
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
