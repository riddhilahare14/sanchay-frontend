const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function login(username, password) {
  const response = await fetch(
    `${API_BASE_URL}/api/auth/login`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}

export async function getDashboard() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/dashboard`,
    {
      method: "GET",

      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Dashboard data could not be loaded");
  }

  return data;
}

export async function getMembers() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/members`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Members could not be loaded");
  }

  return data;
}

export async function toggleMonthlyPaid(memberId) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/members/${memberId}/monthly-paid`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let message = "वर्गणीची नोंद बदलता आली नाही";

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      // Response did not contain JSON
    }

    throw new Error(message);
  }

  return true;
}

export async function markAllMonthlyPaid() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/members/monthly-paid`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    let message = "सर्व सदस्यांची वर्गणी जमा करता आली नाही";

    try {
      const data = await response.json();
      message = data.message || message;
    } catch {
      // Response did not contain JSON
    }

    throw new Error(message);
  }

  return true;
}

export async function getActiveLoans() {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/loans/active`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Loans could not be loaded");
  }

  return data;
}

export async function previewMonthly() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/monthly/preview`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "हिशोब तयार करता आला नाही"
    );
  }

  return data;
}

export async function closeMonth() {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/monthly/close`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    const data = await response.json();

    throw new Error(
      data.message || "महिना पूर्ण करता आला नाही"
    );
  }
}

export async function markLoanMonthlyPaid(loanId, principalRepayment) {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${API_BASE_URL}/api/loans/${loanId}/monthly-paid`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        loanId,
        principalRepayment: Number(principalRepayment),
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "कर्जाची नोंद करता आली नाही");
  }

  return data;
}