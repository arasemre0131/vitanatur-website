import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function sanitize(val: unknown, max = 500): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, max);
}

// GET reviews for a product
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const productId = sanitize(searchParams.get("productId"), 100);

  if (!productId) {
    return NextResponse.json({ error: "productId required" }, { status: 400 });
  }

  // Use anon key for public reads - respects RLS
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const { data, error } = await supabase
    .from("reviews")
    .select("id, product_id, user_name, rating, comment, created_at")
    .eq("product_id", productId)
    .eq("approved", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Reviews fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }

  // Calculate average rating
  const avg = data.length > 0
    ? data.reduce((sum, r) => sum + r.rating, 0) / data.length
    : 0;

  return NextResponse.json({ reviews: data, average: Math.round(avg * 10) / 10, count: data.length });
}

// POST a new review (requires auth token)
export async function POST(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.replace("Bearer ", "");

  // Create client with user's token to respect RLS
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Verify the user token
  const { data: { user }, error: authError } = await supabase.auth.getUser(token);

  if (authError || !user) {
    return NextResponse.json({ error: "Invalid or expired session" }, { status: 401 });
  }

  const body = await request.json();
  const productId = sanitize(body.productId, 100);
  const rating = typeof body.rating === "number" ? Math.min(5, Math.max(1, Math.round(body.rating))) : 0;
  const comment = sanitize(body.comment, 1000);
  const userName = sanitize(body.userName || user.email?.split("@")[0] || "Kunde", 100);

  if (!productId || !rating || !comment || comment.length < 3) {
    return NextResponse.json(
      { error: "productId, rating (1-5), and comment (min 3 chars) are required" },
      { status: 400 }
    );
  }

  // Check if user already reviewed this product
  const { data: existing } = await supabase
    .from("reviews")
    .select("id")
    .eq("product_id", productId)
    .eq("user_id", user.id)
    .single();

  if (existing) {
    return NextResponse.json({ error: "You have already reviewed this product" }, { status: 409 });
  }

  const { data, error } = await supabase
    .from("reviews")
    .insert({
      product_id: productId,
      user_id: user.id,
      user_name: userName,
      rating,
      comment,
      approved: true,
    })
    .select()
    .single();

  if (error) {
    console.error("Review insert error:", error);
    return NextResponse.json({ error: "Failed to submit review" }, { status: 500 });
  }

  return NextResponse.json({ success: true, review: data });
}
