'use client';

import { useEffect, useState } from 'react';

interface CollectionBadgeProps {
  creatureName: string;
  onAnimationEnd?: () => void;
  duration?: number;
}

/**
 * "도감에 추가!" 뱃지 애니메이션 컴포넌트
 * - 아래에서 위로 올라오며 페이드인
 * - 잠시 유지 후 페이드아웃
 */
export function CollectionBadge({
  creatureName,
  onAnimationEnd,
  duration = 2000,
}: CollectionBadgeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 마운트 후 애니메이션 시작
    const showTimer = setTimeout(() => setVisible(true), 50);

    // duration 후 페이드아웃
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onAnimationEnd?.();
      }, 300);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onAnimationEnd]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 transition-all duration-300 ${
        visible
          ? 'opacity-100 scale-100'
          : 'opacity-0 scale-90 translate-y-8'
      }`}
    >
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-6 rounded-3xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="text-4xl">📚</div>
          <div>
            <div className="text-sm font-medium opacity-90">도감에 추가!</div>
            <div className="text-2xl font-bold mt-1">{creatureName}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
