export const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

type GTagEvent = {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
};

export function trackEvent({ action, ...params }: GTagEvent) {
  if (typeof window === "undefined" || !GA_ID) return;
  (window as any).gtag?.("event", action, params);
}

// E-commerce specific events
export function trackViewItem(product: {
  id: string;
  name: string;
  price: number;
  category: string;
}) {
  trackEvent({
    action: "view_item",
    currency: "EUR",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
      },
    ],
  });
}

export function trackAddToCart(
  product: { id: string; name: string; price: number; category: string },
  quantity: number
) {
  trackEvent({
    action: "add_to_cart",
    currency: "EUR",
    value: product.price * quantity,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        item_category: product.category,
        price: product.price,
        quantity,
      },
    ],
  });
}

export function trackRemoveFromCart(product: {
  id: string;
  name: string;
  price: number;
}) {
  trackEvent({
    action: "remove_from_cart",
    currency: "EUR",
    value: product.price,
    items: [
      {
        item_id: product.id,
        item_name: product.name,
        price: product.price,
      },
    ],
  });
}

export function trackBeginCheckout(items: any[], total: number) {
  trackEvent({
    action: "begin_checkout",
    currency: "EUR",
    value: total,
    items,
  });
}

export function trackPurchase(orderId: string, items: any[], total: number) {
  trackEvent({
    action: "purchase",
    transaction_id: orderId,
    currency: "EUR",
    value: total,
    items,
  });
}

export function trackSearch(query: string) {
  trackEvent({ action: "search", search_term: query });
}

export function trackPageView(url: string) {
  if (!GA_ID) return;
  (window as any).gtag?.("config", GA_ID, { page_path: url });
}
