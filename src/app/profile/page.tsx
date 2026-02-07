'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FAMILY_COLORS } from '@/lib/constants';
import { loadStorage, saveStorage } from '@/lib/storage';
import { CharacterSVG } from '@/components/creatures/CharacterSVG';

interface FamilyMember {
  role: 'dad' | 'mom' | 'child';
  name: string;
  label: string;
  color: string;
  avatars: string[];
}

const FAMILY_MEMBERS: FamilyMember[] = [
  {
    role: 'dad',
    name: '아빠',
    label: '아빠 캐릭터를 골라주세요!',
    color: FAMILY_COLORS.dad,
    avatars: ['dad_01', 'dad_02', 'dad_03', 'dad_04', 'dad_05', 'dad_06'],
  },
  {
    role: 'mom',
    name: '엄마',
    label: '엄마 캐릭터를 골라주세요!',
    color: FAMILY_COLORS.mom,
    avatars: ['mom_01', 'mom_02', 'mom_03', 'mom_04', 'mom_05', 'mom_06'],
  },
  {
    role: 'child',
    name: '서연',
    label: '서연이 캐릭터를 골라주세요!',
    color: FAMILY_COLORS.child,
    avatars: ['child_01', 'child_02', 'child_03', 'child_04', 'child_05', 'child_06'],
  },
];

export default function ProfilePage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({
    dad: '',
    mom: '',
    child: '',
  });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    const storage = loadStorage();
    if (storage.family.setupComplete) {
      setSelections({
        dad: storage.family.dad.avatarId,
        mom: storage.family.mom.avatarId,
        child: storage.family.child.avatarId,
      });
    }
  }, []);

  const currentMember = FAMILY_MEMBERS[step];
  const isLastStep = step === FAMILY_MEMBERS.length - 1;
  const hasSelection = selections[currentMember?.role] !== '';

  const handleAvatarSelect = (avatarId: string) => {
    setSelections((prev) => ({
      ...prev,
      [currentMember.role]: avatarId,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      setShowPreview(true);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleStart = () => {
    const storage = loadStorage();
    const newStorage = {
      ...storage,
      family: {
        dad: { name: '아빠', avatarId: selections.dad, color: FAMILY_COLORS.dad },
        mom: { name: '엄마', avatarId: selections.mom, color: FAMILY_COLORS.mom },
        child: { name: '서연', avatarId: selections.child, color: FAMILY_COLORS.child },
        setupComplete: true,
      },
    };
    saveStorage(newStorage);
    router.push('/');
  };

  if (!currentMember) return null;

  if (showPreview) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-400 flex flex-col items-center justify-center p-6">
        <div className="max-w-2xl w-full space-y-8">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            우리 가족 탐험대 완성!
          </h1>

          <div className="flex justify-center gap-6">
            {FAMILY_MEMBERS.map((member) => (
              <div
                key={member.role}
                className="flex flex-col items-center gap-3"
              >
                <div
                  className="w-32 h-32 rounded-3xl shadow-2xl flex items-center justify-center"
                  style={{ backgroundColor: member.color }}
                >
                  <CharacterSVG
                    characterId={selections[member.role]}
                    size={96}
                    color={member.color}
                  />
                </div>
                <p className="text-xl font-bold text-white">{member.name}</p>
                <p className="text-sm text-blue-100">{selections[member.role]}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleStart}
            className="w-full min-h-16 bg-white text-blue-600 font-bold text-2xl rounded-3xl shadow-xl active:scale-95 transition-transform"
          >
            시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-400 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full space-y-8">
        {/* 진행 표시 */}
        <div className="flex justify-center gap-3 mb-8">
          {FAMILY_MEMBERS.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-16 rounded-full transition-all ${
                idx === step
                  ? 'bg-white scale-110'
                  : idx < step
                  ? 'bg-white/70'
                  : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        <h1 className="text-3xl font-bold text-white text-center mb-8">
          {currentMember.label}
        </h1>

        {/* 선택된 아바타 프리뷰 */}
        {hasSelection && (
          <div className="flex flex-col items-center gap-4 mb-6">
            <div
              className="w-32 h-32 rounded-3xl shadow-2xl flex items-center justify-center transform scale-110"
              style={{ backgroundColor: currentMember.color }}
            >
              <CharacterSVG
                characterId={selections[currentMember.role]}
                size={96}
                color={currentMember.color}
              />
            </div>
            <p className="text-white text-lg font-medium">
              {selections[currentMember.role]}
            </p>
          </div>
        )}

        {/* 아바타 그리드 */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {currentMember.avatars.map((avatarId) => (
            <button
              key={avatarId}
              onClick={() => handleAvatarSelect(avatarId)}
              className={`aspect-square rounded-2xl shadow-lg transition-all active:scale-95 ${
                selections[currentMember.role] === avatarId
                  ? 'ring-4 ring-white scale-105'
                  : 'bg-white/90'
              }`}
              style={{
                backgroundColor:
                  selections[currentMember.role] === avatarId
                    ? currentMember.color
                    : undefined,
              }}
            >
              <div className="w-full h-full flex flex-col items-center justify-center gap-2 p-4">
                <CharacterSVG
                  characterId={avatarId}
                  size={64}
                  color={currentMember.color}
                />
                <p className={`text-sm font-medium ${
                  selections[currentMember.role] === avatarId
                    ? 'text-white'
                    : 'text-gray-700'
                }`}>
                  {avatarId}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* 다음 버튼 */}
        <button
          onClick={handleNext}
          disabled={!hasSelection}
          className={`w-full min-h-16 font-bold text-2xl rounded-3xl shadow-xl transition-all ${
            hasSelection
              ? 'bg-white text-blue-600 active:scale-95'
              : 'bg-white/50 text-blue-300 cursor-not-allowed'
          }`}
        >
          {isLastStep ? '완성!' : '다음'}
        </button>
      </div>
    </div>
  );
}
