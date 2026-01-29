// Swiss SBB Modern Style - Settings Page
// Design: Bold red accents, ultra-dense language grid for 2400+ languages

import { useApp } from "@/contexts/AppContext";
import { getDisplayModeLabel } from "@/lib/dataProcessor";
import type { DisplayMode } from "@/types";
import { useState, useMemo } from "react";

export default function Settings() {
  const {
    processedLanguages,
    settings,
    updateDisplayMode,
    toggleLanguage,
    selectAllLanguages,
    deselectAllLanguages,
  } = useApp();

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

  // Group languages by color for visual organization
  const languagesByColor = useMemo(() => {
    const groups = new Map<string, typeof processedLanguages>();
    filteredLanguages.forEach((lang) => {
      const color = lang.color;
      if (!groups.has(color)) {
        groups.set(color, []);
      }
      groups.get(color)!.push(lang);
    });
    return Array.from(groups.entries()).sort(([, a], [, b]) => b.length - a.length);
  }, [filteredLanguages]);

  const displayModes: DisplayMode[] = ["atlas2", "yindian", "chenfang"];

  const selectedCount = settings.selectedLanguages.size;
  const totalCount = processedLanguages.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4 text-[#EB0000] pb-3 border-b-2 border-[#EB0000]">
          设置
        </h1>

        {/* Display Mode Section */}
        <section className="mb-4 bg-white p-4 shadow-sm">
          <h2 className="text-lg font-bold mb-3 text-gray-800">显示方式</h2>
          <div className="flex gap-0">
            {displayModes.map((mode) => (
              <button
                key={mode}
                onClick={() => updateDisplayMode(mode)}
                className={`px-6 py-2.5 font-bold border-2 transition-colors ${
                  settings.displayMode === mode
                    ? "bg-[#EB0000] text-white border-[#EB0000] z-10"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {getDisplayModeLabel(mode)}
              </button>
            ))}
          </div>
        </section>

        {/* Language Selection Section */}
        <section className="bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-800">
              显示语言 ({selectedCount}/{totalCount})
            </h2>
            <div className="flex gap-2">
              <button
                onClick={selectAllLanguages}
                className="px-4 py-1.5 text-sm font-bold bg-[#EB0000] text-white hover:bg-[#C50000] transition-colors"
              >
                全选
              </button>
              <button
                onClick={deselectAllLanguages}
                className="px-4 py-1.5 text-sm font-bold bg-gray-600 text-white hover:bg-gray-700 transition-colors"
              >
                全不选
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
              className="w-full border-2 border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-[#EB0000] focus:ring-2 focus:ring-[#EB0000]/20"
            />
          </div>

          {/* Ultra-dense Language Grid grouped by color */}
          <div className="max-h-[600px] overflow-y-auto border border-gray-300">
            {languagesByColor.map(([color, languages]) => (
              <div key={color} className="border-b border-gray-200 last:border-b-0">
                <div
                  className="text-xs font-bold px-2 py-1 text-white sticky top-0 z-10"
                  style={{ backgroundColor: color }}
                >
                  {color} ({languages.length})
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
                  {languages.map((lang) => (
                    <label
                      key={lang.id}
                      className="flex items-start gap-1 p-1 hover:bg-gray-50 cursor-pointer border-r border-b border-gray-100 text-xs leading-tight"
                    >
                      <input
                        type="checkbox"
                        checked={settings.selectedLanguages.has(lang.id)}
                        onChange={() => toggleLanguage(lang.id)}
                        className="w-3 h-3 mt-0.5 flex-shrink-0 accent-[#EB0000]"
                      />
                      <span className="min-w-0 break-words">
                        <span className="font-bold text-gray-800">{lang.abbreviation}</span>{" "}
                        <span className="text-gray-600">{lang.name}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
