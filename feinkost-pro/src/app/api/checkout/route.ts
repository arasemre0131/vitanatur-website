import { NextResponse } from "next/server";

function sanitizeString(value: unknown, maxLen = 255): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>&"']/g, "").trim().slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic input validation
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { customer, items } = body;

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

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "At least one item is required" },
        { status: 400 }
      );
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Mock successful payment
    const orderId = `FK-${Date.now().toString(36).toUpperCase()}`;

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
