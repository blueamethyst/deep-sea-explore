'use client';

import React from 'react';

/* ----------------------------------------------------------------
 * ExplorerCharacter
 * - 정글 탐험 캐릭터 SVG 컴포넌트
 * - templateId로 캐릭터 선택, colors로 파츠별 색상 커스텀
 * - walking animation (gentle bounce) 내장
 * ---------------------------------------------------------------- */

export interface ExplorerCharacterProps {
  templateId: string;
  colors: Record<string, string>;
  width?: number;
  height?: number;
  walking?: boolean;
}

// 기본 색상
const DEFAULT_COLORS: Record<string, string> = {
  hair: '#4A3728',
  skin: '#FFE4B5',
  outfit: '#48DBFB',
  hat: '#2ECC71',
};

export function getDefaultColors(): Record<string, string> {
  return { ...DEFAULT_COLORS };
}

export const TEMPLATE_LIST = [
  { id: 'explorer_girl', label: '탐험가 소녀' },
  { id: 'explorer_boy', label: '탐험가 소년' },
  { id: 'scientist_girl', label: '과학자 소녀' },
  { id: 'scientist_boy', label: '과학자 소년' },
  { id: 'photographer', label: '사진가' },
  { id: 'zoologist', label: '동물학자' },
  { id: 'butterfly_researcher', label: '나비 연구원' },
  { id: 'veterinarian', label: '수의사' },
] as const;

export const ExplorerCharacter: React.FC<ExplorerCharacterProps> = ({
  templateId,
  colors,
  width = 80,
  height = 112,
  walking = false,
}) => {
  const c = { ...DEFAULT_COLORS, ...colors };
  const uid = templateId.replace(/_/g, '-');
  const skinDark = darken(c.skin, 0.06);
  const outfitDark = darken(c.outfit, 0.15);

  return (
    <svg
      viewBox="0 0 120 168"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      className={walking ? 'animate-explorer-walk' : ''}
    >
      <defs>
        <radialGradient id={`sk-${uid}`} cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor={c.skin} />
          <stop offset="100%" stopColor={skinDark} />
        </radialGradient>
      </defs>

      {renderTemplate(templateId, uid, c, outfitDark)}

      <style>{`
        @keyframes explorerWalk {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-explorer-walk {
          animation: explorerWalk 0.6s ease-in-out infinite;
        }
      `}</style>
    </svg>
  );
};

/* ----------------------------------------------------------------
 *  Template Renderer
 * ---------------------------------------------------------------- */
function renderTemplate(
  id: string,
  uid: string,
  c: Record<string, string>,
  outfitDark: string,
) {
  switch (id) {
    case 'explorer_girl':
      return explorerGirl(uid, c, outfitDark);
    case 'explorer_boy':
      return explorerBoy(uid, c, outfitDark);
    case 'scientist_girl':
      return scientistGirl(uid, c, outfitDark);
    case 'scientist_boy':
      return scientistBoy(uid, c, outfitDark);
    case 'photographer':
      return photographer(uid, c, outfitDark);
    case 'zoologist':
      return zoologist(uid, c, outfitDark);
    case 'butterfly_researcher':
      return butterflyResearcher(uid, c, outfitDark);
    case 'veterinarian':
      return veterinarian(uid, c, outfitDark);
    default:
      return explorerGirl(uid, c, outfitDark);
  }
}

/* ================================================================
 *  Common parts
 * ================================================================ */
function legs(c: Record<string, string>) {
  return (
    <g data-part="legs">
      {/* 왼쪽 다리 */}
      <rect x="42" y="130" width="14" height="24" rx="7" fill={c.outfit} />
      {/* 오른쪽 다리 */}
      <rect x="64" y="130" width="14" height="24" rx="7" fill={c.outfit} />
      {/* 왼쪽 신발 */}
      <ellipse cx="49" cy="156" rx="10" ry="6" fill="#5C3317" />
      {/* 오른쪽 신발 */}
      <ellipse cx="71" cy="156" rx="10" ry="6" fill="#5C3317" />
    </g>
  );
}

