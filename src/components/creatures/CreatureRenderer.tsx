'use client';

import React, { useEffect, useRef, useState } from 'react';
import { CreatureSVG } from './CreatureSVG';
import { getAnimationClass } from './CreatureAnimation';

interface CreatureRendererProps {
  creature: { id: string; svg_id: string; name_ko: string };
  x: number;
  y: number;
  animationType: string;
  onTap: () => void;
  isVisible: boolean;
  size?: number;
}

export const CreatureRenderer: React.FC<CreatureRendererProps> = ({
  creature,
  x,
  y,
  animationType,
  onTap,
  isVisible,
  size = 80,
}) => {
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '50px',
        threshold: 0.01,
      }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTap();
  };

  if (!isVisible) return null;

  const animationClass = getAnimationClass(animationType);

  return (
    <div
      ref={containerRef}
      className="absolute creature-container"
      style={{
        left: `${x}%`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      {isInView && (
        <div
          className={`creature-hover cursor-pointer ${animationClass} animate-appear`}
          onClick={handleClick}
          onTouchEnd={handleClick}
          role="button"
          tabIndex={0}
          aria-label={`${creature.name_ko} 탭하기`}
        >
          <CreatureSVG svgId={creature.svg_id} size={size} />
        </div>
      )}
    </div>
  );
};
