"use client";

import { useState } from "react";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { useCouponStore } from "@/store/coupon-store";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/i18n";

function StripeIcon() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
      />
    </svg>
  );
}

function formatPrice(price: number): string {
  return price.toLocaleString("de-DE", {
    style: "currency",
    currency: "EUR",
  });
}

export function PaymentForm() {
  const { formData, setStep } = useCheckoutStore();
  const items = useCartStore((s) => s.items);
  const totalPrice = useCartStore((s) => s.totalPrice);
  const { getDiscount } = useCouponStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLang();

  const stripeConfigured = !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

  const FREE_SHIPPING_THRESHOLD =
    Number(process.env.NEXT_PUBLIC_FREE_SHIPPING_THRESHOLD) || 100;
  const subtotal = totalPrice();
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const discount = getDiscount(subtotal);
  const total = Math.max(0, subtotal + shippingCost - discount);

  async function handleStripeCheckout() {
    setIsLoading(true);
    setError(null);

    try {
      const cartItems = items.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        variantName: item.variant?.name || null,
        weight: item.variant?.weight || item.product.weight || null,
        unitPrice: item.variant?.price ?? item.product.price,
        quantity: item.quantity,
        totalPrice:
          (item.variant?.price ?? item.product.price) * item.quantity,
      }));

      // Subtract discount from first item price if applicable
      // or add as negative line item conceptually (we pass adjusted shipping)
      const adjustedShipping = shippingCost;

      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartItems,
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            phone: formData.phone,
            street: formData.street,
            city: formData.city,
            postalCode: formData.postalCode,
            country: formData.country,
          },
          shippingCost: adjustedShipping,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setError(
          data.error || t("checkout.error")
        );
        setIsLoading(false);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError(t("checkout.error"));
        setIsLoading(false);
      }
    } catch {
      setError(t("checkout.error"));
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-espresso-700 mb-6">
        {t("checkout.payment_method")}
      </h2>

      {stripeConfigured ? (
        <>
          {/* Stripe Checkout section */}
          <div className="mb-8 p-6 rounded-xl border border-sand-200 bg-sand-100/30">
            <div className="flex items-center gap-3 mb-4">
              <div className="text-[#635BFF]">
                <StripeIcon />
              </div>
              <h3 className="text-lg font-semibold text-espresso-700">
                {t("checkout.secure_online_payment")}
              </h3>
            </div>

            <p className="text-sm text-espresso-500 mb-4">
              {t("checkout.stripe_description")}
            </p>

            {/* Accepted payment methods */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="text-xs text-espresso-400 font-medium uppercase tracking-wide">
                {t("checkout.accepted_methods")}:
              </span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-white border border-sand-200 text-xs font-medium text-espresso-600">
                  Visa
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-sand-200 text-xs font-medium text-espresso-600">
                  Mastercard
                </span>
                <span className="px-2.5 py-1 rounded-md bg-white border border-sand-200 text-xs font-medium text-espresso-600">
                  Klarna
                </span>
              </div>
            </div>

            {/* Order total preview */}
            <div className="bg-white rounded-lg border border-sand-200 p-4 mb-6">
              <div className="flex justify-between text-sm text-espresso-500 mb-1">
                <span>{t("checkout.subtotal")}</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-olive-600 mb-1">
                  <span>{t("coupon.discount")}</span>
                  <span>-{formatPrice(discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-espresso-500 mb-2">
                <span>{t("checkout.shipping_cost")}</span>
                <span>
                  {shippingCost === 0 ? (
                    <span className="text-olive-600 font-medium">
                      {t("checkout.free")}
                    </span>
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

            {/* Error message */}
            {error && (
              <div className="rounded-xl border border-brick-300 bg-brick-300/10 p-4 mb-4">
                <p className="text-sm text-brick-600 font-medium">{error}</p>
              </div>
            )}

            {/* Stripe checkout button */}
            <button
              type="button"
              onClick={handleStripeCheckout}
              disabled={isLoading || items.length === 0}
              className="w-full flex items-center justify-center gap-3 bg-[#635BFF] hover:bg-[#5851E0] active:bg-[#4B44D4] text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-[#635BFF]/20"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Spinner />
                  {t("checkout.redirecting")}
                </span>
              ) : (
                <>
                  <LockIcon />
                  {t("checkout.pay_with_stripe")} · {formatPrice(total)}
                </>
              )}
            </button>

            <p className="text-xs text-espresso-400 text-center mt-3 flex items-center justify-center gap-1.5">
              <LockIcon />
              {t("checkout.stripe_secure_note")}
            </p>
          </div>
        </>
      ) : (
        /* Fallback when Stripe is not configured */
        <div className="mb-8 p-6 rounded-xl border border-sand-200 bg-sand-100/30 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sand-200 mb-4">
            <LockIcon />
          </div>
          <h3 className="text-lg font-semibold text-espresso-700 mb-2">
            {t("checkout.payment_coming_soon")}
          </h3>
          <p className="text-sm text-espresso-500">
            {t("checkout.payment_coming_soon_desc")}
          </p>
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="secondary"
          size="lg"
          onClick={() => setStep("shipping")}
        >
          {t("checkout.back")}
        </Button>
        {!stripeConfigured && (
          <Button
            type="button"
            size="lg"
            disabled
          >
            {t("checkout.pay_with_stripe")}
          </Button>
        )}
      </div>
    </div>
  );
}
