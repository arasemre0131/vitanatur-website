-- ============================================================================
-- Feinkost-Pro: Seed Data
-- ============================================================================
-- Populates categories, products, product_variants, and product_images
-- with all items from the static data files.
--
-- Prerequisites: Run migration.sql first to create all tables.
-- ============================================================================

BEGIN;

-- ============================================================================
-- CATEGORIES
-- ============================================================================

INSERT INTO categories (slug, name, description, image) VALUES
  ('gewuerze',       'Gewürze',        'Handverlesene Gewürze aus dem Orient',          ''),
  ('trockenfruechte','Trockenfrüchte', 'Sonnengetrocknete Früchte höchster Qualität',   ''),
  ('fruehstueck',    'Frühstück',      'Traditionelle Frühstücksspezialitäten',          ''),
  ('oele',           'Öle',            'Kaltgepresste Premiumöle',                       ''),
  ('nuesse',         'Nüsse',          'Erlesene Nüsse aus dem Mittelmeerraum',          ''),
  ('spezialitaeten', 'Spezialitäten',  'Handgefertigte Delikatessen',                    '')
ON CONFLICT (slug) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  image       = EXCLUDED.image;

-- ============================================================================
-- PRODUCTS
-- ============================================================================

-- ---------- Gewürze ----------

