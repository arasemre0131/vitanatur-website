import { Product } from "@/types";

// Turkish + German character normalization map
const CHAR_MAP: Record<string, string> = {
  ı: "i", İ: "i", ö: "o", Ö: "o", ü: "u", Ü: "u",
  ç: "c", Ç: "c", ş: "s", Ş: "s", ğ: "g", Ğ: "g",
  ä: "a", Ä: "a", ß: "ss",
};

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ıİöÖüÜçÇşŞğĞäÄß]/g, (ch) => CHAR_MAP[ch] || ch);
}

/**
 * Fuzzy match with Turkish + German character support.
 * "fındık" matches "findik", "salça" matches "salca", etc.
 */
export function fuzzyMatch(text: string, query: string): boolean {
  const normText = normalize(text);
  const normQuery = normalize(query);

  // Direct substring match
  if (normText.includes(normQuery)) return true;

  // Also try original lowercase (for exact matches like "Nüsse")
  if (text.toLowerCase().includes(query.toLowerCase())) return true;

  return false;
}

/**
 * Search products by name (DE + TR + EN), description, and category.
 */
export function searchProducts(
  products: Product[],
  query: string,
  lang: string
): Product[] {
  if (!query.trim()) return [];

  const q = query.trim();

  return products.filter((p) => {
    // Search in ALL languages, not just current
    const fields = [
      p.name,
      p.nameTr,
      p.nameEn,
      p.description,
      p.descriptionTr,
      p.descriptionEn,
      p.category,
      p.origin,
      p.originTr,
    ].filter(Boolean) as string[];

    return fields.some((field) => fuzzyMatch(field, q));
  });
}
