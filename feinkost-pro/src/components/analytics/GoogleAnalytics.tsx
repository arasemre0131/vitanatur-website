"use client";

import { useState, useEffect } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("feinkost-cookies");
    if (consent === "accepted") {
      setConsentGiven(true);
    }

    // Listen for consent changes (e.g. user accepts cookies after page load)
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "feinkost-cookies" && e.newValue === "accepted") {
        setConsentGiven(true);
      }
    };

    // Also poll for same-tab localStorage changes from the CookieConsent component
    const interval = setInterval(() => {
      const current = localStorage.getItem("feinkost-cookies");
      if (current === "accepted") {
        setConsentGiven(true);
        clearInterval(interval);
      }
    }, 1000);

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  if (!GA_ID || !consentGiven) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}
