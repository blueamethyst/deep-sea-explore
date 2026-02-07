import React from 'react';

interface CreatureSVGProps {
  svgId: string;
  size?: number;
  className?: string;
}

/* ======================================================================
   1. ClownfishSVG (흰동가리)
   ====================================================================== */
const ClownfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="cf-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF8C42"/>
        <stop offset="100%" stopColor="#FF6B35"/>
      </linearGradient>
      <linearGradient id="cf-belly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FF9955"/>
        <stop offset="100%" stopColor="#FF6B35"/>
      </linearGradient>
      <linearGradient id="cf-tail" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FF8C42"/>
        <stop offset="100%" stopColor="#FFAB76"/>
      </linearGradient>
      <linearGradient id="cf-dorsal" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FF8C42"/>
        <stop offset="100%" stopColor="#FFAB76" stopOpacity="0.7"/>
      </linearGradient>
    </defs>
    <g>
      {/* 몸통 메인 */}
      <path d="M28 60 Q28 42 45 38 Q60 35 78 40 Q92 45 95 58 Q96 65 92 70 Q85 78 70 80 Q55 82 40 78 Q28 74 28 60Z" fill="url(#cf-body)"/>
      {/* 배 하이라이트 */}
      <path d="M38 62 Q40 70 55 72 Q70 74 82 68 Q84 64 80 62 Q70 66 55 66 Q40 66 38 62Z" fill="url(#cf-belly)" opacity="0.5"/>
      {/* 흰 줄무늬 1 - 머리 쪽 */}
      <path d="M38 42 Q36 50 35 60 Q36 70 38 76 Q40 78 42 76 Q40 68 40 60 Q40 50 42 42 Q40 40 38 42Z" fill="white" opacity="0.92"/>
      {/* 흰 줄무늬 2 - 가운데 */}
      <path d="M60 38 Q57 48 57 58 Q57 68 60 78 Q62 80 64 78 Q62 68 62 58 Q62 48 64 38 Q62 36 60 38Z" fill="white" opacity="0.88"/>
      {/* 흰 줄무늬 3 - 꼬리 쪽 */}
      <path d="M80 42 Q78 50 78 58 Q78 66 80 74 Q82 76 84 74 Q82 66 82 58 Q82 50 84 42 Q82 40 80 42Z" fill="white" opacity="0.85"/>
      {/* 줄무늬 검은 테두리 */}
      <path d="M37 42 Q35 50 34 60 Q35 70 37 77" stroke="#1A1A1A" strokeWidth="0.6" fill="none" opacity="0.4"/>
      <path d="M43 42 Q41 50 41 60 Q41 70 43 77" stroke="#1A1A1A" strokeWidth="0.6" fill="none" opacity="0.4"/>
      <path d="M59 37 Q56 48 56 58 Q56 68 59 79" stroke="#1A1A1A" strokeWidth="0.6" fill="none" opacity="0.4"/>
      <path d="M65 37 Q63 48 63 58 Q63 68 65 79" stroke="#1A1A1A" strokeWidth="0.6" fill="none" opacity="0.4"/>
      {/* 꼬리 지느러미 */}
      <path d="M92 56 Q100 48 106 42 Q108 50 106 58 Q108 66 106 74 Q100 68 92 62Z" fill="url(#cf-tail)" opacity="0.85"/>
      {/* 꼬리 지느러미 ray */}
      <path d="M93 57 Q100 50 105 44" stroke="#FF6B35" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M93 59 Q100 55 106 52" stroke="#FF6B35" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M93 61 Q100 63 106 66" stroke="#FF6B35" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M93 63 Q100 68 105 72" stroke="#FF6B35" strokeWidth="0.5" opacity="0.3" fill="none"/>
      {/* 등 지느러미 */}
      <path d="M48 40 Q52 30 58 26 Q62 28 68 32 Q72 36 74 40 Q62 38 48 40Z" fill="url(#cf-dorsal)" opacity="0.7"/>
      {/* 등지느러미 ray */}
      <path d="M52 39 Q54 32 58 27" stroke="#FF6B35" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M58 38 Q60 32 62 29" stroke="#FF6B35" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M64 38 Q66 33 68 32" stroke="#FF6B35" strokeWidth="0.4" opacity="0.3" fill="none"/>
      {/* 배 지느러미 */}
      <path d="M50 78 Q52 86 55 88 Q58 86 60 78Z" fill="url(#cf-tail)" opacity="0.6"/>
      {/* 가슴 지느러미 */}
      <path d="M42 58 Q36 62 34 68 Q38 66 44 62Z" fill="#FF8C42" opacity="0.65"/>
      {/* 비늘 텍스처 */}
      <path d="M45 50 Q48 48 50 50" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M50 55 Q53 53 55 55" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M55 50 Q58 48 60 50" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M65 52 Q68 50 70 52" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M68 58 Q71 56 73 58" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M48 62 Q51 60 53 62" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M60 62 Q63 60 65 62" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M72 62 Q75 60 77 62" stroke="#E85A20" strokeWidth="0.4" opacity="0.3" fill="none"/>
      {/* 눈 - 흰자 */}
      <ellipse cx="36" cy="56" rx="5" ry="5.5" fill="white"/>
      {/* 눈 - 홍채 */}
      <circle cx="37" cy="56" r="3.2" fill="#1A1A1A"/>
      {/* 눈 - 동공 */}
      <circle cx="37.5" cy="56.5" r="1.8" fill="#000000"/>
      {/* 눈 - 반사광 */}
      <circle cx="35.5" cy="54.5" r="1.2" fill="white" opacity="0.9"/>
      <circle cx="38" cy="57.5" r="0.6" fill="white" opacity="0.5"/>
      {/* 입 */}
      <path d="M30 62 Q32 64 34 62" stroke="#CC4400" strokeWidth="0.8" fill="none"/>
    </g>
  </svg>
);

/* ======================================================================
   2. JellyfishSVG (해파리)
   ====================================================================== */
const JellyfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="jf-dome" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stopColor="#FFD4F0" stopOpacity="0.8"/>
        <stop offset="60%" stopColor="#FFB3E6" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#FF85D0" stopOpacity="0.2"/>
      </radialGradient>
      <radialGradient id="jf-inner" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF69B4" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#FF69B4" stopOpacity="0.1"/>
      </radialGradient>
      <linearGradient id="jf-tentacle" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB3E6" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#FF85D0" stopOpacity="0.2"/>
      </linearGradient>
    </defs>
    <g>
      {/* 외부 돔 */}
      <path d="M25 52 Q25 22 60 18 Q95 22 95 52 Q85 58 60 58 Q35 58 25 52Z" fill="url(#jf-dome)"/>
      {/* 중간 돔 레이어 */}
      <path d="M32 50 Q32 28 60 24 Q88 28 88 50 Q80 55 60 55 Q40 55 32 50Z" fill="#FFD4F0" opacity="0.3"/>
      {/* 돔 하이라이트 */}
      <path d="M42 38 Q42 30 55 28 Q48 32 45 40Z" fill="white" opacity="0.3"/>
      {/* 4잎 클로버 내부 기관 */}
      <path d="M60 34 Q55 38 54 42 Q55 46 60 42 Q65 46 66 42 Q65 38 60 34Z" fill="url(#jf-inner)"/>
      <path d="M54 38 Q50 38 48 42 Q50 42 54 42 Q54 42 54 38Z" fill="#FF69B4" opacity="0.3"/>
      <path d="M66 38 Q70 38 72 42 Q70 42 66 42 Q66 42 66 38Z" fill="#FF69B4" opacity="0.3"/>
      {/* 돔 가장자리 프릴 */}
      <path d="M28 52 Q32 56 36 52 Q40 56 44 52 Q48 56 52 52 Q56 56 60 52 Q64 56 68 52 Q72 56 76 52 Q80 56 84 52 Q88 56 92 52" stroke="#FFB3E6" strokeWidth="1.5" fill="none" opacity="0.6"/>
      {/* 촉수 1 - 왼쪽 외부 */}
      <path d="M36 54 Q32 66 34 76 Q30 84 33 92" stroke="url(#jf-tentacle)" strokeWidth="2" fill="none"/>
      <circle cx="33" cy="92" r="1.5" fill="#FF85D0" opacity="0.6"/>
      {/* 촉수 2 */}
      <path d="M44 56 Q40 68 42 80 Q38 88 40 98" stroke="url(#jf-tentacle)" strokeWidth="2.2" fill="none"/>
      <circle cx="40" cy="98" r="1.5" fill="#FF85D0" opacity="0.7"/>
      {/* 촉수 3 - 중앙 */}
      <path d="M52 57 Q50 72 52 84 Q48 92 50 104" stroke="#FF69B4" strokeWidth="2.5" opacity="0.6" fill="none"/>
      <circle cx="50" cy="104" r="2" fill="#FFB3E6" opacity="0.8"/>
      {/* 촉수 4 - 중앙 */}
      <path d="M60 58 Q60 74 58 86 Q60 94 60 108" stroke="#FF69B4" strokeWidth="2.8" opacity="0.65" fill="none"/>
      <circle cx="60" cy="108" r="2" fill="#FFB3E6" opacity="0.8"/>
      {/* 촉수 5 - 중앙 */}
      <path d="M68 57 Q70 72 68 84 Q72 92 70 104" stroke="#FF69B4" strokeWidth="2.5" opacity="0.6" fill="none"/>
      <circle cx="70" cy="104" r="2" fill="#FFB3E6" opacity="0.8"/>
      {/* 촉수 6 */}
      <path d="M76 56 Q80 68 78 80 Q82 88 80 98" stroke="url(#jf-tentacle)" strokeWidth="2.2" fill="none"/>
      <circle cx="80" cy="98" r="1.5" fill="#FF85D0" opacity="0.7"/>
      {/* 촉수 7 - 오른쪽 외부 */}
      <path d="M84 54 Q88 66 86 76 Q90 84 87 92" stroke="url(#jf-tentacle)" strokeWidth="2" fill="none"/>
      <circle cx="87" cy="92" r="1.5" fill="#FF85D0" opacity="0.6"/>
      {/* 촉수 발광 점 */}
      <circle cx="34" cy="76" r="1" fill="#FFD4F0" opacity="0.8"/>
      <circle cx="42" cy="80" r="1" fill="#FFD4F0" opacity="0.8"/>
      <circle cx="52" cy="84" r="1.2" fill="#FFD4F0" opacity="0.9"/>
      <circle cx="68" cy="84" r="1.2" fill="#FFD4F0" opacity="0.9"/>
      <circle cx="78" cy="80" r="1" fill="#FFD4F0" opacity="0.8"/>
      <circle cx="86" cy="76" r="1" fill="#FFD4F0" opacity="0.8"/>
    </g>
  </svg>
);

