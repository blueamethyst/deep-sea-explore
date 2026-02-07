import type { Season } from './creature';

export interface CollectedCreature {
  first_met: string; // ISO date string
  ocean: string;
  season: Season;
  count: number;
}

export interface DiveStats {
  total_dives: number;
  deepest_depth: number;
  total_creatures_met: number;
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
  collected: Record<string, CollectedCreature>;
  badges: string[];
  stats: DiveStats;
  settings: AppSettings;
  family: FamilyProfile;
}

export const DEFAULT_STORAGE: StorageSchema = {
  version: 1,
  collected: {},
  badges: [],
  stats: {
    total_dives: 0,
    deepest_depth: 0,
    total_creatures_met: 0,
  },
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
