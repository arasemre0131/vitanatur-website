"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Truck, Package, MapPin, Search } from "lucide-react";

export default function VersandPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-sand-400 mb-8">
        <Link href="/" className="hover:text-olive-500 transition-colors">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-espresso-600">{t("versand.title")}</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl text-espresso-600 mb-4">
        {t("versand.title")}
      </h1>
      <p className="text-espresso-500 leading-relaxed mb-10">
        {t("versand.intro")}
      </p>

      <div className="space-y-8">
        {/* Germany */}
        <section className="bg-cream-100 rounded-xl p-6 border border-cream-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center">
              <Truck className="w-5 h-5 text-olive-600" />
            </div>
            <h2 className="font-serif text-xl text-espresso-600">
              {t("versand.germany_title")}
            </h2>
          </div>
          <ul className="space-y-2 text-espresso-500">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-olive-400 mt-2 shrink-0" />
              {t("versand.germany_time")}
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-olive-400 mt-2 shrink-0" />
              {t("versand.germany_cost")}
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-olive-400 mt-2 shrink-0" />
              <strong>{t("versand.germany_free")}</strong>
            </li>
          </ul>
        </section>

        {/* Austria & Switzerland */}
        <section className="bg-cream-100 rounded-xl p-6 border border-cream-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-olive-600" />
            </div>
            <h2 className="font-serif text-xl text-espresso-600">
              {t("versand.austria_title")}
            </h2>
          </div>
          <ul className="space-y-2 text-espresso-500">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-olive-400 mt-2 shrink-0" />
              {t("versand.austria_time")}
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-olive-400 mt-2 shrink-0" />
              {t("versand.austria_cost")}
            </li>
          </ul>
        </section>

        {/* Packaging */}
        <section className="bg-cream-100 rounded-xl p-6 border border-cream-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center">
              <Package className="w-5 h-5 text-olive-600" />
            </div>
            <h2 className="font-serif text-xl text-espresso-600">
              {t("versand.packaging_title")}
            </h2>
          </div>
          <p className="text-espresso-500 leading-relaxed">
            {t("versand.packaging_desc")}
          </p>
        </section>

        {/* Tracking */}
        <section className="bg-cream-100 rounded-xl p-6 border border-cream-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center">
              <Search className="w-5 h-5 text-olive-600" />
            </div>
            <h2 className="font-serif text-xl text-espresso-600">
              {t("versand.tracking_title")}
            </h2>
          </div>
          <p className="text-espresso-500 leading-relaxed">
            {t("versand.tracking_desc")}
          </p>
        </section>
      </div>
    </div>
  );
}
