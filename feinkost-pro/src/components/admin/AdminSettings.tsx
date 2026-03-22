"use client";

import { useState } from "react";
import { Save, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/i18n";

export function AdminSettings() {
  const { t } = useLang();
  const [shopName, setShopName] = useState("Vitanatur");
  const [email, setEmail] = useState("info@vitanatur.de");
  const [shippingThreshold, setShippingThreshold] = useState("49");
  const [currencyPosition, setCurrencyPosition] = useState<"after" | "before">(
    "after"
  );
  const [showToast, setShowToast] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const inputClass =
    "w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors";
  const labelClass = "block text-sm font-medium text-espresso-600 mb-1.5";

  return (
    <div className="max-w-2xl space-y-6">
      <div className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-sand-200">
          <h3 className="font-serif text-lg font-semibold text-espresso-700">
            {t("admin.settings_title")}
          </h3>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-6">
          {/* Shop Name */}
          <div>
            <label className={labelClass}>{t("admin.shop_name")}</label>
            <input
              type="text"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className={inputClass}
              placeholder="Mağaza adı"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className={labelClass}>{t("admin.contact_email")}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
              placeholder="email@example.com"
            />
          </div>

          {/* Shipping Threshold */}
          <div>
            <label className={labelClass}>
              {t("admin.shipping_threshold")}
            </label>
            <div className="relative">
              <input
                type="number"
                min="0"
                step="1"
                value={shippingThreshold}
                onChange={(e) => setShippingThreshold(e.target.value)}
                className={inputClass}
                placeholder="49"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-espresso-400 text-sm pointer-events-none">
                &euro;
              </span>
            </div>
            <p className="text-xs text-espresso-400 mt-1.5" />

          </div>

          {/* Currency Position */}
          <div>
            <label className={labelClass}>{t("admin.currency_position")}</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setCurrencyPosition("after")}
                className={[
                  "flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200",
                  currencyPosition === "after"
                    ? "border-olive-500 bg-olive-500/10 text-olive-700 ring-1 ring-olive-500/30"
                    : "border-sand-200 bg-sand-100 text-espresso-500 hover:border-sand-300",
                ].join(" ")}
              >
                {t("admin.after_amount")}
                <span className="block text-xs font-normal mt-0.5 opacity-70">
                  10&euro;
                </span>
              </button>
              <button
                type="button"
                onClick={() => setCurrencyPosition("before")}
                className={[
                  "flex-1 px-4 py-3 rounded-lg border text-sm font-medium transition-all duration-200",
                  currencyPosition === "before"
                    ? "border-olive-500 bg-olive-500/10 text-olive-700 ring-1 ring-olive-500/30"
                    : "border-sand-200 bg-sand-100 text-espresso-500 hover:border-sand-300",
                ].join(" ")}
              >
                {t("admin.before_amount")}
                <span className="block text-xs font-normal mt-0.5 opacity-70">
                  &euro;10
                </span>
              </button>
            </div>
          </div>

          {/* Save Button */}
          <div className="pt-2">
            <Button type="submit" size="lg">
              <Save className="w-4 h-4 mr-2" />
              {t("admin.save")}
            </Button>
          </div>
        </form>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-scale-in">
          <div className="flex items-center gap-2.5 bg-espresso-600 text-white px-5 py-3 rounded-xl shadow-lg">
            <CheckCircle className="w-5 h-5 text-olive-300" />
            <span className="text-sm font-medium">
              {t("admin.saved")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
