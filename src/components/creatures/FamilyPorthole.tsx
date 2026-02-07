'use client';

import React from 'react';

interface FamilyPortholeProps {
  member: 'dad' | 'mom' | 'child';
  name: string;
}

const PHOTO_MAP: Record<string, string> = {
  dad: '/img/porthole_dad_circle.png',
  mom: '/img/porthole_mom_circle.png',
  child: '/img/porthole_child_circle.png',
};

export const FamilyPorthole: React.FC<FamilyPortholeProps> = ({ member, name }) => {
  return (
    <div className="relative w-full aspect-square">
      {/* 원형 창문 프레임 */}
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <defs>
          <clipPath id={`porthole-clip-${member}`}>
            <circle cx="50" cy="50" r="40" />
          </clipPath>
        </defs>

        {/* 외부 금속 프레임 */}
        <circle cx="50" cy="50" r="48" fill="#8B7355" />
        <circle cx="50" cy="50" r="44" fill="#6A5D4F" />

        {/* 유리 (투명 효과) */}
        <circle cx="50" cy="50" r="42" fill="#E3F2FD" opacity="0.3" />

        {/* 내부 배경 (잠수함 내부) */}
        <circle cx="50" cy="50" r="40" fill="#1A1A2E" />

        {/* 실제 사진을 원형으로 클리핑 */}
        <image
          href={PHOTO_MAP[member]}
          x="10" y="10" width="80" height="80"
          clipPath={`url(#porthole-clip-${member})`}
          preserveAspectRatio="xMidYMid slice"
        />

        {/* 창문 하이라이트 (반사광) */}
        <ellipse cx="35" cy="30" rx="12" ry="8" fill="white" opacity="0.15" />
      </svg>

      {/* 이름 라벨 */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold text-white bg-black/50 px-2 py-0.5 rounded whitespace-nowrap">
        {name}
      </div>
    </div>
  );
};
