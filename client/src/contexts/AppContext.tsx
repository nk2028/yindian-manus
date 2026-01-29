// Swiss International Style - App State Management
// Design: Centralized state for languages and settings

import { processLanguages } from "@/lib/dataProcessor";
import type {
  DisplayMode,
  LanguageInfo,
  ProcessedLanguage,
  UserSettings,
} from "@/types";
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
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const DEFAULT_SETTINGS: UserSettings = {
  displayMode: "atlas2",
  selectedLanguages: new Set<number>(),
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [rawLanguages, setRawLanguages] = useState<LanguageInfo[]>([]);
  const [isLoadingLanguages, setIsLoadingLanguages] = useState(true);
  const [languagesError, setLanguagesError] = useState<Error | null>(null);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);

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
