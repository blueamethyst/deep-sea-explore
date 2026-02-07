'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ZONES, ZoneInfo } from '@/types/creature';
import { allCreatures } from '@/data/creatures';
import { loadStorage, saveStorage } from '@/lib/storage';
import { useCreatureSpawn, SpawnedCreature } from '@/hooks/useCreatureSpawn';
import { useCollection } from '@/hooks/useCollection';
import { useTTS } from '@/hooks/useTTS';
import { useTelemetry } from '@/hooks/useTelemetry';
import { CreatureRenderer } from '@/components/creatures/CreatureRenderer';
import { Submarine } from '@/components/creatures/Submarine';
import { OceanBackground } from '@/components/effects/OceanBackground';
import { LightRays } from '@/components/effects/LightRays';
import { Bubbles } from '@/components/effects/Bubbles';
import { Bioluminescence } from '@/components/effects/Bioluminescence';
import { SubmarineLight } from '@/components/effects/SubmarineLight';
import CreaturePopup from '@/components/screens/CreaturePopup';
import type { Season } from '@/types/creature';

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-sky-500 flex items-center justify-center text-white text-2xl">바다로 출발 중...</div>}>
      <ExploreContent />
    </Suspense>
  );
}

function ExploreContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ocean = searchParams.get('ocean') || 'pacific';
  const season = (searchParams.get('season') || 'summer') as Season;

  const [storage, setStorage] = useState(() => loadStorage());
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0);
  const [currentDepth, setCurrentDepth] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [selectedSpawned, setSelectedSpawned] = useState<SpawnedCreature | null>(null);
  const [showZoneTitle, setShowZoneTitle] = useState(true);
  const [diveStartTime] = useState(Date.now());
  const [newCreaturesThisDive, setNewCreaturesThisDive] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentZone = ZONES[currentZoneIndex];
  const isLastZone = currentZoneIndex === ZONES.length - 1;
  const showHeadlight = currentZoneIndex >= 2; // 약광층부터

  const { trackEvent } = useTelemetry();
  const { speak, stop: stopTTS, state: ttsState, highlightIndex, words } = useTTS();

  const collectedSet = new Set(Object.keys(storage.collected));

  const { collected, isCollected, collectCreature } = useCollection({
    collected: storage.collected,
    onUpdate: (updated) => {
      const newStorage = { ...storage, collected: updated };
      setStorage(newStorage);
      saveStorage(newStorage);
    },
  });

  const {
    spawnedCreatures,
    spawnState,
    pause: pauseSpawn,
    resume: resumeSpawn,
    removeCreature,
  } = useCreatureSpawn({
    creatures: allCreatures,
    currentZone: currentZone.id,
    oceanId: ocean,
    season,
    collectedIds: collectedSet,
  });

  // 탐험 시작 이벤트
  useEffect(() => {
    trackEvent({ type: 'dive_start', ocean, season, ts: Date.now() });
    trackEvent({ type: 'zone_enter', zone: currentZone.id, ocean, ts: Date.now() });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 존 타이틀 3초 후 숨기기
  useEffect(() => {
    setShowZoneTitle(true);
    const timer = setTimeout(() => setShowZoneTitle(false), 3000);
    return () => clearTimeout(timer);
  }, [currentZoneIndex]);

  // 스크롤 감지 → 수심 계산
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const zoneHeight = scrollHeight / ZONES.length;
    const zoneStart = currentZoneIndex * zoneHeight;
    const zoneScrollPosition = scrollTop - zoneStart;
    const zoneProgress = Math.max(0, Math.min(1, zoneScrollPosition / zoneHeight));

    // 수심 계산
    const depth = currentZone.depth_min + (currentZone.depth_max - currentZone.depth_min) * zoneProgress;
    setCurrentDepth(Math.round(depth));

    // CTA 표시 (95% 이상)
    setShowCTA(zoneProgress >= 0.95);
  }, [currentZoneIndex, currentZone]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 다음 존으로 이동
  const handleCTAClick = () => {
    if (isLastZone) {
      // 탐험 완료
      const duration = Math.round((Date.now() - diveStartTime) / 1000);
      const stats = { ...storage.stats };
      stats.total_dives += 1;
      stats.deepest_depth = Math.max(stats.deepest_depth, currentDepth);
      const newStorage = { ...storage, stats };
      saveStorage(newStorage);

      trackEvent({
        type: 'dive_end', ocean, depth: currentDepth,
        new_creatures: newCreaturesThisDive, duration_sec: duration, ts: Date.now(),
      });
      router.push(`/explore/complete?ocean=${ocean}&depth=${currentDepth}&new=${newCreaturesThisDive}&duration=${duration}`);
    } else {
      const nextIndex = currentZoneIndex + 1;
      setCurrentZoneIndex(nextIndex);
      setShowCTA(false);

      trackEvent({ type: 'cta_depth_tap', from_zone: currentZone.id, to_zone: ZONES[nextIndex].id, ts: Date.now() });
      trackEvent({ type: 'zone_enter', zone: ZONES[nextIndex].id, ocean, ts: Date.now() });

      // 새 존의 시작 위치로 스크롤
      const container = containerRef.current;
      if (container) {
        const scrollHeight = container.scrollHeight - container.clientHeight;
        const zoneHeight = scrollHeight / ZONES.length;
        container.scrollTo({ top: nextIndex * zoneHeight, behavior: 'smooth' });
      }
    }
  };

  // 생물 터치
  const handleCreatureTap = (spawned: SpawnedCreature) => {
    setSelectedSpawned(spawned);
    pauseSpawn();
    stopTTS();

    const wasNew = !isCollected(spawned.creature.id);
    collectCreature(spawned.creature.id, ocean, season);
    if (wasNew) setNewCreaturesThisDive(prev => prev + 1);

    trackEvent({
      type: 'creature_met', id: spawned.creature.id,
      depth: currentDepth, is_new: wasNew, ts: Date.now(),
    });
  };

  // 팝업 닫기
  const handlePopupClose = () => {
    if (selectedSpawned) {
      removeCreature(selectedSpawned.id);
    }
    setSelectedSpawned(null);
    resumeSpawn();
  };

  // TTS 재생
  const handleTTSPlay = (text: string) => {
    speak(text);
    trackEvent({ type: 'tts_play', text_length: text.length, lang: 'ko-KR', ts: Date.now() });
  };

  // 탐험 종료
  const handleEndDive = () => {
    const duration = Math.round((Date.now() - diveStartTime) / 1000);
    const stats = { ...storage.stats };
    stats.total_dives += 1;
    stats.deepest_depth = Math.max(stats.deepest_depth, currentDepth);
    const newStorage = { ...storage, stats };
    saveStorage(newStorage);

    trackEvent({
      type: 'dive_end', ocean, depth: currentDepth,
      new_creatures: newCreaturesThisDive, duration_sec: duration, ts: Date.now(),
    });
    router.push(`/explore/complete?ocean=${ocean}&depth=${currentDepth}&new=${newCreaturesThisDive}&duration=${duration}`);
  };

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* 배경 */}
      <OceanBackground currentDepth={currentDepth} />

      {/* 빛 효과 */}
      {currentZoneIndex === 0 && <LightRays currentDepth={currentDepth} />}
      {currentZoneIndex >= 2 && <Bioluminescence currentDepth={currentDepth} />}
      {showHeadlight && <SubmarineLight isActive={true} submarineX={50} submarineY={50} />}

      {/* 기포 */}
      <Bubbles count={Math.max(3, 8 - currentZoneIndex * 2)} />

      {/* 탐험 컨테이너 */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto overflow-x-hidden relative z-10"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div style={{ height: `${ZONES.length * 400}vh` }} className="relative" />
      </div>

      {/* 생물들 (화면 위에 오버레이) */}
      <div className="fixed inset-0 z-15 pointer-events-none">
        {spawnedCreatures.map((spawned) => (
          <div
            key={spawned.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${spawned.x}%`,
              top: `${spawned.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <CreatureRenderer
              creature={spawned.creature}
              x={spawned.x}
              y={spawned.y}
              animationType={spawned.creature.animation_type}
              onTap={() => handleCreatureTap(spawned)}
              isVisible={true}
            />
          </div>
        ))}
      </div>

      {/* 잠수함 (화면 중앙 고정) */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 z-20 pointer-events-none">
        <Submarine
          familyAvatars={{
            dad: storage.family.dad.avatarId,
            mom: storage.family.mom.avatarId,
            child: storage.family.child.avatarId,
          }}
          showHeadlight={showHeadlight}
        />
      </div>

      {/* 수심 게이지 (좌측) */}
      <div className="fixed left-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-2xl p-3 z-40">
        <div className="text-xs font-bold text-white mb-2 text-center">수심</div>
        <div className="flex flex-col gap-1">
          {ZONES.map((zone, idx) => (
            <div
              key={zone.id}
              className={`w-2.5 h-8 rounded-full transition-all ${
                idx === currentZoneIndex ? 'scale-125 ring-2 ring-white' : 'opacity-50'
              }`}
              style={{
                backgroundColor: idx <= currentZoneIndex ? zone.bg_color_start : '#ffffff44',
              }}
            />
          ))}
        </div>
        <div className="text-xs text-white text-center mt-2 font-mono">
          {currentDepth}m
        </div>
      </div>

      {/* 현재 존 + 수심 (우상단) */}
      <div className="fixed top-4 right-4 bg-black/40 backdrop-blur-sm rounded-2xl px-5 py-2.5 z-40">
        <div className="text-lg font-bold text-white">{currentZone.name_ko}</div>
        <div className="text-sm text-white/70">{currentDepth}m</div>
      </div>

      {/* 존 타이틀 카드 */}
      {showZoneTitle && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 max-w-sm w-full mx-4 z-30 animate-fade-in">
          <h2 className="text-2xl font-bold text-blue-900 text-center mb-1">
            {currentZone.name_ko}에 도착했어요!
          </h2>
          <p className="text-base text-blue-600 text-center mb-1">
            수심 {currentZone.depth_min}m ~ {currentZone.depth_max}m
          </p>
          <p className="text-sm text-gray-600 text-center">
            {currentZone.description_ko}
          </p>
        </div>
      )}

      {/* 도감 바로가기 */}
      <Link href="/collection">
        <button className="fixed bottom-4 right-4 w-14 h-14 bg-white/80 rounded-full shadow-xl flex items-center justify-center text-2xl z-40 active:scale-95 transition-transform">
          📖
        </button>
      </Link>

      {/* 탐험 종료 버튼 */}
      <button
        onClick={handleEndDive}
        className="fixed top-4 left-14 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold text-gray-700 z-40 active:scale-95 transition-transform"
      >
        탐험 끝내기
      </button>

      {/* CTA 버튼 */}
      {showCTA && (
        <button
          onClick={handleCTAClick}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 min-w-56 min-h-14 bg-yellow-400 text-blue-900 font-bold text-xl rounded-3xl shadow-2xl animate-bounce z-30 active:scale-95 transition-transform"
        >
          {isLastZone ? '탐험 완료!' : '더 깊이 내려가자! ⬇️'}
        </button>
      )}

      {/* 교감 팝업 */}
      {selectedSpawned && (
        <CreaturePopup
          creature={selectedSpawned.creature}
          isNew={!collected[selectedSpawned.creature.id] || collected[selectedSpawned.creature.id]?.count === 1}
          onClose={handlePopupClose}
          onMoreInfo={() => {
            trackEvent({ type: 'creature_more', id: selectedSpawned.creature.id, ts: Date.now() });
          }}
          onTTSPlay={handleTTSPlay}
        />
      )}

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translate(-50%, -20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
