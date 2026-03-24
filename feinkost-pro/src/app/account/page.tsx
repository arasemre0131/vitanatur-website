"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useCustomerAuth } from "@/store/auth-store";
import { supabaseBrowser } from "@/lib/supabase-browser";
import {
  User,
  LogOut,
  Package,
  Clock,
  ShieldCheck,
  ChefHat,
  Truck,
  CheckCircle2,
  XCircle,
  Mail,
  MapPin,
} from "lucide-react";
import type { OrderStatus } from "@/types";

/* ── Types ── */

interface Order {
  id: string;
  customer_email: string;
  customer_first_name: string;
  customer_last_name: string;
  status: OrderStatus;
  total: number;
  created_at: string;
  shipping_street: string;
  shipping_city: string;
  shipping_postal_code: string;
}

/* ── Status helpers ── */

const statusIcons: Record<OrderStatus, typeof Package> = {
  pending: Clock,
  confirmed: ShieldCheck,
  preparing: ChefHat,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-amber-100 text-amber-800",
  confirmed: "bg-blue-100 text-blue-800",
  preparing: "bg-orange-100 text-orange-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-olive-100 text-olive-800",
  cancelled: "bg-red-100 text-red-800",
};

const statusTranslationKeys: Record<OrderStatus, string> = {
  pending: "tracking.status.pending",
  confirmed: "tracking.status.confirmed",
  preparing: "tracking.status.preparing",
  shipped: "tracking.status.shipped",
  delivered: "tracking.status.delivered",
  cancelled: "tracking.status.cancelled",
};

/* ── Auth Form ── */

