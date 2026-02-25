'use client';

import React, { useState, useEffect } from 'react';

interface FirefliesProps {
  currentDistance: number;
  className?: string;
}

const FIREFLY_COLORS = ['#FFEB3B', '#76FF03', '#FFC107', '#CDDC39', '#AEEA00', '#FFD600'];

export const Fireflies: React.FC<FirefliesProps> = ({ currentDistance, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [fireflies] = useState(() => Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 3,
    left: Math.random() * 90 + 5,
    top: Math.random() * 80 + 10,
    delay: Math.random() * 4,
    floatDuration: Math.random() * 3 + 2,
    driftDuration: Math.random() * 4 + 4,
    color: FIREFLY_COLORS[Math.floor(Math.random() * FIREFLY_COLORS.length)],
    driftX: Math.random() * 40 - 20,
    driftY: Math.random() * 30 - 15,
  })));

  // forest_floor(2-5km)과 understory(5-8km)에서만 활성화
  const isActive = currentDistance >= 2 && currentDistance <= 8;
  if (!mounted || !isActive) return null;

  const distFromCenter = Math.abs(currentDistance - 5);
  const opacity = Math.max(0, 1 - distFromCenter / 3.5);

  return (
    <div
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ opacity, transition: 'opacity 0.8s ease' }}
    >
      {fireflies.map((fly) => (
        <div
          key={fly.id}
          className="firefly-drift"
          style={{
            left: `${fly.left}%`,
            top: `${fly.top}%`,
            animationDelay: `${fly.delay}s`,
            animationDuration: `${fly.driftDuration}s`,
            ['--drift-x' as string]: `${fly.driftX}px`,
            ['--drift-y' as string]: `${fly.driftY}px`,
          }}
        >
          <div
            className="firefly-glow"
            style={{
              width: `${fly.size}px`,
              height: `${fly.size}px`,
              backgroundColor: fly.color,
              boxShadow: `0 0 ${fly.size * 2}px ${fly.color}, 0 0 ${fly.size * 4}px ${fly.color}80`,
              animationDelay: `${fly.delay + 0.5}s`,
              animationDuration: `${fly.floatDuration}s`,
            }}
          />
        </div>
      ))}

      <style jsx>{`
        .firefly-drift {
          position: absolute;
          animation: firefly-drift ease-in-out infinite alternate;
          will-change: transform;
        }

        .firefly-glow {
          border-radius: 50%;
          animation: firefly-blink ease-in-out infinite;
          will-change: opacity;
        }

        @keyframes firefly-drift {
          0% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(var(--drift-x), var(--drift-y));
          }
          66% {
            transform: translate(calc(var(--drift-x) * -0.7), calc(var(--drift-y) * 0.5));
          }
          100% {
            transform: translate(calc(var(--drift-x) * 0.3), calc(var(--drift-y) * -1));
          }
        }

        @keyframes firefly-blink {
          0%, 100% {
            opacity: 0.15;
          }
          20% {
            opacity: 1;
          }
          40% {
            opacity: 0.3;
          }
          60% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};
