'use client';

import React from 'react';

/**
 * 정글 동물 CSS 애니메이션 정의
 * transform만 사용하여 60fps 보장
 */
export const AnimalAnimationStyles: React.FC = () => {
  return (
    <style jsx global>{`
      /* walk: 좌우로 걷기 */
      @keyframes animal-walk {
        0%, 100% {
          transform: translateX(0) translateY(0);
        }
        25% {
          transform: translateX(-8px) translateY(-2px);
        }
        75% {
          transform: translateX(8px) translateY(-2px);
        }
      }

      .animate-walk {
        animation: animal-walk 2.5s ease-in-out infinite;
        will-change: transform;
      }

      /* hop: 통통 뛰기 */
      @keyframes animal-hop {
        0%, 100% {
          transform: translateY(0) scaleY(1);
        }
        15% {
          transform: translateY(0) scaleY(0.9) scaleX(1.05);
        }
        40% {
          transform: translateY(-20px) scaleY(1.05) scaleX(0.95);
        }
        60% {
          transform: translateY(-18px) scaleY(1.02);
        }
        80% {
          transform: translateY(0) scaleY(0.92) scaleX(1.04);
        }
      }

      .animate-hop {
        animation: animal-hop 1.8s ease-in-out infinite;
        will-change: transform;
      }

      /* climb: 위로 기어오르기 */
      @keyframes animal-climb {
        0%, 100% {
          transform: translateY(0) rotate(0deg);
        }
        25% {
          transform: translateY(-6px) rotate(-2deg);
        }
        50% {
          transform: translateY(-12px) rotate(0deg);
        }
        75% {
          transform: translateY(-6px) rotate(2deg);
        }
      }

      .animate-climb {
        animation: animal-climb 3s ease-in-out infinite;
        will-change: transform;
      }

      /* fly: 날갯짓 */
      @keyframes animal-fly {
        0%, 100% {
          transform: translateY(0) translateX(0);
        }
        25% {
          transform: translateY(-12px) translateX(5px);
        }
        50% {
          transform: translateY(-8px) translateX(-3px);
        }
        75% {
          transform: translateY(-15px) translateX(3px);
        }
      }

      .animate-fly {
        animation: animal-fly 2.5s ease-in-out infinite;
        will-change: transform;
      }

      /* crawl: 바닥 기어가기 */
      @keyframes animal-crawl {
        0%, 100% {
          transform: translateX(0) scaleX(1);
        }
        25% {
          transform: translateX(4px) scaleX(0.95);
        }
        75% {
          transform: translateX(-4px) scaleX(1.05);
        }
      }

      .animate-animal-crawl {
        animation: animal-crawl 3.5s ease-in-out infinite;
        will-change: transform;
      }

      /* swing: 나뭇가지 흔들기 */
      @keyframes animal-swing {
        0%, 100% {
          transform: rotate(0deg) translateX(0);
        }
        25% {
          transform: rotate(-8deg) translateX(-5px);
        }
        75% {
          transform: rotate(8deg) translateX(5px);
        }
      }

      .animate-swing {
        animation: animal-swing 2.8s ease-in-out infinite;
        transform-origin: top center;
        will-change: transform;
      }

      /* 정글 동물 호버 */
      .animal-hover {
        transition: transform 0.2s ease-out;
      }

      .animal-hover:hover {
        transform: scale(1.15);
      }

      /* 등장 애니메이션 */
      .animate-animal-appear {
        animation: creature-appear 0.5s ease-out forwards;
      }
    `}</style>
  );
};

/**
 * 정글 애니메이션 타입별 클래스 매핑
 */
export const getAnimalAnimationClass = (animationType: string): string => {
  const animationMap: Record<string, string> = {
    walk: 'animate-walk',
    hop: 'animate-hop',
    climb: 'animate-climb',
    fly: 'animate-fly',
    crawl: 'animate-animal-crawl',
    swing: 'animate-swing',
  };

  return animationMap[animationType] || 'animate-walk';
};
