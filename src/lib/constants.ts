// Spawn Rules
export const MAX_CREATURES_ON_SCREEN = 8;
export const CREATURE_COOLDOWN_MS = 15_000;
export const SPAWN_INTERVAL_MIN_MS = 2_000;
export const SPAWN_INTERVAL_MAX_MS = 3_500;
export const UNCOLLECTED_WEIGHT_BONUS = 2.5;

// Zone Transition
export const ZONE_CTA_THRESHOLD = 0.95; // 95% of zone scroll
export const ZONE_TRANSITION_DURATION_MS = 1_500;

// TTS
export const TTS_HIGHLIGHT_INTERVAL_MS = 150; // 120~180ms range
export const TTS_LANG_PRIMARY = 'ko-KR';
export const TTS_LANG_FALLBACK = 'en-US';

// Storage
export const STORAGE_KEY = 'deepsea:state';
export const STORAGE_VERSION = 1;
export const MAX_EVENTS = 2_000;
export const MAX_EVENTS_SIZE_BYTES = 1_048_576; // 1MB

// IndexedDB
export const IDB_NAME = 'deepsea-db';
export const IDB_FACES_STORE = 'faces';
export const IDB_EVENTS_STORE = 'events';

// Performance
export const TARGET_FPS = 55;
export const SAFE_MODE_CREATURE_LIMIT = 4;
export const SAFE_MODE_PARTICLE_REDUCTION = 0.5;

// Data Validation
export const MAX_DESCRIPTION_KO_LENGTH = 120;
export const MAX_GREETING_KO_LENGTH = 30;
export const MAX_FUN_FACT_KO_LENGTH = 80;
export const MAX_DESCRIPTION_SENTENCES = 3;

// Animation
export const MAX_CONCURRENT_TRANSFORMS = 18;

// Family Colors
export const FAMILY_COLORS = {
  dad: '#3B82F6',
  mom: '#EC4899',
  child: '#EAB308',
} as const;
