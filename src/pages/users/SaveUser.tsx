import type React from "react";

import { PlusIcon, X } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import { useCreateUser } from "@/hooks/users/user.save-hook";
import toast from "react-hot-toast";
import { SaveUserTemplate } from "@/types/users/saveUser.type";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const SaveUserSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  username: z.string().trim().min(1, "El usuario es obligatorio"),
  firstLastname: z.string().trim().min(1, "El primer apellido es obligatorio"),
  secondLastname: z.string().trim().min(1, "El segundo apellido es obligatorio"),
  password: z.string().trim().min(8, "La contraseña debe tener al menos 8 caracteres"),
  roleId: z.number().min(1, "Selecciona un rol válido"),
})
type SaveUserType = z.infer<typeof SaveUserSchema>

export default function SaveUser() {
  const { isModalOpen, closeModal, openModal } = useUserStore();
  const { mutate } = useCreateUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<SaveUserType>({
    resolver: zodResolver(SaveUserSchema),
    defaultValues: {
      name: "",
      username: "",
      firstLastname: "",
      secondLastname: "",
      password: "",
      roleId: 1,
    },
  })

  const submit = (data: SaveUserType) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Usuario creado")
        closeModal();
        reset();
      },
      onError: (err: any) => {
        toast.error(err.message)
      },
    });
  }

  return (
    <div>
      <button
        onClick={openModal}
        className="bg-orange-500 text-white px-4 rounded-sm py-2 flex flex-row items-center gap-2 hover:bg-orange-600 transition-colors"
      >
        <PlusIcon className="h-4 w-4" />
        Crear
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity"
            onClick={closeModal}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
            <form onSubmit={handleSubmit(submit)} className="p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    id="name"
                    {...register("name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="nombre"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
                  <input
                    type="text"
                    id="username"
                    {...register("username")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="usuario"
                  />
                  {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>}
                </div>
                <div>
                  <label htmlFor="firstLastname" className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido</label>
                  <input
                    type="text"
                    id="firstLastname"
                    {...register("firstLastname")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="apellido paterno"
                  />
                  {errors.firstLastname && <p className="text-red-600 text-xs mt-1">{errors.firstLastname.message}</p>}
                </div>
                <div>
                  <label htmlFor="secondLastname" className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
                  <input
                    type="text"
                    id="secondLastname"
                    {...register("secondLastname")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="apellido materno"
                  />
                  {errors.secondLastname && <p className="text-red-600 text-xs mt-1">{errors.secondLastname.message}</p>}
                </div>
                <div className="col-span-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    placeholder="contraseña"
                  />
                  {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div className="col-span-2">
                  <label htmlFor="roleId" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
                  <select
                    id="roleId"
                    {...register("roleId", { valueAsNumber: true })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white"
                  >
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuario</option>
                  </select>
                  {errors.roleId && <p className="text-red-600 text-xs mt-1">{errors.roleId.message}</p>}
                </div>
              </div>
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
