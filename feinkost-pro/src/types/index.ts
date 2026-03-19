export interface Product {
  id: string;
  name: string;
  nameTr?: string;
  description: string;
  descriptionTr?: string;
  price: number;
  category: CategorySlug;
  images: string[];
  variants: ProductVariant[];
  weight: string;
  origin: string;
  inStock: boolean;
  featured: boolean;
  stock: number;
  lowStockThreshold: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  weight: string;
}

export type CategorySlug = "gewuerze" | "trockenfruechte" | "fruehstueck" | "oele" | "nuesse" | "spezialitaeten";

export interface Category {
  slug: CategorySlug;
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  variant: ProductVariant | null;
  quantity: number;
}

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: "card" | "paypal" | "sofort";
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}

export type OrderStatus = "pending" | "confirmed" | "preparing" | "shipped" | "delivered" | "cancelled";

export type CheckoutStep = "shipping" | "payment" | "review";

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  error?: string;
}

export interface Coupon {
  id: string;
  code: string;
  type: "percentage" | "fixed";
  value: number; // percentage (0-100) or fixed amount in EUR
  minOrder: number; // minimum order amount to apply
  maxUses: number; // 0 = unlimited
  usedCount: number;
  active: boolean;
  expiresAt: string | null; // ISO date string or null for no expiry
  createdAt: string;
}
