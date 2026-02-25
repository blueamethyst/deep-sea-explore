'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { loadStorage } from '@/lib/storage';
import { RESCUE_PARROTS } from '@/types/jungle';

function JungleCompleteContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const distance = searchParams.get('distance') || '0';
  const newAnimals = searchParams.get('new') || '0';
  const duration = searchParams.get('duration') || '0';

  const [storage] = useState(() => loadStorage());

  const rescuedCount = storage.jungleMission.rescued.length;
  const isAllRescued = rescuedCount >= 5;
  const totalCollected = Object.keys(storage.jungleCollected).length;
  const durationMin = Math.floor(Number(duration) / 60);
  const durationSec = Number(duration) % 60;

  return (
    <div className="min-h-dvh bg-gradient-to-b from-green-400 via-emerald-500 to-green-700 relative overflow-hidden">
      {/* 장식 요소 */}
      <div className="absolute inset-0 pointer-events-none">
        {isAllRescued && Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute animate-confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: ['#FF6B6B', '#FECA57', '#48DBFB', '#FF9FF3', '#54A0FF'][i % 5] }}
            />
          </div>
        ))}
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center p-6 gap-5">
        {isAllRescued ? (
          <>
            {/* 모든 앵무새 구출 완료 */}
            <div className="text-center mb-4">
              <div className="text-6xl mb-4">🏆</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                정글의 영웅!
              </h1>
              <p className="text-xl text-green-100">모든 앵무새를 구출했어요!</p>
            </div>

            {/* 구출한 앵무새들 */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-green-900 mb-4 text-center">구출한 앵무새</h2>
              <div className="flex justify-center gap-4 mb-4">
                {RESCUE_PARROTS.map((parrot) => (
                  <div key={parrot.id} className="text-center">
                    <div className="text-3xl mb-1 animate-bounce-slow">🦜</div>
                    <p className="text-xs font-bold text-green-800">{parrot.name_ko}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 일반 탐험 완료 */}
            <div className="text-center mb-4">
              <div className="text-5xl mb-4">🌿</div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-3 drop-shadow-lg">
                탐험 완료!
              </h1>
              <p className="text-xl text-green-100">멋진 정글 탐험이었어요!</p>
            </div>
          </>
        )}

        {/* 탐험 통계 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 w-full max-w-md">
          <h2 className="text-xl font-bold text-green-900 mb-4 text-center">탐험 기록</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{distance}km</p>
              <p className="text-sm text-gray-600">탐험 거리</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{newAnimals}</p>
              <p className="text-sm text-gray-600">새 동물</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">{totalCollected}</p>
              <p className="text-sm text-gray-600">총 수집</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-4 text-center">
              <p className="text-3xl font-bold text-green-600">
                {durationMin > 0 ? `${durationMin}분` : ''}{durationSec}초
              </p>
              <p className="text-sm text-gray-600">탐험 시간</p>
            </div>
          </div>
        </div>

        {/* 앵무새 진행도 */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-6 w-full max-w-md">
          <h2 className="text-lg font-bold text-green-900 mb-3 text-center">앵무새 구출 진행도</h2>
          <div className="flex justify-center gap-3">
            {RESCUE_PARROTS.map((parrot) => {
              const isRescued = storage.jungleMission.rescued.includes(parrot.id);
              return (
                <div key={parrot.id} className="text-center">
                  <div className={`text-2xl ${isRescued ? '' : 'opacity-30 grayscale'}`}>🦜</div>
                  <p className={`text-xs mt-1 ${isRescued ? 'font-bold text-green-800' : 'text-gray-400'}`}>
                    {isRescued ? parrot.name_ko : '???'}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-green-600 mt-3 font-bold">{rescuedCount}/5 구출 완료</p>
        </div>

        {/* 버튼들 */}
        <div className="w-full max-w-md flex flex-col gap-3">
          <Link href="/jungle" className="w-full">
            <button className="w-full min-h-16 bg-yellow-400 text-green-900 font-bold text-2xl rounded-3xl shadow-2xl active:scale-95 transition-transform">
              다시 탐험하기!
            </button>
          </Link>
          <div className="flex gap-3">
            <Link href="/collection" className="flex-1">
              <button className="w-full min-h-14 bg-white text-green-600 font-bold text-lg rounded-3xl shadow-xl active:scale-95 transition-transform">
                도감 보기
              </button>
            </Link>
            <Link href="/" className="flex-1">
              <button className="w-full min-h-14 bg-white text-gray-600 font-bold text-lg rounded-3xl shadow-xl active:scale-95 transition-transform">
                홈으로
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes confetti {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti { animation: confetti 3s ease-in infinite; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

export default function JungleCompletePage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-green-600 flex items-center justify-center text-white text-2xl">결과 확인 중...</div>}>
      <JungleCompleteContent />
    </Suspense>
  );
}
