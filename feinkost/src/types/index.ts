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

export type CheckoutStep = "shipping" | "payment" | "review";

export interface PaymentResult {
  success: boolean;
  orderId?: string;
  error?: string;
}
