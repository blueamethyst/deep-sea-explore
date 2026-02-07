'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import oceansData from '@/data/oceans.json';

export default function SelectOceanPage() {
  const router = useRouter();
  const [selectedOcean, setSelectedOcean] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupOcean, setPopupOcean] = useState<typeof oceansData[0] | null>(null);

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-300 p-6 overflow-auto">
      <div className="max-w-6xl mx-auto">
        <Link href="/">
          <button className="mb-4 min-w-12 min-h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform">
            ←
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-white text-center mb-6 drop-shadow-lg">
          어디 바다로 갈까?
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {oceansData.map((ocean) => (
            <button
              key={ocean.id}
              onClick={() => handleCardClick(ocean)}
              className={`aspect-square rounded-3xl shadow-xl transition-all active:scale-95 ${
                selectedOcean === ocean.id ? 'ring-4 ring-white scale-105' : ''
              }`}
              style={{ backgroundColor: ocean.color }}
            >
              <div className="h-full flex flex-col items-center justify-center p-4 text-white">
                <div className="text-5xl mb-2">🌊</div>
                <h3 className="text-xl font-bold mb-1">{ocean.name_ko}</h3>
                <p className="text-sm opacity-80">{ocean.name_en}</p>
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
            className="max-w-md w-full rounded-3xl shadow-2xl p-8"
            style={{ backgroundColor: popupOcean.color }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-white text-center">
              <div className="text-7xl mb-4">🌊</div>
              <h2 className="text-3xl font-bold mb-2">{popupOcean.name_ko}</h2>
              <p className="text-xl mb-1 opacity-90">{popupOcean.name_en}</p>
              <p className="text-lg mb-2">최대 수심: {popupOcean.max_depth}m</p>
              <p className="text-base mb-6 leading-relaxed">{popupOcean.description_ko}</p>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full min-h-12 bg-white text-blue-900 font-bold text-lg rounded-2xl active:scale-95 transition-transform"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