/* ======================================================================
   3. SeaTurtleSVG (바다거북)
   ====================================================================== */
const SeaTurtleSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="st-shell" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#66BB6A"/>
        <stop offset="100%" stopColor="#2E7D32"/>
      </linearGradient>
      <linearGradient id="st-skin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#81C784"/>
        <stop offset="100%" stopColor="#4CAF50"/>
      </linearGradient>
      <radialGradient id="st-shellcenter" cx="50%" cy="45%" r="50%">
        <stop offset="0%" stopColor="#81C784"/>
        <stop offset="100%" stopColor="#388E3C"/>
      </radialGradient>
    </defs>
    <g>
      {/* 뒤쪽 지느러미 (flipper) 왼쪽 */}
      <path d="M42 78 Q34 90 30 96 Q28 94 32 84 Q36 76 42 74Z" fill="url(#st-skin)" opacity="0.85"/>
      {/* 뒤쪽 지느러미 오른쪽 */}
      <path d="M78 78 Q86 90 90 96 Q92 94 88 84 Q84 76 78 74Z" fill="url(#st-skin)" opacity="0.85"/>
      {/* 앞쪽 지느러미 왼쪽 */}
      <path d="M35 52 Q22 48 14 42 Q12 44 18 52 Q24 58 34 58Z" fill="url(#st-skin)"/>
      {/* 앞쪽 지느러미 오른쪽 */}
      <path d="M85 52 Q98 48 106 42 Q108 44 102 52 Q96 58 86 58Z" fill="url(#st-skin)"/>
      {/* 꼬리 */}
      <path d="M58 85 Q60 94 62 85Z" fill="#4CAF50"/>
      {/* 등딱지 외곽 */}
      <path d="M60 28 Q82 28 92 48 Q96 60 92 72 Q82 88 60 88 Q38 88 28 72 Q24 60 28 48 Q38 28 60 28Z" fill="url(#st-shell)"/>
      {/* 등딱지 하이라이트 */}
      <path d="M60 32 Q76 32 84 46 Q78 36 60 36 Q42 36 36 46 Q44 32 60 32Z" fill="#81C784" opacity="0.4"/>
      {/* hexagonal 갑각 패턴 - 중앙 */}
      <path d="M60 40 L70 46 L70 58 L60 64 L50 58 L50 46Z" fill="#388E3C" stroke="#2E7D32" strokeWidth="0.8" opacity="0.7"/>
      {/* hex 상단좌 */}
      <path d="M50 34 L58 38 L56 46 L48 46 L44 40Z" fill="#43A047" stroke="#2E7D32" strokeWidth="0.6" opacity="0.6"/>
      {/* hex 상단우 */}
      <path d="M70 34 L76 40 L72 46 L64 46 L62 38Z" fill="#43A047" stroke="#2E7D32" strokeWidth="0.6" opacity="0.6"/>
      {/* hex 좌 */}
      <path d="M38 44 L48 46 L50 58 L44 64 L34 58 L34 48Z" fill="#388E3C" stroke="#2E7D32" strokeWidth="0.6" opacity="0.6"/>
      {/* hex 우 */}
      <path d="M82 44 L86 48 L86 58 L76 64 L70 58 L72 46Z" fill="#388E3C" stroke="#2E7D32" strokeWidth="0.6" opacity="0.6"/>
      {/* hex 하단좌 */}
      <path d="M44 64 L50 58 L60 64 L58 74 L48 76 L38 68Z" fill="#43A047" stroke="#2E7D32" strokeWidth="0.6" opacity="0.6"/>
      {/* hex 하단우 */}
      <path d="M76 64 L82 68 L78 76 L68 74 L60 64 L70 58Z" fill="#43A047" stroke="#2E7D32" strokeWidth="0.6" opacity="0.6"/>
      {/* hex 최하단 */}
      <path d="M48 76 L58 74 L68 76 L66 84 L60 86 L54 84Z" fill="#388E3C" stroke="#2E7D32" strokeWidth="0.6" opacity="0.6"/>
      {/* 머리 */}
      <path d="M60 28 Q52 28 48 22 Q50 16 56 14 Q60 13 64 14 Q70 16 72 22 Q68 28 60 28Z" fill="url(#st-skin)"/>
      {/* 눈 왼 */}
      <ellipse cx="54" cy="20" rx="2.5" ry="3" fill="white"/>
      <circle cx="54.5" cy="20.5" r="1.5" fill="#1B5E20"/>
      <circle cx="53.8" cy="19.5" r="0.7" fill="white" opacity="0.9"/>
      {/* 눈 우 */}
      <ellipse cx="66" cy="20" rx="2.5" ry="3" fill="white"/>
      <circle cx="65.5" cy="20.5" r="1.5" fill="#1B5E20"/>
      <circle cx="66.2" cy="19.5" r="0.7" fill="white" opacity="0.9"/>
      {/* 따뜻한 미소 */}
      <path d="M56 23 Q60 26 64 23" stroke="#2E7D32" strokeWidth="0.8" fill="none"/>
      {/* 피부 질감 - 미세 점 */}
      <circle cx="18" cy="48" r="0.5" fill="#388E3C" opacity="0.4"/>
      <circle cx="22" cy="52" r="0.5" fill="#388E3C" opacity="0.4"/>
      <circle cx="102" cy="48" r="0.5" fill="#388E3C" opacity="0.4"/>
      <circle cx="98" cy="52" r="0.5" fill="#388E3C" opacity="0.4"/>
    </g>
  </svg>
);

/* ======================================================================
   4. DolphinSVG (돌고래)
   ====================================================================== */
const DolphinSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="dp-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#607D8B"/>
        <stop offset="100%" stopColor="#90A4AE"/>
      </linearGradient>
      <linearGradient id="dp-belly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CFD8DC"/>
        <stop offset="100%" stopColor="#ECEFF1"/>
      </linearGradient>
      <linearGradient id="dp-fin" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#607D8B"/>
        <stop offset="100%" stopColor="#78909C"/>
      </linearGradient>
    </defs>
    <g>
      {/* 몸통 */}
      <path d="M18 62 Q14 56 20 50 Q28 42 48 40 Q68 38 88 48 Q98 54 100 62 Q100 68 95 72 Q85 78 65 78 Q40 78 28 74 Q20 70 18 62Z" fill="url(#dp-body)"/>
      {/* 배 */}
      <path d="M26 66 Q30 72 50 74 Q70 76 88 68 Q90 64 85 62 Q72 68 50 68 Q32 68 26 66Z" fill="url(#dp-belly)" opacity="0.8"/>
      {/* 주둥이 */}
      <path d="M18 56 Q12 54 6 56 Q8 58 12 60 Q16 62 18 62Z" fill="#78909C"/>
      {/* 등 지느러미 */}
      <path d="M58 40 Q60 28 66 22 Q68 24 70 30 Q72 36 72 42Z" fill="url(#dp-fin)"/>
      {/* 꼬리 지느러미 */}
      <path d="M96 58 Q104 50 112 46 Q110 54 108 58 Q110 64 112 72 Q104 68 96 62Z" fill="url(#dp-fin)" opacity="0.85"/>
      {/* 가슴 지느러미 */}
      <path d="M38 66 Q32 74 28 80 Q26 78 30 70 Q34 64 38 62Z" fill="#78909C" opacity="0.75"/>
      {/* 눈 - 흰자 */}
      <ellipse cx="22" cy="55" rx="3.5" ry="4" fill="white"/>
      {/* 눈 - 홍채 */}
      <circle cx="22.5" cy="55.5" r="2.2" fill="#263238"/>
      {/* 눈 - 반사광 */}
      <circle cx="21.5" cy="54.2" r="1" fill="white" opacity="0.9"/>
      <circle cx="23.2" cy="56.2" r="0.5" fill="white" opacity="0.5"/>
      {/* 웃는 입 */}
      <path d="M14 60 Q18 64 24 62" stroke="#455A64" strokeWidth="0.8" fill="none"/>
      {/* 비늘 질감 */}
      <path d="M40 50 Q43 48 46 50" stroke="#546E7A" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M50 48 Q53 46 56 48" stroke="#546E7A" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M62 50 Q65 48 68 50" stroke="#546E7A" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M72 54 Q75 52 78 54" stroke="#546E7A" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M46 58 Q49 56 52 58" stroke="#546E7A" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M60 56 Q63 54 66 56" stroke="#546E7A" strokeWidth="0.4" opacity="0.3" fill="none"/>
      {/* 물방울 */}
      <circle cx="10" cy="48" r="2" fill="#B3E5FC" opacity="0.5"/>
      <circle cx="6" cy="44" r="1.5" fill="#B3E5FC" opacity="0.4"/>
      <circle cx="14" cy="44" r="1" fill="#B3E5FC" opacity="0.35"/>
      {/* 블로우홀 */}
      <ellipse cx="30" cy="44" rx="1.5" ry="0.8" fill="#546E7A" opacity="0.5"/>
    </g>
  </svg>
);

