import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * 디바이스 ID를 관리하는 store
 * 사용자 추적 및 분석을 위한 고유 디바이스 식별자
 */
interface DeviceState {
  deviceId: string | null;
  initializeDeviceId: () => void;
}

/**
 * UUID v4 생성 함수
 * 브라우저별로 고유한 디바이스 ID 생성
 */
function generateDeviceId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const useDeviceStore = create<DeviceState>()(
  persist(
    (set, get) => ({
      deviceId: null,

      // 디바이스 ID 초기화: 없으면 새로 생성, 있으면 기존 값 유지
      initializeDeviceId: () => {
        const currentId = get().deviceId;
        if (!currentId) {
          const newId = generateDeviceId();
          set({ deviceId: newId });
        }
      },
    }),
    {
      name: 'device-storage', // localStorage 키 이름
    }
  )
);
