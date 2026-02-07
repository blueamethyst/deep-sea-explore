'use client';

import { useEffect, useState } from 'react';

export type ToastType = 'info' | 'success' | 'warning' | 'error';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose?: () => void;
}

/**
 * 알림 토스트 컴포넌트
 * - TTS 에러, 수집 알림 등에 사용
 * - 자동으로 사라짐
 */
export function Toast({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}: ToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 마운트 후 애니메이션 시작
    const showTimer = setTimeout(() => setVisible(true), 50);

    // duration 후 페이드아웃
    const hideTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, duration);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [duration, onClose]);

  const typeStyles = {
    info: 'bg-blue-500',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };

  const typeIcons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
  };

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4'
      }`}
    >
      <div
        className={`${typeStyles[type]} text-white px-6 py-4 rounded-2xl shadow-lg flex items-center gap-3 min-w-[200px] max-w-md`}
      >
        <div className="text-2xl">{typeIcons[type]}</div>
        <div className="text-lg font-medium">{message}</div>
      </div>
    </div>
  );
}
