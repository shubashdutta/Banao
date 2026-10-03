import React, { useMemo, useState } from "react";
import {
  ArrowRight,
  BadgeCheck,
  Ban,
  Check,
  CheckCircle2,
  ChevronRight,
  Download,
  Heart,
  MapPin,
  MessageSquareText,
  Search,
  Shield,
  SlidersHorizontal,
  Star,
  TrendingUp,
  X,
} from "lucide-react";

type ReviewStatus = "Published" | "Pending" | "Flagged";
type ReviewTab = "All" | ReviewStatus;

type Review = {
  id: string;
  customer: string;
  customerImg: string;
  provider: string;
  providerSkill: string;
  providerImg: string;
  rating: number;
  service: string;
  city: string;
  date: string;
  comment: string;
  status: ReviewStatus;
  helpful: number;
  verified: boolean;
  reply?: string;
};

const reviews: Review[] = [
  {
    id: "RV-8842",
    customer: "Aashish Shrestha",
    customerImg:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
    provider: "Ramesh Thapa",
    providerSkill: "Home Cleaning",
    providerImg:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    service: "Deep House Cleaning - 3BHK",
    city: "Kathmandu",
    date: "Sep 30, 2026",
    comment:
      "Ramesh dai and his team arrived exactly on time and deep-cleaned the whole flat before Dashain. Very polite, fully equipped, and the kitchen looks brand new. Highly recommended!",
    status: "Published",
    helpful: 24,
    verified: true,
    reply:
      "Thank you so much Aashish ji! It was a pleasure serving your family. See you again next Dashain.",
  },
  {
    id: "RV-8841",
    customer: "Priya Maharjan",
    customerImg:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    provider: "Suresh Yadav",
    providerSkill: "Electrician",
    providerImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    service: "AC Installation & Gas Refill",
    city: "Pokhara",
    date: "Sep 29, 2026",
    comment:
      "Good service and a fair price. The technician explained the gas refill process clearly. Only reason for 4 stars is a 40 minute delay due to Lakeside traffic.",
    status: "Published",
    helpful: 11,
    verified: true,
    reply:
      "Thank you for your patience, Priya ji. We will plan a buffer for Lakeside traffic next time.",
  },
  {
    id: "RV-8840",
    customer: "Rajesh Karki",
    customerImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    provider: "Hari Bahadur",
    providerSkill: "Plumber",
    providerImg:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    rating: 2,
    service: "Bathroom Leak Repair",
    city: "Lalitpur",
    date: "Sep 28, 2026",
    comment:
      "The leak started again within two days. When I called to follow up, the provider asked me to pay extra for revisiting. Not happy with the guarantee promise.",
    status: "Flagged",
    helpful: 6,
    verified: true,
  },
  {
    id: "RV-8839",
    customer: "Sunita Gurung",
    customerImg:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop",
    provider: "Gita Sharma",
    providerSkill: "Home Cleaning",
    providerImg:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    service: "Weekly Kitchen Deep Clean",
    city: "Lalitpur",
    date: "Sep 27, 2026",
    comment:
      "Gita didi is extremely thorough and trustworthy. She finished everything on the checklist and even organised my pantry shelves. Booking again for next week.",
    status: "Pending",
    helpful: 0,
    verified: true,
  },
  {
    id: "RV-8838",
    customer: "Bibek Adhikari",
    customerImg:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=200&auto=format&fit=crop",
    provider: "Dipak Gurung",
    providerSkill: "Painter",
    providerImg:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    rating: 3,
    service: "Interior Wall Painting - 2 Rooms",
    city: "Kathmandu",
    date: "Sep 26, 2026",
    comment:
      "Paint quality and finish are decent for the price. However there were small drips near the edges that needed touching up. Average experience overall.",
    status: "Published",
    helpful: 8,
    verified: false,
    reply:
      "Sorry for the touch-up misses, Bibek ji. Our 7-day rework window is open - we will send the crew again at no cost.",
  },
  {
    id: "RV-8837",
    customer: "Manisha Tamang",
    customerImg:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    provider: "Bikash Rai",
    providerSkill: "AC Repair",
    providerImg:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    rating: 1,
    service: "AC Annual Servicing",
    city: "Pokhara",
    date: "Sep 25, 2026",
    comment:
      "The provider cancelled twice on the same day and then asked me to transfer the full amount to eSewa before the visit. This feels like a scam, please investigate.",
    status: "Flagged",
    helpful: 15,
    verified: true,
  },
  {
    id: "RV-8836",
    customer: "Karan Lama",
    customerImg:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
    provider: "Anita KC",
    providerSkill: "Beautician",
    providerImg:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
    rating: 5,
    service: "Bridal Makeup & Hairstyle",
    city: "Kathmandu",
    date: "Sep 24, 2026",
    comment:
      "Anita was so professional for my sister's wedding look. Products were branded and the finish lasted all day. She is definitely worth the price.",
    status: "Published",
    helpful: 32,
    verified: true,
    reply: "Thank you Karan ji! Best wishes to your sister from the Banao family.",
  },
  {
    id: "RV-8835",
    customer: "Nisha KC",
    customerImg:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=200&auto=format&fit=crop",
    provider: "Santosh Magar",
    providerSkill: "Electrician",
    providerImg:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    rating: 4,
    service: "Wiring Fault Inspection",
    city: "Bhaktapur",
    date: "Sep 23, 2026",
    comment:
      "Found the faulty group in the distribution box quickly and fixed it during the same visit. Would have liked a proper written invoice.",
    status: "Pending",
    helpful: 0,
    verified: true,
  },
];

