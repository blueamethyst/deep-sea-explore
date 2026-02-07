import React from 'react';

interface CreatureSVGProps {
  svgId: string;
  size?: number;
  className?: string;
}

// 흰동가리 - 주황색에 흰 줄무늬
const ClownfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <ellipse cx="60" cy="60" rx="35" ry="20" fill="#FF6B35"/>
      {/* 흰 줄무늬 */}
      <rect x="35" y="45" width="10" height="30" fill="white" rx="2"/>
      <rect x="60" y="45" width="8" height="30" fill="white" rx="2"/>
      <rect x="78" y="48" width="6" height="24" fill="white" rx="2"/>
      {/* 꼬리 지느러미 */}
      <path d="M95 55 Q105 60 95 65 Z" fill="#FF8C42"/>
      {/* 등 지느러미 */}
      <path d="M50 40 Q60 30 70 40" fill="#FF8C42" stroke="#FF6B35" strokeWidth="1"/>
      {/* 눈 */}
      <circle cx="45" cy="58" r="4" fill="white"/>
      <circle cx="45" cy="58" r="2" fill="black"/>
    </g>
  </svg>
);

// 해파리 - 투명한 돔과 촉수
const JellyfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 돔 */}
      <ellipse cx="60" cy="45" rx="28" ry="20" fill="#FFB3E6" opacity="0.6"/>
      <ellipse cx="60" cy="45" rx="22" ry="15" fill="#FFD4F0" opacity="0.4"/>
      {/* 내부 패턴 */}
      <circle cx="60" cy="40" r="8" fill="#FF69B4" opacity="0.3"/>
      {/* 촉수들 */}
      <path d="M48 55 Q46 75 45 90" stroke="#FFB3E6" strokeWidth="2" opacity="0.7" fill="none"/>
      <path d="M55 58 Q54 78 52 95" stroke="#FFB3E6" strokeWidth="2" opacity="0.7" fill="none"/>
      <path d="M60 60 Q60 80 60 100" stroke="#FF69B4" strokeWidth="2.5" opacity="0.8" fill="none"/>
      <path d="M65 58 Q66 78 68 95" stroke="#FFB3E6" strokeWidth="2" opacity="0.7" fill="none"/>
      <path d="M72 55 Q74 75 75 90" stroke="#FFB3E6" strokeWidth="2" opacity="0.7" fill="none"/>
    </g>
  </svg>
);

// 바다거북 - 초록 등딱지
const SeaTurtleSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 등딱지 */}
      <ellipse cx="60" cy="55" rx="32" ry="28" fill="#4A7C59"/>
      {/* 등딱지 패턴 */}
      <ellipse cx="60" cy="50" rx="22" ry="18" fill="#5F9E6E"/>
      <circle cx="50" cy="55" r="6" fill="#4A7C59"/>
      <circle cx="70" cy="55" r="6" fill="#4A7C59"/>
      <circle cx="60" cy="45" r="5" fill="#4A7C59"/>
      <circle cx="60" cy="65" r="5" fill="#4A7C59"/>
      {/* 머리 */}
      <ellipse cx="38" cy="50" rx="8" ry="10" fill="#6FA87D"/>
      <circle cx="36" cy="48" r="2" fill="black"/>
      {/* 앞 다리 */}
      <ellipse cx="45" cy="75" rx="6" ry="14" fill="#5F9E6E" transform="rotate(-20 45 75)"/>
      <ellipse cx="75" cy="75" rx="6" ry="14" fill="#5F9E6E" transform="rotate(20 75 75)"/>
      {/* 뒷 다리 */}
      <ellipse cx="50" cy="75" rx="5" ry="10" fill="#4A7C59" transform="rotate(-10 50 75)"/>
      <ellipse cx="70" cy="75" rx="5" ry="10" fill="#4A7C59" transform="rotate(10 70 75)"/>
    </g>
  </svg>
);

// 돌고래 - 회색, 웃는 표정
const DolphinSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <path d="M30 60 Q60 50 90 65 Q85 75 60 72 Q30 70 30 60" fill="#7C9BB5"/>
      {/* 머리 */}
      <ellipse cx="28" cy="60" rx="12" ry="10" fill="#8BA9C4"/>
      {/* 주둥이 */}
      <ellipse cx="18" cy="62" rx="6" ry="4" fill="#8BA9C4"/>
      {/* 등 지느러미 */}
      <path d="M60 50 L65 35 L68 50 Z" fill="#6B8AA3"/>
      {/* 꼬리 */}
      <path d="M88 68 L95 60 L100 65 L95 70 L90 75 Z" fill="#7C9BB5"/>
      {/* 눈 */}
      <circle cx="25" cy="58" r="2" fill="black"/>
      {/* 웃는 입 */}
      <path d="M20 64 Q22 66 24 64" stroke="#5A7A93" strokeWidth="1" fill="none"/>
      {/* 배 */}
      <ellipse cx="50" cy="68" rx="25" ry="8" fill="#B8D0E3" opacity="0.6"/>
    </g>
  </svg>
);

