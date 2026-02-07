'use client';

import { useEffect, useState } from 'react';
import { ZoneInfo } from '@/types/creature';
import { ZONE_TRANSITION_DURATION_MS } from '@/lib/constants';

interface ZoneTransitionProps {
  zone: ZoneInfo;
  onComplete?: () => void;
}

/**
 * 존 전환 타이틀 카드
 * - 존 이름 + 수심 범위 + 설명
 * - 페이드인 → 유지 → 페이드아웃
 */
export function ZoneTransition({ zone, onComplete }: ZoneTransitionProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 마운트 후 애니메이션 시작
    const showTimer = setTimeout(() => setVisible(true), 50);

    // ZONE_TRANSITION_DURATION_MS 후 페이드아웃
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onComplete?.();
      }, 500);
    }, ZONE_TRANSITION_DURATION_MS);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-40 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{
        background: `linear-gradient(to bottom, ${zone.bg_color_start}, ${zone.bg_color_end})`,
      }}
    >
      <div
        className={`bg-white/10 backdrop-blur-md px-12 py-8 rounded-3xl text-center transition-all duration-500 ${
          visible ? 'scale-100' : 'scale-90'
        }`}
      >
        <div className="text-white">
          <div className="text-sm font-medium opacity-80">
            {zone.depth_min}m ~ {zone.depth_max}m
          </div>
          <h2 className="text-5xl font-bold mt-2 mb-4">
            {zone.name_ko}
          </h2>
          <p className="text-lg opacity-90 max-w-md">
            {zone.description_ko}
          </p>
        </div>
      </div>
    </div>
  );
}
