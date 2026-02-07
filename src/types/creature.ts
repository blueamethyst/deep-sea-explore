export type Zone = 'sunlight' | 'twilight' | 'midnight' | 'abyssal' | 'hadal';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';
export type AnimationType = 'swim_wiggle' | 'swim_glide' | 'float' | 'pulse' | 'crawl' | 'jet';

export interface Creature {
  id: string;
  name_ko: string;
  name_en: string;
  scientific_name: string;
  greeting_ko: string;
  greeting_en: string;
  greeting_revisit_ko: string;
  description_ko: string;
  description_en: string;
  fun_fact_ko: string;
  size_cm: number;
  depth_min: number;
  depth_max: number;
  zone: Zone;
  oceans: string[];
  seasons: Season[];
  rarity: Rarity;
  diet: string;
  animation_type: AnimationType;
  svg_id: string;
  source: string;
}

export type Season = 'spring' | 'summer' | 'fall' | 'winter';

export interface ZoneInfo {
  id: Zone;
  name_ko: string;
  name_en: string;
  depth_min: number;
  depth_max: number;
  description_ko: string;
  bg_color_start: string;
  bg_color_end: string;
  has_light: boolean;
}

export const ZONES: ZoneInfo[] = [
  {
    id: 'sunlight',
    name_ko: '햇빛층',
    name_en: 'Sunlight Zone',
    depth_min: 0,
    depth_max: 200,
    description_ko: '햇빛이 잘 드는 밝은 바다예요! 알록달록한 물고기들이 많아요.',
    bg_color_start: '#0EA5E9',
    bg_color_end: '#1E40AF',
    has_light: true,
  },
  {
    id: 'twilight',
    name_ko: '중광층',
    name_en: 'Twilight Zone',
    depth_min: 200,
    depth_max: 1000,
    description_ko: '빛이 점점 사라지는 곳이에요. 눈이 큰 물고기들이 살아요.',
    bg_color_start: '#1E3A8A',
    bg_color_end: '#1E1B4B',
    has_light: false,
  },
  {
    id: 'midnight',
    name_ko: '약광층',
    name_en: 'Midnight Zone',
    depth_min: 1000,
    depth_max: 4000,
    description_ko: '빛이 거의 없어서 눈이 아주 큰 물고기들이 살아요.',
    bg_color_start: '#1E1B4B',
    bg_color_end: '#0F0A2A',
    has_light: false,
  },
  {
    id: 'abyssal',
    name_ko: '무광층',
    name_en: 'Abyssal Zone',
    depth_min: 4000,
    depth_max: 6000,
    description_ko: '빛이 전혀 없는 깜깜한 바다예요. 특별한 생물들이 살아요.',
    bg_color_start: '#0F0A2A',
    bg_color_end: '#050210',
    has_light: false,
  },
  {
    id: 'hadal',
    name_ko: '초심해층',
    name_en: 'Hadal Zone',
    depth_min: 6000,
    depth_max: 11000,
    description_ko: '바다에서 가장 깊은 곳이에요! 아주 특별한 생물들만 살 수 있어요.',
    bg_color_start: '#050210',
    bg_color_end: '#000000',
    has_light: false,
  },
];

export const RARITY_WEIGHTS: Record<Zone, Record<Rarity, number>> = {
  sunlight: { common: 60, uncommon: 25, rare: 12, legendary: 3 },
  twilight: { common: 50, uncommon: 30, rare: 15, legendary: 5 },
  midnight: { common: 40, uncommon: 30, rare: 20, legendary: 10 },
  abyssal: { common: 30, uncommon: 30, rare: 25, legendary: 15 },
  hadal: { common: 30, uncommon: 30, rare: 25, legendary: 15 },
};
