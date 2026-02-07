'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { loadStorage, saveStorage } from '@/lib/storage';
import { allCreatures } from '@/data/creatures';
import type { StorageSchema } from '@/types/collection';

type LanguageMode = 'ko' | 'ko-en' | 'ko-en-sci';

export default function ParentModePage() {
  const [storage, setStorage] = useState<StorageSchema | null>(null);
  const [ttsEnabled, setTtsEnabled] = useState(true);
  const [languageMode, setLanguageMode] = useState<LanguageMode>('ko-en');

  useEffect(() => {
    const data = loadStorage();
    setStorage(data);
    setTtsEnabled(data.settings.ttsEnabled);
    setLanguageMode(data.settings.languageMode as LanguageMode);
  }, []);

  const handleSaveSettings = () => {
    if (!storage) return;
    const newStorage = {
      ...storage,
      settings: { ...storage.settings, ttsEnabled, languageMode },
    };
    setStorage(newStorage);
    saveStorage(newStorage);
  };

  if (!storage) return null;

  const collectedCount = Object.keys(storage.collected).length;
  const totalCreatures = allCreatures.length;
  const collectionRate = Math.round((collectedCount / totalCreatures) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-slate-300 p-6 overflow-auto">
      <div className="max-w-3xl mx-auto">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-800">부모 모드</h1>
          <Link href="/">
            <button className="min-w-12 min-h-12 bg-white rounded-full shadow-lg transition-transform flex items-center justify-center text-2xl active:scale-95">
              ✕
            </button>
          </Link>
        </div>

        {/* 설정 섹션 */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">설정</h2>

          {/* TTS 토글 */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <div>
              <div className="text-lg font-bold text-slate-800 mb-1">
                음성 안내 (TTS)
              </div>
              <div className="text-sm text-gray-600">
                생물 설명을 소리로 들려줄까요?
              </div>
            </div>
            <button
              onClick={() => setTtsEnabled(!ttsEnabled)}
              className={`w-16 h-10 rounded-full transition-all ${
                ttsEnabled ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-8 h-8 bg-white rounded-full shadow-md transition-transform ${
                  ttsEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* 언어 모드 */}
          <div className="mb-6 pb-6 border-b border-gray-200">
            <div className="text-lg font-bold text-slate-800 mb-3">언어 모드</div>
            <div className="space-y-3">
              {[
                { value: 'ko', label: '한글만', desc: '한글 이름과 설명만 표시' },
                { value: 'ko-en', label: '한글 + 영어', desc: '한글과 영어 이름 함께 표시' },
                {
                  value: 'ko-en-sci',
                  label: '한글 + 영어 + 학명',
                  desc: '모든 정보 표시 (교육용)',
                },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setLanguageMode(option.value as LanguageMode)}
                  className={`w-full text-left p-4 rounded-2xl transition-all ${
                    languageMode === option.value
                      ? 'bg-blue-100 ring-2 ring-blue-600'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="font-bold text-slate-800 mb-1">
                    {option.label}
                  </div>
                  <div className="text-sm text-gray-600">{option.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 설정 저장 */}
          <button
            onClick={handleSaveSettings}
            className="w-full min-h-14 bg-green-600 text-white font-bold text-lg rounded-2xl transition-transform active:scale-95 mt-6"
          >
            설정 저장
          </button>
        </div>

        {/* 학습 현황 */}
        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">학습 현황</h2>

          <div className="space-y-4">
            {/* 총 탐험 횟수 */}
            <div className="bg-blue-50 rounded-2xl p-4">
              <div className="text-sm text-blue-600 mb-1">총 탐험 횟수</div>
              <div className="text-3xl font-bold text-blue-900">
                {storage.stats.total_dives}회
              </div>
            </div>

            {/* 최고 수심 */}
            <div className="bg-cyan-50 rounded-2xl p-4">
              <div className="text-sm text-cyan-600 mb-1">최고 수심</div>
              <div className="text-3xl font-bold text-cyan-900">
                {storage.stats.deepest_depth}m
              </div>
            </div>

            {/* 수집률 */}
            <div className="bg-green-50 rounded-2xl p-4">
              <div className="text-sm text-green-600 mb-1">도감 수집률</div>
              <div className="text-3xl font-bold text-green-900">
                {collectedCount}/{totalCreatures}종 ({collectionRate}%)
              </div>
            </div>
          </div>
        </div>

        {/* 돌아가기 버튼 */}
        <Link href="/" className="block mt-6">
          <button className="w-full min-h-14 bg-white text-slate-700 font-bold text-xl rounded-3xl shadow-lg transition-transform active:scale-95">
            돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
}
