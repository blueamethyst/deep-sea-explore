'use client';

import React from 'react';

interface SubmarineLightProps {
  isActive: boolean;
  submarineX: number;
  submarineY: number;
  className?: string;
}

export const SubmarineLight: React.FC<SubmarineLightProps> = ({
  isActive,
  submarineX,
  submarineY,
  className = '',
}) => {
  if (!isActive) return null;

  return (
    <div
      className={`fixed pointer-events-none ${className}`}
      style={{
        left: submarineX,
        top: submarineY,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div className="submarine-light-cone" />

      <style jsx>{`
        .submarine-light-cone {
          width: 300px;
          height: 200px;
          background: radial-gradient(
            ellipse at 0% 50%,
            rgba(255, 230, 109, 0.4) 0%,
            rgba(255, 230, 109, 0.2) 40%,
            rgba(255, 230, 109, 0) 100%
          );
          clip-path: polygon(0% 50%, 100% 0%, 100% 100%);
          animation: light-pulse 2s ease-in-out infinite;
          will-change: opacity;
        }

        @keyframes light-pulse {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};
