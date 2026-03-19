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
  "trust.shipping": { de: "Kostenloser Versand ab 49\u20AC", tr: "49\u20AC üzeri ücretsiz kargo" },
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
  "faq.a6": { de: "Ja, für Großbestellungen bieten wir Sonderkonditionen an. Bitte kontaktieren Sie uns über das Kontaktformular oder per E-Mail an hallo@feinkost.de.", tr: "Evet, toplu siparişler için özel fiyatlar sunuyoruz. Lütfen iletişim formumuz aracılığıyla veya hallo@feinkost.de adresine e-posta ile bize ulaşın." },
  "faq.q7": { de: "Ab welchem Bestellwert ist der Versand kostenlos?", tr: "Hangi sipariş tutarından itibaren kargo ücretsiz?" },
  "faq.a7": { de: "Ab einem Bestellwert von 49 € liefern wir innerhalb Deutschlands versandkostenfrei.", tr: "49 € üzerindeki siparişlerde Almanya içinde ücretsiz kargo sunuyoruz." },
  "faq.q8": { de: "Woher stammen Ihre Produkte?", tr: "Ürünleriniz nereden geliyor?" },
  "faq.a8": { de: "Unsere Produkte stammen aus dem gesamten Mittelmeerraum und dem Orient. Jedes Produkt wird sorgfältig ausgewählt und auf Qualität geprüft.", tr: "Ürünlerimiz Akdeniz ve Doğu bölgesinden gelmektedir. Her ürün özenle seçilir ve kalite kontrolünden geçirilir." },
} as const;

type TranslationKey = keyof typeof translations;

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: TranslationKey) => string;
}

export const useLang = create<LangState>((set, get) => ({
  lang: "de",
  setLang: (lang) => set({ lang }),
  t: (key) => {
    const lang = get().lang;
    const entry = translations[key];
    if (!entry) return key;
    return entry[lang] || entry["de"] || key;
  },
}));
