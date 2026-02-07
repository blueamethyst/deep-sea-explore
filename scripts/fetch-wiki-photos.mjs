#!/usr/bin/env node
/**
 * Wikipedia API에서 각 생물의 사진 URL을 가져와 JSON 파일을 업데이트합니다.
 * 실행: node scripts/fetch-wiki-photos.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'src', 'data', 'creatures');

const ZONE_FILES = [
  'sunlight-zone.json',
  'twilight-zone.json',
  'midnight-zone.json',
  'abyssal-zone.json',
  'hadal-zone.json',
];

const WIKI_API = 'https://en.wikipedia.org/api/rest_v1/page/summary/';

async function fetchWikiThumb(scientificName, nameEn) {
  // Try scientific name first, then English name
  const candidates = [
    scientificName.replace(/\s+/g, '_'),
    nameEn.replace(/\s+/g, '_'),
  ];

  for (const query of candidates) {
    try {
      const res = await fetch(WIKI_API + encodeURIComponent(query), {
        headers: { 'User-Agent': 'DeepSeaExplore/1.0 (educational project)' },
      });
      if (!res.ok) continue;
      const data = await res.json();
      if (data.thumbnail?.source) {
        // Request 400px width version
        const url = data.thumbnail.source.replace(/\/\d+px-/, '/400px-');
        return { url, credit: `Wikipedia: ${data.title}` };
      }
    } catch {
      continue;
    }
  }
  return null;
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  let totalFound = 0;
  let totalMissing = 0;

  for (const file of ZONE_FILES) {
    const filePath = path.join(DATA_DIR, file);
    const creatures = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    console.log(`\n=== ${file} (${creatures.length}종) ===`);

    for (let i = 0; i < creatures.length; i++) {
      const c = creatures[i];
      // Skip if already has a photo_url
      if (c.photo_url) {
        totalFound++;
        continue;
      }

      const result = await fetchWikiThumb(c.scientific_name, c.name_en);

      if (result) {
        c.photo_url = result.url;
        c.photo_credit = result.credit;
        totalFound++;
        console.log(`  ✓ ${c.name_ko} (${c.id})`);
      } else {
        totalMissing++;
        console.log(`  ✗ ${c.name_ko} (${c.id}) - not found`);
      }

      // Rate limit: 50ms between requests
      await sleep(50);
    }

    fs.writeFileSync(filePath, JSON.stringify(creatures, null, 2) + '\n');
    console.log(`  → ${file} saved`);
  }

  console.log(`\n=== 결과 ===`);
  console.log(`Found: ${totalFound}, Missing: ${totalMissing}`);
}

main().catch(console.error);
