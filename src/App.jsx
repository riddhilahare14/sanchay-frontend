import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MonthlyContribution from "./pages/MonthlyContribution";
import MonthlyLoans from "./pages/MonthlyLoans";
import MonthlyPreview from "./pages/MonthlyPreview";
import AddLoan from "./pages/AddLoan";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" /> : <Login />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" />}
        />

        <Route
          path="/monthly-contribution"
          element={
            token ? <MonthlyContribution /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/monthly-loans"
          element={token ? <MonthlyLoans /> : <Navigate to="/login" />}
        />

        <Route
          path="/monthly-preview"
          element={token ? <MonthlyPreview /> : <Navigate to="/login" />}
        />

        <Route
          path="/add-loan"
          element={token ? <AddLoan /> : <Navigate to="/login" />}
        />

        <Route
          path="*"
          element={<Navigate to="/dashboard" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;