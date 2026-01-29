'use client';

import Image from 'next/image';
import { useThemeStore } from '@/lib/store/themeStore';

export default function HomePage() {
  const { isDark, toggleTheme } = useThemeStore();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      {/* 메인 섹션 */}
      <section className="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12">
        {/* 유미 이미지 - 왼쪽 */}
        <div className="flex-shrink-0 w-full max-w-[300px] md:max-w-[450px]">
          <Image
            src={isDark ? "/yumi-main-dark.png" : "/yumi-main-light.png"}
            alt="유미"
            width={450}
            height={450}
            className="w-full h-auto rounded-full"
          />
        </div>

        {/* 서비스 소개 - 오른쪽 */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6 text-center md:text-left">
            우리 함께 만드는 지식공방<br/> You&Me, YumiWiki
          </h1>

          <div className="whitespace-pre-wrap text-base md:text-lg space-y-3 md:space-y-4 leading-relaxed">

{
`구석에 고양이 한 마리가 웅크리고 있습니다. 이름은 유미입니다.
대부분의 시간을 자면서 보냅니다. 
가끔 한쪽 눈을 뜨고 공방 안을 훑어보지만, 곧 다시 눈을 감습니다.

이곳은 개발자들이 기술을 배우고 익히는 공간입니다. 
누군가는 프레임워크를 뜯어보고, 누군가는 개념을 정리합니다.

`
}
            <p className="font-medium">
              치열하게 공부하는 사람들이 있고, 구석에서 자는 고양이가 있습니다.<br/>둘 다 이 공방의 일부입니다.
            </p>
          </div>
        </div>
      </section>

      {/* 시작하기 버튼 (옵션) */}
      <section className="text-center">
        <a
          href="/docs/Java"
          className="inline-block px-6 md:px-8 py-2 md:py-3 bg-orange text-white rounded-lg hover:bg-orange/80 transition-colors text-sm md:text-base"
        >
          위키 둘러보기
        </a>
      </section>
    </div>
  );
}