function body(c: Record<string, string>, outfitDark: string) {
  return (
    <g data-part="outfit">
      <rect x="36" y="88" width="48" height="46" rx="10" fill={c.outfit} />
      {/* 팔 */}
      <rect x="22" y="92" width="16" height="30" rx="8" fill={c.outfit} />
      <rect x="82" y="92" width="16" height="30" rx="8" fill={c.outfit} />
      {/* 손 */}
      <circle cx="30" cy="124" r="6" fill={c.skin} />
      <circle cx="90" cy="124" r="6" fill={c.skin} />
      {/* 칼라 */}
      <ellipse cx="60" cy="90" rx="20" ry="5" fill={outfitDark} />
    </g>
  );
}

function head(uid: string, c: Record<string, string>) {
  return (
    <g data-part="skin">
      <circle cx="60" cy="55" r="28" fill={`url(#sk-${uid})`} />
      {/* 볼터치 */}
      <circle cx="42" cy="62" r="6" fill="#FFB6C1" opacity="0.35" />
      <circle cx="78" cy="62" r="6" fill="#FFB6C1" opacity="0.35" />
    </g>
  );
}

function eyes() {
  return (
    <g>
      <ellipse cx="50" cy="53" rx="3.5" ry="4" fill="#2D1B00" />
      <ellipse cx="70" cy="53" rx="3.5" ry="4" fill="#2D1B00" />
      <circle cx="51.5" cy="51" r="1.5" fill="#fff" />
      <circle cx="71.5" cy="51" r="1.5" fill="#fff" />
    </g>
  );
}

function bigEyes() {
  return (
    <g>
      <ellipse cx="50" cy="53" rx="4.5" ry="5" fill="#2D1B00" />
      <ellipse cx="70" cy="53" rx="4.5" ry="5" fill="#2D1B00" />
      <circle cx="52" cy="50.5" r="2" fill="#fff" />
      <circle cx="72" cy="50.5" r="2" fill="#fff" />
      <circle cx="49" cy="54" r="1" fill="#fff" />
      <circle cx="69" cy="54" r="1" fill="#fff" />
    </g>
  );
}

function smile() {
  return (
    <path
      d="M 52 65 Q 60 71 68 65"
      stroke="#2D1B00"
      strokeWidth="1.8"
      fill="none"
      strokeLinecap="round"
    />
  );
}

function bigSmile() {
  return (
    <path
      d="M 50 64 Q 60 74 70 64"
      stroke="#2D1B00"
      strokeWidth="1.8"
      fill="#FF9999"
      strokeLinecap="round"
    />
  );
}

/* ================================================================
 *  Hair styles
 * ================================================================ */
function girlLongHair(c: Record<string, string>) {
  return (
    <g data-part="hair">
      <path d="M 34 52 Q 30 24 60 18 Q 90 24 86 52" fill={c.hair} />
      <path d="M 34 52 Q 28 68 28 86 Q 28 92 34 90 Q 36 78 38 66" fill={c.hair} />
      <path d="M 86 52 Q 92 68 92 86 Q 92 92 86 90 Q 84 78 82 66" fill={c.hair} />
      <path d="M 40 34 Q 50 26 60 28 Q 54 26 44 34" fill={darken(c.hair, 0.08)} />
    </g>
  );
}

function girlBobHair(c: Record<string, string>) {
  return (
    <g data-part="hair">
      <path d="M 32 54 Q 28 22 60 16 Q 92 22 88 54" fill={c.hair} />
      <path d="M 32 54 Q 28 70 36 74 Q 40 72 40 60" fill={c.hair} />
      <path d="M 88 54 Q 92 70 84 74 Q 80 72 80 60" fill={c.hair} />
      <path d="M 40 32 Q 52 22 60 24 Q 68 22 80 32 Q 70 26 60 26 Q 50 26 40 32" fill={darken(c.hair, 0.08)} />
    </g>
  );
}

function girlPonytailHair(c: Record<string, string>) {
  return (
    <g data-part="hair">
      <path d="M 34 52 Q 32 24 60 18 Q 88 24 86 52" fill={c.hair} />
      {/* 포니테일 */}
      <path d="M 80 32 Q 96 26 100 40 Q 102 54 94 62 Q 90 64 88 58 Q 96 50 94 40 Q 90 32 80 32" fill={c.hair} />
      <circle cx="82" cy="32" r="3.5" fill="#FF6B9D" />
      <path d="M 42 34 Q 52 26 62 28 Q 54 26 44 34" fill={darken(c.hair, 0.08)} />
    </g>
  );
}

