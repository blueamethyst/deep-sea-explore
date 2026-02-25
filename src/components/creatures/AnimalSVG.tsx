import React from 'react';

interface AnimalSVGProps {
  svgId: string;
  size?: number;
  className?: string;
}

/* ======================================================================
   Capybara (카피바라)
   ====================================================================== */
const CapybaraSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="68" rx="35" ry="25" fill="#8B6914" />
    <ellipse cx="60" cy="72" rx="32" ry="18" fill="#A0781E" />
    <ellipse cx="55" cy="52" rx="18" ry="16" fill="#8B6914" />
    <ellipse cx="55" cy="56" rx="10" ry="7" fill="#C49A2C" />
    <circle cx="48" cy="48" r="3" fill="#1A1A2E" />
    <circle cx="62" cy="48" r="3" fill="#1A1A2E" />
    <circle cx="48" cy="47.5" r="1" fill="white" />
    <circle cx="62" cy="47.5" r="1" fill="white" />
    <ellipse cx="55" cy="54" rx="4" ry="2.5" fill="#6B4F10" />
    <ellipse cx="44" cy="42" rx="4" ry="3" fill="#8B6914" />
    <ellipse cx="66" cy="42" rx="4" ry="3" fill="#8B6914" />
    <rect x="38" y="85" width="8" height="12" rx="3" fill="#6B4F10" />
    <rect x="52" y="85" width="8" height="12" rx="3" fill="#6B4F10" />
    <rect x="66" y="85" width="8" height="12" rx="3" fill="#6B4F10" />
    <rect x="78" y="85" width="8" height="12" rx="3" fill="#6B4F10" />
  </svg>
);

/* ======================================================================
   Tree Frog (청개구리)
   ====================================================================== */
const TreeFrogSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="70" rx="28" ry="22" fill="#4CAF50" />
    <ellipse cx="60" cy="74" rx="22" ry="14" fill="#66BB6A" />
    <circle cx="46" cy="50" r="12" fill="#4CAF50" />
    <circle cx="74" cy="50" r="12" fill="#4CAF50" />
    <circle cx="46" cy="48" r="8" fill="white" />
    <circle cx="74" cy="48" r="8" fill="white" />
    <circle cx="47" cy="47" r="4" fill="#1A1A2E" />
    <circle cx="75" cy="47" r="4" fill="#1A1A2E" />
    <circle cx="48" cy="46" r="1.5" fill="white" />
    <circle cx="76" cy="46" r="1.5" fill="white" />
    <path d="M52 62 Q60 68 68 62" stroke="#2E7D32" strokeWidth="2" fill="none" strokeLinecap="round" />
    <circle cx="54" cy="58" r="1.5" fill="#FF5252" />
    <circle cx="66" cy="58" r="1.5" fill="#FF5252" />
    <ellipse cx="38" cy="90" rx="10" ry="4" fill="#4CAF50" />
    <ellipse cx="82" cy="90" rx="10" ry="4" fill="#4CAF50" />
    <circle cx="30" cy="90" r="3" fill="#66BB6A" />
    <circle cx="35" cy="88" r="3" fill="#66BB6A" />
    <circle cx="90" cy="90" r="3" fill="#66BB6A" />
    <circle cx="85" cy="88" r="3" fill="#66BB6A" />
  </svg>
);

/* ======================================================================
   Morpho Butterfly (모르포나비)
   ====================================================================== */
const MorphoButterfySVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="mb-wing" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#1565C0" />
        <stop offset="50%" stopColor="#42A5F5" />
        <stop offset="100%" stopColor="#1E88E5" />
      </linearGradient>
    </defs>
    <ellipse cx="35" cy="55" rx="22" ry="28" fill="url(#mb-wing)" />
    <ellipse cx="85" cy="55" rx="22" ry="28" fill="url(#mb-wing)" />
    <ellipse cx="40" cy="80" rx="14" ry="18" fill="#1976D2" />
    <ellipse cx="80" cy="80" rx="14" ry="18" fill="#1976D2" />
    <ellipse cx="35" cy="50" rx="6" ry="8" fill="#64B5F6" opacity="0.6" />
    <ellipse cx="85" cy="50" rx="6" ry="8" fill="#64B5F6" opacity="0.6" />
    <ellipse cx="60" cy="60" rx="4" ry="20" fill="#4E342E" />
    <circle cx="60" cy="38" r="5" fill="#4E342E" />
    <circle cx="58" cy="37" r="1.5" fill="white" />
    <circle cx="62" cy="37" r="1.5" fill="white" />
    <path d="M57 33 Q55 22 50 18" stroke="#4E342E" strokeWidth="1.5" fill="none" />
    <path d="M63 33 Q65 22 70 18" stroke="#4E342E" strokeWidth="1.5" fill="none" />
    <circle cx="50" cy="17" r="2" fill="#FFC107" />
    <circle cx="70" cy="17" r="2" fill="#FFC107" />
  </svg>
);

/* ======================================================================
   Sloth (나무늘보)
   ====================================================================== */
const SlothSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="70" rx="30" ry="25" fill="#A1887F" />
    <ellipse cx="60" cy="50" rx="22" ry="20" fill="#BCAAA4" />
    <ellipse cx="60" cy="54" rx="14" ry="12" fill="#D7CCC8" />
    <ellipse cx="50" cy="46" rx="5" ry="4" fill="#D7CCC8" />
    <ellipse cx="70" cy="46" rx="5" ry="4" fill="#D7CCC8" />
    <circle cx="52" cy="46" r="2" fill="#1A1A2E" />
    <circle cx="68" cy="46" r="2" fill="#1A1A2E" />
    <ellipse cx="60" cy="52" rx="3" ry="2" fill="#5D4037" />
    <path d="M54 58 Q60 62 66 58" stroke="#795548" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <path d="M30 55 Q25 70 35 85" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" fill="none" />
    <path d="M90 55 Q95 70 85 85" stroke="#8D6E63" strokeWidth="8" strokeLinecap="round" fill="none" />
    <circle cx="25" cy="68" r="3" fill="#795548" />
    <circle cx="28" cy="72" r="3" fill="#795548" />
    <circle cx="95" cy="68" r="3" fill="#795548" />
    <circle cx="92" cy="72" r="3" fill="#795548" />
  </svg>
);

/* ======================================================================
   Armadillo (아르마딜로)
   ====================================================================== */
const ArmadilloSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="68" rx="34" ry="22" fill="#9E9E9E" />
    <path d="M30 60 Q30 48 40 46 Q50 44 60 46 Q70 44 80 46 Q90 48 90 60" fill="#BDBDBD" />
    <line x1="40" y1="46" x2="40" y2="68" stroke="#757575" strokeWidth="1" />
    <line x1="50" y1="45" x2="50" y2="68" stroke="#757575" strokeWidth="1" />
    <line x1="60" y1="45" x2="60" y2="68" stroke="#757575" strokeWidth="1" />
    <line x1="70" y1="45" x2="70" y2="68" stroke="#757575" strokeWidth="1" />
    <line x1="80" y1="46" x2="80" y2="68" stroke="#757575" strokeWidth="1" />
    <ellipse cx="28" cy="62" rx="12" ry="10" fill="#9E9E9E" />
    <circle cx="23" cy="58" r="3" fill="#1A1A2E" />
    <circle cx="23" cy="57.5" r="1" fill="white" />
    <ellipse cx="22" cy="64" rx="3" ry="2" fill="#E0E0E0" />
    <circle cx="20" cy="55" r="4" fill="#9E9E9E" />
    <path d="M90 68 Q100 68 105 72 Q108 75 104 78 Q98 80 92 78" fill="#9E9E9E" />
    <rect x="36" y="84" width="7" height="10" rx="3" fill="#757575" />
    <rect x="52" y="84" width="7" height="10" rx="3" fill="#757575" />
    <rect x="66" y="84" width="7" height="10" rx="3" fill="#757575" />
    <rect x="78" y="84" width="7" height="10" rx="3" fill="#757575" />
  </svg>
);

/* ======================================================================
   Anteater (개미핥기)
   ====================================================================== */
const AnteaterSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="55" cy="65" rx="28" ry="20" fill="#5D4037" />
    <path d="M55 50 Q50 40 40 35 Q30 32 20 38" stroke="#5D4037" strokeWidth="10" strokeLinecap="round" fill="none" />
    <ellipse cx="20" cy="38" rx="5" ry="3" fill="#795548" />
    <circle cx="32" cy="34" r="2.5" fill="#1A1A2E" />
    <circle cx="32" cy="33.5" r="0.8" fill="white" />
    <ellipse cx="25" cy="32" rx="4" ry="3" fill="#5D4037" />
    <path d="M80 60 Q95 50 100 45" stroke="#795548" strokeWidth="12" strokeLinecap="round" fill="none" />
    <path d="M80 60 Q95 55 102 50" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" fill="none" />
    <rect x="34" y="78" width="7" height="14" rx="3" fill="#4E342E" />
    <rect x="48" y="78" width="7" height="14" rx="3" fill="#4E342E" />
    <rect x="60" y="78" width="7" height="14" rx="3" fill="#4E342E" />
    <rect x="72" y="78" width="7" height="14" rx="3" fill="#4E342E" />
  </svg>
);

/* ======================================================================
   Leaf Cutter Ant (잎꾼개미)
   ====================================================================== */
const LeafCutterAntSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="32" rx="12" ry="8" fill="#4CAF50" transform="rotate(-15 60 32)" />
    <ellipse cx="55" cy="34" rx="8" ry="5" fill="#66BB6A" transform="rotate(-15 55 34)" />
    <circle cx="58" cy="55" r="10" fill="#3E2723" />
    <circle cx="55" cy="52" r="2" fill="white" />
    <circle cx="61" cy="52" r="2" fill="white" />
    <circle cx="55.5" cy="52" r="1" fill="#1A1A2E" />
    <circle cx="61.5" cy="52" r="1" fill="#1A1A2E" />
    <path d="M52 48 Q48 42 45 38" stroke="#3E2723" strokeWidth="1.5" fill="none" />
    <path d="M64" y1="48" x2="68" y2="42" stroke="#3E2723" strokeWidth="1.5" fill="none" />
    <ellipse cx="60" cy="72" rx="14" ry="10" fill="#4E342E" />
    <ellipse cx="62" cy="88" rx="10" ry="8" fill="#3E2723" />
    <line x1="42" y1="70" x2="30" y2="82" stroke="#5D4037" strokeWidth="2" />
    <line x1="44" y1="74" x2="32" y2="88" stroke="#5D4037" strokeWidth="2" />
    <line x1="46" y1="78" x2="36" y2="92" stroke="#5D4037" strokeWidth="2" />
    <line x1="78" y1="70" x2="90" y2="82" stroke="#5D4037" strokeWidth="2" />
    <line x1="76" y1="74" x2="88" y2="88" stroke="#5D4037" strokeWidth="2" />
    <line x1="74" y1="78" x2="84" y2="92" stroke="#5D4037" strokeWidth="2" />
  </svg>
);

/* ======================================================================
   Spider Monkey (거미원숭이)
   ====================================================================== */
const SpiderMonkeySVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="65" rx="22" ry="20" fill="#5D4037" />
    <ellipse cx="60" cy="42" rx="18" ry="16" fill="#795548" />
    <ellipse cx="60" cy="46" rx="12" ry="10" fill="#D7CCC8" />
    <circle cx="53" cy="40" r="3.5" fill="#1A1A2E" />
    <circle cx="67" cy="40" r="3.5" fill="#1A1A2E" />
    <circle cx="54" cy="39" r="1.2" fill="white" />
    <circle cx="68" cy="39" r="1.2" fill="white" />
    <ellipse cx="60" cy="47" rx="3" ry="2" fill="#3E2723" />
    <path d="M55 52 Q60 55 65 52" stroke="#5D4037" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <circle cx="40" cy="34" r="8" fill="#795548" />
    <circle cx="80" cy="34" r="8" fill="#795548" />
    <circle cx="40" cy="34" r="4" fill="#D7CCC8" />
    <circle cx="80" cy="34" r="4" fill="#D7CCC8" />
    <path d="M38 60 Q25 55 20 65" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M82 60 Q95 55 100 65" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M60 85 Q55 100 48 108 Q45 112 42 108" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" fill="none" />
  </svg>
);

