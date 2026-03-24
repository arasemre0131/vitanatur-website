"use client";

import { useLang } from "@/lib/i18n";

export default function AGBPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl text-espresso-600 mb-8">{t("agb.title")}</h1>
      <div className="prose prose-espresso space-y-8 text-espresso-500">

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s1_title")}</h2>
          <p>{t("agb.s1_p1")}</p>
          <p className="mt-3">{t("agb.s1_p2")}</p>
          <p className="mt-3">{t("agb.s1_p3")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s2_title")}</h2>
          <p>{t("agb.s2_p1")}</p>
          <p className="mt-3">{t("agb.s2_p2")}</p>
          <p className="mt-3">{t("agb.s2_p3")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s3_title")}</h2>
          <p>{t("agb.s3_p1")}</p>
          <p className="mt-3">{t("agb.s3_p2")}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t("agb.s3_credit")}</li>
            <li>{t("agb.s3_sepa")}</li>
            <li>{t("agb.s3_digital")}</li>
          </ul>
          <p className="mt-3">{t("agb.s3_p3")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s4_title")}</h2>
          <p>{t("agb.s4_p1")}</p>
          <ul className="list-disc pl-6 space-y-1 mt-3">
            <li>{t("agb.s4_shipping_de")}</li>
            <li>{t("agb.s4_shipping_at")}</li>
            <li>{t("agb.s4_shipping_ch")}</li>
          </ul>
          <p className="mt-3">{t("agb.s4_delivery_time")}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t("agb.s4_delivery_de")}</li>
            <li>{t("agb.s4_delivery_at_ch")}</li>
          </ul>
          <p className="mt-3">{t("agb.s4_dhl")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s5_title")}</h2>
          <p><strong>{t("agb.s5_instruction")}</strong></p>
          <p className="mt-3">{t("agb.s5_p1")}</p>
          <p className="mt-3">{t("agb.s5_p2")}</p>
          <p>Vitanatur<br />Bleicherweg 5, 40724 Hilden, Deutschland<br />{t("impressum.email_label")}: info@vitanatur.com<br />{t("impressum.phone_label")}: +49 1520 3426787</p>
          <p className="mt-3">{t("agb.s5_p3")}</p>
          <p className="mt-3"><strong>{t("agb.s5_consequences_title")}</strong></p>
          <p>{t("agb.s5_consequences_text")}</p>
          <p className="mt-3"><strong>{t("agb.s5_exclusion_title")}</strong></p>
          <p>{t("agb.s5_exclusion_text")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s6_title")}</h2>
          <p>{t("agb.s6_p1")}</p>
          <p className="mt-3">{t("agb.s6_p2")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s7_title")}</h2>
          <p>{t("agb.s7_p1")}</p>
          <p className="mt-3">{t("agb.s7_p2")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s8_title")}</h2>
          <p>{t("agb.s8_text")} <a href="/datenschutz" className="text-olive-500 hover:underline">{t("agb.s8_link_text")}</a>{t("agb.s8_suffix")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s9_title")}</h2>
          <p>{t("agb.s9_p1")}</p>
          <p className="mt-3">{t("agb.s9_p2")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("agb.s10_title")}</h2>
          <p>{t("agb.s10_text")}</p>
        </section>

        <section>
          <p className="text-sm text-espresso-400 mt-8">{t("agb.last_updated")}</p>
        </section>
      </div>
    </div>
  );
}
