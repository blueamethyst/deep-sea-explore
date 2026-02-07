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

  useEffect(() => {
    const s = loadStorage();
    // 프로필 자동 완성 (캐릭터 선택 없이 실사 사진 사용)
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

  return (
    <div className="min-h-dvh bg-gradient-to-b from-sky-300 via-sky-400 to-blue-500 relative overflow-hidden">
      {/* 부모 모드 진입 (좌상단, 투명) */}
      <div
        className="absolute top-0 left-0 w-24 h-24 z-50 touch-manipulation"
        onTouchStart={handleLongPressStart}
        onTouchEnd={handleLongPressEnd}
        onMouseDown={handleLongPressStart}
        onMouseUp={handleLongPressEnd}
        onMouseLeave={handleLongPressEnd}
      />

      {/* 파도 애니메이션 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden">
        <div className="absolute bottom-0 w-full h-full">
          <svg viewBox="0 0 1200 120" className="w-full h-full animate-wave" preserveAspectRatio="none">
            <path d="M0,60 C150,90 350,30 600,60 C850,90 1050,30 1200,60 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
        <div className="absolute bottom-0 w-full h-full">
          <svg viewBox="0 0 1200 120" className="w-full h-full animate-wave-slow" preserveAspectRatio="none">
            <path d="M0,80 C200,50 400,110 600,80 C800,50 1000,110 1200,80 L1200,120 L0,120 Z" fill="rgba(255,255,255,0.15)" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col items-center justify-center p-6 gap-6">
        {/* 타이틀 */}
        <div className="text-center mb-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-wider drop-shadow-lg">
            바다속 끝까지
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 tracking-wide">Into the Deep Sea</p>
        </div>

        <div className="flex flex-col items-center gap-6 w-full max-w-xl">
          {/* 잠수함 + 가족 */}
          <div className="w-64 mb-2">
            <Submarine />
          </div>

          {/* 탐험 시작 */}
          <Link href="/select-ocean" className="w-full">
            <button className="w-full min-h-16 bg-yellow-400 text-blue-900 font-bold text-2xl rounded-3xl shadow-2xl active:scale-95 transition-transform">
              탐험 시작
            </button>
          </Link>

          {/* 내 도감 */}
          <Link href="/collection" className="w-full">
            <button className="w-full min-h-14 bg-white text-blue-600 font-bold text-xl rounded-3xl shadow-xl active:scale-95 transition-transform">
              내 도감
            </button>
          </Link>

          {/* 최근 탐험 기록 */}
          {storage.stats.total_dives > 0 && (
            <div className="w-full bg-white/20 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
              <h3 className="text-base font-bold text-white mb-2">최근 탐험</h3>
              <div className="bg-white/30 rounded-xl p-3">
                <p className="text-white text-sm">
                  총 탐험 {storage.stats.total_dives}회 · 최고 수심 {storage.stats.deepest_depth}m
                </p>
                <p className="text-blue-100 text-xs mt-1">
                  {Object.keys(storage.collected).length}종 수집 완료
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes wave {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-50px); }
        }
        @keyframes wave-slow {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(50px); }
        }
        .animate-wave { animation: wave 8s ease-in-out infinite; }
        .animate-wave-slow { animation: wave-slow 12s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
