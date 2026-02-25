'use client';

import React from 'react';

interface FallingLeavesProps {
  count?: number;
  className?: string;
}

// 나뭇잎 SVG 패스 (단풍잎/활엽수 형태)
const LEAF_PATHS = [
  // 단풍잎 형태
  'M10 0 C8 4, 2 6, 0 10 C3 9, 5 7, 6 10 C5 13, 3 15, 0 18 C4 16, 7 15, 10 18 C13 15, 16 16, 20 18 C17 15, 15 13, 14 10 C15 7, 17 9, 20 10 C18 6, 12 4, 10 0Z',
  // 타원형 잎
  'M10 0 C14 3, 18 8, 18 12 C18 16, 14 20, 10 20 C6 20, 2 16, 2 12 C2 8, 6 3, 10 0Z',
  // 뾰족한 잎
  'M10 0 C12 5, 16 10, 16 14 C16 18, 13 20, 10 20 C7 20, 4 18, 4 14 C4 10, 8 5, 10 0Z',
];

const LEAF_COLORS = [
  '#4CAF50', '#66BB6A', '#81C784', // 녹색 계열
  '#A5D6A7', '#388E3C', '#2E7D32', // 진한 녹색
  '#8D6E63', '#A1887F', '#795548', // 갈색 계열
  '#FF8F00', '#F57F17', '#E65100', // 주황/빨강 계열
];

export const FallingLeaves: React.FC<FallingLeavesProps> = ({ count = 8, className = '' }) => {
  const leaves = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 15 + 10, // 10~25px
    left: Math.random() * 100, // 0~100%
    delay: Math.random() * 8, // 0~8s
    duration: Math.random() * 6 + 6, // 6~12s
    color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
    path: LEAF_PATHS[Math.floor(Math.random() * LEAF_PATHS.length)],
    swayAmount: Math.random() * 60 + 30, // 30~90px 좌우 흔들림
    rotateEnd: Math.random() * 360 + 180, // 회전 각도
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="falling-leaf"
          style={{
            left: `${leaf.left}%`,
            animationDelay: `${leaf.delay}s`,
            animationDuration: `${leaf.duration}s`,
            ['--sway' as string]: `${leaf.swayAmount}px`,
            ['--rotate-end' as string]: `${leaf.rotateEnd}deg`,
          }}
        >
          <svg
            width={leaf.size}
            height={leaf.size}
            viewBox="0 0 20 20"
            fill={leaf.color}
            style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}
          >
            <path d={leaf.path} />
          </svg>
        </div>
      ))}

      <style jsx>{`
        .falling-leaf {
          position: absolute;
          top: -30px;
          animation: leaf-fall linear infinite;
          will-change: transform;
        }

        @keyframes leaf-fall {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          25% {
            transform: translateY(25vh) translateX(var(--sway)) rotate(90deg);
          }
          50% {
            transform: translateY(50vh) translateX(calc(var(--sway) * -0.5)) rotate(180deg);
          }
          75% {
            transform: translateY(75vh) translateX(var(--sway)) rotate(270deg);
          }
          95% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(105vh) translateX(0) rotate(var(--rotate-end));
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
