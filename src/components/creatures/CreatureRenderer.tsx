'use client';

import React from 'react';
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
  animationType,
  onTap,
  isVisible,
  size = 80,
}) => {
  if (!isVisible) return null;

  const animationClass = getAnimationClass(animationType);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTap();
  };

  return (
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
  );
};
