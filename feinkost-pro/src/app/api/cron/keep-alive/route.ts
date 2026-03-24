import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// This endpoint is called by Vercel Cron every 4 minutes
// to keep Supabase free tier from sleeping
export async function GET(request: Request) {
  // Verify cron secret (optional but recommended)
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: "Not configured" }, { status: 503 });
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { count, error } = await supabase
      .from("products")
      .select("id", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({
      ok: true,
      products: count,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("[keep-alive] Supabase ping failed:", err);
    return NextResponse.json({ ok: false, error: "Ping failed" }, { status: 500 });
  }
}
