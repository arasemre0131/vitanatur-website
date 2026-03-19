"use client";
import { Component, ReactNode } from "react";
import { translations, useLang } from "@/lib/i18n";

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

function getTranslation(key: keyof typeof translations): string {
  const lang = useLang.getState().lang;
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] || entry["de"] || key;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
          <div className="text-center">
            <h2 className="font-serif text-2xl text-espresso-600 mb-2">{getTranslation("error.title")}</h2>
            <p className="text-sand-400 mb-6">{getTranslation("error.description")}</p>
            <button onClick={() => window.location.reload()} className="px-6 py-2.5 rounded-lg bg-olive-500 text-white font-medium hover:bg-olive-600 transition-colors">
              {getTranslation("error.reload")}
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
