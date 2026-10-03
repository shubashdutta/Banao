import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  BrainCircuit,
  Lightbulb,
  Loader2,
  Send,
  Sparkles,
} from "lucide-react";

type ImpactLevel = "HIGH IMPACT" | "MEDIUM IMPACT";

type AiInsightCard = {
  id: string;
  impact: ImpactLevel;
  confidence: number;
  metric: string;
  title: string;
  description: string;
  recommendation: string;
  actionLabel: string;
};

const insightCards: AiInsightCard[] = [
  {
    id: "surge-demand-forecast",
    impact: "HIGH IMPACT",
    confidence: 94,
    metric: "+38% Booking Volume",
    title: "Surge Demand Forecast for Kathmandu Valley",
    description:
      "Predictive neural model forecasts +38% surge in Deep House Cleaning and AC Servicing in Kathmandu and Lalitpur ahead of upcoming festive season.",
    recommendation:
      "Onboard 40+ verified cleaning teams in Baneshwor, Patan, and Bhaktapur by Aug 10.",
    actionLabel: "Launch Provider Recruitment Banner",
  },
  {
    id: "smart-pricing-dynamic-adjustment",
    impact: "MEDIUM IMPACT",
    confidence: 88,
    metric: "2.4x Supply Shortage",
    title: "Smart Pricing Dynamic Adjustment",
    description:
      "Plumbing demand in Lakeside Pokhara exceeds active provider capacity by 2.4x during evening hours (04:00 PM - 07:00 PM).",
    recommendation:
      "Apply +15% evening surge pricing to incentivize off-duty Pokhara plumbers.",
    actionLabel: "Activate Evening Surge Rule",
  },
  {
    id: "off-platform-payment-risk",
    impact: "HIGH IMPACT",
    confidence: 91,
    metric: "3 Suspicious Accounts",
    title: "Off-Platform Payment Risk Flagged",
    description:
      "AI pattern analysis detected 3 service providers encouraging cash payments outside BOLAO app to bypass commission.",
    recommendation:
      "Send automatic compliance warning push and temporarily hold wallet settlement.",
    actionLabel: "Review Suspicious Accounts",
  },
];

const AIAnalyticsPage = () => {
  const [query, setQuery] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [lastQuery, setLastQuery] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  const handleAnalyze = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || analyzing) return;

    setAnalyzing(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      setAnalyzing(false);
      setLastQuery(trimmed);
      setQuery("");
    }, 1200);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Page Header */}
      <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center shrink-0">
            <BrainCircuit className="w-5 h-5 text-[#FF6B35]" />
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight text-neutral-900">
            <span className="text-[#FF6B35]">BOLAO</span> AI Intelligence
            &amp; Predictive Analytics
          </h1>
        </div>
        <p className="text-sm text-neutral-500 mt-1.5">
          Machine learning neural models for demand forecasting, dynamic smart
          pricing, and fraud detection in Nepal.
        </p>
      </div>

      {/* AI Neural Engine Search */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-neutral-950 p-5 shadow-md ring-1 ring-slate-800/80">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 -right-12 h-52 w-52 rounded-full bg-[#FF6B35]/20 blur-3xl"
        />
        <div className="relative flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FF6B35]" />
          <h2 className="text-sm font-extrabold tracking-[0.14em] text-[#FF6B35]">
            ASK BOLAO NEURAL ENGINE
          </h2>
        </div>

        <form
          onSubmit={handleAnalyze}
          className="relative mt-4 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="e.g., Predict provider shortages for Pokhara tomorrow or analyze plumbing revenue in Kathmandu..."
            aria-label="Ask the BOLAO neural engine a predictive analytics question"
            className="h-11 w-full flex-1 rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-medium text-white placeholder:text-white/35 outline-none transition focus:border-[#FF6B35] focus:bg-white/10"
          />
          <button
            type="submit"
            disabled={analyzing}
            className="h-11 px-5 rounded-xl bg-[#FF6B35] text-white text-sm font-bold inline-flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B35]/25 transition hover:bg-[#FF5A28] active:bg-[#F05520] disabled:cursor-not-allowed disabled:opacity-75"
          >
            {analyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {analyzing ? "Analyzing" : "Analyze"}
          </button>
        </form>

        {lastQuery && (
          <p className="relative mt-3 text-[12px] font-medium text-white/45">
            Last analyzed:{" "}
            <span className="text-white/75">&ldquo;{lastQuery}&rdquo;</span> ·
            insight cards refreshed just now
          </p>
        )}
      </section>

      {/* AI Insight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {insightCards.map((card) => (
          <article
            key={card.id}
            className="flex flex-col bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3 flex-wrap">
              <span className="inline-flex items-center rounded-full bg-neutral-900 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white whitespace-nowrap">
                {card.impact} ({card.confidence}% Confidence)
              </span>
              <span className="text-[13px] font-extrabold text-[#FF6B35] text-right">
                {card.metric}
              </span>
            </div>

            <h3 className="mt-3.5 text-[15px] font-extrabold tracking-tight text-neutral-900">
              {card.title}
            </h3>
            <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-neutral-500">
              {card.description}
            </p>

            <div className="mt-4 rounded-xl border border-orange-100 bg-orange-50/60 p-3.5">
              <div className="flex items-center gap-1.5 text-[12px] font-extrabold text-neutral-900">
                <Lightbulb className="w-3.5 h-3.5 text-[#FF6B35] shrink-0" />
                AI Recommendation:
              </div>
              <p className="mt-1.5 text-[13px] font-medium leading-relaxed text-neutral-700">
                {card.recommendation}
              </p>
            </div>

            <div className="mt-auto pt-4">
              <button
                type="button"
                className="w-full h-10 rounded-xl border border-[#FF6B35] text-[#FF6B35] text-[13px] font-bold inline-flex items-center justify-center gap-2 transition hover:bg-[#FF6B35] hover:text-white"
              >
                {card.actionLabel}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default AIAnalyticsPage;
