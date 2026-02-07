'use client';

import { ZONES, ZoneInfo } from '@/types/creature';

interface DepthGaugeProps {
  currentDepth: number;
  maxDepth?: number;
}

/**
 * 수심 게이지 컴포넌트
 * - 왼쪽 세로 게이지
 * - 잠수함 아이콘 위치 표시
 * - 존 경계선 표시
 */
export function DepthGauge({ currentDepth, maxDepth = 11000 }: DepthGaugeProps) {
  const progress = Math.min(100, (currentDepth / maxDepth) * 100);

  // 현재 존 찾기
  const currentZone = ZONES.find(
    z => currentDepth >= z.depth_min && currentDepth <= z.depth_max
  ) || ZONES[0];

  return (
    <div className="fixed left-4 top-20 bottom-20 w-16 flex flex-col items-center pointer-events-none z-10">
      {/* 게이지 배경 */}
      <div className="relative w-2 h-full bg-white/20 rounded-full overflow-hidden">
        {/* 존 경계선 표시 */}
        {ZONES.map((zone) => {
          const zoneProgress = (zone.depth_min / maxDepth) * 100;
          return (
            <div
              key={zone.id}
              className="absolute left-0 right-0 h-[2px] bg-white/40"
              style={{ top: `${zoneProgress}%` }}
            />
          );
        })}

        {/* 진행 바 */}
        <div
          className="absolute top-0 left-0 right-0 bg-gradient-to-b from-blue-400 to-blue-600 transition-all duration-300"
          style={{ height: `${progress}%` }}
        />

        {/* 잠수함 아이콘 */}
        <div
          className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center transition-all duration-300"
          style={{ top: `${progress}%` }}
        >
          <div className="text-2xl">🚢</div>
        </div>
      </div>

      {/* 수심 표시 */}
      <div className="mt-3 text-center">
        <div className="text-white text-sm font-bold">
          {Math.round(currentDepth)}m
        </div>
        <div
          className="text-xs font-medium mt-1 px-2 py-1 rounded-full"
          style={{ backgroundColor: currentZone.bg_color_start }}
        >
          {currentZone.name_ko}
        </div>
      </div>
    </div>
  );
}
