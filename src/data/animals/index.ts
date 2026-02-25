import riverEdge from './river-edge.json';
import forestFloor from './forest-floor.json';
import understory from './understory.json';
import highCanopy from './high-canopy.json';
import parrotWorld from './parrot-world.json';
import type { JungleAnimal } from '@/types/jungle';

export const allAnimals: JungleAnimal[] = [
  ...riverEdge,
  ...forestFloor,
  ...understory,
  ...highCanopy,
  ...parrotWorld,
] as JungleAnimal[];

export function getAnimalsByZone(zone: string): JungleAnimal[] {
  return allAnimals.filter(a => a.zone === zone);
}

export function getAnimalById(id: string): JungleAnimal | undefined {
  return allAnimals.find(a => a.id === id);
}

export function getRescueTargets(): JungleAnimal[] {
  return allAnimals.filter(a => a.is_rescue_target);
}