/* ======================================================================
   Toucan (큰부리새)
   ====================================================================== */
const ToucanSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="55" cy="65" rx="22" ry="25" fill="#1A1A2E" />
    <ellipse cx="55" cy="70" rx="14" ry="15" fill="#FFFFFF" />
    <ellipse cx="55" cy="42" rx="16" ry="14" fill="#1A1A2E" />
    <circle cx="50" cy="38" r="4" fill="white" />
    <circle cx="51" cy="38" r="2" fill="#1A1A2E" />
    <circle cx="51.5" cy="37.5" r="0.8" fill="white" />
    <path d="M60 42 Q80 38 95 42 Q100 44 95 48 Q80 52 60 48Z" fill="#FF9800" />
    <path d="M60 42 Q80 40 92 42" fill="#F44336" />
    <path d="M60 46 Q80 48 92 46 Q95 48 92 50 Q80 52 60 48Z" fill="#FFEB3B" />
    <path d="M60 42 L62 45 L60 48" fill="#1A1A2E" />
    <path d="M38 50 Q28 40 25 30" stroke="#1A1A2E" strokeWidth="5" strokeLinecap="round" fill="none" />
    <path d="M72 50 Q82 40 85 30" stroke="#1A1A2E" strokeWidth="5" strokeLinecap="round" fill="none" />
    <ellipse cx="38" cy="28" rx="6" ry="3" fill="#1A1A2E" />
    <ellipse cx="82" cy="28" rx="6" ry="3" fill="#1A1A2E" />
    <rect x="44" y="86" width="6" height="10" rx="2" fill="#FF9800" />
    <rect x="56" y="86" width="6" height="10" rx="2" fill="#FF9800" />
    <path d="M35 55 Q20 60 18 70" stroke="#1A1A2E" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);

/* ======================================================================
   Hummingbird (벌새)
   ====================================================================== */
const HummingbirdSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="hb-body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#00BCD4" />
      </linearGradient>
    </defs>
    <ellipse cx="60" cy="55" rx="15" ry="18" fill="url(#hb-body)" />
    <ellipse cx="60" cy="62" rx="10" ry="10" fill="#E0E0E0" />
    <circle cx="60" cy="38" r="10" fill="#4CAF50" />
    <circle cx="56" cy="36" r="2.5" fill="#1A1A2E" />
    <circle cx="56.5" cy="35.5" r="0.8" fill="white" />
    <path d="M64 38 L85 36 L84 38 L64 40Z" fill="#424242" />
    <path d="M45 48 Q28 38 20 45 Q15 50 22 52 Q30 54 45 52" fill="#81C784" opacity="0.7" />
    <path d="M75 48 Q92 38 100 45 Q105 50 98 52 Q90 54 75 52" fill="#81C784" opacity="0.7" />
    <ellipse cx="60" cy="72" rx="4" ry="8" fill="#4CAF50" />
    <path d="M56 80 L55 95" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
    <path d="M64 80 L65 95" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" />
    <ellipse cx="58" cy="40" rx="6" ry="4" fill="#E91E63" opacity="0.6" />
  </svg>
);

/* ======================================================================
   Koala (코알라)
   ====================================================================== */
const KoalaSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="72" rx="26" ry="22" fill="#9E9E9E" />
    <ellipse cx="60" cy="48" rx="22" ry="20" fill="#BDBDBD" />
    <circle cx="38" cy="38" r="12" fill="#9E9E9E" />
    <circle cx="82" cy="38" r="12" fill="#9E9E9E" />
    <circle cx="38" cy="38" r="7" fill="#E0E0E0" />
    <circle cx="82" cy="38" r="7" fill="#E0E0E0" />
    <circle cx="52" cy="44" r="4" fill="#1A1A2E" />
    <circle cx="68" cy="44" r="4" fill="#1A1A2E" />
    <circle cx="53" cy="43" r="1.5" fill="white" />
    <circle cx="69" cy="43" r="1.5" fill="white" />
    <ellipse cx="60" cy="52" rx="6" ry="4" fill="#424242" />
    <path d="M55 58 Q60 62 65 58" stroke="#757575" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <ellipse cx="60" cy="76" rx="14" ry="10" fill="#E0E0E0" />
    <path d="M36 60 Q28 70 34 80" stroke="#9E9E9E" strokeWidth="6" strokeLinecap="round" fill="none" />
    <path d="M84 60 Q92 70 86 80" stroke="#9E9E9E" strokeWidth="6" strokeLinecap="round" fill="none" />
  </svg>
);

