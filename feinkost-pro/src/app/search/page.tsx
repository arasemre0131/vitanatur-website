"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useAdminStore } from "@/store/admin-store";
import { useLang } from "@/lib/i18n";
import { searchProducts } from "@/lib/search";
import { SearchBar } from "@/components/search/SearchBar";
import { ProductCard } from "@/components/product/ProductCard";
import { Search } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const products = useAdminStore((s) => s.products);
  const { t, lang } = useLang();

  const results = searchProducts(products, query, lang);

  return (
    <main className="min-h-screen bg-cream-50">
      {/* Search header */}
      <div className="bg-white border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="max-w-xl mx-auto mb-6">
            <SearchBar initialQuery={query} alwaysExpanded />
          </div>
          {query && (
            <div className="text-center">
              <h1 className="font-serif text-2xl sm:text-3xl text-espresso-600">
                {results.length} {t("search.result_count")} {t("search.results")}{" "}
                <span className="text-olive-600">&quot;{query}&quot;</span>
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Results grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-sand-100 flex items-center justify-center mb-6">
              <Search className="w-7 h-7 text-sand-400" />
            </div>
            <h2 className="font-serif text-xl text-espresso-600 mb-2">
              {t("search.no_results")}
            </h2>
            <p className="text-sand-400 max-w-md">
              {t("search.no_results_desc")}
            </p>
          </div>
        ) : null}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream-50 flex items-center justify-center">
          <div className="text-sand-400">...</div>
        </main>
      }
    >
      <SearchResults />
    </Suspense>
  );
}
