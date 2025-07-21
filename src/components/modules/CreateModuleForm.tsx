import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import Button from "@/components/shared/buttons/Button"
import { Save } from "lucide-react"
import { SaveModuleTemplate } from "@/types/modules/saveModule.type"

type CreateModuleFormProps = {
  onSubmit: (data: SaveModuleTemplate) => Promise<void>
  onCancel: () => void
}

const CreateModuleSchema = z.object({
  name: z.string().trim().min(1, "El nombre es obligatorio")
})
type CreateModuleType = z.infer<typeof CreateModuleSchema>

export default function CreateModuleForm({
  onSubmit,
  onCancel,
}: CreateModuleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateModuleType>({
    resolver: zodResolver(CreateModuleSchema),
    defaultValues: { name: "" },
  })

  const submit = async (data: CreateModuleType) => {
    await onSubmit({ name: data.name.trim() })
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="p-4 bg-white rounded-lg shadow space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del Módulo
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Ej: Congelador Sala A"
        />
        {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" variant="primary" rightIcon={Save}>
          Crear
        </Button>
      </div>
    </form>
  )
}
