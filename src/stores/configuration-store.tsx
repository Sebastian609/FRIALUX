

import { Configuration } from "@/types/configuration/configuration.type";
import { create } from "zustand";

interface ConfigurationStore {
  configurations: Configuration[];
  setConfigurations: (configurations: Configuration[]) => void;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}
export const useConfigurationStore = create<ConfigurationStore>((set) => ({
  configurations: [],
  setConfigurations: (configurations) => set({ configurations }),
  page: 1,
  setPage: (page) => set({ page }),
  itemsPerPage: 10,
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
}));
