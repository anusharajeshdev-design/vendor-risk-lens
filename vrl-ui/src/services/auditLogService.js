const API_URL = "http://localhost:5037/api/AuditLogs";

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