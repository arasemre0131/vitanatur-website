"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

export default function NotFound() {
  const { t } = useLang();

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-serif text-cream-300 mb-4">404</p>
        <h1 className="font-serif text-2xl text-espresso-600 mb-2">
          {t("notfound.title")}
        </h1>
        <p className="text-sand-400 mb-8">
          {t("notfound.description")}
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg bg-olive-500 text-white font-medium hover:bg-olive-600 transition-colors"
        >
          {t("notfound.home")}
        </Link>
      </div>
    </div>
  );
}
