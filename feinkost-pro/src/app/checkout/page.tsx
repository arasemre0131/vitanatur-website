"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useCheckoutStore } from "@/store/checkout-store";
import { useCartStore } from "@/store/cart-store";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { ReviewStep } from "@/components/checkout/ReviewStep";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/ui/Button";
import type { CheckoutStep } from "@/types";
import { useLang } from "@/lib/i18n";

const STEP_KEYS: CheckoutStep[] = ["shipping", "payment", "review"];

function stepIndex(step: CheckoutStep): number {
  return STEP_KEYS.indexOf(step);
}

function CheckmarkIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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

export default function CheckoutPage() {
  const { currentStep, paymentResult, resetCheckout } = useCheckoutStore();
  const clearCart = useCartStore((s) => s.clearCart);
  const activeIndex = stepIndex(currentStep);
  const { t } = useLang();
  const searchParams = useSearchParams();

  const [stripeSuccess, setStripeSuccess] = useState(false);
  const [stripeSessionId, setStripeSessionId] = useState<string | null>(null);
  const [stripeCanceled, setStripeCanceled] = useState(false);

  // Handle Stripe redirect return
  useEffect(() => {
    const success = searchParams.get("success");
    const sessionId = searchParams.get("session_id");
    const canceled = searchParams.get("canceled");

    if (success === "true" && sessionId) {
      setStripeSuccess(true);
      setStripeSessionId(sessionId);
      clearCart();
    } else if (canceled === "true") {
      setStripeCanceled(true);
    }
  }, [searchParams, clearCart]);

  const isOrderComplete = paymentResult?.success || stripeSuccess;

  const steps = [
    { key: "shipping" as CheckoutStep, label: t("checkout.shipping") },
    { key: "payment" as CheckoutStep, label: t("checkout.payment") },
    { key: "review" as CheckoutStep, label: t("checkout.review") },
  ];

  // Stripe success state
  if (stripeSuccess) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-espresso-700 text-center mb-10">
            {t("checkout.order_complete")}
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-6 sm:p-8">
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
                  {t("checkout.stripe_order_success")}
                </p>
                {stripeSessionId && (
                  <p className="text-sm text-espresso-400 mb-8">
                    {t("checkout.session_id")}:{" "}
                    <span className="font-mono font-semibold text-olive-600 text-xs">
                      {stripeSessionId.slice(0, 20)}...
                    </span>
                  </p>
                )}
                <p className="text-sm text-espresso-400 mb-8">
                  {t("checkout.stripe_confirmation_note")}
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Stripe canceled state
  if (stripeCanceled) {
    return (
      <div className="min-h-screen bg-cream-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-espresso-700 text-center mb-10">
            {t("checkout.title")}
          </h1>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-6 sm:p-8">
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-brick-500/10 mb-6">
                  <svg
                    className="w-10 h-10 text-brick-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>

                <h2 className="font-serif text-2xl font-semibold text-espresso-700 mb-3">
                  {t("checkout.payment_canceled")}
                </h2>
                <p className="text-espresso-500 mb-8">
                  {t("checkout.payment_canceled_desc")}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button
                    size="lg"
                    onClick={() => {
                      setStripeCanceled(false);
                      // Remove query params
                      window.history.replaceState({}, "", "/checkout");
                    }}
                  >
                    {t("checkout.retry_payment")}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => {
                      window.location.href = "/";
                    }}
                  >
                    {t("checkout.continue_shopping")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-espresso-700 text-center mb-10">
          {isOrderComplete ? t("checkout.order_complete") : t("checkout.title")}
        </h1>

        {/* Step indicator */}
        {!isOrderComplete && (
          <nav className="mb-10 sm:mb-14">
            <div className="max-w-lg mx-auto">
              <div className="flex items-center justify-between relative">
                {/* Connector line background */}
                <div className="absolute top-4 left-[16.67%] right-[16.67%] h-0.5 bg-sand-200" />
                {/* Connector line progress */}
                <div
                  className="absolute top-4 left-[16.67%] h-0.5 bg-olive-500 transition-all duration-500 ease-out"
                  style={{
                    width:
                      activeIndex === 0
                        ? "0%"
                        : activeIndex === 1
                        ? "50%"
                        : "100%",
                    maxWidth: "66.67%",
                  }}
                />

                {steps.map((step, idx) => {
                  const isActive = idx === activeIndex;
                  const isCompleted = idx < activeIndex;

                  return (
                    <div key={step.key} className="flex flex-col items-center relative z-10 flex-1">
                      {/* Circle */}
                      <div
                        className={[
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300",
                          isCompleted
                            ? "bg-olive-500 text-white"
                            : isActive
                            ? "bg-olive-500 text-white ring-4 ring-olive-500/20"
                            : "bg-sand-200 text-sand-400",
                        ].join(" ")}
                      >
                        {isCompleted ? <CheckmarkIcon /> : idx + 1}
                      </div>
                      {/* Label */}
                      <span
                        className={[
                          "mt-2 text-xs sm:text-sm font-medium transition-colors duration-300",
                          isActive
                            ? "text-olive-600 font-bold"
                            : isCompleted
                            ? "text-olive-500"
                            : "text-sand-300",
                        ].join(" ")}
                      >
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </nav>
        )}

        {/* Main content */}
        <div className={isOrderComplete ? "max-w-2xl mx-auto" : "grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12"}>
          {/* Left: form area */}
          <div className={isOrderComplete ? "" : "lg:col-span-2"}>
            <div className="bg-white rounded-2xl border border-sand-200 shadow-sm p-6 sm:p-8">
              {currentStep === "shipping" && <ShippingForm />}
              {currentStep === "payment" && <PaymentForm />}
              {currentStep === "review" && <ReviewStep />}
            </div>
          </div>

          {/* Right: order summary sidebar */}
          {!isOrderComplete && (
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
