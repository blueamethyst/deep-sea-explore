'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import oceansData from '@/data/oceans.json';

export default function SelectOceanPage() {
  const router = useRouter();
  const [selectedOcean, setSelectedOcean] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupOcean, setPopupOcean] = useState<typeof oceansData[0] | null>(null);
  const [imgErrors, setImgErrors] = useState<Record<string, boolean>>({});

  const handleCardClick = (ocean: typeof oceansData[0]) => {
    setSelectedOcean(ocean.id);
    setPopupOcean(ocean);
    setShowPopup(true);
  };

  const handleStart = () => {
    if (selectedOcean) {
      sessionStorage.setItem('selected_ocean', selectedOcean);
      router.push('/select-season');
    }
  };

  const handleImgError = (oceanId: string) => {
    setImgErrors(prev => ({ ...prev, [oceanId]: true }));
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-200 to-blue-300 p-4 pb-20 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <Link href="/">
          <button className="mb-2 min-w-12 min-h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform">
            ←
          </button>
        </Link>

        <h1 className="text-3xl font-bold text-white text-center mb-4 drop-shadow-lg">
          어디 바다로 갈까?
        </h1>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {oceansData.map((ocean) => (
            <button
              key={ocean.id}
              onClick={() => handleCardClick(ocean)}
              className={`aspect-[4/3] rounded-3xl shadow-xl transition-all active:scale-95 overflow-hidden relative ${
                selectedOcean === ocean.id ? 'ring-4 ring-white scale-105' : ''
              }`}
            >
              {/* 배경 이미지 */}
              {ocean.image_url && !imgErrors[ocean.id] ? (
                <Image
                  src={ocean.image_url}
                  alt={ocean.name_ko}
                  fill
                  className="object-cover"
                  onError={() => handleImgError(ocean.id)}
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              ) : (
                <div className="absolute inset-0" style={{ backgroundColor: ocean.color }} />
              )}

              {/* 오버레이 + 텍스트 */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="relative h-full flex flex-col items-center justify-end p-4 text-white">
                <h3 className="text-xl font-bold mb-0.5 drop-shadow-lg">{ocean.name_ko}</h3>
                <p className="text-sm opacity-90 drop-shadow-lg">{ocean.name_en}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedOcean && (
          <button
            onClick={handleStart}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 min-w-56 min-h-14 bg-yellow-400 text-blue-900 font-bold text-2xl rounded-3xl shadow-2xl active:scale-95 transition-transform"
          >
            출발!
          </button>
        )}
      </div>

      {showPopup && popupOcean && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="max-w-md w-full rounded-3xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 팝업 이미지 */}
            <div className="relative h-48 w-full">
              {popupOcean.image_url && !imgErrors[popupOcean.id] ? (
                <Image
                  src={popupOcean.image_url}
                  alt={popupOcean.name_ko}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                />
              ) : (
                <div className="absolute inset-0" style={{ backgroundColor: popupOcean.color }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-0 right-0 text-center text-white">
                <h2 className="text-3xl font-bold drop-shadow-lg">{popupOcean.name_ko}</h2>
                <p className="text-lg opacity-90 drop-shadow-lg">{popupOcean.name_en}</p>
              </div>
            </div>

            {/* 팝업 정보 */}
            <div className="p-6 text-center" style={{ backgroundColor: popupOcean.color }}>
              <div className="text-white">
                <p className="text-lg mb-2 font-bold">최대 수심: {popupOcean.max_depth}m</p>
                <p className="text-base mb-6 leading-relaxed opacity-90">{popupOcean.description_ko}</p>
                <button
                  onClick={() => setShowPopup(false)}
                  className="w-full min-h-12 bg-white text-blue-900 font-bold text-lg rounded-2xl active:scale-95 transition-transform"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