/* ======================================================================
   5. WhaleSharkSVG (고래상어)
   ====================================================================== */
const WhaleSharkSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ws-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#37474F"/>
        <stop offset="100%" stopColor="#546E7A"/>
      </linearGradient>
      <linearGradient id="ws-belly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0BEC5"/>
        <stop offset="100%" stopColor="#CFD8DC"/>
      </linearGradient>
      <linearGradient id="ws-fin" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#2C3E4A"/>
        <stop offset="100%" stopColor="#455A64"/>
      </linearGradient>
    </defs>
    <g>
      {/* 몸통 */}
      <path d="M10 60 Q8 50 14 44 Q28 34 55 36 Q80 38 98 48 Q108 54 110 62 Q108 70 98 76 Q80 84 55 82 Q28 80 14 72 Q8 66 10 60Z" fill="url(#ws-body)"/>
      {/* 배 */}
      <path d="M18 66 Q30 76 55 78 Q80 76 100 66 Q98 72 80 78 Q55 82 30 78 Q18 74 18 66Z" fill="url(#ws-belly)" opacity="0.6"/>
      {/* 넓은 머리 */}
      <path d="M10 55 Q6 52 4 56 Q2 60 4 64 Q6 68 10 65Z" fill="#455A64"/>
      {/* 입 */}
      <path d="M5 56 Q8 60 5 64" stroke="#263238" strokeWidth="1.5" fill="none"/>
      {/* 등 지느러미 */}
      <path d="M62 36 Q64 24 68 20 Q72 24 74 36Z" fill="url(#ws-fin)"/>
      {/* 꼬리 지느러미 */}
      <path d="M106 56 Q112 48 118 42 Q116 54 114 60 Q116 66 118 78 Q112 72 106 64Z" fill="url(#ws-fin)" opacity="0.85"/>
      {/* 가슴 지느러미 왼쪽 */}
      <path d="M30 68 Q24 78 20 84 Q18 82 22 74 Q28 66 30 64Z" fill="#455A64" opacity="0.7"/>
      {/* 흰 점무늬 패턴 */}
      <circle cx="24" cy="50" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="32" cy="46" r="1.8" fill="white" opacity="0.55"/>
      <circle cx="40" cy="50" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="48" cy="44" r="1.8" fill="white" opacity="0.55"/>
      <circle cx="56" cy="48" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="64" cy="44" r="1.8" fill="white" opacity="0.55"/>
      <circle cx="72" cy="48" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="80" cy="46" r="1.8" fill="white" opacity="0.55"/>
      <circle cx="88" cy="50" r="1.5" fill="white" opacity="0.6"/>
      <circle cx="28" cy="58" r="1.5" fill="white" opacity="0.5"/>
      <circle cx="36" cy="56" r="1.8" fill="white" opacity="0.5"/>
      <circle cx="46" cy="58" r="1.5" fill="white" opacity="0.5"/>
      <circle cx="56" cy="56" r="1.8" fill="white" opacity="0.5"/>
      <circle cx="66" cy="58" r="1.5" fill="white" opacity="0.5"/>
      <circle cx="76" cy="56" r="1.8" fill="white" opacity="0.5"/>
      <circle cx="86" cy="58" r="1.5" fill="white" opacity="0.5"/>
      <circle cx="96" cy="56" r="1.5" fill="white" opacity="0.5"/>
      <circle cx="32" cy="66" r="1.3" fill="white" opacity="0.45"/>
      <circle cx="44" cy="66" r="1.5" fill="white" opacity="0.45"/>
      <circle cx="56" cy="66" r="1.3" fill="white" opacity="0.45"/>
      <circle cx="68" cy="66" r="1.5" fill="white" opacity="0.45"/>
      <circle cx="80" cy="66" r="1.3" fill="white" opacity="0.45"/>
      <circle cx="92" cy="64" r="1.3" fill="white" opacity="0.45"/>
      {/* 아가미 슬릿 5개 */}
      <path d="M18 52 L20 56" stroke="#B0BEC5" strokeWidth="0.6" opacity="0.5"/>
      <path d="M20 52 L22 56" stroke="#B0BEC5" strokeWidth="0.6" opacity="0.5"/>
      <path d="M22 52 L24 56" stroke="#B0BEC5" strokeWidth="0.6" opacity="0.5"/>
      <path d="M24 52 L26 56" stroke="#B0BEC5" strokeWidth="0.6" opacity="0.5"/>
      <path d="M26 52 L28 56" stroke="#B0BEC5" strokeWidth="0.6" opacity="0.5"/>
      {/* 눈 */}
      <ellipse cx="14" cy="55" rx="2.5" ry="3" fill="white"/>
      <circle cx="14.5" cy="55.5" r="1.8" fill="#263238"/>
      <circle cx="13.5" cy="54.5" r="0.8" fill="white" opacity="0.9"/>
      {/* 능선 라인 */}
      <path d="M20 42 Q50 38 90 46" stroke="#2C3E4A" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M20 72 Q50 78 90 72" stroke="#2C3E4A" strokeWidth="0.5" opacity="0.3" fill="none"/>
    </g>
  </svg>
);

/* ======================================================================
   6. OctopusSVG (문어)
   ====================================================================== */
const OctopusSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="oc-head" cx="50%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#EF5350"/>
        <stop offset="100%" stopColor="#C62828"/>
      </radialGradient>
      <linearGradient id="oc-arm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#E53935"/>
        <stop offset="100%" stopColor="#B71C1C"/>
      </linearGradient>
      <radialGradient id="oc-sucker" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFCDD2"/>
        <stop offset="100%" stopColor="#EF9A9A"/>
      </radialGradient>
    </defs>
    <g>
      {/* 다리 8개 (뒤에서 앞으로) */}
      {/* 다리 1 - 왼쪽 외부 */}
      <path d="M35 62 Q26 72 22 82 Q20 90 24 96 Q28 100 30 96 Q28 88 32 78 Q36 68 38 64" fill="url(#oc-arm)" opacity="0.9"/>
      <circle cx="24" cy="82" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="22" cy="88" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="25" cy="94" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 다리 2 */}
      <path d="M40 66 Q34 78 30 90 Q28 98 32 104 Q36 106 38 102 Q36 94 38 84 Q42 74 44 68" fill="url(#oc-arm)" opacity="0.92"/>
      <circle cx="32" cy="86" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="30" cy="94" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="33" cy="100" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 다리 3 */}
      <path d="M48 68 Q44 82 42 94 Q40 102 44 108 Q48 110 50 106 Q48 98 48 88 Q50 78 52 70" fill="url(#oc-arm)" opacity="0.94"/>
      <circle cx="43" cy="90" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="42" cy="98" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="45" cy="105" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 다리 4 - 중앙왼 */}
      <path d="M55 70 Q52 84 50 96 Q48 106 52 112 Q56 114 58 110 Q56 102 56 92 Q56 82 58 72" fill="url(#oc-arm)" opacity="0.96"/>
      <circle cx="52" cy="92" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="50" cy="100" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="53" cy="108" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 다리 5 - 중앙우 */}
      <path d="M65 70 Q68 84 70 96 Q72 106 68 112 Q64 114 62 110 Q64 102 64 92 Q64 82 62 72" fill="url(#oc-arm)" opacity="0.96"/>
      <circle cx="68" cy="92" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="70" cy="100" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="67" cy="108" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 다리 6 */}
      <path d="M72 68 Q76 82 78 94 Q80 102 76 108 Q72 110 70 106 Q72 98 72 88 Q70 78 68 70" fill="url(#oc-arm)" opacity="0.94"/>
      <circle cx="77" cy="90" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="78" cy="98" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="75" cy="105" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 다리 7 */}
      <path d="M80 66 Q86 78 90 90 Q92 98 88 104 Q84 106 82 102 Q84 94 82 84 Q78 74 76 68" fill="url(#oc-arm)" opacity="0.92"/>
      <circle cx="88" cy="86" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="90" cy="94" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="87" cy="100" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 다리 8 - 오른쪽 외부 */}
      <path d="M85 62 Q94 72 98 82 Q100 90 96 96 Q92 100 90 96 Q92 88 88 78 Q84 68 82 64" fill="url(#oc-arm)" opacity="0.9"/>
      <circle cx="96" cy="82" r="1.8" fill="url(#oc-sucker)" opacity="0.7"/>
      <circle cx="98" cy="88" r="1.6" fill="url(#oc-sucker)" opacity="0.6"/>
      <circle cx="95" cy="94" r="1.4" fill="url(#oc-sucker)" opacity="0.5"/>
      {/* 머리 */}
      <path d="M60 18 Q40 18 34 34 Q30 46 32 58 Q34 66 44 70 Q52 72 60 72 Q68 72 76 70 Q86 66 88 58 Q90 46 86 34 Q80 18 60 18Z" fill="url(#oc-head)"/>
      {/* 머리 하이라이트 */}
      <path d="M50 24 Q56 20 62 22 Q58 26 50 28Z" fill="#EF9A9A" opacity="0.35"/>
      {/* 피부 질감 - 작은 점 */}
      <circle cx="48" cy="34" r="0.8" fill="#B71C1C" opacity="0.3"/>
      <circle cx="72" cy="34" r="0.8" fill="#B71C1C" opacity="0.3"/>
      <circle cx="55" cy="28" r="0.7" fill="#B71C1C" opacity="0.25"/>
      <circle cx="65" cy="30" r="0.7" fill="#B71C1C" opacity="0.25"/>
      <circle cx="44" cy="50" r="0.8" fill="#B71C1C" opacity="0.3"/>
      <circle cx="76" cy="50" r="0.8" fill="#B71C1C" opacity="0.3"/>
      {/* 왼쪽 눈 - 흰자 */}
      <ellipse cx="48" cy="44" rx="7" ry="8" fill="white"/>
      {/* 왼쪽 눈 - 수평 동공 */}
      <ellipse cx="49" cy="45" rx="4.5" ry="2.5" fill="#1A1A1A"/>
      {/* 왼쪽 눈 - 반사광 */}
      <circle cx="46" cy="42" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="50" cy="46" r="0.8" fill="white" opacity="0.5"/>
      {/* 오른쪽 눈 */}
      <ellipse cx="72" cy="44" rx="7" ry="8" fill="white"/>
      <ellipse cx="71" cy="45" rx="4.5" ry="2.5" fill="#1A1A1A"/>
      <circle cx="74" cy="42" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="70" cy="46" r="0.8" fill="white" opacity="0.5"/>
    </g>
  </svg>
);

/* ======================================================================
   7. PufferfishSVG (복어)
   ====================================================================== */
const PufferfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="pf-body" cx="45%" cy="42%" r="55%">
        <stop offset="0%" stopColor="#FFF176"/>
        <stop offset="50%" stopColor="#FFD93D"/>
        <stop offset="100%" stopColor="#FFC107"/>
      </radialGradient>
      <radialGradient id="pf-belly" cx="50%" cy="30%" r="50%">
        <stop offset="0%" stopColor="#FFFDE7"/>
        <stop offset="100%" stopColor="#FFF9C4"/>
      </radialGradient>
      <linearGradient id="pf-fin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFB300" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#FFC107" stopOpacity="0.4"/>
      </linearGradient>
    </defs>
    <g>
      {/* 꼬리 지느러미 */}
      <path d="M88 54 Q96 48 100 44 Q98 54 96 60 Q98 66 100 76 Q96 72 88 66Z" fill="url(#pf-fin)" opacity="0.7"/>
      <path d="M89 56 Q95 50 99 46" stroke="#FF8F00" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M89 60 Q95 60 97 60" stroke="#FF8F00" strokeWidth="0.4" opacity="0.3" fill="none"/>
      <path d="M89 64 Q95 70 99 74" stroke="#FF8F00" strokeWidth="0.4" opacity="0.3" fill="none"/>
      {/* 몸통 */}
      <circle cx="58" cy="60" r="32" fill="url(#pf-body)"/>
      {/* 배 */}
      <ellipse cx="55" cy="66" rx="22" ry="16" fill="url(#pf-belly)" opacity="0.5"/>
      {/* 가시들 */}
      <path d="M42 32 L40 26 L44 30Z" fill="#FFA000" opacity="0.7"/>
      <path d="M52 28 L52 22 L55 27Z" fill="#FFA000" opacity="0.7"/>
      <path d="M62 28 L64 22 L66 27Z" fill="#FFA000" opacity="0.7"/>
      <path d="M74 32 L78 26 L76 31Z" fill="#FFA000" opacity="0.7"/>
      <path d="M82 40 L88 36 L84 41Z" fill="#FFA000" opacity="0.7"/>
      <path d="M86 52 L92 50 L87 54Z" fill="#FFA000" opacity="0.7"/>
      <path d="M86 68 L92 70 L87 66Z" fill="#FFA000" opacity="0.7"/>
      <path d="M82 78 L88 82 L83 79Z" fill="#FFA000" opacity="0.7"/>
      <path d="M72 86 L74 92 L70 87Z" fill="#FFA000" opacity="0.7"/>
      <path d="M58 88 L58 94 L56 88Z" fill="#FFA000" opacity="0.7"/>
      <path d="M44 86 L42 92 L46 87Z" fill="#FFA000" opacity="0.7"/>
      <path d="M34 78 L28 82 L33 77Z" fill="#FFA000" opacity="0.7"/>
      <path d="M28 68 L22 70 L29 66Z" fill="#FFA000" opacity="0.7"/>
      <path d="M28 50 L22 48 L29 52Z" fill="#FFA000" opacity="0.7"/>
      <path d="M34 40 L28 36 L35 41Z" fill="#FFA000" opacity="0.7"/>
      {/* 등 지느러미 */}
      <path d="M52 30 Q56 24 60 28 Q58 32 54 32Z" fill="url(#pf-fin)" opacity="0.6"/>
      {/* 가슴 지느러미 왼쪽 */}
      <path d="M34 58 Q28 56 24 60 Q28 64 34 62Z" fill="url(#pf-fin)" opacity="0.6"/>
      {/* 반점 */}
      <circle cx="46" cy="52" r="2.5" fill="#FFA726" opacity="0.35"/>
      <circle cx="68" cy="50" r="2.2" fill="#FFA726" opacity="0.3"/>
      <circle cx="56" cy="44" r="2" fill="#FFA726" opacity="0.3"/>
      <circle cx="72" cy="62" r="2.5" fill="#FFA726" opacity="0.35"/>
      <circle cx="48" cy="70" r="2.2" fill="#FFA726" opacity="0.3"/>
      <circle cx="64" cy="72" r="2" fill="#FFA726" opacity="0.3"/>
      {/* 왼쪽 눈 */}
      <ellipse cx="46" cy="54" rx="5.5" ry="6" fill="white"/>
      <circle cx="47" cy="55" r="3.5" fill="#1A1A1A"/>
      <circle cx="45" cy="53" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="48" cy="56" r="0.7" fill="white" opacity="0.5"/>
      {/* 오른쪽 눈 */}
      <ellipse cx="68" cy="54" rx="5.5" ry="6" fill="white"/>
      <circle cx="67" cy="55" r="3.5" fill="#1A1A1A"/>
      <circle cx="69" cy="53" r="1.5" fill="white" opacity="0.9"/>
      <circle cx="66" cy="56" r="0.7" fill="white" opacity="0.5"/>
      {/* 볼 홍조 */}
      <ellipse cx="40" cy="62" rx="4" ry="2.5" fill="#FF8A80" opacity="0.3"/>
      <ellipse cx="74" cy="62" rx="4" ry="2.5" fill="#FF8A80" opacity="0.3"/>
      {/* O형 입 */}
      <ellipse cx="57" cy="68" rx="3.5" ry="3" fill="#FF8F00" opacity="0.7"/>
      <ellipse cx="57" cy="68" rx="2" ry="1.8" fill="#E65100" opacity="0.5"/>
    </g>
  </svg>
);

/* ======================================================================
   8. SeahorseSVG (해마)
   ====================================================================== */
const SeahorseSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sh-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFB74D"/>
        <stop offset="100%" stopColor="#F57C00"/>
      </linearGradient>
      <linearGradient id="sh-fin" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFB74D" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#FFE0B2" stopOpacity="0.3"/>
      </linearGradient>
      <linearGradient id="sh-belly" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#FFE0B2"/>
        <stop offset="100%" stopColor="#FFD54F" stopOpacity="0.5"/>
      </linearGradient>
    </defs>
    <g>
      {/* S자 몸통 */}
      <path d="M58 32 Q68 32 72 42 Q76 54 68 62 Q60 70 56 78 Q52 86 54 94 Q56 98 60 100 Q58 102 54 100 Q48 96 48 88 Q48 78 56 70 Q64 62 68 54 Q72 46 66 38 Q60 32 54 34 Q50 36 50 40 Z" fill="url(#sh-body)" stroke="#E65100" strokeWidth="0.5"/>
      {/* 배 쪽 밝은 영역 */}
      <path d="M56 38 Q58 36 62 38 Q66 44 66 52 Q64 58 60 64 Q56 70 54 78 Q52 84 54 92 Q52 90 50 84 Q50 76 54 68 Q58 60 62 52 Q64 44 60 38Z" fill="url(#sh-belly)" opacity="0.5"/>
      {/* 몸통 가로 링 패턴 */}
      <path d="M54 40 Q60 38 66 40" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M56 46 Q62 44 70 46" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M60 52 Q66 50 72 52" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M60 58 Q66 56 70 58" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M56 64 Q62 62 66 64" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M54 70 Q58 68 62 70" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M52 76 Q56 74 60 76" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M50 82 Q54 80 58 82" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M50 88 Q54 86 58 88" stroke="#E65100" strokeWidth="0.5" opacity="0.4" fill="none"/>
      {/* 머리 */}
      <path d="M50 34 Q46 28 42 22 Q38 18 34 18 Q32 20 34 24 Q38 28 44 32 Q48 34 50 36Z" fill="url(#sh-body)"/>
      {/* 주둥이 */}
      <path d="M34 18 Q28 16 24 18 Q22 20 24 22 Q28 22 34 20Z" fill="#EF6C00"/>
      {/* 왕관 */}
      <path d="M52 30 Q54 24 58 22 Q60 24 62 22 Q64 24 66 22 Q68 26 66 32" stroke="#F57C00" strokeWidth="1" fill="#FFB74D" opacity="0.7"/>
      {/* 등 지느러미 (물결형 갈기) */}
      <path d="M68 42 Q74 40 78 44 Q80 48 76 50 Q72 48 68 50 Q74 52 78 56 Q76 60 72 58 Q68 56 66 58" fill="url(#sh-fin)" opacity="0.6"/>
      {/* 등지느러미 ray */}
      <path d="M70 42 Q76 42 78 44" stroke="#F57C00" strokeWidth="0.3" opacity="0.4" fill="none"/>
      <path d="M70 48 Q76 48 78 50" stroke="#F57C00" strokeWidth="0.3" opacity="0.4" fill="none"/>
      <path d="M68 54 Q74 54 76 56" stroke="#F57C00" strokeWidth="0.3" opacity="0.4" fill="none"/>
      {/* 가슴 지느러미 */}
      <path d="M62 44 Q66 42 70 44 Q68 48 64 48Z" fill="url(#sh-fin)" opacity="0.5"/>
      {/* 꼬리 소용돌이 */}
      <path d="M54 94 Q58 96 62 94 Q66 90 64 86 Q62 84 58 86 Q56 88 58 92Z" fill="#F57C00" opacity="0.8"/>
      {/* 눈 */}
      <ellipse cx="42" cy="24" rx="3.5" ry="3.5" fill="white"/>
      <circle cx="42.5" cy="24.5" r="2.2" fill="#1A1A1A"/>
      <circle cx="41" cy="23" r="1" fill="white" opacity="0.9"/>
      <circle cx="43.5" cy="25.5" r="0.5" fill="white" opacity="0.5"/>
      {/* 미세 질감 */}
      <circle cx="62" cy="42" r="0.6" fill="#E65100" opacity="0.3"/>
      <circle cx="66" cy="50" r="0.6" fill="#E65100" opacity="0.3"/>
      <circle cx="62" cy="58" r="0.6" fill="#E65100" opacity="0.3"/>
      <circle cx="56" cy="74" r="0.6" fill="#E65100" opacity="0.3"/>
    </g>
  </svg>
);

