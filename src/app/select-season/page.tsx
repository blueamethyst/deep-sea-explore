'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import seasonsData from '@/data/seasons.json';

export default function SelectSeasonPage() {
  const router = useRouter();
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);

  const handleStart = () => {
    if (selectedSeason) {
      const ocean = sessionStorage.getItem('selected_ocean') || 'pacific';
      router.push(`/explore?ocean=${ocean}&season=${selectedSeason}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-300 p-6 flex flex-col">
      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        <Link href="/select-ocean">
          <button className="mb-4 min-w-12 min-h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform">
            ←
          </button>
        </Link>

        <h1 className="text-4xl font-bold text-white text-center mb-8 drop-shadow-lg">
          지금은 어떤 계절이지?
        </h1>

        <div className="grid grid-cols-2 gap-5 mb-auto">
          {seasonsData.map((season) => (
            <button
              key={season.id}
              onClick={() => setSelectedSeason(season.id)}
              className={`aspect-square rounded-3xl shadow-2xl transition-all active:scale-95 ${
                selectedSeason === season.id ? 'ring-4 ring-white scale-105' : ''
              }`}
              style={{ backgroundColor: season.theme_color }}
            >
              <div className="h-full flex flex-col items-center justify-center p-5 text-white">
                <div className="text-7xl mb-3">{season.icon}</div>
                <h3 className="text-3xl font-bold mb-1">{season.name_ko}</h3>
                <p className="text-lg opacity-90">{season.name_en}</p>
                <p className="text-base mt-1">{season.description_ko}</p>
              </div>
            </button>
          ))}
        </div>

        {selectedSeason && (
          <button
            onClick={handleStart}
            className="mt-6 w-full min-h-14 bg-yellow-400 text-blue-900 font-bold text-2xl rounded-3xl shadow-2xl active:scale-95 transition-transform"
          >
            바다로 출발!
          </button>
        )}
      </div>
    </div>
  );
}
