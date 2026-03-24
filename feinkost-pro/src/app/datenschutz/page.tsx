"use client";

import { useLang } from "@/lib/i18n";

export default function DatenschutzPage() {
  const { t } = useLang();

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-serif text-3xl text-espresso-600 mb-8">{t("privacy.title")}</h1>
      <div className="prose prose-espresso space-y-8 text-espresso-500">

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s1_title")}</h2>
          <p>{t("privacy.s1_text")}</p>
          <p>Vitanatur<br />Bleicherweg 5, 40724 Hilden, Deutschland<br />{t("impressum.email_label")}: info@vitanatur.com<br />{t("impressum.phone_label")}: +49 1520 3426787</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s2_title")}</h2>
          <p>{t("privacy.s2_auto_text")}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t("privacy.s2_auto_ip")}</li>
            <li>{t("privacy.s2_auto_date")}</li>
            <li>{t("privacy.s2_auto_file")}</li>
            <li>{t("privacy.s2_auto_referrer")}</li>
            <li>{t("privacy.s2_auto_browser")}</li>
          </ul>
          <p className="mt-3">{t("privacy.s2_order_text")}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t("privacy.s2_order_name")}</li>
            <li>{t("privacy.s2_order_address")}</li>
            <li>{t("privacy.s2_order_email")}</li>
            <li>{t("privacy.s2_order_phone")}</li>
            <li>{t("privacy.s2_order_payment")}</li>
          </ul>
          <p className="mt-3">{t("privacy.s2_legal_basis")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s3_title")}</h2>
          <p>{t("privacy.s3_text")}</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>{t("privacy.s3_shipping")}</li>
            <li>{t("privacy.s3_payment")}</li>
            <li>{t("privacy.s3_legal")}</li>
          </ul>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s4_title")}</h2>
          <p>{t("privacy.s4_text")}</p>
          <p className="mt-3"><strong>{t("privacy.s4_necessary")}</strong></p>
          <p className="mt-3"><strong>{t("privacy.s4_analytics")}</strong></p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s5_title")}</h2>
          <p>{t("privacy.s5_intro")}</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">{t("privacy.s5_access_title")}</h3>
          <p>{t("privacy.s5_access_text")}</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">{t("privacy.s5_rectification_title")}</h3>
          <p>{t("privacy.s5_rectification_text")}</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">{t("privacy.s5_deletion_title")}</h3>
          <p>{t("privacy.s5_deletion_text")}</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">{t("privacy.s5_restriction_title")}</h3>
          <p>{t("privacy.s5_restriction_text")}</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">{t("privacy.s5_objection_title")}</h3>
          <p>{t("privacy.s5_objection_text")}</p>

          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">{t("privacy.s5_portability_title")}</h3>
          <p>{t("privacy.s5_portability_text")}</p>

          <p className="mt-4">{t("privacy.s5_contact")} <a href="mailto:info@vitanatur.com" className="text-olive-500 hover:underline">info@vitanatur.com</a></p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s6_title")}</h2>
          <p>{t("privacy.s6_text")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s7_title")}</h2>
          <h3 className="font-serif text-lg text-espresso-600 mt-4 mb-2">Stripe</h3>
          <p>{t("privacy.s7_stripe_text")}</p>
          <p className="mt-3">{t("privacy.s7_stripe_data")}</p>
          <p className="mt-3">{t("privacy.s7_stripe_info")} <a href="https://stripe.com/de/privacy" target="_blank" rel="noopener noreferrer" className="text-olive-500 hover:underline">https://stripe.com/de/privacy</a></p>
          <p className="mt-3">{t("privacy.s7_stripe_legal")}</p>
        </section>

        <section>
          <h2 className="font-serif text-xl text-espresso-600 mb-3">{t("privacy.s8_title")}</h2>
          <p>{t("privacy.s8_text")}</p>
          <p>Vitanatur<br />Bleicherweg 5, 40724 Hilden, Deutschland<br />{t("impressum.email_label")}: <a href="mailto:info@vitanatur.com" className="text-olive-500 hover:underline">info@vitanatur.com</a><br />{t("impressum.phone_label")}: +49 1520 3426787</p>
        </section>

        <section>
          <p className="text-sm text-espresso-400 mt-8">{t("privacy.last_updated")}</p>
        </section>
      </div>
    </div>
  );
}
