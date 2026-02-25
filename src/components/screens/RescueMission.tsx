'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { RescueParrot } from '@/types/jungle';
import dynamic from 'next/dynamic';

interface MissionProps {
  onComplete: () => void;
  onClose: () => void;
}

const FruitFindMission = dynamic<MissionProps>(() => import('@/components/missions/FruitFindMission'), { ssr: false });
const RhythmTapMission = dynamic<MissionProps>(() => import('@/components/missions/RhythmTapMission'), { ssr: false });
const NestBuildMission = dynamic<MissionProps>(() => import('@/components/missions/NestBuildMission'), { ssr: false });
const MatchPairMission = dynamic<MissionProps>(() => import('@/components/missions/MatchPairMission'), { ssr: false });
const DigBurrowMission = dynamic<MissionProps>(() => import('@/components/missions/DigBurrowMission'), { ssr: false });

interface RescueMissionProps {
  parrot: RescueParrot;
  onComplete: () => void;
  onClose: () => void;
}

export default function RescueMission({ parrot, onComplete, onClose }: RescueMissionProps) {
  const [phase, setPhase] = useState<'intro' | 'game' | 'success'>('intro');

  const handleGameComplete = () => {
    setPhase('success');
    setTimeout(() => {
      onComplete();
    }, 3000);
  };

  const renderMiniGame = () => {
    const props = { onComplete: handleGameComplete, onClose };
    switch (parrot.miniGameType) {
      case 'fruit_find': return <FruitFindMission {...props} />;
      case 'rhythm_tap': return <RhythmTapMission {...props} />;
      case 'nest_build': return <NestBuildMission {...props} />;
      case 'match_pair': return <MatchPairMission {...props} />;
      case 'dig_burrow': return <DigBurrowMission {...props} />;
      default: return null;
    }
  };

  if (phase === 'game') {
    return renderMiniGame();
  }

  if (phase === 'success') {
    return (
      <div className="fixed inset-0 z-50 bg-gradient-to-b from-green-400 to-emerald-600 flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          className="text-center"
        >
          <div className="text-7xl mb-6">🦜</div>
          <h1 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
            {parrot.name_ko} 구출 성공!
          </h1>
          <p className="text-xl text-green-100 mb-2">{parrot.description_ko}</p>
          <div className="mt-6 text-white text-lg">도감에 등록되었어요!</div>
        </motion.div>
      </div>
    );
  }

  // intro phase
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
          className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-6xl mb-4">🦜</div>
          <h2 className="text-2xl font-bold text-green-900 mb-2">
            {parrot.name_ko}를 구출하자!
          </h2>
          <p className="text-lg text-gray-600 mb-2">{parrot.description_ko}</p>
          <p className="text-base text-green-600 font-bold mb-6">
            미션: {getMissionName(parrot.miniGameType)}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => setPhase('game')}
              className="flex-1 min-h-14 bg-green-600 text-white font-bold text-lg rounded-2xl active:scale-95 transition-transform"
            >
              시작!
            </button>
            <button
              onClick={onClose}
              className="min-w-14 min-h-14 bg-gray-200 text-gray-700 font-bold text-xl rounded-2xl active:scale-95 transition-transform"
            >
              X
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function getMissionName(type: string): string {
  const names: Record<string, string> = {
    fruit_find: '나뭇잎 뒤에 숨은 열매를 찾아요!',
    rhythm_tap: '음악에 맞춰 탭하세요!',
    nest_build: '나뭇가지로 둥지를 만들어요!',
    match_pair: '같은 색 앵무새를 찾아요!',
    dig_burrow: '탭해서 굴을 파요!',
  };
  return names[type] || '';
}