const reviewTabs: ReviewTab[] = ["All", "Published", "Pending", "Flagged"];

const ratingDistribution = [
  { stars: 5, count: 26412 },
  { stars: 4, count: 3980 },
  { stars: 3, count: 1120 },
  { stars: 2, count: 604 },
  { stars: 1, count: 365 },
];

const statusStyle: Record<ReviewStatus, string> = {
  Published: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Pending: "bg-amber-50 text-amber-600 border-amber-100",
  Flagged: "bg-red-50 text-red-600 border-red-100",
};

const StarRow = ({
  rating,
  size = "sm",
}: {
  rating: number;
  size?: "sm" | "md";
}) => {
  const dim = size === "md" ? "w-4 h-4" : "w-3.5 h-3.5";
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${dim} ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-neutral-200 text-neutral-200"
          }`}
        />
      ))}
    </div>
  );
};

const RatingBar = ({
  stars,
  count,
  total,
}: {
  stars: number;
  count: number;
  total: number;
}) => {
  const percent = Math.round((count / total) * 100);
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex w-10 shrink-0 items-center gap-1 text-xs font-bold text-neutral-600">
        {stars}
        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
      </span>
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full bg-amber-400"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="w-12 shrink-0 text-right text-xs font-semibold text-neutral-400">
        {count.toLocaleString()}
      </span>
    </div>
  );
};

const ReviewCard = ({ review }: { review: Review }) => (
  <article className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm transition hover:shadow-md">
    {/* Customer + status */}
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex min-w-0 items-start gap-3">
        <img
          src={review.customerImg}
          alt={review.customer}
          className="h-11 w-11 shrink-0 rounded-full border border-neutral-200 object-cover"
        />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="truncate font-bold text-neutral-900">
              {review.customer}
            </span>
            {review.verified && (
              <BadgeCheck className="h-4 w-4 shrink-0 text-blue-500" />
            )}
            <span className="text-[11px] font-semibold text-neutral-400">
              {review.id}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <StarRow rating={review.rating} />
            <span className="text-[11px] font-semibold text-neutral-400">
              {review.date}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-neutral-400">
              <MapPin className="h-3 w-3" />
              {review.city}
            </span>
          </div>
        </div>
      </div>
      <span
        className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${
          statusStyle[review.status]
        }`}
      >
        {review.status}
      </span>
    </div>

    {/* Service + provider */}
    <div className="mt-4 flex items-center gap-3 rounded-xl border border-neutral-100 bg-neutral-50/70 p-3">
      <img
        src={review.providerImg}
        alt={review.provider}
        className="h-9 w-9 shrink-0 rounded-lg border border-neutral-200 object-cover"
      />
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-bold text-neutral-800">
          {review.provider}
        </div>
        <div className="truncate text-[11px] font-semibold text-neutral-400">
          {review.providerSkill} • {review.service}
        </div>
      </div>
    </div>

    {/* Comment */}
    <p className="mt-4 text-[13.5px] leading-relaxed text-neutral-600">
      {review.comment}
    </p>

    {/* Provider reply */}
    {review.reply && (
      <div className="mt-3 rounded-xl border border-orange-100 bg-orange-50/60 p-3">
        <div className="flex items-center gap-1.5 text-[12px] font-extrabold text-neutral-800">
          <MessageSquareText className="h-3.5 w-3.5 text-[#FF6B35]" />
          Provider reply
        </div>
        <p className="mt-1 text-[12.5px] leading-relaxed text-neutral-600">
          {review.reply}
        </p>
      </div>
    )}

    {/* Footer actions */}
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-100 pt-4">
      <span className="flex items-center gap-1.5 text-[11px] font-semibold text-neutral-400">
        <Heart className="h-3.5 w-3.5" />
        {review.helpful} found helpful
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {review.status === "Pending" ? (
          <>
            <button className="flex h-9 items-center gap-1.5 rounded-full bg-emerald-600 px-3.5 text-xs font-bold text-white transition hover:bg-emerald-700">
              <Check className="h-3.5 w-3.5" /> Publish
            </button>
            <button className="flex h-9 items-center gap-1.5 rounded-full border border-red-100 bg-red-50 px-3.5 text-xs font-bold text-red-600 transition hover:bg-red-100">
              <X className="h-3.5 w-3.5" /> Reject
            </button>
          </>
        ) : review.status === "Flagged" ? (
          <>
            <button className="flex h-9 items-center gap-1.5 rounded-full bg-neutral-900 px-3.5 text-xs font-bold text-white transition hover:bg-neutral-800">
              <Shield className="h-3.5 w-3.5" /> Investigate
            </button>
            <button className="flex h-9 items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 text-xs font-bold text-neutral-600 transition hover:bg-neutral-50">
              <CheckCircle2 className="h-3.5 w-3.5" /> Keep
            </button>
          </>
        ) : (
          <button className="flex h-9 items-center gap-1.5 rounded-full border border-neutral-200 px-3.5 text-xs font-bold text-neutral-700 transition hover:bg-neutral-50">
            <MessageSquareText className="h-3.5 w-3.5" /> Reply
          </button>
        )}
        <button
          type="button"
          aria-label="Flag review"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-400 transition hover:bg-neutral-50 hover:text-neutral-700"
        >
          <Ban className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  </article>
);

