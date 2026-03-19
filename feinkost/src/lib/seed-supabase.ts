// Run with: npx tsx src/lib/seed-supabase.ts
import { createClient } from "@supabase/supabase-js";
import { products } from "../data/products";
import { categories } from "../data/categories";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seed() {
  console.log("Seeding categories...");
  for (const cat of categories) {
    await supabase.from("categories").upsert({
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      image: cat.image,
    });
  }

  console.log("Seeding products...");
  for (const product of products) {
    // Insert product
    await supabase.from("products").upsert({
      id: product.id,
      name: product.name,
      name_tr: product.nameTr || null,
      description: product.description,
      description_tr: product.descriptionTr || null,
      price: product.price,
      category: product.category,
      weight: product.weight,
      origin: product.origin,
      in_stock: product.inStock,
      featured: product.featured,
    });

    // Insert variants
    for (const variant of product.variants) {
      await supabase.from("product_variants").upsert({
        id: variant.id,
        product_id: product.id,
        name: variant.name,
        price: variant.price,
        weight: variant.weight,
      });
    }

    // Insert images
    for (let i = 0; i < product.images.length; i++) {
      await supabase.from("product_images").upsert({
        product_id: product.id,
        url: product.images[i],
        sort_order: i,
      }, { onConflict: "product_id,sort_order" });
    }
  }

  console.log("Done! Seeded", categories.length, "categories and", products.length, "products.");
}

seed().catch(console.error);
