import { NextResponse } from "next/server";

function sanitizeString(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>&"']/g, "").trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json(
        { success: false, error: "Telegram not configured" },
        { status: 200 }
      );
    }

    const { orderId, items, total, customer } = body;

    // Validate required fields
    if (!orderId || !customer) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const safeOrderId = sanitizeString(orderId);
    const safeFirstName = sanitizeString(customer?.firstName);
    const safeLastName = sanitizeString(customer?.lastName);
    const safeEmail = sanitizeString(customer?.email);
    const safeTotal = typeof total === "number" ? total.toFixed(2) : "0.00";

    let itemLines = "";
    if (Array.isArray(items)) {
      itemLines = items
        .slice(0, 50) // Limit number of items to prevent abuse
        .map((i: any) => {
          const name = sanitizeString(i.name);
          const qty = typeof i.quantity === "number" ? i.quantity : 0;
          const itemTotal = typeof i.total === "number" ? i.total.toFixed(2) : "0.00";
          return `- ${name} x${qty} = ${itemTotal}EUR`;
        })
        .join("\n");
    }

    const message = [
      "Neue Bestellung!",
      "",
      `Bestell-Nr: ${safeOrderId}`,
      `Kunde: ${safeFirstName} ${safeLastName}`,
      `E-Mail: ${safeEmail}`,
      "",
      "Artikel:",
      itemLines,
      "",
      `Gesamt: ${safeTotal}EUR`,
    ].join("\n");

    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to send" },
      { status: 500 }
    );
  }
}
