import "./VendorForm.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
createIncident,
updateIncident,
getIncidentById,
getIncidentSeverities,
getIncidentStatuses,
getIncidentTypes,
getIncidentPriorities,
getActiveVendors
} from "../services/incidentService";

import SuccessModal from "../components/SuccessModal";

function IncidentForm() {


const navigate = useNavigate();
const { id } = useParams();

const [showSuccessModal, setShowSuccessModal] = useState(false);

const [severities, setSeverities] = useState([]);
const [statuses, setStatuses] = useState([]);
const [types, setTypes] = useState([]);
const [priorities, setPriorities] = useState([]);
const [active, setActive] = useState([]);

const [incident, setIncident] = useState({
    incidentNumber: "",
    vendorId: "",
    title: "",
    description: "",
    incidentType: "",
    severity: "",
    priority: "",
    status: "",
    assignedUserId: "",
    createdByUserId: "",
    reportedDate: "",
    dueDate: "",
    expectedCloseDate: "",
    actualCloseDate: "",
    resolutionSummary: ""
});

useEffect(() => {

    loadDropdowns();

    if (id) {
        loadIncident();
    }

}, [id]);

const loadDropdowns = async () => {

    try {

        const [
            severityResult,
            statusResult,
            typeResult,
            priorityResult,
            activeResult
        ] = await Promise.all([
            getIncidentSeverities(),
            getIncidentStatuses(),
            getIncidentTypes(),
            getIncidentPriorities(),
            getActiveVendors()
        ]);

        setSeverities(severityResult.data || []);
        setStatuses(statusResult.data || []);
        setTypes(typeResult.data || []);
        setPriorities(priorityResult.data || []);
        setActive(activeResult.data || []);

    } catch (error) {

        console.error(error);
    }
};

const loadIncident = async () => {

    try {

        const result = await getIncidentById(id);

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

            vendorId:
                incident.vendorId
                    ? Number(incident.vendorId)
                    : null,

            createdByUserId: 1,

            assignedUserId:
                incident.assignedUserId
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

return (

    <div className="form-page">

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

                        {active.map(vendor => (
                            <option
                                key={vendor.vendorId}
                                value={vendor.vendorId}
                            >
                                {vendor.vendorName}
                            </option>
                        ))}
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

                        {
                            types.map(type => (
                                <option
                                    key={type.incidentTypeId}
                                    value={type.incidentTypeName}
                                >
                                    {type.incidentTypeName}
                                </option>
                            ))
                        }
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

                        {
                            severities.map(severity => (
                                <option
                                    key={severity.incidentSeverityId}
                                    value={severity.severityName}
                                >
                                    {severity.severityName}
                                </option>
                            ))
                        }
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

                        {
                            priorities.map(priority => (
                                <option
                                    key={priority.incidentPriorityId}
                                    value={priority.priorityName}
                                >
                                    {priority.priorityName}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label>Status *</label>

                    <select
                        name="status"
                        value={incident.status}
                        onChange={handleChange}
                    >
                        <option value="">
                            Select Status
                        </option>

                        {
                            statuses.map(status => (
                                <option
                                    key={status.incidentStatusId}
                                    value={status.statusName}
                                >
                                    {status.statusName}
                                </option>
                            ))
                        }
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
