const API_URL = "http://localhost:5037/api/Incident";

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

return result;


};

export const getIncidentById = async (id) => {
const response = await fetch(`${API_URL}/${id}`, {
headers: {
...getAuthHeader()
}
});


const result = await response.json();

return result;


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
