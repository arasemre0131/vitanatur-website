"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useLang } from "@/lib/i18n";
import { LangSwitch } from "@/components/ui/LangSwitch";
import { SearchBar } from "@/components/search/SearchBar";
import { useCustomerAuth } from "@/store/auth-store";

const NAV_SLUGS = [
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

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleCart = useCartStore((s) => s.toggleCart);
  const totalItems = useCartStore((s) => s.totalItems);
  const { t } = useLang();
  const user = useCustomerAuth((s) => s.user);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => setMounted(true), []);

  const navLinks = NAV_SLUGS.map((slug) => ({
    label: t(`cat.${slug}` as Parameters<typeof t>[0]),
    href: `/category/${slug}`,
  }));

  function checkScroll() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  function scrollNav(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "left" ? -200 : 200, behavior: "smooth" });
    setTimeout(checkScroll, 300);
  }

  return (
    <header className="sticky top-0 z-40 bg-cream-50/95 backdrop-blur-sm border-b border-sand-200">
      {/* Top bar: Logo + Search + Actions */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -ml-2 text-espresso-500 hover:text-espresso-700 transition-colors"
            aria-label={mobileOpen ? t("menu.close") : t("menu.open")}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo — always visible */}
          <Link href="/" className="flex items-center">
            <img
              src="/images/vitanatur-logo-transparent.png"
              alt="Vitanatur"
              className="h-16 w-16 lg:h-20 lg:w-20 rounded-full object-contain"
              fetchPriority="high"
              width={80}
              height={80}
            />
          </Link>

          {/* Search + Lang + Account + Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <SearchBar />
            <LangSwitch />

            {/* Account button */}
            {mounted && (
              <Link
                href="/account"
                className="p-2 text-espresso-500 hover:text-espresso-700 transition-colors"
                aria-label="Account"
                title={user ? user.email || "Account" : "Login"}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </Link>
            )}

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

      {/* Category nav bar — scrollable, second row (desktop) */}
      <div className="hidden lg:block border-t border-sand-100 bg-cream-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {canScrollLeft && (
            <button
              onClick={() => scrollNav("left")}
              className="absolute left-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-r from-cream-100 to-transparent"
            >
              <ChevronLeft className="w-4 h-4 text-espresso-400" />
            </button>
          )}
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex items-center gap-1 overflow-x-auto scrollbar-hide py-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <Link
              href="/"
              className="px-3 py-1.5 text-sm font-medium text-olive-600 hover:text-olive-700 whitespace-nowrap transition-colors"
            >
              {t("nav.home")}
            </Link>
            <span className="text-sand-300">|</span>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-espresso-400 hover:text-espresso-600 whitespace-nowrap transition-colors relative after:absolute after:bottom-0 after:left-3 after:right-3 after:h-px after:bg-olive-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-center"
              >
                {link.label}
              </Link>
            ))}
          </div>
          {canScrollRight && (
            <button
              onClick={() => scrollNav("right")}
              className="absolute right-0 top-0 bottom-0 z-10 px-2 bg-gradient-to-l from-cream-100 to-transparent"
            >
              <ChevronRight className="w-4 h-4 text-espresso-400" />
            </button>
          )}
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
