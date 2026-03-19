import { PaymentResult } from "@/types";

export interface PaymentProvider {
  processPayment(
    amount: number,
    currency: string,
    paymentDetails: any
  ): Promise<PaymentResult>;
  validateCard(cardNumber: string, expiry: string, cvc: string): boolean;
}

export class MockPaymentProvider implements PaymentProvider {
  async processPayment(
    amount: number,
    currency: string,
    paymentDetails: any
  ): Promise<PaymentResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orderId = `FK-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

        resolve({
          success: true,
          orderId,
        });
      }, 2000);
    });
  }

  validateCard(cardNumber: string, expiry: string, cvc: string): boolean {
    const cleanNumber = cardNumber.replace(/\s+/g, "");

    if (!/^\d{13,19}$/.test(cleanNumber)) {
      return false;
    }

    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    for (let i = cleanNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cleanNumber[i], 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      sum += digit;
      isEven = !isEven;
    }
    if (sum % 10 !== 0) {
      return false;
    }

    // Validate expiry (MM/YY)
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return false;
    }
    const [monthStr, yearStr] = expiry.split("/");
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10) + 2000;
    if (month < 1 || month > 12) {
      return false;
    }
    const now = new Date();
    const expiryDate = new Date(year, month);
    if (expiryDate <= now) {
      return false;
    }

    // Validate CVC
    if (!/^\d{3,4}$/.test(cvc)) {
      return false;
    }

    return true;
  }
}
