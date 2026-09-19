import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiggyBank, User, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { login } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await login(username, password);

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-slate-50 flex items-center justify-center px-5">
      <div className="w-full max-w-sm">
        {/* Brand mark */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-blue-950 flex items-center justify-center shadow-sm shadow-blue-950/20">
            <PiggyBank className="w-7 h-7 text-white" strokeWidth={1.75} />
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-slate-900 tracking-tight">
            संचय
          </h1>

          <p className="mt-1 text-sm text-slate-500">बचत गट व्यवस्थापन</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="block mb-1.5 text-xs font-medium text-slate-500">
                वापरकर्ता नाव
              </label>

              <div className="relative">
                <User
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400"
                  strokeWidth={1.75}
                />

                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="वापरकर्ता नाव टाका"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1.5 text-xs font-medium text-slate-500">
                पासवर्ड
              </label>

              <div className="relative">
                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400"
                  strokeWidth={1.75}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="पासवर्ड टाका"
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label={showPassword ? "पासवर्ड लपवा" : "पासवर्ड दाखवा"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4.5 h-4.5" strokeWidth={1.75} />
                  ) : (
                    <Eye className="w-4.5 h-4.5" strokeWidth={1.75} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-xl bg-blue-50 border border-blue-100 px-3.5 py-2.5">
                <p className="text-sm text-blue-950">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-50 transition flex items-center justify-center gap-2"
            >
              {loading && (
                <Loader2 className="w-4.5 h-4.5 animate-spin" strokeWidth={2} />
              )}
              {loading ? "लॉगिन होत आहे..." : "लॉगिन"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;