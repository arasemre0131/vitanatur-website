import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { validateSession } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

/**
 * POST /api/upload-url
 * Returns a signed upload URL for Supabase Storage.
 * Client uploads directly to Supabase — bypasses Vercel 4.5MB body limit.
 */
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  if (!validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { fileName, contentType } = await req.json();

    if (!fileName || !contentType) {
      return NextResponse.json({ error: "fileName and contentType required" }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const safeName = fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
    const isVideo = contentType.startsWith("video/");
    const folder = isVideo ? "videos" : "images";
    const storagePath = `${folder}/${Date.now()}-${safeName}`;

    // Create signed upload URL (valid 10 minutes)
    const { data, error } = await supabase.storage
      .from("product-images")
      .createSignedUploadUrl(storagePath);

    if (error) {
      console.error("[upload-url] Error:", error);
      return NextResponse.json({ error: "Failed to create upload URL" }, { status: 500 });
    }

    // Get the public URL for after upload
    const { data: publicData } = supabase.storage
      .from("product-images")
      .getPublicUrl(storagePath);

    return NextResponse.json({
      signedUrl: data.signedUrl,
      token: data.token,
      path: storagePath,
      publicUrl: publicData.publicUrl,
    });
  } catch (err) {
    console.error("[upload-url] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