function boyShortHair(c: Record<string, string>) {
  return (
    <g data-part="hair">
      <path d="M 36 48 Q 34 24 60 18 Q 86 24 84 48" fill={c.hair} />
      <path d="M 36 44 Q 32 34 38 26" fill={c.hair} />
      <path d="M 84 44 Q 88 34 82 26" fill={c.hair} />
    </g>
  );
}

function boyNeatHair(c: Record<string, string>) {
  return (
    <g data-part="hair">
      <path d="M 36 48 Q 34 22 60 16 Q 86 22 84 48" fill={c.hair} />
      <path d="M 60 16 Q 46 18 36 36" fill={c.hair} />
      <path d="M 60 16 Q 74 18 84 36" fill={c.hair} />
      <line x1="60" y1="16" x2="60" y2="30" stroke={darken(c.hair, 0.12)} strokeWidth="1" />
    </g>
  );
}

function boySpikyHair(c: Record<string, string>) {
  return (
    <g data-part="hair">
      <path d="M 36 48 Q 34 24 60 18 Q 86 24 84 48" fill={c.hair} />
      {/* 뾰족한 머리 */}
      <path d="M 42 26 L 46 12 L 52 24" fill={c.hair} />
      <path d="M 52 22 L 58 8 L 64 22" fill={c.hair} />
      <path d="M 64 24 L 70 10 L 76 26" fill={c.hair} />
    </g>
  );
}

/* ================================================================
 *  Hat styles
 * ================================================================ */
function explorerHat(c: Record<string, string>) {
  return (
    <g data-part="hat">
      <ellipse cx="60" cy="30" rx="32" ry="5" fill={c.hat} />
      <path d="M 38 30 Q 38 12 60 10 Q 82 12 82 30" fill={c.hat} />
      <rect x="38" y="26" width="44" height="4" rx="2" fill={darken(c.hat, 0.12)} />
    </g>
  );
}

function safariHat(c: Record<string, string>) {
  return (
    <g data-part="hat">
      <ellipse cx="60" cy="28" rx="34" ry="6" fill={c.hat} />
      <path d="M 36 28 Q 36 10 60 8 Q 84 10 84 28" fill={c.hat} />
      <rect x="36" y="24" width="48" height="4" rx="2" fill={darken(c.hat, 0.12)} />
      {/* 끈 */}
      <path d="M 36 28 Q 30 36 34 44" stroke={darken(c.hat, 0.2)} strokeWidth="1.5" fill="none" />
      <path d="M 84 28 Q 90 36 86 44" stroke={darken(c.hat, 0.2)} strokeWidth="1.5" fill="none" />
    </g>
  );
}

function butterflyHat(c: Record<string, string>) {
  return (
    <g data-part="hat">
      <ellipse cx="60" cy="28" rx="30" ry="5" fill={c.hat} />
      <path d="M 40 28 Q 40 12 60 10 Q 80 12 80 28" fill={c.hat} />
      <rect x="40" y="24" width="40" height="4" rx="2" fill={darken(c.hat, 0.12)} />
      {/* 나비 장식 */}
      <g transform="translate(60, 10)">
        <ellipse cx="-5" cy="0" rx="4" ry="3" fill="#FF9FF3" opacity="0.8" />
        <ellipse cx="5" cy="0" rx="4" ry="3" fill="#FF9FF3" opacity="0.8" />
        <circle cx="0" cy="0" r="1.5" fill="#5F27CD" />
      </g>
    </g>
  );
}

/* ================================================================
 *  Accessories
 * ================================================================ */
function backpack(c: Record<string, string>) {
  return (
    <g>
      <rect x="14" y="94" width="14" height="18" rx="4" fill={darken(c.outfit, 0.1)} />
      <rect x="16" y="96" width="10" height="6" rx="2" fill={darken(c.outfit, 0.2)} />
      {/* 끈 */}
      <line x1="22" y1="94" x2="36" y2="92" stroke={darken(c.outfit, 0.2)} strokeWidth="2" />
    </g>
  );
}

function glassesAccessory() {
  return (
    <g>
      <circle cx="50" cy="53" r="7" fill="none" stroke="#444" strokeWidth="1.8" />
      <circle cx="70" cy="53" r="7" fill="none" stroke="#444" strokeWidth="1.8" />
      <line x1="57" y1="53" x2="63" y2="53" stroke="#444" strokeWidth="1.8" />
      <line x1="43" y1="53" x2="36" y2="50" stroke="#444" strokeWidth="1.2" />
      <line x1="77" y1="53" x2="84" y2="50" stroke="#444" strokeWidth="1.2" />
      {/* 렌즈 반사 */}
      <circle cx="48" cy="51" r="1.5" fill="#fff" opacity="0.5" />
      <circle cx="68" cy="51" r="1.5" fill="#fff" opacity="0.5" />
    </g>
  );
}