/* ======================================================================
   Red Panda (붉은판다)
   ====================================================================== */
const RedPandaSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="68" rx="28" ry="22" fill="#D84315" />
    <ellipse cx="60" cy="45" rx="22" ry="18" fill="#E64A19" />
    <ellipse cx="60" cy="50" rx="14" ry="10" fill="#FFCCBC" />
    <circle cx="38" cy="34" r="10" fill="#E64A19" />
    <circle cx="82" cy="34" r="10" fill="#E64A19" />
    <circle cx="38" cy="34" r="6" fill="#BF360C" />
    <circle cx="82" cy="34" r="6" fill="#BF360C" />
    <circle cx="52" cy="42" r="4" fill="#1A1A2E" />
    <circle cx="68" cy="42" r="4" fill="#1A1A2E" />
    <circle cx="53" cy="41" r="1.5" fill="white" />
    <circle cx="69" cy="41" r="1.5" fill="white" />
    <ellipse cx="60" cy="50" rx="4" ry="2.5" fill="#1A1A2E" />
    <path d="M45 40 Q42 36 38 38" stroke="#FFCCBC" strokeWidth="2" fill="none" />
    <path d="M75 40 Q78 36 82 38" stroke="#FFCCBC" strokeWidth="2" fill="none" />
    <path d="M80 75 Q90 80 95 85 Q98 90 92 92 Q86 88 80 82" fill="#D84315" />
    <path d="M82 78 Q88 82 90 86" stroke="#BF360C" strokeWidth="2" fill="none" />
    <path d="M85 80 Q90 84 92 88" stroke="#BF360C" strokeWidth="2" fill="none" />
    <rect x="42" y="84" width="8" height="12" rx="3" fill="#BF360C" />
    <rect x="56" y="84" width="8" height="12" rx="3" fill="#BF360C" />
    <rect x="70" y="84" width="8" height="12" rx="3" fill="#BF360C" />
  </svg>
);

/* ======================================================================
   Parrot (앵무새)
   ====================================================================== */
const ParrotSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="pr-body" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#F44336" />
        <stop offset="50%" stopColor="#FF9800" />
        <stop offset="100%" stopColor="#FFEB3B" />
      </linearGradient>
    </defs>
    <ellipse cx="58" cy="62" rx="20" ry="25" fill="url(#pr-body)" />
    <ellipse cx="58" cy="70" rx="12" ry="12" fill="#FFF9C4" />
    <circle cx="58" cy="38" r="16" fill="#4CAF50" />
    <circle cx="52" cy="35" r="4" fill="white" />
    <circle cx="53" cy="35" r="2.5" fill="#1A1A2E" />
    <circle cx="53.5" cy="34.5" r="0.8" fill="white" />
    <path d="M62 40 Q70 36 72 40 Q70 44 62 42Z" fill="#424242" />
    <path d="M62 40 Q68 38 70 40" fill="#616161" />
    <ellipse cx="58" cy="26" rx="4" ry="6" fill="#2E7D32" />
    <path d="M40 50 Q30 42 25 50 Q22 56 30 58 Q36 58 42 55" fill="#2196F3" />
    <path d="M76 50 Q86 42 90 50 Q92 56 85 58 Q80 58 76 55" fill="#2196F3" />
    <path d="M50 85 L45 105 L50 102" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M66 85 L70 105 L65 102" stroke="#FF9800" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M48 85 Q50 95 58 100 Q66 95 68 85" fill="#4CAF50" />
  </svg>
);

/* ======================================================================
   Iguana (이구아나)
   ====================================================================== */
const IguanaSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="62" cy="65" rx="30" ry="18" fill="#4CAF50" />
    <ellipse cx="62" cy="68" rx="26" ry="12" fill="#66BB6A" />
    <ellipse cx="35" cy="52" rx="16" ry="14" fill="#4CAF50" />
    <circle cx="30" cy="46" r="4" fill="#FFC107" />
    <circle cx="30.5" cy="46" r="2" fill="#1A1A2E" />
    <ellipse cx="24" cy="56" rx="6" ry="3" fill="#66BB6A" />
    <path d="M35 40 L33 36 L37 38 L36 34 L40 37 L39 33 L43 36" stroke="#2E7D32" strokeWidth="1.5" fill="none" />
    <circle cx="35" cy="60" r="6" fill="#388E3C" />
    <path d="M90 62 Q100 60 108 62 Q112 64 108 66 Q100 68 90 66" fill="#4CAF50" />
    <path d="M106 62 Q110 60 114 62 Q116 64 112 66" fill="#2E7D32" />
    <rect x="40" y="78" width="6" height="12" rx="2" fill="#388E3C" />
    <rect x="54" y="78" width="6" height="12" rx="2" fill="#388E3C" />
    <rect x="68" y="78" width="6" height="12" rx="2" fill="#388E3C" />
    <rect x="80" y="78" width="6" height="12" rx="2" fill="#388E3C" />
  </svg>
);

/* ======================================================================
   Chameleon (카멜레온)
   ====================================================================== */
const ChameleonSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ch-body" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#8BC34A" />
        <stop offset="50%" stopColor="#4CAF50" />
        <stop offset="100%" stopColor="#009688" />
      </linearGradient>
    </defs>
    <ellipse cx="55" cy="60" rx="28" ry="22" fill="url(#ch-body)" />
    <ellipse cx="35" cy="48" rx="14" ry="16" fill="#4CAF50" />
    <circle cx="30" cy="42" r="8" fill="#66BB6A" />
    <circle cx="30" cy="42" r="5" fill="white" />
    <circle cx="30" cy="42" r="3" fill="#1A1A2E" />
    <circle cx="31" cy="41" r="1" fill="white" />
    <path d="M30 54 Q20 56 15 52" stroke="#E91E63" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="14" cy="52" r="2" fill="#E91E63" />
    <path d="M80 55 Q90 50 95 55 Q100 60 95 65 Q90 70 85 65 Q80 60 85 55" fill="#4CAF50" />
    <path d="M95 55 Q100 50 105 52 Q108 55 105 60 Q100 62 95 60" fill="#388E3C" />
    <ellipse cx="42" y1="78" rx="6" ry="4" fill="#388E3C" transform="rotate(-10 42 78)" />
    <ellipse cx="56" cy="80" rx="6" ry="4" fill="#388E3C" transform="rotate(5 56 80)" />
    <ellipse cx="68" cy="78" rx="6" ry="4" fill="#388E3C" transform="rotate(-5 68 78)" />
    <path d="M35 36 L32 30 Q30 26 35 28" fill="#4CAF50" />
  </svg>
);

/* ======================================================================
   Otter (수달)
   ====================================================================== */
const OtterSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="68" rx="30" ry="20" fill="#795548" />
    <ellipse cx="60" cy="72" rx="22" ry="12" fill="#A1887F" />
    <ellipse cx="60" cy="46" rx="18" ry="16" fill="#8D6E63" />
    <ellipse cx="60" cy="50" rx="12" ry="8" fill="#D7CCC8" />
    <circle cx="52" cy="42" r="3.5" fill="#1A1A2E" />
    <circle cx="68" cy="42" r="3.5" fill="#1A1A2E" />
    <circle cx="53" cy="41.5" r="1.2" fill="white" />
    <circle cx="69" cy="41.5" r="1.2" fill="white" />
    <ellipse cx="60" cy="48" rx="4" ry="2.5" fill="#3E2723" />
    <path d="M56 52 Q60 55 64 52" stroke="#5D4037" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    <line x1="50" y1="50" x2="40" y2="48" stroke="#8D6E63" strokeWidth="1" />
    <line x1="50" y1="52" x2="40" y2="52" stroke="#8D6E63" strokeWidth="1" />
    <line x1="70" y1="50" x2="80" y2="48" stroke="#8D6E63" strokeWidth="1" />
    <line x1="70" y1="52" x2="80" y2="52" stroke="#8D6E63" strokeWidth="1" />
    <circle cx="45" cy="36" r="5" fill="#8D6E63" />
    <circle cx="75" cy="36" r="5" fill="#8D6E63" />
    <path d="M86 68 Q95 72 100 80 Q102 85 96 84 Q90 82 86 76" fill="#795548" />
    <rect x="42" y="82" width="8" height="10" rx="3" fill="#5D4037" />
    <rect x="58" y="82" width="8" height="10" rx="3" fill="#5D4037" />
    <rect x="72" y="82" width="8" height="10" rx="3" fill="#5D4037" />
  </svg>
);

