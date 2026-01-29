// Swiss International Style - API Service
// Design: Clean, functional data fetching

import type { CharacterResult, LanguageInfo } from "@/types";

const API_BASE = "https://1305783649-j61pduj0mx.ap-guangzhou.tencentscf.com";

/**
 * Fetch all language information
 * Called once on page load
 */
export async function fetchLanguages(): Promise<LanguageInfo[]> {
  try {
    const response = await fetch(`${API_BASE}/list-langs/`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data as LanguageInfo[];
  } catch (error) {
    console.error("Failed to fetch languages:", error);
    throw error;
  }
}

/**
 * Query character pronunciations
 * @param chars - Chinese characters to query (no spaces)
 */
export async function queryCharacters(
  chars: string
): Promise<CharacterResult[]> {
  try {
    const url = `${API_BASE}/chars/?chars=${encodeURIComponent(chars)}`;
    console.log("Fetching:", url);
    
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Query result:", data);
    return data as CharacterResult[];
  } catch (error) {
    console.error("Failed to query characters:", error);
    throw error;
  }
}
