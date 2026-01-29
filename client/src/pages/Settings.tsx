// Swiss International Style - Settings Page
// Design: Dense layout with checkboxes for 2400 languages

import { useApp } from "@/contexts/AppContext";
import { getDisplayModeLabel } from "@/lib/dataProcessor";
import type { DisplayMode } from "@/types";
import { Button } from "@/components/ui/button";
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

  // Group languages by region for better organization
  const languagesByRegion = useMemo(() => {
    const groups = new Map<string, typeof processedLanguages>();
    filteredLanguages.forEach((lang) => {
      const region = lang.region || "其他";
      if (!groups.has(region)) {
        groups.set(region, []);
      }
      groups.get(region)!.push(lang);
    });
    return Array.from(groups.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredLanguages]);

  const displayModes: DisplayMode[] = ["atlas2", "yindian", "chenfang"];

  const selectedCount = settings.selectedLanguages.size;
  const totalCount = processedLanguages.length;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold">设置</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          {/* Display Mode Section */}
          <section className="mb-6">
            <h2 className="text-lg font-bold mb-2 border-b-2 border-black pb-1">
              显示方式
            </h2>
            <div className="flex gap-2">
              {displayModes.map((mode) => (
                <button
                  key={mode}
                  onClick={() => updateDisplayMode(mode)}
                  className={`px-4 py-2 border-2 border-black text-sm font-bold ${
                    settings.displayMode === mode
                      ? "bg-[#EB0000] text-white"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {getDisplayModeLabel(mode)}
                </button>
              ))}
            </div>
          </section>

          {/* Language Selection Section */}
          <section>
            <div className="flex items-center justify-between mb-2 border-b-2 border-black pb-1">
              <h2 className="text-lg font-bold">
                显示语言 ({selectedCount}/{totalCount})
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={selectAllLanguages}
                  variant="outline"
                  size="sm"
                  className="border-2 border-black text-xs px-2 py-1 h-auto"
                >
                  全选
                </Button>
                <Button
                  onClick={deselectAllLanguages}
                  variant="outline"
                  size="sm"
                  className="border-2 border-black text-xs px-2 py-1 h-auto"
                >
                  全不选
                </Button>
              </div>
            </div>

            {/* Search Box */}
            <div className="mb-3">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="搜索语言..."
                className="w-full border-2 border-black px-2 py-1 text-sm focus:outline-none focus:border-[#EB0000]"
              />
            </div>

            {/* Language List */}
            <div className="border-2 border-black max-h-[600px] overflow-y-auto">
              {languagesByRegion.map(([region, languages]) => (
                <div key={region} className="border-b-2 border-black last:border-b-0">
                  <div className="bg-gray-100 px-2 py-1 text-xs font-bold sticky top-0">
                    {region} ({languages.length})
                  </div>
                  <div className="p-2">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                      {languages.map((lang) => (
                        <label
                          key={lang.id}
                          className="flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 text-xs"
                        >
                          <input
                            type="checkbox"
                            checked={settings.selectedLanguages.has(lang.id)}
                            onChange={() => toggleLanguage(lang.id)}
                            className="w-3 h-3 border-2 border-black accent-[#EB0000]"
                          />
                          <span
                            className="inline-block px-1 text-white font-bold"
                            style={{
                              backgroundColor: lang.color,
                              fontSize: "10px",
                            }}
                          >
                            {lang.abbreviation}
                          </span>
                          <span className="text-xs truncate">
                            {lang.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
