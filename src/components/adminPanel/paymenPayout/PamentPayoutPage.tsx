import React, { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock,
  Download,
  FileBarChart2Icon,
  Navigation,
  Search,
  Wallet,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

type PStatus = "PENDING" | "PAID" | "REJECTED";
type Payout = {
  id: string;
  name: string;
  code: string;
  earnings: string;
  commission: string;
  net: string;
  customer_Name?: string;
  Customer_Address?: string;
  /** Numeric counterpart of `net`, used to compute the stats view totals. */
  netNum: number;
  gateway: string;
  account: string;
  status: PStatus;
};

// const payouts: Payout[] = [
//   {
//     id: "PAY-8801",
//     name: "Ram Shrestha",
//     code: "PROV-201",
//     earnings: "NPR Rs. 45,000",
//     commission: "- NPR Rs. 6,750",
//     net: "NPR Rs. 38,250",
//     netNum: 38250,
//     gateway: "eSewa",
//     account: "9881234567",
//     status: "PENDING",
//   },
//   {
//     id: "PAY-8802",
//     name: "Sita Sharma",
//     code: "PROV-202",
//     earnings: "NPR Rs. 68,000",
//     commission: "- NPR Rs. 10,200",
//     net: "NPR Rs. 57,800",
//     netNum: 57800,
//     gateway: "Khalti",
//     account: "9841987654",
//     status: "PENDING",
//   },
//   {
//     id: "PAY-8803",
//     name: "Bikash Tamang",
//     code: "PROV-203",
//     earnings: "NPR Rs. 32,000",
//     commission: "- NPR Rs. 4,800",
//     net: "NPR Rs. 27,200",
//     netNum: 27200,
//     gateway: "Bank Transfer (NABIL)",
//     account: "0192837465012",
//     status: "PAID",
//   },
//   {
//     id: "PAY-8804",
//     name: "Kiran Gurung",
//     code: "PROV-204",
//     earnings: "NPR Rs. 18,500",
//     commission: "- NPR Rs. 2,775",
//     net: "NPR Rs. 15,725",
//     netNum: 15725,
//     gateway: "Fonepay Direct",
//     account: "9888112233",
//     status: "PAID",
//   },
//   {
//     id: "PAY-8805",
//     name: "Anita Maharjan",
//     code: "PROV-205",
//     earnings: "NPR Rs. 54,000",
//     commission: "- NPR Rs. 8,100",
//     customer_Name: "Bikash Thapa",
//     Customer_Address: "8765432",
//     net: "NPR Rs. 45,900",
//     netNum: 45900,
//     gateway: "eSewa",
//     account: "9812345678",
//     status: "PENDING",
//   },
//   {
//     id: "PAY-8806",
//     name: "Deepak Thapa",
//     code: "PROV-206",
//     earnings: "NPR Rs. 24,000",
//     commission: "- NPR Rs. 3,600",
//     customer_Name: "Bikash Thapa",
//     Customer_Address: "8765432",
//     net: "NPR Rs. 20,400",
//     netNum: 20400,
//     gateway: "Khalti",
//     account: "9851122334",
//     status: "PAID",
//   },
//   {
//     id: "PAY-8807",
//     name: "Puja Karki",
//     code: "PROV-207",
//     earnings: "NPR Rs. 12,000",
//     customer_Name: "Bikash Thapa",
//     Customer_Address: "8765432",
//     commission: "- NPR Rs. 1,800",
//     net: "NPR Rs. 10,200",
//     netNum: 10200,
//     gateway: "Bank Transfer (Global IME)",
//     account: "0581002938475",
//     status: "REJECTED",
//   },
//   {
//     id: "PAY-8808",
//     name: "Subash Adhikari",
//     code: "PROV-208",
//     earnings: "NPR Rs. 75,000",
//     commission: "- NPR Rs. 11,250",
//     customer_Name: "Bikash Thapa",
//     Customer_Address: "8765432",
//     net: "NPR Rs. 63,750",
//     netNum: 63750,
//     gateway: "eSewa",
//     account: "9822334455",
//     status: "PENDING",
//   },
//   {
//     id: "PAY-8809",
//     name: "Sunita Rai",
//     code: "PROV-209",
//     earnings: "NPR Rs. 41,000",
//     commission: "- NPR Rs. 6,150",
//     customer_Name: "Bikash Thapa",
//     Customer_Address: "8765432",
//     net: "NPR Rs. 34,850",
//     netNum: 34850,
//     gateway: "Fonepay Direct",
//     account: "9883445566",
//     status: "PAID",
//   },
//   {
//     id: "PAY-8810",
//     name: "Ramesh Koirala",
//     code: "PROV-210",
//     earnings: "NPR Rs. 29,000",
//     customer_Name: "Bikash Thapa",
//     Customer_Address: "8765432",
//     commission: "- NPR Rs. 4,350",
//     net: "NPR Rs. 24,650",
//     netNum: 24650,
//     gateway: "Khalti",
//     account: "9840112233",
//     status: "PAID",
//   },
// ];

const payouts: Payout[] = [
  {
    id: "PAY-8801",
    name: "Ram Shrestha",
    code: "PROV-201",
    earnings: "NPR Rs. 45,000",
    commission: "- NPR Rs. 6,750",
    customer_Name: "Bikash Thapa",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 38,250",
    netNum: 38250,
    gateway: "eSewa",
    account: "9881234567",
    status: "PENDING",
  },
  {
    id: "PAY-8802",
    name: "Sita Sharma",
    code: "PROV-202",
    earnings: "NPR Rs. 68,000",
    commission: "- NPR Rs. 10,200",
    customer_Name: "Aayush Sharma",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 57,800",
    netNum: 57800,
    gateway: "Khalti",
    account: "9841987654",
    status: "PENDING",
  },
  {
    id: "PAY-8803",
    name: "Bikash Tamang",
    code: "PROV-203",
    earnings: "NPR Rs. 32,000",
    commission: "- NPR Rs. 4,800",
    customer_Name: "Suman Gurung",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 27,200",
    netNum: 27200,
    gateway: "Bank Transfer (NABIL)",
    account: "0192837465012",
    status: "PAID",
  },
  {
    id: "PAY-8804",
    name: "Kiran Gurung",
    code: "PROV-204",
    earnings: "NPR Rs. 18,500",
    commission: "- NPR Rs. 2,775",
    customer_Name: "Nisha Karki",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 15,725",
    netNum: 15725,
    gateway: "Fonepay Direct",
    account: "9888112233",
    status: "PAID",
  },
  {
    id: "PAY-8805",
    name: "Anita Maharjan",
    code: "PROV-205",
    earnings: "NPR Rs. 54,000",
    commission: "- NPR Rs. 8,100",
    customer_Name: "Bikash Thapa",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 45,900",
    netNum: 45900,
    gateway: "eSewa",
    account: "9812345678",
    status: "PENDING",
  },
  {
    id: "PAY-8806",
    name: "Deepak Thapa",
    code: "PROV-206",
    earnings: "NPR Rs. 24,000",
    commission: "- NPR Rs. 3,600",
    customer_Name: "Prakash Adhikari",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 20,400",
    netNum: 20400,
    gateway: "Khalti",
    account: "9851122334",
    status: "PAID",
  },
  {
    id: "PAY-8807",
    name: "Puja Karki",
    code: "PROV-207",
    earnings: "NPR Rs. 12,000",
    commission: "- NPR Rs. 1,800",
    customer_Name: "Bikash Thapa",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 10,200",
    netNum: 10200,
    gateway: "Bank Transfer (Global IME)",
    account: "0581002938475",
    status: "REJECTED",
  },
  {
    id: "PAY-8808",
    name: "Subash Adhikari",
    code: "PROV-208",
    earnings: "NPR Rs. 75,000",
    commission: "- NPR Rs. 11,250",
    customer_Name: "Rojina Shrestha",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 63,750",
    netNum: 63750,
    gateway: "eSewa",
    account: "9822334455",
    status: "PENDING",
  },
  {
    id: "PAY-8809",
    name: "Sunita Rai",
    code: "PROV-209",
    earnings: "NPR Rs. 41,000",
    commission: "- NPR Rs. 6,150",
    customer_Name: "Manish Rai",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 34,850",
    netNum: 34850,
    gateway: "Fonepay Direct",
    account: "9883445566",
    status: "PAID",
  },
  {
    id: "PAY-8810",
    name: "Ramesh Koirala",
    code: "PROV-210",
    earnings: "NPR Rs. 29,000",
    commission: "- NPR Rs. 4,350",
    customer_Name: "Bikash Thapa",
    Customer_Address: "Boudha, Kathmandu",
    net: "NPR Rs. 24,650",
    netNum: 24650,
    gateway: "Khalti",
    account: "9840112233",
    status: "PAID",
  },
];

/** Minimum balance a provider must accumulate before a payout can be released. */
const MIN_PAYOUT_THRESHOLD = 1000;

/** Matches the "NPR Rs. 45,000" formatting already used across the payout table. */
const formatNpr = (value: number) =>
  `NPR Rs. ${value.toLocaleString("en-US")}`;

type StatCardProps = {
  label: string;
  value: string;
  icon: typeof Clock;
  /** Icon wrapper classes, e.g. "bg-amber-50 border border-amber-100". */
  iconWrap: string;
  /** Icon colour classes, e.g. "text-amber-600". */
  iconColor: string;
  children: React.ReactNode;
};

const StatCard = ({
  label,
  value,
  icon: Icon,
  iconWrap,
  iconColor,
  children,
}: StatCardProps) => (
  <div className="bg-white border border-neutral-200/70 rounded-2xl p-5 shadow-sm">
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
        {label}
      </span>
      <span
        className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconWrap}`}
      >
        <Icon className={`w-4 h-4 ${iconColor}`} />
      </span>
    </div>
    <div className="text-2xl font-semibold text-neutral-900 mt-2">{value}</div>
    <div className="text-xs font-semibold text-neutral-500 mt-1 flex items-center gap-1">
      {children}
    </div>
  </div>
);

type FilterId = "All" | "Pending" | "Paid" | "stats";

const PamentPayoutPage = () => {
  const [filter, setFilter] = useState<FilterId>("All");
  const [query, setQuery] = useState("");
  const [checked, setChecked] = useState<string[]>([]);

  const navigate = useNavigate();
  const filtered = useMemo(
    () =>
      payouts.filter((p) => {
        const q = query.toLowerCase();
        const mQ =
          !q ||
          p.id.toLowerCase().includes(q) ||
          p.name.toLowerCase().includes(q) ||
          p.account.includes(q);
        if (filter === "Pending") return p.status === "PENDING" && mQ;
        if (filter === "Paid") return p.status === "PAID" && mQ;
        return mQ;
      }),
    [filter, query],
  );
  const allChecked =
    filtered.length > 0 && filtered.every((p) => checked.includes(p.id));
  const toggleAll = () =>
    setChecked(allChecked ? [] : filtered.map((p) => p.id));
  const toggleOne = (id: string) =>
    setChecked((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : [...c, id],
    );

  const showStats = filter === "stats";

  // Stats always summarise the full ledger, independent of the search box.
  const statsSummary = useMemo(() => {
    const pendingRows = payouts.filter((p) => p.status === "PENDING");
    const paidRows = payouts.filter((p) => p.status === "PAID");
    return {
      pendingCount: pendingRows.length,
      pendingNet: pendingRows.reduce((sum, p) => sum + p.netNum, 0),
      paidNet: paidRows.reduce((sum, p) => sum + p.netNum, 0),
      threshold: MIN_PAYOUT_THRESHOLD,
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {/* <div>
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-2xl font-semibold  tracking-tight text-neutral-900">
            Provider Payout Management
          </h1>
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-[#FF6B35] border border-orange-100">
            Automated Settlement
          </span>
        </div>
        <p className="text-sm text-neutral-500 mt-1.5">
          Review settlements, process eSewa/Khalti payouts & export audit
          reports.
        </p>
      </div> */}

      <div className="flex flex-col lg:flex-row gap-3 lg:items-center">
        {!showStats && (
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search payout ID, provider name, or account number..."
              className="h-11 w-full rounded-full border border-neutral-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-[#FF6B35] transition shadow-sm"
            />
          </div>
        )}
        <div className="flex gap-2 items-center">
          {(["All", "Pending", "Paid"] as FilterId[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`h-10 px-4 rounded-full text-[13px] font-bold border transition ${filter === f ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-md shadow-orange-500/25" : "bg-white text-neutral-500 border-neutral-200 hover:bg-neutral-50"}`}
            >
              {f}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setFilter(showStats ? "All" : "stats")}
            aria-pressed={showStats}
            className={`h-10 px-4 rounded-full text-[13px] font-bold border transition flex items-center gap-1.5 whitespace-nowrap ${showStats ? "bg-[#FF6B35] text-white border-[#FF6B35] shadow-md shadow-orange-500/25" : "border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 shadow-sm"}`}
          >
            <FileBarChart2Icon className="w-4 h-4" /> stats
          </button>
          <button className="h-10 px-4 rounded-full border border-neutral-200 bg-white text-[13px] font-bold text-neutral-700 hover:bg-neutral-50 shadow-sm flex items-center gap-1.5 transition whitespace-nowrap">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>
      {showStats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Pending Payout Queue"
            value={formatNpr(statsSummary.pendingNet)}
            icon={Clock}
            iconWrap="bg-amber-50 border border-amber-100"
            iconColor="text-amber-600"
          >
            <Clock className="w-3.5 h-3.5" /> {statsSummary.pendingCount} Pending
            Requests
          </StatCard>
          <StatCard
            label="Total Paid Out"
            value={formatNpr(statsSummary.paidNet)}
            icon={CheckCircle2}
            iconWrap="bg-emerald-50 border border-emerald-100"
            iconColor="text-emerald-600"
          >
            <CheckCircle2 className="w-3.5 h-3.5" /> Settled to Nepalese
            Providers
          </StatCard>
          <StatCard
            label="Min Payout Threshold"
            value={formatNpr(statsSummary.threshold)}
            icon={Wallet}
            iconWrap="bg-orange-50 border border-orange-100"
            iconColor="text-[#FF6B35]"
          >
            <Wallet className="w-3.5 h-3.5" /> Auto-Enforced Policy
          </StatCard>
        </div>
      ) : (
      <div className="bg-white border border-neutral-200/70 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm ">
            <thead className="w-full">
              <tr className="text-left text-xs font-bold uppercase tracking-wider text-white bg-[#FF6B35]">
                <th className="px-4 py-3.5 w-10">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    onChange={toggleAll}
                    className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                  />
                </th>

                <th className="px-4 py-3.5">ID</th>

                <th className="px-4 py-3.5">Provider</th>

                <th className="px-4 py-3.5">Customer</th>

                <th className="px-4 py-3.5 text-right">Earnings</th>

                <th className="px-4 py-3.5 text-right">Commission</th>

                <th className="px-4 py-3.5 text-right">Net Pay</th>

                <th className="px-4 py-3.5">Gateway</th>

                <th className="px-4 py-3.5 text-center">Status</th>

                <th className="px-4 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            {/* <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition"
                >
                  <td className="px-4 py-3.5">
                    <input
                      type="checkbox"
                      checked={checked.includes(p.id)}
                      onChange={() => toggleOne(p.id)}
                      className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                    />
                  </td>
                  <td className="px-4 py-3.5  text-[12px] text-neutral-900 whitespace-nowrap">
                    {p.id}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className=" text-neutral-900 text-[12px]">
                      {p.name}
                    </div>
                    <div className="text-[12px]  text-neutral-400">
                      {p.code}
                    </div>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="   text-neutral-700 text-[12px] ">
                      {p?.customer_Name}
                    </div>
                    <div className="text-[11px]  text-neutral-400">
                      {p.Customer_Address}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-right text-[12px] text-neutral-800 whitespace-nowrap">
                    {p.earnings}
                  </td>
                  <td className="px-4 py-3.5 text-right text-[12px] text-red-500 whitespace-nowrap">
                    {p.commission}
                  </td>
                  <td className="px-4 py-3.5 text-right text-[12px] text-[#FF6B35] whitespace-nowrap">
                    {p.net}
                  </td>
                  <td className="px-4 py-3.5">
                    <div className=" text-neutral-800 text-[12px]">
                      {p.gateway}
                    </div>
                    <div className="text-[11px] font-medium text-neutral-400">
                      Acc: {p.account}
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <span className="text-[12px] px-3 py-1 rounded-full bg-neutral-900 text-white">
                      {p.status}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex justify-end gap-1.5">
                      {p.status === "PENDING" ? (
                        <>
                          <button className="h-8 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition">
                            Approve
                          </button>
                          <button className="h-8 px-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-bold transition">
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-neutral-400">
                          Settled
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                  >
                    No payouts match this filter.
                  </td>
                </tr>
              )}
            </tbody> */}

            <tbody className="w-full">
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="w-full border-b border-neutral-100 last:border-0 hover:bg-neutral-50/70 transition"
                >
                  {/* Checkbox */}
                  <td className="px-4 py-3.5 w-10">
                    <input
                      type="checkbox"
                      checked={checked.includes(p.id)}
                      onChange={() => toggleOne(p.id)}
                      className="w-4 h-4 accent-[#FF6B35] cursor-pointer"
                    />
                  </td>

                  {/* ID */}
                  <td className="px-4 py-3.5 w-[90px] text-[12px] text-neutral-900 whitespace-nowrap">
                    {p.id}
                  </td>

                  {/* Provider */}
                  <td className="px-4 py-3.5 w-[160px]">
                    <div className="text-neutral-900 text-[12px] font-medium truncate">
                      {p.name}
                    </div>
                    <div className="text-[12px] text-neutral-400 truncate">
                      {p.code}
                    </div>
                  </td>

                  {/* Customer */}
                  <td className="px-4 py-3.5 w-[160px]">
                    <div className="text-neutral-700 text-[12px] font-medium truncate">
                      {p.customer_Name}
                    </div>
                    <div
                      onClick={() => navigate("/live-tracking")}
                      className=" cursor-pointer hover:text-orange-600 flex items-center gap-1 text-[11px] text-neutral-400 truncate"
                    >
                      <span className="truncate">{p.Customer_Address}</span>
                      <Navigation className="w-3 h-3 shrink-0 text-neutral-400" />
                    </div>
                  </td>

                  {/* Earnings */}
                  <td className="px-4 py-3.5 text-right text-[12px] text-neutral-800 whitespace-nowrap">
                    {p.earnings}
                  </td>

                  {/* Commission */}
                  <td className="px-4 py-3.5 text-right text-[12px] text-red-500 whitespace-nowrap">
                    {p.commission}
                  </td>

                  {/* Net Pay */}
                  <td className="px-4 py-3.5 text-right text-[12px] text-[#FF6B35] font-semibold whitespace-nowrap">
                    {p.net}
                  </td>

                  {/* Gateway */}
                  <td className="px-4 py-3.5 w-[150px]">
                    <div className="text-neutral-800 text-[12px] truncate">
                      {p.gateway}
                    </div>
                    <div className="text-[11px] font-medium text-neutral-400 truncate">
                      Acc: {p.account}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3.5 w-[110px] text-center">
                    <span className="inline-flex text-[11px] px-3 py-1 rounded-full bg-neutral-900 text-white font-semibold">
                      {p.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 w-[150px]">
                    <div className="flex justify-end gap-1.5">
                      {p.status === "PENDING" ? (
                        <>
                          <button className="h-8 px-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition">
                            Approve
                          </button>

                          <button className="h-8 px-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 text-xs font-bold transition">
                            Reject
                          </button>
                        </>
                      ) : (
                        <span className="text-xs font-bold text-neutral-400">
                          Settled
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={10}
                    className="px-5 py-12 text-center text-sm font-medium text-neutral-400"
                  >
                    No payouts match this filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3.5 border-t border-neutral-100 flex items-center justify-between text-[13px] font-medium text-neutral-500">
          <span>
            Showing {filtered.length} of {payouts.length} payouts
            {checked.length > 0 ? ` - ${checked.length} selected` : ""}
          </span>
          <div className="flex gap-1.5">
            {["1", "2"].map((pg, i) => (
              <button
                key={pg}
                className={`w-8 h-8 rounded-full text-xs font-bold border transition ${i === 0 ? "bg-neutral-900 text-white border-neutral-900" : "bg-white border-neutral-200 hover:bg-neutral-50"}`}
              >
                {pg}
              </button>
            ))}
          </div>
        </div>
      </div>
)}
    </div>
  );
};

export default PamentPayoutPage;
