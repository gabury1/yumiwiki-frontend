'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useThemeStore } from '@/lib/store/themeStore';

export default function Header() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <header className={`${isDark ? 'bg-dark-header' : 'bg-ivory'} border-b border-mint`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* 첫 번째 줄: 로고 + 다크모드 토글 */}
        <div className="flex items-center justify-between mb-2 md:mb-0">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="YumiWiki Logo" width={40} height={40} className="w-8 h-8 md:w-10 md:h-10" />
            <span className={`${isDark ? 'text-[#E0D7D0]' : 'text-[#4A3C31]'} text-lg md:text-2xl font-bold`}>YumiWiki</span>
          </Link>

          {/* 오른쪽: 검색창(데스크탑) + 다크모드 토글 */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* 검색창 - 데스크탑에서만 표시 */}
            <input
              type="search"
              placeholder="검색..."
              className={`hidden md:block w-48 lg:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                isDark
                  ? 'bg-[#3A3430] border-[#5A534D] text-[#E0D7D0] placeholder:text-[#9A8F85]'
                  : 'bg-white border-gray-300 text-[#4A3C31] placeholder:text-[#8A7C71]'
              }`}
            />
            {/* 다크모드 토글 */}
            <button
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleTheme}
              aria-label="다크모드 토글"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* 두 번째 줄: 검색창 (모바일에서만) */}
        <input
          type="search"
          placeholder="검색..."
          className={`block md:hidden w-full px-3 py-1.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
            isDark
              ? 'bg-[#3A3430] border-[#5A534D] text-[#E0D7D0] placeholder:text-[#9A8F85]'
              : 'bg-white border-gray-300 text-[#4A3C31] placeholder:text-[#8A7C71]'
          }`}
        />
      </div>
    </header>
  );
}
