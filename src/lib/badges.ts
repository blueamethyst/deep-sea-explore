import { CollectedCreature, CollectedAnimal, DiveStats, JungleStats, JungleMission } from '@/types/collection';
import { Creature, Zone } from '@/types/creature';
import { JungleAnimal, JungleZone } from '@/types/jungle';

/**
 * 배지 정의
 */
export interface Badge {
  id: string;
  name_ko: string;
  description_ko: string;
  icon: string;
  category: 'ocean' | 'jungle';
  condition: (data: BadgeCheckData) => boolean;
}

export interface BadgeCheckData {
  collected: Record<string, CollectedCreature>;
  stats: DiveStats;
  creatures: Creature[];
  // 정글 확장
  jungleCollected: Record<string, CollectedAnimal>;
  jungleStats: JungleStats;
  jungleMission: JungleMission;
  animals: JungleAnimal[];
}

/**
 * 배지 목록
 */
export const BADGES: Badge[] = [
  // === 바다 배지 ===
  {
    id: 'first_dive',
    name_ko: '첫 잠수',
    description_ko: '처음으로 바다에 잠수했어요!',
    icon: '🤿',
    category: 'ocean',
    condition: (data) => data.stats.total_dives >= 1,
  },
  {
    id: 'first_creature',
    name_ko: '첫 만남',
    description_ko: '첫 번째 바다 친구를 만났어요!',
    icon: '🐟',
    category: 'ocean',
    condition: (data) => Object.keys(data.collected).length >= 1,
  },
  {
    id: 'collector_10',
    name_ko: '수집가',
    description_ko: '10종의 생물을 수집했어요!',
    icon: '📚',
    category: 'ocean',
    condition: (data) => Object.keys(data.collected).length >= 10,
  },
  {
    id: 'collector_30',
    name_ko: '바다 박사',
    description_ko: '30종의 생물을 수집했어요!',
    icon: '🎓',
    category: 'ocean',
    condition: (data) => Object.keys(data.collected).length >= 30,
  },
  {
    id: 'collector_50',
    name_ko: '바다 탐험가',
    description_ko: '50종의 생물을 수집했어요!',
    icon: '🏆',
    category: 'ocean',
    condition: (data) => Object.keys(data.collected).length >= 50,
  },
  {
    id: 'deep_diver',
    name_ko: '깊은 잠수',
    description_ko: '1000m 이상 잠수했어요!',
    icon: '🌊',
    category: 'ocean',
    condition: (data) => data.stats.deepest_depth >= 1000,
  },
  {
    id: 'abyssal_explorer',
    name_ko: '심연 탐험가',
    description_ko: '무광층까지 탐험했어요!',
    icon: '🔦',
    category: 'ocean',
    condition: (data) => data.stats.deepest_depth >= 4000,
  },
  {
    id: 'hadal_master',
    name_ko: '초심해 정복자',
    description_ko: '초심해층까지 탐험했어요!',
    icon: '⭐',
    category: 'ocean',
    condition: (data) => data.stats.deepest_depth >= 6000,
  },
  {
    id: 'zone_sunlight',
    name_ko: '햇빛층 마스터',
    description_ko: '햇빛층의 모든 생물을 수집했어요!',
    icon: '☀️',
    category: 'ocean',
    condition: (data) => {
      const sunlightCreatures = data.creatures.filter(c => c.zone === 'sunlight');
      const collectedSunlight = sunlightCreatures.filter(c => c.id in data.collected);
      return sunlightCreatures.length > 0 && collectedSunlight.length === sunlightCreatures.length;
    },
  },
  {
    id: 'zone_twilight',
    name_ko: '중광층 마스터',
    description_ko: '중광층의 모든 생물을 수집했어요!',
    icon: '🌅',
    category: 'ocean',
    condition: (data) => {
      const twilightCreatures = data.creatures.filter(c => c.zone === 'twilight');
      const collectedTwilight = twilightCreatures.filter(c => c.id in data.collected);
      return twilightCreatures.length > 0 && collectedTwilight.length === twilightCreatures.length;
    },
  },
  {
    id: 'legendary_hunter',
    name_ko: '전설 사냥꾼',
    description_ko: 'legendary 생물을 처음 만났어요!',
    icon: '💎',
    category: 'ocean',
    condition: (data) => {
      const legendaryCreatures = data.creatures.filter(c => c.rarity === 'legendary');
      const collectedLegendary = legendaryCreatures.filter(c => c.id in data.collected);
      return collectedLegendary.length >= 1;
    },
  },
  {
    id: 'frequent_diver',
    name_ko: '열정적인 잠수부',
    description_ko: '10번 이상 잠수했어요!',
    icon: '🏊',
    category: 'ocean',
    condition: (data) => data.stats.total_dives >= 10,
  },

  // === 정글 배지 ===
  {
    id: 'jungle_first_step',
    name_ko: '정글 첫 걸음',
    description_ko: '처음으로 정글을 탐험했어요!',
    icon: '🌿',
    category: 'jungle',
    condition: (data) => data.jungleStats.total_explorations >= 1,
  },
  {
    id: 'jungle_10',
    name_ko: '정글 친구',
    description_ko: '정글에서 10종의 동물을 만났어요!',
    icon: '🐒',
    category: 'jungle',
    condition: (data) => Object.keys(data.jungleCollected).length >= 10,
  },
  {
    id: 'jungle_30',
    name_ko: '정글 박사',
    description_ko: '정글에서 30종의 동물을 만났어요!',
    icon: '🎓',
    category: 'jungle',
    condition: (data) => Object.keys(data.jungleCollected).length >= 30,
  },
  {
    id: 'rescue_1',
    name_ko: '첫 구출',
    description_ko: '첫 번째 앵무새를 구출했어요!',
    icon: '🦜',
    category: 'jungle',
    condition: (data) => data.jungleMission.rescued.length >= 1,
  },
  {
    id: 'rescue_all',
    name_ko: '정글의 영웅',
    description_ko: '모든 앵무새를 구출했어요!',
    icon: '🏆',
    category: 'jungle',
    condition: (data) => data.jungleMission.rescued.length >= 5,
  },
];

/**
 * 배지 조건 확인
 * @returns 새로 획득한 배지 ID 목록
 */
export function checkBadgeConditions(
  data: BadgeCheckData,
  currentBadges: string[],
  category?: 'ocean' | 'jungle'
): string[] {
  const currentSet = new Set(currentBadges);
  const newBadges: string[] = [];

  const badges = category ? BADGES.filter(b => b.category === category) : BADGES;

  for (const badge of badges) {
    if (!currentSet.has(badge.id) && badge.condition(data)) {
      newBadges.push(badge.id);
    }
  }

  return newBadges;
}

/**
 * 배지 ID로 배지 찾기
 */
export function getBadgeById(badgeId: string): Badge | undefined {
  return BADGES.find(b => b.id === badgeId);
}

/**
 * 획득한 배지 목록 조회
 */
export function getEarnedBadges(badgeIds: string[]): Badge[] {
  return badgeIds.map(id => getBadgeById(id)).filter(Boolean) as Badge[];
}
