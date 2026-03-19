"use client";

import { useState } from "react";
import {
  ShoppingBag,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronUp,
  Package,
  Check,
  AlertCircle,
} from "lucide-react";
import { useLang } from "@/lib/i18n";
import { useAdminStore } from "@/store/admin-store";
import type { OrderStatus } from "@/types";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  customer: string;
  total: number;
  status: OrderStatus;
  items: OrderItem[];
}

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-700",
  preparing: "bg-orange-100 text-orange-700",
  shipped: "bg-olive-500/15 text-olive-700",
  delivered: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-brick-300/15 text-brick-600",
};

const statusTranslationKeys: Record<OrderStatus, string> = {
  pending: "admin.status_pending",
  confirmed: "admin.status_confirmed",
  preparing: "admin.status_preparing",
  shipped: "admin.status_shipped",
  delivered: "admin.status_delivered",
  cancelled: "admin.status_cancelled",
};

const ALL_STATUSES: OrderStatus[] = [
  "pending",
  "confirmed",
  "preparing",
  "shipped",
  "delivered",
  "cancelled",
];

const initialOrders: Order[] = [
  {
    id: "FK-10421",
    date: "16.03.2026",
    customer: "Maria Schmidt",
    total: 34.5,
    status: "pending",
    items: [
      { name: "Sumak", quantity: 2, price: 6.0 },
      { name: "Antep Pistazien", quantity: 1, price: 14.5 },
      { name: "Granatapfelsirup", quantity: 1, price: 8.0 },
    ],
  },
  {
    id: "FK-10420",
    date: "16.03.2026",
    customer: "Thomas Weber",
    total: 28.0,
    status: "pending",
    items: [
      { name: "Olivenöl Extra Vergine", quantity: 1, price: 18.0 },
      { name: "Isot Biber", quantity: 2, price: 5.0 },
    ],
  },
  {
    id: "FK-10419",
    date: "16.03.2026",
    customer: "Anna Fischer",
    total: 25.0,
    status: "preparing",
    items: [
      { name: "Kaymak", quantity: 2, price: 7.5 },
      { name: "Schwarzer Tee", quantity: 1, price: 10.0 },
    ],
  },
  {
    id: "FK-10418",
    date: "15.03.2026",
    customer: "Lukas Bauer",
    total: 52.8,
    status: "confirmed",
    items: [
      { name: "Dattelsirup", quantity: 1, price: 9.0 },
      { name: "Walnusskerne", quantity: 2, price: 12.9 },
      { name: "Safran", quantity: 1, price: 18.0 },
    ],
  },
  {
    id: "FK-10417",
    date: "15.03.2026",
    customer: "Sophie Müller",
    total: 19.0,
    status: "shipped",
    items: [
      { name: "Pul Biber", quantity: 1, price: 4.5 },
      { name: "Getrocknete Feigen", quantity: 1, price: 8.5 },
      { name: "Sumak", quantity: 1, price: 6.0 },
    ],
  },
  {
    id: "FK-10416",
    date: "14.03.2026",
    customer: "Markus Klein",
    total: 41.0,
    status: "shipped",
    items: [
      { name: "Olivenöl Extra Vergine", quantity: 1, price: 18.0 },
      { name: "Tahin", quantity: 1, price: 8.5 },
      { name: "Antep Pistazien", quantity: 1, price: 14.5 },
    ],
  },
  {
    id: "FK-10415",
    date: "14.03.2026",
    customer: "Julia Wagner",
    total: 33.5,
    status: "delivered",
    items: [
      { name: "Haselnüsse", quantity: 2, price: 9.5 },
      { name: "Granatapfelsirup", quantity: 1, price: 8.0 },
      { name: "Knoblauchpulver", quantity: 1, price: 6.5 },
    ],
  },
  {
    id: "FK-10414",
    date: "13.03.2026",
    customer: "Jan Hofmann",
    total: 27.0,
    status: "delivered",
    items: [
      { name: "Schwarzer Tee", quantity: 1, price: 10.0 },
      { name: "Kaymak", quantity: 1, price: 7.5 },
      { name: "Getrocknete Aprikosen", quantity: 1, price: 9.5 },
    ],
  },
  {
    id: "FK-10413",
    date: "12.03.2026",
    customer: "Lisa Schröder",
    total: 64.2,
    status: "delivered",
    items: [
      { name: "Safran", quantity: 2, price: 18.0 },
      { name: "Schwarzkümmelöl", quantity: 1, price: 15.0 },
      { name: "Isot Biber", quantity: 1, price: 5.0 },
      { name: "Pul Biber", quantity: 1, price: 4.5 },
      { name: "Sumak", quantity: 1, price: 3.7 },
    ],
  },
  {
    id: "FK-10412",
    date: "11.03.2026",
    customer: "David Braun",
    total: 22.5,
    status: "delivered",
    items: [
      { name: "Dattelsirup", quantity: 1, price: 9.0 },
      { name: "Tahin", quantity: 1, price: 8.5 },
      { name: "Pul Biber", quantity: 1, price: 5.0 },
    ],
  },
];

