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
        }
    );

    return await response.json();
};