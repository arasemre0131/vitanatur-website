"use client";

import { useState, useEffect, useCallback } from "react";
import { StarRating } from "./StarRating";
import { useCustomerAuth } from "@/store/auth-store";
import { useLang } from "@/lib/i18n";

interface Review {
  id: string;
  user_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

interface ReviewData {
  reviews: Review[];
  average: number;
  count: number;
}

export function ReviewSection({ productId }: { productId: string }) {
  const { user, session } = useCustomerAuth();
  const { t } = useLang();
  const [data, setData] = useState<ReviewData>({ reviews: [], average: 0, count: 0 });
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch(`/api/reviews?productId=${encodeURIComponent(productId)}`);
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!session) return;

    setSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          productId,
          rating,
          comment,
          userName: user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Kunde",
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setSubmitError(json.error || t("review.error"));
      } else {
        setSubmitSuccess(true);
        setComment("");
        setRating(5);
        fetchReviews();
      }
    } catch {
      setSubmitError(t("review.error"));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-12 pt-8 border-t border-cream-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl text-espresso-600">
          {t("review.title")}
        </h2>
        {data.count > 0 && (
          <div className="flex items-center gap-2">
            <StarRating rating={Math.round(data.average)} readonly size="sm" />
            <span className="text-sm text-espresso-400">
              {data.average} ({data.count})
            </span>
          </div>
        )}
      </div>

      {/* Review Form */}
      {user ? (
        submitSuccess ? (
          <div className="bg-olive-50 border border-olive-200 rounded-xl p-4 mb-8 text-olive-700 text-sm font-medium">
            {t("review.success")}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-cream-100 rounded-xl p-5 mb-8 space-y-4">
            <p className="text-sm text-espresso-500">
              {t("review.write_as")} <strong>{user.user_metadata?.display_name || user.email}</strong>
            </p>
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1">
                {t("review.your_rating")}
              </label>
              <StarRating rating={rating} onChange={setRating} />
            </div>
            <div>
              <label className="block text-sm font-medium text-espresso-600 mb-1">
                {t("review.your_comment")}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
                minLength={3}
                maxLength={1000}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-espresso-600 focus:outline-none focus:ring-2 focus:ring-olive-400 focus:border-transparent transition resize-none"
                placeholder={t("review.placeholder")}
              />
            </div>
            {submitError && (
              <p className="text-sm text-red-600 font-medium">{submitError}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-lg bg-olive-500 text-white font-medium hover:bg-olive-600 active:bg-olive-700 transition-colors disabled:opacity-50"
            >
              {submitting ? t("review.submitting") : t("review.submit")}
            </button>
          </form>
        )
      ) : (
        <div className="bg-cream-100 rounded-xl p-5 mb-8">
          {showAuthForm ? (
            <AuthInline onSuccess={() => setShowAuthForm(false)} />
          ) : (
            <div className="text-center">
              <p className="text-sm text-espresso-500 mb-3">{t("review.login_required")}</p>
              <button
                onClick={() => setShowAuthForm(true)}
                className="px-6 py-2.5 rounded-lg bg-olive-500 text-white font-medium hover:bg-olive-600 transition-colors"
              >
                {t("review.login_to_review")}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse bg-cream-100 rounded-xl p-5">
              <div className="h-4 bg-sand-200 rounded w-1/4 mb-2" />
              <div className="h-3 bg-sand-200 rounded w-3/4" />
            </div>
          ))}
        </div>
      ) : data.reviews.length === 0 ? (
        <p className="text-sm text-espresso-400 text-center py-8">{t("review.no_reviews")}</p>
      ) : (
        <div className="space-y-4">
          {data.reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-xl border border-cream-300 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-olive-500/10 flex items-center justify-center text-sm font-semibold text-olive-600">
                    {review.user_name.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium text-espresso-600 text-sm">{review.user_name}</span>
                </div>
                <span className="text-xs text-espresso-400">
                  {new Date(review.created_at).toLocaleDateString("de-DE")}
                </span>
              </div>
              <StarRating rating={review.rating} readonly size="sm" />
              <p className="mt-2 text-sm text-espresso-500 leading-relaxed">{review.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Inline Auth Form ──
function AuthInline({ onSuccess }: { onSuccess: () => void }) {
  const { signIn, signUp } = useCustomerAuth();
  const { t } = useLang();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (mode === "login") {
      const result = await signIn(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    } else {
      if (!name.trim()) {
        setError(t("review.name_required"));
        setLoading(false);
        return;
      }
      const result = await signUp(email, password, name);
      if (result.error) {
        setError(result.error);
      } else {
        onSuccess();
      }
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 max-w-sm mx-auto">
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === "login" ? "bg-olive-500 text-white" : "bg-sand-100 text-espresso-500"
          }`}
        >
          {t("review.login")}
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
            mode === "register" ? "bg-olive-500 text-white" : "bg-sand-100 text-espresso-500"
          }`}
        >
          {t("review.register")}
        </button>
      </div>

      {mode === "register" && (
        <input
          type="text"
          placeholder={t("review.name_placeholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-espresso-600 focus:outline-none focus:ring-2 focus:ring-olive-400 transition text-sm"
        />
      )}
      <input
        type="email"
        placeholder={t("review.email_placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-espresso-600 focus:outline-none focus:ring-2 focus:ring-olive-400 transition text-sm"
      />
      <input
        type="password"
        placeholder={t("review.password_placeholder")}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={6}
        className="w-full px-4 py-2.5 rounded-lg border border-cream-300 bg-white text-espresso-600 focus:outline-none focus:ring-2 focus:ring-olive-400 transition text-sm"
      />
      {error && <p className="text-xs text-red-600 font-medium">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-2.5 rounded-lg bg-olive-500 text-white font-medium hover:bg-olive-600 transition-colors disabled:opacity-50 text-sm"
      >
        {loading ? "..." : mode === "login" ? t("review.login") : t("review.register")}
      </button>
    </form>
  );
}