function AuthForm() {
  const { t } = useLang();
  const { signIn, signUp } = useCustomerAuth();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSubmitting(true);

    if (mode === "login") {
      const result = await signIn(email, password);
      if (result.error) {
        setError(t("account.login_error"));
      }
    } else {
      if (!name.trim()) {
        setError(t("account.name") + " is required");
        setSubmitting(false);
        return;
      }
      const result = await signUp(email, password, name);
      if (result.error) {
        setError(t("account.register_error"));
      } else {
        setSuccess(t("account.register_success"));
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-sand-200 p-8">
        <div className="flex items-center justify-center w-16 h-16 bg-olive-50 rounded-full mx-auto mb-6">
          <User className="w-8 h-8 text-olive-600" />
        </div>

        <h2 className="font-serif text-2xl text-espresso-600 text-center mb-2">
          {mode === "login" ? t("account.login") : t("account.register")}
        </h2>
        <p className="text-sm text-sand-500 text-center mb-6">
          {t("account.login_subtitle")}
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-olive-50 border border-olive-200 rounded-lg p-3 mb-4 text-sm text-olive-700">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "register" && (
            <div>
              <label
                htmlFor="auth-name"
                className="block text-sm font-medium text-espresso-600 mb-1.5"
              >
                {t("account.name")}
              </label>
              <input
                id="auth-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2.5 text-espresso-600 placeholder:text-sand-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-200 outline-none transition-colors"
                placeholder={t("account.name")}
              />
            </div>
          )}

          <div>
            <label
              htmlFor="auth-email"
              className="block text-sm font-medium text-espresso-600 mb-1.5"
            >
              {t("account.email")}
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2.5 text-espresso-600 placeholder:text-sand-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-200 outline-none transition-colors"
              placeholder={t("account.email")}
            />
          </div>

          <div>
            <label
              htmlFor="auth-password"
              className="block text-sm font-medium text-espresso-600 mb-1.5"
            >
              {t("account.password")}
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full rounded-lg border border-sand-300 bg-cream-50 px-4 py-2.5 text-espresso-600 placeholder:text-sand-400 focus:border-olive-400 focus:ring-2 focus:ring-olive-200 outline-none transition-colors"
              placeholder={t("account.password")}
            />
            {mode === "register" && (
              <p className="text-xs text-sand-400 mt-1">
                {t("account.password_min")}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-olive-600 hover:bg-olive-700 disabled:bg-olive-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors"
          >
            {submitting
              ? "..."
              : mode === "login"
                ? t("account.login")
                : t("account.register")}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-sand-500">
          {mode === "login" ? (
            <p>
              {t("account.no_account")}{" "}
              <button
                onClick={() => {
                  setMode("register");
                  setError("");
                  setSuccess("");
                }}
                className="text-olive-600 hover:text-olive-700 font-medium underline"
              >
                {t("account.register")}
              </button>
            </p>
          ) : (
            <p>
              {t("account.have_account")}{" "}
              <button
                onClick={() => {
                  setMode("login");
                  setError("");
                  setSuccess("");
                }}
                className="text-olive-600 hover:text-olive-700 font-medium underline"
              >
                {t("account.login")}
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Order Card ── */

function OrderCard({ order }: { order: Order }) {
  const { t } = useLang();
  const Icon = statusIcons[order.status] || Package;
  const colorClass = statusColors[order.status] || "bg-sand-100 text-sand-800";
  const statusKey = statusTranslationKeys[order.status];

  const formattedDate = new Date(order.created_at).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-xl border border-sand-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 bg-cream-50 border-b border-sand-100">
        <div className="flex items-center gap-3">
          <Package className="w-4 h-4 text-sand-400" />
          <span className="text-sm font-medium text-espresso-600">
            {t("account.order_id")} {order.id.slice(0, 8).toUpperCase()}
          </span>
        </div>
        <span
          className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${colorClass}`}
        >
          <Icon className="w-3.5 h-3.5" />
          {t(statusKey as any)}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <span className="text-sand-400">{t("account.order_date")}:</span>{" "}
            <span className="text-espresso-600">{formattedDate}</span>
          </div>
          <div>
            <span className="text-sand-400">{t("account.order_total")}:</span>{" "}
            <span className="text-espresso-600 font-semibold">
              {order.total.toFixed(2)} &euro;
            </span>
          </div>
        </div>

        {/* Shipping address */}
        {order.shipping_street && (
          <div className="flex items-start gap-2 text-sm text-sand-500">
            <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-sand-400" />
            <span>
              {order.shipping_street}, {order.shipping_postal_code}{" "}
              {order.shipping_city}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Account Page ── */

export default function AccountPage() {
  const { t } = useLang();
  const { user, loading: authLoading, signOut, initialize } = useCustomerAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  // Initialize auth on mount
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Fetch orders when user is logged in
  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setOrdersLoading(true);
      try {
        const { data, error } = await supabaseBrowser
          .from("orders")
          .select(
            "id, customer_email, customer_first_name, customer_last_name, status, total, created_at, shipping_street, shipping_city, shipping_postal_code"
          )
          .eq("customer_email", user.email!)
          .order("created_at", { ascending: false });

        if (!error && data) {
          setOrders(data as Order[]);
        }
      } catch {
        // silently fail
      }
      setOrdersLoading(false);
    };

    fetchOrders();
  }, [user?.email]);

  const displayName =
    user?.user_metadata?.display_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-sand-400 mb-8">
        <Link href="/" className="hover:text-olive-500 transition-colors">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-espresso-600">{t("account.title")}</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl text-espresso-600 mb-8">
        {t("account.title")}
      </h1>

      {/* Loading state */}
      {authLoading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-3 border-olive-200 border-t-olive-600 rounded-full animate-spin" />
        </div>
      )}

      {/* Not logged in */}
      {!authLoading && !user && <AuthForm />}

      {/* Logged in */}
      {!authLoading && user && (
        <div className="space-y-10">
          {/* Profile Card */}
          <section className="bg-white rounded-2xl shadow-sm border border-sand-200 p-6 sm:p-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 bg-olive-100 rounded-full">
                  <User className="w-7 h-7 text-olive-600" />
                </div>
                <div>
                  <h2 className="font-serif text-xl text-espresso-600">
                    {t("account.welcome")}, {displayName}
                  </h2>
                  <div className="flex items-center gap-1.5 text-sm text-sand-500 mt-0.5">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </div>
                </div>
              </div>

              <button
                onClick={signOut}
                className="inline-flex items-center gap-2 text-sm font-medium text-sand-500 hover:text-red-600 border border-sand-200 hover:border-red-200 rounded-lg px-4 py-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                {t("account.logout")}
              </button>
            </div>
          </section>

          {/* Orders Section */}
          <section>
            <h2 className="font-serif text-2xl text-espresso-600 mb-5 flex items-center gap-2">
              <Package className="w-6 h-6 text-olive-500" />
              {t("account.orders")}
            </h2>

            {ordersLoading && (
              <div className="bg-white rounded-xl border border-sand-200 p-8 text-center">
                <div className="w-6 h-6 border-2 border-olive-200 border-t-olive-600 rounded-full animate-spin mx-auto mb-3" />
                <p className="text-sm text-sand-500">
                  {t("account.loading_orders")}
                </p>
              </div>
            )}

            {!ordersLoading && orders.length === 0 && (
              <div className="bg-white rounded-xl border border-sand-200 p-10 text-center">
                <Package className="w-12 h-12 text-sand-300 mx-auto mb-3" />
                <p className="text-sand-500">{t("account.no_orders")}</p>
              </div>
            )}

            {!ordersLoading && orders.length > 0 && (
              <div className="space-y-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </div>
            )}
          </section>
        </div>
      )}
    </div>
  );
}
