import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { createLoan, getMembers } from "../services/api";

function AddLoan() {
  const navigate = useNavigate();

  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [principalAmount, setPrincipalAmount] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  async function loadMembers() {
    try {
      const data = await getMembers();
      setMembers(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!memberId) {
      setError("कृपया सभासद निवडा");
      return;
    }

    if (!principalAmount || Number(principalAmount) <= 0) {
      setError("कृपया कर्जाची रक्कम भरा");
      return;
    }

    try {
      setSaving(true);
      setError("");

      await createLoan(
        Number(memberId),
        Number(principalAmount)
      );

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-dvh bg-slate-50 px-5 py-6">
      <div className="max-w-xl mx-auto">

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-slate-600 mb-6"
        >
          <ArrowLeft size={18} />
          मागे
        </button>

        <div className="bg-white rounded-2xl border border-slate-200 p-6">

          <h1 className="text-2xl font-semibold text-blue-950">
            नवीन कर्ज जोडा
          </h1>

          <p className="text-sm text-slate-500 mt-1 mb-6">
            सभासद आणि कर्जाची मूळ रक्कम भरा
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                सभासद निवडा
              </label>

              <select
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white"
              >
                <option value="">
                  सभासद निवडा
                </option>

                {members.map((member) => (
                  <option
                    key={member.id}
                    value={member.id}
                  >
                    {member.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                कर्जाची मूळ रक्कम
              </label>

              <input
                type="number"
                min="1"
                value={principalAmount}
                onChange={(e) => setPrincipalAmount(e.target.value)}
                placeholder="उदा. 20000"
                className="w-full rounded-xl border border-slate-300 px-4 py-3"
              />
            </div>

            {error && (
              <p className="text-sm text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-blue-950 text-white py-3 font-medium disabled:opacity-50"
            >
              {saving ? "कर्ज जोडत आहे..." : "कर्ज जोडा"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLoan;