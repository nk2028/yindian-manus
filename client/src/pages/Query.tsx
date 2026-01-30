import { queryCharacters } from "@/lib/api";
import { buildTableRows, parse廣韻字音 } from "@/lib/dataProcessor";
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
    <div className="min-h-screen bg-background">
      {/* Query Input Section */}
      <div className="bg-card p-3 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder={t.query.placeholder}
              className="flex-1 border-2 border-border px-3 py-2 text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 bg-background text-foreground"
            />
            <button
              onClick={handleQuery}
              disabled={!input.trim() || isQuerying}
              className="w-12 h-12 flex items-center justify-center bg-[#EB0000] text-white font-bold hover:bg-[#C50000] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors rounded-full flex-shrink-0"
              aria-label={t.query.button}
            >
              <svg
                className={`w-5 h-5 ${isQuerying ? 'animate-spin' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
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
              <table className="border-collapse border border-border bg-card">
                <thead>
                  <tr className="bg-[#EB0000] text-white">
                    <th className="border border-border px-2 py-2 text-left text-sm font-bold bg-[#EB0000] sticky left-0 z-10" style={{ width: '128px', maxWidth: '128px', minWidth: '128px' }}>
                    </th>
                    {characters.map((char, idx) => (
                      <th
                        key={idx}
                        className="border border-border px-2 py-2 text-center text-lg font-bold"
                        style={{ width: '192px', maxWidth: '192px', minWidth: '192px' }}
                      >
                        {char}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row) => {
                    return (
                    <tr
                      key={row.languageId}
                      className="hover:bg-secondary transition-colors"
                    >
                      <td className="border border-border px-2 py-2 bg-card sticky left-0 z-10" style={{ width: '128px', maxWidth: '128px', minWidth: '128px' }}>
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
                        let 字音 = row.字音列表[char] || "—";
                        let isHTML = false;
                        // Special handling for Guangyun (廣韻) data
                        if (row.languageAbbr === "廣韻" && 字音 !== "—") {
                          字音 = parse廣韻字音(字音, settings.廣韻字段);
                          isHTML = true; // Guangyun data contains HTML tags
                        }
                        
                        // Render with HTML or plain text
                        if (isHTML) {
                          return (
                            <td
                              key={`char-${charIdx}`}
                              className="border border-border px-2 py-2 text-sm bg-card font-mono break-words overflow-hidden text-foreground"
                              style={{ width: '192px', maxWidth: '192px', minWidth: '192px' }}
                              dangerouslySetInnerHTML={{ __html: 字音 }}
                            />
                          );
                        }
                        
                        return (
                          <td
                            key={`char-${charIdx}`}
                            className="border border-border px-2 py-2 text-sm bg-card font-mono break-words overflow-hidden text-foreground"
                            style={{ width: '192px', maxWidth: '192px', minWidth: '192px' }}
                          >
                            {字音}
                          </td>
                        );
                      })}
                    </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-sm text-muted-foreground font-medium">
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
            <p className="text-lg text-muted-foreground">{t.query.subtitle}</p>
          </div>
        </div>
      )}


    </div>
  );
}
