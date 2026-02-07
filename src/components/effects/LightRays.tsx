'use client';

import React from 'react';

interface LightRaysProps {
  currentDepth: number;
  className?: string;
}

export const LightRays: React.FC<LightRaysProps> = ({ currentDepth, className = '' }) => {
  // 햇빛층(0-200m)에서만 표시, 깊어질수록 희미해짐
  const isSunlightZone = currentDepth <= 200;
  const opacity = isSunlightZone ? Math.max(0, 1 - currentDepth / 200) * 0.3 : 0;

  if (opacity === 0) return null;

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`} style={{ opacity }}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="light-ray"
          style={{
            left: `${i * 20 + 10}%`,
            animationDelay: `${i * 0.5}s`,
          }}
        />
      ))}

      <style jsx>{`
        .light-ray {
          position: absolute;
          top: -10%;
          width: 80px;
          height: 120%;
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.05) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform-origin: top center;
          animation: light-ray-sway 8s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes light-ray-sway {
          0%, 100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(20px) rotate(2deg);
          }
        }
      `}</style>
    </div>
  );
};
