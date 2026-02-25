'use client';

import { useCallback, useEffect, useRef } from 'react';
import { TelemetryEvent } from '@/types/telemetry';
import {
  IDB_NAME,
  IDB_EVENTS_STORE,
  MAX_EVENTS,
  MAX_EVENTS_SIZE_BYTES,
} from '@/lib/constants';

interface UseTelemetryReturn {
  trackEvent: (event: TelemetryEvent) => void;
  getEvents: () => Promise<TelemetryEvent[]>;
}

function idbRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbTransaction(tx: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

function initDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(IDB_NAME, 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(IDB_EVENTS_STORE)) {
        const store = db.createObjectStore(IDB_EVENTS_STORE, {
          keyPath: 'ts',
          autoIncrement: false,
        });
        store.createIndex('type', 'type', { unique: false });
      }
    };
  });
}

async function addEvent(db: IDBDatabase, event: TelemetryEvent): Promise<void> {
  // 1) 이벤트 추가
  const addTx = db.transaction(IDB_EVENTS_STORE, 'readwrite');
  addTx.objectStore(IDB_EVENTS_STORE).add(event);
  await idbTransaction(addTx);

  // 2) 별도 트랜잭션에서 오래된 이벤트 정리
  try {
    const cleanTx = db.transaction(IDB_EVENTS_STORE, 'readwrite');
    const store = cleanTx.objectStore(IDB_EVENTS_STORE);
    const allKeys = await idbRequest(store.getAllKeys());

    if (allKeys.length > MAX_EVENTS) {
      const toDelete = allKeys.slice(0, allKeys.length - MAX_EVENTS);
      for (const key of toDelete) {
        store.delete(key);
      }
    }

    await idbTransaction(cleanTx);
  } catch {
    // 정리 실패는 무시 (다음 기회에 재시도)
  }
}

async function getAllEvents(db: IDBDatabase): Promise<TelemetryEvent[]> {
  const tx = db.transaction(IDB_EVENTS_STORE, 'readonly');
  const store = tx.objectStore(IDB_EVENTS_STORE);
  return idbRequest(store.getAll());
}

export function useTelemetry(): UseTelemetryReturn {
  const dbRef = useRef<IDBDatabase | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    initDB()
      .then(db => { dbRef.current = db; })
      .catch(err => { console.error('[Telemetry] DB 초기화 실패:', err); });
    return () => {
      if (dbRef.current) {
        dbRef.current.close();
        dbRef.current = null;
      }
    };
  }, []);

  const trackEvent = useCallback((event: TelemetryEvent) => {
    if (!dbRef.current) return;
    addEvent(dbRef.current, event).catch(err => {
      console.error('[Telemetry] 이벤트 추가 실패:', err);
    });
  }, []);

  const getEvents = useCallback(async (): Promise<TelemetryEvent[]> => {
    if (!dbRef.current) return [];
    try {
      return await getAllEvents(dbRef.current);
    } catch (err) {
      console.error('[Telemetry] 이벤트 조회 실패:', err);
      return [];
    }
  }, []);

  return { trackEvent, getEvents };
}
