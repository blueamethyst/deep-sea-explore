'use client';

import React from 'react';

interface CharacterSVGProps {
  characterId: string;
  size?: number;
  color?: string;
}

// 공통 gradient 정의 ID prefix
const SKIN_GRAD = 'skin';
const VISOR_GRAD = 'visor';
const SUIT_GRAD = 'suit';

export const CharacterSVG: React.FC<CharacterSVGProps> = ({
  characterId,
  size = 80,
  color,
}) => {
  const uid = characterId.replace('_', '-');
  const defaultColors: Record<string, string> = {
    dad: '#3B82F6',
    mom: '#EC4899',
    child: '#EAB308',
  };
  const role = characterId.split('_')[0];
  const suitColor = color || defaultColors[role] || '#3B82F6';

  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* 피부톤 gradient */}
        <radialGradient id={`${SKIN_GRAD}-${uid}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#FFE4B5" />
          <stop offset="100%" stopColor="#FFDAB9" />
        </radialGradient>
        {/* 바이저 gradient */}
        <linearGradient id={`${VISOR_GRAD}-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#E0F0FF" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#B0D8FF" stopOpacity="0.3" />
        </linearGradient>
        {/* 잠수복 gradient */}
        <linearGradient id={`${SUIT_GRAD}-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={suitColor} />
          <stop offset="50%" stopColor={suitColor} />
          <stop offset="100%" stopColor={darken(suitColor, 0.2)} />
        </linearGradient>
      </defs>

      {renderCharacter(characterId, uid, suitColor)}
    </svg>
  );
};

/** 색상을 어둡게 */
function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (num & 0xff) - Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

function renderCharacter(id: string, uid: string, suitColor: string) {
  const base = renderBase(uid, suitColor);

  switch (id) {
    // ===== DAD =====
    case 'dad_01':
      return <>{base}{dadShortHair(uid)}{faceDefault(uid)}</>;
    case 'dad_02':
      return <>{base}{dadWavyHair(uid)}{faceDefault(uid)}{glasses()}</>;
    case 'dad_03':
      return <>{base}{dadPartedHair(uid)}{faceDefault(uid)}{beard()}</>;
    case 'dad_04':
      return <>{base}{dadShortHair(uid)}{faceDefault(uid)}{cap(suitColor)}</>;
    case 'dad_05':
      return <>{base}{dadCurlyHair(uid)}{faceDefault(uid)}</>;
    case 'dad_06':
      return <>{base}{dadNeatHair(uid)}{faceDefault(uid)}{glasses()}{beard()}</>;

    // ===== MOM =====
    case 'mom_01':
      return <>{base}{momLongHair(uid)}{faceDefault(uid)}</>;
    case 'mom_02':
      return <>{base}{momBobHair(uid)}{faceDefault(uid)}{ribbon('#FF6B9D', 28, 18)}</>;
    case 'mom_03':
      return <>{base}{momPonytail(uid)}{faceDefault(uid)}{earring()}</>;
    case 'mom_04':
      return <>{base}{momLongHair(uid)}{faceDefault(uid)}{hairpin()}</>;
    case 'mom_05':
      return <>{base}{momWavyBob(uid)}{faceDefault(uid)}</>;
    case 'mom_06':
      return <>{base}{momLongHair(uid)}{faceDefault(uid)}{ribbon('#FF6B9D', 28, 18)}{earring()}</>;

    // ===== CHILD =====
    case 'child_01':
      return <>{base}{childTwintails(uid)}{faceBigEyes(uid)}</>;
    case 'child_02':
      return <>{base}{childPonytail(uid)}{faceBigSmile(uid)}</>;
    case 'child_03':
      return <>{base}{childBobCut(uid)}{faceBigEyes(uid)}</>;
    case 'child_04':
      return <>{base}{childTwintails(uid)}{faceBigEyes(uid)}{ribbon('#FF6B9D', 30, 18)}{ribbon('#FF6B9D', 90, 18)}</>;
    case 'child_05':
      return <>{base}{childPonytail(uid)}{faceBigEyes(uid)}{starHairpin()}</>;
    case 'child_06':
      return <>{base}{childBobCut(uid)}{faceBigSmile(uid)}</>;

    default:
      return <>{base}{faceDefault(uid)}</>;
  }
}

// ============================================================
// BASE: 헬멧(바이저) + 잠수복 + 얼굴 원 + 볼터치
// ============================================================
function renderBase(uid: string, suitColor: string) {
  return (
    <g>
      {/* 잠수복 몸체 */}
      <rect x="35" y="68" width="50" height="38" rx="10" fill={`url(#${SUIT_GRAD}-${uid})`} />
      {/* 잠수복 팔 왼쪽 */}
      <rect x="22" y="72" width="16" height="26" rx="8" fill={`url(#${SUIT_GRAD}-${uid})`} />
      {/* 잠수복 팔 오른쪽 */}
      <rect x="82" y="72" width="16" height="26" rx="8" fill={`url(#${SUIT_GRAD}-${uid})`} />
      {/* 잠수복 버튼 */}
      <circle cx="60" cy="82" r="2" fill="#FFD700" />
      <circle cx="60" cy="90" r="2" fill="#FFD700" />
      <circle cx="60" cy="98" r="1.5" fill="#FFD700" />
      {/* 잠수복 칼라 */}
      <ellipse cx="60" cy="70" rx="18" ry="5" fill={suitColor} />

      {/* 헬멧 (둥근 유리 바이저) */}
      <circle cx="60" cy="40" r="30" fill={suitColor} />
      <circle cx="60" cy="40" r="26" fill={`url(#${VISOR_GRAD}-${uid})`} stroke="#fff" strokeWidth="1.5" strokeOpacity="0.5" />

      {/* 피부 (얼굴) */}
      <circle cx="60" cy="42" r="20" fill={`url(#${SKIN_GRAD}-${uid})`} />

      {/* 볼터치 */}
      <circle cx="46" cy="48" r="5" fill="#FFB6C1" opacity="0.3" />
      <circle cx="74" cy="48" r="5" fill="#FFB6C1" opacity="0.3" />
    </g>
  );
}

// ============================================================
// FACE VARIANTS
// ============================================================
function faceDefault(uid: string) {
  void uid;
  return (
    <g>
      {/* 눈 */}
      <ellipse cx="52" cy="40" rx="3" ry="3.5" fill="#2D1B00" />
      <ellipse cx="68" cy="40" rx="3" ry="3.5" fill="#2D1B00" />
      {/* 눈 반사광 */}
      <circle cx="53.5" cy="38.5" r="1.2" fill="#fff" />
      <circle cx="69.5" cy="38.5" r="1.2" fill="#fff" />
      {/* 입 */}
      <path d="M 54 50 Q 60 54 66 50" stroke="#2D1B00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function faceBigEyes(uid: string) {
  void uid;
  return (
    <g>
      {/* 큰 눈 */}
      <ellipse cx="52" cy="40" rx="4" ry="4.5" fill="#2D1B00" />
      <ellipse cx="68" cy="40" rx="4" ry="4.5" fill="#2D1B00" />
      {/* 눈 반사광 (큰) */}
      <circle cx="54" cy="38" r="1.8" fill="#fff" />
      <circle cx="70" cy="38" r="1.8" fill="#fff" />
      <circle cx="51" cy="41" r="0.8" fill="#fff" />
      <circle cx="67" cy="41" r="0.8" fill="#fff" />
      {/* 작은 미소 */}
      <path d="M 55 50 Q 60 53 65 50" stroke="#2D1B00" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

function faceBigSmile(uid: string) {
  void uid;
  return (
    <g>
      {/* 활짝 웃는 눈 (^ ^) */}
      <path d="M 48 40 Q 52 36 56 40" stroke="#2D1B00" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M 64 40 Q 68 36 72 40" stroke="#2D1B00" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* 큰 웃는 입 */}
      <path d="M 52 49 Q 60 57 68 49" stroke="#2D1B00" strokeWidth="1.5" fill="#FF9999" strokeLinecap="round" />
    </g>
  );
}

// ============================================================
// DAD HAIR STYLES
// ============================================================
function dadShortHair(uid: string) {
  void uid;
  return (
    <g>
      <path
        d="M 40 35 Q 40 18 60 16 Q 80 18 80 35"
        fill="#4A3728"
        stroke="none"
      />
      {/* 짧은 옆머리 */}
      <path d="M 40 35 Q 38 28 42 22" fill="#4A3728" />
      <path d="M 80 35 Q 82 28 78 22" fill="#4A3728" />
    </g>
  );
}

function dadWavyHair(uid: string) {
  void uid;
  return (
    <g>
      <path
        d="M 38 38 Q 36 18 60 14 Q 84 18 82 38"
        fill="#5C4033"
        stroke="none"
      />
      {/* 웨이브 */}
      <path d="M 42 28 Q 48 22 54 28 Q 58 22 64 28 Q 70 22 76 28" fill="none" stroke="#5C4033" strokeWidth="4" />
      <path d="M 38 34 Q 36 26 42 20" fill="#5C4033" />
      <path d="M 82 34 Q 84 26 78 20" fill="#5C4033" />
    </g>
  );
}

function dadPartedHair(uid: string) {
  void uid;
  return (
    <g>
      {/* 가르마 머리 */}
      <path
        d="M 38 36 Q 38 18 58 15 L 60 14 L 62 15 Q 82 18 82 36"
        fill="#3D2B1F"
        stroke="none"
      />
      {/* 가르마 선 */}
      <line x1="60" y1="14" x2="60" y2="26" stroke="#2A1A0F" strokeWidth="1" />
      {/* 왼쪽으로 넘긴 머리 */}
      <path d="M 60 14 Q 46 16 38 30" fill="#3D2B1F" />
      {/* 오른쪽 머리 */}
      <path d="M 60 14 Q 74 16 82 30" fill="#3D2B1F" />
    </g>
  );
}

function dadCurlyHair(uid: string) {
  void uid;
  return (
    <g>
      {/* 곱슬머리 베이스 */}
      <path
        d="M 36 38 Q 34 14 60 12 Q 86 14 84 38"
        fill="#4A3728"
        stroke="none"
      />
      {/* 곱슬 텍스처 */}
      <circle cx="44" cy="20" r="5" fill="#5C4033" />
      <circle cx="54" cy="16" r="5" fill="#5C4033" />
      <circle cx="66" cy="16" r="5" fill="#5C4033" />
      <circle cx="76" cy="20" r="5" fill="#5C4033" />
      <circle cx="38" cy="28" r="4" fill="#5C4033" />
      <circle cx="82" cy="28" r="4" fill="#5C4033" />
      <circle cx="48" cy="14" r="4" fill="#4A3728" />
      <circle cx="60" cy="12" r="4" fill="#4A3728" />
      <circle cx="72" cy="14" r="4" fill="#4A3728" />
    </g>
  );
}

function dadNeatHair(uid: string) {
  void uid;
  return (
    <g>
      {/* 깔끔한 짧은 머리 */}
      <path
        d="M 40 36 Q 40 18 60 16 Q 80 18 80 36"
        fill="#2C1B0E"
        stroke="none"
      />
      {/* 깔끔한 옆머리 라인 */}
      <path d="M 40 32 Q 39 24 44 19" fill="#2C1B0E" />
      <path d="M 80 32 Q 81 24 76 19" fill="#2C1B0E" />
    </g>
  );
}

// ============================================================
// MOM HAIR STYLES
// ============================================================
function momLongHair(uid: string) {
  void uid;
  return (
    <g>
      {/* 긴 머리 상단 */}
      <path
        d="M 36 40 Q 34 16 60 12 Q 86 16 84 40"
        fill="#5C3317"
        stroke="none"
      />
      {/* 긴 머리 좌 */}
      <path d="M 36 40 Q 32 50 30 70 Q 30 80 36 82 Q 40 70 40 55" fill="#5C3317" />
      {/* 긴 머리 우 */}
      <path d="M 84 40 Q 88 50 90 70 Q 90 80 84 82 Q 80 70 80 55" fill="#5C3317" />
      {/* 앞머리 */}
      <path d="M 42 24 Q 50 20 58 24 Q 52 22 46 26" fill="#6B3A1F" />
    </g>
  );
}

function momBobHair(uid: string) {
  void uid;
  return (
    <g>
      {/* 단발 머리 */}
      <path
        d="M 34 40 Q 32 16 60 12 Q 88 16 86 40 Q 88 56 82 60 Q 78 62 74 58 L 74 40"
        fill="#5C3317"
        stroke="none"
      />
      <path
        d="M 34 40 Q 32 56 38 60 Q 42 62 46 58 L 46 40"
        fill="#5C3317"
        stroke="none"
      />
      {/* 앞머리 */}
      <path d="M 42 26 Q 52 18 60 20 Q 68 18 78 26 Q 72 22 60 20 Q 48 22 42 26" fill="#6B3A1F" />
    </g>
  );
}

function momPonytail(uid: string) {
  void uid;
  return (
    <g>
      {/* 머리 상단 */}
      <path
        d="M 38 38 Q 36 16 60 12 Q 84 16 82 38"
        fill="#5C3317"
        stroke="none"
      />
      {/* 포니테일 */}
      <path d="M 78 24 Q 92 18 96 30 Q 98 42 90 52 Q 86 56 82 50 Q 88 42 86 32 Q 84 26 78 24" fill="#5C3317" />
      {/* 포니테일 묶음 */}
      <circle cx="80" cy="24" r="3" fill="#FF6B9D" />
      {/* 앞머리 */}
      <path d="M 42 26 Q 50 20 60 22 Q 54 20 46 26" fill="#6B3A1F" />
    </g>
  );
}

function momWavyBob(uid: string) {
  void uid;
  return (
    <g>
      {/* 웨이브 단발 */}
      <path
        d="M 34 38 Q 32 16 60 12 Q 88 16 86 38"
        fill="#5C3317"
        stroke="none"
      />
      {/* 좌측 웨이브 */}
      <path d="M 34 38 Q 30 48 34 56 Q 38 62 42 58 Q 36 52 38 42" fill="#5C3317" />
      {/* 우측 웨이브 */}
      <path d="M 86 38 Q 90 48 86 56 Q 82 62 78 58 Q 84 52 82 42" fill="#5C3317" />
      {/* 웨이브 텍스처 */}
      <path d="M 36 44 Q 34 50 38 54" fill="none" stroke="#6B3A1F" strokeWidth="1.5" />
      <path d="M 84 44 Q 86 50 82 54" fill="none" stroke="#6B3A1F" strokeWidth="1.5" />
      {/* 앞머리 */}
      <path d="M 42 24 Q 48 18 56 20 Q 64 18 70 20 Q 76 18 78 24 Q 70 20 60 22 Q 50 20 42 24" fill="#6B3A1F" />
    </g>
  );
}

// ============================================================
// CHILD HAIR STYLES
// ============================================================
function childTwintails(uid: string) {
  void uid;
  return (
    <g>
      {/* 머리 상단 */}
      <path
        d="M 38 38 Q 38 18 60 14 Q 82 18 82 38"
        fill="#3D2B1F"
        stroke="none"
      />
      {/* 왼쪽 양갈래 */}
      <path d="M 40 28 Q 26 22 22 34 Q 20 44 26 52 Q 30 56 34 50 Q 28 42 30 34 Q 32 28 40 28" fill="#3D2B1F" />
      {/* 오른쪽 양갈래 */}
      <path d="M 80 28 Q 94 22 98 34 Q 100 44 94 52 Q 90 56 86 50 Q 92 42 90 34 Q 88 28 80 28" fill="#3D2B1F" />
      {/* 양갈래 묶음 */}
      <circle cx="34" cy="28" r="3" fill="#FFD700" />
      <circle cx="86" cy="28" r="3" fill="#FFD700" />
      {/* 앞머리 */}
      <path d="M 44 24 Q 52 18 60 20 Q 68 18 76 24 Q 68 20 60 22 Q 52 20 44 24" fill="#4A3728" />
    </g>
  );
}

function childPonytail(uid: string) {
  void uid;
  return (
    <g>
      {/* 머리 상단 */}
      <path
        d="M 40 38 Q 38 18 60 14 Q 82 18 80 38"
        fill="#3D2B1F"
        stroke="none"
      />
      {/* 포니테일 (위쪽) */}
      <path d="M 58 14 Q 60 4 66 6 Q 72 8 70 18 Q 74 8 68 4 Q 62 2 56 8 Q 54 12 58 14" fill="#3D2B1F" />
      {/* 포니테일 꼬리 */}
      <path d="M 64 6 Q 76 2 82 12 Q 86 20 80 26 Q 76 28 74 22 Q 80 16 76 10 Q 72 6 64 6" fill="#3D2B1F" />
      {/* 묶음 */}
      <circle cx="62" cy="10" r="3" fill="#FF6B9D" />
      {/* 앞머리 */}
      <path d="M 44 26 Q 52 18 60 20 Q 68 18 76 26 Q 68 22 60 22 Q 52 22 44 26" fill="#4A3728" />
    </g>
  );
}

function childBobCut(uid: string) {
  void uid;
  return (
    <g>
      {/* 보브컷 */}
      <path
        d="M 36 40 Q 34 16 60 12 Q 86 16 84 40 Q 86 52 80 54 Q 76 56 74 50 L 74 40"
        fill="#3D2B1F"
        stroke="none"
      />
      <path
        d="M 36 40 Q 34 52 40 54 Q 44 56 46 50 L 46 40"
        fill="#3D2B1F"
        stroke="none"
      />
      {/* 둥근 앞머리 */}
      <path d="M 40 28 Q 50 16 60 18 Q 70 16 80 28 Q 72 20 60 20 Q 48 20 40 28" fill="#4A3728" />
    </g>
  );
}

// ============================================================
// ACCESSORIES
// ============================================================
function glasses() {
  return (
    <g>
      {/* 왼쪽 렌즈 */}
      <circle cx="52" cy="40" r="6" fill="none" stroke="#333" strokeWidth="1.5" />
      {/* 오른쪽 렌즈 */}
      <circle cx="68" cy="40" r="6" fill="none" stroke="#333" strokeWidth="1.5" />
      {/* 브릿지 */}
      <line x1="58" y1="40" x2="62" y2="40" stroke="#333" strokeWidth="1.5" />
      {/* 다리 */}
      <line x1="46" y1="40" x2="40" y2="38" stroke="#333" strokeWidth="1" />
      <line x1="74" y1="40" x2="80" y2="38" stroke="#333" strokeWidth="1" />
    </g>
  );
}

function beard() {
  return (
    <g>
      <path
        d="M 50 50 Q 52 56 60 58 Q 68 56 70 50"
        fill="none"
        stroke="#4A3728"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M 52 52 Q 56 57 60 58 Q 64 57 68 52"
        fill="#4A3728"
        opacity="0.3"
      />
    </g>
  );
}

function cap(suitColor: string) {
  return (
    <g>
      {/* 캡 챙 */}
      <ellipse cx="60" cy="26" rx="24" ry="4" fill={suitColor} />
      {/* 캡 본체 */}
      <path d="M 38 26 Q 38 10 60 8 Q 82 10 82 26" fill={suitColor} />
      {/* 캡 장식 */}
      <circle cx="60" cy="10" r="2" fill="#FFD700" />
    </g>
  );
}

function ribbon(ribbonColor: string, x: number, y: number) {
  return (
    <g transform={`translate(${x}, ${y})`}>
      <path d="M 0 0 L -5 -6 L -1 -2 L 0 -8 L 1 -2 L 5 -6 Z" fill={ribbonColor} />
      <circle cx="0" cy="0" r="2" fill={ribbonColor} />
    </g>
  );
}

function earring() {
  return (
    <g>
      <circle cx="40" cy="48" r="2" fill="#FFD700" />
      <circle cx="40" cy="51" r="1.5" fill="#FFD700" opacity="0.7" />
      <circle cx="80" cy="48" r="2" fill="#FFD700" />
      <circle cx="80" cy="51" r="1.5" fill="#FFD700" opacity="0.7" />
    </g>
  );
}

function hairpin() {
  return (
    <g>
      {/* 꽃 모양 헤어핀 */}
      <circle cx="78" cy="24" r="3" fill="#FF69B4" />
      <circle cx="75" cy="22" r="2" fill="#FF69B4" opacity="0.7" />
      <circle cx="81" cy="22" r="2" fill="#FF69B4" opacity="0.7" />
      <circle cx="78" cy="21" r="2" fill="#FF69B4" opacity="0.7" />
      <circle cx="78" cy="24" r="1.5" fill="#FFD700" />
    </g>
  );
}

function starHairpin() {
  return (
    <g transform="translate(76, 14)">
      <polygon
        points="0,-6 1.5,-2 6,-2 2.5,1 4,5.5 0,3 -4,5.5 -2.5,1 -6,-2 -1.5,-2"
        fill="#FFD700"
        stroke="#FFA500"
        strokeWidth="0.5"
      />
    </g>
  );
}
