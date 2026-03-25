import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vitanatur.shop";
  const lastMod = new Date();

  /* ── Static pages ── */
  const staticPages: MetadataRoute.Sitemap = [
    // Homepage — highest priority
    {
      url: baseUrl,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // Informational pages
    {
      url: `${baseUrl}/versand`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Legal pages — low priority
    {
      url: `${baseUrl}/impressum`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    // Order tracking
    {
      url: `${baseUrl}/siparis-takip`,
      lastModified: lastMod,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    // Search
    {
      url: `${baseUrl}/search`,
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: 0.6,
    },
  ];

  /* ── Category pages ── */
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: lastMod,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  /* ── Product pages ── */
  const productPages: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: lastMod,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
