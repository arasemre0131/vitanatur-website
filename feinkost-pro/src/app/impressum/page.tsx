export default function ImpressumPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl text-espresso-600 mb-8">Impressum</h1>
      <div className="prose prose-espresso space-y-6 text-espresso-500">
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Angaben gemäß § 5 TMG</h2>
          <p>Vitanatur<br />Yasin Ergin Yavuz<br />Bleicherweg 5<br />40724 Hilden<br />Deutschland</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Kontakt</h2>
          <p>E-Mail: <a href="mailto:info@vitanatur.com" className="text-olive-500 hover:underline">info@vitanatur.com</a></p>
          <p>Telefon: <a href="tel:+4915203426787" className="text-olive-500 hover:underline">+49 1520 3426787</a></p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
          <p>Yasin Ergin Yavuz<br />Bleicherweg 5, 40724 Hilden</p>
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
