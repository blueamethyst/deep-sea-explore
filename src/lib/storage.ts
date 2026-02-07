import { StorageSchema, DEFAULT_STORAGE } from '@/types/collection';
import { STORAGE_KEY, STORAGE_VERSION } from './constants';

/**
 * 버전별 마이그레이션 함수
 * key: 타겟 버전, value: 이전 버전 데이터를 타겟 버전으로 변환하는 함수
 */
const migrations: Record<number, (data: unknown) => unknown> = {
  // 예시: 버전 2로 마이그레이션 시
  // 2: (data: unknown) => {
  //   const old = data as StorageSchema;
  //   return { ...old, version: 2, newField: 'default' };
  // },
};

/**
 * localStorage에서 데이터를 읽고 마이그레이션 수행
 */
export function loadStorage(): StorageSchema {
  try {
    // 1. localStorage에서 읽기
    const raw = localStorage.getItem(STORAGE_KEY);

    // 2. 없으면 DEFAULT_STORAGE 반환
    if (!raw) {
      return structuredClone(DEFAULT_STORAGE);
    }

    const parsed = JSON.parse(raw) as StorageSchema;

    // 3. version 체크 및 마이그레이션
    if (parsed.version < STORAGE_VERSION) {
      console.log(`[Storage] 마이그레이션 시작: v${parsed.version} → v${STORAGE_VERSION}`);

      try {
        let migrated: unknown = parsed;

        // 순차적으로 마이그레이션 적용
        for (let v = parsed.version + 1; v <= STORAGE_VERSION; v++) {
          const migrateFn = migrations[v];
          if (migrateFn) {
            migrated = migrateFn(migrated);
            console.log(`[Storage] v${v} 마이그레이션 완료`);
          }
        }

        const result = migrated as StorageSchema;
        result.version = STORAGE_VERSION;

        // 마이그레이션 성공 시 저장
        saveStorage(result);
        return result;

      } catch (err) {
        // 4. 마이그레이션 실패 시 백업에 보존
        console.error('[Storage] 마이그레이션 실패:', err);
        const backupKey = `${STORAGE_KEY}_backup_${Date.now()}`;
        localStorage.setItem(backupKey, raw);
        console.log(`[Storage] 백업 저장: ${backupKey}`);

        // 기본값 반환
        return structuredClone(DEFAULT_STORAGE);
      }
    }

    // 버전이 같거나 높으면 그대로 사용
    return parsed;

  } catch (err) {
    console.error('[Storage] 로드 실패:', err);
    return structuredClone(DEFAULT_STORAGE);
  }
}

/**
 * localStorage에 데이터 저장
 */
export function saveStorage(data: StorageSchema): void {
  try {
    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.error('[Storage] 저장 실패:', err);
    throw err;
  }
}

/**
 * 저장소 초기화 (백업 후)
 */
export function resetStorage(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    if (raw) {
      // 백업 생성
      const backupKey = `${STORAGE_KEY}_reset_${Date.now()}`;
      localStorage.setItem(backupKey, raw);
      console.log(`[Storage] 초기화 백업: ${backupKey}`);
    }

    // 초기화
    saveStorage(structuredClone(DEFAULT_STORAGE));
    console.log('[Storage] 초기화 완료');

  } catch (err) {
    console.error('[Storage] 초기화 실패:', err);
    throw err;
  }
}
