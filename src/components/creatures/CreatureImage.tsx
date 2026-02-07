'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CreatureSVG } from './CreatureSVG';
import type { Creature } from '@/types/creature';

type UseCase = 'exploration' | 'popup' | 'collection_grid' | 'collection_detail';

interface CreatureImageProps {
  creature: Pick<Creature, 'svg_id' | 'name_ko' | 'photo_url' | 'photo_credit'>;
  useCase: UseCase;
  className?: string;
}

const SIZE_MAP: Record<UseCase, number> = {
  exploration: 80,
  popup: 140,
  collection_grid: 56,
  collection_detail: 180,
};

export const CreatureImage: React.FC<CreatureImageProps> = ({
  creature,
  useCase,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const size = SIZE_MAP[useCase];

  // exploration은 항상 SVG (애니메이션 호환)
  if (useCase === 'exploration') {
    return <CreatureSVG svgId={creature.svg_id} size={size} className={className} />;
  }

  // 사진 URL이 없거나 로딩 실패 시 SVG 폴백
  if (!creature.photo_url || imgError) {
    return <CreatureSVG svgId={creature.svg_id} size={size} className={className} />;
  }

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <Image
        src={creature.photo_url}
        alt={creature.name_ko}
        width={size}
        height={size}
        className="rounded-2xl object-cover"
        style={{ width: size, height: size }}
        onError={() => setImgError(true)}
      />
    </div>
  );
};
