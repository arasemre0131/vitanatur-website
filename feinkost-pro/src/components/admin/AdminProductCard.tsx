"use client";

import { useState } from "react";
import { Pencil, Trash2, Check, X } from "lucide-react";
import { Product, CategorySlug } from "@/types";
import { useAdminStore } from "@/store/admin-store";
import { useLang } from "@/lib/i18n";

const categoryLabelKeys: Record<CategorySlug, string> = {
  gewuerze: "cat.gewuerze",
  trockenfruechte: "cat.trockenfruechte",
  fruehstueck: "cat.fruehstueck",
  oele: "cat.oele",
  nuesse: "cat.nuesse",
  spezialitaeten: "cat.spezialitaeten",
  kahveler: "cat.kahveler",
  caylar: "cat.caylar",
  salcalar: "cat.salcalar",
  "zuehre-ana": "cat.zuehre-ana",
};

const categoryColors: Record<CategorySlug, string> = {
  gewuerze: "bg-olive-500/15 text-olive-700",
  trockenfruechte: "bg-amber-100 text-amber-800",
  fruehstueck: "bg-orange-100 text-orange-700",
  oele: "bg-yellow-100 text-yellow-800",
  nuesse: "bg-emerald-100 text-emerald-700",
  spezialitaeten: "bg-brick-300/20 text-brick-700",
  kahveler: "bg-rose-100 text-rose-800",
  caylar: "bg-teal-100 text-teal-700",
  salcalar: "bg-red-100 text-red-700",
  "zuehre-ana": "bg-purple-100 text-purple-700",
};

interface AdminProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
}

export function AdminProductCard({ product, onEdit }: AdminProductCardProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const deleteProduct = useAdminStore((s) => s.deleteProduct);
  const updateProduct = useAdminStore((s) => s.updateProduct);
  const { lang, t } = useLang();

  const handleToggleStock = () => {
    const newInStock = !product.inStock;
    updateProduct(product.id, {
      inStock: newInStock,
      stock: newInStock ? 50 : 0,
    });
  };

  const handleDelete = () => {
    if (confirmDelete) {
      deleteProduct(product.id);
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  const cancelDelete = () => {
    setConfirmDelete(false);
  };

  return (
    <div className="bg-white rounded-xl border border-sand-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
        {product.images.length > 0 ? (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover rounded-t-xl"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-espresso-400/30">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
        {/* Category Badge */}
        <span
          className={`absolute top-2.5 left-2.5 px-2.5 py-1 text-xs font-semibold rounded-full backdrop-blur-sm ${categoryColors[product.category] || "bg-sand-200 text-espresso-600"}`}
        >
          {t(categoryLabelKeys[product.category] as Parameters<typeof t>[0]) ?? product.category}
        </span>
        {/* Stock indicator */}
        <span
          className={`absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full ring-2 ring-white ${product.inStock ? "bg-emerald-500" : "bg-red-400"}`}
          title={product.inStock ? t("admin.in_stock") : t("admin.out_of_stock")}
        />
      </div>

      {/* Body */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="font-serif font-semibold text-espresso-700 leading-tight line-clamp-1">
            {lang === "tr" && product.nameTr ? product.nameTr : product.name}
          </h3>
          <p className="text-lg font-bold text-olive-600 mt-1">
            {product.price.toFixed(2).replace(".", ",")} &euro;
          </p>
        </div>

        {/* Stock Toggle */}
        <button
          type="button"
          onClick={handleToggleStock}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-cream-100 hover:bg-cream-200 transition-colors"
        >
          <span className={`text-xs font-semibold ${product.inStock ? "text-emerald-700" : "text-red-600"}`}>
            {product.inStock ? t("admin.in_stock") : t("admin.out_of_stock")}
          </span>
          <div className={`relative w-10 h-5 rounded-full transition-colors ${product.inStock ? "bg-emerald-500" : "bg-red-400"}`}>
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${product.inStock ? "left-[22px]" : "left-0.5"}`} />
          </div>
        </button>

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2 border-t border-sand-100">
          <button
            type="button"
            onClick={() => onEdit(product)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-espresso-600 bg-sand-100 hover:bg-sand-200 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
            <span>{t("admin.edit")}</span>
          </button>

          {confirmDelete ? (
            <div className="flex-1 flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleDelete}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium rounded-lg bg-brick-500 text-white hover:bg-brick-600 transition-colors"
              >
                <Check className="w-3.5 h-3.5" />
                <span>{t("admin.yes")}</span>
              </button>
              <button
                type="button"
                onClick={cancelDelete}
                className="flex-1 flex items-center justify-center gap-1 px-2 py-2 text-sm font-medium rounded-lg bg-sand-200 text-espresso-600 hover:bg-sand-300 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                <span>{t("admin.no")}</span>
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={handleDelete}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg text-brick-600 bg-brick-300/10 hover:bg-brick-300/20 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
