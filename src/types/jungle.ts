export type JungleZone = 'river_edge' | 'forest_floor' | 'understory' | 'high_canopy' | 'parrot_world';
export type JungleAnimationType = 'walk' | 'hop' | 'climb' | 'fly' | 'crawl' | 'swing';
export type Rarity = 'common' | 'uncommon' | 'rare' | 'legendary';

export interface JungleAnimal {
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
  altitude_min: number; // 높이 (m) - 바다의 depth 대응
  altitude_max: number;
  zone: JungleZone;
  rarity: Rarity;
  diet: string;
  animation_type: JungleAnimationType;
  svg_id: string;
  source: string;
  photo_url: string;
  photo_credit?: string;
  is_rescue_target?: boolean; // 구출 대상 앵무새 여부
}

export interface JungleZoneInfo {
  id: JungleZone;
  name_ko: string;
  name_en: string;
  distance_min: number; // km
  distance_max: number; // km
  description_ko: string;
  bg_color_start: string;
  bg_color_end: string;
  has_sunbeams: boolean;
  has_fireflies: boolean;
}

export const JUNGLE_ZONES: JungleZoneInfo[] = [
  {
    id: 'river_edge',
    name_ko: '강가 입구',
    name_en: 'River Edge',
    distance_min: 0,
    distance_max: 2,
    description_ko: '밝고 따뜻한 강가에요! 물소리가 들리고 예쁜 나비들이 날아다녀요.',
    bg_color_start: '#4CAF50',
    bg_color_end: '#2E7D32',
    has_sunbeams: false,
    has_fireflies: false,
  },
  {
    id: 'forest_floor',
    name_ko: '숲 바닥',
    name_en: 'Forest Floor',
    distance_min: 2,
    distance_max: 5,
    description_ko: '습하고 어둑한 낙엽층이에요. 작은 동물들이 숨어 살고 있어요.',
    bg_color_start: '#2E7D32',
    bg_color_end: '#1B5E20',
    has_sunbeams: false,
    has_fireflies: true,
  },
  {
    id: 'understory',
    name_ko: '덩굴숲',
    name_en: 'Understory',
    distance_min: 5,
    distance_max: 8,
    description_ko: '덩굴 사이로 빛이 새어드는 신비로운 공간이에요!',
    bg_color_start: '#1B5E20',
    bg_color_end: '#33691E',
    has_sunbeams: false,
    has_fireflies: true,
  },
  {
    id: 'high_canopy',
    name_ko: '높은 나무',
    name_en: 'High Canopy',
    distance_min: 8,
    distance_max: 10,
    description_ko: '나뭇잎 사이로 햇살이 쏟아지는 밝은 곳이에요!',
    bg_color_start: '#33691E',
    bg_color_end: '#558B2F',
    has_sunbeams: true,
    has_fireflies: false,
  },
  {
    id: 'parrot_world',
    name_ko: '앵무새 월드',
    name_en: 'Parrot World',
    distance_min: 10,
    distance_max: 12,
    description_ko: '화려한 꽃과 앵무새의 왕국! 금빛 하늘이 펼쳐져요!',
    bg_color_start: '#558B2F',
    bg_color_end: '#F9A825',
    has_sunbeams: true,
    has_fireflies: false,
  },
];

export const JUNGLE_RARITY_WEIGHTS: Record<JungleZone, Record<Rarity, number>> = {
  river_edge: { common: 60, uncommon: 25, rare: 12, legendary: 3 },
  forest_floor: { common: 50, uncommon: 30, rare: 15, legendary: 5 },
  understory: { common: 40, uncommon: 30, rare: 20, legendary: 10 },
  high_canopy: { common: 35, uncommon: 30, rare: 22, legendary: 13 },
  parrot_world: { common: 30, uncommon: 30, rare: 25, legendary: 15 },
};

/** 구출 대상 앵무새 5종 정의 */
export interface RescueParrot {
  id: string;
  name_ko: string;
  name_en: string;
  description_ko: string;
  condition_ko: string;
  miniGameType: 'fruit_find' | 'rhythm_tap' | 'nest_build' | 'match_pair' | 'dig_burrow';
  requiredZone?: JungleZone; // 특정 zone에서 N종 수집 조건
  requiredZoneCount?: number;
  requiredTotalCount?: number; // 총 N종 수집 조건
}

