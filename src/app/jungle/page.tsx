'use client';

import { useState, useEffect, useRef, useCallback, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { JUNGLE_ZONES, JungleZoneInfo, RESCUE_PARROTS } from '@/types/jungle';
import { allAnimals } from '@/data/animals';
import { loadStorage, saveStorage } from '@/lib/storage';
import { useAnimalSpawn, SpawnedAnimal } from '@/hooks/useAnimalSpawn';
import { useTTS } from '@/hooks/useTTS';
import { useTelemetry } from '@/hooks/useTelemetry';
import { AnimalRenderer } from '@/components/creatures/AnimalRenderer';
import { ExplorerCharacter } from '@/components/creatures/ExplorerCharacter';
import { JungleBackground } from '@/components/effects/JungleBackground';
import { FallingLeaves } from '@/components/effects/FallingLeaves';
import { Fireflies } from '@/components/effects/Fireflies';
import { SunBeams } from '@/components/effects/SunBeams';
import { Vines } from '@/components/effects/Vines';
import { AnimalAnimationStyles } from '@/components/creatures/AnimalAnimation';
import AnimalPopup from '@/components/screens/AnimalPopup';
import { JUNGLE_ZONE_CTA_THRESHOLD } from '@/lib/jungle-constants';
import type { CollectedAnimal } from '@/types/collection';

function JungleContent() {
  const router = useRouter();

  const [storage, setStorage] = useState(() => loadStorage());
  const [currentZoneIndex, setCurrentZoneIndex] = useState(0);
  const [currentDistance, setCurrentDistance] = useState(0);
  const [showCTA, setShowCTA] = useState(false);
  const [selectedSpawned, setSelectedSpawned] = useState<SpawnedAnimal | null>(null);
  const [showZoneTitle, setShowZoneTitle] = useState(true);
  const startTimeRef = useRef(Date.now());
  const [newAnimalsThisTrip, setNewAnimalsThisTrip] = useState(0);
  const [showMissionAlert, setShowMissionAlert] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentZone = JUNGLE_ZONES[currentZoneIndex];
  const isLastZone = currentZoneIndex === JUNGLE_ZONES.length - 1;
  const showSunBeams = currentZoneIndex >= 3;
  const showFireflies = currentZoneIndex >= 1 && currentZoneIndex <= 2;

  const { trackEvent } = useTelemetry();
  const { speak, stop: stopTTS } = useTTS();

  const collectedSet = new Set(Object.keys(storage.jungleCollected));

  // 정글용 수집 함수
  const isCollected = (id: string) => id in storage.jungleCollected;
  const collectAnimal = (id: string, zone: string) => {
    const existing = storage.jungleCollected[id];
    const updated: Record<string, CollectedAnimal> = {
      ...storage.jungleCollected,
      [id]: existing
        ? { ...existing, count: existing.count + 1 }
        : { first_met: new Date().toISOString(), zone, count: 1 },
    };
    const newStorage = { ...storage, jungleCollected: updated };
    setStorage(newStorage);
    saveStorage(newStorage);
    return { isNew: !existing };
  };

  const {
    spawnedAnimals,
    pause: pauseSpawn,
    resume: resumeSpawn,
    removeAnimal,
  } = useAnimalSpawn({
    animals: allAnimals,
    currentZone: currentZone.id,
    collectedIds: collectedSet,
  });

  const rescuedCount = storage.jungleMission.rescued.length;

  // 탐험 시작 이벤트
  useEffect(() => {
    trackEvent({ type: 'dive_start', ocean: 'jungle', season: 'summer', ts: Date.now() });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 존 타이틀 3초 후 숨기기
  useEffect(() => {
    setShowZoneTitle(true);
    const timer = setTimeout(() => setShowZoneTitle(false), 3000);
    return () => clearTimeout(timer);
  }, [currentZoneIndex]);

  // 스크롤 감지 → 거리/zone 자동 계산
  const zoneIndexRef = useRef(0);
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    if (scrollHeight === 0) return;
    const zoneHeight = scrollHeight / JUNGLE_ZONES.length;

    // 스크롤 위치에 따라 zone 자동 결정
    const rawZoneIndex = Math.floor(scrollTop / zoneHeight);
    const zoneIndex = Math.min(rawZoneIndex, JUNGLE_ZONES.length - 1);

    if (zoneIndex !== zoneIndexRef.current) {
      zoneIndexRef.current = zoneIndex;
      setCurrentZoneIndex(zoneIndex);
    }

    const zone = JUNGLE_ZONES[zoneIndex];
    const zoneStart = zoneIndex * zoneHeight;
    const zoneProgress = Math.max(0, Math.min(1, (scrollTop - zoneStart) / zoneHeight));

    const distance = zone.distance_min + (zone.distance_max - zone.distance_min) * zoneProgress;
    setCurrentDistance(Math.round(distance * 10) / 10);

    const isLast = zoneIndex === JUNGLE_ZONES.length - 1;
    setShowCTA(isLast ? zoneProgress >= JUNGLE_ZONE_CTA_THRESHOLD : false);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // 앵무새 구출 조건 체크
  const checkRescueMission = useCallback(() => {
    const totalCollected = Object.keys(storage.jungleCollected).length;
    for (const parrot of RESCUE_PARROTS) {
      if (storage.jungleMission.rescued.includes(parrot.id)) continue;

      let canRescue = false;
      if (parrot.requiredZone && parrot.requiredZoneCount) {
        const zoneAnimals = allAnimals.filter(a => a.zone === parrot.requiredZone);
        const zoneCollected = zoneAnimals.filter(a => a.id in storage.jungleCollected).length;
        canRescue = zoneCollected >= parrot.requiredZoneCount;
      } else if (parrot.requiredTotalCount) {
        canRescue = totalCollected >= parrot.requiredTotalCount;
      }

      if (canRescue) {
        setShowMissionAlert(parrot.id);
        return;
      }
    }
  }, [storage.jungleCollected, storage.jungleMission.rescued]);

  // 탐험 완료 (마지막 zone 끝)
  const handleCTAClick = () => {
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    const stats = { ...storage.jungleStats };
    stats.total_explorations += 1;
    stats.furthest_km = Math.max(stats.furthest_km, currentDistance);
    const newStorage = { ...storage, jungleStats: stats };
    saveStorage(newStorage);

    if (storage.jungleMission.rescued.length >= 5) {
      router.push('/jungle/complete');
    } else {
      router.push(`/jungle/complete?distance=${currentDistance}&new=${newAnimalsThisTrip}&duration=${duration}`);
    }
  };

  // 동물 터치
  const handleAnimalTap = (spawned: SpawnedAnimal) => {
    setSelectedSpawned(spawned);
    pauseSpawn();
    stopTTS();

    const { isNew: wasNew } = collectAnimal(spawned.animal.id, currentZone.id);
    if (wasNew) {
      setNewAnimalsThisTrip(prev => prev + 1);
      // 구출 미션 체크
      setTimeout(() => checkRescueMission(), 100);
    }
  };

  // 팝업 닫기
  const handlePopupClose = () => {
    if (selectedSpawned) {
      removeAnimal(selectedSpawned.id);
    }
    setSelectedSpawned(null);
    resumeSpawn();
  };

  // 탐험 종료
  const handleEndTrip = () => {
    const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
    const stats = { ...storage.jungleStats };
    stats.total_explorations += 1;
    stats.furthest_km = Math.max(stats.furthest_km, currentDistance);
    const newStorage = { ...storage, jungleStats: stats };
    saveStorage(newStorage);

    router.push(`/jungle/complete?distance=${currentDistance}&new=${newAnimalsThisTrip}&duration=${duration}`);
  };

  // 미션 시작
  const handleMissionStart = (parrotId: string) => {
    setShowMissionAlert(null);
    router.push(`/jungle?mission=${parrotId}`);
  };

  // 미션 완료
  const handleMissionComplete = (parrotId: string) => {
    const newRescued = [...storage.jungleMission.rescued, parrotId];
    const newStorage = {
      ...storage,
      jungleMission: { rescued: newRescued },
    };
    setStorage(newStorage);
    saveStorage(newStorage);
    setShowMissionAlert(null);
  };

  const character = storage.character;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimalAnimationStyles />

      {/* 배경 */}
      <JungleBackground currentDistance={currentDistance} />

      {/* 이펙트 */}
      <FallingLeaves count={Math.max(3, 8 - currentZoneIndex)} />
      {showFireflies && <Fireflies currentDistance={currentDistance} />}
      {showSunBeams && <SunBeams currentDistance={currentDistance} />}
      {currentZoneIndex >= 1 && currentZoneIndex <= 2 && <Vines count={4} />}

      {/* 탐험 컨테이너 */}
      <div
        ref={containerRef}
        className="h-full overflow-y-auto overflow-x-hidden relative z-10"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        <div style={{ height: `${JUNGLE_ZONES.length * 400}vh` }} className="relative" />
      </div>

      {/* 동물들 (화면 위에 오버레이) */}
      <div className="fixed inset-0 z-15 pointer-events-none">
        {spawnedAnimals.map((spawned) => (
          <div
            key={spawned.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${spawned.x}%`,
              top: `${spawned.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <AnimalRenderer
              animal={spawned.animal}
              x={spawned.x}
              y={spawned.y}
              animationType={spawned.animal.animation_type}
              onTap={() => handleAnimalTap(spawned)}
              isVisible={true}
            />
          </div>
        ))}
      </div>

      {/* 탐험가 캐릭터 (화면 중앙 고정) */}
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
        {character ? (
          <ExplorerCharacter
            templateId={character.templateId}
            colors={character.colors}
            walking={true}
          />
        ) : (
          <div className="w-20 h-28 bg-green-600/50 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">🧭</span>
          </div>
        )}
      </div>

      {/* 거리 게이지 (좌측) */}
      <div className="fixed left-3 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm rounded-2xl p-3 z-40">
        <div className="text-xs font-bold text-white mb-2 text-center">높이</div>
        <div className="flex flex-col-reverse gap-1">
          {JUNGLE_ZONES.map((zone, idx) => (
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
          {currentDistance}km
        </div>
      </div>

      {/* 현재 존 + 거리 (우상단) */}
      <div className="fixed top-4 right-4 bg-black/40 backdrop-blur-sm rounded-2xl px-5 py-2.5 z-40">
        <div className="text-lg font-bold text-white">{currentZone.name_ko}</div>
        <div className="text-sm text-white/70">{currentDistance}km</div>
      </div>

      {/* 앵무새 구출 진행도 (우상단 아래) */}
      <div className="fixed top-20 right-4 bg-black/40 backdrop-blur-sm rounded-2xl px-4 py-2 z-40">
        <div className="flex gap-1 items-center">
          {RESCUE_PARROTS.map((parrot, i) => (
            <span key={parrot.id} className={`text-lg ${storage.jungleMission.rescued.includes(parrot.id) ? '' : 'opacity-30 grayscale'}`}>
              🦜
            </span>
          ))}
          <span className="text-xs text-white ml-1">{rescuedCount}/5</span>
        </div>
      </div>

      {/* 존 타이틀 카드 */}
      {showZoneTitle && (
        <div className="fixed top-28 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-5 max-w-sm w-full mx-4 z-30 animate-fade-in">
          <h2 className="text-2xl font-bold text-green-900 text-center mb-1">
            {currentZone.name_ko}에 도착했어요!
          </h2>
          <p className="text-base text-green-600 text-center mb-1">
            {currentZone.distance_min}km ~ {currentZone.distance_max}km
          </p>
          <p className="text-sm text-gray-600 text-center">
            {currentZone.description_ko}
          </p>
        </div>
      )}

      {/* 하단 버튼들 */}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
        <Link href="/character">
          <button className="w-14 h-14 bg-white/80 rounded-full shadow-xl flex items-center justify-center text-2xl active:scale-95 transition-transform">
            🎨
          </button>
        </Link>
        <Link href="/collection">
          <button className="w-14 h-14 bg-white/80 rounded-full shadow-xl flex items-center justify-center text-2xl active:scale-95 transition-transform">
            📖
          </button>
        </Link>
      </div>

      {/* 탐험 종료 버튼 */}
      <button
        onClick={handleEndTrip}
        className="fixed top-4 left-14 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 text-sm font-bold text-gray-700 z-40 active:scale-95 transition-transform"
      >
        탐험 끝내기
      </button>

      {/* CTA 버튼 */}
      {showCTA && (
        <button
          onClick={handleCTAClick}
          className="fixed bottom-16 left-1/2 -translate-x-1/2 min-w-56 min-h-14 bg-yellow-400 text-green-900 font-bold text-xl rounded-3xl shadow-2xl animate-bounce z-30 active:scale-95 transition-transform"
        >
          탐험 완료!
        </button>
      )}

      {/* 미션 알림 */}
      {showMissionAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center">
            <div className="text-5xl mb-4">🦜</div>
            <h2 className="text-2xl font-bold text-green-900 mb-2">앵무새를 발견했어요!</h2>
            <p className="text-lg text-gray-600 mb-6">
              {RESCUE_PARROTS.find(p => p.id === showMissionAlert)?.name_ko}를 구출하러 갈까요?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => handleMissionComplete(showMissionAlert)}
                className="flex-1 min-h-14 bg-green-600 text-white font-bold text-lg rounded-2xl active:scale-95 transition-transform"
              >
                구출하기!
              </button>
              <button
                onClick={() => setShowMissionAlert(null)}
                className="min-w-14 min-h-14 bg-gray-200 text-gray-700 font-bold rounded-2xl active:scale-95 transition-transform"
              >
                나중에
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 교감 팝업 */}
      {selectedSpawned && (
        <AnimalPopup
          animal={selectedSpawned.animal}
          isNew={!storage.jungleCollected[selectedSpawned.animal.id] || storage.jungleCollected[selectedSpawned.animal.id]?.count === 1}
          onClose={handlePopupClose}
          onMoreInfo={() => {}}
          onTTSPlay={(text) => speak(text)}
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

export default function JunglePage() {
  return (
    <Suspense fallback={<div className="fixed inset-0 bg-green-600 flex items-center justify-center text-white text-2xl">정글로 출발 중...</div>}>
      <JungleContent />
    </Suspense>
  );
}
