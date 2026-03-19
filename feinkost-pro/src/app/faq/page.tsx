"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6, 7, 8] as const;

export default function FaqPage() {
  const { t } = useLang();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-sand-400 mb-8">
        <Link href="/" className="hover:text-olive-500 transition-colors">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-espresso-600">{t("footer.faq")}</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl text-espresso-600 mb-10">
        {t("faq.title")}
      </h1>

      <div className="space-y-3">
        {FAQ_KEYS.map((num) => {
          const questionKey = `faq.q${num}` as Parameters<typeof t>[0];
          const answerKey = `faq.a${num}` as Parameters<typeof t>[0];
          const isOpen = openIndex === num;

          return (
            <div
              key={num}
              className="bg-cream-100 border border-cream-300 rounded-xl overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(num)}
                className="w-full flex items-center justify-between px-6 py-4 text-left"
              >
                <span className="font-medium text-espresso-600 pr-4">
                  {t(questionKey)}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-sand-400 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 text-espresso-500 leading-relaxed">
                  {t(answerKey)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
