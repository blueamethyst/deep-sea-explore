'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { TTS_LANG_PRIMARY, TTS_HIGHLIGHT_INTERVAL_MS } from '@/lib/constants';

type TTSState = 'idle' | 'speaking' | 'error';

interface UseTTSReturn {
  state: TTSState;
  speak: (text: string, lang?: string) => void;
  stop: () => void;
  isSupported: boolean;
  /** fallback 모드일 때 하이라이트할 단어 인덱스 */
  highlightIndex: number;
  /** fallback 모드일 때 단어 배열 */
  words: string[];
}

/**
 * TTS 상태머신 훅
 * - Idle → Speaking → Idle
 * - Speaking → Error → Fallback (텍스트 하이라이트)
 */
export function useTTS(): UseTTSReturn {
  const [state, setState] = useState<TTSState>('idle');
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [words, setWords] = useState<string[]>([]);
  const [isSupported, setIsSupported] = useState(false);

  const fallbackTimerRef = useRef<number | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // TTS 지원 여부 확인
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSupported('speechSynthesis' in window);
    }
  }, []);

  // fallback 타이머 정리
  const clearFallbackTimer = useCallback(() => {
    if (fallbackTimerRef.current !== null) {
      window.clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  }, []);

  // TTS 정지
  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    clearFallbackTimer();
    setState('idle');
    setHighlightIndex(-1);
    setWords([]);
    utteranceRef.current = null;
  }, [clearFallbackTimer]);

  // fallback 모드 시작 (텍스트 하이라이트)
  const startFallbackMode = useCallback((text: string) => {
    // 단어 분리 (공백 및 구두점 기준)
    const wordArray = text.split(/\s+/).filter(w => w.length > 0);
    setWords(wordArray);
    setHighlightIndex(0);

    let index = 0;
    fallbackTimerRef.current = window.setInterval(() => {
      index += 1;
      if (index >= wordArray.length) {
        clearFallbackTimer();
        setState('idle');
        setHighlightIndex(-1);
        setWords([]);
      } else {
        setHighlightIndex(index);
      }
    }, TTS_HIGHLIGHT_INTERVAL_MS);
  }, [clearFallbackTimer]);

  // TTS 실행
  const speak = useCallback((text: string, lang: string = TTS_LANG_PRIMARY) => {
    if (!isSupported) {
      // TTS 미지원 환경에서는 바로 fallback
      setState('error');
      startFallbackMode(text);
      return;
    }

    // 기존 음성 취소
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    clearFallbackTimer();

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = 0.9; // 약간 느리게 (아이들용)
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        setState('speaking');
      };

      utterance.onend = () => {
        setState('idle');
        utteranceRef.current = null;
      };

      utterance.onerror = (event) => {
        console.error('[TTS] 에러 발생:', event);
        setState('error');

        // 에러 토스트는 부모 컴포넌트에서 state를 보고 처리
        // 여기서는 fallback 모드로 전환
        startFallbackMode(text);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);

    } catch (err) {
      console.error('[TTS] speak 실패:', err);
      setState('error');
      startFallbackMode(text);
    }
  }, [isSupported, clearFallbackTimer, startFallbackMode]);

  // cleanup
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    state,
    speak,
    stop,
    isSupported,
    highlightIndex,
    words,
  };
}
