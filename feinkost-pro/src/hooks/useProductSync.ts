"use client";

import { useEffect, useRef } from "react";
import { useAdminStore } from "@/store/admin-store";

/**
 * Hook that hydrates products from cache immediately,
 * then fetches fresh data from Supabase in background.
 * Retries on failure. Deduplicates concurrent calls.
 */
export function useProductSync() {
  const fetchProducts = useAdminStore((s) => s.fetchProducts);
  const products = useAdminStore((s) => s.products);
  const productsLoaded = useAdminStore((s) => s.productsLoaded);
  const fetchedRef = useRef(false);

  useEffect(() => {
    // If we have cached products, mark as loaded immediately
    if (products.length > 0 && !productsLoaded) {
      useAdminStore.setState({ productsLoaded: true });
    }

    // Fetch fresh data only once
    if (!fetchedRef.current) {
      fetchedRef.current = true;
      fetchProducts();
    }
  }, [fetchProducts, products.length, productsLoaded]);
}
