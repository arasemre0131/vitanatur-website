import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { message, customerName } = await request.json();

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { success: false, error: "Empty message" },
      { status: 400 }
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ success: true }); // silently succeed if not configured
  }

  const sanitizedMessage = message.replace(/[<>&]/g, "").slice(0, 1000);
  const name = customerName
    ? String(customerName).replace(/[<>&]/g, "").slice(0, 50)
    : "Anonim";

  const text = `💬 Canli Destek Mesaji\n\nMusteri: ${name}\nMesaj: ${sanitizedMessage}\nTarih: ${new Date().toLocaleString("de-DE")}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch {
    // silently fail — message is still shown locally
  }

  return NextResponse.json({ success: true });
}
