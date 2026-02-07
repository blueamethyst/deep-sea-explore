'use client';

import React from 'react';
import { FamilyPorthole } from './FamilyPorthole';

interface SubmarineProps {
  familyAvatars: { dad: string; mom: string; child: string };
  showHeadlight?: boolean;
  className?: string;
}

export const Submarine: React.FC<SubmarineProps> = ({
  familyAvatars,
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
        {/* 탐조등 빛 (약광층 이하에서만) */}
        {showHeadlight && (
          <g className="headlight-glow">
            <ellipse cx="40" cy="80" rx="50" ry="30" fill="url(#headlightGradient)" opacity="0.6" />
            <defs>
              <radialGradient id="headlightGradient">
                <stop offset="0%" stopColor="#FFE66D" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#FFE66D" stopOpacity="0" />
              </radialGradient>
            </defs>
          </g>
        )}

        {/* 잠수함 몸체 */}
        <g>
          {/* 메인 선체 */}
          <ellipse cx="120" cy="80" rx="80" ry="45" fill="#FFD93D" stroke="#FFB800" strokeWidth="2" />

          {/* 상단 돔 (조타실) */}
          <ellipse cx="140" cy="60" rx="25" ry="18" fill="#FFC107" stroke="#FFB800" strokeWidth="2" />

          {/* 하단 강화 */}
          <ellipse cx="120" cy="90" rx="70" ry="10" fill="#FFB800" opacity="0.3" />

          {/* 전면 해치 */}
          <circle cx="60" cy="80" r="8" fill="#FF9800" stroke="#FFB800" strokeWidth="1.5" />

          {/* 탐조등 */}
          <g>
            <circle cx="45" cy="80" r="6" fill={showHeadlight ? '#FFE66D' : '#FFB800'} stroke="#FF9800" strokeWidth="1.5" />
            {showHeadlight && (
              <circle cx="45" cy="80" r="8" fill="#FFE66D" opacity="0.3" />
            )}
          </g>

          {/* 후면 프로펠러 */}
          <g className="propeller-spin">
            <ellipse cx="200" cy="80" rx="15" ry="8" fill="#C69500" opacity="0.6" />
            <ellipse cx="200" cy="80" rx="8" ry="15" fill="#C69500" opacity="0.6" />
          </g>

          {/* 프로펠러 축 */}
          <rect x="195" y="78" width="10" height="4" fill="#A67C00" rx="2" />

          {/* 상단 안테나 */}
          <line x1="140" y1="42" x2="140" y2="30" stroke="#FFB800" strokeWidth="2" />
          <circle cx="140" cy="28" r="3" fill="#FF5722" />

          {/* 리벳 장식 */}
          <circle cx="70" cy="70" r="2" fill="#FFB800" opacity="0.6" />
          <circle cx="80" cy="70" r="2" fill="#FFB800" opacity="0.6" />
          <circle cx="90" cy="70" r="2" fill="#FFB800" opacity="0.6" />
          <circle cx="100" cy="70" r="2" fill="#FFB800" opacity="0.6" />
        </g>
      </svg>

      {/* 가족 창문 (porthole) 3개 */}
      <div className="absolute top-[45%] left-[22%] w-[12%]">
        <FamilyPorthole member="dad" avatar={familyAvatars.dad} name="아빠" />
      </div>
      <div className="absolute top-[45%] left-[38%] w-[12%]">
        <FamilyPorthole member="child" avatar={familyAvatars.child} name="서연" />
      </div>
      <div className="absolute top-[45%] left-[54%] w-[12%]">
        <FamilyPorthole member="mom" avatar={familyAvatars.mom} name="엄마" />
      </div>

      <style jsx>{`
        .submarine-float {
          animation: submarine-hover 3s ease-in-out infinite;
          will-change: transform;
        }

        .propeller-spin {
          animation: propeller-rotate 0.8s linear infinite;
          transform-origin: 200px 80px;
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
