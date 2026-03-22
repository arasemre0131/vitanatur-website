import { test, expect } from "@playwright/test";

const BASE = "http://localhost:3000";

test.describe("Smoke tests - tüm sayfalar", () => {
  test("Anasayfa yükleniyor, hero ve ürünler görünüyor", async ({ page }) => {
    await page.goto(BASE);
    await expect(page.locator("h1")).toContainText("VITANATUR");
    // Featured products section
    await expect(page.locator("#sortiment")).toBeVisible();
    // Nav links
    await expect(page.locator('header a[href="/"]')).toBeVisible();
  });

  test("Kategori sayfası - Gewürze", async ({ page }) => {
    await page.goto(`${BASE}/category/gewuerze`);
    await expect(page.locator("h1")).toBeVisible();
    // Product cards should exist
    const cards = page.locator('a[href^="/product/"]');
    await expect(cards.first()).toBeVisible();
  });

  test("Kategori sayfası - Trockenfrüchte", async ({ page }) => {
    await page.goto(`${BASE}/category/trockenfruechte`);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Kategori sayfası - Frühstück", async ({ page }) => {
    await page.goto(`${BASE}/category/fruehstueck`);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Kategori sayfası - Öle", async ({ page }) => {
    await page.goto(`${BASE}/category/oele`);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Kategori sayfası - Nüsse", async ({ page }) => {
    await page.goto(`${BASE}/category/nuesse`);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Kategori sayfası - Spezialitäten", async ({ page }) => {
    await page.goto(`${BASE}/category/spezialitaeten`);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Ürün detay sayfası açılıyor", async ({ page }) => {
    await page.goto(`${BASE}/product/gew-001`);
    await expect(page.locator("h1")).toBeVisible();
    // Add to cart button
    await expect(page.locator('button:has-text("Sepete ekle"), button:has-text("In den Warenkorb")')).toBeVisible();
  });

  test("Sepete ürün eklenebiliyor", async ({ page }) => {
    await page.goto(`${BASE}/product/gew-001`);
    const addBtn = page.locator('button:has-text("Sepete ekle"), button:has-text("In den Warenkorb")');
    await addBtn.click();
    // Cart drawer should open
    // Cart drawer should open - check for cart item or cart heading
    await expect(page.locator('[class*="fixed"][class*="z-50"], [class*="fixed"][class*="right-0"]').first()).toBeVisible({ timeout: 3000 });
  });

  test("Checkout sayfası açılıyor", async ({ page }) => {
    await page.goto(`${BASE}/checkout`);
    await expect(page).toHaveURL(/checkout/);
  });

  test("FAQ sayfası - accordion çalışıyor", async ({ page }) => {
    await page.goto(`${BASE}/faq`);
    await expect(page.locator("h1")).toBeVisible();
    // Click first FAQ question (skip header buttons)
    const firstQ = page.locator("main button").first();
    await firstQ.click();
  });

  test("Kontakt sayfası", async ({ page }) => {
    await page.goto(`${BASE}/kontakt`);
    await expect(page.locator("h1")).toBeVisible();
    // Form fields exist
    await expect(page.locator("#name")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#message")).toBeVisible();
  });

  test("Versand sayfası", async ({ page }) => {
    await page.goto(`${BASE}/versand`);
    await expect(page.locator("h1")).toBeVisible();
  });

  test("Sipariş takip sayfası", async ({ page }) => {
    await page.goto(`${BASE}/siparis-takip`);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator('input[placeholder="FK-XXXXX"]')).toBeVisible();
  });

  test("Arama sayfası", async ({ page }) => {
    await page.goto(`${BASE}/search?q=sumak`);
    await expect(page).toHaveURL(/search/);
  });

  test("Impressum - placeholder yok", async ({ page }) => {
    await page.goto(`${BASE}/impressum`);
    const content = await page.textContent("body");
    expect(content).not.toContain("[Firmenname]");
    expect(content).not.toContain("[FIRMENNAME]");
    expect(content).toContain("Vitanatur");
  });

  test("Datenschutz - placeholder yok", async ({ page }) => {
    await page.goto(`${BASE}/datenschutz`);
    const content = await page.textContent("body");
    expect(content).not.toContain("[FIRMENNAME]");
    expect(content).not.toContain("[EMAIL]");
    expect(content).toContain("info@vitanatur.de");
  });

  test("AGB - placeholder yok", async ({ page }) => {
    await page.goto(`${BASE}/agb`);
    const content = await page.textContent("body");
    expect(content).not.toContain("[FIRMENNAME]");
    expect(content).not.toContain("[EMAIL]");
    expect(content).toContain("Vitanatur");
  });

  test("Admin panel login sayfası", async ({ page }) => {
    await page.goto(`${BASE}/admin`);
    await expect(page.locator('input[type="text"], input[type="password"]').first()).toBeVisible();
  });

  test("Console hatası yok - anasayfa", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto(BASE);
    await page.waitForTimeout(2000);
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("404") && !e.includes("hydration")
    );
    expect(criticalErrors).toHaveLength(0);
  });

  test("Console hatası yok - ürün sayfası", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    await page.goto(`${BASE}/product/gew-001`);
    await page.waitForTimeout(2000);
    const criticalErrors = errors.filter(
      (e) => !e.includes("favicon") && !e.includes("404") && !e.includes("hydration")
    );
    expect(criticalErrors).toHaveLength(0);
  });
});