const ReviewPage = () => {
  const [tab, setTab] = useState<ReviewTab>("All");
  const [query, setQuery] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All ratings");
  const [city, setCity] = useState("All cities");

  const counts = useMemo(
    () =>
      reviewTabs.reduce<Record<ReviewTab, number>>(
        (acc, key) => {
          acc[key] =
            key === "All"
              ? reviews.length
              : reviews.filter((review) => review.status === key).length;
          return acc;
        },
        { All: 0, Published: 0, Pending: 0, Flagged: 0 },
      ),
    [],
  );

  const totalReviews = useMemo(
    () => ratingDistribution.reduce((sum, row) => sum + row.count, 0),
    [],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return reviews.filter((review) => {
      const matchTab = tab === "All" || review.status === tab;
      const matchQuery =
        q.length === 0 ||
        review.customer.toLowerCase().includes(q) ||
        review.provider.toLowerCase().includes(q) ||
        review.service.toLowerCase().includes(q) ||
        review.comment.toLowerCase().includes(q) ||
        review.id.toLowerCase().includes(q);
      const matchRating =
        ratingFilter === "All ratings" ||
        review.rating === Number(ratingFilter.charAt(0));
      const matchCity = city === "All cities" || review.city === city;
      return matchTab && matchQuery && matchRating && matchCity;
    });
  }, [tab, query, ratingFilter, city]);

  const resetFilters = () => {
    setTab("All");
    setQuery("");
    setRatingFilter("All ratings");
    setCity("All cities");
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-400">
            <span>Admin</span>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-neutral-700">Reviews</span>
            <span className="ml-1 rounded-full border border-orange-100 bg-orange-50 px-2 py-0.5 text-[#FF6B35]">
              4.8 avg rating
            </span>
          </div>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-900">
            Reviews &amp; Ratings
          </h1>
          <p className="mt-0.5 text-sm text-neutral-500">
            Moderate customer feedback, respond to providers, and resolve flagged
            reviews across Kathmandu, Pokhara &amp; Lalitpur.
          </p>
        </div>
        <button className="flex h-10 items-center gap-1.5 self-start rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 shadow-sm hover:bg-neutral-50 lg:self-auto">
          <Download className="h-4 w-4" /> Export reviews
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[
          ["Average Rating", "4.8", `${totalReviews.toLocaleString()} total reviews`],
          ["Published", String(counts.Published), "live on provider profiles"],
          ["Pending Moderation", String(counts.Pending), "waiting for approval"],
          ["Flagged", String(counts.Flagged), "under investigation"],
        ].map(([label, value, hint]) => (
          <div
            key={label}
            className="rounded-2xl border border-neutral-200/70 bg-white px-5 py-4 shadow-sm"
          >
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              {label}
            </div>
            <div className="mt-1 text-xl font-semibold text-neutral-900">
              {value}
            </div>
            <div className="mt-0.5 text-xs font-medium text-neutral-500">
              {hint}
            </div>
          </div>
        ))}
      </div>

      {/* Rating overview + controls */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[340px_1fr]">
        <div className="rounded-2xl border border-neutral-200/70 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-900">
              Rating overview
            </h2>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" /> +0.2 this month
            </span>
          </div>
          <div className="mt-4 flex items-end gap-3">
            <div className="text-4xl font-extrabold tracking-tight text-neutral-900">
              4.8
            </div>
            <div className="pb-1">
              <StarRow rating={5} size="md" />
              <div className="mt-0.5 text-[11px] font-semibold text-neutral-400">
                {totalReviews.toLocaleString()} verified reviews
              </div>
            </div>
          </div>
          <div className="mt-4 space-y-2.5">
            {ratingDistribution.map((row) => (
              <RatingBar
                key={row.stars}
                stars={row.stars}
                count={row.count}
                total={totalReviews}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Tabs */}
          <div className="flex gap-1.5 overflow-x-auto rounded-2xl border border-neutral-200/70 bg-white p-2 shadow-sm">
            {reviewTabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex h-10 cursor-pointer items-center gap-2 whitespace-nowrap rounded-xl px-5 text-sm font-bold transition ${
                  tab === t
                    ? "bg-[#FF6B35] text-white shadow"
                    : "text-neutral-500 hover:bg-neutral-50"
                }`}
              >
                {t === "All" ? "All Reviews" : t}
                <span
                  className={`rounded-full px-2 py-0.5 text-[11px] font-extrabold ${
                    tab === t
                      ? "bg-white/25 text-white"
                      : "bg-neutral-100 text-neutral-500"
                  }`}
                >
                  {counts[t]}
                </span>
              </button>
            ))}
          </div>

          {/* Search + filters */}
          <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200/70 bg-white p-4 shadow-sm md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by customer, provider or review text..."
                className="h-11 w-full rounded-full border border-neutral-200 bg-neutral-50 pl-11 pr-4 text-sm outline-none transition focus:border-[#FF6B35] focus:bg-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="hidden h-4 w-4 shrink-0 text-neutral-400 md:block" />
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="h-11 cursor-pointer rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 outline-none"
              >
                {[
                  "All ratings",
                  "5 stars",
                  "4 stars",
                  "3 stars",
                  "2 stars",
                  "1 star",
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="h-11 cursor-pointer rounded-full border border-neutral-200 bg-white px-4 text-sm font-semibold text-neutral-700 outline-none"
              >
                {[
                  "All cities",
                  "Kathmandu",
                  "Pokhara",
                  "Lalitpur",
                  "Bhaktapur",
                ].map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews list */}
      <div>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
          <h2 className="flex items-center gap-2 text-lg font-bold text-neutral-900">
            <MessageSquareText className="h-4 w-4 text-[#FF6B35]" />
            {tab === "All" ? "All Reviews" : `${tab} Reviews`}
          </h2>
          <span className="text-sm font-semibold text-neutral-500">
            {filtered.length} {filtered.length === 1 ? "review" : "reviews"}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          {filtered.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
              <MessageSquareText className="h-6 w-6 text-[#FF6B35]" />
            </div>
            <h3 className="mt-4 text-base font-bold text-neutral-900">
              No reviews found
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm text-neutral-500">
              No reviews match your current tab, rating or city filters. Try
              adjusting the filters to see more feedback.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#FF6B35] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#f45d26]"
            >
              Reset filters <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
      
    </div>
  )
}

export default ReviewPage
