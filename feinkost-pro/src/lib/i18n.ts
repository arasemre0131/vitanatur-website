import { create } from "zustand";

export type Lang = "de" | "tr";

export const translations = {
  // Header
  "cart.open": { de: "Warenkorb öffnen", tr: "Sepeti aç" },
  "cart.title": { de: "Warenkorb", tr: "Sepet" },
  "cart.empty": { de: "Dein Warenkorb ist leer", tr: "Sepetin boş" },
  "cart.close": { de: "Warenkorb schließen", tr: "Sepeti kapat" },
  "cart.subtotal": { de: "Zwischensumme", tr: "Ara toplam" },
  "cart.checkout": { de: "Zur Kasse", tr: "Ödemeye geç" },
  "cart.shipping_note": { de: "Versand wird an der Kasse berechnet", tr: "Kargo ücreti kasada hesaplanır" },
  "cart.remove": { de: "Entfernen", tr: "Kaldır" },

  // Homepage
  "hero.title": { de: "Mediterrane Feinkost", tr: "Akdeniz Lezzetleri" },
  "hero.subtitle": { de: "Handverlesene Delikatessen aus dem Orient", tr: "Doğu'dan özenle seçilmiş lezzetler" },
  "hero.subtitle_brand": { de: "Mediterrane Feinkost", tr: "Akdeniz Lezzetleri" },
  "hero.cta": { de: "Sortiment entdecken", tr: "Ürünleri keşfet" },
  "home.featured": { de: "Unsere Empfehlungen", tr: "Öne Çıkan Ürünler" },
  "home.categories": { de: "Unsere Kategorien", tr: "Kategoriler" },

  // Product
  "product.add_to_cart": { de: "In den Warenkorb", tr: "Sepete ekle" },
  "product.weight_select": { de: "Gewicht wählen", tr: "Gramaj seçin" },
  "product.quantity": { de: "Menge", tr: "Adet" },
  "product.origin": { de: "Herkunft", tr: "Menşei" },
  "product.weight": { de: "Gewicht", tr: "Ağırlık" },
  "product.category": { de: "Kategorie", tr: "Kategori" },
  "product.availability": { de: "Verfügbarkeit", tr: "Stok durumu" },
  "product.in_stock": { de: "Auf Lager", tr: "Stokta var" },
  "product.out_of_stock": { de: "Nicht verfügbar", tr: "Stokta yok" },
  "product.not_found": { de: "Produkt nicht gefunden", tr: "Ürün bulunamadı" },
  "product.not_found_desc": { de: "Das gesuchte Produkt existiert leider nicht.", tr: "Aradığınız ürün maalesef mevcut değil." },
  "product.back_home": { de: "Zur Startseite", tr: "Ana sayfaya dön" },

  // Categories (display names)
  "cat.gewuerze": { de: "Gewürze", tr: "Baharatlar" },
  "cat.trockenfruechte": { de: "Trockenfrüchte", tr: "Kuru Meyveler" },
  "cat.fruehstueck": { de: "Frühstück", tr: "Kahvaltılık" },
  "cat.oele": { de: "Öle", tr: "Yağlar" },
  "cat.nuesse": { de: "Nüsse", tr: "Kuruyemişler" },
  "cat.spezialitaeten": { de: "Spezialitäten", tr: "Özel Ürünler" },

  // Category descriptions
  "cat.gewuerze.desc": { de: "Handverlesene Gewürze aus dem Orient", tr: "Doğu'dan özenle seçilmiş baharatlar" },
  "cat.trockenfruechte.desc": { de: "Sonnengetrocknete Früchte höchster Qualität", tr: "En kaliteli güneşte kurutulmuş meyveler" },
  "cat.fruehstueck.desc": { de: "Traditionelle Frühstücksspezialitäten", tr: "Geleneksel kahvaltılık lezzetler" },
  "cat.oele.desc": { de: "Kaltgepresste Premiumöle", tr: "Soğuk sıkım premium yağlar" },
  "cat.nuesse.desc": { de: "Erlesene Nüsse aus dem Mittelmeerraum", tr: "Akdeniz'den seçkin kuruyemişler" },
  "cat.spezialitaeten.desc": { de: "Handgefertigte Delikatessen", tr: "El yapımı özel lezzetler" },

  // Navigation
  "nav.home": { de: "Home", tr: "Ana Sayfa" },

  // Trust bar
  "trust.shipping": { de: "Kostenloser Versand ab 49€", tr: "49€ üzeri ücretsiz kargo" },
  "trust.shipping_desc": { de: "Schnell und sicher zu Ihnen nach Hause", tr: "Hızlı ve güvenli teslimat" },
  "trust.quality": { de: "Handverlesene Qualität", tr: "Özenle seçilmiş kalite" },
  "trust.quality_desc": { de: "Jedes Produkt sorgfältig ausgewählt", tr: "Her ürün titizlikle seçildi" },
  "trust.delivery": { de: "Schnelle Lieferung", tr: "Hızlı teslimat" },
  "trust.delivery_desc": { de: "In 2–3 Werktagen bei Ihnen", tr: "2-3 iş günü içinde elinizde" },

  // Footer
  "footer.about": { de: "Handverlesene mediterrane und orientalische Delikatessen. Von Gewürzen über Trockenfrüchte bis hin zu erlesenen Ölen — Qualität, die man schmeckt.", tr: "Özenle seçilmiş Akdeniz ve Doğu lezzetleri. Baharatlardan kuru meyvelere, seçkin yağlara kadar — tadına doyulmaz kalite." },
  "footer.categories": { de: "Kategorien", tr: "Kategoriler" },
  "footer.service": { de: "Kundenservice", tr: "Müşteri Hizmetleri" },
  "footer.shipping_link": { de: "Versand & Lieferung", tr: "Kargo & Teslimat" },
  "footer.contact": { de: "Kontakt", tr: "İletişim" },
  "footer.faq": { de: "FAQ", tr: "SSS" },
  "footer.rights": { de: "Alle Rechte vorbehalten.", tr: "Tüm hakları saklıdır." },
  "footer.made_with": { de: "Handgemacht mit Liebe", tr: "Sevgiyle el yapımı" },

  // Checkout
  "checkout.title": { de: "Kasse", tr: "Ödeme" },
  "checkout.order_complete": { de: "Bestellung abgeschlossen", tr: "Sipariş tamamlandı" },
  "checkout.shipping": { de: "Versand", tr: "Teslimat" },
  "checkout.shipping_address": { de: "Versandadresse", tr: "Teslimat Adresi" },
  "checkout.payment": { de: "Zahlung", tr: "Ödeme" },
  "checkout.payment_method": { de: "Zahlungsmethode", tr: "Ödeme Yöntemi" },
  "checkout.review": { de: "Überprüfung", tr: "Onay" },
  "checkout.review_order": { de: "Bestellung überprüfen", tr: "Siparişi gözden geçir" },
  "checkout.your_order": { de: "Deine Bestellung", tr: "Siparişin" },
  "checkout.cart_empty": { de: "Dein Warenkorb ist leer.", tr: "Sepetin boş." },
  "checkout.subtotal": { de: "Zwischensumme", tr: "Ara toplam" },
  "checkout.shipping_cost": { de: "Versandkosten", tr: "Kargo ücreti" },
  "checkout.free": { de: "Kostenlos", tr: "Ücretsiz" },
  "checkout.free_shipping_remaining": { de: "Noch {amount} bis zum kostenlosen Versand", tr: "Ücretsiz kargoya {amount} kaldı" },
  "checkout.total": { de: "Gesamt", tr: "Toplam" },
  "checkout.place_order": { de: "Jetzt bestellen", tr: "Sipariş ver" },
  "checkout.processing": { de: "Bestellung wird verarbeitet...", tr: "Sipariş işleniyor..." },
  "checkout.next_payment": { de: "Weiter zur Zahlung", tr: "Ödemeye geç" },
  "checkout.back": { de: "Zurück", tr: "Geri" },
  "checkout.change": { de: "Ändern", tr: "Değiştir" },
  "checkout.articles": { de: "Artikel", tr: "Ürünler" },
  "checkout.quantity_short": { de: "Menge", tr: "Adet" },
  "checkout.firstname": { de: "Vorname", tr: "Ad" },
  "checkout.lastname": { de: "Nachname", tr: "Soyad" },
  "checkout.email": { de: "E-Mail", tr: "E-posta" },
  "checkout.phone": { de: "Telefon", tr: "Telefon" },
  "checkout.street": { de: "Straße und Hausnummer", tr: "Adres" },
  "checkout.city": { de: "Stadt", tr: "Şehir" },
  "checkout.postal": { de: "Postleitzahl", tr: "Posta kodu" },
  "checkout.country": { de: "Land", tr: "Ülke" },
  "checkout.card": { de: "Kreditkarte", tr: "Kredi kartı" },
  "checkout.card_number": { de: "Kartennummer", tr: "Kart numarası" },
  "checkout.expiry": { de: "Gültig bis", tr: "Son kullanma" },
  "checkout.paypal_redirect": { de: "Sie werden nach der Überprüfung zu PayPal weitergeleitet.", tr: "Onay sonrası PayPal'a yönlendirileceksiniz." },
  "checkout.bank_redirect": { de: "Sie werden nach der Überprüfung zu Ihrer Bank weitergeleitet.", tr: "Onay sonrası bankanıza yönlendirileceksiniz." },
  "checkout.thank_you": { de: "Vielen Dank für Ihre Bestellung!", tr: "Siparişiniz için teşekkür ederiz!" },
  "checkout.order_success": { de: "Ihre Bestellung wurde erfolgreich aufgegeben.", tr: "Siparişiniz başarıyla oluşturuldu." },
  "checkout.order_number": { de: "Bestellnummer", tr: "Sipariş numarası" },
  "checkout.confirmation_sent": { de: "Eine Bestätigung wurde an {email} gesendet.", tr: "{email} adresine onay gönderildi." },
  "checkout.continue_shopping": { de: "Weiter einkaufen", tr: "Alışverişe devam et" },
  "checkout.ssl": { de: "SSL-verschlüsselt", tr: "SSL şifreli" },
  "checkout.secure_payment": { de: "Sichere Bezahlung", tr: "Güvenli ödeme" },
  "checkout.fast_shipping": { de: "Schneller Versand", tr: "Hızlı kargo" },

  // Menu
  "menu.open": { de: "Menü öffnen", tr: "Menüyü aç" },
  "menu.close": { de: "Menü schließen", tr: "Menüyü kapat" },

  // Admin - Login
  "admin.title": { de: "Admin-Bereich", tr: "Yönetim Paneli" },
  "admin.username": { de: "Benutzername", tr: "Kullanıcı adı" },
  "admin.password": { de: "Passwort", tr: "Şifre" },
  "admin.login": { de: "Anmelden", tr: "Giriş yap" },
  "admin.login_error": { de: "Benutzername oder Passwort ist falsch.", tr: "Kullanıcı adı veya şifre hatalı." },
  "admin.logout": { de: "Abmelden", tr: "Çıkış yap" },

  // Admin - Sidebar
  "admin.products": { de: "Produkte", tr: "Ürünler" },
  "admin.sales": { de: "Verkaufsübersicht", tr: "Satış Takibi" },
  "admin.settings": { de: "Einstellungen", tr: "Ayarlar" },
  "admin.coupons": { de: "Gutscheine", tr: "Kuponlar" },
  "admin.stock": { de: "Bestand", tr: "Stok" },

  // Admin - Products
  "admin.products_title": { de: "Produkte", tr: "Ürünler" },
  "admin.products_count": { de: "Produkte im Sortiment", tr: "ürün mevcut" },
  "admin.search": { de: "Produkt suchen...", tr: "Ürün ara..." },
  "admin.all": { de: "Alle", tr: "Tümü" },
  "admin.edit": { de: "Bearbeiten", tr: "Düzenle" },
  "admin.delete": { de: "Löschen", tr: "Sil" },
  "admin.confirm_delete": { de: "Wirklich löschen?", tr: "Silmek istediğinize emin misiniz?" },
  "admin.yes": { de: "Ja", tr: "Evet" },
  "admin.no": { de: "Nein", tr: "Hayır" },
  "admin.in_stock": { de: "Auf Lager", tr: "Stokta" },
  "admin.out_of_stock": { de: "Nicht auf Lager", tr: "Stokta yok" },

  // Admin - Product Form
  "admin.edit_product": { de: "Produkt bearbeiten", tr: "Ürünü düzenle" },
  "admin.product_details": { de: "Produktdetails", tr: "Ürün detayları" },
  "admin.name_de": { de: "Name (Deutsch)", tr: "İsim (Almanca)" },
  "admin.name_tr": { de: "Name (Türkisch)", tr: "İsim (Türkçe)" },
  "admin.desc_de": { de: "Beschreibung (Deutsch)", tr: "Açıklama (Almanca)" },
  "admin.desc_tr": { de: "Beschreibung (Türkisch)", tr: "Açıklama (Türkçe)" },
  "admin.price": { de: "Preis (EUR)", tr: "Fiyat (EUR)" },
  "admin.category": { de: "Kategorie", tr: "Kategori" },
  "admin.weight": { de: "Gewicht", tr: "Ağırlık" },
  "admin.origin": { de: "Herkunft", tr: "Menşei" },
  "admin.variants": { de: "Varianten", tr: "Varyantlar" },
  "admin.add_variant": { de: "Variante hinzufügen", tr: "Varyant ekle" },
  "admin.images": { de: "Produktbilder", tr: "Ürün görselleri" },
  "admin.save": { de: "Speichern", tr: "Kaydet" },
  "admin.cancel": { de: "Abbrechen", tr: "İptal" },
  "admin.featured": { de: "Empfohlen", tr: "Öne çıkan" },
  "admin.in_stock_toggle": { de: "Auf Lager", tr: "Stokta var" },
  "admin.drag_drop": { de: "Bilder hierher ziehen", tr: "Görselleri buraya sürükleyin" },
  "admin.drag_drop_sub": { de: "oder klicken zum Auswählen", tr: "veya seçmek için tıklayın" },
  "admin.drag_drop_limit": { de: "Nur Bilddateien, max. 5 MB pro Datei", tr: "Sadece görsel dosyalar, dosya başına maks. 5 MB" },
  "admin.variant_name": { de: "Name", tr: "İsim" },
  "admin.variant_price": { de: "Preis", tr: "Fiyat" },
  "admin.variant_weight": { de: "Gewicht", tr: "Ağırlık" },

  // Admin - Sales
  "admin.sales_title": { de: "Verkaufsübersicht", tr: "Satış Özeti" },
  "admin.today": { de: "Heute", tr: "Bugün" },
  "admin.this_week": { de: "Diese Woche", tr: "Bu Hafta" },
  "admin.this_month": { de: "Diesen Monat", tr: "Bu Ay" },
  "admin.orders": { de: "Bestellungen", tr: "sipariş" },
  "admin.recent_orders": { de: "Letzte Bestellungen", tr: "Son Siparişler" },
  "admin.order_id": { de: "Bestell-Nr.", tr: "Sipariş No" },
  "admin.date": { de: "Datum", tr: "Tarih" },
  "admin.customer": { de: "Kunde", tr: "Müşteri" },
  "admin.total": { de: "Gesamt", tr: "Toplam" },
  "admin.status": { de: "Status", tr: "Durum" },
  "admin.status_new": { de: "Neu", tr: "Yeni" },
  "admin.status_processing": { de: "In Bearbeitung", tr: "Hazırlanıyor" },
  "admin.status_shipped": { de: "Versendet", tr: "Kargoda" },
  "admin.status_delivered": { de: "Zugestellt", tr: "Teslim Edildi" },

  // Admin - Settings
  "admin.settings_title": { de: "Einstellungen", tr: "Ayarlar" },
  "admin.shop_name": { de: "Shop-Name", tr: "Mağaza adı" },
  "admin.contact_email": { de: "Kontakt-E-Mail", tr: "İletişim e-postası" },
  "admin.shipping_threshold": { de: "Kostenloser Versand ab (EUR)", tr: "Ücretsiz kargo alt limiti (EUR)" },
  "admin.currency_position": { de: "Währungssymbol-Position", tr: "Para birimi simgesi konumu" },
  "admin.before_amount": { de: "Vor dem Betrag (€10)", tr: "Tutardan önce (€10)" },
  "admin.after_amount": { de: "Nach dem Betrag (10€)", tr: "Tutardan sonra (10€)" },
  "admin.saved": { de: "Einstellungen gespeichert!", tr: "Ayarlar kaydedildi!" },
  "admin.new_product": { de: "Neues Produkt", tr: "Yeni Ürün" },
  "admin.add_product": { de: "Produkt hinzufügen", tr: "Ürün ekle" },

  // Order Tracking
  "tracking.title": { de: "Bestellstatus", tr: "Sipariş Takibi" },
  "tracking.order_id": { de: "Bestellnummer", tr: "Sipariş Numarası" },
  "tracking.email": { de: "E-Mail-Adresse", tr: "E-posta Adresi" },
  "tracking.track": { de: "Bestellung verfolgen", tr: "Siparişi Takip Et" },
  "tracking.not_found": { de: "Bestellung nicht gefunden", tr: "Sipariş bulunamadı" },
  "tracking.not_found_desc": { de: "Bitte überprüfen Sie Ihre Bestellnummer und E-Mail-Adresse", tr: "Lütfen sipariş numaranızı ve e-posta adresinizi kontrol edin" },
  "tracking.status.pending": { de: "Bestellt", tr: "Sipariş Alındı" },
  "tracking.status.confirmed": { de: "Bestätigt", tr: "Onaylandı" },
  "tracking.status.preparing": { de: "In Vorbereitung", tr: "Hazırlanıyor" },
  "tracking.status.shipped": { de: "Versendet", tr: "Kargoya Verildi" },
  "tracking.status.delivered": { de: "Zugestellt", tr: "Teslim Edildi" },
  "tracking.status.cancelled": { de: "Storniert", tr: "İptal Edildi" },
  "tracking.order_date": { de: "Bestelldatum", tr: "Sipariş Tarihi" },
  "tracking.items": { de: "Bestellte Artikel", tr: "Sipariş Edilen Ürünler" },
  "tracking.total": { de: "Gesamtbetrag", tr: "Toplam Tutar" },
  "footer.tracking": { de: "Bestellstatus", tr: "Sipariş Takibi" },

  // Admin - Order Status Update
  "admin.status_pending": { de: "Bestellt", tr: "Sipariş Alındı" },
  "admin.status_confirmed": { de: "Bestätigt", tr: "Onaylandı" },
  "admin.status_preparing": { de: "In Vorbereitung", tr: "Hazırlanıyor" },
  "admin.status_cancelled": { de: "Storniert", tr: "İptal Edildi" },
  "admin.change_status": { de: "Status ändern", tr: "Durumu değiştir" },
  "admin.status_updated": { de: "Status aktualisiert", tr: "Durum güncellendi" },
  "admin.status_update_error": { de: "Fehler beim Aktualisieren", tr: "Güncelleme hatası" },

  // WhatsApp
  "whatsapp.order": { de: "Per WhatsApp bestellen", tr: "WhatsApp ile Sipariş" },
  "whatsapp.greeting": { de: "Hallo, ich möchte folgende Produkte bestellen:", tr: "Merhaba, aşağıdaki ürünleri sipariş etmek istiyorum:" },
  "whatsapp.total": { de: "Gesamt", tr: "Toplam" },

  // Cookie Consent
  "cookie.text": { de: "Diese Website verwendet Cookies, um Ihnen das beste Erlebnis zu bieten.", tr: "Bu web sitesi size en iyi deneyimi sunmak için çerezler kullanmaktadır." },
  "cookie.accept": { de: "Akzeptieren", tr: "Kabul Et" },
  "cookie.reject": { de: "Ablehnen", tr: "Reddet" },

  // Not Found
  "notfound.title": { de: "Seite nicht gefunden", tr: "Sayfa bulunamadı" },
  "notfound.description": { de: "Die gesuchte Seite existiert leider nicht oder wurde verschoben.", tr: "Aradığınız sayfa mevcut değil veya taşınmış olabilir." },
  "notfound.home": { de: "Zur Startseite", tr: "Ana sayfaya dön" },

  // Loading
  "loading.text": { de: "Laden...", tr: "Yükleniyor..." },

  // Products
  "products.notfound": { de: "Keine Produkte gefunden", tr: "Ürün bulunamadı" },
  "products.notfound.desc": { de: "In dieser Kategorie sind aktuell keine Produkte verfügbar. Schauen Sie bald wieder vorbei!", tr: "Bu kategoride şu an ürün bulunmamaktadır. Yakında tekrar kontrol edin!" },

  // Filter
  "filter.all": { de: "Alle", tr: "Tümü" },

  // Validation
  "validation.firstname": { de: "Bitte geben Sie Ihren Vornamen ein", tr: "Lütfen adınızı girin" },
  "validation.lastname": { de: "Bitte geben Sie Ihren Nachnamen ein", tr: "Lütfen soyadınızı girin" },
  "validation.email": { de: "Bitte geben Sie eine gültige E-Mail-Adresse ein", tr: "Lütfen geçerli bir e-posta adresi girin" },
  "validation.phone": { de: "Bitte geben Sie eine gültige Telefonnummer ein", tr: "Lütfen geçerli bir telefon numarası girin" },
  "validation.street": { de: "Bitte geben Sie Ihre Straße ein", tr: "Lütfen sokak adresinizi girin" },
  "validation.city": { de: "Bitte geben Sie Ihre Stadt ein", tr: "Lütfen şehrinizi girin" },
  "validation.postal": { de: "Bitte geben Sie Ihre Postleitzahl ein", tr: "Lütfen posta kodunuzu girin" },
  "validation.card": { de: "Bitte geben Sie eine gültige Kartennummer ein", tr: "Lütfen geçerli bir kart numarası girin" },
  "validation.expiry": { de: "Bitte geben Sie ein gültiges Ablaufdatum ein", tr: "Lütfen geçerli bir son kullanma tarihi girin" },
  "validation.cvc": { de: "Bitte geben Sie einen gültigen CVC ein", tr: "Lütfen geçerli bir CVC girin" },

  // Payment
  "payment.card": { de: "Kreditkarte", tr: "Kredi Kartı" },
  "payment.paypal": { de: "PayPal", tr: "PayPal" },
  "payment.sofort": { de: "Sofortüberweisung", tr: "Anında Havale" },

  // Checkout errors
  "checkout.error": { de: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.", tr: "Bir hata oluştu. Lütfen tekrar deneyin." },
  "checkout.processing_error": { de: "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.", tr: "Ödeme başarısız oldu. Lütfen tekrar deneyin." },

  // Admin - additional
  "admin.no_products": { de: "Keine Produkte gefunden.", tr: "Ürün bulunamadı." },
  "admin.no_products_yet": { de: "Noch keine Produkte vorhanden.", tr: "Henüz ürün bulunmuyor." },
  "admin.no_variants": { de: "Keine Varianten vorhanden.", tr: "Varyant bulunmuyor." },
  "admin.current_images": { de: "Aktuelle Bilder", tr: "Mevcut Görseller" },
  "admin.ordered_items": { de: "Bestellte Artikel", tr: "Sipariş Edilen Ürünler" },
  "admin.file_too_large": { de: "Datei ist zu groß. Maximale Größe: 5MB", tr: "Dosya çok büyük. Maksimum boyut: 5MB" },

  // Search
  "search.placeholder": { de: "Produkte suchen...", tr: "Ürün ara..." },
  "search.results": { de: "Ergebnisse für", tr: "sonuçlar:" },
  "search.no_results": { de: "Keine Ergebnisse gefunden", tr: "Sonuç bulunamadı" },
  "search.no_results_desc": { de: "Versuchen Sie es mit einem anderen Suchbegriff", tr: "Farklı bir arama terimi deneyin" },
  "search.result_count": { de: "Ergebnis(se)", tr: "sonuç" },

  // Error
  "error.title": { de: "Etwas ist schiefgelaufen", tr: "Bir hata oluştu" },
  "error.description": { de: "Bitte laden Sie die Seite neu.", tr: "Lütfen sayfayı yenileyin." },
  "error.reload": { de: "Seite neu laden", tr: "Sayfayı Yenile" },

  // Carousel
  "carousel.prev": { de: "Vorheriges Bild", tr: "Önceki Görsel" },
  "carousel.next": { de: "Nächstes Bild", tr: "Sonraki Görsel" },
  "carousel.goto": { de: "Bild", tr: "Görsel" },

  // Countries
  "country.de": { de: "Deutschland", tr: "Almanya" },
  "country.at": { de: "Österreich", tr: "Avusturya" },
  "country.ch": { de: "Schweiz", tr: "İsviçre" },
  "country.nl": { de: "Niederlande", tr: "Hollanda" },
  "country.be": { de: "Belgien", tr: "Belçika" },

  // Versand (Shipping) page
  "versand.title": { de: "Versand & Lieferung", tr: "Kargo & Teslimat" },
  "versand.intro": { de: "Wir liefern Ihre Bestellung schnell und sicher direkt zu Ihnen nach Hause.", tr: "Siparişlerinizi hızlı ve güvenli bir şekilde doğrudan kapınıza ulaştırıyoruz." },
  "versand.germany_title": { de: "Lieferung innerhalb Deutschlands", tr: "Almanya içinde teslimat" },
  "versand.germany_time": { de: "Lieferzeit: 3–5 Werktage", tr: "Teslimat süresi: 3–5 iş günü" },
  "versand.germany_cost": { de: "Versandkosten: 4,90 €", tr: "Kargo ücreti: 4,90 €" },
  "versand.germany_free": { de: "Kostenloser Versand ab einem Bestellwert von 49 €", tr: "49 € üzerindeki siparişlerde ücretsiz kargo" },
  "versand.austria_title": { de: "Lieferung nach Österreich & Schweiz", tr: "Avusturya & İsviçre'ye teslimat" },
  "versand.austria_time": { de: "Lieferzeit: 5–7 Werktage", tr: "Teslimat süresi: 5–7 iş günü" },
  "versand.austria_cost": { de: "Versandkosten: 9,90 €", tr: "Kargo ücreti: 9,90 €" },
  "versand.packaging_title": { de: "Verpackung", tr: "Ambalaj" },
  "versand.packaging_desc": { de: "Alle Produkte werden sorgfältig und nachhaltig verpackt, um eine einwandfreie Lieferung zu gewährleisten.", tr: "Tüm ürünler kusursuz teslimat için özenle ve sürdürülebilir şekilde ambalajlanır." },
  "versand.tracking_title": { de: "Sendungsverfolgung", tr: "Kargo takibi" },
  "versand.tracking_desc": { de: "Nach dem Versand erhalten Sie eine Tracking-Nummer per E-Mail, mit der Sie Ihre Sendung jederzeit verfolgen können.", tr: "Kargonuz gönderildikten sonra, gönderinizi takip edebileceğiniz bir takip numarası e-posta ile gönderilir." },

  // Kontakt (Contact) page
  "kontakt.title": { de: "Kontakt", tr: "İletişim" },
  "kontakt.intro": { de: "Haben Sie Fragen oder Anregungen? Wir freuen uns auf Ihre Nachricht!", tr: "Sorularınız veya önerileriniz mi var? Mesajınızı bekliyoruz!" },
  "kontakt.name": { de: "Name", tr: "İsim" },
  "kontakt.email": { de: "E-Mail", tr: "E-posta" },
  "kontakt.message": { de: "Nachricht", tr: "Mesaj" },
  "kontakt.send": { de: "Nachricht senden", tr: "Mesaj gönder" },
  "kontakt.success": { de: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.", tr: "Teşekkürler! Mesajınız başarıyla gönderildi. En kısa sürede size döneceğiz." },
  "kontakt.info_title": { de: "Unsere Kontaktdaten", tr: "İletişim bilgilerimiz" },
  "kontakt.address": { de: "Adresse", tr: "Adres" },
  "kontakt.phone": { de: "Telefon", tr: "Telefon" },
  "kontakt.hours_title": { de: "Öffnungszeiten", tr: "Çalışma saatleri" },
  "kontakt.hours_weekday": { de: "Mo–Fr: 9:00 – 18:00 Uhr", tr: "Pzt–Cum: 9:00 – 18:00" },
  "kontakt.hours_weekend": { de: "Sa–So: Geschlossen", tr: "Cmt–Paz: Kapalı" },

  // FAQ page
  "faq.title": { de: "Häufig gestellte Fragen", tr: "Sıkça sorulan sorular" },
  "faq.q1": { de: "Wie lange dauert die Lieferung?", tr: "Teslimat ne kadar sürer?" },
  "faq.a1": { de: "Innerhalb Deutschlands beträgt die Lieferzeit 3–5 Werktage. Für Österreich und die Schweiz rechnen Sie bitte mit 5–7 Werktagen.", tr: "Almanya içinde teslimat süresi 3–5 iş günüdür. Avusturya ve İsviçre için 5–7 iş günü beklemeniz gerekmektedir." },
  "faq.q2": { de: "Kann ich meine Bestellung zurückgeben?", tr: "Siparişimi iade edebilir miyim?" },
  "faq.a2": { de: "Ja, Sie können ungeöffnete Produkte innerhalb von 14 Tagen nach Erhalt zurückgeben. Bitte kontaktieren Sie unseren Kundenservice für eine Rücksendung.", tr: "Evet, açılmamış ürünleri teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. İade için lütfen müşteri hizmetlerimizle iletişime geçin." },
  "faq.q3": { de: "Welche Zahlungsmethoden akzeptieren Sie?", tr: "Hangi ödeme yöntemlerini kabul ediyorsunuz?" },
  "faq.a3": { de: "Wir akzeptieren Kreditkarte (Visa, Mastercard), PayPal, Sofortüberweisung und Banküberweisung.", tr: "Kredi kartı (Visa, Mastercard), PayPal, anında banka havalesi ve banka havalesi kabul ediyoruz." },
  "faq.q4": { de: "Sind Allergeninformationen verfügbar?", tr: "Alerjen bilgileri mevcut mu?" },
  "faq.a4": { de: "Ja, alle Allergeninformationen finden Sie auf der jeweiligen Produktseite und auf der Verpackung jedes Produkts.", tr: "Evet, tüm alerjen bilgilerini ilgili ürün sayfasında ve her ürünün ambalajında bulabilirsiniz." },
  "faq.q5": { de: "Wie soll ich die Produkte lagern?", tr: "Ürünleri nasıl saklamalıyım?" },
  "faq.a5": { de: "Unsere Trockenfrüchte und Nüsse sollten kühl und trocken gelagert werden. Öle am besten lichtgeschützt aufbewahren. Detaillierte Hinweise finden Sie auf der Produktverpackung.", tr: "Kuru meyve ve kuruyemişlerimiz serin ve kuru bir yerde saklanmalıdır. Yağları ışıktan korunarak muhafaza edin. Detaylı bilgileri ürün ambalajında bulabilirsiniz." },
  "faq.q6": { de: "Bieten Sie Großhandelspreise an?", tr: "Toptan satış fiyatları sunuyor musunuz?" },
  "faq.a6": { de: "Ja, für Großbestellungen bieten wir Sonderkonditionen an. Bitte kontaktieren Sie uns über das Kontaktformular oder per E-Mail an info@vitanatur.de.", tr: "Evet, toplu siparişler için özel fiyatlar sunuyoruz. Lütfen iletişim formumuz aracılığıyla veya info@vitanatur.de adresine e-posta ile bize ulaşın." },
  "faq.q7": { de: "Ab welchem Bestellwert ist der Versand kostenlos?", tr: "Hangi sipariş tutarından itibaren kargo ücretsiz?" },
  "faq.a7": { de: "Ab einem Bestellwert von 49 € liefern wir innerhalb Deutschlands versandkostenfrei.", tr: "49 € üzerindeki siparişlerde Almanya içinde ücretsiz kargo sunuyoruz." },
  "faq.q8": { de: "Woher stammen Ihre Produkte?", tr: "Ürünleriniz nereden geliyor?" },
  "faq.a8": { de: "Unsere Produkte stammen aus dem gesamten Mittelmeerraum und dem Orient. Jedes Produkt wird sorgfältig ausgewählt und auf Qualität geprüft.", tr: "Ürünlerimiz Akdeniz ve Doğu bölgesinden gelmektedir. Her ürün özenle seçilir ve kalite kontrolünden geçirilir." },
  // Coupons
  "coupon.title": { de: "Gutscheine", tr: "Kuponlar" },
  "coupon.code": { de: "Gutscheincode", tr: "Kupon Kodu" },
  "coupon.add": { de: "Gutschein hinzufügen", tr: "Kupon Ekle" },
  "coupon.type": { de: "Typ", tr: "Tür" },
  "coupon.type.percentage": { de: "Prozent", tr: "Yüzde" },
  "coupon.type.fixed": { de: "Festbetrag", tr: "Sabit Tutar" },
  "coupon.value": { de: "Wert", tr: "Değer" },
  "coupon.min_order": { de: "Mindestbestellwert", tr: "Minimum Sipariş" },
  "coupon.max_uses": { de: "Max. Nutzungen", tr: "Maks. Kullanım" },
  "coupon.uses": { de: "Genutzt", tr: "Kullanılan" },
  "coupon.expires": { de: "Ablaufdatum", tr: "Son Kullanma" },
  "coupon.active": { de: "Aktiv", tr: "Aktif" },
  "coupon.inactive": { de: "Inaktiv", tr: "Pasif" },
  "coupon.apply": { de: "Einlösen", tr: "Uygula" },
  "coupon.applied": { de: "Gutschein angewendet", tr: "Kupon uygulandı" },
  "coupon.discount": { de: "Rabatt", tr: "İndirim" },
  "coupon.remove": { de: "Entfernen", tr: "Kaldır" },
  "coupon.error.invalid": { de: "Ungültiger Gutscheincode", tr: "Geçersiz kupon kodu" },
  "coupon.error.expired": { de: "Gutschein ist abgelaufen", tr: "Kuponun süresi dolmuş" },
  "coupon.error.min_order": { de: "Mindestbestellwert nicht erreicht", tr: "Minimum sipariş tutarına ulaşılmadı" },
  "coupon.error.max_uses": { de: "Gutschein wurde bereits zu oft verwendet", tr: "Kupon maksimum kullanım sayısına ulaştı" },
  "coupon.generate": { de: "Code generieren", tr: "Kod Oluştur" },
  "coupon.no_coupons": { de: "Keine Gutscheine vorhanden", tr: "Henüz kupon bulunmuyor" },
  "coupon.delete_confirm": { de: "Gutschein wirklich löschen?", tr: "Kuponu silmek istediğinize emin misiniz?" },
  "coupon.unlimited": { de: "Unbegrenzt", tr: "Sınırsız" },

  // Stock Management
  "stock.title": { de: "Bestandsverwaltung", tr: "Stok Yönetimi" },
  "stock.current": { de: "Bestand", tr: "Stok" },
  "stock.threshold": { de: "Warnschwelle", tr: "Uyarı Eşiği" },
  "stock.in_stock": { de: "Auf Lager", tr: "Stokta" },
  "stock.low_stock": { de: "Niedriger Bestand", tr: "Düşük Stok" },
  "stock.out_of_stock": { de: "Ausverkauft", tr: "Tükendi" },
  "stock.low_alert": { de: "Produkte mit niedrigem Bestand", tr: "Düşük stoklu ürünler" },
  "stock.only_left": { de: "Nur noch {count} verfügbar!", tr: "Sadece {count} adet kaldı!" },
  "stock.update": { de: "Bestand aktualisieren", tr: "Stok Güncelle" },
  "stock.all": { de: "Alle", tr: "Tümü" },
  "stock.cannot_add": { de: "Nicht genügend Bestand", tr: "Yeterli stok yok" },
  "stock.name": { de: "Produkt", tr: "Ürün" },
  "stock.status": { de: "Status", tr: "Durum" },
  "stock.sort_stock": { de: "Nach Bestand sortieren", tr: "Stoka göre sırala" },
  "stock.sort_name": { de: "Nach Name sortieren", tr: "İsme göre sırala" },
  "stock.low_alert_banner": { de: "{count} Produkte haben niedrigen Bestand!", tr: "{count} üründe düşük stok!" },
  "stock.few_left": { de: "Nur noch wenige!", tr: "Son birkaç ürün!" },

  // Stripe Payment
  "checkout.secure_online_payment": { de: "Sichere Online-Zahlung", tr: "Guvenli Online Odeme" },
  "checkout.stripe_description": { de: "Sie werden zu unserem sicheren Zahlungspartner Stripe weitergeleitet. Dort konnen Sie bequem mit Kreditkarte, SOFORT, giropay oder Klarna bezahlen.", tr: "Guvenli odeme ortagi Stripe'a yonlendirileceksiniz. Orada kredi karti, SOFORT, giropay veya Klarna ile odeme yapabilirsiniz." },
  "checkout.accepted_methods": { de: "Akzeptierte Zahlungsmethoden", tr: "Kabul edilen odeme yontemleri" },
  "checkout.pay_with_stripe": { de: "Jetzt sicher bezahlen", tr: "Simdi guvenli ode" },
  "checkout.redirecting": { de: "Weiterleitung...", tr: "Yonlendiriliyor..." },
  "checkout.stripe_secure_note": { de: "Ihre Zahlung wird sicher uber Stripe abgewickelt", tr: "Odemeniz Stripe uzerinden guvenle islenecektir" },
  "checkout.payment_coming_soon": { de: "Zahlungssystem wird eingerichtet", tr: "Odeme sistemi kuruluyor" },
  "checkout.payment_coming_soon_desc": { de: "Unser Online-Zahlungssystem wird derzeit eingerichtet. Bitte versuchen Sie es spater erneut oder kontaktieren Sie uns direkt.", tr: "Online odeme sistemimiz su anda kuruluyor. Lutfen daha sonra tekrar deneyin veya bizimle dogrudan iletisime gecin." },
  "checkout.stripe_order_success": { de: "Ihre Zahlung war erfolgreich! Ihre Bestellung wird nun bearbeitet.", tr: "Odemeniz basarili! Siparisiz simdi isleniyor." },
  "checkout.session_id": { de: "Sitzungs-ID", tr: "Oturum ID" },
  "checkout.stripe_confirmation_note": { de: "Sie erhalten in Kurze eine Bestatigungsmail von Stripe.", tr: "Kisa surede Stripe'dan bir onay e-postasi alacaksiniz." },
  "checkout.payment_canceled": { de: "Zahlung abgebrochen", tr: "Odeme iptal edildi" },
  "checkout.payment_canceled_desc": { de: "Ihre Zahlung wurde abgebrochen. Ihr Warenkorb bleibt erhalten - Sie konnen es jederzeit erneut versuchen.", tr: "Odemeniz iptal edildi. Sepetiniz korunuyor - istediginiz zaman tekrar deneyebilirsiniz." },
  "checkout.retry_payment": { de: "Erneut versuchen", tr: "Tekrar dene" },
} as const;

type TranslationKey = keyof typeof translations;

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

export const useLang = create<LangState>((set, get) => ({
  lang: "tr",
  setLang: (lang) => set({ lang }),
  t: (key) => {
    const lang = get().lang;
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry["tr"] || key;
  },
}));
