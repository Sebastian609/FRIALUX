import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../shared/buttons/Button";
import { useReadigTypes } from "@/hooks/readingType/get-all-readingType.hook";

const UpdateConfigurationSchema = z.object({
  minValue: z.number().refine((value) => {
    const decimalPart = value.toString().split(".")[1];
    if (!decimalPart) return true;
    return decimalPart.length <= 2;
  }, {
    message: "El número debe tener como máximo 2 decimales."
    
  }),
  maxValue: z.number().refine((value) => {
    const decimalPart = value.toString().split(".")[1];
    if (!decimalPart) return true;
    return decimalPart.length <= 2;
  }, {
    message: "El número debe tener como máximo 2 decimales."
  }),
  moduleId: z.number(),
  readingTypeId: z.number(),
  id: z.number(),
  isActive: z.boolean(),
}).refine((data) => data.maxValue > data.minValue, {
  message: "El máximo debe ser mayor que el mínimo",
  path: ["maxValue"],
});

type UpdateConfigurationType = z.infer<typeof UpdateConfigurationSchema>;

export interface UpdateConfigurationProps {
  configuration: UpdateConfigurationType;
  onSubmit: (data: UpdateConfigurationType) => Promise<void>;
}

export default function UpdateConfiguration({
  configuration,
  onSubmit,
}: UpdateConfigurationProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateConfigurationType>({
    resolver: zodResolver(UpdateConfigurationSchema),
    defaultValues: configuration,
  });

  const update: SubmitHandler<UpdateConfigurationType> = async (data) => {
    await onSubmit(data);
  };

  const { data } = useReadigTypes();

  return (
    <form onSubmit={handleSubmit(update)} className="max-w-md mx-auto rounded-lg space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">Actualizar Configuración</h2>

      <div>
        <label htmlFor="readingTypeId" className="block text-sm font-medium text-gray-700">Tipo de lectura:</label>
        <select
          id="readingTypeId"
          {...register("readingTypeId")}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        >
          {data && data.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name} - {type.simbol}
            </option>
          ))}
        </select>
        {errors.readingTypeId && <p className="text-red-600">{errors.readingTypeId.message}</p>}
      </div>

      <div>
        <label htmlFor="minValue" className="block text-sm font-medium text-gray-700">Valor mínimo:</label>
        <input
          type="number"
          id="minValue"
          step="0.01"
          {...register("minValue", { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
        {errors.minValue && <p className="text-red-600">{errors.minValue.message}</p>}
      </div>

      <div>
        <label htmlFor="maxValue" className="block text-sm font-medium text-gray-700">Valor máximo:</label>
        <input
          type="number"
          id="maxValue"
          step="0.01"
          {...register("maxValue", { valueAsNumber: true })}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
        {errors.maxValue && <p className="text-red-600">{errors.maxValue.message}</p>}
      </div>

      <input type="hidden" {...register("moduleId")} />
      <input type="hidden" {...register("id")} />
      <input type="hidden" {...register("isActive")} />

      <div className="pt-4">
        <Button type="submit" className="w-full">Actualizar</Button>
      </div>
    </form>
  );
}
