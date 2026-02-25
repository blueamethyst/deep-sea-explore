'use client';

import React from 'react';

interface SunBeamsProps {
  currentDistance: number;
  className?: string;
}

export const SunBeams: React.FC<SunBeamsProps> = ({ currentDistance, className = '' }) => {
  // high_canopy(8-10km)과 parrot_world(10-12km)에서만 활성화
  const isActive = currentDistance >= 8 && currentDistance <= 12;

  if (!isActive) return null;

  // parrot_world로 갈수록 더 밝아짐 (8km: 0.3, 12km: 0.7)
  const progress = (currentDistance - 8) / 4; // 0~1
  const baseOpacity = 0.3 + progress * 0.4;

  const beams = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    width: Math.random() * 60 + 40, // 40~100px
    right: i * 18 + Math.random() * 8, // 우측에서 분산 배치
    opacity: (Math.random() * 0.3 + 0.2) * baseOpacity, // 개별 투명도
    delay: i * 1.2, // 순차 애니메이션
    duration: Math.random() * 2 + 8, // 8~10s
    skew: Math.random() * 10 - 15, // -15~-5도 (대각선)
  }));

  // 거리 진행에 따른 골든 아워 색상
  const goldIntensity = Math.min(1, progress * 1.2);
  const beamColorStart = `rgba(255, ${200 + Math.round(goldIntensity * 55)}, ${50 + Math.round(goldIntensity * 100)}, 0.25)`;
  const beamColorMid = `rgba(255, ${180 + Math.round(goldIntensity * 40)}, ${30 + Math.round(goldIntensity * 50)}, 0.12)`;

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ transition: 'opacity 1s ease' }}
    >
      {beams.map((beam) => (
        <div
          key={beam.id}
          className="sun-beam"
          style={{
            right: `${beam.right}%`,
            width: `${beam.width}px`,
            opacity: beam.opacity,
            animationDelay: `${beam.delay}s`,
            animationDuration: `${beam.duration}s`,
            transform: `skewX(${beam.skew}deg)`,
            ['--beam-color-start' as string]: beamColorStart,
            ['--beam-color-mid' as string]: beamColorMid,
          }}
        />
      ))}

      <style jsx>{`
        .sun-beam {
          position: absolute;
          top: -5%;
          height: 115%;
          background: linear-gradient(
            to bottom,
            var(--beam-color-start) 0%,
            var(--beam-color-mid) 40%,
            rgba(255, 255, 255, 0.03) 70%,
            rgba(255, 255, 255, 0) 100%
          );
          transform-origin: top right;
          animation: sun-beam-sway ease-in-out infinite;
          will-change: transform;
          border-radius: 0 0 50% 50%;
        }

        @keyframes sun-beam-sway {
          0%, 100% {
            transform: skewX(var(--skew, -10deg)) translateX(0) scaleX(1);
          }
          25% {
            transform: skewX(var(--skew, -10deg)) translateX(10px) scaleX(1.1);
          }
          50% {
            transform: skewX(var(--skew, -10deg)) translateX(-5px) scaleX(0.95);
          }
          75% {
            transform: skewX(var(--skew, -10deg)) translateX(8px) scaleX(1.05);
          }
        }
      `}</style>
    </div>
  );
};
