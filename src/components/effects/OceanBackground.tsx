'use client';

import React from 'react';
import { ZONES } from '@/types/creature';

interface OceanBackgroundProps {
  currentDepth: number;
  className?: string;
}

export const OceanBackground: React.FC<OceanBackgroundProps> = ({ currentDepth, className = '' }) => {
  // 현재 수심에 맞는 구역 찾기
  const currentZone = ZONES.find(
    (zone) => currentDepth >= zone.depth_min && currentDepth <= zone.depth_max
  ) || ZONES[0];

  // 구역 내에서의 진행도 계산 (0 ~ 1)
  const zoneProgress = Math.min(
    1,
    (currentDepth - currentZone.depth_min) / (currentZone.depth_max - currentZone.depth_min)
  );

  // 두 색상 간 보간
  const interpolateColor = (color1: string, color2: string, progress: number): string => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');

    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);

    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);

    const r = Math.round(r1 + (r2 - r1) * progress);
    const g = Math.round(g1 + (g2 - g1) * progress);
    const b = Math.round(b1 + (b2 - b1) * progress);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const topColor = interpolateColor(
    currentZone.bg_color_start,
    currentZone.bg_color_end,
    zoneProgress * 0.5
  );

  const bottomColor = interpolateColor(
    currentZone.bg_color_start,
    currentZone.bg_color_end,
    0.5 + zoneProgress * 0.5
  );

  return (
    <div
      className={`fixed inset-0 -z-10 transition-colors duration-1000 ${className}`}
      style={{
        background: `linear-gradient(to bottom, ${topColor}, ${bottomColor})`,
      }}
    />
  );
};
