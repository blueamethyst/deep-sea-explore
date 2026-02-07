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
  x: number;
  y: number;
  spawnedAt: number;
  id: string;
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
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // refs로 최신 값 참조 (클로저 문제 방지)
  const spawnedRef = useRef(spawnedCreatures);
  spawnedRef.current = spawnedCreatures;

  const optionsRef = useRef({ creatures, currentZone, oceanId, season, collectedIds });
  optionsRef.current = { creatures, currentZone, oceanId, season, collectedIds };

  const stateRef = useRef(spawnState);
  stateRef.current = spawnState;

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

  // Spawn 로직 (ref 기반으로 항상 최신 상태 참조)
  const trySpawn = useCallback(() => {
    if (stateRef.current !== 'running') return;

    const currentSpawned = spawnedRef.current;
    if (currentSpawned.length >= MAX_CREATURES_ON_SCREEN) return;

    const { creatures: crts, currentZone: zone, oceanId: oid, season: ssn, collectedIds: cids } = optionsRef.current;
    const now = Date.now();

    // 1. zone × ocean × season 후보군 필터
    const available = getAvailableCreatures(crts, zone, oid, ssn);
    if (available.length === 0) return;

    // 2. 쿨다운 필터
    const cooledDown = available.filter(c => {
      const lastSpawn = lastSpawnTimeRef.current.get(c.id);
      if (!lastSpawn) return true;
      return now - lastSpawn >= CREATURE_COOLDOWN_MS;
    });
    if (cooledDown.length === 0) return;

    // 3. 동시 등장 필터
    const spawnedIds = new Set(currentSpawned.map(sc => sc.creature.id));
    const notOnScreen = cooledDown.filter(c => !spawnedIds.has(c.id));
    if (notOnScreen.length === 0) return;

    // 4. rarity 가중치 + 5. 미수집 보너스
    const rarityWeights = RARITY_WEIGHTS[zone];
    const candidates = notOnScreen.map(creature => {
      const baseWeight = rarityWeights[creature.rarity] || 1;
      const isCollected = cids.has(creature.id);
      const finalWeight = isCollected ? baseWeight : baseWeight * UNCOLLECTED_WEIGHT_BONUS;
      return { creature, weight: finalWeight };
    });

    // 6. RNG 선택
    const selected = weightedRandom(candidates);
    if (!selected) return;

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
  }, [weightedRandom]);

  // Spawn 타이머 루프
  useEffect(() => {
    if (spawnState !== 'running') {
      if (spawnTimerRef.current !== null) {
        clearTimeout(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
      return;
    }

    const scheduleNext = () => {
      const interval = SPAWN_INTERVAL_MIN_MS + Math.random() * (SPAWN_INTERVAL_MAX_MS - SPAWN_INTERVAL_MIN_MS);
      spawnTimerRef.current = setTimeout(() => {
        trySpawn();
        scheduleNext();
      }, interval);
    };

    scheduleNext();

    return () => {
      if (spawnTimerRef.current !== null) {
        clearTimeout(spawnTimerRef.current);
        spawnTimerRef.current = null;
      }
    };
  }, [spawnState, trySpawn]);

  // 존 변경 시 화면 생물 초기화
  useEffect(() => {
    setSpawnedCreatures([]);
  }, [currentZone]);

  const pause = useCallback(() => setSpawnState('paused'), []);
  const resume = useCallback(() => setSpawnState('running'), []);

  return {
    spawnedCreatures,
    spawnState,
    pause,
    resume,
    removeCreature,
  };
}
