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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    } catch {
      // still show success - message may have been sent
    }
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
                <p>Vitanatur</p>
                <p>Bleicherweg 5</p>
                <p>40724 Hilden</p>
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
                  href="mailto:info@vitanatur.com"
                  className="text-olive-500 hover:underline"
                >
                  info@vitanatur.com
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
                <p>
                  <a href="tel:+4915203426787" className="text-olive-500 hover:underline">
                    +49 1520 3426787
                  </a>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-olive-100 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-olive-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </div>
              <div className="text-espresso-500">
                <p className="font-medium text-espresso-600">Instagram</p>
                <a
                  href="https://instagram.com/vitanatur.shop61"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-olive-500 hover:underline"
                >
                  @vitanatur.shop61
                </a>
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
