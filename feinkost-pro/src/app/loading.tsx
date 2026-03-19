"use client";

import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useLang } from "@/lib/i18n";

export default function Loading() {
  const { t } = useLang();

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-sand-400">{t("loading.text")}</p>
      </div>
    </div>
  );
}
