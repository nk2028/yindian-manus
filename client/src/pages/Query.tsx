// Swiss International Style - Query Page
// Design: Functional, clear information hierarchy with tight spacing

import { queryCharacters } from "@/lib/api";
import { buildTableRows } from "@/lib/dataProcessor";
import type { CharacterResult, TableRow } from "@/types";
import { useState } from "react";
import { useApp } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";

export default function Query() {
  const { processedLanguages, settings } = useApp();
  const [input, setInput] = useState("");
  const [queryResults, setQueryResults] = useState<CharacterResult[]>([]);
  const [tableRows, setTableRows] = useState<TableRow[]>([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleQuery = async () => {
    if (!input.trim()) return;

    setIsQuerying(true);
    setError(null);

    try {
      const results = await queryCharacters(input.trim());
      setQueryResults(results);

      // Build table rows
      const rows = buildTableRows(
        results,
        processedLanguages,
        settings.selectedLanguages
      );
      setTableRows(rows);
    } catch (err) {
      setError("查询失败,请重试");
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
    <div className="min-h-screen bg-white">
      {/* Query Input Section */}
      <div className="border-b-2 border-black p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="输入汉字查询读音"
              className="flex-1 border-2 border-black px-3 py-2 text-base focus:outline-none focus:border-[#EB0000]"
              disabled={isQuerying}
            />
            <Button
              onClick={handleQuery}
              disabled={isQuerying || !input.trim()}
              className="bg-[#EB0000] text-white border-2 border-black px-6 py-2 hover:bg-[#C00000] disabled:bg-gray-300 disabled:text-gray-500"
            >
              {isQuerying ? "查询中..." : "查询"}
            </Button>
          </div>
          {error && (
            <div className="mt-2 text-[#EB0000] text-sm">{error}</div>
          )}
        </div>
      </div>

      {/* Results Table Section */}
      {tableRows.length > 0 && (
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-white">
                    <th className="border-r-2 border-white px-2 py-1 text-left text-sm font-bold">
                      语言
                    </th>
                    {characters.map((char, idx) => (
                      <th
                        key={idx}
                        className="border-r-2 border-white px-2 py-1 text-center text-sm font-bold last:border-r-0"
                      >
                        {char}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, rowIdx) => (
                    <tr
                      key={row.languageId}
                      className={rowIdx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border-r-2 border-t-2 border-black px-2 py-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-block px-2 py-0.5 text-white text-xs font-bold"
                            style={{ backgroundColor: row.color }}
                          >
                            {row.languageAbbr}
                          </span>
                          <span className="text-sm">{row.languageName}</span>
                        </div>
                      </td>
                      {characters.map((char, charIdx) => (
                        <td
                          key={charIdx}
                          className="border-r-2 border-t-2 border-black px-2 py-1 text-center text-sm last:border-r-0"
                        >
                          {row.pronunciations[char] || "—"}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-xs text-gray-600">
              共 {tableRows.length} 种语言
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {tableRows.length === 0 && !isQuerying && (
        <div className="flex items-center justify-center h-64">
          <div className="text-center text-gray-500">
            <div className="text-lg font-bold mb-2">音典网页版</div>
            <div className="text-sm">输入汉字开始查询</div>
          </div>
        </div>
      )}
    </div>
  );
}
