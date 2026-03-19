"use client";

import Image from "next/image";
import { useCartStore } from "@/store/cart-store";
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
  const { t, lang } = useLang();

  const subtotal = totalPrice();
  const shippingCost = subtotal >= 49 ? 0 : 4.9;
  const total = subtotal + shippingCost;

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
            {shippingCost > 0 && subtotal < 49 && (
              <p className="text-xs text-olive-500">
                {t("checkout.free_shipping_remaining").replace("{amount}", formatPrice(49 - subtotal))}
              </p>
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
