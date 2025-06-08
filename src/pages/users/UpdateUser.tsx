import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import { useFetchUserById } from "@/hooks/user.get-by-id-hook";
import { UpdateUserDTO } from "@/types/users/user.type";
import { useUpdateUser } from "@/hooks/update-user.hookt";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const { isUpdateOpen, closeUpdate, userId } = useUserStore();
  const { data } = useFetchUserById(userId || 0);
  const { mutateAsync } = useUpdateUser();

  const [updateData, setUpdateData] = useState<UpdateUserDTO>(
    data || {
      name: "",
      firstLastname: "",
      secondLastname: "",
      username: "",
      isActive: true,
      roleId: 1,
    }
  );

  useEffect(() => {
    if (data) {
      setUpdateData(data);
    }
  }, [data]);


  const handleInputChange = <K extends keyof UpdateUserDTO>(
    key: K,
    value: UpdateUserDTO[K]
  ) => {
    if (!updateData) return;
    setUpdateData((prev) => ({
      ...prev!,
      [key]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!updateData) {
      return;
    }

    await toast.promise(mutateAsync(updateData), {
      loading: "Actualizando...",
      success: "Usuario actualizado",
      error: (err) => `Error: ${err.message}`,
    });
  };

  if (!updateData || !isUpdateOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={closeUpdate}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Actualizar Usuario
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Modifica los datos necesarios y guarda los cambios.
            </p>
          </div>
          <button
            onClick={closeUpdate}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Nombre */}
            <InputField
              label="Nombre"
              id="name"
              value={updateData.name}
              onChange={(val) => handleInputChange("name", val)}
              required
            />

            {/* Usuario */}
            <InputField
              label="Usuario"
              id="username"
              value={updateData.username}
              onChange={(val) => handleInputChange("username", val)}
              required
            />

            {/* Primer Apellido */}
            <InputField
              label="Primer Apellido"
              id="firstLastname"
              value={updateData.firstLastname}
              onChange={(val) => handleInputChange("firstLastname", val)}
              required
            />

            {/* Segundo Apellido */}
            <InputField
              label="Segundo Apellido"
              id="secondLastname"
              value={updateData.secondLastname}
              onChange={(val) => handleInputChange("secondLastname", val)}
              required
            />

            {/* Activo */}
            <div className="col-span-2 flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                checked={updateData.isActive}
                onChange={(e) =>
                  handleInputChange("isActive", e.target.checked)
                }
                className="h-4 w-4 text-orange-500 border-gray-300 rounded"
              />
              <label
                htmlFor="isActive"
                className="text-sm font-medium text-gray-700"
              >
                Activo
              </label>
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
                value={updateData.roleId}
                onChange={(e) =>
                  handleInputChange("roleId", Number(e.target.value))
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
              >
                <option value={1}>Administrador</option>
                <option value={2}>Usuario</option>
              </select>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeUpdate}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:ring-orange-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:ring-orange-500"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

interface InputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

function InputField({
  id,
  label,
  value,
  onChange,
  required = false,
}: InputFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
        placeholder={label}
        required={required}
      />
    </div>
  );
}
