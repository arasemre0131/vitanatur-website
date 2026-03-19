"use client";

import { useState, type FormEvent } from "react";
import { useCheckoutStore } from "@/store/checkout-store";
import { Button } from "@/components/ui/Button";
import { useLang } from "@/lib/i18n";

const COUNTRIES = [
  { code: "DE", labelKey: "country.de" as const },
  { code: "AT", labelKey: "country.at" as const },
  { code: "CH", labelKey: "country.ch" as const },
];

const inputClass =
  "w-full rounded-lg border border-sand-200 bg-sand-100 px-4 py-3 text-sm text-espresso-700 placeholder:text-espresso-400/60 outline-none transition-all duration-200 focus:border-olive-500 focus:ring-2 focus:ring-olive-500/20";

const labelClass = "block text-sm font-medium text-espresso-600 mb-1.5";

export function ShippingForm() {
  const { formData, updateFormData, setStep } = useCheckoutStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useLang();

  function validate(): boolean {
    const errs: Record<string, string> = {};

    if (!formData.firstName.trim()) errs.firstName = t("validation.firstname");
    if (!formData.lastName.trim()) errs.lastName = t("validation.lastname");
    if (!formData.email.trim()) {
      errs.email = t("validation.email");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = t("validation.email");
    }
    if (!formData.phone.trim()) errs.phone = t("validation.phone");
    if (!formData.street.trim()) errs.street = t("validation.street");
    if (!formData.city.trim()) errs.city = t("validation.city");
    if (!formData.postalCode.trim()) {
      errs.postalCode = t("validation.postal");
    } else if (!/^\d{4,5}$/.test(formData.postalCode.trim())) {
      errs.postalCode = t("validation.postal");
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (validate()) {
      setStep("payment");
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
        {t("checkout.shipping_address")}
      </h2>

      <div className="space-y-5">
        {/* First name / Last name */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className={labelClass}>
              {t("checkout.firstname")}
            </label>
            <input
              id="firstName"
              type="text"
              className={`${inputClass} ${errors.firstName ? "border-brick-500 focus:ring-brick-500/20" : ""}`}
              placeholder="Max"
              value={formData.firstName}
              onChange={(e) => updateFormData({ firstName: e.target.value })}
            />
            {fieldError("firstName")}
          </div>
          <div>
            <label htmlFor="lastName" className={labelClass}>
              {t("checkout.lastname")}
            </label>
            <input
              id="lastName"
              type="text"
              className={`${inputClass} ${errors.lastName ? "border-brick-500 focus:ring-brick-500/20" : ""}`}
              placeholder="Mustermann"
              value={formData.lastName}
              onChange={(e) => updateFormData({ lastName: e.target.value })}
            />
            {fieldError("lastName")}
          </div>
        </div>

        {/* Email / Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className={labelClass}>
              {t("checkout.email")}
            </label>
            <input
              id="email"
              type="email"
              className={`${inputClass} ${errors.email ? "border-brick-500 focus:ring-brick-500/20" : ""}`}
              placeholder="max@beispiel.de"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
            />
            {fieldError("email")}
          </div>
          <div>
            <label htmlFor="phone" className={labelClass}>
              {t("checkout.phone")}
            </label>
            <input
              id="phone"
              type="tel"
              className={`${inputClass} ${errors.phone ? "border-brick-500 focus:ring-brick-500/20" : ""}`}
              placeholder="+49 170 1234567"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
            />
            {fieldError("phone")}
          </div>
        </div>

        {/* Street */}
        <div>
          <label htmlFor="street" className={labelClass}>
            {t("checkout.street")}
          </label>
          <input
            id="street"
            type="text"
            className={`${inputClass} ${errors.street ? "border-brick-500 focus:ring-brick-500/20" : ""}`}
            placeholder="Musterstraße 12"
            value={formData.street}
            onChange={(e) => updateFormData({ street: e.target.value })}
          />
          {fieldError("street")}
        </div>

        {/* City / Postal code */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="city" className={labelClass}>
              {t("checkout.city")}
            </label>
            <input
              id="city"
              type="text"
              className={`${inputClass} ${errors.city ? "border-brick-500 focus:ring-brick-500/20" : ""}`}
              placeholder="Berlin"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
            />
            {fieldError("city")}
          </div>
          <div>
            <label htmlFor="postalCode" className={labelClass}>
              {t("checkout.postal")}
            </label>
            <input
              id="postalCode"
              type="text"
              className={`${inputClass} ${errors.postalCode ? "border-brick-500 focus:ring-brick-500/20" : ""}`}
              placeholder="10115"
              value={formData.postalCode}
              onChange={(e) => updateFormData({ postalCode: e.target.value })}
            />
            {fieldError("postalCode")}
          </div>
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className={labelClass}>
            {t("checkout.country")}
          </label>
          <select
            id="country"
            className={inputClass}
            value={formData.country}
            onChange={(e) => updateFormData({ country: e.target.value })}
          >
            {COUNTRIES.map((c) => (
              <option key={c.code} value={c.code}>
                {t(c.labelKey)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <Button type="submit" size="lg">
          {t("checkout.next_payment")}
        </Button>
      </div>
    </form>
  );
}
