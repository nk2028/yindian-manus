// Custom Language Selector with semi-transparent dropdown
// Design: Modern SBB style with backdrop blur and smooth transitions

import { useState, useRef, useEffect } from "react";
import { LANGUAGE_DISPLAY_NAMES, type Language } from "@/lib/i18n";

interface LanguageSelectorProps {
  value: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageSelector({ value, onChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: Language[] = ['香港', '中国', 'en', 'ja'];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const handleSelect = (lang: Language) => {
    onChange(lang);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 text-sm font-medium cursor-pointer rounded-full hover:bg-white transition-all flex items-center gap-2 border border-white/50"
      >
        <span>{LANGUAGE_DISPLAY_NAMES[value]}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200/50 overflow-hidden z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => handleSelect(lang)}
              className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors ${
                value === lang
                  ? 'bg-[#EB0000] text-white'
                  : 'text-gray-700 hover:bg-gray-100/80'
              }`}
            >
              {LANGUAGE_DISPLAY_NAMES[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
