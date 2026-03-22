import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

const MAX_STRING_LENGTH = 255;

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
    const orderId = sanitizeString(body.orderId, 50);
    const email = sanitizeString(body.email, 255).toLowerCase();

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 503 }
      );
    }

    // Look up the order by ID and verify email
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Verify email matches
    if (order.customer_email?.toLowerCase() !== email) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Fetch order items
    const { data: items } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", orderId);

    // Map the legacy "new" status to "pending" for the tracking system
    const statusMap: Record<string, string> = {
      new: "pending",
      processing: "preparing",
    };
    const mappedStatus = statusMap[order.status] || order.status;

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        status: mappedStatus,
        customerFirstName: order.customer_first_name,
        customerLastName: order.customer_last_name,
        total: order.total,
        subtotal: order.subtotal,
        shippingCost: order.shipping_cost,
        createdAt: order.created_at,
        items: (items || []).map((item: any) => ({
          name: item.product_name,
          variantName: item.variant_name,
          quantity: item.quantity,
          unitPrice: item.unit_price,
          totalPrice: item.total_price,
        })),
      },
    });
  } catch (error) {
    console.error("Track order error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
