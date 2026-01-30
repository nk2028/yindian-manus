// Swiss International Style - Data Processing Utilities
// Design: Pure functions for data transformation

import type {
  CharacterResult,
  DisplayMode,
  DisplayModeConfig,
  廣韻字段,
  LanguageInfo,
  ProcessedLanguage,
  TableRow,
} from "@/types";
import { 廣韻字段列表 } from "@/types";

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
    pronunciations.forEach(([langId, pronunciation, note]) => {
      if (!langToPronunciations.has(langId)) {
        langToPronunciations.set(langId, {});
      }
      const langPronuns = langToPronunciations.get(langId)!;
      
      // Format: pronunciation (note) if note exists, otherwise just pronunciation
      const displayText = note ? `${pronunciation} (${note})` : pronunciation;
      
      // If this language already has a pronunciation for this character, append with separator
      if (langPronuns[char]) {
        langPronuns[char] += '; ' + displayText;
      } else {
        langPronuns[char] = displayText;
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
 * 解析廣韻讀音數據並提取選中字段
 * @param pronunciation 原始讀音字串，可能包含多個讀音用 '; ' 分隔，每個讀音的字段用 '/' 分隔
 * @param selectedFields 要提取的字段集合
 * @returns 格式化後的字串，只包含選中字段
 */
export function parse廣韻Pronunciation(
  pronunciation: string,
  selectedFields: Set<廣韻字段>
): string {
  // Handle multiple pronunciations separated by '; '
  if (pronunciation.includes('; ')) {
    const pronunciations = pronunciation.split('; ');
    return pronunciations
      .map(p => parse廣韻Pronunciation(p, selectedFields))
      .join('; ');
  }
  
  // Split by '/' to get all fields
  const parts = pronunciation.split('/');
  
  // Handle short format (less than 24 fields) - just return as is
  // This happens when API returns simplified data like "rut" without full field breakdown
  if (parts.length < 廣韻字段列表.length) {
    return pronunciation;
  }
  
  // Extract selected fields from full 24-field format
  const selectedParts: string[] = [];
  廣韻字段列表.forEach((field, index) => {
    if (selectedFields.has(field) && parts[index]) {
      selectedParts.push(parts[index]);
    }
  });
  
  // Join with ' / ' for better readability
  return selectedParts.length > 0 ? selectedParts.join(' / ') : pronunciation;
}
