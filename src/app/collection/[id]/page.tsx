'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { getCreatureById } from '@/data/creatures';
import { loadStorage } from '@/lib/storage';
import { useTTS } from '@/hooks/useTTS';
import { CreatureImage } from '@/components/creatures/CreatureImage';
import type { CollectedCreature } from '@/types/collection';

const OCEAN_NAMES: Record<string, string> = {
  east_sea: '동해', south_sea: '남해', west_sea: '서해',
  pacific: '태평양', atlantic: '대서양', indian: '인도양',
  arctic: '북극해', antarctic: '남극해',
};

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const creature = getCreatureById(id);
  const [collectedInfo, setCollectedInfo] = useState<CollectedCreature | null>(null);
  const { speak, state: ttsState, highlightIndex, words } = useTTS();

  useEffect(() => {
    const storage = loadStorage();
    const info = storage.collected[id];
    if (info) setCollectedInfo(info);
  }, [id]);

  if (!creature) {
    return (
      <div className="min-h-dvh bg-gradient-to-b from-sky-200 to-blue-300 p-6 flex items-center justify-center">
        <div className="text-white text-2xl font-bold">생물을 찾을 수 없어요</div>
      </div>
    );
  }

  const handleTTSPlay = () => {
    speak(`${creature.name_ko}. ${creature.description_ko}`);
  };

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-200 to-blue-300 p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        <Link href="/collection">
          <button className="mb-4 min-w-12 min-h-12 bg-white/80 rounded-full shadow-lg flex items-center justify-center text-2xl active:scale-95 transition-transform">
            ←
          </button>
        </Link>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* 일러스트 */}
          <div className="bg-gradient-to-b from-blue-100 to-blue-200 p-10 flex flex-col items-center justify-center">
            <CreatureImage creature={creature} useCase="collection_detail" />
            {creature.photo_credit && (
              <p className="text-xs text-gray-400 mt-2">
                Photo: {creature.photo_credit}
              </p>
            )}
          </div>

          <div className="p-8">
            {/* 이름 */}
            <h1 className="text-4xl font-bold text-blue-900 text-center mb-1">
              {creature.name_ko}
            </h1>
            <p className="text-xl text-gray-600 text-center mb-1">
              {creature.name_en}
            </p>
            <p className="text-base text-gray-400 italic text-center mb-6">
              {creature.scientific_name}
            </p>

            {/* 크기 */}
            <div className="bg-blue-50 rounded-2xl p-4 mb-5 text-center">
              <span className="text-lg font-bold text-blue-900">크기: </span>
              <span className="text-lg text-gray-700">약 {creature.size_cm}cm</span>
            </div>

            {/* 설명 + TTS */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-bold text-blue-900">설명</h2>
                <button
                  onClick={handleTTSPlay}
                  className={`min-w-12 min-h-12 rounded-full flex items-center justify-center text-xl active:scale-95 transition-transform ${
                    ttsState === 'speaking' ? 'bg-green-600 text-white' : 'bg-green-500 text-white'
                  }`}
                >
                  {ttsState === 'speaking' ? '⏸' : '🔊'}
                </button>
              </div>

              {/* TTS fallback 하이라이트 모드 */}
              {ttsState === 'error' && words.length > 0 ? (
                <p className="text-xl text-gray-700 leading-relaxed">
                  {words.map((word, i) => (
                    <span
                      key={i}
                      className={i === highlightIndex ? 'bg-yellow-300 rounded px-0.5' : ''}
                    >
                      {word}{' '}
                    </span>
                  ))}
                </p>
              ) : (
                <p className="text-xl text-gray-700 leading-relaxed">
                  {creature.description_ko}
                </p>
              )}
            </div>

            {/* 재미있는 사실 */}
            <div className="bg-yellow-50 rounded-2xl p-5 mb-5">
              <h3 className="text-lg font-bold text-yellow-900 mb-2">재미있는 사실</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                {creature.fun_fact_ko}
              </p>
            </div>

            {/* 만남 기록 */}
            {collectedInfo && (
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-purple-50 rounded-2xl p-4">
                  <div className="text-sm text-purple-700 mb-1">처음 만난 날</div>
                  <div className="text-base font-bold text-purple-900">
                    {new Date(collectedInfo.first_met).toLocaleDateString('ko-KR')}
                  </div>
                </div>
                <div className="bg-cyan-50 rounded-2xl p-4">
                  <div className="text-sm text-cyan-700 mb-1">만난 바다</div>
                  <div className="text-base font-bold text-cyan-900">
                    {OCEAN_NAMES[collectedInfo.ocean] || collectedInfo.ocean}
                  </div>
                </div>
              </div>
            )}

            {/* 서식 수심 */}
            <div className="bg-indigo-50 rounded-2xl p-4 mb-5">
              <div className="text-sm text-indigo-700 mb-1">서식 수심</div>
              <div className="text-base font-bold text-indigo-900">
                {creature.depth_min}m ~ {creature.depth_max}m
              </div>
            </div>

            {/* 먹이 */}
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="text-sm text-green-700 mb-1">먹이</div>
              <div className="text-base font-bold text-green-900">
                {creature.diet}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
