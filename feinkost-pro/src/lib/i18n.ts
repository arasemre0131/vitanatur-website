import { create } from "zustand";

export type Lang = "de" | "tr" | "en";

export const translations = {
  // Header
  "cart.open": { de: "Warenkorb öffnen", tr: "Sepeti aç", en: "Open cart" },
  "cart.title": { de: "Warenkorb", tr: "Sepet", en: "Cart" },
  "cart.empty": { de: "Dein Warenkorb ist leer", tr: "Sepetin boş", en: "Your cart is empty" },
  "cart.close": { de: "Warenkorb schließen", tr: "Sepeti kapat", en: "Close cart" },
  "cart.subtotal": { de: "Zwischensumme", tr: "Ara toplam", en: "Subtotal" },
  "cart.checkout": { de: "Zur Kasse", tr: "Ödemeye geç", en: "Proceed to checkout" },
  "cart.shipping_note": { de: "Versand wird an der Kasse berechnet", tr: "Kargo ücreti kasada hesaplanır", en: "Shipping calculated at checkout" },
  "cart.remove": { de: "Entfernen", tr: "Kaldır", en: "Remove" },

  // Homepage
  "hero.title": { de: "Mediterrane Feinkost", tr: "Akdeniz Lezzetleri", en: "Mediterranean Delicacies" },
  "hero.subtitle": { de: "Handverlesene Delikatessen aus dem Orient", tr: "Doğu'dan özenle seçilmiş lezzetler", en: "Hand-picked delicacies from the Orient" },
  "hero.subtitle_brand": { de: "Mediterrane Feinkost", tr: "Akdeniz Lezzetleri", en: "Mediterranean Delicacies" },
  "hero.cta": { de: "Sortiment entdecken", tr: "Ürünleri keşfet", en: "Explore products" },
  "home.featured": { de: "Unsere Empfehlungen", tr: "Öne Çıkan Ürünler", en: "Our Recommendations" },
  "home.categories": { de: "Unsere Kategorien", tr: "Kategoriler", en: "Our Categories" },

  // Product
  "product.add_to_cart": { de: "In den Warenkorb", tr: "Sepete ekle", en: "Add to cart" },
  "product.weight_select": { de: "Gewicht wählen", tr: "Gramaj seçin", en: "Select weight" },
  "product.quantity": { de: "Menge", tr: "Adet", en: "Quantity" },
  "product.origin": { de: "Herkunft", tr: "Menşei", en: "Origin" },
  "product.weight": { de: "Gewicht", tr: "Ağırlık", en: "Weight" },
  "product.category": { de: "Kategorie", tr: "Kategori", en: "Category" },
  "product.availability": { de: "Verfügbarkeit", tr: "Stok durumu", en: "Availability" },
  "product.in_stock": { de: "Auf Lager", tr: "Stokta var", en: "In stock" },
  "product.out_of_stock": { de: "Nicht verfügbar", tr: "Stokta yok", en: "Out of stock" },
  "product.not_found": { de: "Produkt nicht gefunden", tr: "Ürün bulunamadı", en: "Product not found" },
  "product.not_found_desc": { de: "Das gesuchte Produkt existiert leider nicht.", tr: "Aradığınız ürün maalesef mevcut değil.", en: "The product you are looking for does not exist." },
  "product.back_home": { de: "Zur Startseite", tr: "Ana sayfaya dön", en: "Back to home" },

  // Categories (display names)
  "cat.gewuerze": { de: "Gewürze", tr: "Baharatlar", en: "Spices" },
  "cat.trockenfruechte": { de: "Trockenfrüchte", tr: "Kuru Meyveler", en: "Dried Fruits" },
  "cat.fruehstueck": { de: "Frühstück", tr: "Kahvaltılık", en: "Breakfast" },
  "cat.oele": { de: "Öle", tr: "Yağlar", en: "Oils" },
  "cat.nuesse": { de: "Nüsse", tr: "Kuruyemişler", en: "Nuts" },
  "cat.spezialitaeten": { de: "Spezialitäten", tr: "Özel Ürünler", en: "Specialties" },

  "cat.kahveler": { de: "Kaffee", tr: "Kahveler", en: "Coffee" },
  "cat.caylar": { de: "Tee", tr: "Çaylar", en: "Tea" },
  "cat.salcalar": { de: "Pasten", tr: "Salçalar", en: "Pastes" },
  "cat.zuehre-ana": { de: "Zühre Ana", tr: "Zühre Ana", en: "Zühre Ana" },

  // Category descriptions
  "cat.gewuerze.desc": { de: "Handverlesene Gewürze aus dem Orient", tr: "Doğu'dan özenle seçilmiş baharatlar", en: "Hand-picked spices from the Orient" },
  "cat.trockenfruechte.desc": { de: "Sonnengetrocknete Früchte höchster Qualität", tr: "En kaliteli güneşte kurutulmuş meyveler", en: "Sun-dried fruits of the highest quality" },
  "cat.fruehstueck.desc": { de: "Traditionelle Frühstücksspezialitäten", tr: "Geleneksel kahvaltılık lezzetler", en: "Traditional breakfast specialties" },
  "cat.oele.desc": { de: "Kaltgepresste Premiumöle", tr: "Soğuk sıkım premium yağlar", en: "Cold-pressed premium oils" },
  "cat.nuesse.desc": { de: "Erlesene Nüsse aus dem Mittelmeerraum", tr: "Akdeniz'den seçkin kuruyemişler", en: "Fine nuts from the Mediterranean" },
  "cat.spezialitaeten.desc": { de: "Handgefertigte Delikatessen", tr: "El yapımı özel lezzetler", en: "Handcrafted delicacies" },

  "cat.kahveler.desc": { de: "Traditioneller türkischer Kaffee", tr: "Geleneksel Türk kahveleri", en: "Traditional Turkish coffee" },
  "cat.caylar.desc": { de: "Feinste Teesorten aus der Türkei", tr: "Türkiye'den en seçkin çaylar", en: "Finest teas from Turkey" },
  "cat.salcalar.desc": { de: "Traditionelle Paprika- und Tomatenpasten", tr: "Geleneksel biber ve domates salçaları", en: "Traditional pepper and tomato pastes" },
  "cat.zuehre-ana.desc": { de: "Natürliche Gesundheitsprodukte", tr: "Doğal sağlık ürünleri", en: "Natural health products" },

  // Navigation
  "nav.home": { de: "Home", tr: "Ana Sayfa", en: "Home" },

  // Trust bar
  "trust.shipping": { de: "Kostenloser Versand ab 49€", tr: "49€ üzeri ücretsiz kargo", en: "Free shipping over €49" },
  "trust.shipping_desc": { de: "Schnell und sicher zu Ihnen nach Hause", tr: "Hızlı ve güvenli teslimat", en: "Fast and secure delivery to your door" },
  "trust.quality": { de: "Handverlesene Qualität", tr: "Özenle seçilmiş kalite", en: "Hand-picked quality" },
  "trust.quality_desc": { de: "Jedes Produkt sorgfältig ausgewählt", tr: "Her ürün titizlikle seçildi", en: "Every product carefully selected" },
  "trust.delivery": { de: "Schnelle Lieferung", tr: "Hızlı teslimat", en: "Fast delivery" },
  "trust.delivery_desc": { de: "In 2–3 Werktagen bei Ihnen", tr: "2-3 iş günü içinde elinizde", en: "Delivered in 2–3 business days" },

  // Footer
  "footer.about": { de: "Handverlesene mediterrane und orientalische Delikatessen. Von Gewürzen über Trockenfrüchte bis hin zu erlesenen Ölen — Qualität, die man schmeckt.", tr: "Özenle seçilmiş Akdeniz ve Doğu lezzetleri. Baharatlardan kuru meyvelere, seçkin yağlara kadar — tadına doyulmaz kalite.", en: "Hand-picked Mediterranean and Oriental delicacies. From spices to dried fruits to fine oils — quality you can taste." },
  "footer.categories": { de: "Kategorien", tr: "Kategoriler", en: "Categories" },
  "footer.service": { de: "Kundenservice", tr: "Müşteri Hizmetleri", en: "Customer Service" },
  "footer.shipping_link": { de: "Versand & Lieferung", tr: "Kargo & Teslimat", en: "Shipping & Delivery" },
  "footer.contact": { de: "Kontakt", tr: "İletişim", en: "Contact" },
  "footer.faq": { de: "FAQ", tr: "SSS", en: "FAQ" },
  "footer.rights": { de: "Alle Rechte vorbehalten.", tr: "Tüm hakları saklıdır.", en: "All rights reserved." },
  "footer.made_with": { de: "Handgemacht mit Liebe", tr: "Sevgiyle el yapımı", en: "Handmade with love" },

  // Checkout
  "checkout.title": { de: "Kasse", tr: "Ödeme", en: "Checkout" },
  "checkout.order_complete": { de: "Bestellung abgeschlossen", tr: "Sipariş tamamlandı", en: "Order complete" },
  "checkout.shipping": { de: "Versand", tr: "Teslimat", en: "Shipping" },
  "checkout.shipping_address": { de: "Versandadresse", tr: "Teslimat Adresi", en: "Shipping Address" },
  "checkout.payment": { de: "Zahlung", tr: "Ödeme", en: "Payment" },
  "checkout.payment_method": { de: "Zahlungsmethode", tr: "Ödeme Yöntemi", en: "Payment Method" },
  "checkout.review": { de: "Überprüfung", tr: "Onay", en: "Review" },
  "checkout.review_order": { de: "Bestellung überprüfen", tr: "Siparişi gözden geçir", en: "Review your order" },
  "checkout.your_order": { de: "Deine Bestellung", tr: "Siparişin", en: "Your Order" },
  "checkout.cart_empty": { de: "Dein Warenkorb ist leer.", tr: "Sepetin boş.", en: "Your cart is empty." },
  "checkout.subtotal": { de: "Zwischensumme", tr: "Ara toplam", en: "Subtotal" },
  "checkout.shipping_cost": { de: "Versandkosten", tr: "Kargo ücreti", en: "Shipping cost" },
  "checkout.free": { de: "Kostenlos", tr: "Ücretsiz", en: "Free" },
  "checkout.free_shipping_remaining": { de: "Noch {amount} bis zum kostenlosen Versand", tr: "Ücretsiz kargoya {amount} kaldı", en: "{amount} away from free shipping" },
  "checkout.total": { de: "Gesamt", tr: "Toplam", en: "Total" },
  "checkout.place_order": { de: "Jetzt bestellen", tr: "Sipariş ver", en: "Place order" },
  "checkout.processing": { de: "Bestellung wird verarbeitet...", tr: "Sipariş işleniyor...", en: "Processing your order..." },
  "checkout.next_payment": { de: "Weiter zur Zahlung", tr: "Ödemeye geç", en: "Continue to payment" },
  "checkout.back": { de: "Zurück", tr: "Geri", en: "Back" },
  "checkout.change": { de: "Ändern", tr: "Değiştir", en: "Change" },
  "checkout.articles": { de: "Artikel", tr: "Ürünler", en: "Items" },
  "checkout.quantity_short": { de: "Menge", tr: "Adet", en: "Qty" },
  "checkout.firstname": { de: "Vorname", tr: "Ad", en: "First name" },
  "checkout.lastname": { de: "Nachname", tr: "Soyad", en: "Last name" },
  "checkout.email": { de: "E-Mail", tr: "E-posta", en: "Email" },
  "checkout.phone": { de: "Telefon", tr: "Telefon", en: "Phone" },
  "checkout.street": { de: "Straße und Hausnummer", tr: "Adres", en: "Street and house number" },
  "checkout.city": { de: "Stadt", tr: "Şehir", en: "City" },
  "checkout.postal": { de: "Postleitzahl", tr: "Posta kodu", en: "Postal code" },
  "checkout.country": { de: "Land", tr: "Ülke", en: "Country" },
  "checkout.card": { de: "Kreditkarte", tr: "Kredi kartı", en: "Credit card" },
  "checkout.card_number": { de: "Kartennummer", tr: "Kart numarası", en: "Card number" },
  "checkout.expiry": { de: "Gültig bis", tr: "Son kullanma", en: "Expiry date" },
  "checkout.paypal_redirect": { de: "Sie werden nach der Überprüfung zu PayPal weitergeleitet.", tr: "Onay sonrası PayPal'a yönlendirileceksiniz.", en: "You will be redirected to PayPal after review." },
  "checkout.bank_redirect": { de: "Sie werden nach der Überprüfung zu Ihrer Bank weitergeleitet.", tr: "Onay sonrası bankanıza yönlendirileceksiniz.", en: "You will be redirected to your bank after review." },
  "checkout.thank_you": { de: "Vielen Dank für Ihre Bestellung!", tr: "Siparişiniz için teşekkür ederiz!", en: "Thank you for your order!" },
  "checkout.order_success": { de: "Ihre Bestellung wurde erfolgreich aufgegeben.", tr: "Siparişiniz başarıyla oluşturuldu.", en: "Your order has been placed successfully." },
  "checkout.order_number": { de: "Bestellnummer", tr: "Sipariş numarası", en: "Order number" },
  "checkout.confirmation_sent": { de: "Eine Bestätigung wurde an {email} gesendet.", tr: "{email} adresine onay gönderildi.", en: "A confirmation has been sent to {email}." },
  "checkout.continue_shopping": { de: "Weiter einkaufen", tr: "Alışverişe devam et", en: "Continue shopping" },
  "checkout.ssl": { de: "SSL-verschlüsselt", tr: "SSL şifreli", en: "SSL encrypted" },
  "checkout.secure_payment": { de: "Sichere Bezahlung", tr: "Güvenli ödeme", en: "Secure payment" },
  "checkout.fast_shipping": { de: "Schneller Versand", tr: "Hızlı kargo", en: "Fast shipping" },

  // Menu
  "menu.open": { de: "Menü öffnen", tr: "Menüyü aç", en: "Open menu" },
  "menu.close": { de: "Menü schließen", tr: "Menüyü kapat", en: "Close menu" },

  // Admin - Login
  "admin.title": { de: "Admin-Bereich", tr: "Yönetim Paneli", en: "Admin Panel" },
  "admin.username": { de: "Benutzername", tr: "Kullanıcı adı", en: "Username" },
  "admin.password": { de: "Passwort", tr: "Şifre", en: "Password" },
  "admin.login": { de: "Anmelden", tr: "Giriş yap", en: "Log in" },
  "admin.login_error": { de: "Benutzername oder Passwort ist falsch.", tr: "Kullanıcı adı veya şifre hatalı.", en: "Incorrect username or password." },
  "admin.logout": { de: "Abmelden", tr: "Çıkış yap", en: "Log out" },

  // Admin - Sidebar
  "admin.products": { de: "Produkte", tr: "Ürünler", en: "Products" },
  "admin.sales": { de: "Verkaufsübersicht", tr: "Satış Takibi", en: "Sales Overview" },
  "admin.settings": { de: "Einstellungen", tr: "Ayarlar", en: "Settings" },
  "admin.coupons": { de: "Gutscheine", tr: "Kuponlar", en: "Coupons" },
  "admin.stock": { de: "Bestand", tr: "Stok", en: "Stock" },

  // Admin - Products
  "admin.products_title": { de: "Produkte", tr: "Ürünler", en: "Products" },
  "admin.products_count": { de: "Produkte im Sortiment", tr: "ürün mevcut", en: "products in catalog" },
  "admin.search": { de: "Produkt suchen...", tr: "Ürün ara...", en: "Search products..." },
  "admin.all": { de: "Alle", tr: "Tümü", en: "All" },
  "admin.edit": { de: "Bearbeiten", tr: "Düzenle", en: "Edit" },
  "admin.delete": { de: "Löschen", tr: "Sil", en: "Delete" },
  "admin.confirm_delete": { de: "Wirklich löschen?", tr: "Silmek istediğinize emin misiniz?", en: "Are you sure you want to delete?" },
  "admin.yes": { de: "Ja", tr: "Evet", en: "Yes" },
  "admin.no": { de: "Nein", tr: "Hayır", en: "No" },
  "admin.in_stock": { de: "Auf Lager", tr: "Stokta", en: "In stock" },
  "admin.out_of_stock": { de: "Nicht auf Lager", tr: "Stokta yok", en: "Out of stock" },

  // Admin - Product Form
  "admin.edit_product": { de: "Produkt bearbeiten", tr: "Ürünü düzenle", en: "Edit product" },
  "admin.product_details": { de: "Produktdetails", tr: "Ürün detayları", en: "Product details" },
  "admin.name_de": { de: "Name (Deutsch)", tr: "İsim (Almanca)", en: "Name (German)" },
  "admin.name_tr": { de: "Name (Türkisch)", tr: "İsim (Türkçe)", en: "Name (Turkish)" },
  "admin.desc_de": { de: "Beschreibung (Deutsch)", tr: "Açıklama (Almanca)", en: "Description (German)" },
  "admin.desc_tr": { de: "Beschreibung (Türkisch)", tr: "Açıklama (Türkçe)", en: "Description (Turkish)" },
  "admin.price": { de: "Preis (EUR)", tr: "Fiyat (EUR)", en: "Price (EUR)" },
  "admin.category": { de: "Kategorie", tr: "Kategori", en: "Category" },
  "admin.weight": { de: "Gewicht", tr: "Ağırlık", en: "Weight" },
  "admin.origin": { de: "Herkunft", tr: "Menşei", en: "Origin" },
  "admin.variants": { de: "Varianten", tr: "Varyantlar", en: "Variants" },
  "admin.add_variant": { de: "Variante hinzufügen", tr: "Varyant ekle", en: "Add variant" },
  "admin.images": { de: "Produktbilder", tr: "Ürün görselleri", en: "Product images" },
  "admin.save": { de: "Speichern", tr: "Kaydet", en: "Save" },
  "admin.cancel": { de: "Abbrechen", tr: "İptal", en: "Cancel" },
  "admin.featured": { de: "Empfohlen", tr: "Öne çıkan", en: "Featured" },
  "admin.in_stock_toggle": { de: "Auf Lager", tr: "Stokta var", en: "In stock" },
  "admin.drag_drop": { de: "Bilder hierher ziehen", tr: "Görselleri buraya sürükleyin", en: "Drag images here" },
  "admin.drag_drop_sub": { de: "oder klicken zum Auswählen", tr: "veya seçmek için tıklayın", en: "or click to browse" },
  "admin.drag_drop_limit": { de: "Nur Bilddateien, max. 5 MB pro Datei", tr: "Sadece görsel dosyalar, dosya başına maks. 5 MB", en: "Image files only, max 5 MB per file" },
  "admin.variant_name": { de: "Name", tr: "İsim", en: "Name" },
  "admin.variant_price": { de: "Preis", tr: "Fiyat", en: "Price" },
  "admin.variant_weight": { de: "Gewicht", tr: "Ağırlık", en: "Weight" },

  // Admin - Sales
  "admin.sales_title": { de: "Verkaufsübersicht", tr: "Satış Özeti", en: "Sales Overview" },
  "admin.today": { de: "Heute", tr: "Bugün", en: "Today" },
  "admin.this_week": { de: "Diese Woche", tr: "Bu Hafta", en: "This Week" },
  "admin.this_month": { de: "Diesen Monat", tr: "Bu Ay", en: "This Month" },
  "admin.orders": { de: "Bestellungen", tr: "sipariş", en: "orders" },
  "admin.recent_orders": { de: "Letzte Bestellungen", tr: "Son Siparişler", en: "Recent Orders" },
  "admin.order_id": { de: "Bestell-Nr.", tr: "Sipariş No", en: "Order No." },
  "admin.date": { de: "Datum", tr: "Tarih", en: "Date" },
  "admin.customer": { de: "Kunde", tr: "Müşteri", en: "Customer" },
  "admin.total": { de: "Gesamt", tr: "Toplam", en: "Total" },
  "admin.status": { de: "Status", tr: "Durum", en: "Status" },
  "admin.status_new": { de: "Neu", tr: "Yeni", en: "New" },
  "admin.status_processing": { de: "In Bearbeitung", tr: "Hazırlanıyor", en: "Processing" },
  "admin.status_shipped": { de: "Versendet", tr: "Kargoda", en: "Shipped" },
  "admin.status_delivered": { de: "Zugestellt", tr: "Teslim Edildi", en: "Delivered" },

  // Admin - Settings
  "admin.settings_title": { de: "Einstellungen", tr: "Ayarlar", en: "Settings" },
  "admin.shop_name": { de: "Shop-Name", tr: "Mağaza adı", en: "Shop name" },
  "admin.contact_email": { de: "Kontakt-E-Mail", tr: "İletişim e-postası", en: "Contact email" },
  "admin.shipping_threshold": { de: "Kostenloser Versand ab (EUR)", tr: "Ücretsiz kargo alt limiti (EUR)", en: "Free shipping threshold (EUR)" },
  "admin.currency_position": { de: "Währungssymbol-Position", tr: "Para birimi simgesi konumu", en: "Currency symbol position" },
  "admin.before_amount": { de: "Vor dem Betrag (€10)", tr: "Tutardan önce (€10)", en: "Before amount (€10)" },
  "admin.after_amount": { de: "Nach dem Betrag (10€)", tr: "Tutardan sonra (10€)", en: "After amount (10€)" },
  "admin.saved": { de: "Einstellungen gespeichert!", tr: "Ayarlar kaydedildi!", en: "Settings saved!" },
  "admin.new_product": { de: "Neues Produkt", tr: "Yeni Ürün", en: "New Product" },
  "admin.add_product": { de: "Produkt hinzufügen", tr: "Ürün ekle", en: "Add product" },

  // Order Tracking
  "tracking.title": { de: "Bestellstatus", tr: "Sipariş Takibi", en: "Order Tracking" },
  "tracking.order_id": { de: "Bestellnummer", tr: "Sipariş Numarası", en: "Order Number" },
  "tracking.email": { de: "E-Mail-Adresse", tr: "E-posta Adresi", en: "Email Address" },
  "tracking.track": { de: "Bestellung verfolgen", tr: "Siparişi Takip Et", en: "Track Order" },
  "tracking.not_found": { de: "Bestellung nicht gefunden", tr: "Sipariş bulunamadı", en: "Order not found" },
  "tracking.not_found_desc": { de: "Bitte überprüfen Sie Ihre Bestellnummer und E-Mail-Adresse", tr: "Lütfen sipariş numaranızı ve e-posta adresinizi kontrol edin", en: "Please check your order number and email address" },
  "tracking.status.pending": { de: "Bestellt", tr: "Sipariş Alındı", en: "Order Placed" },
  "tracking.status.confirmed": { de: "Bestätigt", tr: "Onaylandı", en: "Confirmed" },
  "tracking.status.preparing": { de: "In Vorbereitung", tr: "Hazırlanıyor", en: "Preparing" },
  "tracking.status.shipped": { de: "Versendet", tr: "Kargoya Verildi", en: "Shipped" },
  "tracking.status.delivered": { de: "Zugestellt", tr: "Teslim Edildi", en: "Delivered" },
  "tracking.status.cancelled": { de: "Storniert", tr: "İptal Edildi", en: "Cancelled" },
  "tracking.order_date": { de: "Bestelldatum", tr: "Sipariş Tarihi", en: "Order Date" },
  "tracking.items": { de: "Bestellte Artikel", tr: "Sipariş Edilen Ürünler", en: "Ordered Items" },
  "tracking.total": { de: "Gesamtbetrag", tr: "Toplam Tutar", en: "Total Amount" },
  "footer.tracking": { de: "Bestellstatus", tr: "Sipariş Takibi", en: "Order Tracking" },

  // Admin - Order Status Update
  "admin.status_pending": { de: "Bestellt", tr: "Sipariş Alındı", en: "Order Placed" },
  "admin.status_confirmed": { de: "Bestätigt", tr: "Onaylandı", en: "Confirmed" },
  "admin.status_preparing": { de: "In Vorbereitung", tr: "Hazırlanıyor", en: "Preparing" },
  "admin.status_cancelled": { de: "Storniert", tr: "İptal Edildi", en: "Cancelled" },
  "admin.change_status": { de: "Status ändern", tr: "Durumu değiştir", en: "Change status" },
  "admin.status_updated": { de: "Status aktualisiert", tr: "Durum güncellendi", en: "Status updated" },
  "admin.status_update_error": { de: "Fehler beim Aktualisieren", tr: "Güncelleme hatası", en: "Update error" },

  // WhatsApp
  "whatsapp.order": { de: "Per WhatsApp bestellen", tr: "WhatsApp ile Sipariş", en: "Order via WhatsApp" },
  "whatsapp.greeting": { de: "Hallo, ich möchte folgende Produkte bestellen:", tr: "Merhaba, aşağıdaki ürünleri sipariş etmek istiyorum:", en: "Hello, I would like to order the following products:" },
  "whatsapp.total": { de: "Gesamt", tr: "Toplam", en: "Total" },

  // Cookie Consent
  "cookie.text": { de: "Diese Website verwendet Cookies, um Ihnen das beste Erlebnis zu bieten.", tr: "Bu web sitesi size en iyi deneyimi sunmak için çerezler kullanmaktadır.", en: "This website uses cookies to provide you with the best experience." },
  "cookie.accept": { de: "Akzeptieren", tr: "Kabul Et", en: "Accept" },
  "cookie.reject": { de: "Ablehnen", tr: "Reddet", en: "Decline" },

  // Not Found
  "notfound.title": { de: "Seite nicht gefunden", tr: "Sayfa bulunamadı", en: "Page not found" },
  "notfound.description": { de: "Die gesuchte Seite existiert leider nicht oder wurde verschoben.", tr: "Aradığınız sayfa mevcut değil veya taşınmış olabilir.", en: "The page you are looking for does not exist or has been moved." },
  "notfound.home": { de: "Zur Startseite", tr: "Ana sayfaya dön", en: "Back to home" },

  // Loading
  "loading.text": { de: "Laden...", tr: "Yükleniyor...", en: "Loading..." },

  // Products
  "products.notfound": { de: "Keine Produkte gefunden", tr: "Ürün bulunamadı", en: "No products found" },
  "products.notfound.desc": { de: "In dieser Kategorie sind aktuell keine Produkte verfügbar. Schauen Sie bald wieder vorbei!", tr: "Bu kategoride şu an ürün bulunmamaktadır. Yakında tekrar kontrol edin!", en: "No products are currently available in this category. Check back soon!" },

  // Filter
  "filter.all": { de: "Alle", tr: "Tümü", en: "All" },

  // Validation
  "validation.firstname": { de: "Bitte geben Sie Ihren Vornamen ein", tr: "Lütfen adınızı girin", en: "Please enter your first name" },
  "validation.lastname": { de: "Bitte geben Sie Ihren Nachnamen ein", tr: "Lütfen soyadınızı girin", en: "Please enter your last name" },
  "validation.email": { de: "Bitte geben Sie eine gültige E-Mail-Adresse ein", tr: "Lütfen geçerli bir e-posta adresi girin", en: "Please enter a valid email address" },
  "validation.phone": { de: "Bitte geben Sie eine gültige Telefonnummer ein", tr: "Lütfen geçerli bir telefon numarası girin", en: "Please enter a valid phone number" },
  "validation.street": { de: "Bitte geben Sie Ihre Straße ein", tr: "Lütfen sokak adresinizi girin", en: "Please enter your street address" },
  "validation.city": { de: "Bitte geben Sie Ihre Stadt ein", tr: "Lütfen şehrinizi girin", en: "Please enter your city" },
  "validation.postal": { de: "Bitte geben Sie Ihre Postleitzahl ein", tr: "Lütfen posta kodunuzu girin", en: "Please enter your postal code" },
  "validation.card": { de: "Bitte geben Sie eine gültige Kartennummer ein", tr: "Lütfen geçerli bir kart numarası girin", en: "Please enter a valid card number" },
  "validation.expiry": { de: "Bitte geben Sie ein gültiges Ablaufdatum ein", tr: "Lütfen geçerli bir son kullanma tarihi girin", en: "Please enter a valid expiry date" },
  "validation.cvc": { de: "Bitte geben Sie einen gültigen CVC ein", tr: "Lütfen geçerli bir CVC girin", en: "Please enter a valid CVC" },

  // Payment
  "payment.card": { de: "Kreditkarte", tr: "Kredi Kartı", en: "Credit Card" },
  "payment.paypal": { de: "PayPal", tr: "PayPal", en: "PayPal" },
  "payment.sofort": { de: "Sofortüberweisung", tr: "Anında Havale", en: "Instant Bank Transfer" },

  // Checkout errors
  "checkout.error": { de: "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.", tr: "Bir hata oluştu. Lütfen tekrar deneyin.", en: "An error occurred. Please try again." },
  "checkout.processing_error": { de: "Zahlung fehlgeschlagen. Bitte versuchen Sie es erneut.", tr: "Ödeme başarısız oldu. Lütfen tekrar deneyin.", en: "Payment failed. Please try again." },

  // Admin - additional
  "admin.no_products": { de: "Keine Produkte gefunden.", tr: "Ürün bulunamadı.", en: "No products found." },
  "admin.no_products_yet": { de: "Noch keine Produkte vorhanden.", tr: "Henüz ürün bulunmuyor.", en: "No products yet." },
  "admin.no_variants": { de: "Keine Varianten vorhanden.", tr: "Varyant bulunmuyor.", en: "No variants available." },
  "admin.current_images": { de: "Aktuelle Bilder", tr: "Mevcut Görseller", en: "Current Images" },
  "admin.ordered_items": { de: "Bestellte Artikel", tr: "Sipariş Edilen Ürünler", en: "Ordered Items" },
  "admin.file_too_large": { de: "Datei ist zu groß. Maximale Größe: 5MB", tr: "Dosya çok büyük. Maksimum boyut: 5MB", en: "File is too large. Maximum size: 5MB" },

  // Search
  "search.placeholder": { de: "Produkte suchen...", tr: "Ürün ara...", en: "Search products..." },
  "search.results": { de: "Ergebnisse für", tr: "sonuçlar:", en: "Results for" },
  "search.no_results": { de: "Keine Ergebnisse gefunden", tr: "Sonuç bulunamadı", en: "No results found" },
  "search.no_results_desc": { de: "Versuchen Sie es mit einem anderen Suchbegriff", tr: "Farklı bir arama terimi deneyin", en: "Try a different search term" },
  "search.result_count": { de: "Ergebnis(se)", tr: "sonuç", en: "result(s)" },

  // Error
  "error.title": { de: "Etwas ist schiefgelaufen", tr: "Bir hata oluştu", en: "Something went wrong" },
  "error.description": { de: "Bitte laden Sie die Seite neu.", tr: "Lütfen sayfayı yenileyin.", en: "Please reload the page." },
  "error.reload": { de: "Seite neu laden", tr: "Sayfayı Yenile", en: "Reload Page" },

  // Carousel
  "carousel.prev": { de: "Vorheriges Bild", tr: "Önceki Görsel", en: "Previous Image" },
  "carousel.next": { de: "Nächstes Bild", tr: "Sonraki Görsel", en: "Next Image" },
  "carousel.goto": { de: "Bild", tr: "Görsel", en: "Image" },

  // Countries
  "country.de": { de: "Deutschland", tr: "Almanya", en: "Germany" },
  "country.at": { de: "Österreich", tr: "Avusturya", en: "Austria" },
  "country.ch": { de: "Schweiz", tr: "İsviçre", en: "Switzerland" },
  "country.nl": { de: "Niederlande", tr: "Hollanda", en: "Netherlands" },
  "country.be": { de: "Belgien", tr: "Belçika", en: "Belgium" },

  // Versand (Shipping) page
  "versand.title": { de: "Versand & Lieferung", tr: "Kargo & Teslimat", en: "Shipping & Delivery" },
  "versand.intro": { de: "Wir liefern Ihre Bestellung schnell und sicher direkt zu Ihnen nach Hause.", tr: "Siparişlerinizi hızlı ve güvenli bir şekilde doğrudan kapınıza ulaştırıyoruz.", en: "We deliver your order quickly and securely right to your door." },
  "versand.germany_title": { de: "Lieferung innerhalb Deutschlands", tr: "Almanya içinde teslimat", en: "Delivery within Germany" },
  "versand.germany_time": { de: "Lieferzeit: 3–5 Werktage", tr: "Teslimat süresi: 3–5 iş günü", en: "Delivery time: 3–5 business days" },
  "versand.germany_cost": { de: "Versandkosten: 5,99 €", tr: "Kargo ücreti: 5,99 €", en: "Shipping cost: €5.99" },
  "versand.germany_free": { de: "Kostenloser Versand ab einem Bestellwert von 49 €", tr: "49 € üzerindeki siparişlerde ücretsiz kargo", en: "Free shipping on orders over €49" },
  "versand.austria_title": { de: "Lieferung nach Österreich & Schweiz", tr: "Avusturya & İsviçre'ye teslimat", en: "Delivery to Austria & Switzerland" },
  "versand.austria_time": { de: "Lieferzeit: 5–7 Werktage", tr: "Teslimat süresi: 5–7 iş günü", en: "Delivery time: 5–7 business days" },
  "versand.austria_cost": { de: "Versandkosten: 9,90 €", tr: "Kargo ücreti: 9,90 €", en: "Shipping cost: €9.90" },
  "versand.packaging_title": { de: "Verpackung", tr: "Ambalaj", en: "Packaging" },
  "versand.packaging_desc": { de: "Alle Produkte werden sorgfältig und nachhaltig verpackt, um eine einwandfreie Lieferung zu gewährleisten.", tr: "Tüm ürünler kusursuz teslimat için özenle ve sürdürülebilir şekilde ambalajlanır.", en: "All products are carefully and sustainably packaged to ensure flawless delivery." },
  "versand.tracking_title": { de: "Sendungsverfolgung", tr: "Kargo takibi", en: "Shipment Tracking" },
  "versand.tracking_desc": { de: "Nach dem Versand erhalten Sie eine Tracking-Nummer per E-Mail, mit der Sie Ihre Sendung jederzeit verfolgen können.", tr: "Kargonuz gönderildikten sonra, gönderinizi takip edebileceğiniz bir takip numarası e-posta ile gönderilir.", en: "After shipping, you will receive a tracking number by email so you can track your shipment at any time." },

  // Kontakt (Contact) page
  "kontakt.title": { de: "Kontakt", tr: "İletişim", en: "Contact" },
  "kontakt.intro": { de: "Haben Sie Fragen oder Anregungen? Wir freuen uns auf Ihre Nachricht!", tr: "Sorularınız veya önerileriniz mi var? Mesajınızı bekliyoruz!", en: "Have questions or suggestions? We look forward to hearing from you!" },
  "kontakt.name": { de: "Name", tr: "İsim", en: "Name" },
  "kontakt.email": { de: "E-Mail", tr: "E-posta", en: "Email" },
  "kontakt.message": { de: "Nachricht", tr: "Mesaj", en: "Message" },
  "kontakt.send": { de: "Nachricht senden", tr: "Mesaj gönder", en: "Send message" },
  "kontakt.success": { de: "Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze bei Ihnen.", tr: "Teşekkürler! Mesajınız başarıyla gönderildi. En kısa sürede size döneceğiz.", en: "Thank you! Your message has been sent successfully. We will get back to you shortly." },
  "kontakt.info_title": { de: "Unsere Kontaktdaten", tr: "İletişim bilgilerimiz", en: "Our Contact Details" },
  "kontakt.address": { de: "Adresse", tr: "Adres", en: "Address" },
  "kontakt.phone": { de: "Telefon", tr: "Telefon", en: "Phone" },
  "kontakt.hours_title": { de: "Öffnungszeiten", tr: "Çalışma saatleri", en: "Business Hours" },
  "kontakt.hours_weekday": { de: "Mo–Fr: 9:00 – 18:00 Uhr", tr: "Pzt–Cum: 9:00 – 18:00", en: "Mon–Fri: 9:00 AM – 6:00 PM" },
  "kontakt.hours_weekend": { de: "Sa–So: Geschlossen", tr: "Cmt–Paz: Kapalı", en: "Sat–Sun: Closed" },

  // FAQ page
  "faq.title": { de: "Häufig gestellte Fragen", tr: "Sıkça sorulan sorular", en: "Frequently Asked Questions" },
  "faq.q1": { de: "Wie lange dauert die Lieferung?", tr: "Teslimat ne kadar sürer?", en: "How long does delivery take?" },
  "faq.a1": { de: "Innerhalb Deutschlands beträgt die Lieferzeit 3–5 Werktage. Für Österreich und die Schweiz rechnen Sie bitte mit 5–7 Werktagen.", tr: "Almanya içinde teslimat süresi 3–5 iş günüdür. Avusturya ve İsviçre için 5–7 iş günü beklemeniz gerekmektedir.", en: "Within Germany, delivery takes 3–5 business days. For Austria and Switzerland, please allow 5–7 business days." },
  "faq.q2": { de: "Kann ich meine Bestellung zurückgeben?", tr: "Siparişimi iade edebilir miyim?", en: "Can I return my order?" },
  "faq.a2": { de: "Ja, Sie können ungeöffnete Produkte innerhalb von 14 Tagen nach Erhalt zurückgeben. Bitte kontaktieren Sie unseren Kundenservice für eine Rücksendung.", tr: "Evet, açılmamış ürünleri teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. İade için lütfen müşteri hizmetlerimizle iletişime geçin.", en: "Yes, you can return unopened products within 14 days of receipt. Please contact our customer service for a return." },
  "faq.q3": { de: "Welche Zahlungsmethoden akzeptieren Sie?", tr: "Hangi ödeme yöntemlerini kabul ediyorsunuz?", en: "What payment methods do you accept?" },
  "faq.a3": { de: "Wir akzeptieren Kreditkarte (Visa, Mastercard), PayPal, Sofortüberweisung und Banküberweisung.", tr: "Kredi kartı (Visa, Mastercard), PayPal, anında banka havalesi ve banka havalesi kabul ediyoruz.", en: "We accept credit cards (Visa, Mastercard), PayPal, instant bank transfer, and wire transfer." },
  "faq.q4": { de: "Sind Allergeninformationen verfügbar?", tr: "Alerjen bilgileri mevcut mu?", en: "Is allergen information available?" },
  "faq.a4": { de: "Ja, alle Allergeninformationen finden Sie auf der jeweiligen Produktseite und auf der Verpackung jedes Produkts.", tr: "Evet, tüm alerjen bilgilerini ilgili ürün sayfasında ve her ürünün ambalajında bulabilirsiniz.", en: "Yes, all allergen information can be found on the respective product page and on each product's packaging." },
  "faq.q5": { de: "Wie soll ich die Produkte lagern?", tr: "Ürünleri nasıl saklamalıyım?", en: "How should I store the products?" },
  "faq.a5": { de: "Unsere Trockenfrüchte und Nüsse sollten kühl und trocken gelagert werden. Öle am besten lichtgeschützt aufbewahren. Detaillierte Hinweise finden Sie auf der Produktverpackung.", tr: "Kuru meyve ve kuruyemişlerimiz serin ve kuru bir yerde saklanmalıdır. Yağları ışıktan korunarak muhafaza edin. Detaylı bilgileri ürün ambalajında bulabilirsiniz.", en: "Our dried fruits and nuts should be stored in a cool, dry place. Oils are best kept away from light. Detailed instructions can be found on the product packaging." },
  "faq.q6": { de: "Bieten Sie Großhandelspreise an?", tr: "Toptan satış fiyatları sunuyor musunuz?", en: "Do you offer wholesale prices?" },
  "faq.a6": { de: "Ja, für Großbestellungen bieten wir Sonderkonditionen an. Bitte kontaktieren Sie uns über das Kontaktformular oder per E-Mail an info@vitanatur.com.", tr: "Evet, toplu siparişler için özel fiyatlar sunuyoruz. Lütfen iletişim formumuz aracılığıyla veya info@vitanatur.com adresine e-posta ile bize ulaşın.", en: "Yes, we offer special rates for bulk orders. Please contact us through the contact form or by email at info@vitanatur.com." },
  "faq.q7": { de: "Ab welchem Bestellwert ist der Versand kostenlos?", tr: "Hangi sipariş tutarından itibaren kargo ücretsiz?", en: "What is the minimum order for free shipping?" },
  "faq.a7": { de: "Ab einem Bestellwert von 49 € liefern wir innerhalb Deutschlands versandkostenfrei.", tr: "49 € üzerindeki siparişlerde Almanya içinde ücretsiz kargo sunuyoruz.", en: "We offer free shipping within Germany on orders of €49 or more." },
  "faq.q8": { de: "Woher stammen Ihre Produkte?", tr: "Ürünleriniz nereden geliyor?", en: "Where do your products come from?" },
  "faq.a8": { de: "Unsere Produkte stammen aus dem gesamten Mittelmeerraum und dem Orient. Jedes Produkt wird sorgfältig ausgewählt und auf Qualität geprüft.", tr: "Ürünlerimiz Akdeniz ve Doğu bölgesinden gelmektedir. Her ürün özenle seçilir ve kalite kontrolünden geçirilir.", en: "Our products come from across the Mediterranean and the Orient. Each product is carefully selected and quality-checked." },
  // Coupons
  "coupon.title": { de: "Gutscheine", tr: "Kuponlar", en: "Coupons" },
  "coupon.code": { de: "Gutscheincode", tr: "Kupon Kodu", en: "Coupon Code" },
  "coupon.add": { de: "Gutschein hinzufügen", tr: "Kupon Ekle", en: "Add Coupon" },
  "coupon.type": { de: "Typ", tr: "Tür", en: "Type" },
  "coupon.type.percentage": { de: "Prozent", tr: "Yüzde", en: "Percentage" },
  "coupon.type.fixed": { de: "Festbetrag", tr: "Sabit Tutar", en: "Fixed Amount" },
  "coupon.value": { de: "Wert", tr: "Değer", en: "Value" },
  "coupon.min_order": { de: "Mindestbestellwert", tr: "Minimum Sipariş", en: "Minimum Order" },
  "coupon.max_uses": { de: "Max. Nutzungen", tr: "Maks. Kullanım", en: "Max Uses" },
  "coupon.uses": { de: "Genutzt", tr: "Kullanılan", en: "Used" },
  "coupon.expires": { de: "Ablaufdatum", tr: "Son Kullanma", en: "Expiry Date" },
  "coupon.active": { de: "Aktiv", tr: "Aktif", en: "Active" },
  "coupon.inactive": { de: "Inaktiv", tr: "Pasif", en: "Inactive" },
  "coupon.apply": { de: "Einlösen", tr: "Uygula", en: "Apply" },
  "coupon.applied": { de: "Gutschein angewendet", tr: "Kupon uygulandı", en: "Coupon applied" },
  "coupon.discount": { de: "Rabatt", tr: "İndirim", en: "Discount" },
  "coupon.remove": { de: "Entfernen", tr: "Kaldır", en: "Remove" },
  "coupon.error.invalid": { de: "Ungültiger Gutscheincode", tr: "Geçersiz kupon kodu", en: "Invalid coupon code" },
  "coupon.error.expired": { de: "Gutschein ist abgelaufen", tr: "Kuponun süresi dolmuş", en: "Coupon has expired" },
  "coupon.error.min_order": { de: "Mindestbestellwert nicht erreicht", tr: "Minimum sipariş tutarına ulaşılmadı", en: "Minimum order value not reached" },
  "coupon.error.max_uses": { de: "Gutschein wurde bereits zu oft verwendet", tr: "Kupon maksimum kullanım sayısına ulaştı", en: "Coupon has reached maximum uses" },
  "coupon.generate": { de: "Code generieren", tr: "Kod Oluştur", en: "Generate Code" },
  "coupon.no_coupons": { de: "Keine Gutscheine vorhanden", tr: "Henüz kupon bulunmuyor", en: "No coupons yet" },
  "coupon.delete_confirm": { de: "Gutschein wirklich löschen?", tr: "Kuponu silmek istediğinize emin misiniz?", en: "Are you sure you want to delete this coupon?" },
  "coupon.unlimited": { de: "Unbegrenzt", tr: "Sınırsız", en: "Unlimited" },

  // Stock Management
  "stock.title": { de: "Bestandsverwaltung", tr: "Stok Yönetimi", en: "Stock Management" },
  "stock.current": { de: "Bestand", tr: "Stok", en: "Stock" },
  "stock.threshold": { de: "Warnschwelle", tr: "Uyarı Eşiği", en: "Warning Threshold" },
  "stock.in_stock": { de: "Auf Lager", tr: "Stokta", en: "In Stock" },
  "stock.low_stock": { de: "Niedriger Bestand", tr: "Düşük Stok", en: "Low Stock" },
  "stock.out_of_stock": { de: "Ausverkauft", tr: "Tükendi", en: "Sold Out" },
  "stock.low_alert": { de: "Produkte mit niedrigem Bestand", tr: "Düşük stoklu ürünler", en: "Low stock products" },
  "stock.only_left": { de: "Nur noch {count} verfügbar!", tr: "Sadece {count} adet kaldı!", en: "Only {count} left!" },
  "stock.update": { de: "Bestand aktualisieren", tr: "Stok Güncelle", en: "Update Stock" },
  "stock.all": { de: "Alle", tr: "Tümü", en: "All" },
  "stock.cannot_add": { de: "Nicht genügend Bestand", tr: "Yeterli stok yok", en: "Not enough stock" },
  "stock.name": { de: "Produkt", tr: "Ürün", en: "Product" },
  "stock.status": { de: "Status", tr: "Durum", en: "Status" },
  "stock.sort_stock": { de: "Nach Bestand sortieren", tr: "Stoka göre sırala", en: "Sort by stock" },
  "stock.sort_name": { de: "Nach Name sortieren", tr: "İsme göre sırala", en: "Sort by name" },
  "stock.low_alert_banner": { de: "{count} Produkte haben niedrigen Bestand!", tr: "{count} üründe düşük stok!", en: "{count} products have low stock!" },
  "stock.few_left": { de: "Nur noch wenige!", tr: "Son birkaç ürün!", en: "Only a few left!" },

  // Reviews
  "review.title": { de: "Kundenbewertungen", tr: "Müşteri Yorumları", en: "Customer Reviews" },
  "review.no_reviews": { de: "Noch keine Bewertungen. Seien Sie der Erste!", tr: "Henüz yorum yok. İlk yorumu siz yazın!", en: "No reviews yet. Be the first!" },
  "review.write_as": { de: "Bewertung als", tr: "Yorum yap:", en: "Review as" },
  "review.your_rating": { de: "Ihre Bewertung", tr: "Puanınız", en: "Your rating" },
  "review.your_comment": { de: "Ihr Kommentar", tr: "Yorumunuz", en: "Your comment" },
  "review.placeholder": { de: "Teilen Sie Ihre Erfahrung mit diesem Produkt...", tr: "Bu ürünle ilgili deneyiminizi paylaşın...", en: "Share your experience with this product..." },
  "review.submit": { de: "Bewertung abgeben", tr: "Yorum gönder", en: "Submit review" },
  "review.submitting": { de: "Wird gesendet...", tr: "Gönderiliyor...", en: "Submitting..." },
  "review.success": { de: "Vielen Dank für Ihre Bewertung!", tr: "Yorumunuz için teşekkürler!", en: "Thank you for your review!" },
  "review.error": { de: "Fehler beim Senden. Bitte versuchen Sie es erneut.", tr: "Gönderim hatası. Lütfen tekrar deneyin.", en: "Failed to submit. Please try again." },
  "review.login_required": { de: "Melden Sie sich an, um eine Bewertung abzugeben", tr: "Yorum yapmak için giriş yapın", en: "Log in to write a review" },
  "review.login_to_review": { de: "Anmelden / Registrieren", tr: "Giriş Yap / Kayıt Ol", en: "Log in / Register" },
  "review.login": { de: "Anmelden", tr: "Giriş Yap", en: "Log in" },
  "review.register": { de: "Registrieren", tr: "Kayıt Ol", en: "Register" },
  "review.name_placeholder": { de: "Ihr Name", tr: "Adınız", en: "Your name" },
  "review.email_placeholder": { de: "E-Mail-Adresse", tr: "E-posta adresi", en: "Email address" },
  "review.password_placeholder": { de: "Passwort (min. 6 Zeichen)", tr: "Şifre (min. 6 karakter)", en: "Password (min. 6 chars)" },
  "review.name_required": { de: "Bitte geben Sie Ihren Namen ein", tr: "Lütfen adınızı girin", en: "Please enter your name" },

  // Stripe Payment
  "checkout.secure_online_payment": { de: "Sichere Online-Zahlung", tr: "Guvenli Online Odeme", en: "Secure Online Payment" },
  "checkout.stripe_description": { de: "Sie werden zu unserem sicheren Zahlungspartner Stripe weitergeleitet. Dort konnen Sie bequem mit Kreditkarte, SOFORT, giropay oder Klarna bezahlen.", tr: "Guvenli odeme ortagi Stripe'a yonlendirileceksiniz. Orada kredi karti, SOFORT, giropay veya Klarna ile odeme yapabilirsiniz.", en: "You will be redirected to our secure payment partner Stripe. There you can conveniently pay with credit card, SOFORT, giropay, or Klarna." },
  "checkout.accepted_methods": { de: "Akzeptierte Zahlungsmethoden", tr: "Kabul edilen odeme yontemleri", en: "Accepted payment methods" },
  "checkout.pay_with_stripe": { de: "Jetzt sicher bezahlen", tr: "Simdi guvenli ode", en: "Pay securely now" },
  "checkout.redirecting": { de: "Weiterleitung...", tr: "Yonlendiriliyor...", en: "Redirecting..." },
  "checkout.stripe_secure_note": { de: "Ihre Zahlung wird sicher uber Stripe abgewickelt", tr: "Odemeniz Stripe uzerinden guvenle islenecektir", en: "Your payment is securely processed through Stripe" },
  "checkout.payment_coming_soon": { de: "Zahlungssystem wird eingerichtet", tr: "Odeme sistemi kuruluyor", en: "Payment system is being set up" },
  "checkout.payment_coming_soon_desc": { de: "Unser Online-Zahlungssystem wird derzeit eingerichtet. Bitte versuchen Sie es spater erneut oder kontaktieren Sie uns direkt.", tr: "Online odeme sistemimiz su anda kuruluyor. Lutfen daha sonra tekrar deneyin veya bizimle dogrudan iletisime gecin.", en: "Our online payment system is currently being set up. Please try again later or contact us directly." },
  "checkout.stripe_order_success": { de: "Ihre Zahlung war erfolgreich! Ihre Bestellung wird nun bearbeitet.", tr: "Odemeniz basarili! Siparisiz simdi isleniyor.", en: "Your payment was successful! Your order is now being processed." },
  "checkout.session_id": { de: "Sitzungs-ID", tr: "Oturum ID", en: "Session ID" },
  "checkout.stripe_confirmation_note": { de: "Sie erhalten in Kurze eine Bestatigungsmail von Stripe.", tr: "Kisa surede Stripe'dan bir onay e-postasi alacaksiniz.", en: "You will receive a confirmation email from Stripe shortly." },
  "checkout.payment_canceled": { de: "Zahlung abgebrochen", tr: "Odeme iptal edildi", en: "Payment cancelled" },
  "checkout.payment_canceled_desc": { de: "Ihre Zahlung wurde abgebrochen. Ihr Warenkorb bleibt erhalten - Sie konnen es jederzeit erneut versuchen.", tr: "Odemeniz iptal edildi. Sepetiniz korunuyor - istediginiz zaman tekrar deneyebilirsiniz.", en: "Your payment has been cancelled. Your cart is still saved — you can try again at any time." },
  "checkout.retry_payment": { de: "Erneut versuchen", tr: "Tekrar dene", en: "Try again" },
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
