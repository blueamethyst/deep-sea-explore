'use client';

import React from 'react';
import { AnimalSVG } from './AnimalSVG';
import { getAnimalAnimationClass } from './AnimalAnimation';

interface AnimalRendererProps {
  animal: { id: string; svg_id: string; name_ko: string; photo_url: string; photo_credit?: string };
  x: number;
  y: number;
  animationType: string;
  onTap: () => void;
  isVisible: boolean;
  size?: number;
}

export const AnimalRenderer: React.FC<AnimalRendererProps> = ({
  animal,
  animationType,
  onTap,
  isVisible,
  size = 80,
}) => {
  if (!isVisible) return null;

  const animationClass = getAnimalAnimationClass(animationType);

  const handleClick = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onTap();
  };

  return (
    <div
      className={`animal-hover cursor-pointer ${animationClass} animate-animal-appear`}
      onClick={handleClick}
      onTouchEnd={handleClick}
      role="button"
      tabIndex={0}
      aria-label={`${animal.name_ko} 탭하기`}
    >
      <AnimalSVG svgId={animal.svg_id} size={size} />
    </div>
  );
};
