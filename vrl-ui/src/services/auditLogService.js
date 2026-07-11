const API_URL = "https://vendor-risk-lens.onrender.com/api/AuditLogs";

const getAuthHeader = () => {

    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
};

export const getAuditHistory = async (entityType, entityId) => {

    const response = await fetch(
        `${API_URL}/${entityType}/${entityId}`,
        {
            headers: getAuthHeader()
        });

    return await response.json();
};