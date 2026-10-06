import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Layers, Save, Tag, Zap } from "lucide-react";
import Button from "@/components/Button";
import TextInput from "@/components/common/TextInput";

type SubCategory = {
  id: string;
  name: string;
  nameNepali?: string;
  basePriceNpr: number;
};

type PricingCategory = {
  id: string;
  name: string;
  commissionPercentage: number;
  subCategories: SubCategory[];
};

type PricingRules = {
  minHourlyNpr: number;
  maxHourlyNpr: number;
  estimatedDailyNpr: number;
  estimatedWeeklyNpr: number;
  estimatedMonthlyNpr: number;
  platformCommissionPct: number;
  emergencyFeeNpr: number;
  holidayFeeNpr: number;
  nightServiceFeeNpr: number;
  travelChargeNpr: number;
  minDurationMins: number;
  maxDurationMins: number;
};

/** Pill used for the "Smart Pricing Engine" / "NPR currency" callouts. */
const Badge = ({
  children,
}: {
  variant?: "orange";
  children: React.ReactNode;
}) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-orange-100 bg-orange-50 text-[11px] font-bold text-[#FF6B00] whitespace-nowrap shrink-0">
    {children}
  </span>
);

const INITIAL_CATEGORIES: PricingCategory[] = [
  {
    id: "plumbing",
    name: "Plumbing & Water Systems",
    commissionPercentage: 15,
    subCategories: [
      {
        id: "tap-leak",
        name: "Tap Leakage Repair",
        nameNepali: "धारा मर्मत",
        basePriceNpr: 1200,
      },
      {
        id: "tank-install",
        name: "Water Tank Installation",
        nameNepali: "ट्यांकी जडान",
        basePriceNpr: 4500,
      },
      {
        id: "commode-basin",
        name: "Commode & Basin Fitting",
        nameNepali: "कमोड जडान",
        basePriceNpr: 1800,
      },
    ],
  },
  {
    id: "electrical",
    name: "Electrical & Power Repairs",
    commissionPercentage: 15,
    subCategories: [
      {
        id: "short-circuit",
        name: "Short Circuit Repair",
        nameNepali: "सर्ट सर्किट मर्मत",
        basePriceNpr: 1500,
      },
      {
        id: "inverter-wiring",
        name: "Inverter & Battery Wiring",
        nameNepali: "इनभर्टर वायरिङ",
        basePriceNpr: 2200,
      },
      {
        id: "fan-light",
        name: "Fan & Light Installation",
        nameNepali: "पङ्का जडान",
        basePriceNpr: 900,
      },
    ],
  },
  {
    id: "cleaning",
    name: "Deep Home Cleaning",
    commissionPercentage: 18,
    subCategories: [
      {
        id: "sofa-shampoo",
        name: "Sofa & Mattress Shampoo",
        nameNepali: "सोफा सरसफाइ",
        basePriceNpr: 2500,
      },
      {
        id: "full-house",
        name: "Full House Deep Clean",
        nameNepali: "फुल हाउस क्लिन",
        basePriceNpr: 8000,
      },
      {
        id: "tank-sanitize",
        name: "Water Tank Sanitization",
        nameNepali: "ट्यांकी सरसफाइ",
        basePriceNpr: 3500,
      },
    ],
  },
  {
    id: "beauty",
    name: "Home Beauty & Salon",
    commissionPercentage: 20,
    subCategories: [
      {
        id: "herbal-facial",
        name: "Herbal Glow Facial",
        nameNepali: "फेसियल",
        basePriceNpr: 2500,
      },
      {
        id: "bridal-makeup",
        name: "Bridal Makeup Package",
        nameNepali: "ब्राइडल मेकअप",
        basePriceNpr: 15000,
      },
      {
        id: "hair-spa",
        name: "Hair Spa & Keratin",
        nameNepali: "हेयर स्पा",
        basePriceNpr: 4000,
      },
    ],
  },
  {
    id: "ac-repair",
    name: "AC & Appliance Repair",
    commissionPercentage: 15,
    subCategories: [
      {
        id: "ac-gas",
        name: "AC Gas Refill R32/R410",
        nameNepali: "एसी ग्यास भर्ने",
        basePriceNpr: 3500,
      },
      {
        id: "washer-repair",
        name: "Washing Machine Repair",
        nameNepali: "वासिङ मेसिन मर्मत",
        basePriceNpr: 1800,
      },
    ],
  },
];

/** Fallback rules; each category only overrides the commission percentage. */
const BASE_RULES: PricingRules = {
  minHourlyNpr: 500,
  maxHourlyNpr: 1500,
  estimatedDailyNpr: 6000,
  estimatedWeeklyNpr: 30000,
  estimatedMonthlyNpr: 90000,
  platformCommissionPct: 15,
  emergencyFeeNpr: 800,
  holidayFeeNpr: 500,
  nightServiceFeeNpr: 350,
  travelChargeNpr: 50,
  minDurationMins: 60,
  maxDurationMins: 480,
};

