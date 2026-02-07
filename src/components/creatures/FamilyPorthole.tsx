'use client';

import React from 'react';
import { FAMILY_COLORS } from '@/lib/constants';

interface FamilyPortholeProps {
  member: 'dad' | 'mom' | 'child';
  avatar: string;
  name: string;
}

export const FamilyPorthole: React.FC<FamilyPortholeProps> = ({ member, avatar, name }) => {
  const suitColor = FAMILY_COLORS[member];

  return (
    <div className="relative w-full aspect-square">
      {/* 원형 창문 프레임 */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* 외부 금속 프레임 */}
        <circle cx="50" cy="50" r="48" fill="#8B7355" />
        <circle cx="50" cy="50" r="44" fill="#6A5D4F" />

        {/* 유리 (투명 효과) */}
        <circle cx="50" cy="50" r="42" fill="#E3F2FD" opacity="0.3" />

        {/* 내부 배경 (잠수함 내부) */}
        <circle cx="50" cy="50" r="40" fill="#1A1A2E" />

        {/* 가족 아바타 SVG - 간단한 잠수복 입은 모습 */}
        <g transform="translate(50, 35)">
          {/* 헬멧 */}
          <circle cx="0" cy="0" r="15" fill={suitColor} opacity="0.9" stroke="#fff" strokeWidth="1" />

          {/* 헬멧 유리 (얼굴 보이는 부분) */}
          <circle cx="0" cy="0" r="10" fill="#FFE4B5" />

          {/* 간단한 얼굴 특징 */}
          <circle cx="-3" cy="-2" r="1.5" fill="#000" />
          <circle cx="3" cy="-2" r="1.5" fill="#000" />
          <path d="M -3 2 Q 0 4 3 2" stroke="#000" strokeWidth="1" fill="none" />

          {/* 잠수복 몸체 */}
          <rect x="-8" y="15" width="16" height="20" fill={suitColor} rx="2" />

          {/* 팔 */}
          <rect x="-12" y="18" width="4" height="12" fill={suitColor} rx="2" />
          <rect x="8" y="18" width="4" height="12" fill={suitColor} rx="2" />

          {/* 잠수복 장식 (버튼들) */}
          <circle cx="0" cy="22" r="1" fill="#FFD700" />
          <circle cx="0" cy="27" r="1" fill="#FFD700" />
        </g>

        {/* 창문 하이라이트 (반사광) */}
        <ellipse cx="35" cy="30" rx="12" ry="8" fill="white" opacity="0.2" />
      </svg>

      {/* 이름 라벨 */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};
