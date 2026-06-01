const API_URL = "http://localhost:5037/api/vendors";

export const getVendors = async () => {
  const response = await fetch(API_URL);

  const result = await response.json();

  return result;
};

export const createVendor = async (vendor) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendor)
  });

  const result = await response.json();

  return result;
};

export const getVendorById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  const result = await response.json();

  return result;
};

export const updateVendor = async (id, vendor) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vendor)
  });

  const result = await response.json();

  return result;
};

export const deleteVendor = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  const result = await response.json();

  return result;
};