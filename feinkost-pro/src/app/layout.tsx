import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});
import { ConditionalShell } from "@/components/layout/ConditionalShell";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { PageViewTracker } from "@/components/analytics/PageViewTracker";
import {
  OrganizationJsonLd,
  WebSiteJsonLd,
  LocalBusinessJsonLd,
} from "@/components/seo/JsonLd";
import { fetchProductsServer } from "@/lib/fetch-products-server";
import { ProductHydrator } from "@/components/ProductHydrator";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vitanatur.shop";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6B7F3E",
};

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Vitanatur — Türkische & Mediterrane Feinkost Online Kaufen",
    template: "%s | Vitanatur — Mediterrane Delikatessen",
  },
  description:
    "Premium türkische und mediterrane Feinkost online bestellen bei Vitanatur. Handverlesene Gewürze, Trockenfrüchte, Nüsse, Olivenöl und orientalische Spezialitäten. Schneller Versand in ganz Deutschland.",
  keywords: [
    "Vitanatur",
    "türkische Feinkost",
    "türkische Lebensmittel online kaufen",
    "türkische Gewürze kaufen",
    "orientalische Lebensmittel bestellen",
    "mediterrane Delikatessen",
    "türkischer Kaffee bestellen",
    "Trockenfrüchte",
    "Olivenöl türkisch",
    "Medjool Datteln kaufen",
    "Sumak Gewürz",
    "Pistazien Antep",
    "Tahini kaufen",
    "Nüsse online kaufen",
    "Pekmez kaufen",
    "Tarhana kaufen",
    "Kaşar Käse",
    "türkische Spezialitäten Deutschland",
    "Zühre Ana Produkte",
    "Biber Salçası",
    "Haselnüsse Giresun",
    "orientalischer Online Shop",
    "türkische Lebensmittel Hilden",
    "Vitanatur Shop",
  ],
  openGraph: {
    title: "Vitanatur — Türkische & Mediterrane Feinkost Online",
    description:
      "Handverlesene mediterrane und orientalische Delikatessen. Gewürze, Trockenfrüchte, Nüsse, Öle und Spezialitäten direkt aus dem Orient.",
    type: "website",
    locale: "de_DE",
    alternateLocale: "tr_TR",
    siteName: "Vitanatur",
    url: BASE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: "Vitanatur — Türkische & Mediterrane Feinkost Online",
    description:
      "Handverlesene mediterrane und orientalische Delikatessen. Gewürze, Trockenfrüchte, Nüsse, Öle und Spezialitäten.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "Food & Drink",
};

// ISR: Vercel caches this page for 5 minutes, then revalidates in background
// Visitors ALWAYS get instant cached version, never wait for Supabase
export const revalidate = 300;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch products server-side — first visitor sees products instantly
  const products = await fetchProductsServer();

  return (
    <html lang="de" suppressHydrationWarning className={`${inter.variable} ${playfair.variable}`}>
      <body className="grain-overlay min-h-screen flex flex-col font-sans">
        {/* Hydrate client store with server-fetched products */}
        <ProductHydrator products={products} />

        {/* Global structured data */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />

        <GoogleAnalytics />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
        <ConditionalShell>{children}</ConditionalShell>
        <CookieConsent />
      </body>
    </html>
  );
}
