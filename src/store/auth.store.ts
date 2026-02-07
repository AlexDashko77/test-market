import { create } from "zustand";
import { User } from "@/types/auth.types";
import { loginRequest, logoutRequest } from "@/services/auth.service";
import { getApiErrorMessage } from "@/services/apiError";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user, error: null }),

  login: async (username, password) => {
    try {
      set({ isLoading: true, error: null });

      const user = await loginRequest({ username, password });
      console.log(user);

      set({ user });
      return true;
    } catch (err) {
      const message = getApiErrorMessage(err);
      set({ error: message });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await logoutRequest();
    set({ user: null });
  },
}));
