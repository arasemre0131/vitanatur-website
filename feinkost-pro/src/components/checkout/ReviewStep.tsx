"use client";

import { useState } from "react";
import Image from "next/image";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/i18n";

function formatPrice(price: number): string {
  return price.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

const PAYMENT_LABEL_KEYS: Record<string, "payment.card" | "payment.paypal" | "payment.sofort"> = {
  card: "payment.card",
  paypal: "payment.paypal",
  sofort: "payment.sofort",
};

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function ConfettiDot({ delay, left }: { delay: number; left: number }) {
  const colors = ["bg-olive-500", "bg-brick-400", "bg-amber-400", "bg-olive-300", "bg-brick-300"];
  const color = colors[Math.floor(Math.abs(delay * 10) % colors.length)];

  return (
    <span
      className={`absolute w-2 h-2 rounded-full ${color} animate-bounce`}
      style={{
        left: `${left}%`,
        top: "-8px",
        animationDelay: `${delay}s`,
        animationDuration: "1.2s",
      }}
    />
  );
}

export function ReviewStep() {
  const { formData, isProcessing, paymentResult, processPayment, setStep, resetCheckout } =
    useCheckoutStore();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const clearCart = useCartStore((s) => s.clearCart);
  const [error, setError] = useState<string | null>(null);
  const { t, lang } = useLang();

  const FREE_SHIPPING_THRESHOLD = Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 49;
  const subtotal = totalPrice();
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 4.9;
  const total = subtotal + shippingCost;

  async function handlePlaceOrder() {
    setError(null);
    try {
      const result = await processPayment();
      if (result.success) {
        clearCart();
      } else {
        setError(result.error ?? t("checkout.error"));
      }
    } catch {
      setError(t("checkout.error"));
    }
  }

  // Success state
  if (paymentResult?.success) {
    return (
      <div className="text-center py-12 relative overflow-hidden">
        {/* Confetti */}
        <div className="relative h-0">
          {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7].map((delay, i) => (
            <ConfettiDot key={i} delay={delay} left={10 + i * 12} />
          ))}
        </div>

        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-olive-500/10 mb-6">
          <svg
            className="w-10 h-10 text-olive-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="font-serif text-3xl font-semibold text-espresso-700 mb-3">
          {t("checkout.thank_you")}
        </h2>
        <p className="text-espresso-500 mb-2">
          {t("checkout.order_success")}
        </p>
        <p className="text-sm text-espresso-400 mb-8">
          {t("checkout.order_number")}:{" "}
          <span className="font-mono font-semibold text-olive-600">
            {paymentResult.orderId}
          </span>
        </p>
        <p className="text-sm text-espresso-400 mb-8">
          {t("checkout.confirmation_sent").replace("{email}", formData.email)}
        </p>

        <Button
          size="lg"
          onClick={() => {
            resetCheckout();
            window.location.href = "/";
          }}
        >
          {t("checkout.continue_shopping")}
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-espresso-700 mb-6">
        {t("checkout.review_order")}
      </h2>

      {/* Shipping summary */}
      <div className="rounded-xl border border-sand-200 bg-white p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-espresso-700 uppercase tracking-wide">
            {t("checkout.shipping_address")}
          </h3>
          <button
            type="button"
            onClick={() => setStep("shipping")}
            className="text-sm text-olive-600 hover:text-olive-700 font-medium transition-colors"
          >
            {t("checkout.change")}
          </button>
        </div>
        <div className="text-sm text-espresso-500 leading-relaxed">
          <p className="font-medium text-espresso-600">
            {formData.firstName} {formData.lastName}
          </p>
          <p>{formData.street}</p>
          <p>
            {formData.postalCode} {formData.city}
          </p>
          <p>{formData.country}</p>
          <p className="mt-1 text-espresso-400">{formData.email}</p>
          <p className="text-espresso-400">{formData.phone}</p>
        </div>
      </div>

      {/* Payment summary */}
      <div className="rounded-xl border border-sand-200 bg-white p-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-semibold text-espresso-700 uppercase tracking-wide">
            {t("checkout.payment_method")}
          </h3>
          <button
            type="button"
            onClick={() => setStep("payment")}
            className="text-sm text-olive-600 hover:text-olive-700 font-medium transition-colors"
          >
            {t("checkout.change")}
          </button>
        </div>
        <div className="text-sm text-espresso-500">
          <p className="font-medium text-espresso-600">
            {t(PAYMENT_LABEL_KEYS[formData.paymentMethod])}
          </p>
          {formData.paymentMethod === "card" && formData.cardNumber && (
            <p className="font-mono text-espresso-400 mt-1">
              **** **** **** {formData.cardNumber.replace(/\s/g, "").slice(-4)}
            </p>
          )}
        </div>
      </div>

      {/* Order items */}
      <div className="rounded-xl border border-sand-200 bg-white p-5 mb-5">
        <h3 className="text-sm font-semibold text-espresso-700 uppercase tracking-wide mb-3">
          {t("checkout.articles")}
        </h3>
        <ul className="divide-y divide-sand-100">
          {items.map((item) => {
            const price = item.variant?.price ?? item.product.price;
            const key = `${item.product.id}-${item.variant?.id ?? "default"}`;
            const thumb = item.product.images?.[0];

            return (
              <li key={key} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
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
                  <p className="text-sm font-medium text-espresso-700">{lang === "tr" && item.product.nameTr ? item.product.nameTr : item.product.name}</p>
                  {item.variant && (
                    <p className="text-xs text-espresso-400">{item.variant.name}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-espresso-400">{t("checkout.quantity_short")}: {item.quantity}</p>
                    <span className="text-sm font-medium text-espresso-600">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="border-t border-sand-200 mt-4 pt-4 space-y-2">
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
          <div className="flex justify-between text-base font-semibold text-espresso-700 pt-2 border-t border-sand-200">
            <span>{t("checkout.total")}</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="rounded-xl border border-brick-300 bg-brick-300/10 p-4 mb-5">
          <p className="text-sm text-brick-600 font-medium">{error}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-8">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => setStep("payment")}
          disabled={isProcessing}
        >
          {t("checkout.back")}
        </Button>
        <Button
          size="lg"
          className="flex-1 ml-4"
          onClick={handlePlaceOrder}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Spinner />
              {t("checkout.processing")}
            </span>
          ) : (
            `${t("checkout.place_order")} \u00B7 ${formatPrice(total)}`
          )}
        </Button>
      </div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-6 mt-8 text-espresso-400">
        <div className="flex items-center gap-1.5 text-xs">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
          </svg>
          {t("checkout.ssl")}
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
          {t("checkout.secure_payment")}
        </div>
        <div className="flex items-center gap-1.5 text-xs">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0H6.375c-.621 0-1.125-.504-1.125-1.125V14.25m0 0L3.375 8.25A1.125 1.125 0 014.5 7.125h15a1.125 1.125 0 011.125 1.125L18 14.25" />
          </svg>
          {t("checkout.fast_shipping")}
        </div>
      </div>
    </div>
  );
}
