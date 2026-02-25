'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { allCreatures } from '@/data/creatures';
import { allAnimals } from '@/data/animals';
import { loadStorage } from '@/lib/storage';
import { CreatureImage } from '@/components/creatures/CreatureImage';
import { CreatureSVG } from '@/components/creatures/CreatureSVG';
import { AnimalSVG } from '@/components/creatures/AnimalSVG';
import type { Creature } from '@/types/creature';
import type { JungleAnimal } from '@/types/jungle';
import Image from 'next/image';

type GameMode = 'ocean' | 'jungle';
type FilterType = 'all' | 'ocean' | 'depth' | 'name' | 'zone';

const OCEAN_NAMES: Record<string, string> = {
  east_sea: '동해', south_sea: '남해', west_sea: '서해',
  pacific: '태평양', atlantic: '대서양', indian: '인도양',
  arctic: '북극해', antarctic: '남극해',
};

const ZONE_NAMES: Record<string, string> = {
  sunlight: '햇빛층', twilight: '중광층', midnight: '약광층',
  abyssal: '무광층', hadal: '초심해층',
};

const JUNGLE_ZONE_NAMES: Record<string, string> = {
  river_edge: '강가 입구', forest_floor: '숲 바닥', understory: '덩굴숲',
  high_canopy: '높은 나무', parrot_world: '앵무새 월드',
};

