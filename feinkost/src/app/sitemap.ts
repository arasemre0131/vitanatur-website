import { MetadataRoute } from "next";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://feinkost.de";

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date('2026-03-17'),
      changeFrequency: "weekly" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date('2026-03-17'),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date('2026-03-17'),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: new Date('2026-03-17'),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ];

  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date('2026-03-17'),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date('2026-03-17'),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
