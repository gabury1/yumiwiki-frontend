'use client';

import { useEffect } from 'react';
import { useDeviceStore } from '@/lib/store/deviceStore';

/**
 * 디바이스 ID 초기화 컴포넌트
 * 사용자 최초 진입 시 deviceID를 생성하고 localStorage에 저장
 */
export default function DeviceProvider() {
  const { initializeDeviceId } = useDeviceStore();

  useEffect(() => {
    // 앱 로드 시 디바이스 ID 초기화
    initializeDeviceId();
  }, [initializeDeviceId]);

  return null; // 화면에 아무것도 렌더링하지 않음
}
