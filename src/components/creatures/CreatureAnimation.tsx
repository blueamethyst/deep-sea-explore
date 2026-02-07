'use client';

import React from 'react';

/**
 * CSS 애니메이션 정의
 * transform만 사용하여 60fps 보장
 */
export const CreatureAnimationStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* swim_wiggle: 좌우 흔들며 이동 */
      @keyframes swim-wiggle {
        0%, 100% {
          transform: translateX(0) rotate(0deg);
        }
        25% {
          transform: translateX(-5px) rotate(-3deg);
        }
        75% {
          transform: translateX(5px) rotate(3deg);
        }
      }

      .animate-swim-wiggle {
        animation: swim-wiggle 2s ease-in-out infinite;
        will-change: transform;
      }

      /* swim_glide: 부드럽게 미끄러지듯 */
      @keyframes swim-glide {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        50% {
          transform: translateY(-10px) translateX(8px);
        }
      }

      .animate-swim-glide {
        animation: swim-glide 4s ease-in-out infinite;
        will-change: transform;
      }

      /* float: 위아래로 둥실 */
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }

      .animate-float {
        animation: float 3s ease-in-out infinite;
        will-change: transform;
      }

      /* pulse: 해파리처럼 쿵쿵 */
      @keyframes pulse {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.1);
        }
      }

      .animate-pulse {
        animation: pulse 1.5s ease-in-out infinite;
        will-change: transform;
      }

      /* crawl: 바닥을 기어가는 */
      @keyframes crawl {
        0%, 100% {
          transform: translateX(0) scaleX(1);
        }
        25% {
          transform: translateX(3px) scaleX(0.95);
        }
        75% {
          transform: translateX(-3px) scaleX(1.05);
        }
      }

      .animate-crawl {
        animation: crawl 3s ease-in-out infinite;
        will-change: transform;
      }

      /* jet: 빠르게 분사 이동 */
      @keyframes jet {
        0%, 100% {
          transform: translateX(0) scaleX(1);
        }
        10% {
          transform: translateX(-8px) scaleX(0.9);
        }
        30% {
          transform: translateX(15px) scaleX(1.1);
        }
        50% {
          transform: translateX(0) scaleX(1);
        }
      }

      .animate-jet {
        animation: jet 2s ease-in-out infinite;
        will-change: transform;
      }

      /* 호버 효과 - 살짝 확대 */
      .creature-hover {
        transition: transform 0.2s ease-out;
      }

      .creature-hover:hover {
        transform: scale(1.15);
      }

      /* 등장 애니메이션 */
      @keyframes creature-appear {
        from {
          opacity: 0;
          transform: scale(0.5);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .animate-appear {
        animation: creature-appear 0.5s ease-out forwards;
      }

      /* 사라짐 애니메이션 */
      @keyframes creature-disappear {
        from {
          opacity: 1;
          transform: scale(1);
        }
        to {
          opacity: 0;
          transform: scale(0.5);
        }
      }

      .animate-disappear {
        animation: creature-disappear 0.3s ease-in forwards;
      }
    `}</style>
  );
};

/**
 * 애니메이션 타입별 클래스 매핑
 */
export const getAnimationClass = (animationType: string): string => {
  const animationMap: Record<string, string> = {
    swim_wiggle: 'animate-swim-wiggle',
    swim_glide: 'animate-swim-glide',
    float: 'animate-float',
    pulse: 'animate-pulse',
    crawl: 'animate-crawl',
    jet: 'animate-jet',
  };

  return animationMap[animationType] || 'animate-float';
};