// 고래상어 - 점박이 무늬
const WhaleSharkSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <ellipse cx="60" cy="60" rx="45" ry="18" fill="#4A5D6D"/>
      {/* 흰 점무늬 */}
      <circle cx="40" cy="55" r="2" fill="white"/>
      <circle cx="48" cy="58" r="2.5" fill="white"/>
      <circle cx="55" cy="54" r="2" fill="white"/>
      <circle cx="65" cy="57" r="2.5" fill="white"/>
      <circle cx="72" cy="55" r="2" fill="white"/>
      <circle cx="80" cy="58" r="2" fill="white"/>
      <circle cx="45" cy="64" r="2" fill="white"/>
      <circle cx="60" cy="66" r="2.5" fill="white"/>
      <circle cx="75" cy="64" r="2" fill="white"/>
      {/* 머리 */}
      <ellipse cx="25" cy="60" rx="15" ry="16" fill="#556B7A"/>
      <rect x="12" y="58" width="8" height="4" fill="#556B7A" rx="2"/>
      {/* 아가미 */}
      <path d="M32 55 Q35 55 32 58" stroke="white" strokeWidth="0.5" opacity="0.5" fill="none"/>
      <path d="M32 60 Q35 60 32 63" stroke="white" strokeWidth="0.5" opacity="0.5" fill="none"/>
      {/* 등 지느러미 */}
      <path d="M55 42 L60 30 L65 42 Z" fill="#3E5160"/>
      {/* 꼬리 */}
      <path d="M102 50 L110 60 L102 70 Z" fill="#4A5D6D"/>
      {/* 눈 */}
      <circle cx="22" cy="58" r="2" fill="black"/>
    </g>
  </svg>
);

// 문어 - 빨간색, 8개 다리
const OctopusSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 머리 */}
      <ellipse cx="60" cy="45" rx="22" ry="25" fill="#D64545"/>
      {/* 눈 */}
      <ellipse cx="52" cy="42" rx="5" ry="6" fill="white"/>
      <circle cx="52" cy="43" r="3" fill="black"/>
      <ellipse cx="68" cy="42" rx="5" ry="6" fill="white"/>
      <circle cx="68" cy="43" r="3" fill="black"/>
      {/* 8개 다리 */}
      <path d="M45 65 Q40 75 38 90" stroke="#D64545" strokeWidth="4" fill="none"/>
      <path d="M50 65 Q48 78 45 95" stroke="#D64545" strokeWidth="4" fill="none"/>
      <path d="M55 65 Q55 80 52 100" stroke="#D64545" strokeWidth="4" fill="none"/>
      <path d="M60 65 Q60 82 60 105" stroke="#D64545" strokeWidth="4.5" fill="none"/>
      <path d="M65 65 Q65 80 68 100" stroke="#D64545" strokeWidth="4" fill="none"/>
      <path d="M70 65 Q72 78 75 95" stroke="#D64545" strokeWidth="4" fill="none"/>
      <path d="M75 65 Q80 75 82 90" stroke="#D64545" strokeWidth="4" fill="none"/>
      <path d="M78 65 Q82 72 85 85" stroke="#D64545" strokeWidth="3.5" fill="none"/>
      {/* 빨판들 */}
      <circle cx="42" cy="80" r="2" fill="#FF6B6B" opacity="0.6"/>
      <circle cx="58" cy="88" r="2" fill="#FF6B6B" opacity="0.6"/>
      <circle cx="72" cy="82" r="2" fill="#FF6B6B" opacity="0.6"/>
    </g>
  </svg>
);

