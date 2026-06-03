import "./VendorForm.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
createIncident,
updateIncident,
getIncidentById
} from "../services/incidentService";

import SuccessModal from "../components/SuccessModal";

function IncidentForm() {

const navigate = useNavigate();
const { id } = useParams();

const [showSuccessModal, setShowSuccessModal] = useState(false);

const [incident, setIncident] = useState({
incidentNumber: "",
vendorId: "",
title: "",
description: "",
incidentType: "",
severity: "",
priority: "",
status: "Open",
assignedUserId: "",
createdByUserId: "",
reportedDate: "",
dueDate: "",
expectedCloseDate: "",
actualCloseDate: "",
resolutionSummary: ""
});

useEffect(() => {


if (id) {
  loadIncident();
}


}, [id]);

const loadIncident = async () => {


try {

  const result =
    await getIncidentById(id);

  setIncident({
    ...result.data,

    reportedDate:
      result.data.reportedDate?.split("T")[0] || "",

    dueDate:
      result.data.dueDate?.split("T")[0] || "",

    expectedCloseDate:
      result.data.expectedCloseDate?.split("T")[0] || "",

    actualCloseDate:
      result.data.actualCloseDate?.split("T")[0] || ""
  });

} catch (error) {

  console.error(error);
}


};

const handleChange = (event) => {


const { name, value } = event.target;

setIncident((current) => ({
  ...current,
  [name]: value
}));


};

const handleSave = async () => {


try {

  const incidentToSave = {
    ...incident,

    vendorId: incident.vendorId
      ? Number(incident.vendorId)
      : null,

    createdByUserId: 1,

    assignedUserId: incident.assignedUserId
      ? Number(incident.assignedUserId)
      : 1,

    reportedDate:
      incident.reportedDate || null,

    dueDate:
      incident.dueDate || null,

    expectedCloseDate:
      incident.expectedCloseDate || null,

    actualCloseDate:
      incident.actualCloseDate || null
  };

  let result;

  if (id) {

    result = await updateIncident(
      id,
      incidentToSave
    );

  } else {

    result = await createIncident(
      incidentToSave
    );
  }

  if (result.success) {

    setShowSuccessModal(true);

  } else {

    alert(result.message);
  }

} catch (error) {

  console.error(error);

  alert("Error saving incident");
}


};

return ( <div className="form-page">


  <div
    className="back-link"
    onClick={() => navigate("/incidents")}
  >
    ← Back to Incidents
  </div>

  <div className="form-card">

    <h1>
      {id
        ? "Edit Incident"
        : "Create Incident"}
    </h1>

    <div className="form-grid">

      <div className="form-group">
        <label>Incident Number *</label>

        <input
          type="text"
          name="incidentNumber"
          value={incident.incidentNumber}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Vendor *</label>

        <select
          name="vendorId"
          value={incident.vendorId}
          onChange={handleChange}
        >
          <option value="">
            Select Vendor
          </option>

          <option value="3">
            ABC Electric
          </option>

          <option value="4">
            XYZ Cloud
          </option>
        </select>
      </div>

      <div className="form-group">
        <label>Title *</label>

        <input
          type="text"
          name="title"
          value={incident.title}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Incident Type *</label>

        <select
          name="incidentType"
          value={incident.incidentType}
          onChange={handleChange}
        >
          <option value="">
            Select Type
          </option>

          <option value="Security">
            Security
          </option>

          <option value="Operational">
            Operational
          </option>

          <option value="Compliance">
            Compliance
          </option>
        </select>
      </div>

      <div className="form-group">
        <label>Severity *</label>

        <select
          name="severity"
          value={incident.severity}
          onChange={handleChange}
        >
          <option value="">
            Select Severity
          </option>

          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Critical">Critical</option>
        </select>
      </div>

      <div className="form-group">
        <label>Priority *</label>

        <select
          name="priority"
          value={incident.priority}
          onChange={handleChange}
        >
          <option value="">
            Select Priority
          </option>

          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
          <option value="Urgent">Urgent</option>
        </select>
      </div>

      <div className="form-group">
        <label>Status *</label>

        <select
          name="status"
          value={incident.status}
          onChange={handleChange}
        >
          <option value="Open">Open</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
      </div>

      <div className="form-group">
        <label>Reported Date</label>

        <input
          type="date"
          name="reportedDate"
          value={incident.reportedDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Expected Close Date</label>

        <input
          type="date"
          name="expectedCloseDate"
          value={incident.expectedCloseDate}
          onChange={handleChange}
        />
      </div>

    </div>

    <div className="form-group">

      <label>Description</label>

      <textarea
        name="description"
        value={incident.description}
        onChange={handleChange}
        rows="5"
      />

    </div>

    <div className="button-container">

      <button
        type="button"
        className="cancel-btn"
        onClick={() => navigate("/incidents")}
      >
        Cancel
      </button>

      <button
        type="button"
        className="save-btn"
        onClick={handleSave}
      >
        {id
          ? "Update Incident"
          : "Save Incident"}
      </button>

    </div>

  </div>

  {
    showSuccessModal && (
      <SuccessModal
        title={
          id
            ? "Incident Updated"
            : "Incident Created"
        }
        message={
          id
            ? "The incident has been updated successfully."
            : "The incident has been created successfully."
        }
        onClose={() => {

          setShowSuccessModal(false);

          navigate("/incidents");
        }}
      />
    )
  }

</div>


);
}

export default IncidentForm;
