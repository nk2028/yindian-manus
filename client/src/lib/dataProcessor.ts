// Swiss International Style - Data Processing Utilities
// Design: Pure functions for data transformation

import type {
  CharacterResult,
  DisplayMode,
  DisplayModeConfig,
  GuangyunField,
  LanguageInfo,
  ProcessedLanguage,
  TableRow,
} from "@/types";
import { GUANGYUN_FIELDS } from "@/types";

/**
 * Display mode configurations
 */
export const DISPLAY_MODE_CONFIGS: Record<DisplayMode, DisplayModeConfig> = {
  地圖集二: {
    sortIndex: 3, // 地圖集二排序
    colorIndex: 4, // 地圖集二顏色
    regionIndex: 5, // 地圖集二分區
  },
  音典: {
    sortIndex: 6, // 音典排序
    colorIndex: 7, // 音典顏色
    regionIndex: 8, // 音典分區
  },
  陳邡: {
    sortIndex: 9, // 陳邡排序
    colorIndex: 10, // 陳邡顏色
    regionIndex: 11, // 陳邡分區
  },
};

/**
 * Process language data based on display mode
 */
export function processLanguages(
  languages: LanguageInfo[],
  displayMode: DisplayMode
): ProcessedLanguage[] {
  const config = DISPLAY_MODE_CONFIGS[displayMode];

  return languages.map((lang) => ({
    id: Number(lang[0]),
    name: String(lang[1]),
    abbreviation: String(lang[2]),
    sortOrder: lang[config.sortIndex] as number,
    color: lang[config.colorIndex] as string,
    region: lang[config.regionIndex] as string,
    coordinates: String(lang[12] || ""),
  }));
}

/**
 * Build table rows from query results
 */
export function buildTableRows(
  queryResults: CharacterResult[],
  processedLanguages: ProcessedLanguage[],
  selectedLanguageIds: Set<number>
): TableRow[] {
  // Create a map of language ID to language info for quick lookup
  const langMap = new Map<number, ProcessedLanguage>();
  processedLanguages.forEach((lang) => {
    langMap.set(lang.id, lang);
  });

  // Create a map of language ID to pronunciations for each character
  const langToPronunciations = new Map<number, { [char: string]: string }>();

  // Collect all pronunciations
  queryResults.forEach(([char, pronunciations]) => {
    pronunciations.forEach(([langId, pronunciation]) => {
      if (!langToPronunciations.has(langId)) {
        langToPronunciations.set(langId, {});
      }
      const langPronuns = langToPronunciations.get(langId)!;
      // If this language already has a pronunciation for this character, append with separator
      if (langPronuns[char]) {
        langPronuns[char] += '; ' + pronunciation;
      } else {
        langPronuns[char] = pronunciation;
      }
    });
  });

  // Build rows only for languages that have data and are selected
  const rows: TableRow[] = [];
  langToPronunciations.forEach((pronunciations, langId) => {
    if (!selectedLanguageIds.has(langId)) return;

    const lang = langMap.get(langId);
    if (!lang) return;

    rows.push({
      languageId: langId,
      languageName: lang.name,
      languageAbbr: lang.abbreviation,
      color: lang.color,
      region: lang.region,
      sortOrder: lang.sortOrder,
      pronunciations,
    });
  });

  // Sort by sort order
  rows.sort((a, b) => a.sortOrder - b.sortOrder);

  return rows;
}

/**
 * Get display mode label in Chinese
 */
export function getDisplayModeLabel(mode: DisplayMode): string {
  return mode;
}

/**
 * Parse Guangyun pronunciation data and extract selected fields
 * @param pronunciation Raw pronunciation string with fields separated by '/'
 * @param selectedFields Set of fields to extract
 * @returns Formatted string with selected fields
 */
export function parseGuangyunPronunciation(
  pronunciation: string,
  selectedFields: Set<GuangyunField>
): string {
  // Split by '/' to get all fields
  const parts = pronunciation.split('/');
  
  // If not enough parts, return original
  if (parts.length < GUANGYUN_FIELDS.length) {
    return pronunciation;
  }
  
  // Extract selected fields
  const selectedParts: string[] = [];
  GUANGYUN_FIELDS.forEach((field, index) => {
    if (selectedFields.has(field) && parts[index]) {
      selectedParts.push(parts[index]);
    }
  });
  
  // Join with ' / ' for better readability
  return selectedParts.length > 0 ? selectedParts.join(' / ') : pronunciation;
}
