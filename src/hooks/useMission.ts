'use client';

import { useState, useCallback, useMemo } from 'react';
import { RESCUE_PARROTS, RescueParrot, JungleZone } from '@/types/jungle';
import { CollectedAnimal } from '@/types/collection';

interface UseMissionOptions {
  jungleCollected: Record<string, CollectedAnimal>;
  rescued: string[];
  allAnimals: Array<{ id: string; zone: JungleZone }>;
  onRescue: (parrotId: string) => void;
}

interface UseMissionReturn {
  rescuedParrots: string[];
  availableMission: RescueParrot | null;
  isAllRescued: boolean;
  getRescueProgress: () => { rescued: number; total: number };
  canStartMission: (parrot: RescueParrot) => boolean;
  completeRescue: (parrotId: string) => void;
  getNextUnrescued: () => RescueParrot | null;
}

export function useMission({
  jungleCollected,
  rescued,
  allAnimals,
  onRescue,
}: UseMissionOptions): UseMissionReturn {
  const [rescuedParrots] = useState<string[]>(rescued);

  const collectedByZone = useMemo(() => {
    const map: Record<string, number> = {};
    for (const animal of allAnimals) {
      if (animal.id in jungleCollected) {
        map[animal.zone] = (map[animal.zone] || 0) + 1;
      }
    }
    return map;
  }, [jungleCollected, allAnimals]);

  const totalCollected = Object.keys(jungleCollected).length;

  const canStartMission = useCallback((parrot: RescueParrot): boolean => {
    if (rescued.includes(parrot.id)) return false;

    if (parrot.requiredZone && parrot.requiredZoneCount) {
      const zoneCount = collectedByZone[parrot.requiredZone] || 0;
      return zoneCount >= parrot.requiredZoneCount;
    }

    if (parrot.requiredTotalCount) {
      return totalCollected >= parrot.requiredTotalCount;
    }

    return false;
  }, [rescued, collectedByZone, totalCollected]);

  const availableMission = useMemo(() => {
    for (const parrot of RESCUE_PARROTS) {
      if (!rescued.includes(parrot.id) && canStartMission(parrot)) {
        return parrot;
      }
    }
    return null;
  }, [rescued, canStartMission]);

  const isAllRescued = rescued.length >= RESCUE_PARROTS.length;

  const getRescueProgress = useCallback(() => ({
    rescued: rescued.length,
    total: RESCUE_PARROTS.length,
  }), [rescued]);

  const completeRescue = useCallback((parrotId: string) => {
    if (!rescued.includes(parrotId)) {
      onRescue(parrotId);
    }
  }, [rescued, onRescue]);

  const getNextUnrescued = useCallback((): RescueParrot | null => {
    for (const parrot of RESCUE_PARROTS) {
      if (!rescued.includes(parrot.id)) {
        return parrot;
      }
    }
    return null;
  }, [rescued]);

  return {
    rescuedParrots,
    availableMission,
    isAllRescued,
    getRescueProgress,
    canStartMission,
    completeRescue,
    getNextUnrescued,
  };
}
