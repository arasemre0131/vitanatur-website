"use client";

import { useLang } from "@/lib/i18n";

export function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div className="flex items-center bg-cream-200 rounded-full p-0.5 text-xs font-medium">
      <button
        onClick={() => setLang("de")}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === "de" ? "bg-olive-500 text-white" : "text-espresso-400 hover:text-espresso-600"
        }`}
      >
        DE
      </button>
      <button
        onClick={() => setLang("tr")}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          lang === "tr" ? "bg-olive-500 text-white" : "text-espresso-400 hover:text-espresso-600"
        }`}
      >
        TR
      </button>
    </div>
  );
}
