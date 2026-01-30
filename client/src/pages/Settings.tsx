// Swiss SBB Modern Style - Settings Page
// Design: Bold red accents, ultra-dense language grid for 2400+ languages

import { useApp } from "@/contexts/AppContext";
import { getDisplayModeLabel } from "@/lib/dataProcessor";
import type { DisplayMode } from "@/types";
import { GUANGYUN_FIELDS } from "@/types";
import { useState, useMemo } from "react";
import { getTranslation, formatString } from "@/lib/i18n";

// Calculate text color (black or white) based on background color brightness
function getTextColor(bgColor: string | null | undefined): string {
  if (!bgColor) return '#000000'; // Default to black if no color
  
  // Remove # if present
  const hex = bgColor.replace('#', '');
  
  // Handle invalid hex colors
  if (hex.length !== 6) return '#000000';
  
  // Convert to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance (perceived brightness)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light backgrounds, white for dark backgrounds
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

export default function Settings() {
  const {
    processedLanguages,
    settings,
    updateDisplayMode,
    toggleLanguage,
    selectAllLanguages,
    deselectAllLanguages,
    toggleGuangyunField,
    language,
    updateLanguage,
  } = useApp();
  const t = getTranslation(language);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter languages by search term
  const filteredLanguages = useMemo(() => {
    if (!searchTerm.trim()) return processedLanguages;
    const term = searchTerm.toLowerCase();
    return processedLanguages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(term) ||
        lang.abbreviation.toLowerCase().includes(term)
    );
  }, [processedLanguages, searchTerm]);

  // Group languages by region for visual organization
  const languagesByRegion = useMemo(() => {
    const groups = new Map<string, typeof processedLanguages>();
    filteredLanguages.forEach((lang) => {
      const region = lang.region;
      if (!groups.has(region)) {
        groups.set(region, []);
      }
      groups.get(region)!.push(lang);
    });
    // Sort by minimum language ID in each region
    return Array.from(groups.entries()).sort(([, a], [, b]) => {
      const minIdA = Math.min(...a.map(lang => lang.id));
      const minIdB = Math.min(...b.map(lang => lang.id));
      return minIdA - minIdB;
    });
  }, [filteredLanguages]);

  const displayModes: DisplayMode[] = ["地圖集二", "音典", "陳邡"];

  const selectedCount = settings.selectedLanguages.size;
  const totalCount = processedLanguages.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#EB0000] pb-3 border-b-2 border-[#EB0000]">
          {t.settings.title}
        </h1>

        {/* Interface Language Section */}
        <section className="mb-4 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-gray-800">{t.settings.interfaceLanguage}</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => updateLanguage('香港')}
              className={`px-6 py-1.5 text-sm font-medium transition-colors rounded-full ${
                language === '香港'
                  ? "bg-[#EB0000] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              中文(繁體)
            </button>
            <button
              onClick={() => updateLanguage('中国')}
              className={`px-6 py-1.5 text-sm font-medium transition-colors rounded-full ${
                language === '中国'
                  ? "bg-[#EB0000] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              中文(简体)
            </button>
            <button
              onClick={() => updateLanguage('en')}
              className={`px-6 py-1.5 text-sm font-medium transition-colors rounded-full ${
                language === 'en'
                  ? "bg-[#EB0000] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              English
            </button>
            <button
              onClick={() => updateLanguage('ja')}
              className={`px-6 py-1.5 text-sm font-medium transition-colors rounded-full ${
                language === 'ja'
                  ? "bg-[#EB0000] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
            >
              日本語
            </button>
          </div>
        </section>

        {/* Display Mode Section */}
        <section className="mb-4 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-gray-800">{t.settings.displayMode}</h2>
          <div className="flex gap-2">
            {displayModes.map((mode) => (
              <button
                key={mode}
                onClick={() => updateDisplayMode(mode)}
                className={`px-6 py-1.5 text-sm font-medium transition-colors rounded-full ${
                  settings.displayMode === mode
                    ? "bg-[#EB0000] text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {getDisplayModeLabel(mode)}
              </button>
            ))}
          </div>
        </section>

        {/* Guangyun Display Section */}
        <section className="mb-4 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold mb-2 text-gray-800">{t.settings.guangyunDisplay}</h2>
          <p className="text-sm text-gray-600 mb-3">{t.settings.guangyunDisplayDesc}</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {GUANGYUN_FIELDS.map((field) => (
              <label
                key={field}
                className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded cursor-pointer hover:bg-gray-50 transition-colors"
              >
                <input
                  type="checkbox"
                  checked={settings.guangyunFields.has(field)}
                  onChange={() => toggleGuangyunField(field)}
                  className="w-4 h-4 text-[#EB0000] border-gray-300 rounded focus:ring-[#EB0000] focus:ring-2"
                />
                <span className="text-sm text-gray-700">{field}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Language Selection Section */}
        <section className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">
              {t.settings.languageSelection} ({selectedCount}/{totalCount})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={selectAllLanguages}
                className="px-4 py-1.5 text-sm font-medium bg-[#EB0000] text-white hover:bg-[#C50000] transition-colors rounded-full"
              >
                {t.settings.selectAll}
              </button>
              <button
                onClick={deselectAllLanguages}
                className="px-4 py-1.5 text-sm font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors rounded-full"
              >
                {t.settings.deselectAll}
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="mb-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="搜索语言..."
              className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#EB0000] focus:ring-2 focus:ring-[#EB0000]/20 rounded-full"
            />
          </div>

          {/* Ultra-dense Language Grid grouped by region */}
          <div className="max-h-[600px] overflow-y-auto border border-gray-300">
            {languagesByRegion.map(([region, languages]) => {
              const regionColor = languages[0]?.color || '#EB0000';
              const textColor = getTextColor(regionColor);
              return (
              <div key={region} className="border-b border-gray-200 last:border-b-0">
                <div
                  className="text-xs font-bold px-2 py-1 sticky top-0 z-10"
                  style={{ backgroundColor: regionColor, color: textColor }}
                >
                  {region} ({languages.length})
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 2xl:grid-cols-12">
                  {languages.map((lang) => (
                    <label
                      key={lang.id}
                      className="flex items-start gap-1 p-1 hover:bg-gray-50 cursor-pointer border-r border-b border-gray-100 text-xs leading-tight"
                    >
                      <input
                        type="checkbox"
                        checked={settings.selectedLanguages.has(lang.id)}
                        onChange={() => toggleLanguage(lang.id)}
                        className="w-3 h-3 mt-0.5 flex-shrink-0 accent-gray-600"
                      />
                      <span className="min-w-0 break-words text-gray-800">
                        {lang.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
