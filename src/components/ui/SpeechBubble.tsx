'use client';

interface SpeechBubbleProps {
  text: string;
  direction?: 'left' | 'right' | 'top' | 'bottom';
  highlightIndex?: number;
  words?: string[];
  className?: string;
}

/**
 * 말풍선 컴포넌트
 * - TTS fallback 시 단어 하이라이트 지원
 * - 꼬리 방향 지정 가능
 */
export function SpeechBubble({
  text,
  direction = 'bottom',
  highlightIndex = -1,
  words = [],
  className = '',
}: SpeechBubbleProps) {
  const hasFallback = words.length > 0 && highlightIndex >= 0;

  // 꼬리 스타일
  const tailStyles = {
    left: 'before:left-4 before:top-full before:border-t-white before:border-l-transparent before:border-r-transparent',
    right: 'before:right-4 before:top-full before:border-t-white before:border-l-transparent before:border-r-transparent',
    top: 'before:left-1/2 before:-translate-x-1/2 before:bottom-full before:border-b-white before:border-l-transparent before:border-r-transparent',
    bottom: 'before:left-1/2 before:-translate-x-1/2 before:top-full before:border-t-white before:border-l-transparent before:border-r-transparent',
  };

  return (
    <div
      className={`relative bg-white rounded-2xl px-6 py-4 shadow-lg max-w-md before:content-[''] before:absolute before:border-8 ${tailStyles[direction]} ${className}`}
    >
      {hasFallback ? (
        <p className="text-gray-800 text-lg leading-relaxed">
          {words.map((word, idx) => (
            <span
              key={idx}
              className={`transition-colors duration-150 ${
                idx === highlightIndex
                  ? 'bg-yellow-200 font-bold'
                  : ''
              }`}
            >
              {word}{' '}
            </span>
          ))}
        </p>
      ) : (
        <p className="text-gray-800 text-lg leading-relaxed">{text}</p>
      )}
    </div>
  );
}
