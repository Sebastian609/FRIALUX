import { SaveConfigurationTemplate } from "@/types/configuration/configuration.type";
import React from "react";
import Button from "../shared/buttons/Button";
import { useReadigTypes } from "@/hooks/readingType/get-all-readingType.hook";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

export interface CreateConfigurationProps {
    moduleId: number;
    onSubmit: (data: SaveConfigurationTemplate) => Promise<void>;
}

const CreateConfigurationSchema = z.object({
    minValue: z
        .number()
        .refine((val) => val !== null && val !== undefined, { message: "El valor mínimo es requerido" })
        .refine(
            (value) => {
                const decimalPart = value.toString().split(".")[1];
                if (!decimalPart) return true;
                return decimalPart.length <= 2;
            },
            {
                message: "El número debe tener como máximo 2 decimales.",
            }
        ),
    maxValue: z
        .number()
        .refine((val) => val !== null && val !== undefined, { message: "El valor máximo es requerido" })
        .min(-100, { message: "El valor no puede ser menor a -100" })
        .max(100, { message: "El valor no puede ser mayor a 100" })
        .refine(
            (value) => {
                const decimalPart = value.toString().split(".")[1];
                if (!decimalPart) return true;
                return decimalPart.length <= 2;
            },
            {
                message: "El número debe tener como máximo 2 decimales.",
            }
        ),
    moduleId: z.number(),
    readingTypeId: z.number().refine((val) => val !== null && val !== undefined, { message: "El tipo de lectura es requerido" }),
}).refine((data) => data.maxValue > data.minValue, {
    message: "El valor máximo debe ser mayor que el valor mínimo",
    path: ["maxValue"],
});

type CreateConfigurationType = z.infer<typeof CreateConfigurationSchema>;

export default function CreateConfiguration({ moduleId, onSubmit }: CreateConfigurationProps) {
    const { data } = useReadigTypes();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        
    } = useForm<CreateConfigurationType>({
        resolver: zodResolver(CreateConfigurationSchema),
        defaultValues: {
            minValue: 0,
            maxValue: 0,
            moduleId: moduleId,
            readingTypeId: 1,
        },
    });

    // Asegura que moduleId siempre esté presente
    React.useEffect(() => {
        setValue("moduleId", moduleId);
    }, [moduleId, setValue]);

    const submit = async (data: CreateConfigurationType) => {
        await onSubmit(data);
    };

    return (
        <form
            onSubmit={handleSubmit(submit)}
            className="max-w-md mx-auto rounded-lg space-y-4"
        >
            <h2 className="text-lg font-semibold text-gray-800">Crear Configuración</h2>

            <div>
                <label htmlFor="readingTypeId" className="block text-sm font-medium text-gray-700">
                    Tipo de lectura:
                </label>
                <select
                    id="readingTypeId"
                    {...register("readingTypeId", { valueAsNumber: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                >
                    {data && data.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name} - {type.simbol}
                        </option>
                    ))}
                </select>
                {errors.readingTypeId && (
                    <p className="text-red-600">{errors.readingTypeId.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="minValue" className="block text-sm font-medium text-gray-700">
                    Valor mínimo:
                </label>
                <input
                    type="number"
                    id="minValue"
                    step="0.01"
                    {...register("minValue", { valueAsNumber: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                {errors.minValue && (
                    <p className="text-red-600">{errors.minValue.message}</p>
                )}
            </div>

            <div>
                <label htmlFor="maxValue" className="block text-sm font-medium text-gray-700">
                    Valor máximo:
                </label>
                <input
                    type="number"
                    id="maxValue"
                    step="0.01"
                    {...register("maxValue", { valueAsNumber: true })}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                />
                {errors.maxValue && (
                    <p className="text-red-600">{errors.maxValue.message}</p>
                )}
            </div>

            <input type="hidden" {...register("moduleId", { valueAsNumber: true })} />

            <div className="pt-4">
                <Button type="submit" className="w-full">
                    Crear
                </Button>
            </div>
        </form>
    );
}
