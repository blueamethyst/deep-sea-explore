'use client';

import { useCallback } from 'react';
import { FamilyProfile, FamilyMember } from '@/types/collection';

interface UseFamilyProfileOptions {
  family: FamilyProfile;
  onUpdate: (family: FamilyProfile) => void;
}

interface UseFamilyProfileReturn {
  family: FamilyProfile;
  updateMember: (role: keyof FamilyProfile, updates: Partial<FamilyMember>) => void;
  completeSetup: () => void;
  isSetupComplete: boolean;
}

/**
 * 가족 프로필 관리 훅
 */
export function useFamilyProfile({
  family,
  onUpdate,
}: UseFamilyProfileOptions): UseFamilyProfileReturn {
  // 멤버 업데이트
  const updateMember = useCallback(
    (role: keyof FamilyProfile, updates: Partial<FamilyMember>) => {
      if (role === 'setupComplete') {
        console.warn('[useFamilyProfile] setupComplete은 updateMember로 변경할 수 없습니다.');
        return;
      }

      const member = family[role];
      if (typeof member === 'object' && 'name' in member) {
        const updated = {
          ...family,
          [role]: {
            ...member,
            ...updates,
          },
        };
        onUpdate(updated);
      }
    },
    [family, onUpdate]
  );

  // 설정 완료 처리
  const completeSetup = useCallback(() => {
    const updated = {
      ...family,
      setupComplete: true,
    };
    onUpdate(updated);
  }, [family, onUpdate]);

  return {
    family,
    updateMember,
    completeSetup,
    isSetupComplete: family.setupComplete,
  };
}
