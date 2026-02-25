import type { Season } from './creature';

export interface CollectedCreature {
  first_met: string; // ISO date string
  ocean: string;
  season: Season;
  count: number;
}

/** 정글에서 수집한 동물 */
export interface CollectedAnimal {
  first_met: string;
  zone: string;
  count: number;
}

export interface DiveStats {
  total_dives: number;
  deepest_depth: number;
  total_creatures_met: number;
}

export interface JungleStats {
  total_explorations: number;
  furthest_km: number;
  total_animals_met: number;
}

export interface JungleMission {
  rescued: string[]; // 구출한 앵무새 ID 목록
}

export interface CharacterData {
  templateId: string;
  colors: Record<string, string>;
}

export interface FamilyMember {
  name: string;
  avatarId: string;
  color: string;
}

export interface FamilyProfile {
  dad: FamilyMember;
  mom: FamilyMember;
  child: FamilyMember;
  setupComplete: boolean;
}

export interface AppSettings {
  ttsEnabled: boolean;
  languageMode: 'ko' | 'ko-en' | 'ko-en-sci';
}

export interface StorageSchema {
  version: number;
  // 바다
  collected: Record<string, CollectedCreature>;
  badges: string[];
  stats: DiveStats;
  // 정글
  jungleCollected: Record<string, CollectedAnimal>;
  jungleBadges: string[];
  jungleStats: JungleStats;
  jungleMission: JungleMission;
  character: CharacterData | null;
  // 공통
  settings: AppSettings;
  family: FamilyProfile;
}

export const DEFAULT_STORAGE: StorageSchema = {
  version: 2,
  collected: {},
  badges: [],
  stats: {
    total_dives: 0,
    deepest_depth: 0,
    total_creatures_met: 0,
  },
  jungleCollected: {},
  jungleBadges: [],
  jungleStats: {
    total_explorations: 0,
    furthest_km: 0,
    total_animals_met: 0,
  },
  jungleMission: {
    rescued: [],
  },
  character: null,
  settings: {
    ttsEnabled: true,
    languageMode: 'ko-en',
  },
  family: {
    dad: { name: '아빠', avatarId: '', color: '#3B82F6' },
    mom: { name: '엄마', avatarId: '', color: '#EC4899' },
    child: { name: '서연', avatarId: '', color: '#EAB308' },
    setupComplete: false,
  },
};
