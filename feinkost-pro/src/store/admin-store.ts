import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types";
import { products as initialProducts } from "@/data/products";

interface AdminState {
  isAuthenticated: boolean;
  token: string | null;
  products: Product[];
  uploadedImages: Record<string, string[]>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  addUploadedImage: (productId: string, dataUrl: string) => void;
  removeUploadedImage: (productId: string, index: number) => void;
  updateStock: (productId: string, quantity: number) => void;
  decrementStock: (productId: string, quantity: number) => void;
  getLowStockProducts: () => Product[];
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      token: null,
      products: initialProducts,
      uploadedImages: {},

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

      addProduct: (product) => {
        set((state) => ({
          products: [...state.products, product],
        }));
      },

      updateProduct: (id, updates) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        }));
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter((p) => p.id !== id),
          uploadedImages: Object.fromEntries(
            Object.entries(state.uploadedImages).filter(([key]) => key !== id)
          ),
        }));
      },

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

      updateStock: (productId, quantity) => {
        set((state) => ({
          products: state.products.map((p) =>
            p.id === productId
              ? { ...p, stock: quantity, inStock: quantity > 0 }
              : p
          ),
        }));
      },

      decrementStock: (productId, quantity) => {
        set((state) => ({
          products: state.products.map((p) => {
            if (p.id !== productId) return p;
            const newStock = Math.max(0, p.stock - quantity);
            return { ...p, stock: newStock, inStock: newStock > 0 };
          }),
        }));
      },

      getLowStockProducts: () => {
        return get().products.filter((p) => p.stock <= p.lowStockThreshold);
      },
    }),
    {
      name: "feinkost-admin",
      version: 3,
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        token: state.token,
        products: state.products,
        uploadedImages: state.uploadedImages,
      }),
    }
  )
);
