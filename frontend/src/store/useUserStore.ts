import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
    token: string | null;
    user: any | null;
    login: (token: string, user: any) => void;
    logout: () => void;
}

export const useUserStore = create(
    persist<UserState>(
        (set) => ({
            token: null,
            user: null,
            login: (token, user) => set({ token, user }),
            logout: () => set({ token: null, user: null }),
        }),
        {
            name: "user-storage",
        }
    )
);
