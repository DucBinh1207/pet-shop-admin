import { create } from "zustand";

type RoleStore = {
  idRole: number;
  setIdRole: (role: number) => void;
};

const useRole = create<RoleStore>((set) => ({
  idRole: 0,
  setIdRole: (role: number) => set({ idRole: role }),
}));

export default useRole;
