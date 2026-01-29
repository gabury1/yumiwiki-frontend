import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 테마 상태를 관리하는 store
interface ThemeState {
  isDark: boolean; // 다크모드인지 여부
  toggleTheme: () => void; // 다크모드 토글 함수
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false, // 초기값은 라이트모드
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage', // localStorage에 저장될 키 이름
    }
  )
);
