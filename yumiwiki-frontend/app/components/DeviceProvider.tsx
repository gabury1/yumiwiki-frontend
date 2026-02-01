'use client';

import { useEffect } from 'react';

function generateDeviceId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * 디바이스 ID 초기화 컴포넌트
 * 앱 로드 시 쿠키에 device_id가 없으면 UUID를 생성하여 세팅
 * 쿠키는 모든 요청에 자동 포함되어 서버에서도 읽기 가능
 */
export default function DeviceProvider() {
  useEffect(() => {
    const exists = document.cookie.split('; ').find((c) => c.startsWith('device_id='));
    if (!exists) {
      const id = generateDeviceId();
      document.cookie = `device_id=${id}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;

      // 새 디바이스 생성 로그 전송 (fire-and-forget)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
      fetch(`${apiUrl}/api/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Device-ID': id,
        },
        body: JSON.stringify({
          logType: 'NEW_DEVICE_ID_LOG',
          body: { device_id: id },
        }),
      }).catch(() => {});
    }
  }, []);

  return null;
}
