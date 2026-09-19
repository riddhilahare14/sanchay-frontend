// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { getDashboard } from "../services/api";

// function Dashboard() {
// 	const navigate = useNavigate();

//   const [dashboard, setDashboard] = useState(null);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   async function loadDashboard() {
//     try {
//       const data = await getDashboard();
//       setDashboard(data);
//     } catch (error) {
//       setError(error.message);
//     }
//   }

//   if (error) {
//     return (
//       <div className="min-h-dvh bg-gray-100 flex items-center justify-center px-5">
//         <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
//           <p className="text-red-600">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!dashboard) {
//     return (
//       <div className="min-h-dvh bg-gray-100 flex items-center justify-center">
//         <p className="text-gray-500">लोड होत आहे...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-dvh bg-gray-100">
      
//       {/* Header */}
//       <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-gray-200">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">संचय</h1>
//           <p className="text-sm text-gray-500">बचत गट व्यवस्थापन</p>
//         </div>

//         <button className="text-gray-700 text-xl">
//           ☰
//         </button>
//       </header>

//       {/* Main content */}
//       <main className="max-w-md mx-auto px-5 py-6">

//         {/* Greeting */}
//         <div className="mb-6">
//           <p className="text-gray-500 text-sm">नमस्कार 👋</p>
//           <h2 className="text-xl font-semibold text-gray-900">
//             आजचे संचयाचे काम
//           </h2>
//         </div>

//         {/* Total savings card */}
//         <div className="bg-gray-900 text-white rounded-2xl p-5 mb-4 shadow-sm">
//           <p className="text-sm text-gray-300">
//             एकूण बचत
//           </p>

//           <p className="text-3xl font-bold mt-2">
//             ₹ {dashboard.totalSavingsWithInterest.toLocaleString("en-IN")}
//           </p>

//           <p className="text-sm text-gray-400 mt-2">
//             व्याजासह
//           </p>
//         </div>

//         {/* Two small cards */}
//         <div className="grid grid-cols-2 gap-4 mb-6">

//           <div className="bg-white rounded-2xl p-4 shadow-sm">
//             <p className="text-sm text-gray-500">
//               बँक शिल्लक
//             </p>

//             <p className="text-xl font-bold text-gray-900 mt-2">
//               ₹ {dashboard.bankBalance.toLocaleString("en-IN")}
//             </p>
//           </div>

//           <div className="bg-white rounded-2xl p-4 shadow-sm">
//             <p className="text-sm text-gray-500">
//               बाकी कर्ज
//             </p>

//             <p className="text-xl font-bold text-gray-900 mt-2">
//               ₹ {dashboard.outstandingLoans.toLocaleString("en-IN")}
//             </p>
//           </div>

//         </div>

//         {/* Member share */}
//         <div className="bg-white rounded-2xl p-5 mb-6 shadow-sm">
//           <p className="text-sm text-gray-500">
//             प्रत्येक सदस्याचा हिस्सा
//           </p>

//           <p className="text-2xl font-bold text-gray-900 mt-2">
//             ₹ {dashboard.memberShare.toLocaleString("en-IN")}
//           </p>

//           <p className="text-xs text-gray-400 mt-1">
//             {dashboard.memberCount} सदस्य
//           </p>
//         </div>

//         {/* Monthly work */}
//         <section>
//           <h3 className="text-lg font-semibold text-gray-900 mb-3">
//             या महिन्याचे काम
//           </h3>

//           <div className="flex flex-col gap-3">

//             <button
// 							onClick={() => navigate("/monthly-contribution")}
// 							className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between text-left"
// 						>
//               <div>
//                 <p className="font-semibold text-gray-900">
//                   मासिक वर्गणी
//                 </p>

//                 <p className="text-sm text-gray-500 mt-1">
//                   ₹ {dashboard.monthlyContribution} प्रति सदस्य
//                 </p>
//               </div>

//               <span className="text-gray-400 text-xl">
//                 →
//               </span>
//             </button>

// 							<button
// 								onClick={() => navigate("/monthly-loans")}
// 								className="w-full bg-white rounded-2xl p-5 shadow-sm flex items-center justify-between text-left"
// 							>
// 	              <div>
//                 <p className="font-semibold text-gray-900">
//                   कर्जाचा हप्ता
//                 </p>

