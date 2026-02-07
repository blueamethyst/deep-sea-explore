import { Creature, Zone } from '@/types/creature';

// 생물 데이터는 data-compiler가 생성한 JSON을 읽어옴
// 여기서는 유틸리티 함수만 제공

/**
 * 존별 생물 필터링
 */
export function getCreaturesByZone(creatures: Creature[], zone: Zone): Creature[] {
  return creatures.filter(c => c.zone === zone);
}

/**
 * 바다별 생물 필터링
 */
export function getCreaturesByOcean(creatures: Creature[], oceanId: string): Creature[] {
  return creatures.filter(c => c.oceans.includes(oceanId));
}

/**
 * 존 + 바다 필터링
 */
export function getCreaturesByZoneAndOcean(
  creatures: Creature[],
  zone: Zone,
  oceanId: string
): Creature[] {
  return creatures.filter(
    c => c.zone === zone && c.oceans.includes(oceanId)
  );
}

/**
 * ID로 생물 찾기
 */
export function getCreatureById(creatures: Creature[], id: string): Creature | undefined {
  return creatures.find(c => c.id === id);
}

/**
 * 계절별 생물 필터링
 */
export function getCreaturesBySeason(
  creatures: Creature[],
  season: string
): Creature[] {
  return creatures.filter(c => c.seasons.includes(season as never));
}

/**
 * 존 + 바다 + 계절 필터링
 */
export function getAvailableCreatures(
  creatures: Creature[],
  zone: Zone,
  oceanId: string,
  season: string
): Creature[] {
  return creatures.filter(
    c =>
      c.zone === zone &&
      c.oceans.includes(oceanId) &&
      c.seasons.includes(season as never)
  );
}
