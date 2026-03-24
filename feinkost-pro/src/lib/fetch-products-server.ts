import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

/** Fetch all products server-side with 8s timeout */
export async function fetchProductsServer(): Promise<Product[]> {
  if (!supabaseUrl || !supabaseKey) return [];

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    const [productsRes, variantsRes, imagesRes] = await Promise.all([
      supabase.from("products").select("*").abortSignal(controller.signal),
      supabase.from("product_variants").select("*").abortSignal(controller.signal),
      supabase.from("product_images").select("*").order("sort_order").abortSignal(controller.signal),
    ]);

    clearTimeout(timeout);

    if (productsRes.error || !productsRes.data?.length) return [];

    const variantsByProduct = new Map<string, typeof variantsRes.data>();
    for (const v of variantsRes.data || []) {
      const arr = variantsByProduct.get(v.product_id) ?? [];
      arr.push(v);
      variantsByProduct.set(v.product_id, arr);
    }

    const imagesByProduct = new Map<string, typeof imagesRes.data>();
    for (const img of imagesRes.data || []) {
      const arr = imagesByProduct.get(img.product_id) ?? [];
      arr.push(img);
      imagesByProduct.set(img.product_id, arr);
    }

    return productsRes.data.map((row) => {
      const variants = variantsByProduct.get(row.id) ?? [];
      const images = imagesByProduct.get(row.id) ?? [];
      return {
        id: row.id,
        name: row.name,
        nameTr: row.name_tr ?? undefined,
        nameEn: row.name_en ?? undefined,
        description: row.description,
        descriptionTr: row.description_tr ?? undefined,
        descriptionEn: row.description_en ?? undefined,
        price: Number(row.price),
        category: row.category,
        images: images.sort((a, b) => a.sort_order - b.sort_order).map((img) => img.url),
        variants: variants.map((v) => ({
          id: v.id,
          name: v.name,
          price: Number(v.price),
          weight: v.weight,
        })),
        weight: row.weight,
        origin: row.origin,
        originTr: row.origin_tr ?? undefined,
        inStock: row.in_stock,
        featured: row.featured,
        stock: row.stock,
        lowStockThreshold: row.low_stock_threshold,
      } as Product;
    });
  } catch (err) {
    console.error("[products] Fetch error:", err);
    return [];
  }
}
