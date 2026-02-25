'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStorage, saveStorage } from '@/lib/storage';
import {
  ExplorerCharacter,
  getDefaultColors,
  TEMPLATE_LIST,
} from '@/components/creatures/ExplorerCharacter';

/* ----------------------------------------------------------------
 *  Constants
 * ---------------------------------------------------------------- */
const COLOR_PALETTE = [
  '#FF6B6B', '#FF8E53', '#FECA57', '#48DBFB',
  '#FF9FF3', '#54A0FF', '#5F27CD', '#01A3A4',
  '#2ECC71', '#F39C12', '#8B4513', '#1A1A2E',
];

type PartKey = 'hair' | 'skin' | 'outfit' | 'hat';

const PARTS: { key: PartKey; label: string }[] = [
  { key: 'hair', label: '머리색' },
  { key: 'skin', label: '피부색' },
  { key: 'outfit', label: '옷 색상' },
  { key: 'hat', label: '모자/액세서리' },
];

/* ----------------------------------------------------------------
 *  Page Component
 * ---------------------------------------------------------------- */
export default function CharacterPage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState<string>('explorer_girl');
  const [colors, setColors] = useState<Record<string, string>>(getDefaultColors());
  const [activePart, setActivePart] = useState<PartKey>('hair');
  const [mounted, setMounted] = useState(false);

  // 마운트 시 저장된 캐릭터 로드
  useEffect(() => {
    setMounted(true);
    try {
      const storage = loadStorage();
      if (storage.character) {
        setSelectedTemplate(storage.character.templateId);
        setColors({ ...getDefaultColors(), ...storage.character.colors });
      }
    } catch {
      // 첫 방문 시 기본값 사용
    }
  }, []);

  // 색상 변경
  const handleColorSelect = useCallback(
    (color: string) => {
      setColors((prev) => ({
        ...prev,
        [activePart]: color,
      }));
    },
    [activePart],
  );

  // 저장 후 정글 이동
  const handleStart = useCallback(() => {
    try {
      const storage = loadStorage();
      storage.character = { templateId: selectedTemplate, colors };
      saveStorage(storage);
    } catch (err) {
      console.error('[Character] 저장 실패:', err);
    }
    router.push('/jungle');
  }, [selectedTemplate, colors, router]);

  // SSR 방지
  if (!mounted) return null;

  return (
    <div className="min-h-dvh bg-gradient-to-b from-emerald-400 via-green-500 to-emerald-700 relative overflow-hidden">
      {/* 배경 장식 - 나뭇잎 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 left-4 w-16 h-16 opacity-20">
          <LeafDecor />
        </div>
        <div className="absolute top-12 right-8 w-12 h-12 opacity-15 rotate-45">
          <LeafDecor />
        </div>
        <div className="absolute bottom-20 left-8 w-14 h-14 opacity-15 -rotate-30">
          <LeafDecor />
        </div>
        <div className="absolute bottom-32 right-4 w-10 h-10 opacity-20 rotate-90">
          <LeafDecor />
        </div>
      </div>

      <div className="relative z-10 min-h-dvh flex flex-col">
        {/* 헤더 */}
        <header className="flex items-center justify-between px-4 pt-4 pb-2">
          <button
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center active:scale-90 transition-transform"
            aria-label="뒤로 가기"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M13 4L7 10L13 16"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg tracking-wide">
            탐험가를 만들어요!
          </h1>
          <div className="w-10" /> {/* spacer */}
        </header>

        {/* 메인 컨텐츠 - 스크롤 가능 */}
        <main className="flex-1 overflow-y-auto px-4 pb-4 flex flex-col gap-4">
          {/* 캐릭터 선택 그리드 */}
          <section>
            <h2 className="text-sm font-semibold text-white/80 mb-2 ml-1">
              캐릭터 선택
            </h2>
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {TEMPLATE_LIST.map(({ id, label }) => (
                <motion.button
                  key={id}
                  onClick={() => setSelectedTemplate(id)}
                  className={`relative flex flex-col items-center gap-1 p-2 rounded-2xl transition-colors ${
                    selectedTemplate === id
                      ? 'bg-white/40 ring-2 ring-yellow-300 shadow-lg'
                      : 'bg-white/15 active:bg-white/25'
                  }`}
                  whileTap={{ scale: 0.92 }}
                >
                  {selectedTemplate === id && (
                    <motion.div
                      layoutId="template-selection"
                      className="absolute inset-0 rounded-2xl bg-white/30 ring-2 ring-yellow-300"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className="relative z-10">
                    <ExplorerCharacter
                      templateId={id}
                      colors={selectedTemplate === id ? colors : getDefaultColors()}
                      width={48}
                      height={67}
                    />
                  </div>
                  <span className="relative z-10 text-[10px] sm:text-xs text-white font-medium leading-tight text-center">
                    {label}
                  </span>
                </motion.button>
              ))}
            </div>
          </section>

          {/* 프리뷰 */}
          <section className="flex justify-center py-2">
            <motion.div
              className="bg-white/20 backdrop-blur-sm rounded-3xl p-6 shadow-xl"
              key={selectedTemplate}
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <ExplorerCharacter
                templateId={selectedTemplate}
                colors={colors}
                width={120}
                height={168}
                walking
              />
            </motion.div>
          </section>

          {/* 색상 커스터마이즈 패널 */}
          <section className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 shadow-lg">
            {/* 파츠 탭 */}
            <div className="flex gap-1 mb-3 overflow-x-auto">
              {PARTS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActivePart(key)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
                    activePart === key
                      ? 'bg-white text-green-700 shadow-md'
                      : 'bg-white/20 text-white active:bg-white/30'
                  }`}
                >
                  {label}
                  {/* 현재 색상 인디케이터 */}
                  <span
                    className="inline-block w-3 h-3 rounded-full ml-1.5 align-middle ring-1 ring-white/40"
                    style={{ backgroundColor: colors[key] }}
                  />
                </button>
              ))}
            </div>

            {/* 색상 그리드 */}
            <div className="grid grid-cols-6 gap-2 sm:gap-3">
              <AnimatePresence mode="popLayout">
                {COLOR_PALETTE.map((color) => (
                  <motion.button
                    key={color}
                    onClick={() => handleColorSelect(color)}
                    className={`aspect-square rounded-xl transition-all ${
                      colors[activePart] === color
                        ? 'ring-3 ring-white shadow-lg scale-110'
                        : 'ring-1 ring-white/30 active:scale-95'
                    }`}
                    style={{ backgroundColor: color }}
                    whileTap={{ scale: 0.85 }}
                    layout
                    aria-label={`색상 ${color}`}
                  >
                    {colors[activePart] === color && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full p-1.5"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 13L9 17L19 7"
                          stroke="white"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </section>
        </main>

        {/* 하단 시작 버튼 */}
        <div className="sticky bottom-0 px-4 pb-4 pt-2 bg-gradient-to-t from-emerald-700/80 to-transparent">
          <motion.button
            onClick={handleStart}
            className="w-full min-h-14 bg-yellow-400 text-green-900 font-bold text-xl rounded-3xl shadow-2xl active:scale-95 transition-transform"
            whileTap={{ scale: 0.96 }}
          >
            탐험 시작!
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------------------------------------------
 *  배경 나뭇잎 장식 SVG
 * ---------------------------------------------------------------- */
function LeafDecor() {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 20 2 Q 36 8 38 24 Q 36 38 20 38 Q 4 36 2 20 Q 4 6 20 2 Z"
        fill="white"
      />
      <path
        d="M 20 2 Q 20 20 20 38"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1"
      />
      <path
        d="M 20 14 Q 12 12 6 16"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
      />
      <path
        d="M 20 22 Q 28 20 34 24"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="0.8"
      />
    </svg>
  );
}
