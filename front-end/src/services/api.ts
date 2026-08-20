const API_URL = "http://localhost:5000/api";

export const loginUser = async (
  email: string,
  password: string
) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};
export const createDonation = async (donation: {
  donorName: string;
  items: {
    foodName: string;
    quantity: string;
    preparedAt: string;
    expiryTime: string;
    location: string;
  }[];
}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    "http://localhost:5000/api/donations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(donation),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Donation failed");
  }

  return data;
};