/* ======================================================================
   9. StarfishSVG (불가사리)
   ====================================================================== */
const StarfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="sf-center" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FF8A65"/>
        <stop offset="100%" stopColor="#FF5722"/>
      </radialGradient>
      <linearGradient id="sf-arm1" x1="0.5" y1="1" x2="0.5" y2="0">
        <stop offset="0%" stopColor="#FF7043"/>
        <stop offset="100%" stopColor="#FF5722"/>
      </linearGradient>
      <linearGradient id="sf-arm2" x1="0" y1="0.5" x2="1" y2="0.5">
        <stop offset="0%" stopColor="#FF8A65"/>
        <stop offset="100%" stopColor="#E64A19"/>
      </linearGradient>
    </defs>
    <g>
      {/* 5개 팔 - 부드러운 둥근 별 */}
      {/* 팔 1 - 상단 */}
      <path d="M60 15 Q64 28 68 38 Q72 42 60 48 Q48 42 52 38 Q56 28 60 15Z" fill="url(#sf-arm1)"/>
      {/* 팔 2 - 우상 */}
      <path d="M95 42 Q84 48 76 52 Q74 56 68 48 Q66 36 72 38 Q82 40 95 42Z" fill="url(#sf-arm2)"/>
      {/* 팔 3 - 우하 */}
      <path d="M85 88 Q76 80 70 74 Q68 70 72 62 Q80 58 78 64 Q80 74 85 88Z" fill="url(#sf-arm1)"/>
      {/* 팔 4 - 좌하 */}
      <path d="M35 88 Q44 80 50 74 Q52 70 48 62 Q40 58 42 64 Q40 74 35 88Z" fill="url(#sf-arm1)"/>
      {/* 팔 5 - 좌상 */}
      <path d="M25 42 Q36 48 44 52 Q46 56 52 48 Q54 36 48 38 Q38 40 25 42Z" fill="url(#sf-arm2)"/>
      {/* 중앙 */}
      <circle cx="60" cy="56" r="14" fill="url(#sf-center)"/>
      {/* 팔 하이라이트 */}
      <path d="M59 20 Q61 30 62 38" stroke="#FFAB91" strokeWidth="1.5" opacity="0.4" fill="none"/>
      <path d="M90 44 Q82 46 74 50" stroke="#FFAB91" strokeWidth="1.5" opacity="0.4" fill="none"/>
      <path d="M82 84 Q76 78 72 70" stroke="#FFAB91" strokeWidth="1.5" opacity="0.4" fill="none"/>
      <path d="M38 84 Q44 78 48 70" stroke="#FFAB91" strokeWidth="1.5" opacity="0.4" fill="none"/>
      <path d="M30 44 Q38 46 46 50" stroke="#FFAB91" strokeWidth="1.5" opacity="0.4" fill="none"/>
      {/* 표면 돌기(bump) 패턴 */}
      <circle cx="60" cy="26" r="1.5" fill="#E64A19" opacity="0.5"/>
      <circle cx="60" cy="34" r="1.2" fill="#E64A19" opacity="0.4"/>
      <circle cx="82" cy="44" r="1.5" fill="#E64A19" opacity="0.5"/>
      <circle cx="76" cy="48" r="1.2" fill="#E64A19" opacity="0.4"/>
      <circle cx="78" cy="76" r="1.5" fill="#E64A19" opacity="0.5"/>
      <circle cx="74" cy="68" r="1.2" fill="#E64A19" opacity="0.4"/>
      <circle cx="42" cy="76" r="1.5" fill="#E64A19" opacity="0.5"/>
      <circle cx="46" cy="68" r="1.2" fill="#E64A19" opacity="0.4"/>
      <circle cx="38" cy="44" r="1.5" fill="#E64A19" opacity="0.5"/>
      <circle cx="44" cy="48" r="1.2" fill="#E64A19" opacity="0.4"/>
      {/* 중앙 돌기 */}
      <circle cx="56" cy="52" r="1.3" fill="#BF360C" opacity="0.4"/>
      <circle cx="64" cy="52" r="1.3" fill="#BF360C" opacity="0.4"/>
      <circle cx="60" cy="60" r="1.3" fill="#BF360C" opacity="0.4"/>
      <circle cx="54" cy="58" r="1" fill="#BF360C" opacity="0.35"/>
      <circle cx="66" cy="58" r="1" fill="#BF360C" opacity="0.35"/>
      {/* 중앙 하이라이트 */}
      <circle cx="57" cy="52" r="5" fill="#FFAB91" opacity="0.2"/>
    </g>
  </svg>
);

/* ======================================================================
   10. MantaRaySVG (쥐가오리)
   ====================================================================== */
const MantaRaySVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mr-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#546E7A"/>
        <stop offset="100%" stopColor="#78909C"/>
      </linearGradient>
      <linearGradient id="mr-belly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#CFD8DC"/>
        <stop offset="100%" stopColor="#ECEFF1"/>
      </linearGradient>
      <linearGradient id="mr-wing" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#455A64"/>
        <stop offset="100%" stopColor="#78909C"/>
      </linearGradient>
    </defs>
    <g>
      {/* 꼬리 */}
      <path d="M60 78 Q60 90 58 108" stroke="#546E7A" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M60 78 Q60 90 62 100" stroke="#78909C" strokeWidth="1" fill="none" opacity="0.3"/>
      {/* 날개 + 몸통 */}
      <path d="M60 38 Q40 32 18 42 Q8 48 6 56 Q8 62 18 58 Q30 52 44 54 Q52 56 60 60 Q68 56 76 54 Q90 52 102 58 Q112 62 114 56 Q112 48 102 42 Q80 32 60 38Z" fill="url(#mr-wing)"/>
      {/* 몸통 중앙 */}
      <path d="M46 44 Q52 38 60 38 Q68 38 74 44 Q78 52 76 62 Q72 72 60 78 Q48 72 44 62 Q42 52 46 44Z" fill="url(#mr-body)"/>
      {/* 배 */}
      <path d="M50 50 Q56 46 60 46 Q64 46 70 50 Q72 56 70 64 Q66 70 60 72 Q54 70 50 64 Q48 56 50 50Z" fill="url(#mr-belly)" opacity="0.6"/>
      {/* 머리 뿔 (cephalic fin) 왼쪽 */}
      <path d="M50 44 Q46 36 42 30 Q40 28 38 30 Q40 36 44 42 Q48 46 50 48Z" fill="#455A64"/>
      {/* 머리 뿔 오른쪽 */}
      <path d="M70 44 Q74 36 78 30 Q80 28 82 30 Q80 36 76 42 Q72 46 70 48Z" fill="#455A64"/>
      {/* 아가미 슬릿 5개 */}
      <path d="M52 58 L52 64" stroke="#90A4AE" strokeWidth="0.6" opacity="0.5"/>
      <path d="M54 58 L54 65" stroke="#90A4AE" strokeWidth="0.6" opacity="0.5"/>
      <path d="M56 58 L56 66" stroke="#90A4AE" strokeWidth="0.6" opacity="0.5"/>
      <path d="M58 58 L58 66" stroke="#90A4AE" strokeWidth="0.6" opacity="0.5"/>
      <path d="M60 58 L60 66" stroke="#90A4AE" strokeWidth="0.6" opacity="0.5"/>
      {/* 날개 패턴 */}
      <path d="M22 48 Q35 46 48 50" stroke="#37474F" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M98 48 Q85 46 72 50" stroke="#37474F" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M14 54 Q30 50 44 54" stroke="#37474F" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M106 54 Q90 50 76 54" stroke="#37474F" strokeWidth="0.5" opacity="0.3" fill="none"/>
      {/* 눈 왼 */}
      <ellipse cx="48" cy="46" rx="3" ry="3.5" fill="white"/>
      <circle cx="48.5" cy="46.5" r="2" fill="#263238"/>
      <circle cx="47.5" cy="45.2" r="0.8" fill="white" opacity="0.9"/>
      {/* 눈 우 */}
      <ellipse cx="72" cy="46" rx="3" ry="3.5" fill="white"/>
      <circle cx="71.5" cy="46.5" r="2" fill="#263238"/>
      <circle cx="72.5" cy="45.2" r="0.8" fill="white" opacity="0.9"/>
      {/* 무늬 */}
      <ellipse cx="60" cy="52" rx="6" ry="3" fill="white" opacity="0.15"/>
    </g>
  </svg>
);

/* ======================================================================
   11. GiantSquidSVG (대왕오징어)
   ====================================================================== */
const GiantSquidSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="gs-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#A1887F"/>
        <stop offset="100%" stopColor="#8D6E63"/>
      </linearGradient>
      <linearGradient id="gs-arm" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8D6E63"/>
        <stop offset="100%" stopColor="#6D4C41"/>
      </linearGradient>
      <linearGradient id="gs-fin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A1887F" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#BCAAA4" stopOpacity="0.4"/>
      </linearGradient>
      <radialGradient id="gs-sucker" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#D7CCC8"/>
        <stop offset="100%" stopColor="#A1887F"/>
      </radialGradient>
    </defs>
    <g>
      {/* 몸통 (torpedo) */}
      <path d="M60 8 Q50 8 46 16 Q42 26 42 40 Q42 55 46 62 Q50 68 60 68 Q70 68 74 62 Q78 55 78 40 Q78 26 74 16 Q70 8 60 8Z" fill="url(#gs-body)"/>
      {/* 몸통 하이라이트 */}
      <path d="M54 12 Q58 10 62 12 Q60 18 56 20 Q52 18 54 12Z" fill="#BCAAA4" opacity="0.3"/>
      {/* 지느러미 (몸통 뒤쪽) */}
      <path d="M46 14 Q36 10 30 8 Q34 16 40 20 Q44 18 46 14Z" fill="url(#gs-fin)" opacity="0.6"/>
      <path d="M74 14 Q84 10 90 8 Q86 16 80 20 Q76 18 74 14Z" fill="url(#gs-fin)" opacity="0.6"/>
      {/* 지느러미 ray */}
      <path d="M44 16 Q38 12 32 10" stroke="#6D4C41" strokeWidth="0.3" opacity="0.3" fill="none"/>
      <path d="M76 16 Q82 12 88 10" stroke="#6D4C41" strokeWidth="0.3" opacity="0.3" fill="none"/>
      {/* 질감 */}
      <circle cx="52" cy="30" r="0.8" fill="#6D4C41" opacity="0.25"/>
      <circle cx="68" cy="30" r="0.8" fill="#6D4C41" opacity="0.25"/>
      <circle cx="55" cy="42" r="0.8" fill="#6D4C41" opacity="0.25"/>
      <circle cx="65" cy="42" r="0.8" fill="#6D4C41" opacity="0.25"/>
      <circle cx="58" cy="54" r="0.8" fill="#6D4C41" opacity="0.25"/>
      {/* 큰 눈 왼 */}
      <ellipse cx="50" cy="40" rx="6" ry="8" fill="white"/>
      <circle cx="51" cy="41" r="4.5" fill="#3E2723"/>
      <circle cx="51" cy="40" r="2.5" fill="#1A1A1A"/>
      <circle cx="49" cy="38" r="1.8" fill="white" opacity="0.9"/>
      <circle cx="52.5" cy="42.5" r="0.8" fill="white" opacity="0.5"/>
      {/* 큰 눈 우 */}
      <ellipse cx="70" cy="40" rx="6" ry="8" fill="white"/>
      <circle cx="69" cy="41" r="4.5" fill="#3E2723"/>
      <circle cx="69" cy="40" r="2.5" fill="#1A1A1A"/>
      <circle cx="71" cy="38" r="1.8" fill="white" opacity="0.9"/>
      <circle cx="67.5" cy="42.5" r="0.8" fill="white" opacity="0.5"/>
      {/* 긴 촉수 2개 */}
      <path d="M52 68 Q48 80 44 92 Q42 100 44 106 Q46 110 48 108 Q47 102 48 96 Q50 86 54 76" fill="url(#gs-arm)" opacity="0.85"/>
      {/* 촉수 끝 클럽 */}
      <ellipse cx="45" cy="106" rx="3" ry="4" fill="#8D6E63"/>
      <circle cx="44" cy="104" r="1" fill="url(#gs-sucker)" opacity="0.7"/>
      <circle cx="46" cy="106" r="1" fill="url(#gs-sucker)" opacity="0.7"/>
      <circle cx="44" cy="108" r="1" fill="url(#gs-sucker)" opacity="0.7"/>
      <path d="M68 68 Q72 80 76 92 Q78 100 76 106 Q74 110 72 108 Q73 102 72 96 Q70 86 66 76" fill="url(#gs-arm)" opacity="0.85"/>
      <ellipse cx="75" cy="106" rx="3" ry="4" fill="#8D6E63"/>
      <circle cx="76" cy="104" r="1" fill="url(#gs-sucker)" opacity="0.7"/>
      <circle cx="74" cy="106" r="1" fill="url(#gs-sucker)" opacity="0.7"/>
      <circle cx="76" cy="108" r="1" fill="url(#gs-sucker)" opacity="0.7"/>
      {/* 팔 8개 */}
      <path d="M48 66 Q42 74 38 82 Q36 86 38 88" stroke="url(#gs-arm)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M50 67 Q46 76 42 84 Q40 88 42 92" stroke="url(#gs-arm)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M54 68 Q52 78 50 88 Q48 92 50 96" stroke="url(#gs-arm)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M58 68 Q58 80 56 90 Q54 94 56 98" stroke="url(#gs-arm)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M62 68 Q62 80 64 90 Q66 94 64 98" stroke="url(#gs-arm)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M66 68 Q68 78 70 88 Q72 92 70 96" stroke="url(#gs-arm)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M70 67 Q74 76 78 84 Q80 88 78 92" stroke="url(#gs-arm)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M72 66 Q78 74 82 82 Q84 86 82 88" stroke="url(#gs-arm)" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* 빨판 (팔 위) */}
      <circle cx="42" cy="78" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
      <circle cx="46" cy="80" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
      <circle cx="52" cy="82" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
      <circle cx="58" cy="84" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
      <circle cx="62" cy="84" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
      <circle cx="68" cy="82" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
      <circle cx="74" cy="80" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
      <circle cx="78" cy="78" r="1" fill="url(#gs-sucker)" opacity="0.6"/>
    </g>
  </svg>
);

/* ======================================================================
   12. AnglerfishSVG (초롱아귀)
   ====================================================================== */
const AnglerfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="af-body" cx="45%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#4527A0"/>
        <stop offset="100%" stopColor="#311B92"/>
      </radialGradient>
      <radialGradient id="af-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFD700" stopOpacity="1"/>
        <stop offset="40%" stopColor="#FFD700" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#FFD700" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="af-fin" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4527A0" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#5E35B1" stopOpacity="0.4"/>
      </linearGradient>
    </defs>
    <g>
      {/* 발광 루어 - glow 효과 (뒤에) */}
      <circle cx="42" cy="18" r="12" fill="url(#af-glow)" opacity="0.3"/>
      <circle cx="42" cy="18" r="8" fill="url(#af-glow)" opacity="0.5"/>
      {/* 낚시대 */}
      <path d="M50 48 Q46 36 42 24" stroke="#5E35B1" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* 발광 루어 */}
      <circle cx="42" cy="20" r="4" fill="#FFD700"/>
      <circle cx="42" cy="20" r="2" fill="#FFEE58"/>
      <circle cx="41" cy="19" r="1" fill="white" opacity="0.8"/>
      {/* 몸통 */}
      <path d="M30 58 Q28 44 36 38 Q46 32 60 34 Q76 36 86 46 Q92 54 90 66 Q88 76 78 82 Q66 88 52 86 Q38 84 30 74 Q26 68 30 58Z" fill="url(#af-body)"/>
      {/* 몸통 하이라이트 */}
      <path d="M48 40 Q56 36 64 38 Q58 42 50 44Z" fill="#5E35B1" opacity="0.3"/>
      {/* 큰 입 */}
      <path d="M30 58 Q24 58 20 62 Q18 66 20 70 Q24 74 30 74 Q32 68 30 62Z" fill="#1A0A4A"/>
      {/* 입 안 */}
      <path d="M22 62 Q24 66 22 70" fill="#0D0533" opacity="0.8"/>
      {/* 이빨 - 작고 귀여운 삼각형 */}
      <path d="M24 60 L25 64 L26 60Z" fill="white" opacity="0.9"/>
      <path d="M28 59 L29 63 L30 59Z" fill="white" opacity="0.9"/>
      <path d="M24 72 L25 68 L26 72Z" fill="white" opacity="0.9"/>
      <path d="M28 73 L29 69 L30 73Z" fill="white" opacity="0.9"/>
      {/* 등 지느러미 */}
      <path d="M60 36 Q62 28 66 26 Q70 30 72 38 Q68 36 60 36Z" fill="url(#af-fin)" opacity="0.7"/>
      <path d="M62 36 Q64 30 66 28" stroke="#311B92" strokeWidth="0.3" opacity="0.3" fill="none"/>
      {/* 가슴 지느러미 */}
      <path d="M44 76 Q38 82 34 88 Q32 86 36 80 Q40 74 44 72Z" fill="url(#af-fin)" opacity="0.65"/>
      {/* 꼬리 지느러미 */}
      <path d="M86 58 Q94 52 100 48 Q98 58 96 64 Q98 70 100 78 Q94 74 86 68Z" fill="url(#af-fin)" opacity="0.7"/>
      <path d="M88 60 Q94 54 99 50" stroke="#311B92" strokeWidth="0.3" opacity="0.3" fill="none"/>
      <path d="M88 64 Q94 64 97 64" stroke="#311B92" strokeWidth="0.3" opacity="0.3" fill="none"/>
      <path d="M88 68 Q94 72 99 76" stroke="#311B92" strokeWidth="0.3" opacity="0.3" fill="none"/>
      {/* 배 지느러미 */}
      <path d="M64 82 Q66 90 68 92 Q72 88 70 82Z" fill="url(#af-fin)" opacity="0.6"/>
      {/* 질감 - 미세 점 */}
      <circle cx="50" cy="50" r="0.8" fill="#7C4DFF" opacity="0.3"/>
      <circle cx="66" cy="48" r="0.8" fill="#7C4DFF" opacity="0.3"/>
      <circle cx="72" cy="58" r="0.8" fill="#7C4DFF" opacity="0.3"/>
      <circle cx="58" cy="72" r="0.8" fill="#7C4DFF" opacity="0.3"/>
      <circle cx="76" cy="68" r="0.8" fill="#7C4DFF" opacity="0.3"/>
      <circle cx="46" cy="66" r="0.8" fill="#7C4DFF" opacity="0.3"/>
      {/* 눈 - 크고 귀엽게 */}
      <ellipse cx="42" cy="54" rx="7" ry="7.5" fill="white"/>
      <circle cx="43" cy="55" r="4.5" fill="#1A0A4A"/>
      <circle cx="43.5" cy="54.5" r="2.5" fill="#000000"/>
      <circle cx="41" cy="52.5" r="1.8" fill="white" opacity="0.9"/>
      <circle cx="44.5" cy="56.5" r="0.8" fill="white" opacity="0.5"/>
    </g>
  </svg>
);

