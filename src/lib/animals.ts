import { JungleAnimal, JungleZone, JUNGLE_RARITY_WEIGHTS } from '@/types/jungle';

/** Zone별 동물 필터링 */
export function getAnimalsByZone(animals: JungleAnimal[], zone: JungleZone): JungleAnimal[] {
  return animals.filter(a => a.zone === zone);
}

/** 현재 zone에서 사용 가능한 동물 목록 */
export function getAvailableAnimals(
  animals: JungleAnimal[],
  zone: JungleZone
): JungleAnimal[] {
  return animals.filter(a => a.zone === zone);
}

/** ID로 동물 찾기 */
export function getAnimalById(animals: JungleAnimal[], id: string): JungleAnimal | undefined {
  return animals.find(a => a.id === id);
}

/** 특정 zone에서 수집한 동물 수 계산 */
export function getCollectedCountByZone(
  animals: JungleAnimal[],
  collected: Record<string, unknown>,
  zone: JungleZone
): number {
  const zoneAnimals = getAnimalsByZone(animals, zone);
  return zoneAnimals.filter(a => a.id in collected).length;
}

/** 총 수집 동물 수 */
export function getTotalCollectedCount(collected: Record<string, unknown>): number {
  return Object.keys(collected).length;
}

/** Zone별 rarity 가중치 가져오기 */
export function getJungleRarityWeights(zone: JungleZone) {
  return JUNGLE_RARITY_WEIGHTS[zone];
}
