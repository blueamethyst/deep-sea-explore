'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { Creature, Zone, RARITY_WEIGHTS } from '@/types/creature';
import {
  MAX_CREATURES_ON_SCREEN,
  CREATURE_COOLDOWN_MS,
  SPAWN_INTERVAL_MIN_MS,
  SPAWN_INTERVAL_MAX_MS,
  UNCOLLECTED_WEIGHT_BONUS,
} from '@/lib/constants';
import { getAvailableCreatures } from '@/lib/creatures';

export interface SpawnedCreature {
  creature: Creature;
  x: number; // 화면 내 위치 (0~100%)
  y: number; // 화면 내 위치 (0~100%)
  spawnedAt: number; // timestamp
  id: string; // 고유 인스턴스 ID
}

type SpawnState = 'running' | 'paused' | 'disabled';

interface UseCreatureSpawnOptions {
  creatures: Creature[];
  currentZone: Zone;
  oceanId: string;
  season: string;
  collectedIds: Set<string>;
}

interface UseCreatureSpawnReturn {
  spawnedCreatures: SpawnedCreature[];
  spawnState: SpawnState;
  pause: () => void;
  resume: () => void;
  removeCreature: (instanceId: string) => void;
}

/**
 * 생물 Spawn 엔진 훅
 *
 * 파이프라인:
 * 1. zone × ocean × season 후보군 필터
 * 2. 쿨다운 필터 (30초)
 * 3. 동시 등장 필터 (화면에 있는 생물 제거)
 * 4. rarity 가중치 적용 (존별 희귀도 분포)
 * 5. 미수집 가중치 적용 (×2.0)
 * 6. RNG 선택
 */
export function useCreatureSpawn({
  creatures,
  currentZone,
  oceanId,
  season,
  collectedIds,
}: UseCreatureSpawnOptions): UseCreatureSpawnReturn {
  const [spawnedCreatures, setSpawnedCreatures] = useState<SpawnedCreature[]>([]);
  const [spawnState, setSpawnState] = useState<SpawnState>('running');

  const lastSpawnTimeRef = useRef<Map<string, number>>(new Map());
  const spawnTimerRef = useRef<number | null>(null);

  // 다음 spawn까지의 랜덤 간격 계산
  const getRandomInterval = useCallback(() => {
    return (
      SPAWN_INTERVAL_MIN_MS +
      Math.random() * (SPAWN_INTERVAL_MAX_MS - SPAWN_INTERVAL_MIN_MS)
    );
  }, []);

  // 생물 제거
  const removeCreature = useCallback((instanceId: string) => {
    setSpawnedCreatures(prev => prev.filter(sc => sc.id !== instanceId));
  }, []);

  // 가중치 기반 랜덤 선택
  const weightedRandom = useCallback(
    (candidates: Array<{ creature: Creature; weight: number }>) => {
      const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
      if (totalWeight === 0) return null;

      let random = Math.random() * totalWeight;
      for (const candidate of candidates) {
        random -= candidate.weight;
        if (random <= 0) {
          return candidate.creature;
        }
      }
      return candidates[candidates.length - 1].creature;
    },
    []
  );

  // Spawn 로직
  const trySpawn = useCallback(() => {
    if (spawnState !== 'running') return;

    // 화면에 이미 최대 개수가 있으면 skip
    if (spawnedCreatures.length >= MAX_CREATURES_ON_SCREEN) {
      return;
    }

    const now = Date.now();

    // 1. zone × ocean × season 후보군 필터
    const available = getAvailableCreatures(creatures, currentZone, oceanId, season);
    if (available.length === 0) return;

    // 2. 쿨다운 필터 (30초)
    const cooledDown = available.filter(c => {
      const lastSpawn = lastSpawnTimeRef.current.get(c.id);
      if (!lastSpawn) return true;
      return now - lastSpawn >= CREATURE_COOLDOWN_MS;
    });

    if (cooledDown.length === 0) return;

    // 3. 동시 등장 필터 (화면에 있는 생물 제거)
    const spawnedIds = new Set(spawnedCreatures.map(sc => sc.creature.id));
    const notOnScreen = cooledDown.filter(c => !spawnedIds.has(c.id));

    if (notOnScreen.length === 0) return;

    // 4. rarity 가중치 적용 (존별 희귀도 분포)
    // 5. 미수집 가중치 적용 (×2.0)
    const rarityWeights = RARITY_WEIGHTS[currentZone];
    const candidates = notOnScreen.map(creature => {
      const baseWeight = rarityWeights[creature.rarity] || 1;
      const isCollected = collectedIds.has(creature.id);
      const finalWeight = isCollected ? baseWeight : baseWeight * UNCOLLECTED_WEIGHT_BONUS;

      return { creature, weight: finalWeight };
    });

    // 6. RNG 선택
    const selected = weightedRandom(candidates);
    if (!selected) return;

    // Spawn 위치 랜덤 (x: 10~90%, y: 20~80%)
    const x = 10 + Math.random() * 80;
    const y = 20 + Math.random() * 60;

    const spawned: SpawnedCreature = {
      creature: selected,
      x,
      y,
      spawnedAt: now,
      id: `${selected.id}_${now}_${Math.random().toString(36).slice(2, 9)}`,
    };

    setSpawnedCreatures(prev => [...prev, spawned]);
    lastSpawnTimeRef.current.set(selected.id, now);

  }, [
    spawnState,
    spawnedCreatures,
    creatures,
    currentZone,
    oceanId,
    season,
    collectedIds,
    weightedRandom,
  ]);

  // Spawn 타이머 설정
  const scheduleNextSpawn = useCallback(() => {
    if (spawnTimerRef.current !== null) {
      window.clearTimeout(spawnTimerRef.current);
    }

    if (spawnState === 'running') {
      const interval = getRandomInterval();
      spawnTimerRef.current = window.setTimeout(() => {
        trySpawn();
        scheduleNextSpawn();
      }, interval);
    }
  }, [spawnState, getRandomInterval, trySpawn]);

  // pause/resume
  const pause = useCallback(() => {
    setSpawnState('paused');
  }, []);

  const resume = useCallback(() => {
    setSpawnState('running');
  }, []);

  // 상태 변경 시 타이머 재설정
  useEffect(() => {
    if (spawnState === 'running') {
      scheduleNextSpawn();
    } else {
      if (spawnTimerRef.current !== null) {
        window.clearTimeout(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
    }

    return () => {
      if (spawnTimerRef.current !== null) {
        window.clearTimeout(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
    };
  }, [spawnState, scheduleNextSpawn]);

  return {
    spawnedCreatures,
    spawnState,
    pause,
    resume,
    removeCreature,
  };
}
