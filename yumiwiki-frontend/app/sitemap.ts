import { MetadataRoute } from 'next';
import { fetchDocumentList } from '@/lib/api';

/**
 * Google Search Console 및 검색 엔진을 위한 사이트맵 생성
 * /sitemap.xml 경로에 자동으로 생성됨
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yumiwiki.com';

  try {
    // API에서 모든 문서 목록 가져오기
    const documents = await fetchDocumentList(1000); // 충분히 큰 수로 모든 문서 가져오기

    // 동적 문서 페이지 URL 생성
    const docUrls = documents.map((doc) => ({
      url: `${baseUrl}/docs/${encodeURIComponent(doc.title)}`,
      lastModified: new Date(), // updatedAt이 있으면 사용 가능
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

    // 정적 페이지 + 동적 문서 페이지 반환
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `${baseUrl}/docs`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 0.9,
      },
      ...docUrls,
    ];
  } catch (error) {
    console.error('Sitemap generation error:', error);
    // API 에러 시 최소한 메인 페이지만 포함
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
    ];
  }
}
