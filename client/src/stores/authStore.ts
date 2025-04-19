import { create } from 'zustand';

interface AuthState {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isSignIn: false,
  setIsSignIn: (value: boolean) => set({ isSignIn: value }), // 로그인 상태 업데이트
  logout: () => set({ isSignIn: false }), // 로그아웃 시 상태 초기화
}));

export default useAuthStore;
