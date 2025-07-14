import { useState } from "react"
import Button from "@/components/shared/buttons/Button"
import { Save } from "lucide-react"
import { SaveModuleTemplate } from "@/types/modules/saveModule.type"

type CreateModuleFormProps = {
  onSubmit: (data: SaveModuleTemplate) => Promise<void>
  onCancel: () => void
}

export default function CreateModuleForm({
  onSubmit,
  onCancel,
}: CreateModuleFormProps) {
  const [name, setName] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError("El nombre es obligatorio")
      return
    }

    setError("")

    const saveModule: SaveModuleTemplate = {
      name: name.trim(),
    }

    await onSubmit(saveModule)
    setName("")
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nombre del Módulo
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
          placeholder="Ej: Congelador Sala A"
        />
        {error && <p className="text-red-600 text-xs mt-1">{error}</p>}
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
