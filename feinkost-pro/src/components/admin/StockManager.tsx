"use client";

import { useState, useMemo } from "react";
import { AlertTriangle, ArrowUpDown, Package } from "lucide-react";
import { useAdminStore } from "@/store/admin-store";
import { useLang } from "@/lib/i18n";

type StockFilter = "all" | "low" | "out";
type SortBy = "stock" | "name";

export function StockManager() {
  const { products, updateStock, updateProduct } = useAdminStore();
  const { t, lang } = useLang();

  const [filter, setFilter] = useState<StockFilter>("all");
  const [sortBy, setSortBy] = useState<SortBy>("stock");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<"stock" | "threshold" | null>(null);
  const [editValue, setEditValue] = useState("");

  const lowStockCount = useMemo(
    () => products.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold).length,
    [products]
  );

  const outOfStockCount = useMemo(
    () => products.filter((p) => p.stock === 0).length,
    [products]
  );

  const filteredAndSorted = useMemo(() => {
    let result = [...products];

    if (filter === "low") {
      result = result.filter((p) => p.stock > 0 && p.stock <= p.lowStockThreshold);
    } else if (filter === "out") {
      result = result.filter((p) => p.stock === 0);
    }

    if (sortBy === "stock") {
      result.sort((a, b) => a.stock - b.stock);
    } else {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, filter, sortBy]);

  const getStatusBadge = (stock: number, threshold: number) => {
    if (stock === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
          {t("stock.out_of_stock")}
        </span>
      );
    }
    if (stock <= threshold) {
      return (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700">
          {t("stock.low_stock")}
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
        {t("stock.in_stock")}
      </span>
    );
  };

  const handleStartEdit = (productId: string, field: "stock" | "threshold", currentValue: number) => {
    setEditingId(productId);
    setEditingField(field);
    setEditValue(currentValue.toString());
  };

  const handleSaveEdit = (productId: string) => {
    const numVal = parseInt(editValue, 10);
    if (isNaN(numVal) || numVal < 0) {
      setEditingId(null);
      setEditingField(null);
      return;
    }

    if (editingField === "stock") {
      updateStock(productId, numVal);
    } else if (editingField === "threshold") {
      updateProduct(productId, { lowStockThreshold: numVal });
    }

    setEditingId(null);
    setEditingField(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, productId: string) => {
    if (e.key === "Enter") {
      handleSaveEdit(productId);
    } else if (e.key === "Escape") {
      setEditingId(null);
      setEditingField(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Low stock alert banner */}
      {(lowStockCount > 0 || outOfStockCount > 0) && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p className="text-sm font-medium text-amber-800">
            {t("stock.low_alert_banner").replace("{count}", String(lowStockCount + outOfStockCount))}
          </p>
        </div>
      )}

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {/* Filter buttons */}
        <div className="flex gap-2">
          {(
            [
              { key: "all" as StockFilter, label: t("stock.all"), count: products.length },
              { key: "low" as StockFilter, label: t("stock.low_stock"), count: lowStockCount },
              { key: "out" as StockFilter, label: t("stock.out_of_stock"), count: outOfStockCount },
            ] as const
          ).map((f) => (
            <button
              key={f.key}
              type="button"
              onClick={() => setFilter(f.key)}
              className={[
                "inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                filter === f.key
                  ? "bg-olive-500 text-white shadow-sm"
                  : "bg-white text-espresso-500 border border-sand-200 hover:border-olive-300 hover:text-olive-700",
              ].join(" ")}
            >
              {f.label}
              <span
                className={[
                  "text-xs px-1.5 py-0.5 rounded-full",
                  filter === f.key
                    ? "bg-white/20 text-white"
                    : "bg-sand-100 text-espresso-400",
                ].join(" ")}
              >
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* Sort buttons */}
        <div className="sm:ml-auto flex gap-2">
          <button
            type="button"
            onClick={() => setSortBy(sortBy === "stock" ? "name" : "stock")}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-espresso-500 bg-white border border-sand-200 hover:border-olive-300 hover:text-olive-700 transition-colors"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
            {sortBy === "stock" ? t("stock.sort_name") : t("stock.sort_stock")}
          </button>
        </div>
      </div>

      {/* Stock Table */}
      {filteredAndSorted.length === 0 ? (
        <div className="text-center py-16">
          <Package className="w-12 h-12 text-sand-300 mx-auto mb-3" />
          <p className="text-espresso-400">{t("admin.no_products")}</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-sand-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-sand-200 bg-cream-50">
                  <th className="text-left px-5 py-3.5 text-xs font-semibold text-espresso-500 uppercase tracking-wider">
                    {t("stock.name")}
                  </th>
                  <th className="text-center px-5 py-3.5 text-xs font-semibold text-espresso-500 uppercase tracking-wider">
                    {t("stock.current")}
                  </th>
                  <th className="text-center px-5 py-3.5 text-xs font-semibold text-espresso-500 uppercase tracking-wider">
                    {t("stock.threshold")}
                  </th>
                  <th className="text-center px-5 py-3.5 text-xs font-semibold text-espresso-500 uppercase tracking-wider">
                    {t("stock.status")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand-100">
                {filteredAndSorted.map((product) => (
                  <tr
                    key={product.id}
                    className={[
                      "transition-colors",
                      product.stock === 0
                        ? "bg-red-50/40"
                        : product.stock <= product.lowStockThreshold
                        ? "bg-amber-50/40"
                        : "hover:bg-cream-50/50",
                    ].join(" ")}
                  >
                    {/* Product Name */}
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        {product.images[0] && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover border border-sand-200 flex-shrink-0"
                          />
                        )}
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-espresso-700 truncate">
                            {lang === "tr" && product.nameTr ? product.nameTr : product.name}
                          </p>
                          <p className="text-xs text-espresso-400">{product.price.toFixed(2).replace(".", ",")} &euro;</p>
                        </div>
                      </div>
                    </td>

                    {/* Stock Quantity (editable) */}
                    <td className="px-5 py-3.5 text-center">
                      {editingId === product.id && editingField === "stock" ? (
                        <input
                          type="number"
                          min="0"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSaveEdit(product.id)}
                          onKeyDown={(e) => handleKeyDown(e, product.id)}
                          autoFocus
                          className="w-20 text-center bg-sand-100 border border-olive-400 rounded-lg px-2 py-1.5 text-sm text-espresso-700 focus:outline-none focus:ring-2 focus:ring-olive-400/40"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartEdit(product.id, "stock", product.stock)}
                          className={[
                            "inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer",
                            product.stock === 0
                              ? "bg-red-100 text-red-700 hover:bg-red-200"
                              : product.stock <= product.lowStockThreshold
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                              : "bg-sand-100 text-espresso-700 hover:bg-sand-200",
                          ].join(" ")}
                          title={t("stock.update")}
                        >
                          {product.stock}
                        </button>
                      )}
                    </td>

                    {/* Threshold (editable) */}
                    <td className="px-5 py-3.5 text-center">
                      {editingId === product.id && editingField === "threshold" ? (
                        <input
                          type="number"
                          min="0"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSaveEdit(product.id)}
                          onKeyDown={(e) => handleKeyDown(e, product.id)}
                          autoFocus
                          className="w-20 text-center bg-sand-100 border border-olive-400 rounded-lg px-2 py-1.5 text-sm text-espresso-700 focus:outline-none focus:ring-2 focus:ring-olive-400/40"
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleStartEdit(product.id, "threshold", product.lowStockThreshold)}
                          className="inline-flex items-center justify-center min-w-[3rem] px-3 py-1.5 rounded-lg text-sm font-medium text-espresso-500 bg-sand-100 hover:bg-sand-200 transition-colors cursor-pointer"
                          title={t("stock.threshold")}
                        >
                          {product.lowStockThreshold}
                        </button>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-3.5 text-center">
                      {getStatusBadge(product.stock, product.lowStockThreshold)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
