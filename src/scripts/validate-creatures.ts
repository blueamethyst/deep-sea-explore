import { z } from 'zod';
import * as fs from 'fs';
import * as path from 'path';

const VALID_ZONES = ['sunlight', 'twilight', 'midnight', 'abyssal', 'hadal'] as const;
const VALID_RARITIES = ['common', 'uncommon', 'rare', 'legendary'] as const;
const VALID_SEASONS = ['spring', 'summer', 'fall', 'winter'] as const;
const VALID_ANIMATION_TYPES = ['swim_wiggle', 'swim_glide', 'float', 'pulse', 'crawl', 'jet'] as const;

const ZONE_DEPTH_RANGES: Record<string, { min: number; max: number }> = {
  sunlight: { min: 0, max: 200 },
  twilight: { min: 200, max: 1000 },
  midnight: { min: 1000, max: 4000 },
  abyssal: { min: 4000, max: 6000 },
  hadal: { min: 6000, max: 11000 },
};

// Load valid ocean IDs
function loadValidOceans(): string[] {
  const oceansPath = path.resolve(__dirname, '../data/oceans.json');
  if (!fs.existsSync(oceansPath)) {
    console.error('❌ oceans.json not found at', oceansPath);
    process.exit(1);
  }
  const oceans = JSON.parse(fs.readFileSync(oceansPath, 'utf-8'));
  return oceans.map((o: { id: string }) => o.id);
}

function countSentences(text: string): number {
  return text.split(/[.!?]/).filter((s: string) => s.trim().length > 0).length;
}

const CreatureSchema = z.object({
  id: z.string().min(1),
  name_ko: z.string().min(1),
  name_en: z.string().min(1),
  scientific_name: z.string(),
  greeting_ko: z.string().min(1).max(30),
  greeting_en: z.string().min(1),
  greeting_revisit_ko: z.string().min(1),
  description_ko: z.string().min(1).max(120),
  description_en: z.string().min(1),
  fun_fact_ko: z.string().min(1).max(80),
  size_cm: z.number().positive(),
  depth_min: z.number().min(0),
  depth_max: z.number().min(0),
  zone: z.enum(VALID_ZONES),
  oceans: z.array(z.string()).min(1),
  seasons: z.array(z.enum(VALID_SEASONS)).min(1),
  rarity: z.enum(VALID_RARITIES),
  diet: z.string().min(1),
  animation_type: z.enum(VALID_ANIMATION_TYPES),
  svg_id: z.string().min(1),
  source: z.string().min(1),
  photo_url: z.union([z.string().url(), z.literal('')]),
  photo_credit: z.string().optional(),
});

function validate() {
  console.log('🔍 해양생물 데이터 검증 시작...\n');

  const validOceans = loadValidOceans();
  const dataDir = path.resolve(__dirname, '../data/creatures');

  if (!fs.existsSync(dataDir)) {
    console.error('❌ creatures 디렉토리가 없습니다:', dataDir);
    process.exit(1);
  }

  const files = fs.readdirSync(dataDir).filter((f: string) => f.endsWith('.json'));
  if (files.length === 0) {
    console.error('❌ JSON 파일이 없습니다.');
    process.exit(1);
  }

  let totalCreatures = 0;
  let errors: string[] = [];
  const allIds = new Set<string>();

  for (const file of files) {
    const filePath = path.join(dataDir, file);
    let creatures: unknown[];

    try {
      creatures = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    } catch (e) {
      errors.push(`${file}: JSON 파싱 실패 - ${e}`);
      continue;
    }

    if (!Array.isArray(creatures)) {
      errors.push(`${file}: 배열이 아닙니다`);
      continue;
    }

    for (let i = 0; i < creatures.length; i++) {
      const creature = creatures[i] as Record<string, unknown>;
      const prefix = `${file}[${i}] (${(creature?.name_ko as string) || 'unknown'})`;
      totalCreatures++;

      // Zod schema validation
      const result = CreatureSchema.safeParse(creature);
      if (!result.success) {
        for (const issue of result.error.issues) {
          errors.push(`${prefix}: ${issue.path.join('.')} - ${issue.message}`);
        }
        continue;
      }

      const c = result.data;

      // Duplicate ID check
      if (allIds.has(c.id)) {
        errors.push(`${prefix}: 중복 ID "${c.id}"`);
      }
      allIds.add(c.id);

      // depth_min <= depth_max
      if (c.depth_min > c.depth_max) {
        errors.push(`${prefix}: depth_min(${c.depth_min}) > depth_max(${c.depth_max})`);
      }

      // Zone-depth consistency
      const zoneRange = ZONE_DEPTH_RANGES[c.zone];
      if (zoneRange) {
        if (c.depth_min < zoneRange.min || c.depth_max > zoneRange.max) {
          errors.push(
            `${prefix}: 수심 범위(${c.depth_min}-${c.depth_max})가 ${c.zone} 존(${zoneRange.min}-${zoneRange.max})과 불일치`
          );
        }
      }

      // Ocean validity
      for (const ocean of c.oceans) {
        if (!validOceans.includes(ocean)) {
          errors.push(`${prefix}: 유효하지 않은 바다 "${ocean}"`);
        }
      }

      // Sentence count for description_ko
      const sentenceCount = countSentences(c.description_ko);
      if (sentenceCount > 3) {
        errors.push(`${prefix}: description_ko 문장 수 ${sentenceCount}개 (최대 3개)`);
      }
    }
  }

  console.log(`📊 총 ${totalCreatures}종 검증 완료`);
  console.log(`📁 파일 수: ${files.length}`);

  if (errors.length > 0) {
    console.error(`\n❌ ${errors.length}개 오류 발견:\n`);
    for (const err of errors) {
      console.error(`  • ${err}`);
    }
    console.error('\n🚫 빌드 중단: 데이터 검증 실패');
    process.exit(1);
  }

  console.log('\n✅ 모든 검증 통과!');
}

validate();
