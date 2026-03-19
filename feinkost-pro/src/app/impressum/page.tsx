export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl text-espresso-600 mb-8">Impressum</h1>
      <div className="prose prose-espresso space-y-6 text-espresso-500">
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Angaben gemäß § 5 TMG</h2>
          <p>[Firmenname]<br />[Vor- und Nachname des Inhabers]<br />[Straße und Hausnummer]<br />[PLZ Ort]<br />Deutschland</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Kontakt</h2>
          <p>Telefon: [Telefonnummer]<br />E-Mail: [E-Mail-Adresse]</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />[USt-IdNr.]</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>[Vor- und Nachname]<br />[Adresse]</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">EU-Streitschlichtung</h2>
          <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
          <p>Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </section>
      </div>
    </div>
  );
}
