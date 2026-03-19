import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CookieConsent } from "@/components/ui/CookieConsent";

export const metadata: Metadata = {
  title: {
    default: "Feinkost — Mediterrane Delikatessen",
    template: "%s | Feinkost",
  },
  description:
    "Premium mediterrane und orientalische Feinkost. Handverlesene Gewürze, Trockenfrüchte, Öle und Spezialitäten direkt aus dem Orient.",
  keywords: [
    "Feinkost",
    "mediterrane Delikatessen",
    "türkische Gewürze",
    "Trockenfrüchte",
    "Olivenöl",
    "Baklava",
    "orientalische Lebensmittel",
    "Sumak",
    "Pistazien",
  ],
  openGraph: {
    title: "Feinkost — Mediterrane Delikatessen",
    description:
      "Handverlesene mediterrane und orientalische Delikatessen. Gewürze, Trockenfrüchte, Öle und Spezialitäten.",
    type: "website",
    locale: "de_DE",
    siteName: "Feinkost",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="grain-overlay min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <CookieConsent />
      </body>
    </html>
  );
}
