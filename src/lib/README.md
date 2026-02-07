# System Library - 공통 라이브러리

"바다속 끝까지" 프로젝트의 공통 훅, 유틸리티, UI 컴포넌트 모음입니다.

## 📁 디렉토리 구조

```
src/
├── lib/              # 유틸리티 & 상수
├── hooks/            # React Hooks
├── components/ui/    # 공통 UI 컴포넌트
└── types/            # TypeScript 타입 정의
```

## 🔧 라이브러리 (src/lib/)

### constants.ts
프로젝트 전역 상수 정의

### storage.ts
localStorage 기반 저장소 관리
- 버전 관리 및 마이그레이션 지원
- 백업 기능

**주요 함수:**
- `loadStorage()`: 저장소 로드 (마이그레이션 자동 적용)
- `saveStorage(data)`: 저장소 저장
- `resetStorage()`: 저장소 초기화 (백업 생성)

### creatures.ts
생물 데이터 조회 유틸리티

**주요 함수:**
- `getCreaturesByZone(creatures, zone)`: 존별 필터링
- `getCreaturesByOcean(creatures, oceanId)`: 바다별 필터링
- `getAvailableCreatures(creatures, zone, oceanId, season)`: 복합 필터링

### badges.ts
배지 시스템

**주요 함수:**
- `checkBadgeConditions(data, currentBadges)`: 새 배지 획득 확인
- `getBadgeById(badgeId)`: 배지 조회
- `getEarnedBadges(badgeIds)`: 획득 배지 목록

## 🎣 훅 (src/hooks/)

### useTTS
TTS 상태머신 훅
- 상태: Idle → Speaking → Idle
- 에러 시 텍스트 하이라이트 fallback

**반환값:**
- `state`: 'idle' | 'speaking' | 'error'
- `speak(text, lang?)`: 음성 재생
- `stop()`: 음성 정지
- `isSupported`: TTS 지원 여부
- `highlightIndex`: fallback 모드 하이라이트 인덱스
- `words`: fallback 모드 단어 배열

### useDepth
수심 관리 훅

**반환값:**
- `currentDepth`: 현재 수심
- `currentZone`: 현재 존 정보
- `zoneProgress`: 존 내 진행률 (0~1)
- `setDepth(depth)`: 수심 설정
- `canGoDeeper`: 더 깊이 갈 수 있는지
- `nextZone`: 다음 존 정보

### useCreatureSpawn
생물 Spawn 엔진 훅

**Spawn 파이프라인:**
1. zone × ocean × season 후보군 필터
2. 쿨다운 필터 (30초)
3. 동시 등장 필터
4. rarity 가중치 적용
5. 미수집 가중치 적용 (×2.0)
6. RNG 선택

**반환값:**
- `spawnedCreatures`: 현재 화면 생물 목록
- `spawnState`: 'running' | 'paused' | 'disabled'
- `pause()`: 일시정지
- `resume()`: 재개
- `removeCreature(instanceId)`: 생물 제거

### useTelemetry
텔레메트리 훅 (IndexedDB)

**반환값:**
- `trackEvent(event)`: 이벤트 추적
- `getEvents()`: 이벤트 조회

**롤링 정책:**
- 최대 2000개 또는 1MB
- 초과 시 오래된 것부터 삭제

### useCollection
도감 수집 관리 훅

**반환값:**
- `collected`: 수집 데이터
- `isCollected(creatureId)`: 수집 여부 확인
- `collectCreature(creatureId, ocean, season)`: 생물 수집
- `getCollectionRate()`: 수집률
- `getCollectedCount()`: 수집 개수

### useFamilyProfile
가족 프로필 관리 훅

**반환값:**
- `family`: 가족 프로필
- `updateMember(role, updates)`: 멤버 업데이트
- `completeSetup()`: 설정 완료
- `isSetupComplete`: 설정 완료 여부

## 🎨 UI 컴포넌트 (src/components/ui/)

### DepthGauge
수심 게이지 (왼쪽 세로)
- 잠수함 아이콘 위치 표시
- 존 경계선 표시

### SpeechBubble
말풍선 컴포넌트
- TTS fallback 하이라이트 지원
- 꼬리 방향 지정 가능

### CollectionBadge
"도감에 추가!" 뱃지 애니메이션

### ZoneTransition
존 전환 타이틀 카드
- 존 이름 + 수심 범위 + 설명

### ProgressBar
도감 수집률 프로그레스 바

### BadgeCard
배지 표시 카드
- 획득/미획득 상태 표시

### Toast
알림 토스트
- type: 'info' | 'success' | 'warning' | 'error'

## 📝 타입 (src/types/)

### creature.ts
- `Creature`: 생물 정보
- `Zone`: 수심 존
- `Rarity`: 희귀도
- `AnimationType`: 애니메이션 타입
- `ZoneInfo`: 존 정보
- `ZONES`: 존 목록 상수
- `RARITY_WEIGHTS`: 존별 희귀도 가중치

### ocean.ts
- `Ocean`: 바다 정보
- `SeasonInfo`: 계절 정보

### collection.ts
- `CollectedCreature`: 수집된 생물
- `DiveStats`: 잠수 통계
- `FamilyMember`: 가족 멤버
- `FamilyProfile`: 가족 프로필
- `AppSettings`: 앱 설정
- `StorageSchema`: 저장소 스키마
- `DEFAULT_STORAGE`: 기본 저장소 값

### telemetry.ts
- `TelemetryEvent`: 텔레메트리 이벤트
- 각종 이벤트 타입 (ScreenView, DiveStart, CreatureMet 등)

## 🎯 사용 예시

### 저장소 사용
```typescript
import { loadStorage, saveStorage } from '@/lib/storage';

const data = loadStorage();
data.stats.total_dives += 1;
saveStorage(data);
```

### TTS 사용
```typescript
import { useTTS } from '@/hooks';

const { state, speak, stop, highlightIndex, words } = useTTS();

speak('안녕! 나는 고래야!');

// fallback 모드 시 하이라이트
{state === 'error' && (
  <SpeechBubble
    text="안녕! 나는 고래야!"
    highlightIndex={highlightIndex}
    words={words}
  />
)}
```

### Spawn 엔진 사용
```typescript
import { useCreatureSpawn } from '@/hooks';

const { spawnedCreatures, removeCreature } = useCreatureSpawn({
  creatures: allCreatures,
  currentZone: 'sunlight',
  oceanId: 'pacific',
  season: 'summer',
  collectedIds: new Set(Object.keys(collected)),
});

// 화면에 생물 렌더링
{spawnedCreatures.map(sc => (
  <CreatureSprite
    key={sc.id}
    creature={sc.creature}
    x={sc.x}
    y={sc.y}
    onCollect={() => removeCreature(sc.id)}
  />
))}
```

## ⚠️ 주의사항

### React 19 & Next.js App Router
- 클라이언트 컴포넌트에는 `'use client'` 디렉티브 필수
- 서버 컴포넌트에서는 훅 사용 불가

### Tailwind v4
- 모든 스타일은 Tailwind CSS 사용
- 커스텀 색상은 인라인 style 속성 사용

### 접근성
- 터치 영역 최소 48x48px
- 글씨 최소 18px
- 아이콘과 텍스트 함께 제공

### 성능
- 애니메이션은 CSS transition 우선
- framer-motion은 복잡한 전환에만 사용
- IndexedDB 작업은 비동기 처리
