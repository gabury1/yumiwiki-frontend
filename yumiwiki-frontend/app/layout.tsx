import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ThemeProvider from "./components/ThemeProvider";
import FloatingYumi from "./components/FloatingYumi";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// SEO 최적화를 위한 메타데이터 설정
export const metadata: Metadata = {
  // 페이지 제목 설정
  title: {
    default: "YumiWiki - 개발자를 위한 지식 공방", // 홈페이지 기본 제목
    template: "%s | YumiWiki", // 다른 페이지 제목 형식 (예: "Java | YumiWiki")
  },
  // 검색 엔진 결과에 표시될 설명 (160자 이내 권장)
  description: "개발자들이 기술을 배우고 정리하는 곳. 프레임워크, 개념, 기술 문서를 체계적으로 쌓아가는 위키입니다.",
  // 검색 엔진이 사이트 주제를 이해하도록 돕는 키워드
  keywords: ["개발", "프로그래밍", "위키", "기술문서", "개발자", "지식공방", "유미위키", "YumiWiki"],
  // 사이트 제작자 정보
  authors: [{ name: "YumiWiki Team" }],

  // Open Graph: SNS(카카오톡, 페이스북 등)에서 링크 공유 시 표시되는 정보
  openGraph: {
    title: "YumiWiki - 개발자를 위한 지식 공방", // SNS 카드에 표시될 제목
    description: "개발자들이 기술을 배우고 정리하는 곳", // SNS 카드에 표시될 설명
    siteName: "YumiWiki", // 사이트 이름
    locale: "ko_KR", // 언어 및 지역 설정 (한국어)
    type: "website", // 콘텐츠 타입 (웹사이트)
  },

  // Twitter/X에서 링크 공유 시 표시되는 카드 정보
  twitter: {
    card: "summary_large_image", // 큰 이미지를 포함한 카드 형식
    title: "YumiWiki", // 트위터 카드 제목
    description: "개발자를 위한 지식 공방", // 트위터 카드 설명
  },

  // 검색 엔진 크롤러에게 색인 및 링크 추적 허용 여부 설정
  robots: {
    index: true, // 검색 결과에 페이지 표시 허용
    follow: true, // 페이지 내 링크 추적 허용
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const theme = localStorage.getItem('theme-storage');
                if (theme) {
                  const parsed = JSON.parse(theme);
                  if (parsed.state && parsed.state.isDark) {
                    document.documentElement.classList.add('dark');
                  }
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <ThemeProvider />
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <FloatingYumi />
      </body>
    </html>
  );
}
