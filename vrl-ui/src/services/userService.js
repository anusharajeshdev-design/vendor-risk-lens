const API_URL = "https://vendor-risk-lens.onrender.com/api/User";

const getAuthHeader = () => {
    const token = localStorage.getItem("token");

    return {
        Authorization: `Bearer ${token}`
    };
};

export const getUsers = async () => {

    const response = await fetch(API_URL, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const searchUsers = async (keyword) => {

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

export const createUser = async (user) => {

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(user)
    });

    return await response.json();
};

export const updateUser = async (id, user) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            ...getAuthHeader()
        },
        body: JSON.stringify(user)
    });

    return await response.json();
};

export const deleteUser = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const getUserById = async (id) => {

    const response = await fetch(`${API_URL}/${id}`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};

export const getRoles = async () => {

    const response = await fetch(`${API_URL}/roles`, {
        headers: {
            ...getAuthHeader()
        }
    });

    return await response.json();
};