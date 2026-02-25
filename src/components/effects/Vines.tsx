'use client';

import React from 'react';

interface VinesProps {
  count?: number;
  className?: string;
}

const VINE_COLORS = ['#2E7D32', '#388E3C', '#1B5E20', '#4CAF50', '#33691E'];

// 덩굴 경로 생성 - 곡선 형태의 SVG path
const generateVinePath = (height: number, sway: number): string => {
  const segments = 5;
  const segHeight = height / segments;
  let path = `M${50 + sway * 0.3} 0`;

  for (let i = 1; i <= segments; i++) {
    const y = segHeight * i;
    const direction = i % 2 === 0 ? 1 : -1;
    const cx1 = 50 + direction * sway;
    const cy1 = y - segHeight * 0.6;
    const cx2 = 50 - direction * sway * 0.5;
    const cy2 = y - segHeight * 0.3;
    const ex = 50 + direction * sway * 0.2;
    path += ` C${cx1} ${cy1}, ${cx2} ${cy2}, ${ex} ${y}`;
  }

  return path;
};

export const Vines: React.FC<VinesProps> = ({ count = 4, className = '' }) => {
  const vines = Array.from({ length: count }, (_, i) => {
    const height = Math.random() * 150 + 200; // 200~350 SVG 단위
    const sway = Math.random() * 20 + 10; // 10~30px 곡선 정도

    return {
      id: i,
      left: (i / count) * 80 + Math.random() * 15 + 5, // 5~95% 분산
      height,
      sway,
      strokeWidth: Math.random() * 2 + 2, // 2~4px
      color: VINE_COLORS[Math.floor(Math.random() * VINE_COLORS.length)],
      path: generateVinePath(height, sway),
      delay: Math.random() * 3, // 0~3s
      duration: Math.random() * 3 + 5, // 5~8s
      leafCount: Math.floor(Math.random() * 3) + 2, // 2~4개 잎
    };
  });

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {vines.map((vine) => (
        <div
          key={vine.id}
          className="vine-container"
          style={{
            left: `${vine.left}%`,
            animationDelay: `${vine.delay}s`,
            animationDuration: `${vine.duration}s`,
          }}
        >
          <svg
            width="100"
            height={vine.height}
            viewBox={`0 0 100 ${vine.height}`}
            fill="none"
            style={{ overflow: 'visible' }}
          >
            {/* 메인 덩굴 줄기 */}
            <path
              d={vine.path}
              stroke={vine.color}
              strokeWidth={vine.strokeWidth}
              strokeLinecap="round"
              fill="none"
              opacity={0.85}
            />
            {/* 덩굴 위의 작은 잎사귀들 */}
            {Array.from({ length: vine.leafCount }, (_, j) => {
              const t = (j + 1) / (vine.leafCount + 1);
              const leafY = vine.height * t;
              const leafX = 50 + (j % 2 === 0 ? 1 : -1) * vine.sway * 0.4;
              const leafSize = Math.random() * 4 + 6; // 6~10
              const leafDir = j % 2 === 0 ? 1 : -1;

              return (
                <ellipse
                  key={j}
                  cx={leafX + leafDir * leafSize * 0.8}
                  cy={leafY}
                  rx={leafSize}
                  ry={leafSize * 0.5}
                  fill={vine.color}
                  opacity={0.7}
                  transform={`rotate(${leafDir * 30}, ${leafX + leafDir * leafSize * 0.8}, ${leafY})`}
                />
              );
            })}
          </svg>
        </div>
      ))}

      <style jsx>{`
        .vine-container {
          position: absolute;
          top: -10px;
          transform-origin: top center;
          animation: vine-sway ease-in-out infinite alternate;
          will-change: transform;
        }

        @keyframes vine-sway {
          0% {
            transform: rotate(-1.5deg) translateX(-3px);
          }
          33% {
            transform: rotate(1deg) translateX(2px);
          }
          66% {
            transform: rotate(-0.5deg) translateX(-1px);
          }
          100% {
            transform: rotate(1.5deg) translateX(3px);
          }
        }
      `}</style>
    </div>
  );
};