const stats = [
  {
    labelKey: "admin.today" as const,
    orders: 3,
    revenue: 87.5,
    icon: ShoppingBag,
    color: "bg-olive-500/10 text-olive-600",
  },
  {
    labelKey: "admin.this_week" as const,
    orders: 12,
    revenue: 342.8,
    icon: TrendingUp,
    color: "bg-brick-300/15 text-brick-600",
  },
  {
    labelKey: "admin.this_month" as const,
    orders: 48,
    revenue: 1456.2,
    icon: Calendar,
    color: "bg-espresso-400/10 text-espresso-500",
  },
];

export function SalesTracker() {
  const { t } = useLang();
  const { token } = useAdminStore();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [updatingOrder, setUpdatingOrder] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<{
    orderId: string;
    type: "success" | "error";
  } | null>(null);

  const toggleOrder = (id: string) => {
    setExpandedOrder((prev) => (prev === id ? null : id));
  };

  const handleStatusChange = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    setUpdatingOrder(orderId);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/orders/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      const data = await res.json();

      if (data.success) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId ? { ...o, status: newStatus } : o
          )
        );
        setStatusMessage({ orderId, type: "success" });
      } else {
        setStatusMessage({ orderId, type: "error" });
      }
    } catch {
      setStatusMessage({ orderId, type: "error" });
    } finally {
      setUpdatingOrder(null);
      // Clear the message after 2 seconds
      setTimeout(() => setStatusMessage(null), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.labelKey}
            className="bg-white rounded-xl border border-sand-200 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}
              >
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-sm font-medium text-espresso-400">
                {t(stat.labelKey)}
              </span>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-espresso-700">
                {stat.revenue.toFixed(2).replace(".", ",")} &euro;
              </p>
              <p className="text-sm text-espresso-400">
                {stat.orders} {t("admin.orders")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-sand-200">
          <h3 className="font-serif text-lg font-semibold text-espresso-700">
            {t("admin.recent_orders")}
          </h3>
        </div>

        {/* Table Header - Desktop */}
        <div className="hidden md:grid grid-cols-[120px_1fr_120px_100px_200px] gap-4 px-5 py-3 bg-sand-100/60 border-b border-sand-100 text-xs font-semibold text-espresso-400 uppercase tracking-wider">
          <span>{t("admin.order_id")}</span>
          <span>{t("admin.customer")}</span>
          <span>{t("admin.date")}</span>
          <span className="text-right">{t("admin.total")}</span>
          <span className="text-center">{t("admin.status")}</span>
        </div>

        <div className="divide-y divide-sand-100">
          {orders.map((order) => {
            const isExpanded = expandedOrder === order.id;
            const isUpdating = updatingOrder === order.id;
            const message =
              statusMessage?.orderId === order.id ? statusMessage : null;

            return (
              <div key={order.id}>
                <div className="w-full text-left px-5 py-3.5 hover:bg-cream-50/60 transition-colors">
                  {/* Desktop Row */}
                  <div className="hidden md:grid grid-cols-[120px_1fr_120px_100px_200px] gap-4 items-center">
                    <button
                      type="button"
                      onClick={() => toggleOrder(order.id)}
                      className="text-sm font-mono font-medium text-espresso-600 text-left hover:text-olive-600 transition-colors"
                    >
                      {order.id}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleOrder(order.id)}
                      className="text-sm text-espresso-600 text-left"
                    >
                      {order.customer}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleOrder(order.id)}
                      className="text-sm text-espresso-400 text-left"
                    >
                      {order.date}
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleOrder(order.id)}
                      className="text-sm font-semibold text-espresso-700 text-right"
                    >
                      {order.total.toFixed(2).replace(".", ",")} &euro;
                    </button>
                    <div className="flex items-center justify-center gap-2">
                      <select
                        value={order.status}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        className={[
                          "appearance-none text-xs font-medium rounded-full px-3 py-1.5 pr-7 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-olive-400/40 transition-colors disabled:opacity-60",
                          statusColors[order.status],
                        ].join(" ")}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 8px center",
                        }}
                      >
                        {ALL_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {t(statusTranslationKeys[s] as any)}
                          </option>
                        ))}
                      </select>
                      {message && (
                        <span className="flex-shrink-0">
                          {message.type === "success" ? (
                            <Check className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-brick-500" />
                          )}
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => toggleOrder(order.id)}
                        className="flex-shrink-0"
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-espresso-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-espresso-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Mobile Row */}
                  <div className="md:hidden">
                    <button
                      type="button"
                      onClick={() => toggleOrder(order.id)}
                      className="w-full flex items-center justify-between"
                    >
                      <div className="space-y-1 text-left">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-medium text-espresso-600">
                            {order.id}
                          </span>
                          <span
                            className={`inline-block px-2 py-0.5 text-xs font-medium rounded-full ${statusColors[order.status]}`}
                          >
                            {t(statusTranslationKeys[order.status] as any)}
                          </span>
                        </div>
                        <p className="text-sm text-espresso-500">
                          {order.customer}
                        </p>
                        <p className="text-xs text-espresso-400">
                          {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-espresso-700">
                          {order.total.toFixed(2).replace(".", ",")} &euro;
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-espresso-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-espresso-400" />
                        )}
                      </div>
                    </button>

                    {/* Mobile Status Dropdown */}
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-xs text-espresso-400">
                        {t("admin.change_status" as any)}:
                      </span>
                      <select
                        value={order.status}
                        disabled={isUpdating}
                        onChange={(e) =>
                          handleStatusChange(
                            order.id,
                            e.target.value as OrderStatus
                          )
                        }
                        className={[
                          "appearance-none text-xs font-medium rounded-full px-3 py-1 pr-6 border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-olive-400/40 transition-colors disabled:opacity-60",
                          statusColors[order.status],
                        ].join(" ")}
                        style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "right 6px center",
                        }}
                      >
                        {ALL_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {t(statusTranslationKeys[s] as any)}
                          </option>
                        ))}
                      </select>
                      {message && (
                        <span className="flex-shrink-0">
                          {message.type === "success" ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-brick-500" />
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Items */}
                {isExpanded && (
                  <div className="px-5 pb-4 pt-1 bg-cream-50/40">
                    <div className="rounded-lg border border-sand-200 bg-white overflow-hidden">
                      <div className="px-4 py-2.5 bg-sand-100/50 border-b border-sand-100">
                        <span className="text-xs font-semibold text-espresso-400 uppercase tracking-wider">
                          {t("admin.ordered_items")}
                        </span>
                      </div>
                      <div className="divide-y divide-sand-100">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between px-4 py-2.5"
                          >
                            <div className="flex items-center gap-2.5">
                              <Package className="w-4 h-4 text-espresso-400/60" />
                              <span className="text-sm text-espresso-600">
                                {item.name}
                              </span>
                              {item.quantity > 1 && (
                                <span className="text-xs text-espresso-400 bg-sand-100 px-1.5 py-0.5 rounded">
                                  x{item.quantity}
                                </span>
                              )}
                            </div>
                            <span className="text-sm font-medium text-espresso-600">
                              {(item.price * item.quantity)
                                .toFixed(2)
                                .replace(".", ",")}{" "}
                              &euro;
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
