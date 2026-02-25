'use client';

import { useState, useCallback, useRef } from 'react';

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

interface DirtParticle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const DIRT_COLORS = ['#8B6914', '#A0784C', '#6B4E2A', '#C4A265', '#D4A574'];

export default function DigBurrowMission({ onComplete, onClose }: Props) {
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [taps, setTaps] = useState(0);
  const [particles, setParticles] = useState<DirtParticle[]>([]);
  const [shaking, setShaking] = useState(false);
  const particleIdRef = useRef(0);
  const completedRef = useRef(false);

  const spawnParticles = useCallback((tapX: number, tapY: number) => {
    const count = 5 + Math.floor(Math.random() * 4);
    const newParticles: DirtParticle[] = [];

    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: particleIdRef.current++,
        x: tapX + (Math.random() * 40 - 20),
        y: tapY,
        vx: (Math.random() - 0.5) * 60,
        vy: -(20 + Math.random() * 40),
        size: 4 + Math.random() * 8,
        color: DIRT_COLORS[Math.floor(Math.random() * DIRT_COLORS.length)],
      });
    }

    setParticles((prev) => [...prev, ...newParticles]);

    // Clean up particles after animation
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 800);
  }, []);

  const handleTap = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (completedRef.current) return;

      const increment = 3 + Math.random() * 2; // 3-5%
      const newProgress = Math.min(progress + increment, 100);

      setProgress(newProgress);
      setTaps((prev) => prev + 1);

      // Screen shake
      setShaking(true);
      setTimeout(() => setShaking(false), 100);

      // Spawn dirt particles at tap location
      let clientX: number, clientY: number;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = window.innerWidth / 2;
        clientY = window.innerHeight * 0.7;
      }

      spawnParticles(clientX, clientY);

      if (newProgress >= 100 && !completedRef.current) {
        completedRef.current = true;
        setCompleted(true);
        setTimeout(() => onComplete(), 2200);
      }
    },
    [progress, onComplete, spawnParticles]
  );

  const depthLevel = Math.floor(progress / 25);
  const depthLabels = ['땅 표면', '얕은 땅', '중간 깊이', '깊은 땅'];
  const burrowDepth = (progress / 100) * 60; // visual depth percentage

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-b from-sky-300 via-green-600 to-amber-900 select-none overflow-hidden ${shaking ? 'translate-x-[2px]' : ''}`}
      style={{ transition: shaking ? 'none' : 'transform 0.1s' }}
    >
      <style jsx>{`
        @keyframes dirtFly {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--vx), var(--vy)) rotate(360deg);
            opacity: 0;
          }
        }
        @keyframes progressGlow {
          0%, 100% { box-shadow: 0 0 10px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6); }
        }
        @keyframes celebrateBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(180deg); opacity: 0; }
        }
        @keyframes wormPeek {
          0%, 100% { transform: translateY(100%); }
          50% { transform: translateY(0); }
        }
        @keyframes tapHint {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        .dirt-fly {
          animation: dirtFly 0.7s ease-out forwards;
        }
        .progress-glow {
          animation: progressGlow 2s ease-in-out infinite;
        }
        .celebrate {
          animation: celebrateBounce 0.6s ease-in-out infinite;
        }
        .star-burst {
          animation: starBurst 1s ease-out forwards;
        }
        .worm-peek {
          animation: wormPeek 3s ease-in-out infinite;
        }
        .tap-hint {
          animation: tapHint 1.5s ease-in-out infinite;
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
          {Math.floor(progress)}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-20 left-8 right-8 z-20">
        <div className="progress-glow h-6 bg-white/20 rounded-full overflow-hidden border-2 border-white/30">
          <div
            className="h-full rounded-full transition-all duration-200 ease-out"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, #22c55e, #16a34a, ${progress > 80 ? '#eab308' : '#22c55e'})`,
            }}
          />
        </div>
        <p className="text-center text-white/80 text-sm mt-1 font-bold">
          {depthLabels[Math.min(depthLevel, 3)]}
        </p>
      </div>

      {/* Title */}
      <div className="absolute top-36 text-center z-20">
        <h2 className="text-white text-2xl font-bold drop-shadow-lg">
          {completed ? '🎉 굴 완성!' : '⛏️ 땅을 빠르게 눌러 굴을 파요!'}
        </h2>
      </div>

      {/* Ground Scene */}
      <div className="absolute bottom-0 left-0 right-0 z-10" style={{ height: '55%' }}>
        {/* Grass layer */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-green-500 z-10">
          <div className="absolute bottom-0 left-0 right-0 flex justify-around">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="w-3 h-6 bg-green-400 rounded-t-full"
                style={{ transform: `rotate(${Math.random() * 20 - 10}deg)` }}
              />
            ))}
          </div>
        </div>

        {/* Dirt area - tappable */}
        <button
          onClick={handleTap}
          onTouchStart={handleTap}
          className="absolute inset-0 top-8 cursor-pointer active:opacity-90"
          style={{
            background: `linear-gradient(180deg, #8B6914 0%, #6B4E2A 40%, #4A3520 100%)`,
          }}
        >
          {/* Burrow hole */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 transition-all duration-200"
            style={{
              width: `${40 + progress * 0.3}%`,
              height: `${burrowDepth}%`,
              background: 'linear-gradient(180deg, #2a1a0a, #1a0f05)',
              borderRadius: '0 0 50% 50%',
              boxShadow: 'inset 0 5px 15px rgba(0,0,0,0.5)',
            }}
          >
            {/* Worm easter egg at ~50% */}
            {progress > 45 && progress < 70 && (
              <div className="worm-peek absolute bottom-2 left-1/3 text-2xl">
                🪱
              </div>
            )}

            {/* Completed burrow contents */}
            {completed && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-4xl">
                🐰
              </div>
            )}
          </div>

          {/* Scattered rocks */}
          {[15, 35, 65, 80].map((x, i) => (
            <div
              key={i}
              className="absolute text-xl opacity-50"
              style={{
                left: `${x}%`,
                top: `${20 + i * 15}%`,
                transform: `rotate(${i * 45}deg)`,
              }}
            >
              🪨
            </div>
          ))}

          {/* Tap hint */}
          {progress < 10 && (
            <div className="tap-hint absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
              <span className="text-5xl">👆</span>
              <p className="text-white text-lg font-bold mt-2 drop-shadow-lg">여기를 빠르게 눌러요!</p>
            </div>
          )}
        </button>
      </div>

      {/* Dirt particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="dirt-fly fixed rounded-full pointer-events-none z-30"
          style={{
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            // @ts-expect-error CSS custom property
            '--vx': `${p.vx}px`,
            '--vy': `${p.vy}px`,
          }}
        />
      ))}

      {/* Tap counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <div className="bg-amber-800/60 rounded-full px-6 py-2 text-white text-lg font-bold border-2 border-amber-600/40">
          ⛏️ {taps}번 팠어요!
        </div>
      </div>

      {/* Completion overlay */}
      {completed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-40">
          <div className="celebrate text-6xl mb-4">🎊</div>
          <p className="text-white text-3xl font-bold drop-shadow-lg">멋져요!</p>
          <p className="text-white/80 text-xl mt-2">굴을 다 팠어요!</p>
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
