'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

interface Props {
  onComplete: () => void;
  onClose: () => void;
}

interface Note {
  id: number;
  x: number;
  y: number;
  color: string;
  emoji: string;
  hit: boolean;
  missed: boolean;
  speed: number;
}

const NOTE_COLORS = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A78BFA', '#F472B6', '#34D399', '#60A5FA', '#FB923C'];
const NOTE_EMOJIS = ['🎵', '🎶', '🎵', '🎶', '🎵', '🎶', '🎵', '🎶'];
const TOTAL_NOTES = 8;
const REQUIRED_HITS = 5;
const HIT_ZONE_TOP = 75; // percentage from top
const HIT_ZONE_HEIGHT = 18; // percentage - very forgiving
const NOTE_SPEED = 0.35; // percentage per frame - slow speed

export default function RhythmTapMission({ onComplete, onClose }: Props) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [hits, setHits] = useState(0);
  const [spawned, setSpawned] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number }[]>([]);
  const [started, setStarted] = useState(false);
  const animFrameRef = useRef<number>(0);
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const notesRef = useRef<Note[]>([]);
  const hitsRef = useRef(0);
  const spawnedRef = useRef(0);
  const completedRef = useRef(false);
  const rippleIdRef = useRef(0);

  notesRef.current = notes;
  hitsRef.current = hits;
  spawnedRef.current = spawned;
  completedRef.current = completed;

  const spawnNote = useCallback(() => {
    if (spawnedRef.current >= TOTAL_NOTES || completedRef.current) return;

    const idx = spawnedRef.current;
    const newNote: Note = {
      id: idx,
      x: 15 + Math.random() * 70,
      y: -8,
      color: NOTE_COLORS[idx % NOTE_COLORS.length],
      emoji: NOTE_EMOJIS[idx % NOTE_EMOJIS.length],
      hit: false,
      missed: false,
      speed: NOTE_SPEED + Math.random() * 0.08,
    };

    setNotes((prev) => [...prev, newNote]);
    setSpawned((prev) => prev + 1);
  }, []);

  const startGame = useCallback(() => {
    setStarted(true);
    spawnNote();
  }, [spawnNote]);

  // Spawn notes periodically
  useEffect(() => {
    if (!started || completed) return;

    if (spawned < TOTAL_NOTES) {
      spawnTimerRef.current = setTimeout(() => {
        spawnNote();
      }, 1600 + Math.random() * 800);
    }

    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
    };
  }, [spawned, started, completed, spawnNote]);

  // Animation loop
  useEffect(() => {
    if (!started || completed) return;

    const animate = () => {
      setNotes((prev) =>
        prev.map((note) => {
          if (note.hit || note.missed) return note;
          const newY = note.y + note.speed;
          if (newY > 100) {
            return { ...note, y: newY, missed: true };
          }
          return { ...note, y: newY };
        })
      );
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [started, completed]);

  const handleTapZone = useCallback(() => {
    if (completedRef.current) return;

    const hittable = notesRef.current.filter(
      (n) => !n.hit && !n.missed && n.y >= HIT_ZONE_TOP - HIT_ZONE_HEIGHT / 2 && n.y <= HIT_ZONE_TOP + HIT_ZONE_HEIGHT / 2
    );

    if (hittable.length > 0) {
      const closest = hittable.reduce((a, b) =>
        Math.abs(a.y - HIT_ZONE_TOP) < Math.abs(b.y - HIT_ZONE_TOP) ? a : b
      );

      setNotes((prev) => prev.map((n) => (n.id === closest.id ? { ...n, hit: true } : n)));

      const newHits = hitsRef.current + 1;
      setHits(newHits);

      const rid = rippleIdRef.current++;
      setRipples((prev) => [...prev, { id: rid, x: closest.x }]);
      setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== rid)), 600);

      if (newHits >= REQUIRED_HITS) {
        setCompleted(true);
        setTimeout(() => onComplete(), 2000);
      }
    }
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center bg-gradient-to-b from-green-900 via-emerald-800 to-green-950 select-none overflow-hidden">
      <style jsx>{`
        @keyframes noteFall {
          from { opacity: 0; transform: scale(0.5); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes noteHit {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.8); opacity: 0.8; }
          100% { transform: scale(0); opacity: 0; }
        }
        @keyframes rippleOut {
          0% { transform: translate(-50%, -50%) scale(0); opacity: 0.8; }
          100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
        }
        @keyframes zonePulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
        @keyframes celebrateBounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.15); }
        }
        @keyframes starBurst {
          0% { transform: scale(0) rotate(0deg); opacity: 1; }
          100% { transform: scale(2) rotate(180deg); opacity: 0; }
        }
        @keyframes floatUp {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-40px); opacity: 0; }
        }
        .note-appear {
          animation: noteFall 0.3s ease-out;
        }
        .note-hit {
          animation: noteHit 0.4s ease-out forwards;
        }
        .ripple {
          animation: rippleOut 0.6s ease-out forwards;
        }
        .zone-pulse {
          animation: zonePulse 1.5s ease-in-out infinite;
        }
        .celebrate {
          animation: celebrateBounce 0.6s ease-in-out infinite;
        }
        .star-burst {
          animation: starBurst 1s ease-out forwards;
        }
        .hit-text {
          animation: floatUp 0.6s ease-out forwards;
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
          {hits} / {REQUIRED_HITS}
        </div>
      </div>

      {/* Title */}
      <div className="absolute top-20 text-center z-20">
        <h2 className="text-white text-2xl font-bold drop-shadow-lg">
          {completed
            ? '🎉 완벽해요!'
            : started
            ? '🎵 음표가 내려오면 동그라미를 눌러요!'
            : '🎵 리듬 탭'}
        </h2>
      </div>

      {!started && (
        <button
          onClick={startGame}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-yellow-400 text-green-900 text-3xl font-bold px-10 py-5 rounded-3xl shadow-lg active:scale-95 transition-transform"
        >
          시작! 🎶
        </button>
      )}

      {/* Notes */}
      {notes.map((note) => (
        <div
          key={note.id}
          className={`absolute z-10 text-5xl pointer-events-none ${note.hit ? 'note-hit' : note.missed ? 'opacity-30' : 'note-appear'}`}
          style={{
            left: `${note.x}%`,
            top: `${note.y}%`,
            transform: 'translate(-50%, -50%)',
            color: note.color,
            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
          }}
        >
          {note.emoji}
        </div>
      ))}

      {/* Hit zone */}
      {started && !completed && (
        <button
          onClick={handleTapZone}
          className="absolute z-15 w-full cursor-pointer"
          style={{
            top: `${HIT_ZONE_TOP - HIT_ZONE_HEIGHT / 2}%`,
            height: `${HIT_ZONE_HEIGHT}%`,
          }}
        >
          <div className="zone-pulse w-full h-full border-t-4 border-b-4 border-yellow-300/50 bg-yellow-300/15 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full border-4 border-yellow-300 bg-yellow-300/20 flex items-center justify-center">
              <span className="text-yellow-300 text-3xl">👆</span>
            </div>
          </div>
        </button>
      )}

      {/* Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="ripple absolute z-16 w-16 h-16 rounded-full bg-yellow-300/50 pointer-events-none"
          style={{
            left: `${r.x}%`,
            top: `${HIT_ZONE_TOP}%`,
          }}
        />
      ))}

      {/* Score display at bottom */}
      <div className="absolute bottom-8 flex gap-2 z-20">
        {Array.from({ length: REQUIRED_HITS }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg transition-all duration-300 ${
              i < hits ? 'bg-yellow-400 border-yellow-300 scale-110' : 'bg-white/10 border-white/30'
            }`}
          >
            {i < hits ? '⭐' : ''}
          </div>
        ))}
      </div>

      {/* Completion overlay */}
      {completed && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 z-30">
          <div className="celebrate text-6xl mb-4">🎊</div>
          <p className="text-white text-3xl font-bold drop-shadow-lg">최고예요!</p>
          <p className="text-white/80 text-xl mt-2">리듬감이 대단해요!</p>
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
