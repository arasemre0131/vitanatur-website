import { NextResponse } from "next/server";
import Stripe from "stripe";

function sanitizeString(value: unknown, maxLen = 255): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>&"']/g, "").trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      return NextResponse.json(
        { success: false, error: "Payment not configured" },
        { status: 503 }
      );
    }

    const stripe = new Stripe(secretKey);

    const body = await request.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { items, customer, shippingCost } = body;

    // Validate customer
    if (!customer || typeof customer !== "object") {
      return NextResponse.json(
        { success: false, error: "Missing customer information" },
        { status: 400 }
      );
    }

    const firstName = sanitizeString(customer.firstName, 100);
    const lastName = sanitizeString(customer.lastName, 100);
    const email = sanitizeString(customer.email, 255);

    if (!firstName || !lastName) {
      return NextResponse.json(
        { success: false, error: "Customer first and last name are required" },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required" },
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

    // Build line items for Stripe (with weight/gramaj in name for dashboard visibility)
    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: any) => {
        const name = sanitizeString(item.name, 200) || "Produkt";
        const variantName = item.variantName
          ? sanitizeString(item.variantName, 100)
          : null;
        const weight = item.weight
          ? sanitizeString(item.weight, 50)
          : null;
        const unitPrice = Math.round(
          (typeof item.unitPrice === "number" ? item.unitPrice : 0) * 100
        );
        const quantity =
          typeof item.quantity === "number" && item.quantity > 0
            ? item.quantity
            : 1;

        // Build descriptive name: "Sumak — 250g (Premium)"
        let displayName = name;
        if (weight) displayName += ` — ${weight}`;
        if (variantName) displayName += ` (${variantName})`;

        return {
          price_data: {
            currency: "eur",
            product_data: {
              name: displayName,
            },
            unit_amount: unitPrice,
          },
          quantity,
        };
      }
    );

    // Build order summary for metadata (Stripe Dashboard'da görünecek)
    const orderSummary = items
      .map((item: any) => {
        const n = sanitizeString(item.name, 50);
        const w = item.weight ? sanitizeString(item.weight, 20) : "";
        const q = item.quantity || 1;
        const p = item.unitPrice || 0;
        return `${q}x ${n}${w ? ` (${w})` : ""} @€${p.toFixed(2)}`;
      })
      .join(" | ")
      .slice(0, 500); // Stripe metadata max 500 chars per value

    // Add shipping as a line item if applicable
    const shippingAmount =
      typeof shippingCost === "number" ? Math.round(shippingCost * 100) : 0;
    if (shippingAmount > 0) {
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: "Versandkosten",
          },
          unit_amount: shippingAmount,
        },
        quantity: 1,
      });
    }

    const orderId = `FK-${Date.now().toString(36).toUpperCase()}-${Math.random()
      .toString(36)
      .substring(2, 6)
      .toUpperCase()}`;

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "klarna"],
      mode: "payment",
      locale: "de",
      customer_email: email,
      line_items: lineItems,
      shipping_address_collection: {
        allowed_countries: ["DE", "AT", "CH"],
      },
      metadata: {
        orderId,
        customerName: `${firstName} ${lastName}`,
        customerFirstName: firstName,
        customerLastName: lastName,
        customerEmail: email,
        customerPhone: sanitizeString(customer.phone, 30),
        shippingStreet: sanitizeString(customer.street, 200),
        shippingCity: sanitizeString(customer.city, 100),
        shippingPostalCode: sanitizeString(customer.postalCode, 20),
        shippingCountry: sanitizeString(customer.country || "DE", 5),
        orderItems: orderSummary,
      },
      success_url: `${siteUrl}/checkout?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/checkout?canceled=true`,
    });

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          error?.message || "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.",
      },
      { status: 500 }
    );
  }
}