/* ======================================================================
   13. DeepSeaJellyfishSVG (심해해파리)
   ====================================================================== */
const DeepSeaJellyfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="dsj-dome1" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#E1BEE7" stopOpacity="0.3"/>
        <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0.1"/>
      </radialGradient>
      <radialGradient id="dsj-dome2" cx="50%" cy="42%" r="50%">
        <stop offset="0%" stopColor="#CE93D8" stopOpacity="0.5"/>
        <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0.15"/>
      </radialGradient>
      <radialGradient id="dsj-dome3" cx="50%" cy="40%" r="45%">
        <stop offset="0%" stopColor="#B388FF" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0.3"/>
      </radialGradient>
      <radialGradient id="dsj-core" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#EDE7F6" stopOpacity="0.9"/>
        <stop offset="100%" stopColor="#B388FF" stopOpacity="0.4"/>
      </radialGradient>
      <radialGradient id="dsj-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#B388FF" stopOpacity="0.6"/>
        <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0"/>
      </radialGradient>
      <linearGradient id="dsj-tentacle" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B388FF" stopOpacity="0.7"/>
        <stop offset="100%" stopColor="#7C4DFF" stopOpacity="0.15"/>
      </linearGradient>
    </defs>
    <g>
      {/* 외부 발광 glow */}
      <ellipse cx="60" cy="38" rx="35" ry="26" fill="url(#dsj-glow)" opacity="0.3"/>
      {/* 돔 레이어 1 - 가장 외부 */}
      <path d="M22 48 Q22 18 60 14 Q98 18 98 48 Q88 54 60 54 Q32 54 22 48Z" fill="url(#dsj-dome1)"/>
      {/* 돔 레이어 2 */}
      <path d="M28 46 Q28 22 60 18 Q92 22 92 46 Q84 52 60 52 Q36 52 28 46Z" fill="url(#dsj-dome2)"/>
      {/* 돔 레이어 3 */}
      <path d="M34 44 Q34 26 60 22 Q86 26 86 44 Q80 50 60 50 Q40 50 34 44Z" fill="url(#dsj-dome3)"/>
      {/* 돔 레이어 4 - 핵심 */}
      <path d="M40 42 Q40 30 60 26 Q80 30 80 42 Q74 46 60 46 Q46 46 40 42Z" fill="url(#dsj-core)" opacity="0.8"/>
      {/* 돔 하이라이트 */}
      <path d="M46 34 Q50 28 58 26 Q52 30 48 38Z" fill="white" opacity="0.2"/>
      {/* 프릴 가장자리 */}
      <path d="M26 48 Q30 52 34 48 Q38 52 42 48 Q46 52 50 48 Q54 52 58 48 Q62 52 66 48 Q70 52 74 48 Q78 52 82 48 Q86 52 90 48 Q94 52 98 48" stroke="#B388FF" strokeWidth="1.5" fill="none" opacity="0.5"/>
      {/* 촉수 1 */}
      <path d="M34 52 Q30 64 32 74 Q28 82 30 90 Q26 96 28 102" stroke="url(#dsj-tentacle)" strokeWidth="1.5" fill="none"/>
      <circle cx="28" cy="102" r="2" fill="#D1C4E9" opacity="0.8"/>
      {/* 촉수 2 */}
      <path d="M42 53 Q38 66 40 78 Q36 88 38 100" stroke="url(#dsj-tentacle)" strokeWidth="1.8" fill="none"/>
      <circle cx="38" cy="100" r="2" fill="#D1C4E9" opacity="0.8"/>
      {/* 촉수 3 */}
      <path d="M50 54 Q48 70 46 82 Q44 92 46 106" stroke="#B388FF" strokeWidth="2" opacity="0.6" fill="none"/>
      <circle cx="46" cy="106" r="2.5" fill="#EDE7F6" opacity="0.9"/>
      {/* 촉수 4 - 중앙 */}
      <path d="M60 54 Q58 72 60 86 Q58 96 60 112" stroke="#B388FF" strokeWidth="2.5" opacity="0.65" fill="none"/>
      <circle cx="60" cy="112" r="2.5" fill="#EDE7F6" opacity="0.9"/>
      {/* 촉수 5 */}
      <path d="M70 54 Q72 70 74 82 Q76 92 74 106" stroke="#B388FF" strokeWidth="2" opacity="0.6" fill="none"/>
      <circle cx="74" cy="106" r="2.5" fill="#EDE7F6" opacity="0.9"/>
      {/* 촉수 6 */}
      <path d="M78 53 Q82 66 80 78 Q84 88 82 100" stroke="url(#dsj-tentacle)" strokeWidth="1.8" fill="none"/>
      <circle cx="82" cy="100" r="2" fill="#D1C4E9" opacity="0.8"/>
      {/* 촉수 7 */}
      <path d="M86 52 Q90 64 88 74 Q92 82 90 90 Q94 96 92 102" stroke="url(#dsj-tentacle)" strokeWidth="1.5" fill="none"/>
      <circle cx="92" cy="102" r="2" fill="#D1C4E9" opacity="0.8"/>
      {/* 발광 점 (촉수 위) */}
      <circle cx="32" cy="74" r="1.2" fill="#EDE7F6" opacity="0.9"/>
      <circle cx="40" cy="78" r="1.2" fill="#EDE7F6" opacity="0.9"/>
      <circle cx="48" cy="82" r="1.5" fill="#EDE7F6" opacity="0.95"/>
      <circle cx="60" cy="86" r="1.5" fill="#EDE7F6" opacity="0.95"/>
      <circle cx="72" cy="82" r="1.5" fill="#EDE7F6" opacity="0.95"/>
      <circle cx="80" cy="78" r="1.2" fill="#EDE7F6" opacity="0.9"/>
      <circle cx="88" cy="74" r="1.2" fill="#EDE7F6" opacity="0.9"/>
      {/* 추가 발광 점 */}
      <circle cx="30" cy="88" r="1" fill="#D1C4E9" opacity="0.7"/>
      <circle cx="46" cy="94" r="1" fill="#D1C4E9" opacity="0.7"/>
      <circle cx="60" cy="98" r="1.2" fill="#D1C4E9" opacity="0.8"/>
      <circle cx="74" cy="94" r="1" fill="#D1C4E9" opacity="0.7"/>
      <circle cx="90" cy="88" r="1" fill="#D1C4E9" opacity="0.7"/>
    </g>
  </svg>
);

/* ======================================================================
   14. HumpbackWhaleSVG (혹등고래)
   ====================================================================== */
const HumpbackWhaleSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hw-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#37474F"/>
        <stop offset="100%" stopColor="#546E7A"/>
      </linearGradient>
      <linearGradient id="hw-belly" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0BEC5"/>
        <stop offset="100%" stopColor="#CFD8DC"/>
      </linearGradient>
      <linearGradient id="hw-flipper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#455A64"/>
        <stop offset="100%" stopColor="#607D8B"/>
      </linearGradient>
      <linearGradient id="hw-fluke" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="#37474F"/>
        <stop offset="100%" stopColor="#455A64"/>
      </linearGradient>
    </defs>
    <g>
      {/* 가슴 지느러미 (매우 긴 - 혹등고래 특징) */}
      <path d="M34 66 Q28 72 20 80 Q14 88 10 94 Q8 92 12 84 Q18 74 26 66 Q30 62 34 62Z" fill="url(#hw-flipper)" opacity="0.85"/>
      {/* 지느러미 내부 라인 */}
      <path d="M32 66 Q24 76 16 86" stroke="#37474F" strokeWidth="0.4" opacity="0.3" fill="none"/>
      {/* 몸통 */}
      <path d="M8 58 Q6 50 12 44 Q22 36 42 34 Q65 32 85 38 Q100 44 108 54 Q112 60 108 66 Q100 76 85 80 Q65 84 42 82 Q22 80 12 72 Q6 66 8 58Z" fill="url(#hw-body)"/>
      {/* 배 */}
      <path d="M16 64 Q24 74 42 78 Q65 80 85 74 Q96 68 100 62 Q96 70 85 76 Q65 82 42 80 Q22 78 14 68Z" fill="url(#hw-belly)" opacity="0.5"/>
      {/* 배 세로 홈 패턴 */}
      <path d="M20 66 Q20 72 22 76" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M28 68 Q28 74 30 78" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M36 70 Q36 76 38 80" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M44 72 Q44 76 46 80" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M52 72 Q52 76 54 80" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M60 72 Q60 76 62 80" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M68 72 Q68 76 70 78" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      <path d="M76 70 Q76 74 78 76" stroke="#90A4AE" strokeWidth="0.5" opacity="0.3" fill="none"/>
      {/* 머리 */}
      <path d="M8 54 Q4 50 2 54 Q0 58 2 62 Q4 66 8 62Z" fill="#455A64"/>
      {/* 머리 혹(tubercle) */}
      <circle cx="8" cy="48" r="1.5" fill="#546E7A"/>
      <circle cx="12" cy="44" r="1.5" fill="#546E7A"/>
      <circle cx="16" cy="42" r="1.5" fill="#546E7A"/>
      <circle cx="6" cy="52" r="1.2" fill="#546E7A"/>
      <circle cx="10" cy="46" r="1.2" fill="#546E7A"/>
      <circle cx="14" cy="43" r="1" fill="#546E7A"/>
      <circle cx="20" cy="40" r="1.2" fill="#546E7A"/>
      {/* 등 지느러미 (작은 - 혹등고래 특징) */}
      <path d="M76 38 Q78 32 82 30 Q84 34 84 40Z" fill="#37474F"/>
      {/* 꼬리 (fluke) - 넓고 가운데 갈라진 */}
      <path d="M106 56 Q110 52 116 46 Q118 44 118 48 Q116 54 112 58 Q112 62 116 66 Q118 72 118 76 Q116 74 110 68 Q106 64 106 56Z" fill="url(#hw-fluke)"/>
      {/* 꼬리 가운데 갈라진 부분 */}
      <path d="M112 56 L112 64" stroke="#263238" strokeWidth="0.5" opacity="0.4"/>
      {/* 눈 */}
      <ellipse cx="10" cy="56" rx="2.5" ry="3" fill="white"/>
      <circle cx="10.5" cy="56.5" r="1.8" fill="#263238"/>
      <circle cx="9.5" cy="55.2" r="0.8" fill="white" opacity="0.9"/>
      {/* 질감 */}
      <path d="M30 42 Q35 40 40 42" stroke="#263238" strokeWidth="0.4" opacity="0.2" fill="none"/>
      <path d="M50 40 Q55 38 60 40" stroke="#263238" strokeWidth="0.4" opacity="0.2" fill="none"/>
      <path d="M70 42 Q75 40 80 42" stroke="#263238" strokeWidth="0.4" opacity="0.2" fill="none"/>
      <path d="M40 52 Q45 50 50 52" stroke="#263238" strokeWidth="0.4" opacity="0.2" fill="none"/>
      <path d="M60 50 Q65 48 70 50" stroke="#263238" strokeWidth="0.4" opacity="0.2" fill="none"/>
      <path d="M80 52 Q85 50 90 52" stroke="#263238" strokeWidth="0.4" opacity="0.2" fill="none"/>
    </g>
  </svg>
);

