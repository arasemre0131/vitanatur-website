import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

const FROM_EMAIL = process.env.FROM_EMAIL || "onboarding@resend.dev";
const STORE_EMAIL = process.env.STORE_NOTIFICATION_EMAIL || "info@vitanatur.com";

interface OrderItem {
  name: string;
  variantName?: string | null;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface CustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface OrderEmailData {
  orderId: string;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  customer: CustomerInfo;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function formatEuro(amount: number): string {
  return amount.toFixed(2).replace(".", ",") + " €";
}

function itemsTableHtml(items: OrderItem[]): string {
  return items
    .map(
      (item) =>
        `<tr>
          <td style="padding:8px;border-bottom:1px solid #eee;">${escapeHtml(item.name)}${item.variantName ? ` (${escapeHtml(item.variantName)})` : ""}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
          <td style="padding:8px;border-bottom:1px solid #eee;text-align:right;">${formatEuro(item.totalPrice)}</td>
        </tr>`
    )
    .join("\n");
}

// ── Order Confirmation (to customer) ──
export async function sendOrderConfirmation(data: OrderEmailData) {
  if (!resend) {
    console.log("[Email] Resend not configured – skipping order confirmation");
    return null;
  }

  const { orderId, items, subtotal, shippingCost, total, customer } = data;

  const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#3E2A1E;">
  <div style="background:#6B7F3B;padding:24px;text-align:center;">
    <h1 style="color:white;margin:0;font-size:24px;">Vielen Dank für Ihre Bestellung!</h1>
  </div>
  <div style="padding:24px;">
    <p>Hallo ${escapeHtml(customer.firstName)},</p>
    <p>Ihre Bestellung <strong>${escapeHtml(orderId)}</strong> wurde erfolgreich aufgenommen.</p>

    <h3 style="color:#6B7F3B;border-bottom:2px solid #6B7F3B;padding-bottom:8px;">Bestellübersicht</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead>
        <tr style="background:#f5f0e8;">
          <th style="padding:8px;text-align:left;">Produkt</th>
          <th style="padding:8px;text-align:center;">Menge</th>
          <th style="padding:8px;text-align:right;">Preis</th>
        </tr>
      </thead>
      <tbody>
        ${itemsTableHtml(items)}
      </tbody>
    </table>

    <table style="width:100%;margin-top:16px;">
      <tr><td style="padding:4px;">Zwischensumme</td><td style="text-align:right;">${formatEuro(subtotal)}</td></tr>
      <tr><td style="padding:4px;">Versandkosten</td><td style="text-align:right;">${shippingCost === 0 ? "Kostenlos" : formatEuro(shippingCost)}</td></tr>
      <tr style="font-weight:bold;font-size:18px;"><td style="padding:8px 4px;border-top:2px solid #3E2A1E;">Gesamt</td><td style="text-align:right;padding:8px 4px;border-top:2px solid #3E2A1E;">${formatEuro(total)}</td></tr>
    </table>

    <h3 style="color:#6B7F3B;border-bottom:2px solid #6B7F3B;padding-bottom:8px;margin-top:24px;">Lieferadresse</h3>
    <p>
      ${escapeHtml(customer.firstName)} ${escapeHtml(customer.lastName)}<br>
      ${escapeHtml(customer.street)}<br>
      ${escapeHtml(customer.postalCode)} ${escapeHtml(customer.city)}<br>
      ${escapeHtml(customer.country)}
    </p>

    <p style="margin-top:24px;color:#888;font-size:13px;">Sie erhalten eine weitere E-Mail, sobald Ihre Bestellung versendet wird.</p>
  </div>
  <div style="background:#2C1810;padding:16px;text-align:center;color:#d4c5ae;font-size:12px;">
    &copy; ${new Date().getFullYear()} Vitanatur · Bleicherweg 5, 40724 Hilden
  </div>
</body></html>`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: customer.email,
      subject: `Bestellbestätigung — ${orderId}`,
      html,
    });
    console.log("[Email] Order confirmation sent to", customer.email);
    return result;
  } catch (error) {
    console.error("[Email] Failed to send order confirmation:", error);
    return null;
  }
}

// ── New Order Notification (to store owner) ──
export async function sendNewOrderNotification(data: OrderEmailData) {
  if (!resend) {
    console.log("[Email] Resend not configured – skipping store notification");
    return null;
  }

  const { orderId, items, total, customer } = data;

  const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#3E2A1E;">
  <div style="background:#A0522D;padding:24px;text-align:center;">
    <h1 style="color:white;margin:0;">Neue Bestellung! 🎉</h1>
  </div>
  <div style="padding:24px;">
    <p><strong>Bestellung:</strong> ${escapeHtml(orderId)}</p>
    <p><strong>Kunde:</strong> ${escapeHtml(customer.firstName)} ${escapeHtml(customer.lastName)} (${escapeHtml(customer.email)})</p>
    <p><strong>Telefon:</strong> ${escapeHtml(customer.phone || "—")}</p>
    <p><strong>Adresse:</strong> ${escapeHtml(customer.street)}, ${escapeHtml(customer.postalCode)} ${escapeHtml(customer.city)}, ${escapeHtml(customer.country)}</p>
    <p><strong>Gesamt:</strong> ${formatEuro(total)}</p>

    <h3>Artikel</h3>
    <table style="width:100%;border-collapse:collapse;">
      <thead><tr style="background:#f5f0e8;">
        <th style="padding:8px;text-align:left;">Produkt</th>
        <th style="padding:8px;text-align:center;">Menge</th>
        <th style="padding:8px;text-align:right;">Preis</th>
      </tr></thead>
      <tbody>${itemsTableHtml(items)}</tbody>
    </table>
  </div>
</body></html>`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: STORE_EMAIL,
      subject: `Neue Bestellung ${orderId} — ${formatEuro(total)}`,
      html,
    });
    console.log("[Email] Store notification sent");
    return result;
  } catch (error) {
    console.error("[Email] Failed to send store notification:", error);
    return null;
  }
}

