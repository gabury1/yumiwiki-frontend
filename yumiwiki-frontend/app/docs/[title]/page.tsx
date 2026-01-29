import { fetchDocument } from '@/lib/api';
import MarkdownRenderer from '@/app/components/MarkdownRenderer';
import DocumentList from '@/app/components/DocumentList';
import type { Metadata } from 'next';

/**
 * 문서 페이지별 동적 메타데이터 생성 함수
 * Next.js가 페이지 렌더링 전에 자동으로 호출하여 메타데이터를 생성함
 *
 * @param params - URL 파라미터 (문서 제목)
 * @returns 문서에 맞는 메타데이터 객체
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ title: string }>;
}): Promise<Metadata> {
  // URL 파라미터에서 문서 제목 추출
  const { title } = await params;
  // URL 인코딩된 제목을 디코딩 (예: "Next.js" → "Next.js")
  const decodedTitle = decodeURIComponent(title);

  // 백엔드 API에서 문서 데이터 가져오기
  const docData = await fetchDocument(decodedTitle);

  // 문서가 존재하지 않는 경우 (404 상황)
  if (!docData) {
    return {
      title: `${decodedTitle} (작성되지 않음)`, // 브라우저 탭에 표시될 제목
      description: `${decodedTitle} 문서는 아직 작성되지 않았습니다. YumiWiki에서 이 문서를 작성해보세요.`,
    };
  }

  // 문서 본문에서 첫 번째 단락 추출 (검색 결과 및 SNS 공유 시 설명으로 사용)
  const firstParagraph = docData.body
    .split('\n') // 줄 단위로 분리
    .find((line) => line.trim().length > 0 && !line.startsWith('#')) // 빈 줄과 제목(#) 제외
    ?.slice(0, 160); // 최대 160자까지만 사용

  // 문서가 존재하는 경우 메타데이터 생성
  return {
    title: decodedTitle, // "Java | YumiWiki" 형식으로 자동 생성 (layout.tsx의 template 적용)
    description: firstParagraph || `${decodedTitle}에 대한 기술 문서입니다.`, // 첫 단락 또는 기본 설명
    // SNS 공유 시 표시되는 Open Graph 메타데이터
    openGraph: {
      title: decodedTitle, // SNS 카드 제목
      description: firstParagraph || `${decodedTitle}에 대한 기술 문서입니다.`, // SNS 카드 설명
      type: 'article', // 콘텐츠 타입: 기사/문서
    },
  };
}

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ title: string }>;
}) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  // API에서 문서 데이터 가져오기
  const docData = await fetchDocument(decodedTitle);

  // 문서를 찾지 못한 경우
  if (!docData) {
    return (
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{decodedTitle}</h1>
        <p className="text-gray-500">문서를 찾을 수 없습니다.</p>
        <p className="text-sm text-gray-400 mt-2">
          이 문서는 아직 작성되지 않았습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row gap-6 md:gap-8">
        {/* 왼쪽: 문서 내용 */}
        <div className="flex-1 min-w-0">
          <MarkdownRenderer content={docData.body} />
        </div>

        {/* 오른쪽: 문서 목록 */}
        <aside className="w-full md:w-80 md:flex-shrink-0">
          <DocumentList />
        </aside>
      </div>
    </div>
  );
}
