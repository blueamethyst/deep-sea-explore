export type TelemetryEventType =
  | 'screen_view'
  | 'dive_start'
  | 'dive_end'
  | 'zone_enter'
  | 'cta_depth_tap'
  | 'creature_met'
  | 'creature_more'
  | 'tts_play'
  | 'tts_error'
  | 'badge_earned'
  | 'profile_setup';

export interface TelemetryEvent {
  type: TelemetryEventType;
  ts: number;
  [key: string]: unknown;
}

export interface ScreenViewEvent extends TelemetryEvent {
  type: 'screen_view';
  screen: string;
}

export interface DiveStartEvent extends TelemetryEvent {
  type: 'dive_start';
  ocean: string;
  season: string;
}

export interface DiveEndEvent extends TelemetryEvent {
  type: 'dive_end';
  ocean: string;
  depth: number;
  new_creatures: number;
  duration_sec: number;
}

export interface ZoneEnterEvent extends TelemetryEvent {
  type: 'zone_enter';
  zone: string;
  ocean: string;
}

export interface CtaDepthTapEvent extends TelemetryEvent {
  type: 'cta_depth_tap';
  from_zone: string;
  to_zone: string;
}

export interface CreatureMetEvent extends TelemetryEvent {
  type: 'creature_met';
  id: string;
  depth: number;
  is_new: boolean;
}

export interface CreatureMoreEvent extends TelemetryEvent {
  type: 'creature_more';
  id: string;
}

export interface TtsPlayEvent extends TelemetryEvent {
  type: 'tts_play';
  text_length: number;
  lang: string;
}

export interface TtsErrorEvent extends TelemetryEvent {
  type: 'tts_error';
  error_code: string;
}

export interface BadgeEarnedEvent extends TelemetryEvent {
  type: 'badge_earned';
  badge_id: string;
}

export interface ProfileSetupEvent extends TelemetryEvent {
  type: 'profile_setup';
  method: 'avatar';
}
