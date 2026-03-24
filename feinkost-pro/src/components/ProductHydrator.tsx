"use client";

import { useRef } from "react";
import { useAdminStore } from "@/store/admin-store";
import { Product } from "@/types";

/** Hydrates the Zustand store with server-fetched products immediately on first render */
export function ProductHydrator({ products }: { products: Product[] }) {
  const hydrated = useRef(false);

  // Hydrate synchronously on first render — no useEffect delay
  if (!hydrated.current && products.length > 0) {
    hydrated.current = true;
    const store = useAdminStore.getState();
    // Only hydrate if store is empty (don't overwrite client-side updates)
    if (store.products.length === 0 || !store.productsLoaded) {
      useAdminStore.setState({ products, productsLoaded: true });
    }
  }

  return null;
}
