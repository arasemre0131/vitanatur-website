export default function DatenschutzPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl text-espresso-600 mb-8">Datenschutzerklärung</h1>
      <div className="prose prose-espresso space-y-8 text-espresso-500">

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">1. Verantwortlicher</h2>
          <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
          <p>Vitanatur<br />Bleicherweg 5, 40724 Hilden, Deutschland<br />E-Mail: info@vitanatur.com<br />Telefon: +49 1520 3426787</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">2. Erhebung und Speicherung personenbezogener Daten</h2>
          <p>Beim Besuch unserer Website werden automatisch folgende Daten erfasst:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>IP-Adresse des anfragenden Rechners</li>
            <li>Datum und Uhrzeit des Zugriffs</li>
            <li>Name und URL der abgerufenen Datei</li>
            <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
            <li>Verwendeter Browser und ggf. das Betriebssystem Ihres Rechners</li>
          </ul>
          <p className="mt-3">Bei einer Bestellung in unserem Online-Shop erheben wir folgende Daten:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Vor- und Nachname</li>
            <li>Lieferadresse</li>
            <li>E-Mail-Adresse</li>
            <li>Telefonnummer (optional)</li>
            <li>Zahlungsinformationen</li>
          </ul>
          <p className="mt-3">Die Rechtsgrundlage hierfür ist Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse).</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">3. Weitergabe von Daten</h2>
          <p>Eine Übermittlung Ihrer persönlichen Daten an Dritte erfolgt nur in folgenden Fällen:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Zur Vertragsabwicklung erforderliche Weitergabe an Versanddienstleister (DHL)</li>
            <li>Zur Zahlungsabwicklung an den Zahlungsdienstleister (Stripe)</li>
            <li>Wenn wir gesetzlich dazu verpflichtet sind</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">4. Cookies</h2>
          <p>Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Einige Cookies sind technisch notwendig für den Betrieb der Website (z.&nbsp;B. Warenkorb-Funktionalität), andere helfen uns, die Website und das Nutzererlebnis zu verbessern.</p>
          <p className="mt-3"><strong>Technisch notwendige Cookies:</strong> Diese Cookies sind für den Betrieb der Website zwingend erforderlich. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</p>
          <p className="mt-3"><strong>Analyse-Cookies:</strong> Wir setzen ggf. Analyse-Cookies ein, um das Nutzungsverhalten zu analysieren. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Sie können Ihre Einwilligung jederzeit widerrufen.</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">5. Betroffenenrechte</h2>
          <p>Sie haben gemäß DSGVO folgende Rechte:</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Auskunftsrecht (Art. 15 DSGVO)</h3>
          <p>Sie haben das Recht, Auskunft über Ihre von uns verarbeiteten personenbezogenen Daten zu verlangen.</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Recht auf Berichtigung (Art. 16 DSGVO)</h3>
          <p>Sie haben das Recht, die Berichtigung unrichtiger oder die Vervollständigung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen.</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Recht auf Löschung (Art. 17 DSGVO)</h3>
          <p>Sie haben das Recht, die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen, soweit keine gesetzlichen Aufbewahrungspflichten entgegenstehen.</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</h3>
          <p>Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Widerspruchsrecht (Art. 21 DSGVO)</h3>
          <p>Sie haben das Recht, aus Gründen, die sich aus Ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung Ihrer personenbezogenen Daten Widerspruch einzulegen.</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</h3>
          <p>Sie haben das Recht, die Sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</p>

          <p className="mt-4">Zur Ausübung Ihrer Rechte wenden Sie sich bitte an: <a href="mailto:info@vitanatur.com" className="text-olive-500 hover:underline">info@vitanatur.com</a></p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">6. SSL-Verschlüsselung</h2>
          <p>Diese Website nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von &quot;http://&quot; auf &quot;https://&quot; wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">7. Zahlungsdienstleister</h2>
          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Stripe</h3>
          <p>Wir nutzen den Zahlungsdienstleister Stripe (Stripe Payments Europe, Ltd., 1 Grand Canal Street Lower, Grand Canal Dock, Dublin, D02 H210, Irland) zur Abwicklung von Zahlungsvorgängen.</p>
          <p className="mt-3">Bei einer Zahlung über Stripe werden Ihre Zahlungsdaten (z.&nbsp;B. Kreditkartennummer, Ablaufdatum, CVC) direkt an Stripe übermittelt. Wir selbst speichern keine vollständigen Zahlungsdaten.</p>
          <p className="mt-3">Weitere Informationen zum Datenschutz bei Stripe finden Sie unter: <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline">https://stripe.com/de/privacy</a></p>
          <p className="mt-3">Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO (Vertragserfüllung).</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">8. Kontakt</h2>
          <p>Bei Fragen zum Datenschutz erreichen Sie uns unter:</p>
          <p>Vitanatur<br />Bleicherweg 5, 40724 Hilden, Deutschland<br />E-Mail: <a href="mailto:info@vitanatur.com" className="text-olive-500 hover:underline">info@vitanatur.com</a><br />Telefon: +49 1520 3426787</p>
        </section>

        <section>
          <p className="text-sm text-espresso-400 mt-8">Stand: März 2026</p>
        </section>
      </div>
    </div>
  );
}
