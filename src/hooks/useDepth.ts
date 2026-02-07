'use client';

import { useState, useCallback, useMemo } from 'react';
import { ZONES, ZoneInfo } from '@/types/creature';

interface UseDepthReturn {
  currentDepth: number;
  currentZone: ZoneInfo;
  zoneProgress: number; // 0~1, 현재 존 내 진행률
  setDepth: (depth: number) => void;
  canGoDeeper: boolean;
  nextZone: ZoneInfo | null;
}

/**
 * 수심 관리 훅
 */
export function useDepth(initialDepth: number = 0): UseDepthReturn {
  const [currentDepth, setCurrentDepth] = useState(initialDepth);

  // 현재 존 찾기
  const currentZone = useMemo(() => {
    const zone = ZONES.find(
      z => currentDepth >= z.depth_min && currentDepth <= z.depth_max
    );
    return zone || ZONES[0];
  }, [currentDepth]);

  // 존 내 진행률 계산 (0~1)
  const zoneProgress = useMemo(() => {
    const range = currentZone.depth_max - currentZone.depth_min;
    if (range === 0) return 0;

    const progress = (currentDepth - currentZone.depth_min) / range;
    return Math.max(0, Math.min(1, progress));
  }, [currentDepth, currentZone]);

  // 다음 존 찾기
  const nextZone = useMemo(() => {
    const currentIndex = ZONES.findIndex(z => z.id === currentZone.id);
    if (currentIndex === -1 || currentIndex === ZONES.length - 1) {
      return null;
    }
    return ZONES[currentIndex + 1];
  }, [currentZone]);

  // 더 깊이 갈 수 있는지 확인
  const canGoDeeper = useMemo(() => {
    return nextZone !== null;
  }, [nextZone]);

  // 수심 설정
  const setDepth = useCallback((depth: number) => {
    // 최대 수심 제한 (hadal의 max)
    const maxDepth = ZONES[ZONES.length - 1].depth_max;
    const clampedDepth = Math.max(0, Math.min(depth, maxDepth));
    setCurrentDepth(clampedDepth);
  }, []);

  return {
    currentDepth,
    currentZone,
    zoneProgress,
    setDepth,
    canGoDeeper,
    nextZone,
  };
}
