import { ReadingType } from "../readingTypes/readingtypes.type";

type BaseConfiguration = {
    minValue: number;
    maxValue: number;
    moduleId: number;
    readingTypeId: number;
};

export type Configuration = BaseConfiguration & {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    isActive: boolean;
    readingType: ReadingType;
};

export type SaveConfigurationTemplate = BaseConfiguration;

export type UpdateConfigurationTemplate = BaseConfiguration & {
    id: number;
    isActive: boolean;
};
