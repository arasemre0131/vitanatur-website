import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Coupon } from "@/types";

interface ApplyCouponResult {
  success: boolean;
  error?: string;
}

interface CouponState {
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  addCoupon: (coupon: Coupon) => void;
  removeCoupon: (id: string) => void;
  toggleCoupon: (id: string) => void;
  applyCoupon: (code: string, orderTotal: number) => ApplyCouponResult;
  clearAppliedCoupon: () => void;
  getDiscount: (orderTotal: number) => number;
}

export const useCouponStore = create<CouponState>()(
  persist(
    (set, get) => ({
      coupons: [],
      appliedCoupon: null,

      addCoupon: (coupon) => {
        set((state) => ({
          coupons: [...state.coupons, coupon],
        }));
      },

      removeCoupon: (id) => {
        set((state) => ({
          coupons: state.coupons.filter((c) => c.id !== id),
          // Clear applied coupon if it was the one removed
          appliedCoupon:
            state.appliedCoupon?.id === id ? null : state.appliedCoupon,
        }));
      },

      toggleCoupon: (id) => {
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === id ? { ...c, active: !c.active } : c
          ),
          // Clear applied coupon if it was toggled off
          appliedCoupon:
            state.appliedCoupon?.id === id ? null : state.appliedCoupon,
        }));
      },

      applyCoupon: (code, orderTotal) => {
        const { coupons } = get();
        const coupon = coupons.find(
          (c) => c.code.toLowerCase() === code.toLowerCase()
        );

        if (!coupon || !coupon.active) {
          return { success: false, error: "coupon.error.invalid" };
        }

        // Check expiry
        if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
          return { success: false, error: "coupon.error.expired" };
        }

        // Check min order
        if (orderTotal < coupon.minOrder) {
          return { success: false, error: "coupon.error.min_order" };
        }

        // Check max uses
        if (coupon.maxUses > 0 && coupon.usedCount >= coupon.maxUses) {
          return { success: false, error: "coupon.error.max_uses" };
        }

        // Apply coupon
        set({ appliedCoupon: coupon });

        // Increment usedCount
        set((state) => ({
          coupons: state.coupons.map((c) =>
            c.id === coupon.id ? { ...c, usedCount: c.usedCount + 1 } : c
          ),
        }));

        return { success: true };
      },

      clearAppliedCoupon: () => {
        set({ appliedCoupon: null });
      },

      getDiscount: (orderTotal) => {
        const { appliedCoupon } = get();
        if (!appliedCoupon) return 0;

        if (appliedCoupon.type === "percentage") {
          return Math.round(orderTotal * (appliedCoupon.value / 100) * 100) / 100;
        }

        // Fixed discount cannot exceed the order total
        return Math.min(appliedCoupon.value, orderTotal);
      },
    }),
    {
      name: "feinkost-coupons",
      partialize: (state) => ({
        coupons: state.coupons,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
);