//                 <p className="text-sm text-gray-500 mt-1">
//                   या महिन्याचे कर्ज व्यवहार
//                 </p>
//               </div>

//               <span className="text-gray-400 text-xl">
//                 →
//               </span>
//             </button>

//           </div>
//         </section>

//         {/* Bank deposit */}
//         <div className="mt-6 bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
//           <p className="text-sm text-gray-500">
//             या महिन्याची बँक जमा
//           </p>

//           <p className="text-2xl font-bold text-gray-900 mt-2">
//             ₹ {dashboard.totalMonthlyHafta.toLocaleString("en-IN")}
//           </p>

//           <button
//             disabled
//             className="w-full mt-4 py-3 rounded-xl bg-gray-300 text-gray-500 font-medium"
//           >
//             बँकेत जमा करा
//           </button>

//           <p className="text-xs text-gray-400 text-center mt-2">
//             आधी मासिक वर्गणी आणि कर्जाचा हप्ता पूर्ण करा
//           </p>
//         </div>

//       </main>
//     </div>
//   );
// }

// export default Dashboard;




import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  PiggyBank,
  Menu,
  Landmark,
  HandCoins,
  Users,
  Wallet,
  ChevronRight,
  BadgeIndianRupee,
} from "lucide-react";
import { getDashboard, previewMonthly } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [monthlyPreview, setMonthlyPreview] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);
  
  async function loadDashboard() {
    try {
      const [dashboardData, previewData] = await Promise.all([
        getDashboard(),
        previewMonthly(),
      ]);
  
      setDashboard(dashboardData);
      setMonthlyPreview(previewData);
    } catch (error) {
      setError(error.message);
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

  if (!dashboard) {
    return (
      <div className="min-h-dvh bg-slate-50 flex items-center justify-center">
        <p className="text-slate-400">लोड होत आहे...</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      {/* Header */}
      <header className="bg-white px-5 py-4 flex items-center justify-between border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-950 flex items-center justify-center shrink-0">
            <PiggyBank className="w-5 h-5 text-white" strokeWidth={1.75} />
          </div>

          <div>
            <h1 className="text-lg font-semibold text-slate-900 leading-tight">
              संचय
            </h1>
            <p className="text-xs text-slate-500 leading-tight">
              बचत गट व्यवस्थापन
            </p>
          </div>
        </div>

        <button
          className="w-9 h-9 rounded-xl flex items-center justify-center text-slate-600 hover:bg-slate-100 transition"
          aria-label="मेनू"
        >
          <Menu className="w-5 h-5" strokeWidth={1.75} />
        </button>
      </header>

      {/* Main content */}
      <main className="max-w-md mx-auto px-5 py-6">
        {/* Greeting */}
        <div className="mb-5">
          <p className="text-sm text-slate-500">नमस्कार 👋</p>
          <h2 className="text-xl font-semibold text-slate-900 mt-0.5">
            आजचे संचयाचे काम
          </h2>
        </div>

        {/* Total savings hero card */}
        <div className="bg-blue-950 text-white rounded-2xl p-5 mb-4">
          <div className="flex items-center gap-2 text-blue-200">
            <Wallet className="w-4 h-4" strokeWidth={1.75} />
            <p className="text-sm">एकूण बचत</p>
          </div>

          <p className="text-3xl font-semibold mt-3 tabular-nums">
            ₹ {dashboard.totalSavingsWithInterest.toLocaleString("en-IN")}
          </p>

          <p className="text-xs text-blue-300 mt-2">व्याजासह</p>
        </div>

        {/* Two small cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <Landmark
              className="w-5 h-5 text-blue-600 mb-2"
              strokeWidth={1.75}
            />
            <p className="text-xs text-slate-500">बँक शिल्लक</p>
            <p className="text-lg font-semibold text-slate-900 mt-1 tabular-nums">
              ₹ {dashboard.bankBalance.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-4">
            <HandCoins
              className="w-5 h-5 text-blue-600 mb-2"
              strokeWidth={1.75}
            />
            <p className="text-xs text-slate-500">बाकी कर्ज</p>
            <p className="text-lg font-semibold text-slate-900 mt-1 tabular-nums">
              ₹ {dashboard.outstandingLoans.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Member share */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-500">
              <Users className="w-4 h-4" strokeWidth={1.75} />
              <p className="text-xs">प्रत्येक सदस्याचा हिस्सा</p>
            </div>

            <p className="text-xl font-semibold text-slate-900 mt-2 tabular-nums">
              ₹ {dashboard.memberShare.toLocaleString("en-IN")}
            </p>
          </div>

          <div className="text-right">
            <p className="text-2xl font-semibold text-slate-900 tabular-nums">
              {dashboard.memberCount}
            </p>
            <p className="text-xs text-slate-400">सदस्य</p>
          </div>
        </div>

        {/* Monthly work */}
        <section>
          <h3 className="text-sm font-medium text-slate-500 mb-3">
            या महिन्याचे काम
          </h3>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/monthly-contribution")}
              className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between text-left hover:border-blue-200 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <Wallet className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
                </div>

                <div>
                  <p className="font-medium text-slate-900">मासिक वर्गणी</p>
                  <p className="text-sm text-slate-500 mt-0.5 tabular-nums">
                    ₹ {dashboard.monthlyContribution} प्रति सदस्य
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-300" strokeWidth={2} />
            </button>

            <button
              onClick={() => navigate("/monthly-loans")}
              className="w-full bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex items-center justify-between text-left hover:border-blue-200 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                  <HandCoins className="w-5 h-5 text-blue-600" strokeWidth={1.75} />
                </div>

                <div>
                  <p className="font-medium text-slate-900">कर्जाचा हप्ता</p>
                  <p className="text-sm text-slate-500 mt-0.5">
                    या महिन्याचे कर्ज व्यवहार
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-300" strokeWidth={2} />
            </button>
          </div>
        </section>

        {/* Bank deposit */}
        {monthlyPreview && (
          <div className="mt-6 bg-white rounded-2xl border border-slate-200 p-5">

            <div className="flex items-center gap-2 text-slate-500 mb-2">
              <BadgeIndianRupee
                className="w-4 h-4"
                strokeWidth={1.75}
              />

              <p className="text-xs">
                या महिन्याची बँक जमा
              </p>
            </div>

            {/* Monthly contribution */}
            <div className="flex items-center justify-between py-2.5">

              <span className="flex items-center gap-2 text-slate-500 text-sm">
                <Wallet
                  className="w-4 h-4"
                  strokeWidth={1.75}
                />

                मासिक वर्गणी
              </span>

              <span className="font-medium text-slate-900 tabular-nums">
                ₹ {monthlyPreview.totalHafta.toLocaleString("en-IN")}
              </span>

            </div>

            {/* Loan principal */}
            <div className="flex items-center justify-between py-2.5">

              <span className="flex items-center gap-2 text-slate-500 text-sm">
                <HandCoins
                  className="w-4 h-4"
                  strokeWidth={1.75}
                />

                कर्जाचे मुद्दल
              </span>

              <span className="font-medium text-slate-900 tabular-nums">
                ₹ {monthlyPreview.totalLoanPrincipal.toLocaleString("en-IN")}
              </span>

            </div>

            {/* Loan interest */}
            <div className="flex items-center justify-between py-2.5">

              <span className="flex items-center gap-2 text-slate-500 text-sm">
                <BadgeIndianRupee
                  className="w-4 h-4"
                  strokeWidth={1.75}
                />

                कर्जाचे व्याज
              </span>

              <span className="font-medium text-slate-900 tabular-nums">
                ₹ {monthlyPreview.totalLoanInterest.toLocaleString("en-IN")}
              </span>

            </div>

            {/* Total */}
            <div className="border-t border-slate-200 mt-2 pt-4">

              <div className="flex items-center justify-between">

                <span className="font-medium text-slate-900">
                  एकूण बँकेत जमा
                </span>

                <span className="text-2xl font-semibold text-slate-900 tabular-nums">
                  ₹ {monthlyPreview.totalBankDeposit.toLocaleString("en-IN")}
                </span>

              </div>

            </div>

            {/* Go to preview */}
            <button
              onClick={() =>
                navigate("/monthly-preview", {
                  state: { from: "/dashboard" },
                })
              }
              className="w-full mt-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              बँकेत जमा करण्यासाठी पुढे जा
            </button>

          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;