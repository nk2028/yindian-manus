import { queryCharacters } from "@/lib/api";
import { buildTableRows, parse廣韻Pronunciation } from "@/lib/dataProcessor";
import type { CharacterResult, TableRow } from "@/types";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { getTranslation } from "@/lib/i18n";


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

export default function Query() {
  const { processedLanguages, settings, language } = useApp();
  const t = getTranslation(language);
  const [input, setInput] = useState("");
  const [queryResults, setQueryResults] = useState<CharacterResult[]>([]);
  const [tableRows, setTableRows] = useState<TableRow[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasQueried, setHasQueried] = useState(false);


  const handleQuery = async () => {
    if (!input.trim()) return;

    setIsQuerying(true);
    setError(null);
    setHasQueried(true);

    try {
      const response = await queryCharacters(input.trim());
      const results = response.data;
      setQueryResults(results);

      // Build table rows
      const rows = buildTableRows(
        results,
        processedLanguages,
        settings.selectedLanguages
      );
      console.log('Table rows built:', rows.length);
      setTableRows(rows);
    } catch (err) {
      // Show specific error message
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t.query.noResults);
      }
      console.error(err);
    } finally {
      setIsQuerying(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleQuery();
    }
  };

  // Extract characters from query results
  const characters = queryResults.map(([char]) => char);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Query Input Section */}
      <div className="bg-white p-3 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t.query.placeholder}
              className="flex-1 border-2 border-gray-300 px-3 py-2 text-base focus:outline-none focus:border-[#EB0000] focus:ring-2 focus:ring-[#EB0000]/20"
            />
            <button
              onClick={handleQuery}
              disabled={!input.trim() || isQuerying}
              className="px-8 py-2 bg-[#EB0000] text-white font-bold hover:bg-[#C50000] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors rounded-full"
            >
              {isQuerying ? t.query.buttonLoading : t.query.button}
            </button>
          </div>
          {error && (
            <div className="mt-2 text-[#EB0000] text-sm font-medium">{error}</div>
          )}
        </div>
      </div>

      {/* Results Table Section */}
      {tableRows.length > 0 && (
        <div className="p-4">
          <div className="max-w-full mx-auto">
            <div className="overflow-x-auto shadow-sm">
              <table className="border-collapse border border-gray-300 bg-white">
                <thead>
                  <tr className="bg-[#EB0000] text-white">
                    <th className="border border-gray-300 px-2 py-2 text-left text-sm font-bold bg-[#EB0000] sticky left-0 z-10" style={{ width: '128px', maxWidth: '128px', minWidth: '128px' }}>
                      {t.query.tableLanguage}
                    </th>
                    {characters.map((char, idx) => (
                      <th
                        key={idx}
                        className="border border-gray-300 px-2 py-2 text-center text-lg font-bold"
                        style={{ width: '192px', maxWidth: '192px', minWidth: '192px' }}
                      >
                        {char}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => {
                    // Debug: log color value
                    if (typeof window !== 'undefined' && (window as any).__DEBUG_TABLE_ROWS) {
                      console.log('Row:', row.languageAbbr, 'Color:', row.color);
                    }
                    return (
                    <tr
                      key={row.languageId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="border border-gray-300 px-2 py-2 bg-white sticky left-0 z-10" style={{ width: '128px', maxWidth: '128px', minWidth: '128px' }}>
                        <span
                          className="inline-block px-2 py-1 text-sm font-bold cursor-pointer hover:opacity-80 transition-opacity"
                          style={{ 
                            backgroundColor: row.color,
                            color: getTextColor(row.color)
                          }}
                          onClick={() => {
                            const lang = processedLanguages.find(l => l.id === row.languageId);
                            if (lang && lang.coordinates) {
                              const [lng, lat] = lang.coordinates.split(',');
                              window.open(`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=12/${lat}/${lng}`, '_blank');
                            }
                          }}
                          title="點擊查看地理位置"
                        >
                          {row.languageAbbr}
                        </span>
                      </td>
                      {characters.map((char, charIdx) => {
                        let pronunciation = row.pronunciations[char] || "—";
                        // Special handling for Guangyun (廣韻) data
                        if (row.languageAbbr === "廣韻" && pronunciation !== "—") {
                          pronunciation = parse廣韻Pronunciation(pronunciation, settings.廣韻字段);
                        }
                        return (
                        <td
                          key={`char-${charIdx}`}
                          className="border border-gray-300 px-2 py-2 text-sm bg-white font-mono break-words overflow-hidden"
                          style={{ width: '192px', maxWidth: '192px', minWidth: '192px' }}
                        >
                          {pronunciation}
                        </td>
                        );
                      })}
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-sm text-gray-600 font-medium">
              共 {tableRows.length} 种语言
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasQueried && (
        <div className="flex items-center justify-center min-h-[500px]">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-[#EB0000] mb-3 tracking-tight">
              {t.query.title}
            </h2>
            <p className="text-lg text-gray-600">{t.query.subtitle}</p>
          </div>
        </div>
      )}


    </div>
  );
}
