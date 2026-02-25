'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loadStorage, saveStorage } from '@/lib/storage';
import { Submarine } from '@/components/creatures/Submarine';
import type { StorageSchema } from '@/types/collection';

export default function HomePage() {
  const router = useRouter();
  const [storage, setStorage] = useState<StorageSchema | null>(null);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [selectedMode, setSelectedMode] = useState<'ocean' | 'jungle' | null>(null);

  useEffect(() => {
    const s = loadStorage();
    if (!s.family.setupComplete) {
      s.family.setupComplete = true;
      saveStorage(s);
    }
    setStorage(s);
  }, []);

  const handleLongPressStart = () => {
    const timer = setTimeout(() => {
      router.push('/parent');
    }, 1500);
    setLongPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  if (!storage) return null;

  const oceanCollected = Object.keys(storage.collected).length;
  const jungleCollected = Object.keys(storage.jungleCollected).length;
  const rescuedCount = storage.jungleMission.rescued.length;

  return (
    <div className="min-h-dvh relative overflow-hidden">
      {/* 배경: 좌측 바다, 우측 정글 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-emerald-400 to-green-600" />

      {/* 부모 모드 진입 (좌상단, 투명) */}
      <div
        className="absolute top-0 left-0 w-24 h-24 z-50 touch-manipulation"
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
      />

      {/* 파도 + 나뭇잎 하단 장식 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <svg viewBox="0 0 1200 120" className="w-full h-full animate-wave" preserveAspectRatio="none">
          <path d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.15)" />
        </svg>
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center p-6 gap-5">
        {/* 타이틀 */}
        <div className="text-center mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wider drop-shadow-lg">
            모험을 선택해요!
          </h1>
          <p className="text-lg md:text-xl text-white/80 tracking-wide">Choose Your Adventure</p>
        </div>

        {/* 모험 선택 카드 */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
          {/* 바다 카드 */}
          <button
            onClick={() => setSelectedMode('ocean')}
            className={`flex-1 rounded-3xl p-5 transition-all active:scale-95 ${
              selectedMode === 'ocean'
                ? 'bg-blue-500 shadow-2xl scale-105 ring-4 ring-white'
                : 'bg-blue-500/70 shadow-xl'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="w-28 h-20">
                <Submarine />
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-1">바다 탐험</h2>
                <p className="text-blue-100 text-sm">깊은 바다속 신비로운 생물 만나기</p>
              </div>
              {oceanCollected > 0 && (
                <div className="bg-white/20 rounded-xl px-3 py-1.5">
                  <p className="text-white text-xs">{oceanCollected}종 수집 · {storage.stats.total_dives}회 탐험</p>
                </div>
              )}
            </div>
          </button>

          {/* 정글 카드 */}
          <button
            onClick={() => setSelectedMode('jungle')}
            className={`flex-1 rounded-3xl p-5 transition-all active:scale-95 ${
              selectedMode === 'jungle'
                ? 'bg-green-600 shadow-2xl scale-105 ring-4 ring-white'
                : 'bg-green-600/70 shadow-xl'
            }`}
          >
            <div className="flex flex-col items-center gap-3">
              {/* 정글 아이콘 */}
              <div className="w-28 h-20 flex items-center justify-center">
                <svg viewBox="0 0 120 80" width="112" height="80" fill="none">
                  {/* 나무 */}
                  <rect x="55" y="40" width="10" height="35" rx="2" fill="#8B4513" />
                  <ellipse cx="60" cy="32" rx="28" ry="22" fill="#2E7D32" />
                  <ellipse cx="48" cy="38" rx="18" ry="14" fill="#388E3C" />
                  <ellipse cx="72" cy="36" rx="16" ry="13" fill="#1B5E20" />
                  {/* 앵무새 */}
                  <ellipse cx="80" cy="24" rx="8" ry="6" fill="#F44336" />
                  <ellipse cx="83" cy="22" rx="4" ry="3.5" fill="#FFEB3B" />
                  <path d="M87 23 L92 22 L87 24Z" fill="#FF9800" />
                  <circle cx="82" cy="21.5" r="1" fill="#1A1A2E" />
                  {/* 나비 */}
                  <ellipse cx="32" cy="20" rx="5" ry="4" fill="#E91E63" opacity="0.8" className="animate-flutter" />
                  <ellipse cx="28" cy="18" rx="4" ry="3" fill="#9C27B0" opacity="0.8" className="animate-flutter" />
                </svg>
              </div>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-white mb-1">정글 탐험</h2>
                <p className="text-green-100 text-sm">앵무새를 구출하며 정글 올라가기</p>
              </div>
              {jungleCollected > 0 ? (
                <div className="bg-white/20 rounded-xl px-3 py-1.5">
                  <p className="text-white text-xs">{jungleCollected}종 수집 · {rescuedCount}/5 구출</p>
                </div>
              ) : (
                <div className="bg-yellow-400/30 rounded-xl px-3 py-1.5">
                  <p className="text-yellow-100 text-xs font-bold">NEW! 새로운 모험</p>
                </div>
              )}
            </div>
          </button>
        </div>

        {/* 선택된 모드의 액션 버튼 */}
        {selectedMode && (
          <div className="w-full max-w-md flex flex-col gap-3 animate-fade-up">
            <Link href={selectedMode === 'ocean' ? '/select-ocean' : (storage.character ? '/jungle' : '/character')} className="w-full">
              <button className={`w-full min-h-16 font-bold text-2xl rounded-3xl shadow-2xl active:scale-95 transition-transform ${
                selectedMode === 'ocean'
                  ? 'bg-yellow-400 text-blue-900'
                  : 'bg-yellow-400 text-green-900'
              }`}>
                {selectedMode === 'ocean' ? '바다로 출발!' : (storage.character ? '정글로 출발!' : '탐험가 만들기!')}
              </button>
            </Link>
          </div>
        )}

        {/* 내 도감 */}
        <Link href="/collection" className="w-full max-w-md">
          <button className="w-full min-h-14 bg-white/90 text-gray-700 font-bold text-xl rounded-3xl shadow-xl active:scale-95 transition-transform">
            내 도감
          </button>
        </Link>

        {/* 통계 요약 */}
        {(oceanCollected > 0 || jungleCollected > 0) && (
          <div className="w-full max-w-md bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
            <h3 className="text-base font-bold text-white mb-2">탐험 기록</h3>
            <div className="grid grid-cols-2 gap-2">
              {oceanCollected > 0 && (
                <div className="bg-white/30 rounded-xl p-3">
                  <p className="text-white text-xs font-bold">바다</p>
                  <p className="text-white text-sm">{oceanCollected}종 · {storage.stats.deepest_depth}m</p>
                </div>
              )}
              {jungleCollected > 0 && (
                <div className="bg-white/30 rounded-xl p-3">
                  <p className="text-white text-xs font-bold">정글</p>
                  <p className="text-white text-sm">{jungleCollected}종 · {storage.jungleStats.furthest_km}km</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-50px); }
        }
        .animate-wave { animation: wave 8s ease-in-out infinite; }
        @keyframes fade-up {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-up { animation: fade-up 0.3s ease-out; }
        @keyframes flutter {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.6); }
        }
        .animate-flutter { animation: flutter 0.8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
