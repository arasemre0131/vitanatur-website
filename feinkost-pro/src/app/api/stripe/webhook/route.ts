import { NextResponse } from "next/server";
import Stripe from "stripe";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    return NextResponse.json(
      { success: false, error: "Webhook not configured" },
      { status: 503 }
    );
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { success: false, error: "Payment not configured" },
      { status: 503 }
    );
  }

  const stripe = new Stripe(secretKey);

  const rawBody = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { success: false, error: "Missing signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json(
      { success: false, error: "Invalid signature" },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
    const orderId = metadata.orderId || `FK-${Date.now().toString(36).toUpperCase()}`;

    // Save order to Supabase if configured
    if (supabase) {
      try {
        const { error: orderError } = await supabase.from("orders").insert({
          id: orderId,
          customer_first_name: metadata.customerFirstName || "",
          customer_last_name: metadata.customerLastName || "",
          customer_email: metadata.customerEmail || session.customer_email || "",
          customer_phone: metadata.customerPhone || null,
          shipping_street: metadata.shippingStreet || "",
          shipping_city: metadata.shippingCity || "",
          shipping_postal_code: metadata.shippingPostalCode || "",
          shipping_country: metadata.shippingCountry || "DE",
          payment_method: "stripe",
          subtotal: (session.amount_subtotal || 0) / 100,
          shipping_cost: 0,
          total: (session.amount_total || 0) / 100,
          status: "new",
          stripe_payment_intent_id:
            typeof session.payment_intent === "string"
              ? session.payment_intent
              : session.payment_intent?.id || null,
        });

        if (orderError) {
          console.error("Order insert error:", orderError);
        }
      } catch (dbError) {
        console.error("Database error saving order:", dbError);
      }
    }

    // Send Telegram notification (non-blocking)
    try {
      const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      fetch(`${siteUrl}/api/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          total: (session.amount_total || 0) / 100,
          customer: {
            firstName: metadata.customerFirstName || "",
            lastName: metadata.customerLastName || "",
            email: metadata.customerEmail || session.customer_email || "",
          },
        }),
      }).catch(() => {
        // Telegram notification is non-critical
      });
    } catch {
      // Telegram notification is non-critical
    }
  }

  return NextResponse.json({ received: true });
}
