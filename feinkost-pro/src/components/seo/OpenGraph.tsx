"use client";

import { useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://vitanatur.shop";

interface OGProps {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: "website" | "article" | "product";
}

export function OpenGraphMeta({ title, description, image, url, type }: OGProps) {
  useEffect(() => {
    const setMeta = (property: string, content: string) => {
      let tag = document.querySelector(
        `meta[property="${property}"]`
      ) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("property", property);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    const setMetaName = (name: string, content: string) => {
      let tag = document.querySelector(
        `meta[name="${name}"]`
      ) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.content = content;
    };

    // Open Graph
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:image", image ? (image.startsWith("http") ? image : `${BASE_URL}${image}`) : "");
    setMeta("og:url", url.startsWith("http") ? url : `${BASE_URL}${url}`);
    setMeta("og:type", type || "website");
    setMeta("og:locale", "de_DE");
    setMeta("og:locale:alternate", "tr_TR");
    setMeta("og:site_name", "Vitanatur");

    // Twitter cards
    setMetaName("twitter:card", "summary_large_image");
    setMetaName("twitter:title", title);
    setMetaName("twitter:description", description);
    if (image) {
      setMetaName(
        "twitter:image",
        image.startsWith("http") ? image : `${BASE_URL}${image}`
      );
    }
  }, [title, description, image, url, type]);

  return null;
}

/* ── Canonical URL tag ── */
export function CanonicalUrl({ path }: { path: string }) {
  useEffect(() => {
    const href = path.startsWith("http") ? path : `${BASE_URL}${path}`;
    let link = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.href = href;

    return () => {
      // cleanup on unmount so stale canonical links don't linger
      link?.remove();
    };
  }, [path]);

  return null;
}
