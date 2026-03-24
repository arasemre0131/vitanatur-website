"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useLang } from "@/lib/i18n";
import { useProductSync } from "@/hooks/useProductSync";
import { useCustomerAuth } from "@/store/auth-store";

export function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const { lang } = useLang();

  // Hydrate products from Supabase on app init
  useProductSync();

  // Initialize customer auth
  const initAuth = useCustomerAuth((s) => s.initialize);
  useEffect(() => {
    initAuth();
  }, [initAuth]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
    </>
  );
}
