import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  Wallet,
  HandCoins,
  Percent,
  Landmark,
  X,
  Loader2,
  ShieldCheck,
} from "lucide-react";
import { previewMonthly, closeMonth } from "../services/api";

function MonthlyPreview() {
  const navigate = useNavigate();
  const location = useLocation();

  const backPath = location.state?.from || "/dashboard";

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [closing, setClosing] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    loadPreview();
  }, []);

  async function loadPreview() {
    try {
      const data = await previewMonthly();

      setPreview(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleCloseMonth() {
    try {
      setClosing(true);
      setError("");

      await closeMonth();

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setClosing(false);
    }
  }

  if (error) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center px-5">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
          <p className="text-blue-950">{error}</p>
        </div>
      </div>
    );
  }

  if (!preview) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400">हिशोब तयार होत आहे...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-5 py-4">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={() => navigate(backPath)}
            className="w-9 h-9 -ml-1.5 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
            aria-label="मागे जा"
          >
            <ArrowLeft className="w-5 h-5" strokeWidth={1.75} />
          </button>

          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">
              जमा रकमेचा हिशोब
            </h1>
            <p className="text-xs text-slate-500 leading-tight">
              बँकेत जमा करण्यापूर्वी तपासा
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-md mx-auto px-5 py-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center justify-between py-2.5">
            <span className="flex items-center gap-2 text-slate-500 text-sm">
              <Wallet className="w-4 h-4" strokeWidth={1.75} />
              मासिक वर्गणी
            </span>

            <span className="font-medium text-slate-900 tabular-nums">
              ₹ {preview.totalHafta.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="flex items-center gap-2 text-slate-500 text-sm">
              <HandCoins className="w-4 h-4" strokeWidth={1.75} />
              कर्जाचे मुद्दल
            </span>

            <span className="font-medium text-slate-900 tabular-nums">
              ₹ {preview.totalLoanPrincipal.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center justify-between py-2.5">
            <span className="flex items-center gap-2 text-slate-500 text-sm">
              <Percent className="w-4 h-4" strokeWidth={1.75} />
              कर्जाचे व्याज
            </span>

            <span className="font-medium text-slate-900 tabular-nums">
              ₹ {preview.totalLoanInterest.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="border-t border-slate-200 mt-2 pt-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 font-medium text-slate-900">
                <Landmark className="w-4.5 h-4.5 text-blue-600" strokeWidth={1.75} />
                एकूण बँकेत जमा
              </span>

              <span className="text-2xl font-semibold text-slate-900 tabular-nums">
                ₹ {preview.totalBankDeposit.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowConfirmation(true)}
          disabled={closing}
          className="w-full mt-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4.5 h-4.5" strokeWidth={1.75} />
          बँकेत जमा करण्याची खात्री करा
        </button>
      </main>

      {showConfirmation && (
        <div className="fixed inset-0 bg-slate-950/50 flex items-end justify-center px-4 pb-4 z-50">
          <div className="w-full max-w-md bg-white rounded-2xl p-5">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center">
                <Landmark className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
              </div>

              <button
                onClick={() => setShowConfirmation(false)}
                disabled={closing}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 transition disabled:opacity-50"
                aria-label="बंद करा"
              >
                <X className="w-4.5 h-4.5" strokeWidth={1.75} />
              </button>
            </div>

            <h2 className="text-base font-semibold text-slate-900 mt-3">
              बँकेत जमा करण्याची खात्री आहे का?
            </h2>

            <p className="text-sm text-slate-500 mt-2 tabular-nums">
              एकूण ₹ {preview.totalBankDeposit.toLocaleString("en-IN")} बँकेत
              जमा झाल्याची नोंद केली जाईल.
            </p>

            <p className="text-sm text-slate-500 mt-2">
              हा महिना पूर्ण झाल्यानंतर पुढील महिन्याची नोंद सुरू होईल.
            </p>

            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setShowConfirmation(false)}
                disabled={closing}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 font-medium disabled:opacity-50 hover:bg-slate-200 transition"
              >
                रद्द करा
              </button>

              <button
                onClick={handleCloseMonth}
                disabled={closing}
                className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
              >
                {closing && (
                  <Loader2 className="w-4.5 h-4.5 animate-spin" strokeWidth={2} />
                )}
                {closing ? "नोंद होत आहे..." : "होय, जमा करा"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyPreview;