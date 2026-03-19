"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useLang } from "@/lib/i18n";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { SearchBar } from "@/components/search/SearchBar";

const NAV_SLUGS = [
  "gewuerze",
  "trockenfruechte",
  "fruehstueck",
  "oele",
  "nuesse",
  "spezialitaeten",
] as const;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const { t } = useLang();

  useEffect(() => setMounted(true), []);

  const navLinks = NAV_SLUGS.map((slug) => ({
    label: t(`cat.${slug}` as Parameters<typeof t>[0]),
    href: `/category/${slug}`,
  }));

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-sand-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -ml-2 text-espresso-500 hover:text-espresso-700 transition-colors"
            aria-label={mobileOpen ? t("menu.close") : t("menu.open")}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl sm:text-2xl font-semibold tracking-widest text-espresso-600 group-hover:text-espresso-500 transition-colors">
              FEINKOST
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-olive-500 group-hover:bg-olive-400 transition-colors" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-espresso-400 hover:text-espresso-600 transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-olive-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search + Lang switch + Cart button */}
          <div className="flex items-center gap-3">
            <SearchBar />
            <LangSwitch />
            <button
              onClick={toggleCart}
              className="relative p-2 -mr-2 text-espresso-500 hover:text-espresso-700 transition-colors"
              aria-label={t("cart.open")}
            >
              <ShoppingBag className="w-5 h-5" />
              {mounted && totalItems() > 0 && (
                <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center w-5 h-5 text-[10px] font-semibold text-white bg-olive-500 rounded-full">
                  {totalItems()}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-sand-200 bg-cream-50 animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 text-sm font-medium text-espresso-500 hover:text-espresso-700 hover:bg-sand-100 rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
