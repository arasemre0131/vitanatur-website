# Web Sitesi Gelistirme — Fiyat Teklifi

**Musteri:** Yasin Bey
**Proje:** Vitanatur — Dogal Urunler Online Magaza
**Tarih:** 18 Mart 2026 (Guncellendi)

---

## Basic Versiyon — Mevcut Ozellikler (4.000 TL)

Tamamen calisir durumda, modern ve mobil uyumlu bir online magaza.

| # | Modul | Detay | Durum |
|---|-------|-------|-------|
| 1 | **Ana Sayfa** | Hero alani, one cikan urunler, 6 kategori vitrini, guven bandi, gorsel carousel | MEVCUT |
| 2 | **Urun Detay Sayfasi** | Fotograf galerisi, gramaj/varyant secimi, miktar, sepete ekle | MEVCUT |
| 3 | **Kategori Sayfalari** | 6 kategori (Baharat, Kuruyemis, Kahvalti, Yag, Ceviz, Ozel), urun gridi | MEVCUT |
| 4 | **Alisveris Sepeti** | Yan panel sepet, miktar guncelleme, silme, ara toplam hesaplama | MEVCUT |
| 5 | **Checkout & Odeme** | 3 adimli kasa (kargo, odeme, inceleme), Kart/PayPal/Sofort secenekleri | MEVCUT |
| 6 | **Siparis Olusturma** | Supabase veritabanina siparis kaydi, dogrulama, sanitizasyon | MEVCUT |
| 7 | **Iki Dilli Destek (DE/TR)** | 200+ ceviri anahtari, dil degistirme, urun isimleri/aciklamalari | MEVCUT |
| 8 | **Yasal Sayfalar** | Impressum, AGB, Datenschutz — Almanya mevzuatina uygun | MEVCUT |
| 9 | **Bilgi Sayfalari** | Kargo (DE/AT/CH), SSS (8 soru), Iletisim formu | MEVCUT |
| 10 | **SEO Altyapisi** | robots.txt, sitemap.xml, meta etiketleri, sayfa basliklari | MEVCUT |
| 11 | **Cookie / GDPR** | GDPR uyumlu cerez onayi bildirimi, kabul/red secenegi | MEVCUT |
| 12 | **Hata Yonetimi** | 404 sayfasi, ErrorBoundary, loading ekrani | MEVCUT |
| 13 | **Responsive Tasarim** | Mobil/tablet/masaustu, Tailwind CSS, ozel renk paleti | MEVCUT |
| 14 | **Guvenlik Katmani** | CSP, HSTS, XSS korumasi, clickjack onleme, 8 guvenlik basligi | MEVCUT |
| 15 | **Supabase Veritabani** | orders + order_items tablolari, bulut veritabani altyapisi | MEVCUT |

**Teknolojiler:** Next.js 14, React 18, TypeScript, Tailwind CSS, Supabase

### Anlasilmis Fiyat: 4.000 TL

---

## Basic'te Olmayan — Ek Modul Fiyatlari

Bu ozellikler Basic pakette mevcut degil. Pro versiyonda hazir olarak mevcuttur.
Tek tek veya toplu (Pro paket) olarak eklenebilir.

