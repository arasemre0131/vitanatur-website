"use client";
import { useState, useEffect } from "react";
import { useLang } from "@/lib/i18n";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const { t } = useLang();

  useEffect(() => {
    const consent = localStorage.getItem("feinkost-cookies");
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("feinkost-cookies", "accepted");
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("feinkost-cookies", "rejected");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-cream-100 shadow-lg rounded-t-xl md:rounded-t-xl p-4 md:p-6">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-sm text-espresso-600 flex-1">
          {t("cookie.text")}
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleReject}
            className="px-5 py-2 rounded-lg border border-sand-300 text-espresso-600 text-sm font-medium hover:bg-sand-100 transition-colors"
          >
            {t("cookie.reject")}
          </button>
          <button
            onClick={handleAccept}
            className="px-5 py-2 rounded-lg bg-olive-500 text-white text-sm font-medium hover:bg-olive-600 transition-colors"
          >
            {t("cookie.accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
