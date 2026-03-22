import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { validateSession } from "@/lib/auth";

const VALID_STATUSES = ["pending", "confirmed", "preparing", "shipped", "delivered", "cancelled"];

function sanitizeString(value: unknown, maxLen = 255): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLen);
}

export async function PATCH(request: Request) {
  try {
    // Check for admin token in Authorization header
    const authHeader = request.headers.get("Authorization");
    const token = authHeader?.replace("Bearer ", "") || null;

    if (!validateSession(token)) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const orderId = sanitizeString(body.orderId, 50);
    const status = sanitizeString(body.status, 20);

    if (!orderId) {
      return NextResponse.json(
        { success: false, error: "Order ID is required" },
        { status: 400 }
      );
    }

    if (!status || !VALID_STATUSES.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    if (!supabase) {
      return NextResponse.json(
        { success: false, error: "Database not configured" },
        { status: 503 }
      );
    }

    // Verify the order exists before updating
    const { data: existingOrder, error: fetchError } = await supabase
      .from("orders")
      .select("id")
      .eq("id", orderId)
      .single();

    if (fetchError || !existingOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // Update the order status in Supabase
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", orderId);

    if (updateError) {
      console.error("Status update error:", updateError);
      return NextResponse.json(
        { success: false, error: "Failed to update status" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orderId,
      status,
    });
  } catch (error) {
    console.error("Status update error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
