'use client';

import { useCallback } from 'react';
import { CollectedCreature } from '@/types/collection';
import type { Season } from '@/types/creature';

interface UseCollectionOptions {
  collected: Record<string, CollectedCreature>;
  onUpdate: (collected: Record<string, CollectedCreature>) => void;
}

interface UseCollectionReturn {
  collected: Record<string, CollectedCreature>;
  isCollected: (creatureId: string) => boolean;
  collectCreature: (
    creatureId: string,
    ocean: string,
    season: Season
  ) => { isNew: boolean };
  getCollectionRate: () => number;
  getCollectedCount: () => number;
}

/**
 * 도감 수집 관리 훅
 */
export function useCollection({
  collected,
  onUpdate,
}: UseCollectionOptions): UseCollectionReturn {
  // 수집 여부 확인
  const isCollected = useCallback(
    (creatureId: string): boolean => {
      return creatureId in collected;
    },
    [collected]
  );

  // 생물 수집
  const collectCreature = useCallback(
    (
      creatureId: string,
      ocean: string,
      season: Season
    ): { isNew: boolean } => {
      const existing = collected[creatureId];

      if (existing) {
        // 이미 수집된 경우 count만 증가
        const updated = {
          ...collected,
          [creatureId]: {
            ...existing,
            count: existing.count + 1,
          },
        };
        onUpdate(updated);
        return { isNew: false };
      } else {
        // 새로 수집
        const updated = {
          ...collected,
          [creatureId]: {
            first_met: new Date().toISOString(),
            ocean,
            season,
            count: 1,
          },
        };
        onUpdate(updated);
        return { isNew: true };
      }
    },
    [collected, onUpdate]
  );

  // 수집률 계산 (총 생물 수는 외부에서 주입받아야 하지만, 여기서는 단순 count)
  const getCollectedCount = useCallback(() => {
    return Object.keys(collected).length;
  }, [collected]);

  // 수집률 계산 (전체 생물 수 대비)
  const getCollectionRate = useCallback(() => {
    // 전체 생물 수는 외부에서 주입받아야 정확하지만,
    // 여기서는 임시로 수집된 생물 수만 반환
    // 실제 사용 시에는 전체 생물 수를 prop으로 받아서 계산해야 함
    return getCollectedCount();
  }, [getCollectedCount]);

  return {
    collected,
    isCollected,
    collectCreature,
    getCollectionRate,
    getCollectedCount,
  };
}
