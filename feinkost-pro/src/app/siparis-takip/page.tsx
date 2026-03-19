"use client";

import { useState } from "react";
import {
  Search,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  AlertCircle,
  ChefHat,
  ShieldCheck,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import type { OrderStatus } from "@/types";

interface TrackedOrderItem {
  name: string;
  variantName: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface TrackedOrder {
  id: string;
  status: OrderStatus;
  customerFirstName: string;
  customerLastName: string;
  total: number;
  subtotal: number;
  shippingCost: number;
  createdAt: string;
  items: TrackedOrderItem[];
}

const STATUS_STEPS: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
];

const statusIcons: Record<OrderStatus, typeof Package> = {
  pending: Clock,
  confirmed: ShieldCheck,
  preparing: ChefHat,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

const statusTranslationKeys: Record<OrderStatus, string> = {
  pending: "tracking.status.pending",
  confirmed: "tracking.status.confirmed",
  preparing: "tracking.status.preparing",
  shipped: "tracking.status.shipped",
  delivered: "tracking.status.delivered",
  cancelled: "tracking.status.cancelled",
};

export default function OrderTrackingPage() {
  const { t } = useLang();
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<TrackedOrder | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setOrder(null);
    setLoading(true);
    setSearched(true);

    try {
      const res = await fetch("/api/orders/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: orderId.trim(),
          email: email.trim(),
        }),
      });

      const data = await res.json();

      if (data.success && data.order) {
        setOrder(data.order);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const currentStepIndex = order
    ? STATUS_STEPS.indexOf(order.status)
    : -1;

  const isCancelled = order?.status === "cancelled";

  return (
    <div className="min-h-screen bg-cream-50">
      {/* Header */}
      <div className="bg-espresso-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-olive-500/20 mb-5">
            <Package className="w-7 h-7 text-olive-300" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-cream-100 tracking-wide">
            {t("tracking.title")}
          </h1>
          <p className="mt-3 text-cream-300 text-sm sm:text-base max-w-md mx-auto">
            {t("tracking.order_id")} &amp; {t("tracking.email")}
          </p>
        </div>
      </div>

      {/* Search Form */}
      <div className="max-w-xl mx-auto px-4 sm:px-6 -mt-8">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border border-sand-200 p-6 sm:p-8 space-y-5"
        >
          <div>
            <label className="block text-sm font-medium text-espresso-600 mb-1.5">
              {t("tracking.order_id")}
            </label>
            <input
              type="text"
              required
              value={orderId}
              onChange={(e) => {
                setOrderId(e.target.value);
                setError(false);
              }}
              placeholder="FK-XXXXX"
              className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-3 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-espresso-600 mb-1.5">
              {t("tracking.email")}
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError(false);
              }}
              placeholder="name@example.com"
              className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-3 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg bg-olive-500 text-white font-medium transition-colors hover:bg-olive-600 active:bg-olive-700 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
          >
            <Search className="w-4.5 h-4.5" />
            {loading ? "..." : t("tracking.track")}
          </button>
        </form>
      </div>

      {/* Error State */}
      {error && searched && (
        <div className="max-w-xl mx-auto px-4 sm:px-6 mt-8">
          <div className="bg-white rounded-2xl border border-brick-200 p-8 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-brick-300/10 mb-4">
              <AlertCircle className="w-7 h-7 text-brick-500" />
            </div>
            <h3 className="font-serif text-xl font-bold text-espresso-700 mb-2">
              {t("tracking.not_found")}
            </h3>
            <p className="text-sm text-espresso-400 max-w-sm mx-auto">
              {t("tracking.not_found_desc")}
            </p>
          </div>
        </div>
      )}

      {/* Order Details */}
      {order && (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-8 pb-16 space-y-6">
          {/* Order Info Header */}
          <div className="bg-white rounded-2xl border border-sand-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div>
                <p className="text-sm text-espresso-400 mb-1">
                  {t("tracking.order_id")}
                </p>
                <p className="text-xl font-mono font-bold text-espresso-700">
                  {order.id}
                </p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-sm text-espresso-400 mb-1">
                  {t("tracking.order_date")}
                </p>
                <p className="text-sm font-medium text-espresso-600">
                  {new Date(order.createdAt).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            {isCancelled ? (
              <div className="flex items-center justify-center gap-3 py-8">
                <div className="w-12 h-12 rounded-full bg-brick-300/15 flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-brick-500" />
                </div>
                <span className="text-lg font-semibold text-brick-600">
                  {t(statusTranslationKeys.cancelled as any)}
                </span>
              </div>
            ) : (
              <div className="relative">
                {/* Desktop Timeline */}
                <div className="hidden sm:block">
                  <div className="flex items-start justify-between relative">
                    {/* Background line */}
                    <div className="absolute top-5 left-[10%] right-[10%] h-0.5 bg-sand-200" />
                    {/* Progress line */}
                    {currentStepIndex >= 0 && (
                      <div
                        className="absolute top-5 left-[10%] h-0.5 bg-olive-500 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            (currentStepIndex / (STATUS_STEPS.length - 1)) * 80,
                            80
                          )}%`,
                        }}
                      />
                    )}

                    {STATUS_STEPS.map((step, idx) => {
                      const isCompleted = currentStepIndex >= idx;
                      const isCurrent = currentStepIndex === idx;
                      const Icon = statusIcons[step];

                      return (
                        <div
                          key={step}
                          className="flex flex-col items-center relative z-10"
                          style={{ width: "20%" }}
                        >
                          <div
                            className={[
                              "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300",
                              isCompleted
                                ? isCurrent
                                  ? "bg-olive-500 text-white shadow-md shadow-olive-500/30 ring-4 ring-olive-500/20"
                                  : "bg-olive-500 text-white"
                                : "bg-sand-100 text-espresso-400 border-2 border-sand-200",
                            ].join(" ")}
                          >
                            {isCompleted && !isCurrent ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <Icon className="w-5 h-5" />
                            )}
                          </div>
                          <span
                            className={[
                              "mt-2.5 text-xs font-medium text-center leading-tight",
                              isCompleted
                                ? "text-olive-700"
                                : "text-espresso-400",
                            ].join(" ")}
                          >
                            {t(statusTranslationKeys[step] as any)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Mobile Timeline (Vertical) */}
                <div className="sm:hidden space-y-0">
                  {STATUS_STEPS.map((step, idx) => {
                    const isCompleted = currentStepIndex >= idx;
                    const isCurrent = currentStepIndex === idx;
                    const isLast = idx === STATUS_STEPS.length - 1;
                    const Icon = statusIcons[step];

                    return (
                      <div key={step} className="flex items-start gap-3">
                        <div className="flex flex-col items-center">
                          <div
                            className={[
                              "w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
                              isCompleted
                                ? isCurrent
                                  ? "bg-olive-500 text-white shadow-md shadow-olive-500/30 ring-4 ring-olive-500/20"
                                  : "bg-olive-500 text-white"
                                : "bg-sand-100 text-espresso-400 border-2 border-sand-200",
                            ].join(" ")}
                          >
                            {isCompleted && !isCurrent ? (
                              <CheckCircle2 className="w-4 h-4" />
                            ) : (
                              <Icon className="w-4 h-4" />
                            )}
                          </div>
                          {!isLast && (
                            <div
                              className={[
                                "w-0.5 h-8 my-1",
                                currentStepIndex > idx
                                  ? "bg-olive-500"
                                  : "bg-sand-200",
                              ].join(" ")}
                            />
                          )}
                        </div>
                        <div className="pt-1.5 pb-4">
                          <span
                            className={[
                              "text-sm font-medium",
                              isCompleted
                                ? "text-olive-700"
                                : "text-espresso-400",
                            ].join(" ")}
                          >
                            {t(statusTranslationKeys[step] as any)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-2xl border border-sand-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-sand-200">
              <h3 className="font-serif text-lg font-semibold text-espresso-700">
                {t("tracking.items")}
              </h3>
            </div>
            <div className="divide-y divide-sand-100">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between px-6 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <Package className="w-4 h-4 text-espresso-400/50 flex-shrink-0" />
                    <div>
                      <span className="text-sm text-espresso-600">
                        {item.name}
                      </span>
                      {item.variantName && (
                        <span className="text-xs text-espresso-400 ml-1.5">
                          ({item.variantName})
                        </span>
                      )}
                    </div>
                    {item.quantity > 1 && (
                      <span className="text-xs text-espresso-400 bg-sand-100 px-1.5 py-0.5 rounded">
                        x{item.quantity}
                      </span>
                    )}
                  </div>
                  <span className="text-sm font-medium text-espresso-600 flex-shrink-0">
                    {item.totalPrice.toFixed(2).replace(".", ",")} &euro;
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-sand-200 px-6 py-4 bg-sand-100/30">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-espresso-600">
                  {t("tracking.total")}
                </span>
                <span className="text-lg font-bold text-espresso-700">
                  {order.total.toFixed(2).replace(".", ",")} &euro;
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
