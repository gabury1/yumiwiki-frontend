'use client';

import { useEffect } from 'react';
import { useThemeStore } from '@/lib/store/themeStore';

export default function ThemeProvider() {
  const { isDark } = useThemeStore();

  useEffect(() => {
    // isDark 상태가 바뀔 때마다 html 태그에 dark 클래스 추가/제거
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  return null; // 화면에 아무것도 렌더링하지 않음
}