// ── Shipping Notification (to customer) ──
export async function sendShippingNotification(
  customerEmail: string,
  customerName: string,
  orderId: string,
  trackingNumber?: string
) {
  if (!resend) {
    console.log("[Email] Resend not configured – skipping shipping notification");
    return null;
  }

  const trackingSection = trackingNumber
    ? `<p>Ihre Sendungsverfolgungsnummer: <strong>${trackingNumber}</strong></p>`
    : "";

  const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#3E2A1E;">
  <div style="background:#6B7F3B;padding:24px;text-align:center;">
    <h1 style="color:white;margin:0;">Ihre Bestellung ist unterwegs!</h1>
  </div>
  <div style="padding:24px;">
    <p>Hallo ${customerName},</p>
    <p>Ihre Bestellung <strong>${escapeHtml(orderId)}</strong> wurde versendet und ist auf dem Weg zu Ihnen.</p>
    ${trackingSection}
    <p>Die voraussichtliche Lieferzeit beträgt 3–5 Werktage.</p>
    <p style="margin-top:24px;color:#888;font-size:13px;">Bei Fragen erreichen Sie uns unter info@vitanatur.com</p>
  </div>
  <div style="background:#2C1810;padding:16px;text-align:center;color:#d4c5ae;font-size:12px;">
    &copy; ${new Date().getFullYear()} Vitanatur · Bleicherweg 5, 40724 Hilden
  </div>
</body></html>`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: customerEmail,
      subject: `Ihre Bestellung ${orderId} wurde versendet`,
      html,
    });
    console.log("[Email] Shipping notification sent to", customerEmail);
    return result;
  } catch (error) {
    console.error("[Email] Failed to send shipping notification:", error);
    return null;
  }
}

// ── Welcome Email (to new customer) ──
export async function sendWelcomeEmail(email: string, name: string) {
  if (!resend) {
    console.log("[Email] Resend not configured – skipping welcome email");
    return null;
  }

  const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#3E2A1E;">
  <div style="background:#6B7F3B;padding:24px;text-align:center;">
    <h1 style="color:white;margin:0;">Willkommen bei Vitanatur!</h1>
  </div>
  <div style="padding:24px;">
    <p>Hallo ${name},</p>
    <p>vielen Dank für Ihre Registrierung bei Vitanatur. Entdecken Sie unsere handverlesenen mediterranen und orientalischen Delikatessen.</p>
    <div style="text-align:center;margin:32px 0;">
      <a href="https://vitanatur.com" style="background:#6B7F3B;color:white;padding:14px 32px;text-decoration:none;border-radius:8px;font-weight:bold;">Jetzt einkaufen</a>
    </div>
    <p>Als registrierter Kunde können Sie:</p>
    <ul>
      <li>Produktbewertungen abgeben</li>
      <li>Ihre Bestellungen verfolgen</li>
      <li>Von exklusiven Angeboten profitieren</li>
    </ul>
    <p style="color:#888;font-size:13px;margin-top:24px;">Folgen Sie uns auf Instagram: <a href="https://instagram.com/vitanatur.shop61" style="color:#6B7F3B;">@vitanatur.shop61</a></p>
  </div>
  <div style="background:#2C1810;padding:16px;text-align:center;color:#d4c5ae;font-size:12px;">
    &copy; ${new Date().getFullYear()} Vitanatur · Bleicherweg 5, 40724 Hilden
  </div>
</body></html>`;

  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Willkommen bei Vitanatur!",
      html,
    });
    console.log("[Email] Welcome email sent to", email);
    return result;
  } catch (error) {
    console.error("[Email] Failed to send welcome email:", error);
    return null;
  }
}