// 복어 - 둥글고 귀여운
const PufferfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <circle cx="60" cy="60" r="28" fill="#FFD93D"/>
      {/* 작은 가시들 */}
      <line x1="45" y1="38" x2="42" y2="32" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="60" y1="32" x2="60" y2="25" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="75" y1="38" x2="78" y2="32" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="85" y1="55" x2="91" y2="52" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="85" y1="65" x2="91" y2="68" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="75" y1="82" x2="78" y2="88" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="60" y1="88" x2="60" y2="95" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="45" y1="82" x2="42" y2="88" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="35" y1="65" x2="29" y2="68" stroke="#FFC107" strokeWidth="1.5"/>
      <line x1="35" y1="55" x2="29" y2="52" stroke="#FFC107" strokeWidth="1.5"/>
      {/* 눈 */}
      <circle cx="50" cy="55" r="4" fill="black"/>
      <circle cx="70" cy="55" r="4" fill="black"/>
      {/* 입 */}
      <ellipse cx="60" cy="68" rx="6" ry="3" fill="#FF9800"/>
      {/* 반점 */}
      <circle cx="48" cy="65" r="2" fill="#FFA726" opacity="0.5"/>
      <circle cx="72" cy="65" r="2" fill="#FFA726" opacity="0.5"/>
    </g>
  </svg>
);

// 해마 - S자 형태
const SeahorseSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 S자 곡선 */}
      <path d="M60 30 Q65 40 60 50 Q55 60 60 70 Q65 80 60 95" stroke="#FFB347" strokeWidth="8" fill="none"/>
      {/* 머리 */}
      <ellipse cx="58" cy="28" rx="7" ry="9" fill="#FFB347"/>
      {/* 주둥이 */}
      <ellipse cx="52" cy="26" rx="3" ry="2" fill="#FFA726"/>
      {/* 눈 */}
      <circle cx="58" cy="27" r="2" fill="black"/>
      {/* 등 지느러미 */}
      <path d="M56 45 L52 42 L54 48 L52 50 L56 52 Z" fill="#FFA726" opacity="0.7"/>
      {/* 배 지느러미 */}
      <path d="M64 60 L68 58 L66 64 L68 66 L64 68 Z" fill="#FFA726" opacity="0.7"/>
      {/* 꼬리 끝 */}
      <path d="M60 95 Q58 100 55 102 Q52 100 54 96" fill="#FFB347"/>
      {/* 몸통 패턴 */}
      <circle cx="58" cy="50" r="1.5" fill="#FF9800" opacity="0.5"/>
      <circle cx="62" cy="70" r="1.5" fill="#FF9800" opacity="0.5"/>
    </g>
  </svg>
);

// 불가사리 - 별 모양
const StarfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 별 5개 팔 */}
      <path d="M60 25 L68 52 L95 52 L73 68 L82 95 L60 78 L38 95 L47 68 L25 52 L52 52 Z"
            fill="#FF7F50" stroke="#FF6347" strokeWidth="1"/>
      {/* 중앙 */}
      <circle cx="60" cy="60" r="12" fill="#FF8C69"/>
      {/* 점무늬 */}
      <circle cx="60" cy="35" r="2" fill="#FF6347" opacity="0.6"/>
      <circle cx="78" cy="52" r="2" fill="#FF6347" opacity="0.6"/>
      <circle cx="70" cy="78" r="2" fill="#FF6347" opacity="0.6"/>
      <circle cx="50" cy="78" r="2" fill="#FF6347" opacity="0.6"/>
      <circle cx="42" cy="52" r="2" fill="#FF6347" opacity="0.6"/>
      <circle cx="56" cy="58" r="1.5" fill="#FF4500" opacity="0.5"/>
      <circle cx="64" cy="58" r="1.5" fill="#FF4500" opacity="0.5"/>
      <circle cx="60" cy="64" r="1.5" fill="#FF4500" opacity="0.5"/>
    </g>
  </svg>
);

// 가오리 - 넓고 납작한
const MantaRaySVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <ellipse cx="60" cy="60" rx="45" ry="25" fill="#5D6D7E"/>
      {/* 날개 모양 */}
      <path d="M15 55 Q30 45 45 50 L60 60 L75 50 Q90 45 105 55 Q95 65 85 62 Q70 70 60 68 Q50 70 35 62 Q25 65 15 55"
            fill="#6B7A8A"/>
      {/* 배 부분 */}
      <ellipse cx="60" cy="62" rx="35" ry="18" fill="#A8B8C8" opacity="0.5"/>
      {/* 눈 */}
      <circle cx="50" cy="55" r="3" fill="black"/>
      <circle cx="70" cy="55" r="3" fill="black"/>
      {/* 꼬리 */}
      <path d="M60 85 Q60 95 58 110" stroke="#5D6D7E" strokeWidth="3" fill="none"/>
      {/* 무늬 */}
      <ellipse cx="60" cy="58" rx="8" ry="5" fill="white" opacity="0.3"/>
    </g>
  </svg>
);

