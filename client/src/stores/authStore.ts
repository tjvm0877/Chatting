import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (value: boolean) => set({ isLoggedIn: value }), // 로그인 상태 업데이트
  logout: () => set({ isLoggedIn: false }), // 로그아웃 시 상태 초기화
}));

export default useAuthStore;