export default function CollectionPage() {
  const [mode, setMode] = useState<GameMode>('ocean');
  const [filter, setFilter] = useState<FilterType>('all');
  const [subFilter, setSubFilter] = useState<string>('');
  const [collected, setCollected] = useState<Record<string, unknown>>({});
  const [jungleCollected, setJungleCollected] = useState<Record<string, unknown>>({});
  const [badges, setBadges] = useState<string[]>([]);
  const [jungleBadges, setJungleBadges] = useState<string[]>([]);

  useEffect(() => {
    const storage = loadStorage();
    setCollected(storage.collected);
    setJungleCollected(storage.jungleCollected);
    setBadges(storage.badges);
    setJungleBadges(storage.jungleBadges);
  }, []);

  // 바다 통계
  const oceanCollectedCount = Object.keys(collected).length;
  const oceanTotal = allCreatures.length;
  const oceanRate = Math.round((oceanCollectedCount / oceanTotal) * 100);

  // 정글 통계
  const jungleCollectedCount = Object.keys(jungleCollected).length;
  const jungleTotal = allAnimals.length;
  const jungleRate = jungleTotal > 0 ? Math.round((jungleCollectedCount / jungleTotal) * 100) : 0;

  // 바다 정렬
  const sortedCreatures = useMemo(() => {
    let list = [...allCreatures];

    if (filter === 'ocean' && subFilter) {
      list = list.filter(c => c.oceans.includes(subFilter));
    } else if (filter === 'depth' && subFilter) {
      list = list.filter(c => c.zone === subFilter);
    } else if (filter === 'name') {
      list.sort((a, b) => a.name_ko.localeCompare(b.name_ko, 'ko'));
    }

    list.sort((a, b) => {
      const aCollected = a.id in collected ? 0 : 1;
      const bCollected = b.id in collected ? 0 : 1;
      return aCollected - bCollected;
    });

    return list;
  }, [filter, subFilter, collected]);

  // 정글 정렬
  const sortedAnimals = useMemo(() => {
    let list = [...allAnimals];

    if (filter === 'zone' && subFilter) {
      list = list.filter(a => a.zone === subFilter);
    } else if (filter === 'name') {
      list.sort((a, b) => a.name_ko.localeCompare(b.name_ko, 'ko'));
    }

    list.sort((a, b) => {
      const aCollected = a.id in jungleCollected ? 0 : 1;
      const bCollected = b.id in jungleCollected ? 0 : 1;
      return aCollected - bCollected;
    });

    return list;
  }, [filter, subFilter, jungleCollected]);

  const handleModeChange = (newMode: GameMode) => {
    setMode(newMode);
    setFilter('all');
    setSubFilter('');
  };

  return (
    <div className={`min-h-dvh overflow-auto ${
      mode === 'ocean'
        ? 'bg-gradient-to-b from-sky-200 to-blue-300'
        : 'bg-gradient-to-b from-green-200 to-emerald-300'
    }`}>
      <div className="max-w-6xl mx-auto p-6">
        {/* 뒤로가기 */}
        <Link href="/">
          <button className="mb-4 min-w-12 min-h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform">
            ←
          </button>
        </Link>

        {/* 바다/정글 모드 탭 */}
        <div className="flex gap-2 mb-4 justify-center">
          <button
            onClick={() => handleModeChange('ocean')}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
              mode === 'ocean'
                ? 'bg-blue-500 text-white shadow-lg scale-105'
                : 'bg-white/70 text-gray-700'
            }`}
          >
            🌊 바다 도감
          </button>
          <button
            onClick={() => handleModeChange('jungle')}
            className={`px-6 py-3 rounded-2xl font-bold text-lg transition-all ${
              mode === 'jungle'
                ? 'bg-green-600 text-white shadow-lg scale-105'
                : 'bg-white/70 text-gray-700'
            }`}
          >
            🌿 정글 도감
          </button>
        </div>

        {/* 타이틀 */}
        <h1 className={`text-4xl font-bold text-center mb-4 drop-shadow-lg ${
          mode === 'ocean' ? 'text-white' : 'text-white'
        }`}>
          {mode === 'ocean' ? '내 바다 도감' : '내 정글 도감'}
        </h1>

        {/* 수집률 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xl font-bold ${mode === 'ocean' ? 'text-blue-900' : 'text-green-900'}`}>
              {mode === 'ocean' ? `${oceanCollectedCount}/${oceanTotal}` : `${jungleCollectedCount}/${jungleTotal}`} 발견!
            </span>
            <span className={`text-xl font-bold ${mode === 'ocean' ? 'text-blue-600' : 'text-green-600'}`}>
              {mode === 'ocean' ? oceanRate : jungleRate}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                mode === 'ocean'
                  ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                  : 'bg-gradient-to-r from-green-400 to-green-600'
              }`}
              style={{ width: `${mode === 'ocean' ? oceanRate : jungleRate}%` }}
            />
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {mode === 'ocean' ? (
            <>
              {[
                { id: 'all', label: '전체' },
                { id: 'ocean', label: '바다별' },
                { id: 'depth', label: '수심별' },
                { id: 'name', label: '이름순' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setFilter(tab.id as FilterType); setSubFilter(''); }}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-base whitespace-nowrap transition-all ${
                    filter === tab.id ? 'bg-white text-blue-600 shadow-lg scale-105' : 'bg-white/70 text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </>
          ) : (
            <>
              {[
                { id: 'all', label: '전체' },
                { id: 'zone', label: '구역별' },
                { id: 'name', label: '이름순' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { setFilter(tab.id as FilterType); setSubFilter(''); }}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-base whitespace-nowrap transition-all ${
                    filter === tab.id ? 'bg-white text-green-600 shadow-lg scale-105' : 'bg-white/70 text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </>
          )}
        </div>

        {/* 서브 필터 */}
        {mode === 'ocean' && filter === 'ocean' && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {Object.entries(OCEAN_NAMES).map(([id, name]) => (
              <button
                key={id}
                onClick={() => setSubFilter(subFilter === id ? '' : id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  subFilter === id ? 'bg-blue-600 text-white' : 'bg-white/60 text-gray-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        {mode === 'ocean' && filter === 'depth' && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {Object.entries(ZONE_NAMES).map(([id, name]) => (
              <button
                key={id}
                onClick={() => setSubFilter(subFilter === id ? '' : id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  subFilter === id ? 'bg-blue-600 text-white' : 'bg-white/60 text-gray-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
        {mode === 'jungle' && filter === 'zone' && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {Object.entries(JUNGLE_ZONE_NAMES).map(([id, name]) => (
              <button
                key={id}
                onClick={() => setSubFilter(subFilter === id ? '' : id)}
                className={`px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                  subFilter === id ? 'bg-green-600 text-white' : 'bg-white/60 text-gray-700'
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}

        {/* 생물/동물 그리드 */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-6">
          {mode === 'ocean' ? (
            sortedCreatures.map((creature) => {
              const isOwned = creature.id in collected;
              return (
                <Link
                  key={creature.id}
                  href={isOwned ? `/collection/${creature.id}` : '#'}
                  className={`aspect-square rounded-2xl shadow-lg transition-all ${
                    isOwned ? 'bg-white active:scale-95' : 'bg-gray-800/50'
                  }`}
                >
                  <div className="h-full flex flex-col items-center justify-center p-2">
                    {isOwned ? (
                      <>
                        <div className="w-14 h-14 mb-1">
                          <CreatureImage creature={creature} useCase="collection_grid" />
                        </div>
                        <p className="text-xs font-bold text-gray-800 text-center leading-tight">
                          {creature.name_ko}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 mb-1 opacity-20">
                          <CreatureSVG svgId={creature.svg_id} size={56} />
                        </div>
                        <p className="text-xs font-bold text-gray-400 text-center">???</p>
                      </>
                    )}
                  </div>
                </Link>
              );
            })
          ) : (
            sortedAnimals.map((animal) => {
              const isOwned = animal.id in jungleCollected;
              return (
                <div
                  key={animal.id}
                  className={`aspect-square rounded-2xl shadow-lg transition-all ${
                    isOwned ? 'bg-white' : 'bg-gray-800/50'
                  }`}
                >
                  <div className="h-full flex flex-col items-center justify-center p-2">
                    {isOwned ? (
                      <>
                        <div className="w-14 h-14 mb-1 flex items-center justify-center overflow-hidden rounded-xl">
                          {animal.photo_url ? (
                            <Image
                              src={animal.photo_url}
                              alt={animal.name_ko}
                              width={56}
                              height={56}
                              className="rounded-xl object-cover"
                              style={{ width: 56, height: 56 }}
                              onError={() => {}}
                            />
                          ) : (
                            <AnimalSVG svgId={animal.svg_id} size={56} />
                          )}
                        </div>
                        <p className="text-xs font-bold text-gray-800 text-center leading-tight">
                          {animal.name_ko}
                        </p>
                        {animal.is_rescue_target && (
                          <span className="text-xs">🦜</span>
                        )}
                      </>
                    ) : (
                      <>
                        <div className="w-14 h-14 mb-1 opacity-20">
                          <AnimalSVG svgId={animal.svg_id} size={56} />
                        </div>
                        <p className="text-xs font-bold text-gray-400 text-center">???</p>
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 배지 갤러리 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5">
          <h2 className={`text-xl font-bold mb-3 ${mode === 'ocean' ? 'text-blue-900' : 'text-green-900'}`}>
            획득 배지
          </h2>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {(mode === 'ocean' ? badges : jungleBadges).length > 0 ? (
              (mode === 'ocean' ? badges : jungleBadges).map((badgeId) => (
                <div key={badgeId} className={`aspect-square rounded-2xl flex items-center justify-center ${
                  mode === 'ocean' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <div className="text-3xl">🌟</div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 py-4">
                아직 배지가 없어요! 탐험해서 배지를 모아봐요!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
