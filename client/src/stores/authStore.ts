import { create } from 'zustand';

interface AuthState {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isSignIn: false,
  setIsSignIn: (value: boolean) => set({ isSignIn: value }),
}));

export default useAuthStore;
