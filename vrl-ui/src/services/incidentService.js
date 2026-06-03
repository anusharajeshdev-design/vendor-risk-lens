const API_URL = "http://localhost:5037/api/Incident";

export const getIncidents = async () => {
  const response = await fetch(API_URL);

  const result = await response.json();

  return result;
};

export const getIncidentById = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);

  const result = await response.json();

  return result;
};

export const createIncident = async (incident) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(incident)
  });

  return await response.json();
};

export const updateIncident = async (id, incident) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(incident)
  });

  return await response.json();
};