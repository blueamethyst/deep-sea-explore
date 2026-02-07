export interface Ocean {
  id: string;
  name_ko: string;
  name_en: string;
  description_ko: string;
  max_depth: number;
  /** 이 바다에서 탐험 가능한 존 목록 */
  available_zones: string[];
  /** 지구본 UI에서 위치 (경도, 위도) */
  position: { lat: number; lng: number };
  color: string;
}

export interface SeasonInfo {
  id: string;
  name_ko: string;
  name_en: string;
  icon: string;
  theme_color: string;
  description_ko: string;
}
