const API_URL = "https://vendor-risk-lens.onrender.com/api/Incident";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
};

export const getIncidents = async () => {

    const response = await fetch(API_URL, {
        headers: {
            ...getAuthHeader()
        }
    });

    const result = await response.json();

    console.log(result);

    return {
        success: true,
        data: result
    };
};

export const getIncidentById = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const createIncident = async (incident) => {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(incident)
    });

    return await response.json();
};

export const updateIncident = async (id, incident) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(incident)
    });

    return await response.json();
};

export const deleteIncident = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const getIncidentSeverities = async () => {

    const response = await fetch(`${API_URL}/severities`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const getIncidentStatuses = async () => {

    const response = await fetch(`${API_URL}/statuses`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const getIncidentTypes = async () => {

    const response = await fetch(`${API_URL}/types`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const getIncidentPriorities = async () => {

    const response = await fetch(`${API_URL}/priorities`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const getActiveVendors = async () => {

    const response = await fetch(`${API_URL}/active`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};
export const SearchIncidents = async (keyword) => {

    const response = await fetch(
        `${API_URL}/search?keyword=${encodeURIComponent(keyword)}`,
        {
            headers: {
                ...getAuthHeader()
            }
        }
    );

    return await response.json();
};