"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";

const CATEGORY_SLUGS = [
  "gewuerze",
  "trockenfruechte",
  "fruehstueck",
  "oele",
  "nuesse",
  "spezialitaeten",
  "kahveler",
  "caylar",
  "salcalar",
  "zuehre-ana",
] as const;

export function Footer() {
  const { t } = useLang();

  const serviceLinks = [
    { label: t("footer.shipping_link"), href: "/versand" },
    { label: t("footer.tracking"), href: "/siparis-takip" },
    { label: t("footer.contact"), href: "/kontakt" },
    { label: t("footer.faq"), href: "/faq" },
  ];

  return (
    <footer className="bg-espresso-600 text-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <img
                src="/images/vitanatur-logo-transparent.png"
                alt="Vitanatur"
                className="h-12 w-12 rounded-full object-cover"
              />
            </Link>
            <p className="text-sm leading-relaxed text-cream-300 max-w-xs">
              {t("footer.about")}
            </p>
          </div>

          {/* Kategorien */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream-100 mb-4">
              {t("footer.categories")}
            </h3>
            <ul className="space-y-2.5">
              {CATEGORY_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    href={`/category/${slug}`}
                    className="text-sm text-cream-300 hover:text-cream-100 transition-colors"
                  >
                    {t(`cat.${slug}` as Parameters<typeof t>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kundenservice */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream-100 mb-4">
              {t("footer.service")}
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-cream-300 hover:text-cream-100 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontakt */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-cream-100 mb-4">
              {t("footer.contact")}
            </h3>
            <address className="not-italic text-sm text-cream-300 space-y-2.5">
              <p>Vitanatur</p>
              <p>Bleicherweg 5</p>
              <p>40724 Hilden</p>
              <p className="pt-1">
                <a
                  href="tel:+4915203426787"
                  className="hover:text-cream-100 transition-colors"
                >
                  +49 1520 3426787
                </a>
              </p>
              <p>
                <a
                  href="mailto:info@vitanatur.com"
                  className="hover:text-cream-100 transition-colors"
                >
                  info@vitanatur.com
                </a>
              </p>
              <p>
                <a
                  href="https://instagram.com/vitanatur.shop61"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream-100 transition-colors"
                >
                  @vitanatur.shop61
                </a>
              </p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-espresso-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-cream-400">
          <span>&copy; {new Date().getFullYear()} Vitanatur. {t("footer.rights")}</span>
          <span>{t("footer.made_with")}</span>
        </div>
      </div>
    </footer>
  );
}
