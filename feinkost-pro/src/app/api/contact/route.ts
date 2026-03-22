import { NextResponse } from "next/server";

function sanitizeString(value: unknown, maxLen = 500): string {
  if (typeof value !== "string") return "";
  return value.replace(/[<>&"']/g, "").trim().slice(0, maxLen);
}

export async function POST(request: Request) {
  const body = await request.json();

  const name = sanitizeString(body.name, 100);
  const email = sanitizeString(body.email, 255);
  const message = sanitizeString(body.message, 2000);

  if (!name || !email || !message) {
    return NextResponse.json(
      { success: false, error: "All fields are required" },
      { status: 400 }
    );
  }

  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    return NextResponse.json({ success: true });
  }

  const text = `Kontaktformular\n\nName: ${name}\nE-Mail: ${email}\nNachricht: ${message}\nDatum: ${new Date().toLocaleString("de-DE")}`;

  try {
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch {
    // silently fail
  }

  return NextResponse.json({ success: true });
}
