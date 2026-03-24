import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";

interface AdminState {
  // Auth (persisted to localStorage)
  isAuthenticated: boolean;
  token: string | null;

  // Products (NOT persisted - hydrated from Supabase via fetchProducts)
  products: Product[];
  productsLoaded: boolean;

  // Error feedback
  lastError: string | null;

  // Uploaded images (kept in memory per session)
  uploadedImages: Record<string, string[]>;

  // Auth actions
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;

  // Product actions (call API then update local state)
  fetchProducts: () => Promise<void>;
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  updateStock: (productId: string, quantity: number) => Promise<void>;
  decrementStock: (productId: string, quantity: number) => void;
  clearError: () => void;

  // Image actions (local only)
  addUploadedImage: (productId: string, dataUrl: string) => void;
  removeUploadedImage: (productId: string, index: number) => void;

  // Computed
  getLowStockProducts: () => Product[];
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      products: [],
      productsLoaded: false,
      lastError: null,
      uploadedImages: {},

      // --- Auth ---

      login: async (username, password) => {
        try {
          const res = await fetch("/api/admin/auth", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
          const data = await res.json();
          if (data.success && data.token) {
            set({ isAuthenticated: true, token: data.token });
            return true;
          }
          return false;
        } catch {
          return false;
        }
      },

      logout: async () => {
        try {
          await fetch("/api/admin/auth", { method: "DELETE" });
        } catch {
          // Ignore logout API errors
        }
        set({ isAuthenticated: false, token: null });
      },

      // --- Products ---

      fetchProducts: async () => {
        // Show cached products immediately while fetching fresh data
        const cached = get().products;
        if (cached.length > 0 && !get().productsLoaded) {
          set({ productsLoaded: true });
        }

        const tryFetch = async (attempt: number): Promise<void> => {
          try {
            const res = await fetch("/api/products");
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) {
              set({ products: data, productsLoaded: true });
            } else if (Array.isArray(data)) {
              set({ productsLoaded: true });
            }
          } catch (err) {
            console.error(`[fetchProducts] Attempt ${attempt} failed:`, err);
            if (attempt < 3) {
              await new Promise((r) => setTimeout(r, 2000 * attempt));
              return tryFetch(attempt + 1);
            }
            // After 3 retries, keep cached products
            set({ productsLoaded: true });
          }
        };

        await tryFetch(1);
      },

      addProduct: async (product) => {
        const { token } = get();
        set({ lastError: null });

        // Optimistic: add to local state immediately
        set((state) => ({
          products: [...state.products, product],
        }));

        try {
          const res = await fetch("/api/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(product),
          });

          if (!res.ok) {
            set((state) => ({
              products: state.products.filter((p) => p.id !== product.id),
              lastError: res.status === 401
                ? "Oturum süresi dolmuş. Lütfen tekrar giriş yapın."
                : `Ürün kaydedilemedi (HTTP ${res.status}). Lütfen tekrar deneyin.`,
            }));
            if (res.status === 401) set({ isAuthenticated: false, token: null });
          }
        } catch (err) {
          set((state) => ({
            products: state.products.filter((p) => p.id !== product.id),
            lastError: "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin.",
          }));
          console.error("[addProduct] Error:", err);
        }
      },

      updateProduct: async (id, updates) => {
        const { token, products } = get();
        const original = products.find((p) => p.id === id);
        set({ lastError: null });

        // Optimistic update
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));

        try {
          const res = await fetch(`/api/products/${id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(updates),
          });

          if (!res.ok) {
            if (original) {
              set((state) => ({
                products: state.products.map((p) =>
                  p.id === id ? original : p
                ),
              }));
            }
            set({
              lastError: res.status === 401
                ? "Oturum süresi dolmuş. Lütfen tekrar giriş yapın."
                : `Ürün güncellenemedi (HTTP ${res.status}). Lütfen tekrar deneyin.`,
            });
            if (res.status === 401) set({ isAuthenticated: false, token: null });
          }
        } catch (err) {
          if (original) {
            set((state) => ({
              products: state.products.map((p) =>
                p.id === id ? original : p
              ),
            }));
          }
          set({ lastError: "Sunucuya bağlanılamadı. İnternet bağlantınızı kontrol edin." });
          console.error("[updateProduct] Error:", err);
        }
      },

      deleteProduct: async (id) => {
        const { token, products } = get();
        const original = products.find((p) => p.id === id);
        set({ lastError: null });

        // Optimistic delete
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          uploadedImages: Object.fromEntries(
            Object.entries(state.uploadedImages).filter(([key]) => key !== id)
          ),
        }));

        try {
          const res = await fetch(`/api/products?id=${id}`, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) {
            if (original) {
              set((state) => ({
                products: [...state.products, original],
              }));
            }
            set({
              lastError: res.status === 401
                ? "Oturum süresi dolmuş. Lütfen tekrar giriş yapın."
                : `Ürün silinemedi (HTTP ${res.status}).`,
            });
            if (res.status === 401) set({ isAuthenticated: false, token: null });
          }
        } catch (err) {
          if (original) {
            set((state) => ({
              products: [...state.products, original],
            }));
          }
          set({ lastError: "Sunucuya bağlanılamadı." });
          console.error("[deleteProduct] Error:", err);
        }
      },

      clearError: () => set({ lastError: null }),

      updateStock: async (productId, quantity) => {
        // Delegate to updateProduct which handles API + optimistic update
        await get().updateProduct(productId, {
          stock: quantity,
          inStock: quantity > 0,
        });
      },

      decrementStock: (productId, quantity) => {
        // Local-only decrement (used during checkout flow before confirmation)
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id !== productId) return p;
            const newStock = Math.max(0, p.stock - quantity);
            return { ...p, stock: newStock, inStock: newStock > 0 };
          }),
        }));
      },

      // --- Images (local only) ---

      addUploadedImage: (productId, dataUrl) => {
        set((state) => {
          const existing = state.uploadedImages[productId] ?? [];
          return {
            uploadedImages: {
              ...state.uploadedImages,
              [productId]: [...existing, dataUrl],
            },
          };
        });
      },

      removeUploadedImage: (productId, index) => {
        set((state) => {
          const existing = state.uploadedImages[productId] ?? [];
          return {
            uploadedImages: {
              ...state.uploadedImages,
              [productId]: existing.filter((_, i) => i !== index),
            },
          };
        });
      },

      getLowStockProducts: () => {
        return get().products.filter((p) => p.stock <= p.lowStockThreshold);
      },
    }),
    {
      name: "feinkost-admin",
      version: 5,
      // Persist auth + products cache for instant loading
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        products: state.products,
      }),
    }
  )
);
