import { UpdateModuleTemplate } from "@/types/modules/saveModule.type";

import Button from "../shared/buttons/Button";
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import React from "react";

type EditModuleFormProps = {
  onSubmit: (data: UpdateModuleTemplate) => Promise<void>;
  onCancel: () => void;
  formData: UpdateModuleTemplate;
  loading: boolean
};

const EditModuleSchema = z.object({
  id: z.number(),
  name: z.string().trim().min(1, "El nombre es obligatorio"),
  webSocketRoom: z.string().trim().length(10, "WebSocket Room debe tener 10 caracteres"),
  isActive: z.boolean(),
})
type EditModuleType = z.infer<typeof EditModuleSchema>

export default function EditModuleForm({
  onSubmit,
  onCancel,
  formData,
  loading
}: EditModuleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EditModuleType>({
    resolver: zodResolver(EditModuleSchema),
    defaultValues: formData,
  })

  // Asegura que los valores booleanos y numéricos estén bien casteados
  React.useEffect(() => {
    setValue("id", formData.id)
    setValue("isActive", formData.isActive)
  }, [formData, setValue])

  const submit = async (data: EditModuleType) => {
    await onSubmit(data)
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="max-w-md mx-auto rounded-xl space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre:
        </label>
        <input
          type="text"
          {...register("name")}
          id="name"
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label
          htmlFor="webSocketRoom"
          className="block text-sm font-medium text-gray-700"
        >
          WebSocket Room (10 caracteres):
        </label>
        <input
          type="text"
          {...register("webSocketRoom")}
          id="webSocketRoom"
          maxLength={10}
          minLength={10}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
        {errors.webSocketRoom && <p className="text-red-600 text-xs mt-1">{errors.webSocketRoom.message}</p>}
      </div>

      <div className="flex">
        <input
          type="checkbox"
          {...register("isActive")}
          id="isActive"
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="isActive" className="text-sm text-gray-700">
          ¿Está activo?
        </label>
      </div>

      <div className="flex justify-end space-x-4 pt-4">
        <Button type="button" variant="danger" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={loading} >Guardar</Button>
      </div>
    </form>
  );
}
