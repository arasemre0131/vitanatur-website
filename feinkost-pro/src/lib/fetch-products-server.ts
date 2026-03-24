import { createClient } from "@supabase/supabase-js";
import { Product } from "@/types";
import * as fs from "fs";
import * as path from "path";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const CACHE_FILE = path.join(process.cwd(), ".next", "products-cache.json");
const CACHE_MAX_AGE = 5 * 60 * 1000; // 5 minutes

function readCache(): Product[] | null {
  try {
    if (!fs.existsSync(CACHE_FILE)) return null;
    const stat = fs.statSync(CACHE_FILE);
    const age = Date.now() - stat.mtimeMs;
    const data = JSON.parse(fs.readFileSync(CACHE_FILE, "utf8"));
    if (Array.isArray(data) && data.length > 0) {
      // Return cache even if stale — better than empty page
      if (age < CACHE_MAX_AGE) {
        console.log(`[products] Serving ${data.length} products from fresh cache`);
      } else {
        console.log(`[products] Serving ${data.length} products from stale cache (${Math.round(age / 1000)}s old)`);
      }
      return data;
    }
  } catch {
    // Cache read failed — continue to fetch
  }
  return null;
}

function writeCache(products: Product[]) {
  try {
    const dir = path.dirname(CACHE_FILE);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(CACHE_FILE, JSON.stringify(products));
  } catch {
    // Cache write failed — non-critical
  }
}

/** Fetch all products server-side with timeout + disk cache fallback */
export async function fetchProductsServer(): Promise<Product[]> {
  if (!supabaseUrl || !supabaseKey) {
    return readCache() || [];
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  try {
    // Use AbortController for timeout
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000); // 8s timeout

    const [productsRes, variantsRes, imagesRes] = await Promise.all([
      supabase.from("products").select("*").abortSignal(controller.signal),
      supabase.from("product_variants").select("*").abortSignal(controller.signal),
      supabase.from("product_images").select("*").order("sort_order").abortSignal(controller.signal),
    ]);

    clearTimeout(timeout);

    if (productsRes.error || !productsRes.data?.length) {
      console.error("[products] Supabase fetch failed, using cache");
      return readCache() || [];
    }

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

    const products: Product[] = productsRes.data.map((row) => {
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

    // Save to disk cache for next time
    writeCache(products);
    console.log(`[products] Fetched ${products.length} products from Supabase`);

    return products;
  } catch (err) {
    console.error("[products] Fetch error, falling back to cache:", err);
    return readCache() || [];
  }
}
