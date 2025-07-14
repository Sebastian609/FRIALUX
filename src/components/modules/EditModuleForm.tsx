import { UpdateModuleTemplate } from "@/types/modules/saveModule.type";
import { useState } from "react";
import Button from "../shared/buttons/Button";

type EditModuleFormProps = {
  onSubmit: (data: UpdateModuleTemplate) => Promise<void>;
  onCancel: () => void;
  formData: UpdateModuleTemplate;
  loading: boolean
};

export default function EditModuleForm({
  onSubmit,
  onCancel,
  formData,
  loading
}: EditModuleFormProps) {
  const [form, setForm] = useState<UpdateModuleTemplate>(formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          name="name"
          id="name"
          value={form.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
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
          name="webSocketRoom"
          id="webSocketRoom"
          value={form.webSocketRoom}
          onChange={handleChange}
          maxLength={10}
          minLength={10}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex">
        <input
          type="checkbox"
          name="isActive"
          id="isActive"
          checked={form.isActive}
          onChange={handleChange}
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
