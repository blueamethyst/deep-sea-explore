'use client';

import React from 'react';

interface BubblesProps {
  count?: number;
  className?: string;
}

export const Bubbles: React.FC<BubblesProps> = ({ count = 8, className = '' }) => {
  const bubbles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4, // 4~12px
    left: Math.random() * 100, // 0~100%
    delay: Math.random() * 5, // 0~5s
    duration: Math.random() * 4 + 6, // 6~10s
  }));

  return (
    <div className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: `${bubble.left}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            animationDelay: `${bubble.delay}s`,
            animationDuration: `${bubble.duration}s`,
          }}
        />
      ))}

      <style jsx>{`
        .bubble {
          position: absolute;
          bottom: -20px;
          background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.3));
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: bubble-rise linear infinite;
          will-change: transform;
        }

        @keyframes bubble-rise {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100vh) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