INSERT INTO products (id, name, name_tr, description, description_tr, price, category, weight, origin, in_stock, featured) VALUES
(
  'gew-001', 'Sumak', 'Sumak',
  'Hochwertiger Sumak aus der Südosttürkei, schonend gemahlen aus reifen Sumachfrüchten. Verleiht Salaten, gegrilltem Fleisch und Dips eine fruchtig-säuerliche Note.',
  'Güneydoğu Türkiye''nin olgun sumak meyvelerinden özenle öğütülmüş birinci sınıf sumak. Salatalara, ızgara etlere ve dip soslara meyvemsi ekşi bir lezzet katar.',
  6.00, 'gewuerze', '250g', 'Türkei', true, true
),
(
  'gew-002', 'Isot Biber', 'İsot Biber',
  'Traditionell sonnengetrockneter Isot Biber aus der Region Şanlıurfa mit rauchig-herber Schärfe. Ideal zum Würzen von Kebab, Eintöpfen und orientalischen Vorspeisen.',
  'Şanlıurfa yöresinden geleneksel güneşte kurutulmuş isot biber, dumansı ve buruk acılığıyla. Kebap, güveç ve oryantal mezelerin vazgeçilmezi.',
  5.00, 'gewuerze', '200g', 'Türkei', true, false
),
(
  'gew-003', 'Knoblauchpulver', 'Sarımsak Tozu',
  'Feines Knoblauchpulver aus türkischem Anbau, schonend getrocknet und gemahlen. Praktisch für Marinaden, Saucen und überall dort, wo intensives Knoblaucharoma gewünscht ist.',
  'Türk tarımından ince sarımsak tozu, özenle kurutulmuş ve öğütülmüş. Marinalar, soslar ve yoğun sarımsak aroması istenen her yerde kullanışlı.',
  5.00, 'gewuerze', '200g', 'Türkei', true, false
),
(
  'gew-004', 'Petersilie getrocknet', 'Kurutulmuş Maydanoz',
  'Schonend getrocknete Petersilie aus der Türkei, die ihr volles Aroma bewahrt. Perfekt zum Verfeinern von Suppen, Salaten und Fleischgerichten.',
  'Türkiye''den özenle kurutulmuş, aromasını koruyan maydanoz. Çorbalar, salatalar ve et yemeklerini tatlandırmak için mükemmel.',
  5.00, 'gewuerze', '150g', 'Türkei', true, false
),
(
  'gew-005', 'Dill Spitzen', 'Dereotu',
  'Aromatische Dillspitzen aus türkischem Anbau, sorgfältig getrocknet für langanhaltenden Geschmack. Unverzichtbar für Joghurtdips, Fischgerichte und frische Salate.',
  'Türk tarımından aromatik dereotu, uzun ömürlü lezzet için özenle kurutulmuş. Yoğurtlu diplar, balık yemekleri ve taze salatalar için vazgeçilmez.',
  5.00, 'gewuerze', '100g', 'Türkei', true, false
),
(
  'gew-006', 'Chili ganz scharf', 'Bütün Acı Biber',
  'Ganze getrocknete Chilischoten mit intensiver Schärfe aus der Türkei. Zum Einlegen, Kochen oder als dekorative Würzzutat für scharfe Gerichte geeignet.',
  'Türkiye''den yoğun acılığa sahip bütün kurutulmuş acı biberler. Turşu, yemek veya acılı yemekler için dekoratif baharat olarak uygun.',
  5.00, 'gewuerze', '150g', 'Türkei', true, false
),
(
  'gew-007', 'Scharfe Paprikapaste', 'Acı Biber Salçası',
  'Würzige Paprikapaste aus sonnengereiften türkischen Paprikaschoten mit kräftiger Schärfe. Vielseitig einsetzbar als Brotaufstrich, Marinade oder Basis für Eintöpfe und Saucen.',
  'Güneşte olgunlaşmış Türk biberlerinden kuvvetli acılıkta biber salçası. Ekmek üstü, marine veya güveç ve sos yapımında çok yönlü kullanım.',
  8.00, 'gewuerze', '1000g', 'Türkei', true, false
),
(
  'gew-008', 'Süße Paprikapaste', 'Tatlı Biber Salçası',
  'Milde Paprikapaste aus aromatischen türkischen Paprika, ohne Schärfe und mit fruchtiger Süße. Hervorragend als Aufstrich, zum Kochen oder als Zutat in Mezze-Gerichten.',
  'Aromatik Türk biberlerinden acısız, meyvemsi tatlılıkta biber salçası. Ekmek üstü, yemek pişirme veya meze yapımında harika.',
  8.00, 'gewuerze', '1000g', 'Türkei', true, false
),
(
  'gew-009', 'Tomatenmark', 'Domates Salçası',
  'Konzentriertes Tomatenmark aus sonnengereiften türkischen Tomaten, dreifach eingekocht für intensiven Geschmack. Unverzichtbare Grundzutat für Saucen, Suppen und traditionelle türkische Gerichte.',
  'Güneşte olgunlaşmış Türk domateslerinden üç kez kaynatılmış konsantre domates salçası. Soslar, çorbalar ve geleneksel Türk yemekleri için vazgeçilmez temel malzeme.',
  8.00, 'gewuerze', '1000g', 'Türkei', true, false
),
(
  'gew-010', 'Sumak Eksisi', 'Sumak Ekşisi',
  'Traditioneller Sumak-Essig aus der Türkei, hergestellt aus fermentierten Sumachfrüchten. Verleiht Salaten und Fleischgerichten eine einzigartig fruchtig-saure Würze.',
  'Fermente sumak meyvelerinden yapılmış geleneksel Türk sumak sirkesi. Salatalara ve et yemeklerine eşsiz meyvemsi ekşi bir tat verir.',
  9.00, 'gewuerze', '250ml', 'Türkei', true, false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, name_tr = EXCLUDED.name_tr,
  description = EXCLUDED.description, description_tr = EXCLUDED.description_tr,
  price = EXCLUDED.price, category = EXCLUDED.category,
  weight = EXCLUDED.weight, origin = EXCLUDED.origin,
  in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured;

-- ---------- Trockenfrüchte ----------

INSERT INTO products (id, name, name_tr, description, description_tr, price, category, weight, origin, in_stock, featured) VALUES
(
  'tro-001', 'Getrocknete Aprikosen', 'Kuru Kayısı',
  'Premium-Aprikosen aus Malatya, dem weltbesten Anbaugebiet, schonend sonnengetrocknet ohne Schwefelzusatz. Honigsüß und nährstoffreich als Snack, im Müsli oder zum Backen.',
  'Dünyanın en iyi kayısı bölgesi Malatya''dan, kükürt katkısız güneşte kurutulmuş premium kayısılar. Bal tatlılığında ve besin değeri yüksek, atıştırmalık, müsli veya fırıncılık için.',
  8.00, 'trockenfruechte', '400g', 'Türkei', true, true
),
(
  'tro-002', 'Getrocknete Maulbeeren', 'Kuru Dut',
  'Naturbelassene weiße Maulbeeren aus den Hochebenen Zentralanatoliens mit karamelliger Natursüße. Reich an Eisen und Ballaststoffen, ideal als gesunder Snack oder Topping für Joghurt.',
  'İç Anadolu yaylalarından doğal karamel tatlılığında beyaz dutlar. Demir ve lif açısından zengin, sağlıklı atıştırmalık veya yoğurt üstü için ideal.',
  6.00, 'trockenfruechte', '200g', 'Türkei', true, false
),
(
  'tro-003', 'Getrocknete Feigen', 'Kuru İncir',
  'Erstklassige Feigen aus der Ägäis-Region rund um Aydın, natürlich in der Sonne getrocknet. Samtig-süßer Geschmack und zarte Textur, reich an Ballaststoffen und Mineralstoffen.',
  'Aydın çevresindeki Ege bölgesinden birinci sınıf incirler, doğal güneşte kurutulmuş. Kadifemsi tatlı lezzet ve yumuşak dokusuyla lif ve mineraller açısından zengin.',
  7.00, 'trockenfruechte', '400g', 'Türkei', true, false
),
(
  'tro-004', 'Kernlose schwarze Trauben', 'Çekirdeksiz Siyah Üzüm',
  'Kernlose schwarze Trauben aus der Türkei, schonend getrocknet mit intensiv fruchtigem Geschmack. Vielseitig verwendbar als Snack, im Müsli, beim Backen oder in herzhaften Gerichten.',
  'Türkiye''den özenle kurutulmuş, yoğun meyvemsi lezzetli çekirdeksiz siyah üzümler. Atıştırmalık, müsli, fırıncılık veya tuzlu yemeklerde çok yönlü kullanım.',
  5.00, 'trockenfruechte', '400g', 'Türkei', true, false
),
(
  'tro-005', 'Getrocknete Sauerkirschen', 'Kuru Vişne',
  'Sonnengetrocknete Sauerkirschen aus der Türkei mit intensiv fruchtig-säuerlichem Aroma. Perfekt als Snack, zum Backen oder als besondere Zutat in Salaten und Desserts.',
  'Türkiye''den güneşte kurutulmuş, yoğun meyvemsi ekşi aromalı vişneler. Atıştırmalık, fırıncılık veya salata ve tatlılarda özel malzeme olarak mükemmel.',
  7.00, 'trockenfruechte', '200g', 'Türkei', true, false
),
(
  'tro-006', 'Medjool Datteln Choice', 'Medjool Hurma Choice',
  'Handverlesene Medjool-Datteln der Güteklasse Choice aus dem Jordantal mit weichem, karamellartigem Fruchtfleisch. Natürliche Süße ohne Zusätze, ideal als gesunder Snack oder Zuckeralternative.',
  'Ürdün Vadisi''nden el seçme Choice kalite Medjool hurmaları, yumuşak karamelli meyvesiyle. Katkısız doğal tatlılık, sağlıklı atıştırmalık veya şeker alternatifi olarak ideal.',
  12.00, 'trockenfruechte', '500g', 'Jordanien', true, true
),
(
  'tro-007', 'Medjool Datteln Premium Jumbo', 'Medjool Hurma Premium Jumbo',
  'Extragroße Premium-Jumbo-Medjool-Datteln, sorgfältig selektiert aus den besten Ernten Jordaniens. Besonders saftig, süß und fleischig – die Königin unter den Datteln für höchste Ansprüche.',
  'Ürdün''ün en iyi hasatlarından özenle seçilmiş ekstra büyük Premium Jumbo Medjool hurmaları. Özellikle sulu, tatlı ve etli — en yüksek standartlar için hurmaların kraliçesi.',
  18.00, 'trockenfruechte', '500g', 'Jordanien', true, true
),
(
  'tro-008', 'Ägyptische Premium Datteln', 'Mısır Premium Hurma',
  'Erstklassige ägyptische Datteln mit honigartiger Süße und zartschmelzendem Fruchtfleisch. In der Großpackung besonders geeignet für Familien, zum Backen oder als täglicher Energielieferant.',
  'Bal tatlılığında ve yumuşacık meyvesiyle birinci sınıf Mısır hurmaları. Aileler için, fırıncılık veya günlük enerji kaynağı olarak büyük pakette özellikle uygun.',
  15.00, 'trockenfruechte', '750g', 'Ägypten', true, false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, name_tr = EXCLUDED.name_tr,
  description = EXCLUDED.description, description_tr = EXCLUDED.description_tr,
  price = EXCLUDED.price, category = EXCLUDED.category,
  weight = EXCLUDED.weight, origin = EXCLUDED.origin,
  in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured;

-- ---------- Frühstück ----------

INSERT INTO products (id, name, name_tr, description, description_tr, price, category, weight, origin, in_stock, featured) VALUES
(
  'fru-001', 'Tahini', 'Tahin',
  'Cremiges Tahini aus 100% geröstetem Sesam, traditionell in einer Steinmühle gemahlen. Unverzichtbar für Hummus, Dressings und als nahrhafter Brotaufstrich zum Frühstück.',
  '%100 kavrulmuş susamdan, geleneksel taş değirmende öğütülmüş kremsi tahin. Humus, sos yapımı ve kahvaltıda besleyici ekmek üstü sürme olarak vazgeçilmez.',
  11.00, 'fruehstueck', '935g', 'Türkei', true, true
),
(
  'fru-002', 'Traubenmelasse', 'Üzüm Pekmezi',
  'Naturreine Traubenmelasse (Pekmez) aus eingedicktem Traubenmost, ganz ohne Zuckerzusatz hergestellt. Reich an Eisen und Kalzium, traditionell zum Frühstück mit Tahini genossen.',
  'Şeker katkısız, kaynatılmış üzüm şırasından yapılmış saf üzüm pekmezi. Demir ve kalsiyum açısından zengin, geleneksel olarak kahvaltıda tahinle birlikte tüketilir.',
  10.00, 'fruehstueck', '1kg', 'Türkei', true, false
),
(
  'fru-003', 'Johannisbrotmelasse', 'Keçiboynuzu Pekmezi',
  'Traditionelle Johannisbrotmelasse aus der Türkei mit mild-süßem, malzigem Geschmack. Natürlich reich an Mineralstoffen und vielseitig einsetzbar als Brotaufstrich oder zum Süßen von Getränken.',
  'Türkiye''den hafif tatlı, maltımsı lezzetiyle geleneksel keçiboynuzu pekmezi. Doğal mineral açısından zengin, ekmek üstü veya içecek tatlandırıcısı olarak çok yönlü.',
  10.00, 'fruehstueck', '620g', 'Türkei', true, false
),
(
  'fru-004', 'Karakovan Blütenhonig', 'Karakovan Çiçek Balı',
  'Naturbelassener Karakovan-Blütenhonig von wild lebenden Bienen aus den Bergregionen der türkischen Schwarzmeerküste. Kaltgeschleudert und ungefiltert für ein einzigartiges, vielschichtiges Blütenaroma.',
  'Türk Karadeniz kıyılarının dağ bölgelerinden yaban arılarının topladığı doğal karakovan çiçek balı. Soğuk sıkım ve süzülmemiş, eşsiz çok katmanlı çiçek aroması.',
  25.00, 'fruehstueck', '850g', 'Türkei', true, true
),
(
  'fru-005', 'Alter Kaşar-Käse', 'Eski Kaşar Peyniri',
  'Mindestens sechs Monate gereifter Kaşar-Käse mit kräftigem, würzigem Geschmack und fester Konsistenz. Perfekt zum Frühstück, zum Überbacken oder als aromatischer Snack zu Tee.',
  'En az altı ay olgunlaştırılmış, güçlü baharatlı lezzet ve sert kıvamlı kaşar peyniri. Kahvaltıda, graten yapımında veya çayla aromatik atıştırmalık olarak mükemmel.',
  10.00, 'fruehstueck', '500g', 'Türkei', true, true
),
(
  'fru-006', 'Künefe-Käse', 'Künefe Peyniri',
  'Spezieller Fadenkäse für die Zubereitung von traditionellem Künefe-Dessert mit zartem Schmelz. Mild im Geschmack und perfekt zum Überbacken zwischen knusprigen Kadayıf-Fäden.',
  'Geleneksel künefe tatlısı yapımı için özel tel peynir, zarif erime özelliğiyle. Hafif lezzetli ve çıtır kadayıf telleri arasında graten için mükemmel.',
  8.00, 'fruehstueck', '400g', 'Türkei', true, false
),
(
  'fru-007', 'Dil Peyniri', 'Dil Peyniri',
  'Traditioneller türkischer Fadenkäse mit mild-salzigem Geschmack und elastischer, faseriger Textur. Vielseitig einsetzbar zum Frühstück, in Börek oder als Zutat für warme Gerichte.',
  'Hafif tuzlu lezzet ve elastik lifli dokusuyla geleneksel Türk tel peyniri. Kahvaltıda, börek içinde veya sıcak yemek malzemesi olarak çok yönlü kullanım.',
  8.00, 'fruehstueck', '400g', 'Türkei', true, false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, name_tr = EXCLUDED.name_tr,
  description = EXCLUDED.description, description_tr = EXCLUDED.description_tr,
  price = EXCLUDED.price, category = EXCLUDED.category,
  weight = EXCLUDED.weight, origin = EXCLUDED.origin,
  in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured;

-- ---------- Öle ----------

INSERT INTO products (id, name, name_tr, description, description_tr, price, category, weight, origin, in_stock, featured) VALUES
(
  'oel-001', 'Natives Olivenöl Extra', 'Natürel Sızma Zeytinyağı',
  'Kaltgepresstes natives Olivenöl Extra aus griechischen Oliven mit fruchtigem Aroma und niedriger Säure. Hervorragend für Salate, zum Kochen und als hochwertiges Alltagsöl.',
  'Yunan zeytinlerinden soğuk sıkım natürel sızma zeytinyağı, meyvemsi aroma ve düşük asitlik. Salatalar, yemek pişirme ve günlük kullanım için yüksek kaliteli yağ.',
  12.00, 'oele', '750ml', 'Griechenland', true, true
),
(
  'oel-003', 'Schwarzkümmelöl', 'Çörekotu Yağı',
  'Kaltgepresstes Schwarzkümmelöl aus ägyptischem Nigella Sativa, gewonnen in kleinen Chargen. Seit Jahrtausenden als Heilmittel geschätzt, ideal pur oder zum Verfeinern von Salaten.',
  'Mısır''dan Nigella Sativa''dan küçük partiler halinde elde edilmiş soğuk sıkım çörekotu yağı. Binlerce yıldır şifa kaynağı, saf veya salata için ideal.',
  10.00, 'oele', '125ml', 'Ägypten', true, false
),
(
  'oel-004', 'Apfelessig', 'Elma Sirkesi',
  'Naturtrüber Apfelessig aus der Türkei, traditionell aus frischen Äpfeln vergoren und ungefiltert. Vielseitig verwendbar in Dressings, Marinaden und als wohltuendes Hausmittel.',
  'Türkiye''den taze elmalardan geleneksel fermantasyonla yapılmış doğal bulanık elma sirkesi. Sos yapımı, marine ve sağlıklı ev ilacı olarak çok yönlü.',
  6.00, 'oele', '500ml', 'Türkei', true, false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, name_tr = EXCLUDED.name_tr,
  description = EXCLUDED.description, description_tr = EXCLUDED.description_tr,
  price = EXCLUDED.price, category = EXCLUDED.category,
  weight = EXCLUDED.weight, origin = EXCLUDED.origin,
  in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured;

-- ---------- Nüsse ----------

INSERT INTO products (id, name, name_tr, description, description_tr, price, category, weight, origin, in_stock, featured) VALUES
(
  'nus-001', 'Antep-Pistazien', 'Antep Fıstığı',
  'Leuchtend grüne Pistazien aus Gaziantep, der Welthauptstadt der Pistazien, von Hand geerntet und schonend geröstet. Ungesalzen und naturbelassen, perfekt als Snack oder zum Verfeinern von Desserts.',
  'Fıstığın dünya başkenti Gaziantep''ten el toplaması, özenle kavrulmuş parlak yeşil Antep fıstığı. Tuzsuz ve doğal, atıştırmalık veya tatlı süslemesi için mükemmel.',
  25.00, 'nuesse', '700g', 'Türkei', true, true
),
(
  'nus-002', 'Walnusskerne', 'Ceviz İçi',
  'Helle Walnusskerne aus Usbekistan mit mildem, buttrigem Geschmack ohne Bitterkeit. Ideal für Baklava, Salate, zum Backen oder als nahrhafter Snack zwischendurch.',
  'Özbekistan''dan acılığı olmayan, hafif tereyağımsı lezzetli açık renkli ceviz içleri. Baklava, salata, fırıncılık veya besleyici atıştırmalık için ideal.',
  15.00, 'nuesse', '750g', 'Usbekistan', true, false
),
(
  'nus-003', 'Cashewkerne', 'Kaju',
  'Knackige Cashewkerne aus Vietnam, schonend geröstet für vollen nussigen Geschmack. Beliebter Snack und vielseitige Zutat für asiatische Gerichte, Salate und vegane Küche.',
  'Vietnam''dan özenle kavrulmuş, dolu fındıksı lezzetli çıtır kaju. Popüler atıştırmalık ve Asya mutfağı, salata ve vegan yemekler için çok yönlü malzeme.',
  15.00, 'nuesse', '800g', 'Vietnam', true, false
),
(
  'nus-004', 'Geröstete Mandeln', 'Kavrulmuş Badem',
  'Knusprig geröstete Mandeln aus der Türkei mit süßlich-mildem Geschmack und feinem Röstaroma. Hervorragend als Snack, zum Backen und für orientalische Gerichte.',
  'Türkiye''den tatlımsı hafif lezzet ve ince kavurma aromalı çıtır kavrulmuş bademler. Atıştırmalık, fırıncılık ve oryantal yemekler için harika.',
  15.00, 'nuesse', '800g', 'Türkei', true, false
),
(
  'nus-005', 'Giresun Haselnüsse', 'Giresun Fındığı',
  'Premium-Haselnüsse aus Giresun an der Schwarzmeerküste, dem renommiertesten Anbaugebiet weltweit. Besonders groß, aromatisch und knackig – pur, im Müsli oder zum Backen ein Genuss.',
  'Dünyanın en prestijli fındık bölgesi Karadeniz kıyısındaki Giresun''dan premium fındıklar. Özellikle iri, aromatik ve çıtır — saf, müslide veya fırıncılıkta lezzet.',
  22.00, 'nuesse', '600g', 'Türkei', true, true
),
(
  'nus-006', 'Geröstete Kichererbsen', 'Kavrulmuş Leblebi',
  'Traditionell geröstete Kichererbsen (Leblebi) aus der Türkei, knusprig und proteinreich. Ein beliebter orientalischer Snack, der auch als gesunde Alternative zu Chips überzeugt.',
  'Türkiye''den geleneksel kavrulmuş nohut (leblebi), çıtır ve protein açısından zengin. Popüler oryantal atıştırmalık, aynı zamanda cips alternatifi olarak sağlıklı seçenek.',
  9.00, 'nuesse', '800g', 'Türkei', true, false
),
(
  'nus-007', 'Kürbiskerne', 'Kabak Çekirdeği',
  'Naturbelassene Kürbiskerne aus der Türkei, leicht geröstet mit nussigem Geschmack. Reich an Zink und Magnesium, ideal als Snack, im Salat oder auf frischem Brot.',
  'Türkiye''den doğal kabak çekirdekleri, hafif kavrulmuş fındıksı lezzetle. Çinko ve magnezyum açısından zengin, atıştırmalık, salata veya taze ekmek üstü için ideal.',
  8.00, 'nuesse', '500g', 'Türkei', true, false
),
(
  'nus-008', 'Gerösteter Mais', 'Kavrulmuş Mısır',
  'Knusprig gerösteter Mais aus der Türkei mit herzhaftem Geschmack und angenehm krosser Textur. Ein beliebter Knabbersnack für gesellige Runden und als Alternative zu klassischen Nüssen.',
  'Türkiye''den tuzlu lezzet ve hoş çıtır dokuyla kızartılmış kavrulmuş mısır. Sosyal anlarda popüler çerez ve klasik kuruyemişlere alternatif.',
  6.00, 'nuesse', '500g', 'Türkei', true, false
),
(
  'nus-009', 'Gemischte Nüsse', 'Karışık Kuruyemiş',
  'Sorgfältig zusammengestellte Mischung aus Pistazien, Mandeln, Cashews, Haselnüssen und Walnüssen. Ein abwechslungsreicher Premium-Snack für Nussliebhaber, perfekt für unterwegs und zu Hause.',
  'Fıstık, badem, kaju, fındık ve cevizden özenle hazırlanmış karışım. Kuruyemiş severler için çeşitli premium atıştırmalık, yolda ve evde mükemmel.',
  14.00, 'nuesse', '500g', 'Türkei', true, false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, name_tr = EXCLUDED.name_tr,
  description = EXCLUDED.description, description_tr = EXCLUDED.description_tr,
  price = EXCLUDED.price, category = EXCLUDED.category,
  weight = EXCLUDED.weight, origin = EXCLUDED.origin,
  in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured;

-- ---------- Spezialitäten ----------

INSERT INTO products (id, name, name_tr, description, description_tr, price, category, weight, origin, in_stock, featured) VALUES
(
  'spe-001', 'Kavurma', 'Kavurma',
  'Traditionelle türkische Kavurma aus zartem Lammfleisch, langsam im eigenen Fett geschmort und konserviert. Ein deftiger Genuss zum Frühstück mit Eiern oder als herzhafte Beilage.',
  'Yumuşak kuzu etinden kendi yağında yavaş pişirilmiş ve korunmuş geleneksel Türk kavurması. Kahvaltıda yumurtayla veya doyurucu garnitür olarak lezzetli.',
  5.00, 'spezialitaeten', '130g', 'Türkei', true, false
),
(
  'spe-002', 'Tarhana', 'Tarhana',
  'Handgemachtes Tarhana aus fermentiertem Getreide, Joghurt und Gemüse nach anatolischem Traditionsrezept. Einfach mit Wasser aufgekocht ergibt es eine aromatische, nährende Suppe in wenigen Minuten.',
  'Anadolu geleneğiyle fermente tahıl, yoğurt ve sebzeden el yapımı tarhana. Suyla kaynatıldığında birkaç dakikada aromatik besleyici çorba olur.',
  8.00, 'spezialitaeten', '500g', 'Türkei', true, false
),
(
  'spe-003', 'Granatapfelsirup', 'Nar Ekşisi',
  'Dickflüssiger Granatapfelsirup aus der Türkei, hergestellt aus konzentriertem Granatapfelsaft ohne Zusätze. Unverzichtbar für Salate, Marinaden und als süß-saure Verfeinerung orientalischer Gerichte.',
  'Katkısız konsantre nar suyundan yapılmış koyu kıvamlı Türk nar ekşisi. Salatalar, marineler ve oryantal yemeklerin tatlı-ekşi tat verici olarak vazgeçilmezi.',
  7.00, 'spezialitaeten', '500ml', 'Türkei', true, true
),
(
  'spe-004', 'Schwarzer Maulbeersaft', 'Karadut Özü',
  'Konzentrierter schwarzer Maulbeersaft (Karadut Özü) aus der Türkei, reich an Antioxidantien und Vitaminen. Verdünnt als erfrischendes Getränk oder pur als natürliches Stärkungsmittel genießen.',
  'Antioksidan ve vitamin açısından zengin, Türkiye''den konsantre karadut özü suyu. Seyreltilmiş ferahlatıcı içecek veya saf doğal güçlendirici olarak tüketilir.',
  9.00, 'spezialitaeten', '250ml', 'Türkei', true, false
),
(
  'spe-005', 'Türkischer Kaffee Çifte Kavrulmuş', 'Türk Kahvesi Çifte Kavrulmuş',
  'Doppelt gerösteter türkischer Kaffee mit besonders intensivem, vollmundigem Aroma. Fein gemahlen für die traditionelle Zubereitung im Cezve, ein Klassiker der türkischen Kaffeekultur.',
  'Özellikle yoğun, dolgun aromalı çift kavrulmuş Türk kahvesi. Cezve''de geleneksel demleme için ince öğütülmüş, Türk kahve kültürünün klasiği.',
  5.00, 'spezialitaeten', '100g', 'Türkei', true, false
),
(
  'spe-006', 'Türkischer Kaffee Damla Sakızlı', 'Türk Kahvesi Damla Sakızlı',
  'Türkischer Kaffee mit Mastix (Damla Sakızı), der ihm ein einzigartiges harziges Aroma verleiht. Eine besondere Spezialität, die im Cezve zubereitet wird und mit ihrem Duft begeistert.',
  'Eşsiz reçinemsi aroma veren damla sakızlı Türk kahvesi. Cezve''de demlenen ve kokusuyla büyüleyen özel bir lezzet.',
  5.00, 'spezialitaeten', '100g', 'Türkei', true, false
),
(
  'spe-007', 'Türkischer Kaffee Osmanlı Dibek', 'Türk Kahvesi Osmanlı Dibek',
  'Osmanischer Dibek-Kaffee, traditionell im Steinmörser gemahlen mit einer Mischung aus Kaffee und aromatischen Gewürzen. Milder als klassischer türkischer Kaffee, mit samtig-weichem Geschmack und langem Abgang.',
  'Taş havanda geleneksel öğütülmüş, kahve ve aromatik baharat karışımlı Osmanlı dibek kahvesi. Klasik Türk kahvesinden daha yumuşak, kadifemsi lezzet ve uzun bırakışlı.',
  5.00, 'spezialitaeten', '100g', 'Türkei', true, false
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name, name_tr = EXCLUDED.name_tr,
  description = EXCLUDED.description, description_tr = EXCLUDED.description_tr,
  price = EXCLUDED.price, category = EXCLUDED.category,
  weight = EXCLUDED.weight, origin = EXCLUDED.origin,
  in_stock = EXCLUDED.in_stock, featured = EXCLUDED.featured;

-- ============================================================================
-- PRODUCT VARIANTS
-- ============================================================================

-- Clear existing variants to avoid duplicates on re-run
DELETE FROM product_variants WHERE product_id IN (
  SELECT id FROM products
);

INSERT INTO product_variants (id, product_id, name, price, weight) VALUES
  -- Gewürze
  ('gew-001-250g',  'gew-001', '250g',  6.00,  '250g'),
  ('gew-001-500g',  'gew-001', '500g',  10.00, '500g'),
  ('gew-002-200g',  'gew-002', '200g',  5.00,  '200g'),
  ('gew-002-500g',  'gew-002', '500g',  10.00, '500g'),
  ('gew-003-200g',  'gew-003', '200g',  5.00,  '200g'),
  ('gew-004-150g',  'gew-004', '150g',  5.00,  '150g'),
  ('gew-005-100g',  'gew-005', '100g',  5.00,  '100g'),
  ('gew-006-150g',  'gew-006', '150g',  5.00,  '150g'),
  ('gew-007-1000g', 'gew-007', '1000g', 8.00,  '1000g'),
  ('gew-008-1000g', 'gew-008', '1000g', 8.00,  '1000g'),
  ('gew-009-1000g', 'gew-009', '1000g', 8.00,  '1000g'),
  ('gew-010-250ml', 'gew-010', '250ml', 9.00,  '250ml'),

  -- Trockenfrüchte
  ('tro-001-400g',  'tro-001', '400g',  8.00,  '400g'),
  ('tro-001-1kg',   'tro-001', '1kg',   18.00, '1kg'),
  ('tro-002-200g',  'tro-002', '200g',  6.00,  '200g'),
  ('tro-003-400g',  'tro-003', '400g',  7.00,  '400g'),
  ('tro-003-1kg',   'tro-003', '1kg',   15.00, '1kg'),
  ('tro-004-400g',  'tro-004', '400g',  5.00,  '400g'),
  ('tro-005-200g',  'tro-005', '200g',  7.00,  '200g'),
  ('tro-006-500g',  'tro-006', '500g',  12.00, '500g'),
  ('tro-006-1kg',   'tro-006', '1kg',   22.00, '1kg'),
  ('tro-007-500g',  'tro-007', '500g',  18.00, '500g'),
  ('tro-007-1kg',   'tro-007', '1kg',   32.00, '1kg'),
  ('tro-008-750g',  'tro-008', '750g',  15.00, '750g'),
  ('tro-008-5kg',   'tro-008', '5kg',   60.00, '5kg'),

  -- Frühstück
  ('fru-001-935g',  'fru-001', '935g',  11.00, '935g'),
  ('fru-002-1kg',   'fru-002', '1kg',   10.00, '1kg'),
  ('fru-003-620g',  'fru-003', '620g',  10.00, '620g'),
  ('fru-004-850g',  'fru-004', '850g',  25.00, '850g'),
  ('fru-005-500g',  'fru-005', '500g',  10.00, '500g'),
  ('fru-006-400g',  'fru-006', '400g',  8.00,  '400g'),
  ('fru-007-400g',  'fru-007', '400g',  8.00,  '400g'),

  -- Öle
  ('oel-001-750ml', 'oel-001', '750ml', 12.00, '750ml'),
  ('oel-001-5L',    'oel-001', '5L',    55.00, '5L'),
  ('oel-003-125ml', 'oel-003', '125ml', 10.00, '125ml'),
  ('oel-004-500ml', 'oel-004', '500ml', 6.00,  '500ml'),

  -- Nüsse
  ('nus-001-700g',  'nus-001', '700g',  25.00, '700g'),
  ('nus-002-750g',  'nus-002', '750g',  15.00, '750g'),
  ('nus-003-800g',  'nus-003', '800g',  15.00, '800g'),
  ('nus-004-800g',  'nus-004', '800g',  15.00, '800g'),
  ('nus-005-600g',  'nus-005', '600g',  22.00, '600g'),
  ('nus-006-800g',  'nus-006', '800g',  9.00,  '800g'),
  ('nus-007-500g',  'nus-007', '500g',  8.00,  '500g'),
  ('nus-008-500g',  'nus-008', '500g',  6.00,  '500g'),
  ('nus-009-500g',  'nus-009', '500g',  14.00, '500g'),

  -- Spezialitäten
  ('spe-001-130g',  'spe-001', '130g',  5.00,  '130g'),
  ('spe-002-500g',  'spe-002', '500g',  8.00,  '500g'),
  ('spe-003-500ml', 'spe-003', '500ml', 7.00,  '500ml'),
  ('spe-004-250ml', 'spe-004', '250ml', 9.00,  '250ml'),
  ('spe-005-100g',  'spe-005', '100g',  5.00,  '100g'),
  ('spe-006-100g',  'spe-006', '100g',  5.00,  '100g'),
  ('spe-007-100g',  'spe-007', '100g',  5.00,  '100g');

-- ============================================================================
-- PRODUCT IMAGES
-- ============================================================================

-- Clear existing images to avoid duplicates on re-run
DELETE FROM product_images WHERE product_id IN (
  SELECT id FROM products
);

INSERT INTO product_images (product_id, url, sort_order) VALUES
  -- Gewürze
  ('gew-001', '/images/gewuerze/sumak.jpeg',               0),
  ('gew-001', '/images/gewuerze/sumak-2.jpeg',             1),
  ('gew-002', '/images/gewuerze/isot-biber.jpeg',          0),
  ('gew-002', '/images/gewuerze/isot-biber-2.jpeg',        1),
  ('gew-003', '/images/gewuerze/knoblauchpulver.jpeg',     0),
  ('gew-004', '/images/gewuerze/petersilie.jpeg',          0),
  ('gew-005', '/images/gewuerze/dill.jpeg',                0),
  ('gew-006', '/images/gewuerze/chili-ganz.jpeg',          0),
  ('gew-007', '/images/gewuerze/scharfe-paprikapaste.jpeg',0),
  ('gew-008', '/images/gewuerze/suesse-paprikapaste.jpeg', 0),
  ('gew-009', '/images/gewuerze/tomatenmark.jpeg',         0),
  ('gew-010', '/images/gewuerze/sumak-eksisi.jpeg',        0),
  ('gew-010', '/images/gewuerze/sumak-eksisi-2.jpeg',      1),

  -- Trockenfrüchte
  ('tro-001', '/images/trockenfruechte/aprikosen.jpeg',         0),
  ('tro-001', '/images/trockenfruechte/aprikosen-2.jpeg',       1),
  ('tro-002', '/images/trockenfruechte/maulbeeren.jpeg',        0),
  ('tro-002', '/images/trockenfruechte/maulbeeren-2.jpeg',      1),
  ('tro-003', '/images/trockenfruechte/feigen.jpeg',            0),
  ('tro-004', '/images/trockenfruechte/schwarze-trauben.jpeg',  0),
  ('tro-005', '/images/trockenfruechte/sauerkirschen.jpeg',     0),
  ('tro-006', '/images/trockenfruechte/medjool-choice.jpeg',    0),
  ('tro-007', '/images/trockenfruechte/medjool-premium.jpeg',   0),
  ('tro-007', '/images/trockenfruechte/medjool-premium-2.jpeg', 1),
  ('tro-008', '/images/trockenfruechte/aegyptische-datteln.jpeg',   0),
  ('tro-008', '/images/trockenfruechte/aegyptische-datteln-2.jpeg', 1),
  ('tro-008', '/images/trockenfruechte/aegyptische-datteln-3.jpeg', 2),

  -- Frühstück
  ('fru-001', '/images/fruehstueck/tahini.jpeg',              0),
  ('fru-001', '/images/fruehstueck/tahini-2.jpeg',            1),
  ('fru-002', '/images/fruehstueck/traubenmelasse.jpeg',      0),
  ('fru-002', '/images/fruehstueck/traubenmelasse-2.jpeg',    1),
  ('fru-003', '/images/fruehstueck/johannisbrotmelasse.jpeg',  0),
  ('fru-003', '/images/fruehstueck/johannisbrotmelasse-2.jpeg',1),
  ('fru-004', '/images/fruehstueck/honig.jpeg',               0),
  ('fru-004', '/images/fruehstueck/honig-2.jpeg',             1),
  ('fru-005', '/images/fruehstueck/eski-kasar.jpeg',          0),
  ('fru-005', '/images/fruehstueck/eski-kasar-2.jpeg',        1),
  ('fru-006', '/images/fruehstueck/kunefe-peyniri.jpeg',      0),
  ('fru-006', '/images/fruehstueck/kunefe-peyniri-2.jpeg',    1),
  ('fru-007', '/images/fruehstueck/dil-peyniri.jpeg',         0),

  -- Öle
  ('oel-001', '/images/oele/olivenoel-750ml.jpeg',        0),
  ('oel-001', '/images/oele/olivenoel-750ml-2.jpeg',      1),
  ('oel-003', '/images/oele/schwarzkuemmeloel.jpeg',      0),
  ('oel-003', '/images/oele/schwarzkuemmeloel-2.jpeg',    1),
  ('oel-004', '/images/oele/apfelessig.jpeg',             0),

  -- Nüsse
  ('nus-001', '/images/nuesse/antep-pistazien.jpeg',      0),
  ('nus-001', '/images/nuesse/antep-pistazien-2.jpeg',    1),
  ('nus-002', '/images/nuesse/walnusskerne.jpeg',         0),
  ('nus-002', '/images/nuesse/walnusskerne-2.jpeg',       1),
  ('nus-002', '/images/nuesse/walnusskerne-3.jpeg',       2),
  ('nus-003', '/images/nuesse/cashewkerne.jpeg',          0),
  ('nus-003', '/images/nuesse/cashewkerne-2.jpeg',        1),
  ('nus-004', '/images/nuesse/mandeln.jpeg',              0),
  ('nus-004', '/images/nuesse/mandeln-2.jpeg',            1),
  ('nus-005', '/images/nuesse/haselnuesse.jpeg',          0),
  ('nus-005', '/images/nuesse/haselnuesse-2.jpeg',        1),
  ('nus-006', '/images/nuesse/leblebi.jpeg',              0),
  ('nus-006', '/images/nuesse/leblebi-2.jpeg',            1),
  ('nus-007', '/images/nuesse/kuerbiskerne.jpeg',         0),
  ('nus-008', '/images/nuesse/corn-nuts.jpeg',            0),
  ('nus-009', '/images/nuesse/gemischte-nuesse.jpeg',     0),

  -- Spezialitäten
  ('spe-001', '/images/spezialitaeten/kavurma.jpeg',          0),
  ('spe-001', '/images/spezialitaeten/kavurma-2.jpeg',        1),
  ('spe-002', '/images/spezialitaeten/tarhana.jpeg',          0),
  ('spe-002', '/images/spezialitaeten/tarhana-2.jpeg',        1),
  ('spe-003', '/images/spezialitaeten/granatapfelsirup.jpeg', 0),
  ('spe-004', '/images/spezialitaeten/karadut-oezu.jpeg',     0),
  ('spe-005', '/images/spezialitaeten/kaffee-cifte.jpeg',     0),
  ('spe-006', '/images/spezialitaeten/kaffee-damla.jpeg',     0),
  ('spe-006', '/images/spezialitaeten/kaffee-damla-2.jpeg',   1),
  ('spe-007', '/images/spezialitaeten/kaffee-dibek.jpeg',     0),
  ('spe-007', '/images/spezialitaeten/kaffee-dibek-2.jpeg',   1);

COMMIT;

-- ============================================================================
-- VERIFICATION
-- ============================================================================
-- Uncomment the following lines to verify the seed data after running:
--
-- SELECT 'categories' AS table_name, COUNT(*) AS row_count FROM categories
-- UNION ALL
-- SELECT 'products',          COUNT(*) FROM products
-- UNION ALL
-- SELECT 'product_variants',  COUNT(*) FROM product_variants
-- UNION ALL
-- SELECT 'product_images',    COUNT(*) FROM product_images;