export const RESCUE_PARROTS: RescueParrot[] = [
  {
    id: 'yellow_crowned_amazon',
    name_ko: '옐로크라운아마존',
    name_en: 'Yellow-crowned Amazon',
    description_ko: '노란 왕관 깃털이 멋진 앵무새! 말 따라하기 달인이에요.',
    condition_ko: 'Zone 1에서 10종 수집',
    miniGameType: 'fruit_find',
    requiredZone: 'river_edge',
    requiredZoneCount: 10,
  },
  {
    id: 'cockatoo',
    name_ko: '코카투',
    name_en: 'Cockatoo',
    description_ko: '하얀 볏이 멋진 춤추는 앵무새!',
    condition_ko: 'Zone 2에서 8종 수집',
    miniGameType: 'rhythm_tap',
    requiredZone: 'forest_floor',
    requiredZoneCount: 8,
  },
  {
    id: 'eclectus_parrot',
    name_ko: '뉴기니아앵무',
    name_en: 'Eclectus Parrot',
    description_ko: '빨간 깃털이 화려한 앵무새! 무화과를 좋아해요.',
    condition_ko: 'Zone 3에서 6종 수집',
    miniGameType: 'nest_build',
    requiredZone: 'understory',
    requiredZoneCount: 6,
  },
  {
    id: 'lovebird',
    name_ko: '사랑앵무',
    name_en: 'Lovebird',
    description_ko: '분홍빛이 예쁜 앵무새! 항상 짝과 함께 다녀요.',
    condition_ko: 'Zone 4에서 5종 수집',
    miniGameType: 'match_pair',
    requiredZone: 'high_canopy',
    requiredZoneCount: 5,
  },
  {
    id: 'burrowing_owl',
    name_ko: '버로잉아울',
    name_en: 'Burrowing Owl',
    description_ko: '땅에 굴을 파고 사는 특별한 올빼미!',
    condition_ko: '총 40종 수집',
    miniGameType: 'dig_burrow',
    requiredTotalCount: 40,
  },
];

/** 캐릭터 템플릿 */
export interface CharacterTemplate {
  id: string;
  name_ko: string;
  description_ko: string;
  accessory: string;
  colorParts: string[]; // 색칠 가능한 부위
}

export const CHARACTER_TEMPLATES: CharacterTemplate[] = [
  { id: 'explorer_girl', name_ko: '탐험가 소녀', description_ko: '모자 + 배낭', accessory: 'hat_backpack', colorParts: ['hair', 'skin', 'outfit', 'hat'] },
  { id: 'explorer_boy', name_ko: '탐험가 소년', description_ko: '모자 + 배낭', accessory: 'hat_backpack', colorParts: ['hair', 'skin', 'outfit', 'hat'] },
  { id: 'scientist_girl', name_ko: '과학자 소녀', description_ko: '안경 + 돋보기', accessory: 'glasses_magnifier', colorParts: ['hair', 'skin', 'outfit', 'accessory'] },
  { id: 'scientist_boy', name_ko: '과학자 소년', description_ko: '안경 + 노트', accessory: 'glasses_notebook', colorParts: ['hair', 'skin', 'outfit', 'accessory'] },
  { id: 'photographer', name_ko: '사진작가', description_ko: '카메라 + 조끼', accessory: 'camera_vest', colorParts: ['hair', 'skin', 'outfit', 'accessory'] },
  { id: 'zoologist', name_ko: '동물학자', description_ko: '쌍안경 + 모자', accessory: 'binoculars_hat', colorParts: ['hair', 'skin', 'outfit', 'hat'] },
  { id: 'butterfly_researcher', name_ko: '나비연구가', description_ko: '나비채 + 모자', accessory: 'net_hat', colorParts: ['hair', 'skin', 'outfit', 'hat'] },
  { id: 'veterinarian', name_ko: '수의사', description_ko: '가운 + 청진기', accessory: 'gown_stethoscope', colorParts: ['hair', 'skin', 'outfit', 'accessory'] },
];

/** 캐릭터 색상 팔레트 (아이 친화적) */
export const COLOR_PALETTE = [
  '#FF6B6B', '#FF8E53', '#FECA57', '#48DBFB',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#01A3A4',
  '#2ECC71', '#F39C12', '#8B4513', '#1A1A2E',
];
