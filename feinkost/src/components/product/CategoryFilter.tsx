"use client";

import { Category, CategorySlug } from "@/types";
import { useLang } from "@/lib/i18n";

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: CategorySlug | null;
  onChange: (slug: CategorySlug | null) => void;
}

export function CategoryFilter({
  categories,
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  const { t } = useLang();

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
          activeCategory === null
            ? "bg-olive-500 text-white shadow-sm"
            : "bg-cream-200 text-espresso-500 hover:bg-cream-300"
        }`}
      >
        {t("filter.all")}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => onChange(cat.slug)}
          className={`flex-shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-colors ${
            activeCategory === cat.slug
              ? "bg-olive-500 text-white shadow-sm"
              : "bg-cream-200 text-espresso-500 hover:bg-cream-300"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
