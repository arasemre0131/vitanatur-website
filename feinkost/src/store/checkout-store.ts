import { create } from "zustand";
import { CheckoutStep, CheckoutFormData, PaymentResult } from "@/types";

interface CheckoutState {
  currentStep: CheckoutStep;
  formData: CheckoutFormData;
  isProcessing: boolean;
  paymentResult: PaymentResult | null;
  setStep: (step: CheckoutStep) => void;
  updateFormData: (data: Partial<CheckoutFormData>) => void;
  resetCheckout: () => void;
  processPayment: () => Promise<PaymentResult>;
}

const initialFormData: CheckoutFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  street: "",
  city: "",
  postalCode: "",
  country: "Deutschland",
  paymentMethod: "card",
  cardNumber: "",
  cardExpiry: "",
  cardCvc: "",
};

export const useCheckoutStore = create<CheckoutState>()((set, get) => ({
  currentStep: "shipping",
  formData: { ...initialFormData },
  isProcessing: false,
  paymentResult: null,

  setStep: (step) => set({ currentStep: step }),

  updateFormData: (data) => {
    set((state) => ({
      formData: { ...state.formData, ...data },
    }));
  },

  resetCheckout: () =>
    set({
      currentStep: "shipping",
      formData: { ...initialFormData },
      isProcessing: false,
      paymentResult: null,
    }),

  processPayment: async () => {
    set({ isProcessing: true });

    return new Promise<PaymentResult>((resolve) => {
      setTimeout(() => {
        const orderId = `FK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        const result: PaymentResult = {
          success: true,
          orderId,
        };

        set({ isProcessing: false, paymentResult: result });
        resolve(result);
      }, 2000);
    });
  },
}));
