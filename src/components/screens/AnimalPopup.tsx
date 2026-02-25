'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimalSVG } from '@/components/creatures/AnimalSVG';
import Image from 'next/image';

export interface AnimalPopupProps {
  animal: {
    id: string;
    name_ko: string;
    name_en: string;
    greeting_ko: string;
    greeting_en: string;
    greeting_revisit_ko: string;
    description_ko: string;
    fun_fact_ko: string;
    svg_id: string;
    photo_url: string;
    photo_credit?: string;
  };
  isNew: boolean;
  onClose: () => void;
  onMoreInfo?: () => void;
  onTTSPlay?: (text: string) => void;
}

export default function AnimalPopup({
  animal,
  isNew,
  onClose,
  onMoreInfo,
  onTTSPlay,
}: AnimalPopupProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);

  const greeting = isNew ? animal.greeting_ko : animal.greeting_revisit_ko;

  const handleMoreInfo = () => {
    setShowDetails(true);
    onMoreInfo?.();
  };

  const handleTTSPlay = () => {
    const text = showDetails
      ? `${animal.description_ko} ${animal.fun_fact_ko}`
      : greeting;
    onTTSPlay?.(text);
  };

  const renderImage = (size: number) => {
    if (animal.photo_url && !imgError) {
      return (
        <Image
          src={animal.photo_url}
          alt={animal.name_ko}
          width={size}
          height={size}
          className="rounded-2xl object-cover"
          style={{ width: size, height: size }}
          onError={() => setImgError(true)}
        />
      );
    }
    return <AnimalSVG svgId={animal.svg_id} size={size} />;
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8"
          onClick={(e) => e.stopPropagation()}
        >
          {!showDetails ? (
            <>
              {/* 동물 이미지 */}
              <div className="w-48 h-48 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                {renderImage(140)}
              </div>

              {/* 새 동물 뱃지 */}
              {isNew && (
                <div className="text-center mb-4">
                  <span className="bg-green-500 text-white font-bold text-lg px-6 py-2 rounded-full inline-block">
                    도감에 추가되었어요!
                  </span>
                </div>
              )}

              {/* 인사 말풍선 */}
              <div className="bg-green-50 rounded-3xl p-6 mb-6 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[12px] border-b-green-50" />
                <p className="text-2xl text-gray-800 text-center leading-relaxed mb-2">
                  {greeting}
                </p>
                <p className="text-lg text-gray-600 text-center">
                  {animal.greeting_en}
                </p>
              </div>

              {/* 버튼 */}
              <div className="flex gap-3">
                <button
                  onClick={handleMoreInfo}
                  className="flex-1 min-h-14 bg-green-600 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-transform active:scale-95"
                >
                  더 알아보기
                </button>
                <button
                  onClick={onClose}
                  className="min-w-14 min-h-14 bg-gray-200 text-gray-700 font-bold text-xl rounded-2xl hover:scale-105 transition-transform active:scale-95"
                >
                  X
                </button>
              </div>
            </>
          ) : (
            <>
              {/* 동물 이미지 */}
              <div className="w-40 h-40 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center overflow-hidden">
                {renderImage(140)}
              </div>

              {/* 이름 */}
              <h2 className="text-3xl font-bold text-center text-green-900 mb-2">
                {animal.name_ko}
              </h2>
              <p className="text-xl text-center text-gray-600 mb-6">
                {animal.name_en}
              </p>

              {/* 설명 */}
              <div className="bg-green-50 rounded-2xl p-6 mb-4">
                <p className="text-xl text-gray-800 leading-relaxed">
                  {animal.description_ko}
                </p>
              </div>

              {/* 재미있는 사실 */}
              <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
                <h3 className="text-lg font-bold text-yellow-900 mb-2">
                  재미있는 사실
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {animal.fun_fact_ko}
                </p>
              </div>

              {/* TTS + 닫기 */}
              <div className="flex gap-3">
                {onTTSPlay && (
                  <button
                    onClick={handleTTSPlay}
                    className="min-w-14 min-h-14 bg-green-500 text-white font-bold text-2xl rounded-2xl hover:scale-105 transition-transform active:scale-95"
                  >
                    🔊
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex-1 min-h-14 bg-green-600 text-white font-bold text-lg rounded-2xl hover:scale-105 transition-transform active:scale-95"
                >
                  닫기
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
