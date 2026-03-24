import { Product } from "@/types";
import staticProducts from "@/data/products-static.json";

/**
 * Returns products instantly from embedded static JSON.
 * Zero network requests. Zero latency. Works offline.
 *
 * Admin panel still uses Supabase for CRUD operations.
 * After admin makes changes, run `npm run sync-products` to update static data,
 * then redeploy.
 */
export async function fetchProductsServer(): Promise<Product[]> {
  return staticProducts as Product[];
}
