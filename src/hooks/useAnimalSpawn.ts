'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { JungleAnimal, JungleZone, JUNGLE_RARITY_WEIGHTS } from '@/types/jungle';
import {
  JUNGLE_MAX_ANIMALS_ON_SCREEN,
  JUNGLE_ANIMAL_COOLDOWN_MS,
  JUNGLE_SPAWN_INTERVAL_MIN_MS,
  JUNGLE_SPAWN_INTERVAL_MAX_MS,
  JUNGLE_UNCOLLECTED_WEIGHT_BONUS,
} from '@/lib/jungle-constants';
import { getAvailableAnimals } from '@/lib/animals';

export interface SpawnedAnimal {
  animal: JungleAnimal;
  x: number;
  y: number;
  spawnedAt: number;
  id: string;
}

type SpawnState = 'running' | 'paused' | 'disabled';

interface UseAnimalSpawnOptions {
  animals: JungleAnimal[];
  currentZone: JungleZone;
  collectedIds: Set<string>;
}

interface UseAnimalSpawnReturn {
  spawnedAnimals: SpawnedAnimal[];
  spawnState: SpawnState;
  pause: () => void;
  resume: () => void;
  removeAnimal: (instanceId: string) => void;
}

export function useAnimalSpawn({
  animals,
  currentZone,
  collectedIds,
}: UseAnimalSpawnOptions): UseAnimalSpawnReturn {
  const [spawnedAnimals, setSpawnedAnimals] = useState<SpawnedAnimal[]>([]);
  const [spawnState, setSpawnState] = useState<SpawnState>('running');

  const lastSpawnTimeRef = useRef<Map<string, number>>(new Map());
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // refs로 최신 값 참조 (클로저 문제 방지)
  const spawnedRef = useRef(spawnedAnimals);
  spawnedRef.current = spawnedAnimals;

  const optionsRef = useRef({ animals, currentZone, collectedIds });
  optionsRef.current = { animals, currentZone, collectedIds };

  const stateRef = useRef(spawnState);
  stateRef.current = spawnState;

  const removeAnimal = useCallback((instanceId: string) => {
    setSpawnedAnimals(prev => prev.filter(sa => sa.id !== instanceId));
  }, []);

  // 가중치 기반 랜덤 선택
  const weightedRandom = useCallback(
    (candidates: Array<{ animal: JungleAnimal; weight: number }>) => {
      const totalWeight = candidates.reduce((sum, c) => sum + c.weight, 0);
      if (totalWeight === 0) return null;

      let random = Math.random() * totalWeight;
      for (const candidate of candidates) {
        random -= candidate.weight;
        if (random <= 0) {
          return candidate.animal;
        }
      }
      return candidates[candidates.length - 1].animal;
    },
    []
  );

  // Spawn 로직
  const trySpawn = useCallback(() => {
    if (stateRef.current !== 'running') return;

    const currentSpawned = spawnedRef.current;
    if (currentSpawned.length >= JUNGLE_MAX_ANIMALS_ON_SCREEN) return;

    const { animals: anms, currentZone: zone, collectedIds: cids } = optionsRef.current;
    const now = Date.now();

    // 1. zone 후보군 필터
    const available = getAvailableAnimals(anms, zone);
    if (available.length === 0) return;

    // 2. 쿨다운 필터
    const cooledDown = available.filter(a => {
      const lastSpawn = lastSpawnTimeRef.current.get(a.id);
      if (!lastSpawn) return true;
      return now - lastSpawn >= JUNGLE_ANIMAL_COOLDOWN_MS;
    });
    if (cooledDown.length === 0) return;

    // 3. 동시 등장 필터
    const spawnedIds = new Set(currentSpawned.map(sa => sa.animal.id));
    const notOnScreen = cooledDown.filter(a => !spawnedIds.has(a.id));
    if (notOnScreen.length === 0) return;

    // 4. rarity 가중치 + 미수집 보너스
    const rarityWeights = JUNGLE_RARITY_WEIGHTS[zone];
    const candidates = notOnScreen.map(animal => {
      const baseWeight = rarityWeights[animal.rarity] || 1;
      const isCollected = cids.has(animal.id);
      const finalWeight = isCollected ? baseWeight : baseWeight * JUNGLE_UNCOLLECTED_WEIGHT_BONUS;
      return { animal, weight: finalWeight };
    });

    // 5. RNG 선택
    const selected = weightedRandom(candidates);
    if (!selected) return;

    const x = 10 + Math.random() * 80;
    const y = 20 + Math.random() * 60;

    const spawned: SpawnedAnimal = {
      animal: selected,
      x,
      y,
      spawnedAt: now,
      id: `${selected.id}_${now}_${Math.random().toString(36).slice(2, 9)}`,
    };

    setSpawnedAnimals(prev => [...prev, spawned]);
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
      const interval = JUNGLE_SPAWN_INTERVAL_MIN_MS + Math.random() * (JUNGLE_SPAWN_INTERVAL_MAX_MS - JUNGLE_SPAWN_INTERVAL_MIN_MS);
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

  // 존 변경 시 화면 동물 초기화
  useEffect(() => {
    setSpawnedAnimals([]);
  }, [currentZone]);

  const pause = useCallback(() => setSpawnState('paused'), []);
  const resume = useCallback(() => setSpawnState('running'), []);

  return {
    spawnedAnimals,
    spawnState,
    pause,
    resume,
    removeAnimal,
  };
}
