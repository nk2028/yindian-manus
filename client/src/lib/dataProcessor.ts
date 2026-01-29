// Swiss International Style - Data Processing Utilities
// Design: Pure functions for data transformation

import type {
  CharacterResult,
  DisplayMode,
  DisplayModeConfig,
  LanguageInfo,
  ProcessedLanguage,
  TableRow,
} from "@/types";

/**
 * Display mode configurations
 */
export const DISPLAY_MODE_CONFIGS: Record<DisplayMode, DisplayModeConfig> = {
  atlas2: {
    sortIndex: 2, // 地圖集二排序
    colorIndex: 3, // 地圖集二顏色
    regionIndex: 4, // 地圖集二分區
  },
  yindian: {
    sortIndex: 5, // 音典排序
    colorIndex: 6, // 音典顏色
    regionIndex: 7, // 音典分區
  },
  chenfang: {
    sortIndex: 8, // 陳邡排序
    colorIndex: 9, // 陳邡顏色
    regionIndex: 10, // 陳邡分區
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

  return languages.map((lang, index) => ({
    id: index,
    name: lang[0],
    abbreviation: lang[1],
    sortOrder: lang[config.sortIndex] as number,
    color: lang[config.colorIndex] as string,
    region: lang[config.regionIndex] as string,
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
  // Create a map of language ID to pronunciations for each character
  const langToPronunciations = new Map<number, { [char: string]: string }>();

  // Collect all pronunciations
  queryResults.forEach(([char, pronunciations]) => {
    pronunciations.forEach(([langId, pronunciation]) => {
      if (!langToPronunciations.has(langId)) {
        langToPronunciations.set(langId, {});
      }
      langToPronunciations.get(langId)![char] = pronunciation;
    });
  });

  // Build rows only for languages that have data and are selected
  const rows: TableRow[] = [];
  langToPronunciations.forEach((pronunciations, langId) => {
    if (!selectedLanguageIds.has(langId)) return;

    const lang = processedLanguages[langId];
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
  const labels: Record<DisplayMode, string> = {
    atlas2: "地圖集二",
    yindian: "音典",
    chenfang: "陳邡",
  };
  return labels[mode];
}
