"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useCouponStore } from "@/store/coupon-store";
import { useLang } from "@/lib/i18n";

function formatPrice(price: number): string {
  return price.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const { appliedCoupon, applyCoupon, clearAppliedCoupon, getDiscount } =
    useCouponStore();
  const { t, lang } = useLang();

  const [couponCode, setCouponCode] = useState("");
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState(false);

  const FREE_SHIPPING_THRESHOLD = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 49;
  const subtotal = totalPrice();
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const discount = getDiscount(subtotal);
  const total = Math.max(0, subtotal + shippingCost - discount);

  const handleApplyCoupon = () => {
    setCouponError("");
    setCouponSuccess(false);

    if (!couponCode.trim()) return;

    const result = applyCoupon(couponCode.trim(), subtotal);

    if (result.success) {
      setCouponSuccess(true);
      setCouponCode("");
    } else if (result.error) {
      setCouponError(t(result.error as any));
    }
  };

  const handleRemoveCoupon = () => {
    clearAppliedCoupon();
    setCouponSuccess(false);
    setCouponError("");
  };

  return (
    <div className="sticky top-8 rounded-2xl border border-sand-200 bg-white p-6 shadow-sm">
      <h2 className="font-serif text-xl font-semibold text-espresso-700 mb-5">
        {t("checkout.your_order")}
      </h2>

      {items.length === 0 ? (
        <p className="text-sm text-espresso-400">{t("checkout.cart_empty")}</p>
      ) : (
        <>
          <ul className="space-y-3 mb-5">
            {items.map((item) => {
              const price = item.variant?.price ?? item.product.price;
              const key = `${item.product.id}-${item.variant?.id ?? "default"}`;

              const thumb = item.product.images?.[0];

              return (
                <li key={key} className="flex items-start gap-3">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt={item.product.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-cream-200 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-espresso-700 truncate">
                      {lang === "tr" && item.product.nameTr ? item.product.nameTr : item.product.name}
                    </p>
                    {item.variant && (
                      <p className="text-xs text-espresso-400">{item.variant.name}</p>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-espresso-400">
                        {item.quantity} &times; {formatPrice(price)}
                      </p>
                      <span className="text-sm font-medium text-espresso-600 whitespace-nowrap">
                        {formatPrice(price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Coupon Code Input */}
          <div className="border-t border-sand-200 pt-4 mb-4">
            {appliedCoupon ? (
              <div className="flex items-center justify-between bg-olive-500/5 border border-olive-500/20 rounded-lg px-3 py-2.5">
                <div>
                  <p className="text-sm font-medium text-olive-600">
                    {t("coupon.applied")}
                  </p>
                  <p className="text-xs text-olive-500 font-mono">
                    {appliedCoupon.code} &mdash;{" "}
                    {appliedCoupon.type === "percentage"
                      ? `${appliedCoupon.value}%`
                      : formatPrice(appliedCoupon.value)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveCoupon}
                  title={t("coupon.remove")}
                  className="p-1.5 rounded-md text-olive-500 hover:bg-olive-500/10 hover:text-olive-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                  {t("coupon.code")}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value.toUpperCase());
                      setCouponError("");
                      setCouponSuccess(false);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleApplyCoupon();
                      }
                    }}
                    placeholder="z.B. SOMMER20"
                    className="flex-1 bg-sand-100 border border-sand-200 rounded-lg px-3 py-2 text-sm text-espresso-700 font-mono uppercase placeholder:text-espresso-400/50 placeholder:normal-case focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="px-4 py-2 rounded-lg bg-olive-500 text-white text-sm font-medium hover:bg-olive-600 active:bg-olive-700 transition-colors shadow-sm"
                  >
                    {t("coupon.apply")}
                  </button>
                </div>

                {/* Error message */}
                {couponError && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium">
                    {couponError}
                  </p>
                )}

                {/* Success message */}
                {couponSuccess && (
                  <p className="mt-1.5 text-xs text-olive-600 font-medium">
                    {t("coupon.applied")}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="border-t border-sand-200 pt-4 space-y-2">
            <div className="flex justify-between text-sm text-espresso-500">
              <span>{t("checkout.subtotal")}</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-espresso-500">
              <span>{t("checkout.shipping_cost")}</span>
              <span>
                {shippingCost === 0 ? (
                  <span className="text-olive-600 font-medium">{t("checkout.free")}</span>
                ) : (
                  formatPrice(shippingCost)
                )}
              </span>
            </div>
            {shippingCost > 0 && subtotal < FREE_SHIPPING_THRESHOLD && (
              <p className="text-xs text-olive-500">
                {t("checkout.free_shipping_remaining").replace("{amount}", formatPrice(FREE_SHIPPING_THRESHOLD - subtotal))}
              </p>
            )}

            {/* Discount line */}
            {discount > 0 && (
              <div className="flex justify-between text-sm font-medium text-olive-600">
                <span>{t("coupon.discount")}</span>
                <span>-{formatPrice(discount)}</span>
              </div>
            )}

            <div className="flex justify-between text-base font-semibold text-espresso-700 pt-2 border-t border-sand-200">
              <span>{t("checkout.total")}</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