/* ======================================================================
   15. ShrimpSVG (새우)
   ====================================================================== */
const ShrimpSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="sr-body1" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF5350"/>
        <stop offset="100%" stopColor="#E53935"/>
      </linearGradient>
      <linearGradient id="sr-body2" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EF5350"/>
        <stop offset="100%" stopColor="#C62828"/>
      </linearGradient>
      <linearGradient id="sr-head" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EF9A9A"/>
        <stop offset="100%" stopColor="#EF5350"/>
      </linearGradient>
      <linearGradient id="sr-tail" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#EF5350" stopOpacity="0.8"/>
        <stop offset="100%" stopColor="#FFCDD2" stopOpacity="0.4"/>
      </linearGradient>
    </defs>
    <g>
      {/* 더듬이 2개 (길고 우아한) */}
      <path d="M32 44 Q26 34 20 22 Q18 18 16 14" stroke="#EF9A9A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      <path d="M36 42 Q34 30 36 18 Q38 12 40 8" stroke="#EF9A9A" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
      {/* 짧은 더듬이 */}
      <path d="M30 46 Q24 40 22 36" stroke="#FFCDD2" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M34 44 Q30 38 30 34" stroke="#FFCDD2" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      {/* 머리 (두갑) */}
      <path d="M28 48 Q24 42 28 36 Q34 32 42 34 Q48 36 50 42 Q52 48 50 54 Q46 60 38 60 Q30 58 28 48Z" fill="url(#sr-head)"/>
      {/* 로스트럼 (뿔) */}
      <path d="M28 40 Q22 38 18 36 Q16 38 20 40 Q24 42 28 44Z" fill="#E53935"/>
      {/* 눈 줄기 + 눈 */}
      <path d="M34 38 Q32 34 32 32" stroke="#EF5350" strokeWidth="1.5" fill="none"/>
      <circle cx="32" cy="31" r="3" fill="white"/>
      <circle cx="32.5" cy="31.5" r="2" fill="#1A1A1A"/>
      <circle cx="31.5" cy="30.5" r="0.8" fill="white" opacity="0.9"/>
      {/* 몸통 마디 1 */}
      <path d="M48 42 Q54 38 60 42 Q62 50 60 56 Q54 60 48 56 Q46 50 48 42Z" fill="url(#sr-body1)"/>
      {/* 마디 경계선 */}
      <path d="M48 42 Q50 50 48 56" stroke="#C62828" strokeWidth="0.5" opacity="0.5" fill="none"/>
      {/* 몸통 마디 2 */}
      <path d="M58 40 Q64 38 68 42 Q70 48 68 54 Q64 58 58 56 Q56 50 58 40Z" fill="url(#sr-body2)"/>
      <path d="M58 40 Q60 48 58 56" stroke="#C62828" strokeWidth="0.5" opacity="0.5" fill="none"/>
      {/* 몸통 마디 3 */}
      <path d="M66 42 Q72 40 76 44 Q78 48 76 54 Q72 56 66 54 Q64 50 66 42Z" fill="url(#sr-body1)"/>
      <path d="M66 42 Q68 48 66 54" stroke="#C62828" strokeWidth="0.5" opacity="0.5" fill="none"/>
      {/* 몸통 마디 4 */}
      <path d="M74 44 Q80 42 82 46 Q84 50 82 54 Q80 56 74 54 Q72 50 74 44Z" fill="url(#sr-body2)"/>
      <path d="M74 44 Q76 50 74 54" stroke="#C62828" strokeWidth="0.5" opacity="0.5" fill="none"/>
      {/* 몸통 마디 5 */}
      <path d="M80 46 Q86 44 88 48 Q90 52 88 54 Q86 56 80 54 Q78 52 80 46Z" fill="url(#sr-body1)"/>
      {/* 꼬리 부채 (tail fan) */}
      <path d="M88 48 Q94 42 100 38 Q102 40 98 46 Q96 50 92 50Z" fill="url(#sr-tail)" opacity="0.75"/>
      <path d="M88 52 Q94 56 100 60 Q102 58 98 52 Q96 50 92 50Z" fill="url(#sr-tail)" opacity="0.75"/>
      <path d="M88 50 Q96 50 102 50" fill="url(#sr-tail)" opacity="0.5"/>
      {/* 꼬리 부채 ray */}
      <path d="M90 48 Q96 44 100 40" stroke="#C62828" strokeWidth="0.3" opacity="0.3" fill="none"/>
      <path d="M90 50 Q96 50 100 50" stroke="#C62828" strokeWidth="0.3" opacity="0.3" fill="none"/>
      <path d="M90 52 Q96 56 100 58" stroke="#C62828" strokeWidth="0.3" opacity="0.3" fill="none"/>
      {/* 다리들 */}
      <path d="M42 56 Q40 64 38 70" stroke="#EF9A9A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M46 58 Q44 66 42 72" stroke="#EF9A9A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M52 58 Q50 66 48 72" stroke="#EF9A9A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M58 58 Q56 66 54 72" stroke="#EF9A9A" strokeWidth="1" fill="none" strokeLinecap="round"/>
      <path d="M64 56 Q62 64 60 70" stroke="#EF9A9A" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M70 56 Q68 62 66 68" stroke="#EF9A9A" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M76 56 Q74 62 72 66" stroke="#EF9A9A" strokeWidth="0.8" fill="none" strokeLinecap="round"/>
      <path d="M82 54 Q80 60 78 64" stroke="#EF9A9A" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
      {/* 수영 다리 (pleopod) */}
      <path d="M48 56 Q50 60 52 56" stroke="#FFCDD2" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M56 56 Q58 60 60 56" stroke="#FFCDD2" strokeWidth="0.5" opacity="0.4" fill="none"/>
      <path d="M64 54 Q66 58 68 54" stroke="#FFCDD2" strokeWidth="0.5" opacity="0.4" fill="none"/>
      {/* 질감 */}
      <circle cx="44" cy="48" r="0.6" fill="#C62828" opacity="0.3"/>
      <circle cx="56" cy="46" r="0.6" fill="#C62828" opacity="0.3"/>
      <circle cx="66" cy="48" r="0.6" fill="#C62828" opacity="0.3"/>
      <circle cx="76" cy="50" r="0.6" fill="#C62828" opacity="0.3"/>
    </g>
  </svg>
);

/* ======================================================================
   SVG_MAP & Export
   ====================================================================== */
const SVG_MAP: Record<string, React.FC<{ size: number }>> = {
  clownfish: ClownfishSVG,
  jellyfish: JellyfishSVG,
  sea_turtle: SeaTurtleSVG,
  dolphin: DolphinSVG,
  whale_shark: WhaleSharkSVG,
  octopus: OctopusSVG,
  pufferfish: PufferfishSVG,
  seahorse: SeahorseSVG,
  starfish: StarfishSVG,
  manta_ray: MantaRaySVG,
  giant_squid: GiantSquidSVG,
  anglerfish: AnglerfishSVG,
  deep_sea_jellyfish: DeepSeaJellyfishSVG,
  humpback_whale: HumpbackWhaleSVG,
  shrimp: ShrimpSVG,
};

export const CreatureSVG: React.FC<CreatureSVGProps> = ({ svgId, size = 120, className = '' }) => {
  const SVGComponent = SVG_MAP[svgId];

  if (!SVGComponent) {
    return (
      <div className={className} style={{ width: size, height: size }}>
        <svg viewBox="0 0 120 120" width={size} height={size}>
          <circle cx="60" cy="60" r="40" fill="#ccc" />
          <text x="60" y="65" textAnchor="middle" fontSize="12" fill="white">?</text>
        </svg>
      </div>
    );
  }

  return (
    <div className={className}>
      <SVGComponent size={size} />
    </div>
  );
};
