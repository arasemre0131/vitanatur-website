# Vitanatur — Manuel Yapilmasi Gereken Adimlar

Bu dosya, kod tarafinda tamamlanan ozelliklerin canli ortamda calisabilmesi icin
**senin (Yasin Bey veya Emre) tarafindan yapilmasi gereken** adimlari icerir.

---

## 1. Resend API Key (E-posta Bildirimleri)

E-posta sistemi altyapisi hazir ama API key gerekiyor.

1. [resend.com](https://resend.com) adresinde ucretsiz hesap ac (100 mail/gun)
2. Dashboard → API Keys → "Create API Key"
3. Vercel'de Environment Variables'a ekle:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxx
   FROM_EMAIL=info@vitanatur.com
   STORE_NOTIFICATION_EMAIL=info@vitanatur.com
   ```
4. `.env.local` dosyasina da ayni degerleri ekle (lokal test icin)

**Not:** Mail adresi hosting ayarlanana kadar `FROM_EMAIL=onboarding@resend.dev` olarak kalacak.
Bu durumda mailler "onboarding@resend.dev" adresinden gider.

---

## 2. Cloudflare Mail Routing (info@vitanatur.com)

vitanatur.com domain'inde mail almak icin:

1. Cloudflare Dashboard → vitanatur.com → Email → Email Routing
2. "Destination addresses" bolumune kendi Gmail/Outlook adresini ekle
3. "Routing rules" bolumunde:
   - `info@vitanatur.com` → senin kisisel email adresine yonlendir
4. Dogrulama emailini onayla
5. Resend'de domain dogrulama yap:
   - Resend Dashboard → Domains → Add Domain → vitanatur.com
   - Cloudflare DNS'e gerekli MX, TXT, CNAME kayitlarini ekle
   - Dogrulama tamamlaninca `FROM_EMAIL=info@vitanatur.com` olarak guncelle

---

## 3. Supabase Auth Ayarlari (Musteri Kayit/Giris)

Urun yorumlari icin musteri hesap sistemi gerekiyor:

1. [Supabase Dashboard](https://supabase.com/dashboard) → vitanatur projesi
2. Authentication → Providers:
   - **Email** provider'in aktif oldugunu dogrula
   - "Confirm email" → **Disable** (basit tutmak icin) veya enable (onay maili icin)
   - "Minimum password length" → 6
3. Authentication → URL Configuration:
   - Site URL: `https://vitanatur.com` (veya canlı domain)

---

## 4. Reviews Tablosu Olusturma (Supabase SQL)

Yorum sistemi icin veritabani tablosu gerekiyor:

1. Supabase Dashboard → SQL Editor
2. Asagidaki dosyanin icerigini kopyala-yapistir ve calistir:
   ```
   feinkost-pro/supabase/reviews-migration.sql
   ```
3. Basarili olunca Table Editor'da `reviews` tablosunu gormelisin

---

## 5. Stripe Webhook (Onemli!)

Stripe webhook'u canli ortamda siparis kaydi + email bildirimi icin gerekli:

1. [Stripe Dashboard](https://dashboard.stripe.com/webhooks) → Webhooks → Add Endpoint
2. Endpoint URL: `https://vitanatur.com/api/stripe/webhook`
3. Events: `checkout.session.completed` secilecek
4. Webhook signing secret'i kopyala
5. Vercel Environment Variables'a ekle:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx
   ```

**Not:** Webhook olmadan Stripe odemeleri gecse bile siparis DB'ye kaydedilmez
ve email bildirimi gitmez!

---

## 6. Vercel Environment Variables (Toplu)

Vercel Dashboard → Settings → Environment Variables → asagidakileri ekle:

| Variable | Deger | Aciklama |
|----------|-------|----------|
| `RESEND_API_KEY` | re_xxx... | Resend API anahtari |
| `FROM_EMAIL` | info@vitanatur.com | Gonderici email (domain dogrulandiktan sonra) |
| `STORE_NOTIFICATION_EMAIL` | info@vitanatur.com | Yeni siparis bildirimi gidecek adres |
| `STRIPE_WEBHOOK_SECRET` | whsec_xxx... | Stripe webhook sifresi |

Mevcut olan degiskenler (zaten ayarli olmali):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD`

---

## 7. Deploy Sonrasi Kontrol Listesi

Deploy ettikten sonra su kontrolleri yap:

- [ ] Ana sayfa aciliyor, logo buyuk gorunuyor
- [ ] Yeni kategoriler (Kahveler, Caylar, Salcalar, Zuhre Ana) menude gorunuyor
- [ ] Kategori sayfalarinda urunler dogru listeleniyor
- [ ] Footer'da yeni iletisim bilgileri gorunuyor (Hilden adresi, +49 1520..., info@vitanatur.com)
- [ ] Kontakt sayfasinda Instagram linki calisiyor
- [ ] Impressum ve Datenschutz'da guncel adres var
- [ ] Sepete urun ekle → checkout → kargo ucreti 5,99 EUR gorunuyor
- [ ] 49 EUR ustu sipariste kargo ucretsiz
- [ ] Stripe odeme testi (test modu veya kucuk tutar)
- [ ] Siparis sonrasi email geliyor (Resend ayarlandiysa)
- [ ] Urun detay sayfasinda "Musteri Yorumlari" bolumu gorunuyor
- [ ] Kayit ol → giris yap → yorum yaz testi
- [ ] AGB sayfasinda kargo ucreti 5,99 EUR gorunuyor

---

## Onemli Notlar

- Resend ucretsiz plan: gunluk 100 email, aylik 3000 email
- Supabase ucretsiz plan: 50.000 auth kullanici, 500MB DB
- Stripe test modu ile gercek para cekilmeden test yapilabilir
- Reviews tablosu olusturulmadan yorum sistemi CALISMAZ (404 hatasi verir)
