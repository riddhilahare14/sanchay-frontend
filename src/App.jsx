import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MonthlyContribution from "./pages/MonthlyContribution";
import MonthlyLoans from "./pages/MonthlyLoans";
import MonthlyPreview from "./pages/MonthlyPreview";
import AddLoan from "./pages/AddLoan";

function App() {
  const [token, setToken] = useState(
    () => localStorage.getItem("token")
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login setToken={setToken} />
            )
          }
        />

        <Route
          path="/dashboard"
          element={
            token ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/monthly-contribution"
          element={
            token ? (
              <MonthlyContribution />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/monthly-loans"
          element={
            token ? (
              <MonthlyLoans />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/monthly-preview"
          element={
            token ? (
              <MonthlyPreview />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/add-loan"
          element={
            token ? (
              <AddLoan />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="*"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;