const PricingPage = () => {
  const [categories, setCategories] =
    useState<PricingCategory[]>(INITIAL_CATEGORIES);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    INITIAL_CATEGORIES[0].id,
  );
  const [rulesByCategory] = useState<Record<string, PricingRules>>(() =>
    Object.fromEntries(
      INITIAL_CATEGORIES.map((cat): [string, PricingRules] => [
        cat.id,
        { ...BASE_RULES, platformCommissionPct: cat.commissionPercentage },
      ]),
    ),
  );
  const [saveSuccess, setSaveSuccess] = useState(false);

  const selectedCategory =
    categories.find((cat) => cat.id === selectedCategoryId) ?? categories[0];
  const pricing = rulesByCategory[selectedCategoryId] ?? BASE_RULES;

  /** TextInput is wired through react-hook-form, like the other admin forms. */
  const {
    register,
    formState: { errors },
  } = useForm<PricingRules>({ defaultValues: pricing });

  const handleSelectCategory = (cat: PricingCategory) =>
    setSelectedCategoryId(cat.id);

  const updateSubCategoryPricing = (
    categoryId: string,
    subId: string,
    basePriceNpr: number,
  ) =>
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id !== categoryId
          ? cat
          : {
              ...cat,
              subCategories: cat.subCategories.map((sub) =>
                sub.id === subId ? { ...sub, basePriceNpr } : sub,
              ),
            },
      ),
    );

  const handleSavePricing = () => {
    setSaveSuccess(true);
    window.setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl text-slate-900 tracking-tight flex items-center gap-2">
            Service Pricing Configuration.
          </h1>
          <p className="text-xs text-slate-600 mt-1 font-medium">
            Configure hourly, daily, weekly, and monthly rates, night & holiday
            surcharges, and instant cost estimations.
          </p>
        </div>

        <Button variant="primary" onClick={handleSavePricing}>
          <Save className="w-4 h-4" />
          {saveSuccess ? "Saved Successfully!" : "Save Pricing Rules"}
        </Button>
      </div>

      {/* Category Picker Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = cat.id === selectedCategory?.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleSelectCategory(cat)}
              className={` cursor-pointer px-4 py-2.5 rounded-2xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 border ${
                isSelected
                  ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-md shadow-orange-500/20"
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#FF6B00]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>{cat.name}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"}`}
              >
                {cat.commissionPercentage}%
              </span>
            </button>
          );
        })}
      </div>

      {selectedCategory && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1 space-y-6">
            {/* Base Rates Card */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Base Tiered Pricing Rates ({selectedCategory.name})
                    </h3>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Specify hourly range and estimated bulk booking costs
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <TextInput
                  errors={errors}
                  label="Min Hourly Rate"
                  name="minHourlyNpr"
                  register={register}
                  type="number"
                  value={String(pricing.minHourlyNpr)}
                />

                <TextInput
                  errors={errors}
                  label="Max Hourly Rate"
                  name="maxHourlyNpr"
                  register={register}
                  type="number"
                  value={String(pricing.maxHourlyNpr)}
                />

                <TextInput
                  errors={errors}
                  label="Est. Daily Cost (8 Hrs)"
                  name="estimatedDailyNpr"
                  register={register}
                  type="number"
                  value={String(pricing.estimatedDailyNpr)}
                />

                <TextInput
                  errors={errors}
                  label="Est. Weekly Package"
                  name="estimatedWeeklyNpr"
                  register={register}
                  type="number"
                  value={String(pricing.estimatedWeeklyNpr)}
                />

                <TextInput
                  errors={errors}
                  label="Est. Monthly Contract"
                  name="estimatedMonthlyNpr"
                  register={register}
                  type="number"
                  value={String(pricing.estimatedMonthlyNpr)}
                />

                <TextInput
                  errors={errors}
                  label="Platform Commission (%)"
                  max={50}
                  min={0}
                  name="platformCommissionPct"
                  register={register}
                  type="number"
                  value={String(pricing.platformCommissionPct)}
                />
              </div>
            </div>

            {/* Subcategory Specific Base Prices Table */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900">
                Subcategory Fixed Base Prices
              </h3>
              <div className="space-y-2">
                {selectedCategory.subCategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 block">
                        {sub.name}
                      </span>
                      {sub.nameNepali && (
                        <span className="text-[10px] text-amber-600 font-semibold block">
                          {sub.nameNepali}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-medium">
                        Fixed Rate:
                      </span>
                      <input
                        type="number"
                        value={sub.basePriceNpr}
                        onChange={(e) =>
                          updateSubCategoryPricing(
                            selectedCategory.id,
                            sub.id,
                            Number(e.target.value),
                          )
                        }
                        className="w-28 px-3 py-1 bg-white border border-slate-300 rounded-lg text-right font-extrabold text-slate-900"
                      />
                      <span className="font-bold text-slate-700">NPR</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: surcharge rules */}
          <div className="lg:col-span-1">
            <div className="p-5 bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900">
                    Emergency, Night, & Travel Surcharges
                  </h3>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Auto-added surcharge rules for off-hours, rush orders, and
                    travel distance
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className=" flex gap-x-2">
                  <TextInput
                    errors={errors}
                    label="Emergency Rush Fee (NPR)"
                    name="emergencyFeeNpr"
                    register={register}
                    type="number"
                    value={String(pricing.emergencyFeeNpr)}
                  />
                  <TextInput
                    errors={errors}
                    label="Public Holiday Surcharge (NPR)"
                    name="holidayFeeNpr"
                    register={register}
                    type="number"
                    value={String(pricing.holidayFeeNpr)}
                  />
                </div>

                <TextInput
                  errors={errors}
                  label="Night Service Surcharge (After 06:00 PM)"
                  name="nightServiceFeeNpr"
                  register={register}
                  type="number"
                  value={String(pricing.nightServiceFeeNpr)}
                />

                <TextInput
                  errors={errors}
                  label="Travel / Distance Fee (NPR / km)"
                  name="travelChargeNpr"
                  register={register}
                  type="number"
                  value={String(pricing.travelChargeNpr)}
                />

                <div className="pt-1 border-t border-slate-100" />

                <TextInput
                  errors={errors}
                  label="Min Booking Duration (Minutes)"
                  name="minDurationMins"
                  register={register}
                  type="number"
                  value={String(pricing.minDurationMins)}
                />

                <TextInput
                  errors={errors}
                  label="Max Booking Duration (Minutes)"
                  name="maxDurationMins"
                  register={register}
                  type="number"
                  value={String(pricing.maxDurationMins)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPage;
