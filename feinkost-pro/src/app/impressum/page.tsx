"use client";

import { useLang } from "@/lib/i18n";

export default function ImpressumPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl text-espresso-600 mb-8">{t("impressum.title")}</h1>
      <div className="prose prose-espresso space-y-6 text-espresso-500">
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("impressum.info_title")}</h2>
          <p>Vitanatur<br />Yasin Ergin Yavuz<br />Bleicherweg 5<br />40724 Hilden<br />Deutschland</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("impressum.contact_title")}</h2>
          <p>{t("impressum.email_label")}: <a href="mailto:info@vitanatur.com" className="text-olive-500 hover:underline">info@vitanatur.com</a></p>
          <p>{t("impressum.phone_label")}: <a href="tel:+4915203426787" className="text-olive-500 hover:underline">+49 1520 3426787</a></p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("impressum.responsible_title")}</h2>
          <p>Yasin Ergin Yavuz<br />Bleicherweg 5, 40724 Hilden</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("impressum.eu_dispute_title")}</h2>
          <p>{t("impressum.eu_dispute_text")} <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline">https://ec.europa.eu/consumers/odr/</a></p>
          <p>{t("impressum.eu_dispute_email")}</p>
        </section>
        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("impressum.consumer_dispute_title")}</h2>
          <p>{t("impressum.consumer_dispute_text")}</p>
        </section>
      </div>
    </div>
  );
}
