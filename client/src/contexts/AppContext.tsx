// Swiss International Style - App State Management
// Design: Centralized state for languages and settings

import { processLanguages } from "@/lib/dataProcessor";
import type {
  DisplayMode,
  LanguageInfo,
  ProcessedLanguage,
  UserSettings,
} from "@/types";
import type { Language } from "@/lib/i18n";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { fetchLanguages } from "@/lib/api";

interface AppContextValue {
  // Language data
  rawLanguages: LanguageInfo[];
  processedLanguages: ProcessedLanguage[];
  isLoadingLanguages: boolean;
  languagesError: Error | null;

  // User settings
  settings: UserSettings;
  updateDisplayMode: (mode: DisplayMode) => void;
  toggleLanguage: (langId: number) => void;
  selectAllLanguages: () => void;
  deselectAllLanguages: () => void;
  
  // UI language
  language: Language;
  updateLanguage: (lang: Language) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

// Migration map for old displayMode values
const DISPLAY_MODE_MIGRATION: Record<string, DisplayMode> = {
  atlas2: "地圖集二",
  yindian: "音典",
  chenfang: "陳邡",
};

const DEFAULT_SETTINGS: UserSettings = {
  displayMode: "地圖集二",
  selectedLanguages: new Set<number>(),
};

const DEFAULT_LANGUAGE: Language = '香港';

// Migrate old displayMode value if needed
function migrateDisplayMode(mode: string): DisplayMode {
  return (DISPLAY_MODE_MIGRATION[mode] as DisplayMode) || mode as DisplayMode;
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [rawLanguages, setRawLanguages] = useState<LanguageInfo[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true);
  const [languagesError, setLanguagesError] = useState<Error | null>(null);
  const [language, setLanguageState] = useState<Language>(() => {
    // Try to load language from localStorage
    try {
      const saved = localStorage.getItem('yindian-language');
      if (saved) {
        return saved as Language;
      }
    } catch (e) {
      console.error('Failed to load language:', e);
    }
    return DEFAULT_LANGUAGE;
  });
  const [settings, setSettings] = useState<UserSettings>(() => {
    // Try to load settings from localStorage with migration
    try {
      const saved = localStorage.getItem('yindian-settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          displayMode: migrateDisplayMode(parsed.displayMode),
          selectedLanguages: new Set(parsed.selectedLanguages || []),
        };
      }
    } catch (e) {
      console.error('Failed to load settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Load languages on mount
  useEffect(() => {
    let mounted = true;

    fetchLanguages()
      .then((data) => {
        if (!mounted) return;
        setRawLanguages(data);
        // Select all languages by default
        const allIds = new Set(data.map((lang) => Number(lang[0])));
        setSettings((prev) => ({
          ...prev,
          selectedLanguages: allIds,
        }));
        setIsLoadingLanguages(false);
      })
      .catch((error) => {
        if (!mounted) return;
        setLanguagesError(error);
        setIsLoadingLanguages(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Process languages based on current display mode
  const processedLanguages = processLanguages(
    rawLanguages,
    settings.displayMode
  );

  const updateDisplayMode = (mode: DisplayMode) => {
    setSettings((prev) => ({ ...prev, displayMode: mode }));
  };

  const toggleLanguage = (langId: number) => {
    setSettings((prev) => {
      const newSelected = new Set(prev.selectedLanguages);
      if (newSelected.has(langId)) {
        newSelected.delete(langId);
      } else {
        newSelected.add(langId);
      }
      return { ...prev, selectedLanguages: newSelected };
    });
  };

  const selectAllLanguages = () => {
    const allIds = new Set(rawLanguages.map((lang) => Number(lang[0])));
    setSettings((prev) => ({ ...prev, selectedLanguages: allIds }));
  };

  const deselectAllLanguages = () => {
    setSettings((prev) => ({ ...prev, selectedLanguages: new Set() }));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('yindian-language', lang);
    } catch (e) {
      console.error('Failed to save language:', e);
    }
  };

  const value: AppContextValue = {
    rawLanguages,
    processedLanguages,
    isLoadingLanguages,
    languagesError,
    settings,
    updateDisplayMode,
    toggleLanguage,
    selectAllLanguages,
    deselectAllLanguages,
    language,
    updateLanguage: setLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
}
