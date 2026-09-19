import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  Circle,
  Loader2,
  HandCoins,
  ArrowRight,
} from "lucide-react";
import {
  getMembers,
  getActiveLoans,
  toggleMonthlyPaid,
  markAllMonthlyPaid,
} from "../services/api";

function MonthlyContribution() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [markingAll, setMarkingAll] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const [membersData, loansData] = await Promise.all([
        getMembers(),
        getActiveLoans(),
      ]);

      setMembers(membersData);
      setLoans(loansData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleMonthlyPaid(memberId) {
    try {
      setUpdatingId(memberId);
      setError("");

      await toggleMonthlyPaid(memberId);

      setMembers((currentMembers) =>
        currentMembers.map((member) =>
          member.id === memberId
            ? { ...member, monthlyPaid: !member.monthlyPaid }
            : member
        )
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdatingId(null);
    }
  }

  async function handleMarkAllPaid() {
    try {
      setMarkingAll(true);
      setError("");

      await markAllMonthlyPaid();

      setMembers((currentMembers) =>
        currentMembers.map((member) => ({
          ...member,
          monthlyPaid: true,
        }))
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setMarkingAll(false);
    }
  }

  const allPaid =
    members.length > 0 && members.every((member) => member.monthlyPaid);

  const allLoansPaid =
    loans.length === 0 || loans.every((loan) => loan.monthlyPaid);

  const paidCount = members.filter((member) => member.monthlyPaid).length;
  const progressPct =
    members.length > 0 ? Math.round((paidCount / members.length) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400">लोड होत आहे...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 px-5 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-9 h-9 -ml-1.5 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
            aria-label="मागे जा"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">
              मासिक वर्गणी
            </h1>
            <p className="text-xs text-slate-500 leading-tight">
              प्रत्येक सदस्याची वर्गणी जमा करा
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-md mx-auto px-5 py-6">
        {/* Error */}
        {error && (
          <div className="bg-blue-50 border border-blue-100 text-blue-950 rounded-xl p-4 mb-4 text-sm">
            {error}
          </div>
        )}

        {/* Progress */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-4 h-4" strokeWidth={1.75} />
              <p className="text-xs">वर्गणी जमा</p>
            </div>

            <p className="text-xs font-medium text-blue-600 tabular-nums">
              {progressPct}%
            </p>
          </div>

          <p className="text-2xl font-semibold text-slate-900 mt-2 tabular-nums">
            {paidCount} / {members.length}
          </p>

          <div className="h-1.5 rounded-full bg-slate-100 mt-3 overflow-hidden">
            <div
              className="h-full bg-blue-600 rounded-full transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {!allPaid && (
          <button
            onClick={handleMarkAllPaid}
            disabled={markingAll}
            className="w-full mb-5 py-3 rounded-xl bg-blue-950 hover:bg-slate-900 text-white font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            {markingAll ? (
              <Loader2 className="w-4.5 h-4.5 animate-spin" strokeWidth={2} />
            ) : (
              <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={1.75} />
            )}
            सर्वांची वर्गणी जमा झाली
          </button>
        )}

        {/* Members */}
        <div className="flex flex-col gap-2.5">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl border border-slate-200 p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-slate-900">{member.name}</p>
                <p className="text-sm text-slate-500 mt-0.5">₹200</p>
              </div>

              <button
                onClick={() => handleToggleMonthlyPaid(member.id)}
                disabled={updatingId === member.id}
                aria-label={member.monthlyPaid ? "पूर्ववत करा" : "जमा झाले म्हणून चिन्हांकित करा"}
                className={
                  member.monthlyPaid
                    ? "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-blue-600 disabled:opacity-50"
                    : "flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl text-slate-300 hover:text-slate-400 disabled:opacity-50"
                }
              >
                {updatingId === member.id ? (
                  <Loader2 className="w-6 h-6 animate-spin" strokeWidth={1.75} />
                ) : member.monthlyPaid ? (
                  <CheckCircle2 className="w-6 h-6" strokeWidth={1.75} fill="#eff6ff" />
                ) : (
                  <Circle className="w-6 h-6" strokeWidth={1.75} />
                )}
                <span className="text-[11px] font-medium">
                  {member.monthlyPaid ? "भरले" : "बाकी"}
                </span>
              </button>
            </div>
          ))}
        </div>

        {/* Bottom navigation */}
        {allPaid && (
          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
              <CheckCircle2
                className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                strokeWidth={1.75}
              />

              <div>
                <p className="font-medium text-blue-950">
                  सर्व सदस्यांची वर्गणी जमा झाली
                </p>

                <p className="text-sm text-blue-800 mt-1">
                  {allLoansPaid
                    ? "या महिन्याचे सर्व काम पूर्ण झाले."
                    : "आता कर्जाचा हप्ता पूर्ण करा."}
                </p>
              </div>
            </div>

            {allLoansPaid ? (
              <button
                onClick={() =>
                  navigate("/monthly-preview", {
                    state: { from: "/monthly-contribution" },
                  })
                }
                className="w-full mt-4 bg-blue-950 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
              >
                पूर्ण भरणा करा
                <ArrowRight className="w-4.5 h-4.5" strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={() => navigate("/monthly-loans")}
                className="w-full mt-4 bg-blue-950 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
              >
                <HandCoins className="w-4.5 h-4.5" strokeWidth={1.75} />
                कर्जाचा हप्ता
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default MonthlyContribution;