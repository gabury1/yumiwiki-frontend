import { cache } from 'react';
import { cookies } from 'next/headers';

/**
 * 요청 쿠키에서 deviceID를 읽는 헬퍼 함수
 * 클라이언트에서 DeviceProvider가 쿠키로 동기화한 값을 서버에서 읽음
 */
async function getDeviceId(): Promise<string | null> {
  try {
    const cookieStore = await cookies();
    return cookieStore.get('device_id')?.value || null;
  } catch {
    return null;
  }
}

/**
 * API 요청 시 사용할 헤더 생성
 * deviceID가 있으면 X-Device-ID 헤더에 포함
 */
async function getApiHeaders(): Promise<HeadersInit> {
  const headers: HeadersInit = {};

  const deviceId = await getDeviceId();
  if (deviceId) {
    headers['X-Device-ID'] = deviceId;
  }

  return headers;
}

// API 응답 타입
export interface DocumentData {
  title: string;
  alias: string[];
  body: string; // 서버에서 HTML로 변환된 마크다운 (위키링크 포함)
}

// 문서 목록 아이템 타입
export interface DocumentListItem {
  title: string;
  updatedAt?: string; // 마지막 수정 시간 (선택)
}

// API 기본 URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// 문서 조회 시 추적용 파라미터
export interface FetchDocumentParams {
  utm_source?: string;  // 트래픽 출처 (예: google, kakao)
  referer_doc?: string; // 출발 문서 제목 (문서A → 문서B 이동 시 A)
}

/**
 * 문서 데이터를 API에서 가져옵니다.
 * React의 cache를 사용하여 같은 렌더링 주기 내에서 중복 요청을 방지합니다.
 *
 * @param title 문서 제목
 * @param params 추적용 파라미터 (utm_source, referer_doc)
 * @returns 문서 데이터 또는 null (찾지 못한 경우)
 */
export const fetchDocument = cache(async (title: string, params?: FetchDocumentParams): Promise<DocumentData | null> => {
  try {
    const url = new URL(`${API_BASE_URL}/api/docs/${encodeURIComponent(title)}`);
    if (params?.utm_source) url.searchParams.set('utm_source', params.utm_source);
    if (params?.referer_doc) url.searchParams.set('referer_doc', params.referer_doc);

    const response = await fetch(url.toString(), {
      headers: await getApiHeaders(),
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('문서 가져오기 실패:', error);
    return null;
  }
});

/**
 * 문서 목록을 API에서 가져옵니다.
 * React의 cache를 사용하여 같은 렌더링 주기 내에서 중복 요청을 방지합니다.
 *
 * @param limit 가져올 문서 개수 (기본값: 5)
 * @returns 문서 목록 배열
 */
export const fetchDocumentList = cache(async (limit: number = 5): Promise<DocumentListItem[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/docs?limit=${limit}`, {
      headers: await getApiHeaders(),
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();

    // API 응답: { docs: string[] } 형태
    // DocumentListItem[] 형태로 변환
    const docsList: string[] = data.docs || [];
    return docsList.slice(0, limit).map((title) => ({ title }));
  } catch (error) {
    console.error('문서 목록 가져오기 실패:', error);
    return [];
  }
});
