'use client';

import React from 'react';
import { FamilyPorthole } from './FamilyPorthole';

interface SubmarineProps {
  showHeadlight?: boolean;
  className?: string;
}

export const Submarine: React.FC<SubmarineProps> = ({
  showHeadlight = false,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 240 160"
        className="w-full h-auto submarine-float"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 선체 금속 질감 그라디언트 */}
          <linearGradient id="hullGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="45%" stopColor="#FFD93D" />
            <stop offset="100%" stopColor="#FFC107" />
          </linearGradient>

          {/* 선체 하단 어두운 그라디언트 */}
          <linearGradient id="hullBottomGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFC107" />
            <stop offset="100%" stopColor="#F9A825" />
          </linearGradient>

          {/* 상단 광택 하이라이트 */}
          <radialGradient id="hullShine" cx="0.4" cy="0.25" r="0.6" fx="0.35" fy="0.2">
            <stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.7" />
            <stop offset="40%" stopColor="#FFF9C4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FFD93D" stopOpacity="0" />
          </radialGradient>

          {/* 조타실 돔 그라디언트 */}
          <linearGradient id="domeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFE082" />
            <stop offset="100%" stopColor="#FFB300" />
          </linearGradient>

          {/* 조타실 유리 그라디언트 */}
          <linearGradient id="glassGradient" x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0%" stopColor="#B3E5FC" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#81D4FA" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#4FC3F7" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#29B6F6" stopOpacity="0.5" />
          </linearGradient>

          {/* 유리 반사광 */}
          <radialGradient id="glassReflection" cx="0.3" cy="0.3" r="0.5">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* 탐조등 빛 그라디언트 */}
          <radialGradient id="headlightGradient" cx="0.7" cy="0.5" r="0.7">
            <stop offset="0%" stopColor="#FFE66D" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFE66D" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFE66D" stopOpacity="0" />
          </radialGradient>

          {/* 탐조등 유리 커버 그라디언트 */}
          <linearGradient id="searchlightGlass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFF9C4" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFE082" stopOpacity="0.4" />
          </linearGradient>

          {/* 프로펠러 금속 그라디언트 */}
          <linearGradient id="propellerGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4A017" />
            <stop offset="50%" stopColor="#B8860B" />
            <stop offset="100%" stopColor="#996515" />
          </linearGradient>

          {/* 배관 그라디언트 */}
          <linearGradient id="pipeGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFB74D" />
            <stop offset="50%" stopColor="#E65100" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#FFB74D" />
          </linearGradient>
        </defs>

        {/* ===== 탐조등 빛 (약광층 이하에서만) ===== */}
        {showHeadlight && (
          <g className="headlight-glow">
            <ellipse cx="18" cy="84" rx="55" ry="28" fill="url(#headlightGradient)" opacity="0.6" />
            <ellipse cx="25" cy="84" rx="35" ry="18" fill="#FFE66D" opacity="0.15" />
          </g>
        )}

        {/* ===== 선체 그림자 (입체감) ===== */}
        <ellipse cx="122" cy="128" rx="75" ry="8" fill="#000" opacity="0.08" />

        {/* ===== 메인 선체 - 유선형 bezier path ===== */}
        <path
          d="
            M 30 84
            C 30 62, 42 50, 62 47
            C 82 44, 105 43, 122 43
            C 155 43, 182 44, 198 52
            C 212 58, 218 70, 218 84
            C 218 98, 212 110, 198 116
            C 182 122, 155 124, 122 124
            C 90 124, 62 122, 48 116
            C 34 110, 30 98, 30 84
            Z
          "
          fill="url(#hullGradient)"
          stroke="#E6A800"
          strokeWidth="1.5"
        />

        {/* 선체 하단 음영 */}
        <path
          d="
            M 42 100
            C 55 105, 85 112, 122 112
            C 160 112, 190 105, 205 100
            C 212 107, 205 116, 198 118
            C 182 122, 155 124, 122 124
            C 90 124, 62 122, 48 118
            C 38 114, 34 107, 42 100
            Z
          "
          fill="url(#hullBottomGradient)"
          opacity="0.5"
        />

        {/* 선체 상단 광택 하이라이트 */}
        <path
          d="
            M 50 70
            C 55 55, 80 48, 120 48
            C 160 48, 185 55, 195 65
            C 175 52, 145 48, 120 48
            C 85 48, 60 55, 50 70
            Z
          "
          fill="url(#hullShine)"
          opacity="0.8"
        />

        {/* ===== 선체 중앙 리벳 라인 (수평) ===== */}
        {[52, 62, 72, 82, 92, 102, 112, 122, 132, 142, 152, 162, 172, 182, 192].map((cx) => (
          <circle key={`rivet-mid-${cx}`} cx={cx} cy={84} r="1.2" fill="#E6A800" opacity="0.5" />
        ))}

        {/* 상단 리벳 라인 */}
        {[65, 80, 95, 110, 125, 140, 155, 170, 185].map((cx) => (
          <circle key={`rivet-top-${cx}`} cx={cx} cy={58} r="1" fill="#E6A800" opacity="0.4" />
        ))}

        {/* 하단 리벳 라인 */}
        {[65, 80, 95, 110, 125, 140, 155, 170, 185].map((cx) => (
          <circle key={`rivet-bot-${cx}`} cx={cx} cy={110} r="1" fill="#E6A800" opacity="0.4" />
        ))}

        {/* ===== 조타실 돔 ===== */}
        <path
          d="
            M 108 48
            C 108 48, 110 22, 132 22
            C 154 22, 158 48, 158 48
          "
          fill="url(#domeGradient)"
          stroke="#E6A800"
          strokeWidth="1.5"
        />

        {/* 조타실 돔 테두리 (하단 가로선) */}
        <line x1="106" y1="48" x2="160" y2="48" stroke="#E6A800" strokeWidth="1.5" />

        {/* 조타실 유리창 */}
        <path
          d="
            M 114 46
            C 114 46, 116 28, 133 28
            C 150 28, 152 46, 152 46
          "
          fill="url(#glassGradient)"
          stroke="#B0BEC5"
          strokeWidth="0.8"
        />

        {/* 유리 반사광 효과 */}
        <ellipse cx="126" cy="34" rx="8" ry="5" fill="url(#glassReflection)" opacity="0.7" />
        <path
          d="M 120 38 Q 124 32 130 36"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.6"
          opacity="0.5"
        />

        {/* 조타실 리벳 */}
        {[112, 120, 128, 136, 144, 152].map((cx) => (
          <circle key={`dome-rivet-${cx}`} cx={cx} cy={46} r="0.8" fill="#B8860B" opacity="0.6" />
        ))}

        {/* ===== 잠수함 안테나 + 신호등 ===== */}
        <line x1="133" y1="22" x2="133" y2="10" stroke="#E6A800" strokeWidth="2" strokeLinecap="round" />
        <circle cx="133" cy="8" r="3.5" fill="#FF5722" />
        <circle cx="133" cy="8" r="2" fill="#FF8A65" opacity="0.7" />
        {/* 안테나 작은 가로 장식 */}
        <line x1="130" y1="14" x2="136" y2="14" stroke="#E6A800" strokeWidth="1" />

        {/* ===== 탐조등 + 원뿔형 유리 커버 ===== */}
        <g>
          {/* 탐조등 마운트 */}
          <rect x="28" y="78" width="8" height="12" rx="2" fill="#E6A800" />

          {/* 원뿔형 유리 커버 */}
          <path
            d="
              M 30 76
              L 18 80
              L 18 88
              L 30 92
              Z
            "
            fill="url(#searchlightGlass)"
            stroke="#B0BEC5"
            strokeWidth="0.8"
          />

          {/* 탐조등 렌즈 */}
          <circle
            cx="20"
            cy="84"
            r="4.5"
            fill={showHeadlight ? '#FFE66D' : '#FFC107'}
            stroke="#E6A800"
            strokeWidth="1"
          />

          {/* 렌즈 하이라이트 */}
          <circle cx="19" cy="82" r="1.5" fill="#FFFFFF" opacity="0.6" />

          {/* 유리 커버 반사선 */}
          <line x1="22" y1="78" x2="22" y2="86" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.4" />
        </g>

        {/* ===== 배관 (pipes) ===== */}
        {/* 상부 배관 - 조타실에서 뒤로 */}
        <path
          d="M 158 42 C 168 40, 178 42, 188 48"
          fill="none"
          stroke="#E6A800"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M 158 42 C 168 40, 178 42, 188 48"
          fill="none"
          stroke="#FFE082"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 하부 배관 - 선체 아래 */}
        <path
          d="M 70 118 C 75 126, 85 128, 95 126 C 105 124, 110 120, 115 118"
          fill="none"
          stroke="#E6A800"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 70 118 C 75 126, 85 128, 95 126 C 105 124, 110 120, 115 118"
          fill="none"
          stroke="#FFE082"
          strokeWidth="0.8"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* 전면 작은 배관 */}
        <path
          d="M 42 68 C 40 62, 44 58, 50 56"
          fill="none"
          stroke="#E6A800"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ===== 해치 핸들 (전면 해치) ===== */}
        <g>
          {/* 해치 원형 테두리 */}
          <circle cx="55" cy="84" r="7" fill="#FFB300" stroke="#E6A800" strokeWidth="1.5" />
          <circle cx="55" cy="84" r="5" fill="#FFC107" stroke="#E6A800" strokeWidth="0.8" />

          {/* 핸들 (십자 모양) */}
          <line x1="55" y1="79" x2="55" y2="89" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="50" y1="84" x2="60" y2="84" stroke="#B8860B" strokeWidth="1.5" strokeLinecap="round" />

          {/* 중앙 볼트 */}
          <circle cx="55" cy="84" r="1.5" fill="#B8860B" />
        </g>

        {/* ===== 후면 해치 핸들 (작은 것) ===== */}
        <g>
          <circle cx="192" cy="84" r="5" fill="#FFB300" stroke="#E6A800" strokeWidth="1" />
          <line x1="192" y1="80.5" x2="192" y2="87.5" stroke="#B8860B" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="188.5" y1="84" x2="195.5" y2="84" stroke="#B8860B" strokeWidth="1.2" strokeLinecap="round" />
          <circle cx="192" cy="84" r="1.2" fill="#B8860B" />
        </g>

        {/* ===== 앵커 포인트 (선체 전면 하단) ===== */}
        <g transform="translate(48, 115)">
          {/* 앵커 고리 */}
          <circle cx="0" cy="-2" r="2.5" fill="none" stroke="#B8860B" strokeWidth="1.2" />
          {/* 앵커 축 */}
          <line x1="0" y1="0" x2="0" y2="7" stroke="#B8860B" strokeWidth="1.2" strokeLinecap="round" />
          {/* 앵커 가로 */}
          <line x1="-3.5" y1="5" x2="3.5" y2="5" stroke="#B8860B" strokeWidth="1.2" strokeLinecap="round" />
          {/* 앵커 갈고리 */}
          <path d="M -3.5 5 C -4 7, -2 8, 0 7" fill="none" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" />
          <path d="M 3.5 5 C 4 7, 2 8, 0 7" fill="none" stroke="#B8860B" strokeWidth="1" strokeLinecap="round" />
        </g>

        {/* ===== 창문 (포트홀) 장식 - 금속 테두리 ===== */}
        {/* 아빠 창문 */}
        <circle cx="85" cy="80" r="13" fill="none" stroke="#B8860B" strokeWidth="2.5" />
        <circle cx="85" cy="80" r="11.5" fill="none" stroke="#FFE082" strokeWidth="0.5" opacity="0.5" />

        {/* 서연 창문 */}
        <circle cx="122" cy="80" r="13" fill="none" stroke="#B8860B" strokeWidth="2.5" />
        <circle cx="122" cy="80" r="11.5" fill="none" stroke="#FFE082" strokeWidth="0.5" opacity="0.5" />

        {/* 엄마 창문 */}
        <circle cx="159" cy="80" r="13" fill="none" stroke="#B8860B" strokeWidth="2.5" />
        <circle cx="159" cy="80" r="11.5" fill="none" stroke="#FFE082" strokeWidth="0.5" opacity="0.5" />

        {/* ===== 프로펠러 축 + 마운트 ===== */}
        <g>
          {/* 프로펠러 마운트 (선체에서 나오는 부분) */}
          <path
            d="M 214 80 L 222 78 L 222 90 L 214 88 Z"
            fill="#B8860B"
            stroke="#996515"
            strokeWidth="0.5"
          />

          {/* 프로펠러 축 */}
          <rect x="220" y="82" width="6" height="4" rx="1" fill="#A67C00" stroke="#996515" strokeWidth="0.5" />
        </g>

        {/* ===== 4방향 프로펠러 블레이드 ===== */}
        <g className="propeller-spin">
          {/* 블레이드 1 (상) */}
          <ellipse cx="228" cy="73" rx="4" ry="10" fill="url(#propellerGradient)" opacity="0.85" />
          {/* 블레이드 2 (하) */}
          <ellipse cx="228" cy="95" rx="4" ry="10" fill="url(#propellerGradient)" opacity="0.85" />
          {/* 블레이드 3 (좌) */}
          <ellipse cx="218" cy="84" rx="10" ry="4" fill="url(#propellerGradient)" opacity="0.85" />
          {/* 블레이드 4 (우) */}
          <ellipse cx="238" cy="84" rx="10" ry="4" fill="url(#propellerGradient)" opacity="0.85" />

          {/* 프로펠러 중심 허브 */}
          <circle cx="228" cy="84" r="4" fill="#B8860B" stroke="#996515" strokeWidth="1" />
          <circle cx="228" cy="84" r="2" fill="#A67C00" />
          {/* 허브 볼트 */}
          <circle cx="228" cy="82" r="0.6" fill="#FFE082" />
          <circle cx="229.5" cy="84" r="0.6" fill="#FFE082" />
          <circle cx="228" cy="86" r="0.6" fill="#FFE082" />
          <circle cx="226.5" cy="84" r="0.6" fill="#FFE082" />
        </g>

        {/* ===== 선체 장식 디테일 ===== */}
        {/* 전면 범퍼 라인 */}
        <path
          d="M 38 68 C 35 75, 35 93, 38 100"
          fill="none"
          stroke="#E6A800"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* 후면 장식 라인 */}
        <path
          d="M 208 68 C 212 75, 212 93, 208 100"
          fill="none"
          stroke="#E6A800"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.5"
        />

        {/* 선체 측면 스트라이프 (귀여운 포인트) */}
        <path
          d="M 50 96 C 80 100, 160 100, 200 96"
          fill="none"
          stroke="#FFB300"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* ===== 기포 (움직이는 느낌) ===== */}
        <circle cx="232" cy="76" r="2" fill="#B3E5FC" opacity="0.5" />
        <circle cx="236" cy="70" r="1.5" fill="#B3E5FC" opacity="0.4" />
        <circle cx="234" cy="92" r="1.8" fill="#B3E5FC" opacity="0.3" />
      </svg>

      {/* ===== 가족 창문 (porthole) 3개 ===== */}
      <div className="absolute top-[38%] left-[25%] w-[15%]">
        <FamilyPorthole member="dad" name="아빠" />
      </div>
      <div className="absolute top-[38%] left-[42%] w-[15%]">
        <FamilyPorthole member="child" name="서연" />
      </div>
      <div className="absolute top-[38%] left-[58%] w-[15%]">
        <FamilyPorthole member="mom" name="엄마" />
      </div>

      <style jsx>{`
        .submarine-float {
          animation: submarine-hover 3s ease-in-out infinite;
          will-change: transform;
        }

        .propeller-spin {
          animation: propeller-rotate 0.8s linear infinite;
          transform-origin: 228px 84px;
          will-change: transform;
        }

        .headlight-glow {
          animation: headlight-pulse 2s ease-in-out infinite;
          will-change: opacity;
        }

        @keyframes submarine-hover {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(1deg);
          }
        }

        @keyframes propeller-rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes headlight-pulse {
          0%, 100% {
            opacity: 0.6;
          }
          50% {
            opacity: 0.9;
          }
        }
      `}</style>
    </div>
  );
};
