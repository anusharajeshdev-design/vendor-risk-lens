const API_URL = "http://localhost:5037/api/vendors";

export const getVendors = async () => {
  const response = await fetch(API_URL);

  const result = await response.json();

  return result;
};