// 대왕오징어 - 긴 촉수, 큰 눈
const GiantSquidSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <ellipse cx="60" cy="40" rx="18" ry="28" fill="#C77E7E"/>
      {/* 머리 끝 */}
      <path d="M60 12 L55 18 L60 25 L65 18 Z" fill="#C77E7E"/>
      {/* 큰 눈 */}
      <ellipse cx="52" cy="35" rx="6" ry="8" fill="white"/>
      <circle cx="52" cy="36" r="4" fill="black"/>
      <circle cx="52" cy="35" r="2" fill="white"/>
      <ellipse cx="68" cy="35" rx="6" ry="8" fill="white"/>
      <circle cx="68" cy="36" r="4" fill="black"/>
      <circle cx="68" cy="35" r="2" fill="white"/>
      {/* 긴 촉수 2개 */}
      <path d="M54 65 Q50 85 48 105" stroke="#B56E6E" strokeWidth="2.5" fill="none"/>
      <path d="M66 65 Q70 85 72 105" stroke="#B56E6E" strokeWidth="2.5" fill="none"/>
      {/* 일반 다리 8개 */}
      <path d="M48 65 Q44 78 42 88" stroke="#C77E7E" strokeWidth="2" fill="none"/>
      <path d="M51 65 Q49 75 47 85" stroke="#C77E7E" strokeWidth="2" fill="none"/>
      <path d="M57 65 Q56 75 55 85" stroke="#C77E7E" strokeWidth="2" fill="none"/>
      <path d="M63 65 Q64 75 65 85" stroke="#C77E7E" strokeWidth="2" fill="none"/>
      <path d="M69 65 Q71 75 73 85" stroke="#C77E7E" strokeWidth="2" fill="none"/>
      <path d="M72 65 Q76 78 78 88" stroke="#C77E7E" strokeWidth="2" fill="none"/>
      {/* 빨판 */}
      <circle cx="50" cy="95" r="1.5" fill="#D88888" opacity="0.6"/>
      <circle cx="70" cy="95" r="1.5" fill="#D88888" opacity="0.6"/>
    </g>
  </svg>
);

// 초롱아귀 - 머리에 빛나는 등 (귀엽게!)
const AnglerfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <ellipse cx="60" cy="65" rx="28" ry="22" fill="#4A4A6A"/>
      {/* 큰 입 */}
      <ellipse cx="35" cy="68" rx="10" ry="8" fill="#2A2A3A"/>
      {/* 이빨 (귀엽게 작게) */}
      <rect x="32" y="64" width="2" height="4" fill="white" rx="1"/>
      <rect x="36" y="64" width="2" height="4" fill="white" rx="1"/>
      <rect x="40" y="64" width="2" height="4" fill="white" rx="1"/>
      {/* 눈 */}
      <circle cx="48" cy="60" r="4" fill="white"/>
      <circle cx="48" cy="60" r="2" fill="black"/>
      {/* 낚시대 (안테나) */}
      <path d="M55 50 Q52 35 50 20" stroke="#5A5A7A" strokeWidth="2" fill="none"/>
      {/* 발광 루어 (빛나는 부분) */}
      <circle cx="50" cy="18" r="4" fill="#FFD700"/>
      <circle cx="50" cy="18" r="6" fill="#FFD700" opacity="0.3"/>
      <circle cx="50" cy="18" r="8" fill="#FFD700" opacity="0.1"/>
      {/* 지느러미 */}
      <path d="M75 55 L85 50 L82 60 Z" fill="#5A5A7A"/>
      <path d="M70 78 L75 88 L80 80 Z" fill="#5A5A7A"/>
      {/* 꼬리 */}
      <path d="M88 65 L98 60 L98 70 Z" fill="#4A4A6A"/>
    </g>
  </svg>
);

