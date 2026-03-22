"use client";

import { useState, useMemo } from "react";
import {
  LogOut,
  Package,
  ShieldCheck,
  AlertCircle,
  Search,
  Plus,
} from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import { Button } from "@/components/ui/Button";
import { AdminProductCard } from "@/components/admin/AdminProductCard";
import { ProductForm } from "@/components/admin/ProductForm";
import { useLang } from "@/lib/i18n";
import { Product, CategorySlug } from "@/types";

const categoryFilterDefs: { slug: CategorySlug | "all"; labelKey: string }[] = [
  { slug: "all", labelKey: "admin.all" },
  { slug: "gewuerze", labelKey: "cat.gewuerze" },
  { slug: "trockenfruechte", labelKey: "cat.trockenfruechte" },
  { slug: "fruehstueck", labelKey: "cat.fruehstueck" },
  { slug: "oele", labelKey: "cat.oele" },
  { slug: "nuesse", labelKey: "cat.nuesse" },
  { slug: "spezialitaeten", labelKey: "cat.spezialitaeten" },
];

export default function AdminPage() {
  const { isAuthenticated, products, login, logout } = useAdminStore();
  const { t } = useLang();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CategorySlug | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

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

  /* ---------- Login Screen ---------- */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-espresso-700">
        <div className="w-full max-w-sm">
          <form
            onSubmit={handleLogin}
            className="bg-white rounded-2xl shadow-2xl border border-sand-200 p-8 space-y-6"
          >
            {/* Logo */}
            <div className="text-center space-y-1">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-olive-500/10 mb-3">
                <ShieldCheck className="w-7 h-7 text-olive-600" />
              </div>
              <h1 className="font-serif text-2xl font-bold tracking-wide text-espresso-700">
                VITANATUR
              </h1>
              <p className="text-sm text-espresso-400">{t("admin.title")}</p>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 text-brick-600 text-sm bg-brick-300/10 rounded-lg px-3 py-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{t("admin.login_error")}</span>
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-espresso-600 mb-1.5">
                  {t("admin.username")}
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError(false);
                  }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
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
    <div className="min-h-screen bg-cream-50">
      {/* Top Bar */}
      <div className="flex items-center justify-between bg-espresso-700 px-4 sm:px-6 py-3">
        <div className="flex items-center gap-3">
          <Package className="w-5 h-5 text-olive-300" />
          <span className="font-serif text-lg font-bold text-cream-100 tracking-wide">
            VITANATUR
          </span>
          <span className="text-xs text-cream-400/60">{t("admin.title")}</span>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-cream-300 hover:text-white text-sm flex items-center gap-1.5 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">{t("admin.logout")}</span>
        </button>
      </div>

      {/* Main Content — Products Only */}
      <main className="p-5 sm:p-6 lg:p-8 max-w-[1400px] mx-auto">
        <div className="space-y-6">
          {/* Header */}
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
              onClick={() => {
                setEditingProduct(null);
                setShowProductForm(true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-olive-500 text-white text-sm font-medium transition-colors hover:bg-olive-600 active:bg-olive-700 shadow-sm"
            >
              <Plus className="w-4 h-4" />
              {t("admin.new_product")}
            </button>
          </div>

          {/* Search Bar */}
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

          {/* Category Filters */}
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
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-sand-100 text-espresso-400",
                    ].join(" ")}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-12 h-12 text-sand-300 mx-auto mb-3" />
              <p className="text-espresso-400">
                {searchQuery || categoryFilter !== "all"
                  ? t("admin.no_products")
                  : t("admin.no_products_yet")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredProducts.map((product) => (
                <AdminProductCard
                  key={product.id}
                  product={product}
                  onEdit={(p) => {
                    setEditingProduct(p);
                    setShowProductForm(true);
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Product Form Modal (Edit / Create) */}
      {showProductForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => {
            setShowProductForm(false);
            setEditingProduct(null);
          }}
        />
      )}
    </div>
  );
}
