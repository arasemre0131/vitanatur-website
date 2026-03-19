"use client";

import { Product } from "@/types";
import { ProductCard } from "./ProductCard";
import { useLang } from "@/lib/i18n";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { t } = useLang();

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-16 h-16 rounded-full bg-cream-200 flex items-center justify-center mb-4">
          <svg
            className="w-8 h-8 text-sand-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-espresso-600 mb-1">
          {t("products.notfound")}
        </h3>
        <p className="text-sand-400 text-sm max-w-xs">
          {t("products.notfound.desc")}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
