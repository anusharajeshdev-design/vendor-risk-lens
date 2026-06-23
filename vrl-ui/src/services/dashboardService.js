const API_URL = "http://localhost:5037/api/dashboard";

const getAuthHeader = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
};

export const getDashboardSummary = async () => {

    const response = await fetch(
        `${API_URL}/summary`,
        {
            headers: getAuthHeader()
        });

    return await response.json();
};

export const getRiskDistribution = async () => {

    const response = await fetch(
        `${API_URL}/risk-distribution`,
        {
            headers: getAuthHeader()
        });

    return await response.json();
};

export const getIncidentStatus = async () => {

    const response = await fetch(
        `${API_URL}/incident-status`,
        {
            headers: getAuthHeader()
        });

    return await response.json();
};

export const getRecentVendors = async () => {

    const response = await fetch(
        `${API_URL}/recent-vendors`,
        {
            headers: getAuthHeader()
        });

    return await response.json();
};