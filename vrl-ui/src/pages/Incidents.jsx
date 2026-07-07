import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, History, Search } from "lucide-react";
import ViewHistoryModal from "../components/ViewHistoryModal";

import { getIncidents,SearchIncidents } from "../services/incidentService";

import "./Incidents.css";

function Incidents() {
  const navigate = useNavigate();
  const [incidents, setIncidents] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    loadIncidents();
  }, []);

  const loadIncidents = async () => {
  const result = await getIncidents();
    setIncidents(result.data);
  };
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedIncidentId, setSelectedIncidentId] = useState(null);
  
  const handleSearch = async (keyword) => {
        setSearchKeyword(keyword);
        if (keyword.trim() === "") {
            loadIncidents();
            return;
        }
        const result = await SearchIncidents(keyword);
        setIncidents(result);
    };
  return (
    <div className="page-container">

      <div className="page-header">

        <h1>Incident Management</h1>
         <div className="search-box">

                <Search size={18} />

                <input
                    type="text"
                    placeholder="Search users..."
                    value={searchKeyword}
                    onChange={(e) => handleSearch(e.target.value)}
                />

            </div>
        <button
          className="add-button"
          onClick={() => navigate("/incidents/new")}
        >
          + Create Incident
        </button>

      </div>

      <div className="table-card">

        <table>

          <thead>

            <tr>
              <th>Incident #</th>
              <th>Vendor Id</th>
              <th>Title</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Reported Date</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {incidents.map((incident) => (

              <tr key={incident.incidentId}>

                <td>{incident.incidentNumber}</td>

                <td>{incident.vendorName}</td>

                <td>{incident.title}</td>

                <td>{incident.severity}</td>

                <td>{incident.status}</td>

                <td>
                  {incident.reportedDate?.split("T")[0]}
                </td>

                <td>

                  <div className="action-icons">

                    <Pencil
                      size={18}
                      className="edit-icon"
                      onClick={() => navigate(`/incidents/edit/${incident.incidentId}`)}
                    />

                     <History
                          size={18}
                          className="edit-icon"
                          onClick={() => {
                              setSelectedIncidentId(incident.incidentId);
                              setShowHistoryModal(true);
                          }}
                      />
                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
      <ViewHistoryModal
              isOpen={showHistoryModal}
              onClose={() => setShowHistoryModal(false)}
              entityType="Incident"
              entityId={selectedIncidentId}
          />
    </div>
  );
}

export default Incidents;