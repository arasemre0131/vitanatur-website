"use client";

import { useState, useMemo } from "react";
import {
  LogOut,
  Package,
  ShieldCheck,
  AlertCircle,
  Search,
  Plus,
  BarChart3,
  Boxes,
  Tag,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import { Button } from "@/components/ui/Button";
import { AdminProductCard } from "@/components/admin/AdminProductCard";
import { ProductForm } from "@/components/admin/ProductForm";
import { SalesTracker } from "@/components/admin/SalesTracker";
import { StockManager } from "@/components/admin/StockManager";
import { CouponManager } from "@/components/admin/CouponManager";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { useLang } from "@/lib/i18n";
import { Product, CategorySlug } from "@/types";

type AdminTab = "products" | "sales" | "stock" | "coupons" | "settings";

const categoryFilterDefs: { slug: CategorySlug | "all"; labelKey: string }[] = [
  { slug: "all", labelKey: "admin.all" },
  { slug: "gewuerze", labelKey: "cat.gewuerze" },
  { slug: "trockenfruechte", labelKey: "cat.trockenfruechte" },
  { slug: "fruehstueck", labelKey: "cat.fruehstueck" },
  { slug: "oele", labelKey: "cat.oele" },
  { slug: "nuesse", labelKey: "cat.nuesse" },
  { slug: "spezialitaeten", labelKey: "cat.spezialitaeten" },
  { slug: "kahveler", labelKey: "cat.kahveler" },
  { slug: "caylar", labelKey: "cat.caylar" },
  { slug: "salcalar", labelKey: "cat.salcalar" },
  { slug: "zuehre-ana", labelKey: "cat.zuehre-ana" },
];

export default function AdminPage() {
  const { isAuthenticated, products, login, logout, lastError, clearError } = useAdminStore();
  const { t } = useLang();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategorySlug | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(username, password);
    if (!ok) {
      setError(true);
    } else {
      setError(false);
      setUsername("");
      setPassword("");
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products;
    if (categoryFilter !== "all") {
      result = result.filter((p) => p.category === categoryFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.nameTr && p.nameTr.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, categoryFilter, searchQuery]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: products.length };
    for (const p of products) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
    return counts;
  }, [products]);

  const tabs: { key: AdminTab; label: string; icon: React.ReactNode }[] = [
    { key: "products", label: t("admin.products"), icon: <Package className="w-4 h-4" /> },
    { key: "sales", label: t("admin.sales"), icon: <BarChart3 className="w-4 h-4" /> },
    { key: "stock", label: t("admin.stock"), icon: <Boxes className="w-4 h-4" /> },
    { key: "coupons", label: t("admin.coupons"), icon: <Tag className="w-4 h-4" /> },
    { key: "settings", label: t("admin.settings"), icon: <Settings className="w-4 h-4" /> },
  ];

  /* ---------- Login Screen ---------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-espresso-700">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-2xl shadow-2xl border border-sand-200 p-8 space-y-6"
          >
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-olive-500/10 mb-3">
                <ShieldCheck className="w-7 h-7 text-olive-600" />
              </div>
              <h1 className="font-serif text-2xl font-bold tracking-wide text-espresso-700">
                VITANATUR
              </h1>
              <p className="text-sm text-espresso-400">{t("admin.title")}</p>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-brick-600 text-sm bg-brick-300/10 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{t("admin.login_error")}</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                  {t("admin.username")}
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); setError(false); }}
                  className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors"
                  placeholder={t("admin.username")}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                  {t("admin.password")}
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  className="w-full bg-sand-100 border border-sand-200 rounded-lg px-4 py-2.5 text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors"
                  placeholder={t("admin.password")}
                />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full">
              {t("admin.login")}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  /* ---------- Dashboard ---------- */
  return (
    <div className="min-h-screen bg-cream-50 flex">
      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-espresso-700/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-espresso-700 flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-espresso-500/30">
          <div className="flex items-center gap-2.5">
            <Package className="w-5 h-5 text-olive-300" />
            <span className="font-serif text-lg font-bold text-cream-100 tracking-wide">
              VITANATUR
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-cream-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => {
                setActiveTab(tab.key);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                activeTab === tab.key
                  ? "bg-olive-500 text-white shadow-sm"
                  : "text-cream-300 hover:bg-espresso-600 hover:text-cream-100"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-3 py-4 border-t border-espresso-500/30">
          <button
            type="button"
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-cream-400 hover:bg-espresso-600 hover:text-white transition-all"
          >
            <LogOut className="w-4 h-4" />
            {t("admin.logout")}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="flex items-center gap-3 bg-white border-b border-sand-200 px-4 sm:px-6 py-3 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 text-espresso-500 hover:text-espresso-700 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-serif text-lg font-bold text-espresso-700">
            {tabs.find((t) => t.key === activeTab)?.label}
          </h1>
        </header>

        {/* Error Banner */}
        {lastError && (
          <div className="mx-4 sm:mx-6 mt-4 flex items-center gap-3 bg-brick-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-medium flex-1">{lastError}</span>
            <button type="button" onClick={clearError} className="text-white/70 hover:text-white text-lg leading-none">&times;</button>
          </div>
        )}

        {/* Tab Content */}
        <main className="flex-1 p-5 sm:p-6 lg:p-8">
          {/* ── Products Tab ── */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-espresso-700">
                    {t("admin.products_title")}
                  </h2>
                  <p className="text-sm text-espresso-400 mt-0.5">
                    {products.length} {t("admin.products_count")}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-olive-500 text-white text-sm font-medium transition-colors hover:bg-olive-600 active:bg-olive-700 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  {t("admin.new_product")}
                </button>
              </div>

              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("admin.search")}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-sand-200 rounded-lg text-sm text-espresso-700 placeholder:text-espresso-400/50 focus:outline-none focus:ring-2 focus:ring-olive-400/40 focus:border-olive-400 transition-colors"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {categoryFilterDefs.map((cat) => {
                  const count = categoryCounts[cat.slug] ?? 0;
                  const isActive = categoryFilter === cat.slug;
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      onClick={() => setCategoryFilter(cat.slug)}
                      className={[
                        "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-olive-500 text-white shadow-sm"
                          : "bg-white text-espresso-500 border border-sand-200 hover:border-olive-300 hover:text-olive-700",
                      ].join(" ")}
                    >
                      {t(cat.labelKey as any)}
                      <span
                        className={[
                          "text-xs px-1.5 py-0.5 rounded-full",
                          isActive ? "bg-white/20 text-white" : "bg-sand-100 text-espresso-400",
                        ].join(" ")}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-sand-300 mx-auto mb-3" />
                  <p className="text-espresso-400">
                    {searchQuery || categoryFilter !== "all" ? t("admin.no_products") : t("admin.no_products_yet")}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product) => (
                    <AdminProductCard
                      key={product.id}
                      product={product}
                      onEdit={(p) => { setEditingProduct(p); setShowProductForm(true); }}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── Sales Tab ── */}
          {activeTab === "sales" && <SalesTracker />}

          {/* ── Stock Tab ── */}
          {activeTab === "stock" && <StockManager />}

          {/* ── Coupons Tab ── */}
          {activeTab === "coupons" && <CouponManager />}

          {/* ── Settings Tab ── */}
          {activeTab === "settings" && <AdminSettings />}
        </main>
      </div>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => { setShowProductForm(false); setEditingProduct(null); }}
        />
      )}
    </div>
  );
}
