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
  userId: number | null;
  setUserId: (id: number) => void;
  setUsers: (users: User[]) => void;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  page: number;
  setPage: (page: number) => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  formData: SaveUserTemplate;
  setFormData: (user: SaveUserTemplate) => void;
  isUpdateOpen: boolean;
  openUpdate: () => void;
  closeUpdate: () => void;
  deleteOpen: boolean;
  openDelete: () => void;
  closeDelete: () => void;
  updatePassword: boolean;
  openUpdatePassword: () => void;
  closeUpdatePassword: () => void;
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
  setFormData: (user) => set({ formData: user }),
  isUpdateOpen: false,
  openUpdate: () => set({ isUpdateOpen: true }),
  closeUpdate: () => set({ isUpdateOpen: false }),
  deleteOpen: false,
  openDelete: () => set({ deleteOpen: true }),
  closeDelete: () => set({ deleteOpen: false }),
  userId: null,
  setUserId: (id: number) => set({ userId: id }),
  updatePassword: false,
  openUpdatePassword: () => set({ updatePassword: true }),
closeUpdatePassword: () => set({ updatePassword: false }),
}));
