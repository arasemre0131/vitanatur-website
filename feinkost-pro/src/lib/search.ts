import { Product } from "@/types";

/**
 * Fuzzy match with Turkish character support.
 * Normalizes İ/I for proper Turkish locale matching.
 */
export function fuzzyMatch(text: string, query: string): boolean {
  const normalizedText = text
    .toLowerCase()
    .replace(/İ/g, "i")
    .replace(/I/g, "ı");
  const normalizedQuery = query
    .toLowerCase()
    .replace(/İ/g, "i")
    .replace(/I/g, "ı");
  return normalizedText.includes(normalizedQuery);
}

/**
 * Search products by name, description, and category.
 * Respects the current language for name/description matching.
 */
export function searchProducts(
  products: Product[],
  query: string,
  lang: string
): Product[] {
  if (!query.trim()) return [];
  return products.filter((p) => {
    const name = lang === "tr" && p.nameTr ? p.nameTr : p.name;
    const desc =
      lang === "tr" && p.descriptionTr ? p.descriptionTr : p.description;
    return (
      fuzzyMatch(name, query) ||
      fuzzyMatch(desc, query) ||
      fuzzyMatch(p.category, query)
    );
  });
}
