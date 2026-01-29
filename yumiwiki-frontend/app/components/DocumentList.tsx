import Link from 'next/link';
import { fetchDocumentList } from '@/lib/api';

/**
 * 문서 목록을 표시하는 컴포넌트
 * 최근 문서 또는 랜덤 문서 목록을 카드 형식으로 보여줍니다
 */
export default async function DocumentList() {
  // API에서 문서 목록 가져오기 (5개)
  const documents = await fetchDocumentList(5);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      {/* 헤더: 제목 + 화살표 */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
          다른 문서 보기
        </h2>
        <Link
          href="/docs"
          className="text-orange hover:text-orange/80 transition-colors"
          aria-label="모든 문서 보기"
        >
          
        </Link>
      </div>

      {/* 문서 목록 */}
      <ul className="space-y-2">
        {documents.length === 0 ? (
          <li className="text-sm text-gray-500 dark:text-gray-400">
            문서가 없습니다.
          </li>
        ) : (
          documents.map((doc) => (
            <li key={doc.title}>
              <Link
                href={`/docs/${encodeURIComponent(doc.title)}`}
                className="flex items-center justify-between py-2 px-3 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
              >
                {/* 문서 제목 */}
                <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-orange dark:group-hover:text-orange transition-colors">
                  {doc.title}
                </span>
                {/* 시간 표시 (있을 경우) */}
                {doc.updatedAt && (
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    {doc.updatedAt}
                  </span>
                )}
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
