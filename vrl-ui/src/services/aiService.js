const API_URL = "https://vendor-risk-lens.onrender.com/api/AI";

const getAuthHeader = () => {

    const token = localStorage.getItem("token");

    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
    };
};

export const generateVendorSummary = async (vendorId) => {

    const response = await fetch(
        `${API_URL}/vendor-summary`,
        {
            method: "POST",

            headers: getAuthHeader(),

            body: JSON.stringify({
                vendorId: vendorId
            })
        });

    return await response.json();
};

export const askVRL = async (prompt) => {

    const response = await fetch(
        `${API_URL}/ask-vrl`,
        {
            method: "POST",
            headers: getAuthHeader(),
            body: JSON.stringify({
                prompt
            })
        });

    return await response.json();
};