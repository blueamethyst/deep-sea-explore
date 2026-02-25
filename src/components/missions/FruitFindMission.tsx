'use client';

import { useState, useCallback } from 'react';

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

interface LeafSlot {
  id: number;
  x: number;
  y: number;
  hasFruit: boolean;
  revealed: boolean;
  fruit: string;
  leafRotation: number;
}

const FRUITS = ['🍎', '🍊', '🍌', '🍇', '🫐', '🍓'];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateSlots(): LeafSlot[] {
  const positions = [
    { x: 15, y: 20 },
    { x: 50, y: 15 },
    { x: 80, y: 22 },
    { x: 25, y: 48 },
    { x: 55, y: 45 },
    { x: 78, y: 50 },
    { x: 20, y: 72 },
    { x: 60, y: 75 },
  ];

  const shuffledFruits = shuffle(FRUITS);
  const fruitIndices = new Set(shuffle([0, 1, 2, 3, 4, 5, 6, 7]).slice(0, 3));

  return positions.map((pos, i) => ({
    id: i,
    x: pos.x,
    y: pos.y,
    hasFruit: fruitIndices.has(i),
    revealed: false,
    fruit: shuffledFruits[i % shuffledFruits.length],
    leafRotation: Math.random() * 40 - 20,
  }));
}

export default function FruitFindMission({ onComplete, onClose }: Props) {
  const [slots, setSlots] = useState<LeafSlot[]>(() => generateSlots());
  const [foundCount, setFoundCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [shakeId, setShakeId] = useState<number | null>(null);

  const handleTap = useCallback(
    (id: number) => {
      if (completed) return;

      setSlots((prev) => {
        const slot = prev.find((s) => s.id === id);
        if (!slot || slot.revealed) return prev;

        const next = prev.map((s) => (s.id === id ? { ...s, revealed: true } : s));

        if (slot.hasFruit) {
          const newCount = foundCount + 1;
          setFoundCount(newCount);
          if (newCount >= 3) {
            setCompleted(true);
            setTimeout(() => onComplete(), 2000);
          }
        } else {
          setShakeId(id);
          setTimeout(() => setShakeId(null), 400);
        }

        return next;
      });
    },
    [completed, foundCount, onComplete]
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-green-800 via-green-700 to-green-900 select-none overflow-hidden">
      <style jsx>{`
        @keyframes leafReveal {
          0% { transform: scale(1) rotate(var(--rot)); opacity: 1; }
          50% { transform: scale(1.2) rotate(calc(var(--rot) + 30deg)); opacity: 0.6; }
          100% { transform: scale(0) rotate(calc(var(--rot) + 90deg)); opacity: 0; }
        }
        @keyframes fruitPop {
          0% { transform: scale(0); }
          60% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes emptyShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
        @keyframes celebrateBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(180deg); opacity: 0; }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(var(--rot)); }
          50% { transform: rotate(calc(var(--rot) + 5deg)); }
        }
        .leaf-sway {
          animation: leafSway 2s ease-in-out infinite;
        }
        .leaf-reveal {
          animation: leafReveal 0.5s ease-out forwards;
        }
        .fruit-pop {
          animation: fruitPop 0.4s ease-out 0.2s both;
        }
        .empty-shake {
          animation: emptyShake 0.4s ease-out;
        }
        .celebrate {
          animation: celebrateBounce 0.6s ease-in-out infinite;
        }
        .star-burst {
          animation: starBurst 1s ease-out forwards;
        }
      `}</style>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-10">
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl active:scale-90 transition-transform"
        >
          &times;
        </button>
        <div className="bg-white/20 rounded-full px-5 py-2 text-white text-lg font-bold">
          {foundCount} / 3
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-20 text-center z-10">
        <h2 className="text-white text-2xl font-bold drop-shadow-lg">
          {completed ? '🎉 다 찾았어요!' : '🍎 나뭇잎을 눌러 열매를 찾아봐요!'}
        </h2>
      </div>

      {/* Game Area */}
      <div className="relative w-full h-full" style={{ maxWidth: 500, maxHeight: 700 }}>
        {slots.map((slot) => (
          <div
            key={slot.id}
            className="absolute"
            style={{
              left: `${slot.x}%`,
              top: `${slot.y}%`,
              transform: 'translate(-50%, -50%)',
              // @ts-expect-error CSS custom property
              '--rot': `${slot.leafRotation}deg`,
            }}
          >
            {/* Fruit behind leaf */}
            {slot.revealed && slot.hasFruit && (
              <div className="fruit-pop text-6xl absolute inset-0 flex items-center justify-center">
                {slot.fruit}
              </div>
            )}

            {/* Empty spot */}
            {slot.revealed && !slot.hasFruit && (
              <div className="text-4xl absolute inset-0 flex items-center justify-center opacity-50">
                🍂
              </div>
            )}

            {/* Leaf overlay */}
            {!slot.revealed ? (
              <button
                onClick={() => handleTap(slot.id)}
                className={`w-24 h-24 flex items-center justify-center cursor-pointer active:scale-90 transition-transform ${shakeId === slot.id ? 'empty-shake' : 'leaf-sway'}`}
                style={{
                  // @ts-expect-error CSS custom property
                  '--rot': `${slot.leafRotation}deg`,
                }}
              >
                <svg width="96" height="96" viewBox="0 0 96 96">
                  <ellipse
                    cx="48"
                    cy="48"
                    rx="40"
                    ry="32"
                    fill="#2d8a4e"
                    stroke="#1a6b35"
                    strokeWidth="2"
                  />
                  <line x1="48" y1="20" x2="48" y2="76" stroke="#1a6b35" strokeWidth="2" />
                  <line x1="30" y1="35" x2="48" y2="48" stroke="#1a6b35" strokeWidth="1.5" />
                  <line x1="66" y1="35" x2="48" y2="48" stroke="#1a6b35" strokeWidth="1.5" />
                  <line x1="30" y1="58" x2="48" y2="48" stroke="#1a6b35" strokeWidth="1.5" />
                  <line x1="66" y1="58" x2="48" y2="48" stroke="#1a6b35" strokeWidth="1.5" />
                </svg>
              </button>
            ) : (
              <div
                className="leaf-reveal w-24 h-24 flex items-center justify-center pointer-events-none"
                style={{
                  // @ts-expect-error CSS custom property
                  '--rot': `${slot.leafRotation}deg`,
                }}
              >
                <svg width="96" height="96" viewBox="0 0 96 96">
                  <ellipse cx="48" cy="48" rx="40" ry="32" fill="#2d8a4e" opacity="0.5" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Found fruits display */}
      <div className="absolute bottom-8 flex gap-4 z-10">
        {Array.from({ length: 3 }).map((_, i) => {
          const found = slots.filter((s) => s.hasFruit && s.revealed);
          return (
            <div
              key={i}
              className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl border-2 border-white/30"
            >
              {found[i] ? found[i].fruit : '?'}
            </div>
          );
        })}
      </div>

      {/* Completion overlay */}
      {completed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-20">
          <div className="celebrate text-6xl mb-4">🎊</div>
          <p className="text-white text-3xl font-bold drop-shadow-lg">잘했어요!</p>
          <p className="text-white/80 text-xl mt-2">열매를 모두 찾았어요!</p>
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="star-burst absolute text-3xl"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
                animationDelay: `${i * 0.12}s`,
              }}
            >
              ⭐
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
