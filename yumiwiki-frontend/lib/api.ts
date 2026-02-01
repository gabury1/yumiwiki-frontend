import { cache } from 'react';

/**
 * localStorage에서 deviceID를 가져오는 헬퍼 함수
 * Server-side에서는 null 반환
 */
function getDeviceId(): string | null {
  if (typeof window === 'undefined') return null; // Server-side

  try {
    const stored = localStorage.getItem('device-storage');
    if (stored) {
      const parsed = JSON.parse(stored);
      return parsed.state?.deviceId || null;
    }
  } catch {
    return null;
  }
  return null;
}

/**
 * API 요청 시 사용할 헤더 생성
 * deviceID가 있으면 X-Device-ID 헤더에 포함
 */
function getApiHeaders(): HeadersInit {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const deviceId = getDeviceId();
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

/**
 * 문서 데이터를 API에서 가져옵니다.
 * React의 cache를 사용하여 같은 렌더링 주기 내에서 중복 요청을 방지합니다.
 *
 * @param title 문서 제목
 * @returns 문서 데이터 또는 null (찾지 못한 경우)
 */
export const fetchDocument = cache(async (title: string): Promise<DocumentData | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/docs/${encodeURIComponent(title)}`, {
      headers: getApiHeaders(),
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
      headers: getApiHeaders(),
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
