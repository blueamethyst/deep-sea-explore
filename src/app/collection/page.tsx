'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { allCreatures } from '@/data/creatures';
import { loadStorage } from '@/lib/storage';
import { CreatureSVG } from '@/components/creatures/CreatureSVG';
import type { Creature } from '@/types/creature';

type FilterType = 'all' | 'ocean' | 'depth' | 'name';

const OCEAN_NAMES: Record<string, string> = {
  east_sea: '동해', south_sea: '남해', west_sea: '서해',
  pacific: '태평양', atlantic: '대서양', indian: '인도양',
  arctic: '북극해', antarctic: '남극해',
};

const ZONE_NAMES: Record<string, string> = {
  sunlight: '햇빛층', twilight: '중광층', midnight: '약광층',
  abyssal: '무광층', hadal: '초심해층',
};

export default function CollectionPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [subFilter, setSubFilter] = useState<string>('');
  const [collected, setCollected] = useState<Record<string, unknown>>({});
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    const storage = loadStorage();
    setCollected(storage.collected);
    setBadges(storage.badges);
  }, []);

  const collectedCount = Object.keys(collected).length;
  const totalCreatures = allCreatures.length;
  const collectionRate = Math.round((collectedCount / totalCreatures) * 100);

  const sortedCreatures = useMemo(() => {
    let list = [...allCreatures];

    if (filter === 'ocean' && subFilter) {
      list = list.filter(c => c.oceans.includes(subFilter));
    } else if (filter === 'depth' && subFilter) {
      list = list.filter(c => c.zone === subFilter);
    } else if (filter === 'name') {
      list.sort((a, b) => a.name_ko.localeCompare(b.name_ko, 'ko'));
    }

    // 수집된 것을 앞에
    list.sort((a, b) => {
      const aCollected = a.id in collected ? 0 : 1;
      const bCollected = b.id in collected ? 0 : 1;
      return aCollected - bCollected;
    });

    return list;
  }, [filter, subFilter, collected]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-blue-300 overflow-auto">
      <div className="max-w-6xl mx-auto p-6">
        {/* 뒤로가기 */}
        <Link href="/">
          <button className="mb-4 min-w-12 min-h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform">
            ←
          </button>
        </Link>

        {/* 타이틀 */}
        <h1 className="text-4xl font-bold text-white text-center mb-4 drop-shadow-lg">
          내 바다 도감
        </h1>

        {/* 수집률 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5 mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xl font-bold text-blue-900">
              {collectedCount}/{totalCreatures} 발견!
            </span>
            <span className="text-xl font-bold text-blue-600">
              {collectionRate}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-500 rounded-full"
              style={{ width: `${collectionRate}%` }}
            />
          </div>
        </div>

        {/* 필터 탭 */}
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
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
                filter === tab.id
                  ? 'bg-white text-blue-600 shadow-lg scale-105'
                  : 'bg-white/70 text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 서브 필터 (바다별/수심별) */}
        {filter === 'ocean' && (
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
        {filter === 'depth' && (
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

        {/* 생물 그리드 */}
        <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-6">
          {sortedCreatures.map((creature) => {
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
                        <CreatureSVG svgId={creature.svg_id} size={56} />
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
                      <p className="text-xs font-bold text-gray-400 text-center">
                        ???
                      </p>
                    </>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* 배지 갤러리 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-5">
          <h2 className="text-xl font-bold text-blue-900 mb-3">획득 배지</h2>
          <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
            {badges.length > 0 ? (
              badges.map((badgeId) => (
                <div key={badgeId} className="aspect-square rounded-2xl bg-yellow-100 flex items-center justify-center">
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
