import sunlightZone from './sunlight-zone.json';
import twilightZone from './twilight-zone.json';
import midnightZone from './midnight-zone.json';
import abyssalZone from './abyssal-zone.json';
import hadalZone from './hadal-zone.json';
import type { Creature } from '@/types/creature';

export const allCreatures: Creature[] = [
  ...sunlightZone,
  ...twilightZone,
  ...midnightZone,
  ...abyssalZone,
  ...hadalZone,
] as Creature[];

export function getCreaturesByZone(zone: string): Creature[] {
  return allCreatures.filter(c => c.zone === zone);
}

export function getCreaturesByOcean(ocean: string): Creature[] {
  return allCreatures.filter(c => c.oceans.includes(ocean));
}

export function getCreatureById(id: string): Creature | undefined {
  return allCreatures.find(c => c.id === id);
}

export function getCreaturesBySeason(season: string): Creature[] {
  return allCreatures.filter(c => c.seasons.includes(season as any));
}

export function getCreaturesByRarity(rarity: string): Creature[] {
  return allCreatures.filter(c => c.rarity === rarity);
}

export function getRandomCreature(): Creature {
  return allCreatures[Math.floor(Math.random() * allCreatures.length)];
}

export function getRandomCreatureByZone(zone: string): Creature | undefined {
  const creatures = getCreaturesByZone(zone);
  if (creatures.length === 0) return undefined;
  return creatures[Math.floor(Math.random() * creatures.length)];
}
