'use client';

import React from 'react';

interface BioluminescenceProps {
  currentDepth: number;
  count?: number;
  className?: string;
}

export const Bioluminescence: React.FC<BioluminescenceProps> = ({
  currentDepth,
  count = 15,
  className = '',
}) => {
  // 약광층(1000m) 이하에서만 활성화
  const isActive = currentDepth >= 1000;

  if (!isActive) return null;

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 2, // 2~5px
    left: Math.random() * 100, // 0~100%
    top: Math.random() * 100, // 0~100%
    delay: Math.random() * 3, // 0~3s
    duration: Math.random() * 2 + 2, // 2~4s
    color: ['#4FC3F7', '#81C784', '#FFD54F', '#BA68C8'][Math.floor(Math.random() * 4)],
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="biolum-particle"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      <style jsx>{`
        .biolum-particle {
          position: absolute;
          border-radius: 50%;
          animation: biolum-twinkle ease-in-out infinite;
          will-change: opacity;
          box-shadow: 0 0 10px currentColor;
        }

        @keyframes biolum-twinkle {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