// 심해해파리 - 발광하는
const DeepSeaJellyfishSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 발광 돔 */}
      <ellipse cx="60" cy="40" rx="25" ry="18" fill="#6B5FFF" opacity="0.4"/>
      <ellipse cx="60" cy="40" rx="20" ry="14" fill="#8E7FFF" opacity="0.5"/>
      <ellipse cx="60" cy="40" rx="15" ry="10" fill="#B19FFF" opacity="0.6"/>
      {/* 빛나는 중심 */}
      <circle cx="60" cy="38" r="6" fill="#D4C5FF" opacity="0.8"/>
      <circle cx="60" cy="38" r="8" fill="#B19FFF" opacity="0.3"/>
      {/* 발광 촉수 */}
      <path d="M50 52 Q48 70 46 88" stroke="#8E7FFF" strokeWidth="2" opacity="0.6" fill="none"/>
      <path d="M55 54 Q54 72 52 90" stroke="#A390FF" strokeWidth="2" opacity="0.7" fill="none"/>
      <path d="M60 56 Q60 75 60 95" stroke="#B19FFF" strokeWidth="2.5" opacity="0.8" fill="none"/>
      <path d="M65 54 Q66 72 68 90" stroke="#A390FF" strokeWidth="2" opacity="0.7" fill="none"/>
      <path d="M70 52 Q72 70 74 88" stroke="#8E7FFF" strokeWidth="2" opacity="0.6" fill="none"/>
      {/* 발광 점들 */}
      <circle cx="48" cy="78" r="2" fill="#D4C5FF" opacity="0.8"/>
      <circle cx="60" cy="82" r="2" fill="#D4C5FF" opacity="0.8"/>
      <circle cx="72" cy="78" r="2" fill="#D4C5FF" opacity="0.8"/>
    </g>
  </svg>
);

// 혹등고래 - 크고 우아한
const HumpbackWhaleSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 */}
      <ellipse cx="60" cy="60" rx="48" ry="20" fill="#3E5060"/>
      {/* 머리 */}
      <ellipse cx="20" cy="60" rx="18" ry="18" fill="#4A5D6D"/>
      {/* 혹 (머리의 돌기들) */}
      <circle cx="15" cy="54" r="2" fill="#556B7A"/>
      <circle cx="22" cy="52" r="2" fill="#556B7A"/>
      <circle cx="28" cy="54" r="2" fill="#556B7A"/>
      {/* 등 지느러미 */}
      <path d="M55 40 L60 28 L65 40 Z" fill="#2E4050"/>
      {/* 가슴 지느러미 (긴 것이 특징) */}
      <ellipse cx="35" cy="72" rx="8" ry="22" fill="#4A5D6D" transform="rotate(-30 35 72)"/>
      <ellipse cx="45" cy="72" rx="8" ry="22" fill="#4A5D6D" transform="rotate(-20 45 72)"/>
      {/* 꼬리 */}
      <path d="M105 50 L115 45 L118 60 L115 75 L105 70 Z" fill="#3E5060"/>
      {/* 배 (흰색 부분) */}
      <ellipse cx="50" cy="66" rx="35" ry="12" fill="#C8D8E8" opacity="0.6"/>
      {/* 눈 */}
      <circle cx="18" cy="58" r="2" fill="black"/>
    </g>
  </svg>
);

// 새우 - 빨간색, 길쭉한
const ShrimpSVG = ({ size = 120 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <g>
      {/* 몸통 (분절) */}
      <ellipse cx="45" cy="60" rx="8" ry="10" fill="#FF6B6B"/>
      <ellipse cx="55" cy="60" rx="8" ry="10" fill="#FF7F7F"/>
      <ellipse cx="65" cy="60" rx="8" ry="10" fill="#FF6B6B"/>
      <ellipse cx="75" cy="60" rx="7" ry="9" fill="#FF7F7F"/>
      <ellipse cx="83" cy="60" rx="6" ry="8" fill="#FF6B6B"/>
      {/* 머리 */}
      <ellipse cx="35" cy="60" rx="10" ry="12" fill="#FF8F8F"/>
      {/* 긴 더듬이 */}
      <path d="M32 52 Q28 38 26 25" stroke="#FF9F9F" strokeWidth="1.5" fill="none"/>
      <path d="M38 52 Q40 38 42 25" stroke="#FF9F9F" strokeWidth="1.5" fill="none"/>
      {/* 작은 다리들 */}
      <line x1="45" y1="68" x2="42" y2="75" stroke="#FF7F7F" strokeWidth="1.5"/>
      <line x1="55" y1="68" x2="53" y2="75" stroke="#FF7F7F" strokeWidth="1.5"/>
      <line x1="65" y1="68" x2="63" y2="75" stroke="#FF7F7F" strokeWidth="1.5"/>
      <line x1="75" y1="68" x2="73" y2="75" stroke="#FF7F7F" strokeWidth="1.5"/>
      {/* 꼬리 부채 */}
      <path d="M88 55 L95 52 L98 60 L95 68 L88 65 Z" fill="#FF9F9F" opacity="0.8"/>
      {/* 눈 */}
      <circle cx="32" cy="58" r="2" fill="black"/>
    </g>
  </svg>
);

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
