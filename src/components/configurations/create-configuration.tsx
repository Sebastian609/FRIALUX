import { SaveConfigurationTemplate } from "@/types/configuration/configuration.type";
import React, { useState } from "react";
import Button from "../shared/buttons/Button";
import { useReadigTypes } from "@/hooks/readingType/get-all-readingType.hook";

export interface CreateConfigurationProps {
    moduleId: number;
      onSubmit: (data: SaveConfigurationTemplate) => Promise<void>
}



export default function CreateConfiguration({ moduleId, onSubmit }: CreateConfigurationProps) {
    const [config, setConfig] = useState<SaveConfigurationTemplate>({
        minValue: 0,
        maxValue: 0,
        moduleId: moduleId,
        readingTypeId: 1, // Default to Grados Centígrados
    });

       const { data } = useReadigTypes()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setConfig((prev) => ({
            ...prev,
            [name]: type === "number" || name === "readingTypeId" ? Number(value) : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(config);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto rounded-lg space-y-4"
        >
            <h2 className="text-lg font-semibold text-gray-800">Crear Configuración</h2>

            <div>
                <label htmlFor="readingTypeId" className="block text-sm font-medium text-gray-700">
                    Tipo de lectura:
                </label>
                <select
                    name="readingTypeId"
                    id="readingTypeId"
                    value={config.readingTypeId}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                >
                    {data && data.map((type) => (
                        <option key={type.id} value={type.id}>
                            {type.name} - {type.simbol}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="minValue" className="block text-sm font-medium text-gray-700">
                    Valor mínimo:
                </label>
                <input
                    type="number"
                    name="minValue"
                    id="minValue"
                    value={config.minValue}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div>
                <label htmlFor="maxValue" className="block text-sm font-medium text-gray-700">
                    Valor máximo:
                </label>
                <input
                    type="number"
                    name="maxValue"
                    id="maxValue"
                    value={config.maxValue}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            {/* Campo oculto del moduleId */}
            <input type="hidden" name="moduleId" value={config.moduleId} />

            <div className="pt-4">
                <Button type="submit" className="w-full">
                    Crear
                </Button>
            </div>
        </form>
    );
}