function magnifyingGlass() {
  return (
    <g transform="translate(84, 108)">
      <circle cx="0" cy="0" r="8" fill="#E0F0FF" stroke="#888" strokeWidth="2" />
      <circle cx="-2" cy="-2" r="2" fill="#fff" opacity="0.6" />
      <line x1="6" y1="6" x2="14" y2="14" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
    </g>
  );
}

function notebook() {
  return (
    <g transform="translate(84, 106)">
      <rect x="0" y="0" width="16" height="20" rx="2" fill="#FECA57" />
      <rect x="2" y="2" width="12" height="16" rx="1" fill="#FFF8DC" />
      <line x1="4" y1="6" x2="12" y2="6" stroke="#ccc" strokeWidth="0.8" />
      <line x1="4" y1="9" x2="12" y2="9" stroke="#ccc" strokeWidth="0.8" />
      <line x1="4" y1="12" x2="10" y2="12" stroke="#ccc" strokeWidth="0.8" />
      {/* 펜 */}
      <rect x="14" y="-2" width="3" height="22" rx="1.5" fill="#FF6B6B" />
      <polygon points="14,-2 17,-2 15.5,-6" fill="#2D1B00" />
    </g>
  );
}

function camera() {
  return (
    <g transform="translate(48, 100)">
      <rect x="0" y="0" width="24" height="16" rx="3" fill="#333" />
      <circle cx="12" cy="8" r="6" fill="#555" />
      <circle cx="12" cy="8" r="4" fill="#1A1A2E" />
      <circle cx="10" cy="6" r="1.5" fill="#fff" opacity="0.4" />
      {/* 플래시 */}
      <rect x="18" y="2" width="4" height="3" rx="1" fill="#FECA57" />
      {/* 스트랩 */}
      <path d="M 0 8 Q -8 4 -6 -2 Q -4 -8 2 -6" stroke="#888" strokeWidth="2" fill="none" />
      <path d="M 24 8 Q 32 4 30 -2 Q 28 -8 22 -6" stroke="#888" strokeWidth="2" fill="none" />
    </g>
  );
}

function vest(c: Record<string, string>) {
  return (
    <g>
      {/* 조끼 */}
      <path d="M 40 90 L 40 126 Q 40 130 44 130 L 56 130 L 56 90" fill={darken(c.hat, 0.1)} />
      <path d="M 80 90 L 80 126 Q 80 130 76 130 L 64 130 L 64 90" fill={darken(c.hat, 0.1)} />
      {/* 주머니 */}
      <rect x="42" y="108" width="12" height="10" rx="2" fill={darken(c.hat, 0.2)} />
      <rect x="66" y="108" width="12" height="10" rx="2" fill={darken(c.hat, 0.2)} />
    </g>
  );
}

function binoculars() {
  return (
    <g transform="translate(44, 96)">
      {/* 스트랩 */}
      <path d="M 4 0 Q 16 -10 28 0" stroke="#5C3317" strokeWidth="2" fill="none" />
      {/* 쌍안경 본체 */}
      <rect x="0" y="0" width="12" height="16" rx="4" fill="#333" />
      <rect x="20" y="0" width="12" height="16" rx="4" fill="#333" />
      <rect x="10" y="4" width="12" height="8" rx="2" fill="#444" />
      {/* 렌즈 */}
      <circle cx="6" cy="14" r="5" fill="#1A1A2E" />
      <circle cx="26" cy="14" r="5" fill="#1A1A2E" />
      <circle cx="4" cy="12" r="1.5" fill="#fff" opacity="0.3" />
      <circle cx="24" cy="12" r="1.5" fill="#fff" opacity="0.3" />
    </g>
  );
}

