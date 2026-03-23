"use client";

import { useLang } from "@/lib/i18n";
import type { Lang } from "@/lib/i18n";
import { useState, useRef, useEffect } from "react";

const languages: { code: Lang; flag: string; label: string }[] = [
  { code: "de", flag: "\u{1F1E9}\u{1F1EA}", label: "Deutsch" },
  { code: "tr", flag: "\u{1F1F9}\u{1F1F7}", label: "T\u00FCrk\u00E7e" },
  { code: "en", flag: "\u{1F1EC}\u{1F1E7}", label: "English" },
];

export function LangSwitch() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = languages.find((l) => l.code === lang) || languages[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-cream-200 rounded-full px-3 py-1.5 text-xs font-medium text-espresso-600 hover:bg-cream-300 transition-colors"
        aria-label="Select language"
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg
          className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-lg border border-cream-200 py-1 z-50 min-w-[140px]">
          {languages.map((l) => (
            <button
              key={l.code}
              onClick={() => {
                setLang(l.code);
                setOpen(false);
              }}
              aria-label={`Switch language to ${l.label}`}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                lang === l.code
                  ? "bg-olive-50 text-olive-700 font-medium"
                  : "text-espresso-600 hover:bg-cream-100"
              }`}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
