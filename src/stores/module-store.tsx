
import { Module } from "@/types/modules/module.type";
import { create } from "zustand";

interface ModuleStore {
  modules: Module[];
  setModules: (modules: Module[]) => void;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}
export const useModuleStore = create<ModuleStore>((set) => ({
  modules: [],
  setModules: (modules) => set({ modules }),
  page: 1,
  setPage: (page) => set({ page }),
  itemsPerPage: 10,
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
}));
