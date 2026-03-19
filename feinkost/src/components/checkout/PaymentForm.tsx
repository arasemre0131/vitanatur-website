"use client";

import { useState, type FormEvent } from "react";
import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/i18n";

type PaymentMethod = "card" | "paypal" | "sofort";

interface MethodOption {
  value: PaymentMethod;
  labelKey: string;
  icon: React.ReactNode;
}

function CreditCardIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  );
}

function BankIcon() {
  return (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  );
}

const METHODS: MethodOption[] = [
  {
    value: "card",
    labelKey: "checkout.card",
    icon: <CreditCardIcon />,
  },
  {
    value: "paypal",
    labelKey: "paypal",
    icon: (
      <span className="text-sm font-bold tracking-tight text-[#003087]">
        Pay<span className="text-[#009cde]">Pal</span>
      </span>
    ),
  },
  {
    value: "sofort",
    labelKey: "sofort",
    icon: <BankIcon />,
  },
];

function formatCardNumber(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length >= 3) {
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }
  return digits;
}

const inputClass =
  "w-full rounded-lg border border-sand-200 bg-sand-100 px-4 py-3 text-sm text-espresso-700 placeholder:text-espresso-400/60 outline-none transition-all duration-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20";

const labelClass = "block text-sm font-medium text-espresso-600 mb-1.5";

export function PaymentForm() {
  const { formData, updateFormData, setStep } = useCheckoutStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLang();

  function getMethodLabel(method: MethodOption): string {
    if (method.labelKey === "paypal") return t("payment.paypal");
    if (method.labelKey === "sofort") return t("payment.sofort");
    return t(method.labelKey as Parameters<typeof t>[0]);
  }

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (formData.paymentMethod === "card") {
      const cleanNumber = (formData.cardNumber ?? "").replace(/\s/g, "");
      if (!cleanNumber || cleanNumber.length < 13) {
        errs.cardNumber = t("validation.card");
      }
      if (!formData.cardExpiry || !/^\d{2}\/\d{2}$/.test(formData.cardExpiry)) {
        errs.cardExpiry = t("validation.expiry");
      }
      if (!formData.cardCvc || !/^\d{3,4}$/.test(formData.cardCvc)) {
        errs.cardCvc = t("validation.cvc");
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      setStep("review");
    }
  }

  function fieldError(field: string) {
    return errors[field] ? (
      <p className="text-xs text-brick-500 mt-1">{errors[field]}</p>
    ) : null;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2 className="font-serif text-2xl font-semibold text-espresso-700 mb-6">
        {t("checkout.payment_method")}
      </h2>

      {/* Payment method selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        {METHODS.map((method) => {
          const isActive = formData.paymentMethod === method.value;
          return (
            <button
              key={method.value}
              type="button"
              onClick={() => updateFormData({ paymentMethod: method.value })}
              className={[
                "flex flex-col items-center justify-center gap-2 rounded-xl border-2 p-5 transition-all duration-200 cursor-pointer",
                isActive
                  ? "border-olive-500 bg-olive-500/5 shadow-sm"
                  : "border-sand-200 bg-white hover:border-sand-300 hover:bg-sand-100/50",
              ].join(" ")}
            >
              <span className={isActive ? "text-olive-600" : "text-espresso-400"}>
                {method.icon}
              </span>
              <span
                className={`text-sm font-medium ${isActive ? "text-olive-700" : "text-espresso-500"}`}
              >
                {getMethodLabel(method)}
              </span>
              {/* Radio dot */}
              <span
                className={[
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors",
                  isActive ? "border-olive-500" : "border-sand-300",
                ].join(" ")}
              >
                {isActive && <span className="w-2 h-2 rounded-full bg-olive-500" />}
              </span>
            </button>
          );
        })}
      </div>

      {/* Credit card fields */}
      {formData.paymentMethod === "card" && (
        <div className="space-y-5 mb-8 p-5 rounded-xl border border-sand-200 bg-sand-100/30">
          <div>
            <label htmlFor="cardNumber" className={labelClass}>
              {t("checkout.card_number")}
            </label>
            <input
              id="cardNumber"
              type="text"
              inputMode="numeric"
              className={`${inputClass} font-mono tracking-wider ${errors.cardNumber ? "border-brick-500" : ""}`}
              placeholder="4242 4242 4242 4242"
              value={formData.cardNumber ?? ""}
              onChange={(e) =>
                updateFormData({ cardNumber: formatCardNumber(e.target.value) })
              }
            />
            {fieldError("cardNumber")}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="cardExpiry" className={labelClass}>
                {t("checkout.expiry")}
              </label>
              <input
                id="cardExpiry"
                type="text"
                inputMode="numeric"
                className={`${inputClass} font-mono ${errors.cardExpiry ? "border-brick-500" : ""}`}
                placeholder="MM/JJ"
                value={formData.cardExpiry ?? ""}
                onChange={(e) =>
                  updateFormData({ cardExpiry: formatExpiry(e.target.value) })
                }
              />
              {fieldError("cardExpiry")}
            </div>
            <div>
              <label htmlFor="cardCvc" className={labelClass}>
                CVC
              </label>
              <input
                id="cardCvc"
                type="text"
                inputMode="numeric"
                maxLength={4}
                className={`${inputClass} font-mono ${errors.cardCvc ? "border-brick-500" : ""}`}
                placeholder="123"
                value={formData.cardCvc ?? ""}
                onChange={(e) =>
                  updateFormData({ cardCvc: e.target.value.replace(/\D/g, "").slice(0, 4) })
                }
              />
              {fieldError("cardCvc")}
            </div>
          </div>
        </div>
      )}

      {formData.paymentMethod === "paypal" && (
        <div className="mb-8 p-5 rounded-xl border border-sand-200 bg-sand-100/30 text-center">
          <p className="text-sm text-espresso-500">
            {t("checkout.paypal_redirect")}
          </p>
        </div>
      )}

      {formData.paymentMethod === "sofort" && (
        <div className="mb-8 p-5 rounded-xl border border-sand-200 bg-sand-100/30 text-center">
          <p className="text-sm text-espresso-500">
            {t("checkout.bank_redirect")}
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
        <Button type="submit" size="lg">
          {t("checkout.review_order")}
        </Button>
      </div>
    </form>
  );
}
