"use client";

import { useCheckoutStore } from "@/store/checkout-store";
import { ShippingForm } from "@/components/checkout/ShippingForm";
import { PaymentForm } from "@/components/checkout/PaymentForm";
import { ReviewStep } from "@/components/checkout/ReviewStep";
import { OrderSummary } from "@/components/checkout/OrderSummary";
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

export default function CheckoutPage() {
  const { currentStep, paymentResult } = useCheckoutStore();
  const activeIndex = stepIndex(currentStep);
  const isOrderComplete = paymentResult?.success;
  const { t } = useLang();

  const steps = [
    { key: "shipping" as CheckoutStep, label: t("checkout.shipping") },
    { key: "payment" as CheckoutStep, label: t("checkout.payment") },
    { key: "review" as CheckoutStep, label: t("checkout.review") },
  ];

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
