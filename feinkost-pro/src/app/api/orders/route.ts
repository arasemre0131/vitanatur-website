import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const MAX_STRING_LENGTH = 500;

function sanitizeString(value: unknown, maxLen = MAX_STRING_LENGTH): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customer, items, subtotal, shippingCost, total } = body;

    // Validate customer object
    if (!customer || typeof customer !== "object") {
      return NextResponse.json(
        { success: false, error: "Missing customer information" },
        { status: 400 }
      );
    }

    const firstName = sanitizeString(customer.firstName, 100);
    const lastName = sanitizeString(customer.lastName, 100);
    const email = sanitizeString(customer.email, 255);
    const phone = sanitizeString(customer.phone, 30);
    const street = sanitizeString(customer.street, 200);
    const city = sanitizeString(customer.city, 100);
    const postalCode = sanitizeString(customer.postalCode, 20);
    const country = sanitizeString(customer.country || "DE", 5);
    const paymentMethod = sanitizeString(customer.paymentMethod || "card", 20);

    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "First name and last name are required" },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!street || !city || !postalCode) {
      return NextResponse.json(
        { success: false, error: "Complete shipping address is required" },
        { status: 400 }
      );
    }

    // Validate items
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one item is required" },
        { status: 400 }
      );
    }

    // Validate numeric fields
    if (typeof subtotal !== "number" || typeof total !== "number" || subtotal < 0 || total < 0) {
      return NextResponse.json(
        { success: false, error: "Invalid order totals" },
        { status: 400 }
      );
    }

    const orderId = `FK-${Date.now().toString(36).toUpperCase()}`;

    // Insert order
    const { error: orderError } = await supabase.from("orders").insert({
      id: orderId,
      customer_first_name: firstName,
      customer_last_name: lastName,
      customer_email: email,
      customer_phone: phone || null,
      shipping_street: street,
      shipping_city: city,
      shipping_postal_code: postalCode,
      shipping_country: country,
      payment_method: paymentMethod,
      subtotal,
      shipping_cost: shippingCost,
      total,
      status: "new",
    });

    if (orderError) {
      console.error("Order insert error:", orderError);
      return NextResponse.json(
        { success: false, error: "Failed to create order" },
        { status: 500 }
      );
    }

    // Insert order items
    if (items.length > 0) {
      const orderItems = items.map((item: any) => ({
        order_id: orderId,
        product_id: sanitizeString(item.productId, 100),
        product_name: sanitizeString(item.name, 200),
        variant_name: item.variantName ? sanitizeString(item.variantName, 200) : null,
        quantity: typeof item.quantity === "number" ? item.quantity : 1,
        unit_price: typeof item.unitPrice === "number" ? item.unitPrice : 0,
        total_price: typeof item.totalPrice === "number" ? item.totalPrice : 0,
      }));

      await supabase.from("order_items").insert(orderItems);
    }

    // Try to send Telegram notification (non-blocking)
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
      await fetch(`${siteUrl}/api/notify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, items, total, customer: { firstName, lastName, email } }),
      });
    } catch {
      // Telegram notification is non-critical
    }

    return NextResponse.json({
      success: true,
      orderId,
      message: "Bestellung erfolgreich aufgegeben",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
