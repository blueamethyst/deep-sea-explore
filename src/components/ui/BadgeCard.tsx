'use client';

import { Badge } from '@/lib/badges';

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
  onClick?: () => void;
}

/**
 * 배지 표시 카드
 * - 획득/미획득 상태 표시
 * - 터치 영역 48x48px 이상
 */
export function BadgeCard({ badge, earned, onClick }: BadgeCardProps) {
  return (
    <button
      onClick={onClick}
      className={`min-w-[120px] min-h-[120px] p-4 rounded-2xl border-2 transition-all duration-200 ${
        earned
          ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-400 shadow-md hover:shadow-lg'
          : 'bg-gray-100 border-gray-300 opacity-60'
      }`}
      disabled={!earned}
    >
      <div className="flex flex-col items-center gap-2">
        {/* 아이콘 */}
        <div className={`text-5xl ${earned ? 'scale-100' : 'scale-75 grayscale'}`}>
          {badge.icon}
        </div>

        {/* 이름 */}
        <div className="text-base font-bold text-gray-800 text-center">
          {badge.name_ko}
        </div>

        {/* 설명 */}
        <div className="text-xs text-gray-600 text-center leading-tight">
          {badge.description_ko}
        </div>
      </div>
    </button>
  );
}
