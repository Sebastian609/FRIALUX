import React from "react";
import { X } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import { useFetchUserById } from "@/hooks/users/user.get-by-id-hook";
import { useUpdateUser } from "@/hooks/users/update-user.hookt";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

const UpdateUserSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  username: z.string().trim().min(1, "El usuario es obligatorio"),
  firstLastname: z.string().trim().min(1, "El primer apellido es obligatorio"),
  secondLastname: z.string().trim().min(1, "El segundo apellido es obligatorio"),
  isActive: z.boolean(),
  roleId: z.number().min(1, "Selecciona un rol válido"),
})
type UpdateUserType = z.infer<typeof UpdateUserSchema>

export default function UpdateUser() {
  const { isUpdateOpen, closeUpdate, userId } = useUserStore();
  const { data } = useFetchUserById(userId || 0);
  const { mutateAsync } = useUpdateUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UpdateUserType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: data?.name || "",
      username: data?.username || "",
      firstLastname: data?.firstLastname || "",
      secondLastname: data?.secondLastname || "",
      isActive: data?.isActive ?? true,
      roleId: data?.roleId || 1,
    },
  })

  // Sincroniza los datos cuando cambian
  React.useEffect(() => {
    if (data) {
      setValue("name", data.name)
      setValue("username", data.username)
      setValue("firstLastname", data.firstLastname)
      setValue("secondLastname", data.secondLastname)
      setValue("isActive", data.isActive)
      setValue("roleId", data.roleId)
    }
  }, [data, setValue])

  const submit = async (form: UpdateUserType) => {
    await toast.promise(mutateAsync(form), {
      loading: "Actualizando...",
      success: "Usuario actualizado",
      error: (err) => `Error: ${err.message}`,
    });
    closeUpdate();
    reset();
  }

  if (!isUpdateOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={closeUpdate}
      ></div>
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
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
        <form onSubmit={handleSubmit(submit)} className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                id="name"
                {...register("name")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Nombre"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Usuario</label>
              <input
                type="text"
                id="username"
                {...register("username")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Usuario"
              />
              {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username.message}</p>}
            </div>
            <div>
              <label htmlFor="firstLastname" className="block text-sm font-medium text-gray-700 mb-1">Primer Apellido</label>
              <input
                type="text"
                id="firstLastname"
                {...register("firstLastname")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Primer Apellido"
              />
              {errors.firstLastname && <p className="text-red-600 text-xs mt-1">{errors.firstLastname.message}</p>}
            </div>
            <div>
              <label htmlFor="secondLastname" className="block text-sm font-medium text-gray-700 mb-1">Segundo Apellido</label>
              <input
                type="text"
                id="secondLastname"
                {...register("secondLastname")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                placeholder="Segundo Apellido"
              />
              {errors.secondLastname && <p className="text-red-600 text-xs mt-1">{errors.secondLastname.message}</p>}
            </div>
            <div className="col-span-2 flex items-center space-x-2">
              <input
                type="checkbox"
                id="isActive"
                {...register("isActive")}
                className="h-4 w-4 text-orange-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700">Activo</label>
            </div>
            <div className="col-span-2">
              <label htmlFor="roleId" className="block text-sm font-medium text-gray-700 mb-1">Rol</label>
              <select
                id="roleId"
                {...register("roleId", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 bg-white"
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
