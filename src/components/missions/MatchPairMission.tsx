'use client';

import { useState, useCallback, useRef } from 'react';

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

interface Card {
  id: number;
  color: string;
  parrotEmoji: string;
  label: string;
  flipped: boolean;
  matched: boolean;
}

const PARROT_TYPES = [
  { color: '#EF4444', parrotEmoji: '🔴', label: '빨간 앵무새' },
  { color: '#3B82F6', parrotEmoji: '🔵', label: '파란 앵무새' },
  { color: '#22C55E', parrotEmoji: '🟢', label: '초록 앵무새' },
  { color: '#EAB308', parrotEmoji: '🟡', label: '노란 앵무새' },
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCards(): Card[] {
  const pairs = PARROT_TYPES.flatMap((type, idx) => [
    {
      id: idx * 2,
      color: type.color,
      parrotEmoji: type.parrotEmoji,
      label: type.label,
      flipped: false,
      matched: false,
    },
    {
      id: idx * 2 + 1,
      color: type.color,
      parrotEmoji: type.parrotEmoji,
      label: type.label,
      flipped: false,
      matched: false,
    },
  ]);
  return shuffle(pairs);
}

export default function MatchPairMission({ onComplete, onClose }: Props) {
  const [cards, setCards] = useState<Card[]>(() => generateCards());
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [checking, setChecking] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCardTap = useCallback(
    (cardId: number) => {
      if (completed || checking) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.flipped || card.matched) return;

      const newFlipped = [...flippedIds, cardId];

      setCards((prev) => prev.map((c) => (c.id === cardId ? { ...c, flipped: true } : c)));
      setFlippedIds(newFlipped);

      if (newFlipped.length === 2) {
        setChecking(true);
        const [firstId, secondId] = newFlipped;
        const first = cards.find((c) => c.id === firstId)!;
        const second = cards.find((c) => c.id === secondId)!;

        // It's actually the card we just flipped for second
        const secondCard = cardId === secondId ? card : second;
        const firstCard = firstId === cardId ? card : first;

        if (firstCard.color === secondCard.color) {
          // Match!
          timeoutRef.current = setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, matched: true } : c
              )
            );
            const newPairs = matchedPairs + 1;
            setMatchedPairs(newPairs);
            setFlippedIds([]);
            setChecking(false);

            if (newPairs >= 4) {
              setCompleted(true);
              setTimeout(() => onComplete(), 2000);
            }
          }, 600);
        } else {
          // No match - flip back
          timeoutRef.current = setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === secondId ? { ...c, flipped: false } : c
              )
            );
            setFlippedIds([]);
            setChecking(false);
          }, 1000);
        }
      }
    },
    [cards, flippedIds, matchedPairs, completed, checking, onComplete]
  );

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-green-800 via-emerald-700 to-green-900 select-none overflow-hidden">
      <style jsx>{`
        @keyframes cardFlip {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(180deg); }
        }
        @keyframes cardUnflip {
          0% { transform: rotateY(180deg); }
          100% { transform: rotateY(0deg); }
        }
        @keyframes matchPop {
          0% { transform: scale(1) rotateY(180deg); }
          50% { transform: scale(1.15) rotateY(180deg); }
          100% { transform: scale(1) rotateY(180deg); }
        }
        @keyframes celebrateBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(180deg); opacity: 0; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .card-container {
          perspective: 800px;
        }
        .card-inner {
          transition: transform 0.4s ease-in-out;
          transform-style: preserve-3d;
          position: relative;
        }
        .card-inner.flipped {
          transform: rotateY(180deg);
        }
        .card-front, .card-back {
          backface-visibility: hidden;
          position: absolute;
          inset: 0;
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .card-back {
          transform: rotateY(180deg);
        }
        .card-matched {
          animation: matchPop 0.4s ease-out;
        }
        .celebrate {
          animation: celebrateBounce 0.6s ease-in-out infinite;
        }
        .star-burst {
          animation: starBurst 1s ease-out forwards;
        }
        .shimmer-bg {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 z-20">
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white text-2xl active:scale-90 transition-transform"
        >
          &times;
        </button>
        <div className="bg-white/20 rounded-full px-5 py-2 text-white text-lg font-bold">
          {matchedPairs} / 4
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-20 text-center z-20">
        <h2 className="text-white text-2xl font-bold drop-shadow-lg">
          {completed ? '🎉 모두 찾았어요!' : '🦜 같은 앵무새 짝을 찾아봐요!'}
        </h2>
      </div>

      {/* Card Grid */}
      <div className="grid grid-cols-4 gap-3 p-4 mt-20" style={{ maxWidth: 400 }}>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardTap(card.id)}
            className="card-container aspect-[3/4] w-full"
            disabled={card.flipped || card.matched || checking}
          >
            <div
              className={`card-inner w-full h-full ${card.flipped || card.matched ? 'flipped' : ''} ${card.matched ? 'card-matched' : ''}`}
            >
              {/* Front (face down) */}
              <div className="card-front bg-emerald-600 border-3 border-emerald-400 shadow-lg">
                <div className="shimmer-bg absolute inset-0 rounded-2xl" />
                <span className="text-3xl z-10">🌿</span>
                <span className="text-xs text-white/60 mt-1 z-10">?</span>
              </div>

              {/* Back (face up) */}
              <div
                className="card-back border-3 shadow-lg"
                style={{
                  backgroundColor: card.matched ? `${card.color}33` : '#ffffff',
                  borderColor: card.color,
                }}
              >
                {/* Parrot SVG */}
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <circle cx="25" cy="18" r="12" fill={card.color} />
                  <ellipse cx="25" cy="35" rx="10" ry="12" fill={card.color} />
                  <circle cx="21" cy="15" r="2.5" fill="white" />
                  <circle cx="21" cy="15" r="1.2" fill="#333" />
                  <path d="M28 18 L35 16 L28 20 Z" fill="#FF9800" />
                  <ellipse cx="18" cy="30" rx="6" ry="3" fill={card.color} transform="rotate(-20 18 30)" opacity="0.7" />
                  <ellipse cx="32" cy="30" rx="6" ry="3" fill={card.color} transform="rotate(20 32 30)" opacity="0.7" />
                </svg>
                <span className="text-xs font-bold mt-1" style={{ color: card.color }}>
                  {card.label}
                </span>
                {card.matched && <span className="absolute top-1 right-1 text-lg">✅</span>}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Matched pairs display */}
      <div className="absolute bottom-8 flex gap-3 z-20">
        {PARROT_TYPES.map((type, i) => (
          <div
            key={i}
            className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all duration-300 ${
              i < matchedPairs
                ? 'border-yellow-300 bg-yellow-400/30 scale-110'
                : 'border-white/30 bg-white/10'
            }`}
          >
            {i < matchedPairs ? '🦜' : '❓'}
          </div>
        ))}
      </div>

      {/* Completion overlay */}
      {completed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-30">
          <div className="celebrate text-6xl mb-4">🎊</div>
          <p className="text-white text-3xl font-bold drop-shadow-lg">대단해요!</p>
          <p className="text-white/80 text-xl mt-2">짝꿍을 모두 찾았어요!</p>
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
