import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Pencil,
  IndianRupee,
  Percent,
  X,
  Loader2,
  Wallet,
  ArrowRight,
} from "lucide-react";
import {
  getMembers,
  getActiveLoans,
  markLoanMonthlyPaid,
} from "../services/api";

function MonthlyLoans() {
  const navigate = useNavigate();

  const [loans, setLoans] = useState([]);
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedLoan, setSelectedLoan] = useState(null);
  const [principalInput, setPrincipalInput] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    loadLoans();
  }, []);

  async function loadLoans() {
    try {
      const [loansData, membersData] = await Promise.all([
        getActiveLoans(),
        getMembers(),
      ]);

      setLoans(loansData);
      setMembers(membersData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  function handleMarkPaidClick(loan) {
    setSelectedLoan(loan);

    setPrincipalInput(
      loan.monthlyPaid ? String(loan.monthlyPrincipalRepayment) : ""
    );

    setError("");
  }

  async function handleConfirmPayment() {
    if (!selectedLoan) {
      return;
    }

    if (principalInput === "") {
      setError("मुद्दल परतफेड रक्कम टाका");
      return;
    }

    const principal = Number(principalInput);

    if (principal < 0) {
      setError("मुद्दल परतफेड रक्कम चुकीची आहे");
      return;
    }

    if (principal > Number(selectedLoan.remainingPrincipal)) {
      setError("मुद्दल परतफेड बाकी कर्जापेक्षा जास्त असू शकत नाही");
      return;
    }

    try {
      setUpdating(true);
      setError("");

      const updatedLoan = await markLoanMonthlyPaid(
        selectedLoan.loanId,
        principal
      );

      setLoans((currentLoans) =>
        currentLoans.map((loan) =>
          loan.loanId === selectedLoan.loanId
            ? {
                ...loan,
                monthlyPaid: true,
                monthlyPrincipalRepayment: updatedLoan.principalRepayment,
                monthlyInterest: updatedLoan.monthlyInterest,
                monthlyTotalReceived: updatedLoan.totalReceived,
              }
            : loan
        )
      );

      setSelectedLoan(null);
      setPrincipalInput("");
    } catch (error) {
      setError(error.message);
    } finally {
      setUpdating(false);
    }
  }

  const allLoansPaid =
    loans.length === 0 || loans.every((loan) => loan.monthlyPaid);

  const allContributionsPaid =
    members.length > 0 && members.every((member) => member.monthlyPaid);

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
              कर्जाचा हप्ता
            </h1>
            <p className="text-xs text-slate-500 leading-tight">
              या महिन्याची कर्ज परतफेड
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 py-6">
        {/* Error */}
        {error && (
          <div className="bg-blue-50 border border-blue-100 text-blue-950 rounded-xl p-4 mb-5 text-sm">
            {error}
          </div>
        )}

        {/* No active loans */}
        {loans.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
              <CheckCircle2 className="w-6 h-6 text-blue-600" strokeWidth={1.75} />
            </div>

            <h2 className="text-base font-semibold text-slate-900">
              सध्या कोणतेही सक्रिय कर्ज नाही
            </h2>

            <p className="text-sm text-slate-500 mt-1.5">
              कर्जाचा हप्ता पूर्ण झाला आहे.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {loans.map((loan) => (
              <div
                key={loan.loanId}
                className={
                  loan.monthlyPaid
                    ? "bg-blue-50 border border-blue-100 rounded-2xl p-5"
                    : "bg-white border border-slate-200 rounded-2xl p-5"
                }
              >
                {/* Member */}
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-slate-900">
                    {loan.memberName}
                  </h2>

                  {loan.monthlyPaid && (
                    <div className="flex items-center gap-1.5">
                      <span className="flex items-center gap-1 text-blue-600 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4" strokeWidth={1.75} />
                        जमा झाले
                      </span>

                      <button
                        onClick={() => handleMarkPaidClick(loan)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:text-blue-600 hover:border-blue-200 transition"
                        aria-label="संपादित करा"
                      >
                        <Pencil className="w-3.5 h-3.5" strokeWidth={1.75} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Remaining principal */}
                <div className="mt-3">
                  <p className="text-xs text-slate-500">बाकी मुद्दल</p>

                  <p className="text-xl font-semibold text-slate-900 mt-1 tabular-nums">
                    ₹ {Number(loan.remainingPrincipal).toLocaleString("en-IN")}
                  </p>
                </div>

                {/* Paid loan details */}
                {loan.monthlyPaid ? (
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-500">मुद्दल परतफेड</span>
                      <span className="font-medium text-slate-900 tabular-nums">
                        ₹{" "}
                        {Number(
                          loan.monthlyPrincipalRepayment
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-500">व्याज</span>
                      <span className="font-medium text-slate-900 tabular-nums">
                        ₹{" "}
                        {Number(loan.monthlyInterest).toLocaleString("en-IN")}
                      </span>
                    </div>

                    <div className="flex justify-between pt-3 border-t border-blue-100">
                      <span className="font-medium text-slate-700">
                        एकूण जमा
                      </span>
                      <span className="text-base font-semibold text-slate-900 tabular-nums">
                        ₹{" "}
                        {Number(
                          loan.monthlyTotalReceived
                        ).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Interest */}
                    <div className="mt-4 bg-slate-50 rounded-xl p-3.5 flex items-center justify-between">
                      <span className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Percent className="w-3.5 h-3.5" strokeWidth={1.75} />
                        या महिन्याचे व्याज
                      </span>

                      <span className="text-sm font-semibold text-slate-900 tabular-nums">
                        ₹{" "}
                        {Number(loan.monthlyInterest).toLocaleString("en-IN")}
                      </span>
                    </div>

                    {/* Mark paid */}
                    <button
                      onClick={() => handleMarkPaidClick(loan)}
                      className="w-full mt-4 py-3 rounded-xl bg-blue-950 hover:bg-slate-900 text-white font-medium transition flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 className="w-4.5 h-4.5" strokeWidth={1.75} />
                      जमा झाले
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bottom navigation */}
        {allLoansPaid && (
          <div className="mt-6">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 flex items-start gap-3">
              <CheckCircle2
                className="w-5 h-5 text-blue-600 shrink-0 mt-0.5"
                strokeWidth={1.75}
              />

              <div>
                <p className="font-medium text-blue-950">
                  या महिन्याचे सर्व कर्ज हप्ते जमा झाले
                </p>

                <p className="text-sm text-blue-800 mt-1">
                  {allContributionsPaid
                    ? "या महिन्याचे सर्व काम पूर्ण झाले."
                    : "आता मासिक वर्गणी पूर्ण करा."}
                </p>
              </div>
            </div>

            {allContributionsPaid ? (
              <button
                onClick={() =>
                  navigate("/monthly-preview", {
                    state: { from: "/monthly-loans" },
                  })
                }
                className="w-full mt-4 bg-blue-950 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
              >
                पूर्ण भरणा करा
                <ArrowRight className="w-4.5 h-4.5" strokeWidth={2} />
              </button>
            ) : (
              <button
                onClick={() => navigate("/monthly-contribution")}
                className="w-full mt-4 bg-blue-950 hover:bg-slate-900 text-white py-3 rounded-xl font-medium transition flex items-center justify-center gap-2"
              >
                <Wallet className="w-4.5 h-4.5" strokeWidth={1.75} />
                मासिक वर्गणी
              </button>
            )}
          </div>
        )}
      </main>

      {/* Payment Modal */}
      {selectedLoan && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-end justify-center px-4 pb-4 z-50">
          <div className="w-full max-w-md bg-white rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {selectedLoan.memberName}
                </h2>

                <p className="text-sm text-slate-500 mt-0.5">
                  मुद्दल परतफेड रक्कम टाका
                </p>
              </div>

              <button
                onClick={() => {
                  setSelectedLoan(null);
                  setPrincipalInput("");
                  setError("");
                }}
                disabled={updating}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition disabled:opacity-50"
                aria-label="बंद करा"
              >
                <X className="w-4.5 h-4.5" strokeWidth={1.75} />
              </button>
            </div>

            {error && (
              <div className="bg-blue-50 border border-blue-100 text-blue-950 rounded-xl p-3 mt-3 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-between mt-4 text-sm bg-slate-50 rounded-xl p-3.5">
              <span className="text-slate-500">बाकी मुद्दल</span>
              <span className="font-medium text-slate-900 tabular-nums">
                ₹{" "}
                {Number(selectedLoan.remainingPrincipal).toLocaleString(
                  "en-IN"
                )}
              </span>
            </div>

            {/* Interest */}
            <div className="flex justify-between mt-2 text-sm px-0.5">
              <span className="flex items-center gap-1.5 text-slate-500">
                <Percent className="w-3.5 h-3.5" strokeWidth={1.75} />
                या महिन्याचे व्याज
              </span>

              <span className="font-medium text-slate-900 tabular-nums">
                ₹{" "}
                {Number(selectedLoan.monthlyInterest).toLocaleString("en-IN")}
              </span>
            </div>

            {/* Principal input */}
            <div className="relative mt-4">
              <IndianRupee
                className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400"
                strokeWidth={1.75}
              />

              <input
                type="number"
                min="0"
                max={selectedLoan.remainingPrincipal}
                value={principalInput}
                onChange={(event) => setPrincipalInput(event.target.value)}
                placeholder="उदा. 10000"
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition"
                autoFocus
              />
            </div>

            <div className="flex gap-3 mt-4">
              {/* Cancel */}
              <button
                onClick={() => {
                  setSelectedLoan(null);
                  setPrincipalInput("");
                  setError("");
                }}
                disabled={updating}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium disabled:opacity-50 hover:bg-slate-200 transition"
              >
                रद्द करा
              </button>

              {/* Save */}
              <button
                onClick={handleConfirmPayment}
                disabled={updating}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {updating && (
                  <Loader2 className="w-4.5 h-4.5 animate-spin" strokeWidth={2} />
                )}
                {updating
                  ? "नोंद होत आहे..."
                  : selectedLoan.monthlyPaid
                  ? "बदल जतन करा"
                  : "जमा करा"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyLoans;