"use client";

import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { Mail, MapPin, Phone, Clock } from "lucide-react";

export default function KontaktPage() {
  const { t } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-sand-400 mb-8">
        <Link href="/" className="hover:text-olive-500 transition-colors">
          {t("nav.home")}
        </Link>
        <span>/</span>
        <span className="text-espresso-600">{t("kontakt.title")}</span>
      </nav>

      <h1 className="font-serif text-3xl sm:text-4xl text-espresso-600 mb-4">
        {t("kontakt.title")}
      </h1>
      <p className="text-espresso-500 leading-relaxed mb-10">
        {t("kontakt.intro")}
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        {/* Contact Form */}
        <div>
          {submitted ? (
            <div className="bg-olive-50 border border-olive-200 rounded-xl p-6 text-olive-700">
              <p className="font-medium">{t("kontakt.success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-espresso-600 mb-1.5"
                >
                  {t("kontakt.name")}
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-espresso-600 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-espresso-600 mb-1.5"
                >
                  {t("kontakt.email")}
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-espresso-600 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent transition"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-espresso-600 mb-1.5"
                >
                  {t("kontakt.message")}
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-espresso-600 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent transition resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 rounded-lg bg-olive-500 text-white font-medium hover:bg-olive-600 active:bg-olive-700 transition-colors"
              >
                {t("kontakt.send")}
              </button>
            </form>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="font-serif text-xl text-espresso-600">
            {t("kontakt.info_title")}
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-olive-600" />
              </div>
              <div className="text-espresso-500">
                <p className="font-medium text-espresso-600">
                  {t("kontakt.address")}
                </p>
                <p>Feinkost GmbH</p>
                <p>Musterstra&szlig;e 12</p>
                <p>10115 Berlin</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-olive-600" />
              </div>
              <div className="text-espresso-500">
                <p className="font-medium text-espresso-600">
                  {t("kontakt.email")}
                </p>
                <a
                  href="mailto:hallo@feinkost.de"
                  className="text-olive-500 hover:underline"
                >
                  hallo@feinkost.de
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-olive-600" />
              </div>
              <div className="text-espresso-500">
                <p className="font-medium text-espresso-600">
                  {t("kontakt.phone")}
                </p>
                <p>+49 30 1234567</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-olive-600" />
              </div>
              <div className="text-espresso-500">
                <p className="font-medium text-espresso-600">
                  {t("kontakt.hours_title")}
                </p>
                <p>{t("kontakt.hours_weekday")}</p>
                <p>{t("kontakt.hours_weekend")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
