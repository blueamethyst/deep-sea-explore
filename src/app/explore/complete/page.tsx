'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ExploreCompletePage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-sky-300 flex items-center justify-center text-white text-2xl">결과 불러오는 중...</div>}>
      <ExploreCompleteContent />
    </Suspense>
  );
}

function ExploreCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ocean = searchParams.get('ocean') || '';
  const depth = parseInt(searchParams.get('depth') || '0', 10);
  const newCreatures = parseInt(searchParams.get('new') || '0', 10);
  const duration = parseInt(searchParams.get('duration') || '0', 10);

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return m > 0 ? `${m}분 ${s}초` : `${s}초`;
  };

  const handleRestartExplore = () => {
    router.push('/select-ocean');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-400 flex flex-col items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        {/* 축하 타이틀 */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold text-white mb-4">
            탐험 완료!
          </h1>
          <p className="text-2xl text-blue-100">
            정말 멋진 탐험이었어요!
          </p>
        </div>

        {/* 탐험 기록 카드 */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-6">
            탐험 기록
          </h2>

          {/* 최고 수심 */}
          <div className="bg-blue-50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🌊</div>
              <div>
                <div className="text-sm text-blue-600 mb-1">최고 수심</div>
                <div className="text-3xl font-bold text-blue-900">
                  {depth}m
                </div>
              </div>
            </div>
          </div>

          {/* 새로 만난 생물 */}
          <div className="bg-green-50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">✨</div>
              <div>
                <div className="text-sm text-green-600 mb-1">새로 만난 생물</div>
                <div className="text-3xl font-bold text-green-900">
                  {newCreatures}마리
                </div>
              </div>
            </div>
          </div>

          {/* 탐험 시간 */}
          <div className="bg-purple-50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl">⏱️</div>
              <div>
                <div className="text-sm text-purple-600 mb-1">탐험 시간</div>
                <div className="text-3xl font-bold text-purple-900">
                  {formatDuration(duration)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 버튼들 */}
        <div className="space-y-4">
          <button
            onClick={handleRestartExplore}
            className="w-full min-h-16 bg-yellow-400 text-blue-900 font-bold text-2xl rounded-3xl shadow-2xl active:scale-95 transition-transform"
          >
            다시 탐험하기 🌊
          </button>

          <Link href="/collection" className="block">
            <button className="w-full min-h-16 bg-white text-blue-600 font-bold text-2xl rounded-3xl shadow-xl active:scale-95 transition-transform">
              도감 보기 📖
            </button>
          </Link>

          <Link href="/" className="block">
            <button className="w-full min-h-14 bg-white/80 text-blue-700 font-bold text-xl rounded-3xl shadow-lg active:scale-95 transition-transform">
              메인으로
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
