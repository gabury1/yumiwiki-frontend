'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function FloatingYumi() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 플로팅 유미 버튼 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 w-16 h-16 sm:w-20 sm:h-20 sm:bottom-6 sm:right-6 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow z-50 flex items-center justify-center border-2 border-gray-200 dark:border-gray-700 overflow-hidden"
        aria-label="유미 소통창 열기"
      >
        <Image src="/yumi-floating.png" alt="Yumi" width={64} height={64} className="w-12 h-12 sm:w-16 sm:h-16" />
      </button>

      {/* 소통 창 */}
      {isOpen && (
        <div className="fixed bottom-20 right-2 left-2 sm:left-auto sm:bottom-24 sm:right-6 sm:w-80 max-w-sm h-auto max-h-[70vh] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
          {/* 헤더 */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <Image src="/yumi-floating.png" alt="Yumi" width={32} height={32} />
              <h3 className="font-bold">유미와 소통하기</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex-1 p-4 flex items-center justify-center overflow-y-auto">
            <div className="text-center">
              <div className="mb-4">
                <Image src="/yumi-floating.png" alt="Yumi" width={64} height={64} className="mx-auto" />
              </div>
              <h4 className="font-bold text-lg mb-2">준비 중이에요!</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                유미와의 소통 기능은 곧 만나보실 수 있어요 🎵
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
