const API_URL = "http://localhost:5037/api/vendors";

const getAuthHeader = () => {
const token = localStorage.getItem("token");


return {
    Authorization: `Bearer ${token}`
};


};

export const getVendors = async () => {
const response = await fetch(API_URL, {
headers: {
...getAuthHeader()
}
});


const result = await response.json();

return result;


};

export const createVendor = async (vendor) => {
const response = await fetch(API_URL, {
method: "POST",
headers: {
"Content-Type": "application/json",
...getAuthHeader()
},
body: JSON.stringify(vendor)
});


const result = await response.json();

return result;


};

export const getVendorById = async (id) => {
const response = await fetch(`${API_URL}/${id}`, {
headers: {
...getAuthHeader()
}
});


const result = await response.json();

return result;


};

export const updateVendor = async (id, vendor) => {
const response = await fetch(`${API_URL}/${id}`, {
method: "PUT",
headers: {
"Content-Type": "application/json",
...getAuthHeader()
},
body: JSON.stringify(vendor)
});


const result = await response.json();

return result;


};

export const deleteVendor = async (id) => {
    const response = await fetch(
        `${API_URL}/${id}`, 
        {
            method: "DELETE",
            headers: {
            ...getAuthHeader()
            }
        });
    const result = await response.json();
    return result;
};

export const getVendorTypes = async () => {

    const response = await fetch(
        `${API_URL}/types`,
        {
            headers: {
                ...getAuthHeader()
            }
        });

    return await response.json();
};

export const getActiveUsers = async () => {

    const response = await fetch(
        `${API_URL}/active`,
        {
            headers: {
                ...getAuthHeader()
            }
        });

    return await response.json();
};
