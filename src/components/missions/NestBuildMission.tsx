'use client';

import { useState, useRef, useCallback, useEffect } from 'react';

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

interface Stick {
  id: number;
  x: number;
  y: number;
  rotation: number;
  placed: boolean;
  dragging: boolean;
  width: number;
}

const NEST_CENTER_X = 50;
const NEST_CENTER_Y = 55;
const NEST_RADIUS = 18; // percentage - generous drop zone

function generateSticks(): Stick[] {
  const positions = [
    { x: 12, y: 20 },
    { x: 78, y: 25 },
    { x: 15, y: 75 },
    { x: 82, y: 70 },
    { x: 50, y: 85 },
  ];

  return positions.map((pos, i) => ({
    id: i,
    x: pos.x,
    y: pos.y,
    rotation: Math.random() * 120 - 60,
    placed: false,
    dragging: false,
    width: 80 + Math.random() * 40,
  }));
}

export default function NestBuildMission({ onComplete, onClose }: Props) {
  const [sticks, setSticks] = useState<Stick[]>(() => generateSticks());
  const [placedCount, setPlacedCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [nestGlow, setNestGlow] = useState(false);
  const dragRef = useRef<{
    id: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const completeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => { if (completeTimerRef.current) clearTimeout(completeTimerRef.current); };
  }, []);

  const getEventPos = (e: React.TouchEvent | React.MouseEvent) => {
    if ('touches' in e && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    if ('clientX' in e) {
      return { clientX: e.clientX, clientY: e.clientY };
    }
    return { clientX: 0, clientY: 0 };
  };

  const toPercent = (clientX: number, clientY: number) => {
    if (!containerRef.current) return { px: 0, py: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return {
      px: ((clientX - rect.left) / rect.width) * 100,
      py: ((clientY - rect.top) / rect.height) * 100,
    };
  };

  const handleStart = useCallback(
    (e: React.TouchEvent | React.MouseEvent, stickId: number) => {
      e.preventDefault();
      const stick = sticks.find((s) => s.id === stickId);
      if (!stick || stick.placed || completed) return;

      const { clientX, clientY } = getEventPos(e);
      const { px, py } = toPercent(clientX, clientY);

      dragRef.current = {
        id: stickId,
        offsetX: px - stick.x,
        offsetY: py - stick.y,
      };

      setSticks((prev) => prev.map((s) => (s.id === stickId ? { ...s, dragging: true } : s)));
    },
    [sticks, completed]
  );

  const handleMove = useCallback(
    (e: React.TouchEvent | React.MouseEvent) => {
      e.preventDefault();
      if (!dragRef.current) return;

      const { clientX, clientY } = getEventPos(e);
      const { px, py } = toPercent(clientX, clientY);
      const { id, offsetX, offsetY } = dragRef.current;

      setSticks((prev) =>
        prev.map((s) =>
          s.id === id ? { ...s, x: px - offsetX, y: py - offsetY } : s
        )
      );

      // Check proximity to nest for glow effect
      const dist = Math.sqrt(
        Math.pow(px - offsetX - NEST_CENTER_X, 2) + Math.pow(py - offsetY - NEST_CENTER_Y, 2)
      );
      setNestGlow(dist < NEST_RADIUS + 5);
    },
    []
  );

  const handleEnd = useCallback(() => {
    if (!dragRef.current) return;

    const { id } = dragRef.current;
    dragRef.current = null;
    setNestGlow(false);

    setSticks((prev) => {
      const stick = prev.find((s) => s.id === id);
      if (!stick) return prev;

      const dist = Math.sqrt(
        Math.pow(stick.x - NEST_CENTER_X, 2) + Math.pow(stick.y - NEST_CENTER_Y, 2)
      );

      if (dist < NEST_RADIUS) {
        // Place the stick in nest
        const angle = (placedCount * 36) + Math.random() * 20 - 10;
        const newCount = placedCount + 1;
        setPlacedCount(newCount);

        if (newCount >= 5) {
          setCompleted(true);
          completeTimerRef.current = setTimeout(() => onComplete(), 2200);
        }

        return prev.map((s) =>
          s.id === id
            ? {
                ...s,
                x: NEST_CENTER_X + (Math.random() * 8 - 4),
                y: NEST_CENTER_Y + (Math.random() * 6 - 3),
                rotation: angle,
                placed: true,
                dragging: false,
              }
            : s
        );
      }

      return prev.map((s) => (s.id === id ? { ...s, dragging: false } : s));
    });
  }, [placedCount, onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-b from-sky-400 via-green-600 to-amber-800 select-none overflow-hidden touch-none"
      onMouseMove={handleMove}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchMove={handleMove}
      onTouchEnd={handleEnd}
      onTouchCancel={handleEnd}
    >
      <style jsx>{`
        @keyframes nestPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); box-shadow: 0 0 20px rgba(255,200,0,0.3); }
          50% { transform: translate(-50%, -50%) scale(1.05); box-shadow: 0 0 40px rgba(255,200,0,0.6); }
        }
        @keyframes stickPlace {
          0% { transform: scale(1.2); }
          50% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }
        @keyframes celebrateBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(180deg); opacity: 0; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(var(--rot)); }
          25% { transform: rotate(calc(var(--rot) + 3deg)); }
          75% { transform: rotate(calc(var(--rot) - 3deg)); }
        }
        .nest-pulse {
          animation: nestPulse 2s ease-in-out infinite;
        }
        .stick-place {
          animation: stickPlace 0.3s ease-out;
        }
        .celebrate {
          animation: celebrateBounce 0.6s ease-in-out infinite;
        }
        .star-burst {
          animation: starBurst 1s ease-out forwards;
        }
        .stick-wiggle {
          animation: wiggle 1.5s ease-in-out infinite;
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
          {placedCount} / 5
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-20 text-center z-20">
        <h2 className="text-white text-2xl font-bold drop-shadow-lg">
          {completed ? '🎉 둥지 완성!' : '🪹 나뭇가지를 둥지로 끌어다 놓아요!'}
        </h2>
      </div>

      {/* Nest target area */}
      <div
        className={`absolute rounded-full border-4 border-dashed ${nestGlow ? 'border-yellow-300 bg-yellow-300/20' : 'border-amber-600/60 bg-amber-900/30'} transition-all duration-300 ${!completed ? 'nest-pulse' : ''}`}
        style={{
          left: `${NEST_CENTER_X}%`,
          top: `${NEST_CENTER_Y}%`,
          width: `${NEST_RADIUS * 2}%`,
          height: `${NEST_RADIUS * 2}%`,
          transform: 'translate(-50%, -50%)',
          borderRadius: '50%',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {placedCount === 0 && (
            <span className="text-amber-300/60 text-5xl">🪹</span>
          )}
          {completed && (
            <span className="text-5xl">🐣</span>
          )}
        </div>
      </div>

      {/* Sticks */}
      {sticks.map((stick) => (
        <div
          key={stick.id}
          className={`absolute z-10 ${stick.placed ? 'stick-place pointer-events-none' : 'cursor-grab active:cursor-grabbing'} ${!stick.placed && !stick.dragging ? 'stick-wiggle' : ''}`}
          style={{
            left: `${stick.x}%`,
            top: `${stick.y}%`,
            transform: `translate(-50%, -50%) rotate(${stick.rotation}deg)`,
            // @ts-expect-error CSS custom property
            '--rot': `${stick.rotation}deg`,
            zIndex: stick.dragging ? 30 : stick.placed ? 5 : 10,
            opacity: stick.placed ? 0.8 : 1,
          }}
          onMouseDown={(e) => handleStart(e, stick.id)}
          onTouchStart={(e) => handleStart(e, stick.id)}
        >
          {/* Stick SVG */}
          <svg
            width={stick.width}
            height="20"
            viewBox={`0 0 ${stick.width} 20`}
            className={`${stick.dragging ? 'scale-110' : ''} transition-transform drop-shadow-lg`}
          >
            <rect
              x="0"
              y="5"
              width={stick.width}
              height="10"
              rx="5"
              fill={stick.placed ? '#8B6914' : '#A0784C'}
              stroke="#6B4E2A"
              strokeWidth="1.5"
            />
            <rect
              x="4"
              y="7"
              width={stick.width - 8}
              height="3"
              rx="1.5"
              fill="#C4A265"
              opacity="0.4"
            />
            {/* Little branch bumps */}
            <circle cx={stick.width * 0.3} cy="5" r="3" fill="#8B6914" />
            <circle cx={stick.width * 0.7} cy="15" r="2.5" fill="#8B6914" />
          </svg>
        </div>
      ))}

      {/* Progress at bottom */}
      <div className="absolute bottom-8 flex gap-3 z-20">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl transition-all duration-300 ${
              i < placedCount
                ? 'bg-amber-500 border-amber-400 scale-110'
                : 'bg-white/10 border-white/30'
            }`}
          >
            {i < placedCount ? '🪵' : ''}
          </div>
        ))}
      </div>

      {/* Completion overlay */}
      {completed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-30">
          <div className="celebrate text-6xl mb-4">🎊</div>
          <p className="text-white text-3xl font-bold drop-shadow-lg">훌륭해요!</p>
          <p className="text-white/80 text-xl mt-2">멋진 둥지를 만들었어요!</p>
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