function butterflyNet() {
  return (
    <g transform="translate(86, 70)">
      {/* 자루 */}
      <rect x="0" y="20" width="4" height="50" rx="2" fill="#8B4513" />
      {/* 링 */}
      <circle cx="2" cy="14" r="14" fill="none" stroke="#888" strokeWidth="2.5" />
      {/* 그물 */}
      <path d="M -12 14 Q 2 40 16 14" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M -10 18 Q 2 36 14 18" fill="none" stroke="#ccc" strokeWidth="1" strokeDasharray="2 2" />
      {/* 나비 */}
      <g transform="translate(2, 8)">
        <ellipse cx="-3" cy="0" rx="3" ry="2" fill="#FF9FF3" opacity="0.7" />
        <ellipse cx="3" cy="0" rx="3" ry="2" fill="#FECA57" opacity="0.7" />
        <circle cx="0" cy="0" r="1" fill="#333" />
      </g>
    </g>
  );
}

function labCoat(c: Record<string, string>) {
  void c;
  return (
    <g>
      {/* 가운 */}
      <rect x="34" y="88" width="52" height="48" rx="8" fill="#FAFAFA" />
      <rect x="20" y="92" width="18" height="30" rx="8" fill="#FAFAFA" />
      <rect x="82" y="92" width="18" height="30" rx="8" fill="#FAFAFA" />
      {/* 가운 라인 */}
      <line x1="60" y1="90" x2="60" y2="134" stroke="#ddd" strokeWidth="1.5" />
      {/* 버튼 */}
      <circle cx="56" cy="100" r="2" fill="#48DBFB" />
      <circle cx="56" cy="110" r="2" fill="#48DBFB" />
      <circle cx="56" cy="120" r="2" fill="#48DBFB" />
      {/* 주머니 */}
      <rect x="38" y="112" width="14" height="12" rx="2" fill="#F0F0F0" stroke="#ddd" strokeWidth="0.8" />
    </g>
  );
}

function stethoscope() {
  return (
    <g>
      {/* 줄 */}
      <path d="M 52 88 Q 42 96 44 110 Q 46 120 54 124" stroke="#555" strokeWidth="2.5" fill="none" />
      <path d="M 68 88 Q 78 96 76 110 Q 74 120 66 124" stroke="#555" strokeWidth="2.5" fill="none" />
      {/* 합류 */}
      <path d="M 54 124 Q 60 130 66 124" stroke="#555" strokeWidth="2.5" fill="none" />
      {/* 청진기 헤드 */}
      <circle cx="60" cy="132" r="6" fill="#888" />
      <circle cx="60" cy="132" r="4" fill="#aaa" />
      <circle cx="59" cy="131" r="1.5" fill="#ccc" />
    </g>
  );
}

/* ================================================================
 *  8 Templates
 * ================================================================ */

function explorerGirl(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {backpack(c)}
      {head(uid, c)}
      {girlLongHair(c)}
      {explorerHat(c)}
      {bigEyes()}
      {bigSmile()}
    </g>
  );
}

function explorerBoy(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {backpack(c)}
      {head(uid, c)}
      {boyShortHair(c)}
      {explorerHat(c)}
      {eyes()}
      {smile()}
    </g>
  );
}

function scientistGirl(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {magnifyingGlass()}
      {head(uid, c)}
      {girlBobHair(c)}
      {glassesAccessory()}
      {bigSmile()}
    </g>
  );
}

function scientistBoy(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {notebook()}
      {head(uid, c)}
      {boyNeatHair(c)}
      {glassesAccessory()}
      {smile()}
    </g>
  );
}

function photographer(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {vest(c)}
      {camera()}
      {head(uid, c)}
      {boySpikyHair(c)}
      {eyes()}
      {bigSmile()}
    </g>
  );
}

function zoologist(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {binoculars()}
      {head(uid, c)}
      {boyShortHair(c)}
      {safariHat(c)}
      {eyes()}
      {smile()}
    </g>
  );
}

function butterflyResearcher(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {butterflyNet()}
      {head(uid, c)}
      {girlPonytailHair(c)}
      {butterflyHat(c)}
      {bigEyes()}
      {bigSmile()}
    </g>
  );
}

function veterinarian(uid: string, c: Record<string, string>, outfitDark: string) {
  return (
    <g>
      {legs(c)}
      {body(c, outfitDark)}
      {labCoat(c)}
      {stethoscope()}
      {head(uid, c)}
      {girlBobHair(c)}
      {bigEyes()}
      {smile()}
    </g>
  );
}

/* ================================================================
 *  Utility
 * ================================================================ */
function darken(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.max(0, ((num >> 16) & 0xff) - Math.round(255 * amount));
  const g = Math.max(0, ((num >> 8) & 0xff) - Math.round(255 * amount));
  const b = Math.max(0, (num & 0xff) - Math.round(255 * amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