/* ======================================================================
   Firefly (반딧불이)
   ====================================================================== */
const FireflySVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="20" fill="#FFEB3B" opacity="0.2" />
    <circle cx="60" cy="60" r="12" fill="#FFF9C4" opacity="0.3" />
    <ellipse cx="60" cy="65" rx="8" ry="12" fill="#4E342E" />
    <ellipse cx="60" cy="72" rx="6" ry="6" fill="#FFEB3B" />
    <ellipse cx="60" cy="72" rx="4" ry="4" fill="#FFF9C4" />
    <circle cx="60" cy="52" r="7" fill="#5D4037" />
    <circle cx="56" cy="50" r="2.5" fill="#FFC107" />
    <circle cx="64" cy="50" r="2.5" fill="#FFC107" />
    <circle cx="56.5" cy="49.5" r="1" fill="#1A1A2E" />
    <circle cx="64.5" cy="49.5" r="1" fill="#1A1A2E" />
    <path d="M56 46 Q54 40 50 38" stroke="#5D4037" strokeWidth="1.5" fill="none" />
    <path d="M64 46 Q66 40 70 38" stroke="#5D4037" strokeWidth="1.5" fill="none" />
    <path d="M48 58 Q35 50 30 55" fill="#E0E0E0" opacity="0.5" />
    <path d="M72 58 Q85 50 90 55" fill="#E0E0E0" opacity="0.5" />
  </svg>
);

/* ======================================================================
   Orchid Mantis (난초사마귀)
   ====================================================================== */
const OrchidMantisSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="60" cy="68" rx="12" ry="16" fill="#F8BBD0" />
    <ellipse cx="60" cy="72" rx="8" ry="10" fill="#FCE4EC" />
    <circle cx="60" cy="46" r="10" fill="#F48FB1" />
    <ellipse cx="60" cy="44" rx="10" ry="8" fill="#F8BBD0" transform="rotate(-10 60 44)" />
    <circle cx="55" cy="42" r="3" fill="#4CAF50" />
    <circle cx="65" cy="42" r="3" fill="#4CAF50" />
    <circle cx="55.5" cy="42" r="1.5" fill="#1A1A2E" />
    <circle cx="65.5" cy="42" r="1.5" fill="#1A1A2E" />
    <path d="M48 56 Q35 48 30 52 Q28 56 32 58 Q38 60 48 58" fill="#F8BBD0" />
    <path d="M72 56 Q85 48 90 52 Q92 56 88 58 Q82 60 72 58" fill="#F8BBD0" />
    <ellipse cx="30" cy="54" rx="5" ry="3" fill="#FCE4EC" />
    <ellipse cx="90" cy="54" rx="5" ry="3" fill="#FCE4EC" />
    <line x1="50" y1="84" x2="45" y2="100" stroke="#F8BBD0" strokeWidth="2" />
    <line x1="55" y1="84" x2="52" y2="100" stroke="#F8BBD0" strokeWidth="2" />
    <line x1="65" y1="84" x2="68" y2="100" stroke="#F8BBD0" strokeWidth="2" />
    <line x1="70" y1="84" x2="75" y2="100" stroke="#F8BBD0" strokeWidth="2" />
  </svg>
);

/* ======================================================================
   Tree Snail (나무달팽이)
   ====================================================================== */
const TreeSnailSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="ts-shell" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF9800" />
        <stop offset="50%" stopColor="#F44336" />
        <stop offset="100%" stopColor="#9C27B0" />
      </linearGradient>
    </defs>
    <ellipse cx="55" cy="80" rx="30" ry="10" fill="#FFCC80" />
    <circle cx="60" cy="58" rx="22" ry="22" fill="url(#ts-shell)" />
    <circle cx="60" cy="58" r="15" fill="#FF5722" opacity="0.5" />
    <circle cx="62" cy="56" r="9" fill="#E64A19" opacity="0.4" />
    <circle cx="63" cy="55" r="4" fill="#BF360C" opacity="0.5" />
    <path d="M38 72 Q30 68 28 72 Q26 78 34 80 Q40 82 45 78" fill="#FFCC80" />
    <path d="M28 68 Q26 58 24 52" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M24 52 Q22 48 20 50" stroke="#FFCC80" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="20" cy="49" r="2" fill="#1A1A2E" />
    <path d="M30 66 Q28 56 26 50" stroke="#FFCC80" strokeWidth="3" strokeLinecap="round" fill="none" />
    <path d="M26 50 Q24 46 22 48" stroke="#FFCC80" strokeWidth="2" strokeLinecap="round" fill="none" />
    <circle cx="22" cy="47" r="2" fill="#1A1A2E" />
    <path d="M32 72 Q30 74 32 76" stroke="#795548" strokeWidth="1" fill="none" />
  </svg>
);

/* ======================================================================
   Generic Bird (일반 새)
   ====================================================================== */
const GenericBirdSVG = ({ size = 80 }: { size: number }) => (
  <svg viewBox="0 0 120 120" width={size} height={size} fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="58" cy="60" rx="18" ry="22" fill="#8BC34A" />
    <ellipse cx="58" cy="65" rx="12" ry="14" fill="#C8E6C9" />
    <circle cx="58" cy="40" r="12" fill="#689F38" />
    <circle cx="53" cy="37" r="3" fill="white" />
    <circle cx="54" cy="37" r="1.8" fill="#1A1A2E" />
    <circle cx="54.5" cy="36.5" r="0.6" fill="white" />
    <path d="M62 42 Q68 40 72 42 Q70 44 62 44Z" fill="#FF9800" />
    <path d="M40 52 Q28 44 22 50 Q20 54 26 56 Q34 58 42 55" fill="#AED581" />
    <path d="M76 52 Q88 44 94 50 Q96 54 90 56 Q82 58 76 55" fill="#AED581" />
    <path d="M50 80 L48 95" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M66 80 L68 95" stroke="#FF9800" strokeWidth="2.5" strokeLinecap="round" />
    <ellipse cx="58" cy="78" rx="6" ry="4" fill="#689F38" />
  </svg>
);

/* ======================================================================
   SVG Registry (메인 export)
   ====================================================================== */
const SVG_MAP: Record<string, React.FC<{ size: number }>> = {
  capybara: CapybaraSVG,
  tree_frog: TreeFrogSVG,
  morpho_butterfly: MorphoButterfySVG,
  sloth: SlothSVG,
  armadillo: ArmadilloSVG,
  anteater: AnteaterSVG,
  leaf_cutter_ant: LeafCutterAntSVG,
  spider_monkey: SpiderMonkeySVG,
  toucan: ToucanSVG,
  hummingbird: HummingbirdSVG,
  koala: KoalaSVG,
  red_panda: RedPandaSVG,
  parrot: ParrotSVG,
  iguana: IguanaSVG,
  chameleon: ChameleonSVG,
  otter: OtterSVG,
  firefly: FireflySVG,
  orchid_mantis: OrchidMantisSVG,
  tree_snail: TreeSnailSVG,
  generic_bird: GenericBirdSVG,
};

export const AnimalSVG: React.FC<AnimalSVGProps> = ({
  svgId,
  size = 80,
  className = '',
}) => {
  const SVGComponent = SVG_MAP[svgId];

  if (!SVGComponent) {
    // 매칭되지 않는 ID는 일반 새 SVG 사용
    return (
      <div className={className}>
        <GenericBirdSVG size={size} />
      </div>
    );
  }

  return (
    <div className={className}>
      <SVGComponent size={size} />
    </div>
  );
};
