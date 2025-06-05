import { SaveUserTemplate } from "@/types/users/saveUser.type";
import { create } from "zustand";

interface User {
  id: number;
  name: string;
  firstLastname: string;
  secondLastname: string;
  username: string;
  isActive: boolean;
  roleId: number;
  role: { name: string };
  createdAt: string;
  updatedAt: string;
}

interface UserStore {
  users: User[];
  setUsers: (users: User[]) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  formData: SaveUserTemplate,
  setFormData: (user:SaveUserTemplate) => void
}

export const useUserStore = create<UserStore>((set) => ({
  users: [],
  setUsers: (users) => set({ users }),
  isModalOpen: false,
  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  page: 1,
  setPage: (page) => set({ page }),
  itemsPerPage: 10,
  setItemsPerPage: (items) => set({ itemsPerPage: items }),
  formData: {
     name: "",
    username: "",
    firstLastname: "",
    secondLastname: "",
    password: "",
    roleId: 1,
  },
  setFormData: (user) => set({formData: user}) 
}));