| # | Modul | Aciklama | Tek Basina Fiyati |
|---|-------|----------|-------------------|
| 1 | **Admin Paneli** | Giris/cikis, urun CRUD, drag&drop fotograf, arama, filtreleme | 3.000 TL |
| 2 | **Satis Takip Paneli** | Gunluk/haftalik/aylik ciro, siparis listesi, durum degistirme | 2.000 TL |
| 3 | **Stok Yonetimi** | Stok seviyeleri, dusuk stok uyarisi, otomatik tukendi isaretleme | 1.200 TL |
| 4 | **Kupon / Indirim Sistemi** | Yuzdelik/sabit indirim, min. siparis, max kullanim, gecerlilik | 1.500 TL |
| 5 | **WhatsApp Siparis** | Sepetteki urunlerle tek tikla WhatsApp mesaji gonderme | 1.000 TL |
| 6 | **Telegram Bildirim** | Yeni siparislerde + sohbet mesajlarinda Telegram botu bildirimi | 1.000 TL |
| 7 | **Siparis Takibi** | Musteri tarafinda gorsel timeline ile siparis durumu sorgulama | 1.500 TL |
| 8 | **Urun Arama** | Fuzzy arama, Turkce karakter destegi, anlik sonuclar | 1.200 TL |
| 9 | **Google Analytics** | GA4, e-ticaret etkinlikleri, sayfa goruntuleme, cookie entegrasyonu | 800 TL |
| 10 | **Gelismis SEO** | JsonLd (Organization, Product, Breadcrumb), OpenGraph, LocalBusiness | 1.200 TL |
| 11 | **Canli Sohbet** | Chat widget, mesaj gecmisi, Telegram'a yonlendirme | 800 TL |
| 12 | **Magaza Ayarlari** | Magaza adi, e-posta, kargo limiti, para birimi pozisyonu | 800 TL |

> Tek tek toplam: **16.000 TL**

---

## Pro Versiyon (12.000 TL)

Basic'teki **15 modul** + yukaridaki **12 ek modul** = **27 modul dahil**

> Pro paket fiyati: **12.000 TL** (Basic dahil)
> Tasarruf: **8.000 TL** (%50 indirimli)

---

## Her Iki Versiyonda da Olmayan — Eklenebilecek Ozellikler

| Hizmet | Aciklama | Fiyat |
|--------|----------|-------|
| Gercek Odeme Entegrasyonu | Stripe, PayPal, Klarna veya banka havalesi — canli odeme isleme | 2.500 TL |
| E-posta Bildirimleri | Siparis onayi, kargo bildirimi, hosgeldin e-postalari | 2.000 TL |
| PWA Destegi | Ana ekrana ekleme, offline erisim, uygulama deneyimi | 1.500 TL |
| Urun Yorumlari / Puanlama | Musteri degerlendirme ve yildiz sistemi | 1.800 TL |
| Ek Dil Destegi (3. dil) | Ingilizce, Arapca vb. tam dil destegi ekleme | 1.000 TL |

---

## Odeme Plani

| Paket | Asama | Tutar | Zaman |
|-------|-------|-------|-------|
| Basic | Baslangic (%50) | 2.000 TL | Proje baslamadan once |
| Basic | Teslim (%50) | 2.000 TL | Projenin tamamlanmasi |
| Pro | Baslangic (%50) | 6.000 TL | Proje baslamadan once |
| Pro | Teslim (%50) | 6.000 TL | Projenin tamamlanmasi |

---

## Tahmini Teslim Suresi

| Paket | Sure |
|-------|------|
| Basic | 1-2 hafta |
| Pro | 2-3 hafta |

---

## Aylik Bakim & Destek (Opsiyonel)

| Paket | Kapsam | Fiyat |
|-------|--------|-------|
| **Temel** | Guvenlik guncellemeleri, kucuk hatalar, ayda 1 saat | 500 TL/ay |
| **Standart** | Temel + icerik guncelleme, urun ekleme destegi, ayda 3 saat | 1.000 TL/ay |
| **Premium** | Standart + yeni ozellik gelistirme, oncelikli destek, ayda 5 saat | 1.500 TL/ay |

---

## Notlar

- Hosting (Vercel vb.) ve domain maliyetleri ayrica musteri tarafindan karsilanir.
- Supabase ucretsiz plandan baslanabilir, ihtiyaca gore yukseltilebilir.
- Urun fotograflari musteri tarafindan saglanir.
- Yasal sayfalar sablon uzerinden olusturulur; hukuki danismanlik icermez.
- WhatsApp / Telegram icin gerekli hesaplar musteri tarafindan acilir.
- Teslimden sonra 14 gun ucretsiz hata duzeltme garantisi.
- Tum fiyatlar TL uzerinden gecerlidir.
- Teklif 30 gun gecerlidir.

---

*Bu teklif, Vitanatur online magaza projesi icin hazirlanmistir.*
