// Swiss International Style - Yindian Types
// Design: Functional, clear data structures for ~2400 language varieties

/**
 * Language information from /list-langs/ API
 * Array format: [語言, 簡稱, 地圖集二排序, 地圖集二顏色, 地圖集二分區, 音典排序, 音典顏色, 音典分區, 陳邡排序, 陳邡顏色, 陳邡分區]
 */
export type LanguageInfo = [
  string, // 0: 語言 (full name)
  string, // 1: 簡稱 (abbreviation)
  number, // 2: 地圖集二排序
  string, // 3: 地圖集二顏色
  string, // 4: 地圖集二分區
  number, // 5: 音典排序
  string, // 6: 音典顏色
  string, // 7: 音典分區
  number, // 8: 陳邡排序
  string, // 9: 陳邡顏色
  string, // 10: 陳邡分區
];

/**
 * Character pronunciation data
 * Format: [langId, pronunciation]
 */
export type Pronunciation = [number, string];

/**
 * Character query result
 * Format: [character, [[langId, pronunciation], ...]]
 */
export type CharacterResult = [string, Pronunciation[]];

/**
 * Display mode for sorting and coloring
 */
export type DisplayMode = "地圖集二" | "音典" | "陳邡";

/**
 * Display mode configuration
 */
export interface DisplayModeConfig {
  sortIndex: number; // Index in LanguageInfo array for sorting
  colorIndex: number; // Index in LanguageInfo array for color
  regionIndex: number; // Index in LanguageInfo array for region
}

/**
 * User settings
 */
export interface UserSettings {
  displayMode: DisplayMode;
  selectedLanguages: Set<number>; // Set of language IDs
}

/**
 * Processed language data for display
 */
export interface ProcessedLanguage {
  id: number;
  name: string;
  abbreviation: string;
  sortOrder: number;
  color: string;
  region: string;
}

/**
 * Table row data for character comparison
 */
export interface TableRow {
  languageId: number;
  languageName: string;
  languageAbbr: string;
  color: string;
  region: string;
  sortOrder: number;
  pronunciations: { [char: string]: string }; // char -> pronunciation
}
