'use client';

import React, { useState } from 'react';
import Image from 'next/image';
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
  const [imgError, setImgError] = useState(false);

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
      {animal.photo_url && !imgError ? (
        <div
          className="rounded-full overflow-hidden shadow-lg border-2 border-white/60 bg-green-900/30"
          style={{ width: size, height: size }}
        >
          <Image
            src={animal.photo_url}
            alt={animal.name_ko}
            width={size}
            height={size}
            className="object-cover"
            style={{ width: size, height: size }}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <AnimalSVG svgId={animal.svg_id} size={size} />
      )}
    </div>
  );
};
