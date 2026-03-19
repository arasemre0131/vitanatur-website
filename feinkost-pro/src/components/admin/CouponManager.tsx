"use client";

import { useState } from "react";
import { Trash2, ToggleLeft, ToggleRight, RefreshCw, Tag } from "lucide-react";
import { useCouponStore } from "@/store/coupon-store";
import { useLang } from "@/lib/i18n";
import type { Coupon } from "@/types";

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "FK-";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

function formatPrice(price: number): string {
  return price.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

export function CouponManager() {
  const { coupons, addCoupon, removeCoupon, toggleCoupon } = useCouponStore();
  const { t } = useLang();

  const [showForm, setShowForm] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form state
  const [code, setCode] = useState("");
  const [type, setType] = useState<"percentage" | "fixed">("percentage");
  const [value, setValue] = useState("");
  const [minOrder, setMinOrder] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiresAt, setExpiresAt] = useState("");

  const resetForm = () => {
    setCode("");
    setType("percentage");
    setValue("");
    setMinOrder("");
    setMaxUses("");
    setExpiresAt("");
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim() || !value.trim()) return;

    const coupon: Coupon = {
      id: crypto.randomUUID(),
      code: code.trim().toUpperCase(),
      type,
      value: parseFloat(value) || 0,
      minOrder: parseFloat(minOrder) || 0,
      maxUses: parseInt(maxUses) || 0,
      usedCount: 0,
      active: true,
      expiresAt: expiresAt ? new Date(expiresAt).toISOString() : null,
      createdAt: new Date().toISOString(),
    };

    addCoupon(coupon);
    resetForm();
  };

  const handleDelete = (id: string) => {
    removeCoupon(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-serif text-2xl font-bold text-espresso-700">
            {t("coupon.title")}
          </h2>
          <p className="text-sm text-espresso-400 mt-0.5">
            {coupons.length} {t("coupon.title")}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-olive-500 text-white text-sm font-medium transition-colors hover:bg-olive-600 active:bg-olive-700 shadow-sm"
        >
          <Tag className="w-4 h-4" />
          {t("coupon.add")}
        </button>
      </div>

      {/* Add Coupon Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl border border-sand-200 shadow-sm p-6 space-y-5"
        >
          <h3 className="font-serif text-lg font-semibold text-espresso-700">
            {t("coupon.add")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Code */}
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                {t("coupon.code")}
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="z.B. SOMMER20"
                  required
                  className="flex-1 bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors text-sm font-mono uppercase"
                />
                <button
                  type="button"
                  onClick={() => setCode(generateCode())}
                  title={t("coupon.generate")}
                  className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg border border-sand-200 bg-sand-100 text-espresso-500 text-sm hover:bg-sand-200 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline">{t("coupon.generate")}</span>
                </button>
              </div>
            </div>

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                {t("coupon.type")}
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as "percentage" | "fixed")}
                className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors text-sm"
              >
                <option value="percentage">{t("coupon.type.percentage")}</option>
                <option value="fixed">{t("coupon.type.fixed")}</option>
              </select>
            </div>

            {/* Value */}
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                {t("coupon.value")} {type === "percentage" ? "(%)" : "(EUR)"}
              </label>
              <input
                type="number"
                step={type === "percentage" ? "1" : "0.01"}
                min="0"
                max={type === "percentage" ? "100" : undefined}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={type === "percentage" ? "10" : "5.00"}
                required
                className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors text-sm"
              />
            </div>

            {/* Min Order */}
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                {t("coupon.min_order")} (EUR)
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                placeholder="0.00"
                className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors text-sm"
              />
            </div>

            {/* Max Uses */}
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                {t("coupon.max_uses")} (0 = {t("coupon.unlimited")})
              </label>
              <input
                type="number"
                step="1"
                min="0"
                value={maxUses}
                onChange={(e) => setMaxUses(e.target.value)}
                placeholder="0"
                className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors text-sm"
              />
            </div>

            {/* Expiry */}
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                {t("coupon.expires")}
              </label>
              <input
                type="date"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-olive-500 text-white text-sm font-medium transition-colors hover:bg-olive-600 active:bg-olive-700 shadow-sm"
            >
              {t("coupon.add")}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 rounded-lg border border-sand-200 text-espresso-500 text-sm font-medium hover:bg-sand-100 transition-colors"
            >
              {t("admin.cancel")}
            </button>
          </div>
        </form>
      )}

      {/* Coupon List */}
      {coupons.length === 0 ? (
        <div className="text-center py-16">
          <Tag className="w-12 h-12 text-sand-300 mx-auto mb-3" />
          <p className="text-espresso-400">{t("coupon.no_coupons")}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sand-200 bg-sand-50">
                  <th className="text-left px-5 py-3 font-semibold text-espresso-600">
                    {t("coupon.code")}
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-espresso-600">
                    {t("coupon.type")}
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-espresso-600">
                    {t("coupon.value")}
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-espresso-600">
                    {t("coupon.min_order")}
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-espresso-600">
                    {t("coupon.uses")}
                  </th>
                  <th className="text-left px-5 py-3 font-semibold text-espresso-600">
                    {t("coupon.expires")}
                  </th>
                  <th className="text-center px-5 py-3 font-semibold text-espresso-600">
                    {t("admin.status")}
                  </th>
                  <th className="text-right px-5 py-3 font-semibold text-espresso-600">
                    {/* Actions */}
                  </th>
                </tr>
              </thead>
              <tbody>
                {coupons.map((coupon) => {
                  const isExpired =
                    coupon.expiresAt && new Date(coupon.expiresAt) < new Date();
                  const isMaxed =
                    coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses;

                  return (
                    <tr
                      key={coupon.id}
                      className="border-b border-sand-100 last:border-b-0 hover:bg-cream-50/50 transition-colors"
                    >
                      {/* Code */}
                      <td className="px-5 py-3.5">
                        <span className="font-mono font-semibold text-espresso-700 bg-sand-100 px-2 py-1 rounded text-xs">
                          {coupon.code}
                        </span>
                      </td>

                      {/* Type */}
                      <td className="px-5 py-3.5 text-espresso-500">
                        {coupon.type === "percentage"
                          ? t("coupon.type.percentage")
                          : t("coupon.type.fixed")}
                      </td>

                      {/* Value */}
                      <td className="px-5 py-3.5 font-medium text-espresso-700">
                        {coupon.type === "percentage"
                          ? `${coupon.value}%`
                          : formatPrice(coupon.value)}
                      </td>

                      {/* Min Order */}
                      <td className="px-5 py-3.5 text-espresso-500">
                        {coupon.minOrder > 0
                          ? formatPrice(coupon.minOrder)
                          : "—"}
                      </td>

                      {/* Uses */}
                      <td className="px-5 py-3.5 text-espresso-500">
                        {coupon.usedCount} /{" "}
                        {coupon.maxUses === 0
                          ? t("coupon.unlimited")
                          : coupon.maxUses}
                      </td>

                      {/* Expires */}
                      <td className="px-5 py-3.5 text-espresso-500">
                        {coupon.expiresAt ? (
                          <span
                            className={
                              isExpired ? "text-red-500 font-medium" : ""
                            }
                          >
                            {new Date(coupon.expiresAt).toLocaleDateString(
                              "de-DE"
                            )}
                            {isExpired && " (!)"}
                          </span>
                        ) : (
                          "—"
                        )}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-3.5 text-center">
                        <span
                          className={[
                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
                            coupon.active && !isExpired && !isMaxed
                              ? "bg-olive-500/10 text-olive-600"
                              : "bg-sand-200 text-espresso-400",
                          ].join(" ")}
                        >
                          {coupon.active
                            ? t("coupon.active")
                            : t("coupon.inactive")}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          {/* Toggle */}
                          <button
                            type="button"
                            onClick={() => toggleCoupon(coupon.id)}
                            title={
                              coupon.active
                                ? t("coupon.inactive")
                                : t("coupon.active")
                            }
                            className="p-2 rounded-lg text-espresso-400 hover:bg-sand-100 hover:text-espresso-600 transition-colors"
                          >
                            {coupon.active ? (
                              <ToggleRight className="w-5 h-5 text-olive-500" />
                            ) : (
                              <ToggleLeft className="w-5 h-5" />
                            )}
                          </button>

                          {/* Delete */}
                          {deleteConfirmId === coupon.id ? (
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => handleDelete(coupon.id)}
                                className="px-2.5 py-1 rounded text-xs font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
                              >
                                {t("admin.yes")}
                              </button>
                              <button
                                type="button"
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2.5 py-1 rounded text-xs font-medium border border-sand-200 text-espresso-500 hover:bg-sand-100 transition-colors"
                              >
                                {t("admin.no")}
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setDeleteConfirmId(coupon.id)}
                              title={t("admin.delete")}
                              className="p-2 rounded-lg text-espresso-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
