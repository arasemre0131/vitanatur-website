import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import sharp from "sharp";
import { nanoid } from "nanoid";
import { validateSession } from "@/lib/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif", "heic", "heif"]);
const VIDEO_EXTS = new Set(["mp4", "mov", "webm"]);
const MAX_IMAGE = 10 * 1024 * 1024; // 10MB
const MAX_VIDEO = 50 * 1024 * 1024; // 50MB

function getExt(name: string): string {
  return (name.split(".").pop() || "").toLowerCase();
}

function isHEIC(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;
  // ftyp box at offset 4
  if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70) {
    const brand = buffer.slice(8, 12).toString("ascii");
    return ["heic", "heix", "hevc", "hevx", "heim", "heis", "mif1"].includes(brand);
  }
  return false;
}

export async function POST(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.replace("Bearer ", "") || null;
  if (!validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const ext = getExt(file.name);
    const isImage = IMAGE_EXTS.has(ext) || file.type.startsWith("image/");
    const isVideo = VIDEO_EXTS.has(ext) || file.type.startsWith("video/");

    if (!isImage && !isVideo) {
      return NextResponse.json({ error: "Unsupported format" }, { status: 400 });
    }

    const maxSize = isVideo ? MAX_VIDEO : MAX_IMAGE;
    if (file.size > maxSize) {
      return NextResponse.json({ error: `File too large (max ${maxSize / 1024 / 1024}MB)` }, { status: 400 });
    }

    const arrayBuf = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    const supabase = createClient(supabaseUrl, supabaseKey);

    let uploadBuffer: Buffer | Uint8Array = buffer;
    let contentType = file.type;
    let finalExt = ext;

    // Image processing with sharp
    if (isImage) {
      const heic = isHEIC(buffer) || ext === "heic" || ext === "heif";

      try {
        let pipeline = sharp(buffer, { failOn: "none" });

        // Resize if too large
        const meta = await pipeline.metadata();
        if ((meta.width ?? 0) > 2000 || (meta.height ?? 0) > 2000) {
          pipeline = pipeline.resize(2000, 2000, { fit: "inside", withoutEnlargement: true });
        }

        // Convert to WebP (handles HEIC, PNG, GIF, etc.)
        uploadBuffer = await pipeline.webp({ quality: 85 }).toBuffer();
        contentType = "image/webp";
        finalExt = "webp";
      } catch (sharpErr) {
        console.error("[upload] Sharp error, uploading original:", sharpErr);
        // Fallback: upload original
      }
    }

    // Generate unique path
    const id = nanoid(12);
    const folder = isVideo ? "videos" : "images";
    const storagePath = `${folder}/${id}.${finalExt}`;

    // Upload to Supabase Storage
    const { error: uploadErr } = await supabase.storage
      .from("product-images")
      .upload(storagePath, uploadBuffer, {
        contentType,
        cacheControl: "31536000",
        upsert: false,
      });

    if (uploadErr) {
      console.error("[upload] Storage error:", uploadErr);
      return NextResponse.json({ error: "Storage upload failed" }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("product-images")
      .getPublicUrl(storagePath);

    return NextResponse.json({
      url: urlData.publicUrl,
      type: isVideo ? "video" : "image",
      size: uploadBuffer.length,
      originalName: file.name,
    });
  } catch (err) {
    console.error("[upload] Error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
