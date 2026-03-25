import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { validateSession } from "@/lib/auth";
import { Product } from "@/types";

async function uploadDataUriToStorage(
  supabase: NonNullable<typeof supabaseAdmin>,
  productId: string,
  dataUri: string,
  index: number
): Promise<string> {
  try {
    const match = dataUri.match(/^data:(image|video)\/(\w+);base64,(.+)$/);
    if (!match) return dataUri;
    const ext = match[2] === "jpeg" ? "jpg" : match[2];
    const buffer = Buffer.from(match[3], "base64");
    const fileName = `${productId}/${Date.now()}-${index}.${ext}`;
    const { error } = await supabase.storage
      .from("product-images")
      .upload(fileName, buffer, { contentType: `${match[1]}/${match[2]}`, upsert: true });
    if (error) return dataUri;
    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return data.publicUrl;
  } catch {
    return dataUri;
  }
}

/**
 * PATCH /api/products/[id]
 * Update a single product. Requires admin auth.
 * Accepts a partial Product body (camelCase) and maps to snake_case for Supabase.
 */
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const authHeader = request.headers.get("Authorization");
  const token = authHeader?.replace("Bearer ", "") ?? null;

  if (!validateSession(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: "Database not configured" },
      { status: 503 }
    );
  }

  try {
    const body: Partial<Product> = await request.json();

    // Build the product update object (only include fields that were provided)
    const productUpdate: Record<string, unknown> = {};

    if (body.name !== undefined) productUpdate.name = body.name;
    if (body.nameTr !== undefined) productUpdate.name_tr = body.nameTr;
    if (body.nameEn !== undefined) productUpdate.name_en = body.nameEn;
    if (body.description !== undefined) productUpdate.description = body.description;
    if (body.descriptionTr !== undefined) productUpdate.description_tr = body.descriptionTr;
    if (body.descriptionEn !== undefined) productUpdate.description_en = body.descriptionEn;
    if (body.price !== undefined) productUpdate.price = body.price;
    if (body.category !== undefined) productUpdate.category = body.category;
    if (body.weight !== undefined) productUpdate.weight = body.weight;
    if (body.origin !== undefined) productUpdate.origin = body.origin;
    if (body.originTr !== undefined) productUpdate.origin_tr = body.originTr;
    if (body.inStock !== undefined) productUpdate.in_stock = body.inStock;
    if (body.featured !== undefined) productUpdate.featured = body.featured;
    if (body.stock !== undefined) productUpdate.stock = body.stock;
    if (body.lowStockThreshold !== undefined) productUpdate.low_stock_threshold = body.lowStockThreshold;

    // Update main product row if there are fields to update
    if (Object.keys(productUpdate).length > 0) {
      const { error } = await supabaseAdmin
        .from("products")
        .update(productUpdate)
        .eq("id", id);

      if (error) throw error;
    }

    // Replace variants if provided
    if (body.variants !== undefined) {
      // Delete existing variants
      await supabaseAdmin
        .from("product_variants")
        .delete()
        .eq("product_id", id);

      // Insert new variants
      if (body.variants.length > 0) {
        const { error } = await supabaseAdmin
          .from("product_variants")
          .insert(
            body.variants.map((v) => ({
              id: v.id,
              product_id: id,
              name: v.name,
              price: v.price,
              weight: v.weight,
            }))
          );
        if (error) throw error;
      }
    }

    // Replace images if provided
    if (body.images !== undefined) {
      // Delete existing images
      await supabaseAdmin
        .from("product_images")
        .delete()
        .eq("product_id", id);

      // Insert new images — upload data URIs to Storage first
      if (body.images.length > 0) {
        const imageUrls = await Promise.all(
          body.images.map(async (url, idx) => {
            if (url.startsWith("data:")) {
              return await uploadDataUriToStorage(supabaseAdmin!, id, url, idx);
            }
            return url;
          })
        );
        const { error } = await supabaseAdmin
          .from("product_images")
          .insert(
            imageUrls.map((url, idx) => ({
              product_id: id,
              url,
              sort_order: idx,
            }))
          );
        if (error) throw error;
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(`[PATCH /api/products/${id}] Error:`, err);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}
