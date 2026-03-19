import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem, Product, ProductVariant } from "@/types";
import { trackAddToCart, trackRemoveFromCart } from "@/lib/analytics";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, variant: ProductVariant | null, quantity?: number) => void;
  removeItem: (productId: string, variantId: string | null) => void;
  updateQuantity: (productId: string, variantId: string | null, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product, variant, quantity = 1) => {
        // Check stock availability
        if (product.stock <= 0) return;

        const state = get();
        const existingItem = state.items.find(
          (item) =>
            item.product.id === product.id &&
            (item.variant?.id ?? null) === (variant?.id ?? null)
        );
        const currentQty = existingItem ? existingItem.quantity : 0;
        const allowedQty = Math.min(quantity, product.stock - currentQty);
        if (allowedQty <= 0) return;

        const price = variant?.price ?? product.price;
        trackAddToCart(
          { id: product.id, name: product.name, price, category: product.category },
          allowedQty
        );

        set((s) => {
          const existingIndex = s.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              (item.variant?.id ?? null) === (variant?.id ?? null)
          );

          if (existingIndex >= 0) {
            const updatedItems = [...s.items];
            updatedItems[existingIndex] = {
              ...updatedItems[existingIndex],
              quantity: updatedItems[existingIndex].quantity + allowedQty,
            };
            return { items: updatedItems };
          }

          return {
            items: [...s.items, { product, variant, quantity: allowedQty }],
          };
        });
      },

      removeItem: (productId, variantId) => {
        const state = get();
        const item = state.items.find(
          (i) =>
            i.product.id === productId &&
            (i.variant?.id ?? null) === variantId
        );
        if (item) {
          const price = item.variant?.price ?? item.product.price;
          trackRemoveFromCart({
            id: item.product.id,
            name: item.product.name,
            price,
          });
        }

        set((s) => ({
          items: s.items.filter(
            (i) =>
              !(
                i.product.id === productId &&
                (i.variant?.id ?? null) === variantId
              )
          ),
        }));
      },

      updateQuantity: (productId, variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) => {
            if (
              item.product.id === productId &&
              (item.variant?.id ?? null) === variantId
            ) {
              const cappedQty = Math.min(quantity, item.product.stock);
              return { ...item, quantity: cappedQty };
            }
            return item;
          }),
        }));
      },

      clearCart: () => set({ items: [] }),

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },

      totalPrice: () => {
        return get().items.reduce((sum, item) => {
          const price = item.variant?.price ?? item.product.price;
          return sum + price * item.quantity;
        }, 0);
      },
    }),
    {
      name: "feinkost-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);
