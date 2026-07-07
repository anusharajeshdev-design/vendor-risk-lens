import { useEffect, useState } from "react";
import { getVendors, deleteVendor, searchVendors } from "../services/vendorService";
import { Pencil, Trash2, Sparkles, History, Search } from "lucide-react";
import SuccessModal from "../components/SuccessModal";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";
import ViewHistoryModal from "../components/ViewHistoryModal";
import "./Vendors.css";
import { generateVendorSummary } from "../services/aiService";
import AISummaryModal from "../components/AISummaryModal";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [showAISummaryModal, setShowAISummaryModal] = useState(false);
  const [aiSummary, setAISummary] = useState("");
  const [aiLoading, setAILoading] = useState(false);
  const [selectedVendorForAI, setSelectedVendorForAI] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");
  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    const result = await getVendors();

    setVendors(result.data);
  };

  const handleSearch = async (keyword) => {
  
      setSearchKeyword(keyword);
  
      if (keyword.trim() === "") {
  
          loadVendors();
  
          return;
      }
  
      const result = await searchVendors(keyword);
  
      setVendors(result);
  };

  const handleDelete = async (vendorId) => {

    try {

      const result = await deleteVendor(vendorId);

      if (result.success) {

        await loadVendors();

        setShowSuccessModal(true);

      } else {

        alert(result.message);
      }

    } catch (error) {

      console.error(error);

      alert("Error deleting vendor");
    }
  };

  const handleGenerateSummary = async (vendorId) => {

    setSelectedVendorForAI(vendorId);

    setShowAISummaryModal(true);

    setAILoading(true);

    try {

        const result = await generateVendorSummary(vendorId);

        setAISummary(result.data);

    } catch (error) {

        console.error(error);

        setAISummary("Failed to generate AI summary.");

    } finally {

        setAILoading(false);
    }
};

  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Vendor Management</h1>
        <div className="search-box">
            <Search size={18} />
            <input
                type="text"
                placeholder="Search vendors..."
                value={searchKeyword}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </div>
        <button className="add-button" onClick={() => navigate("/vendors/new")}>
            + Add Vendor
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Vendor Name</th>
              <th>Type</th>
              <th>Email</th>
              <th>Risk</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {vendors.map((vendor) => (
              <tr key={vendor.vendorId}>
                <td>{vendor.vendorName}</td>
                <td>{vendor.vendorType}</td>
                <td>{vendor.contactEmail}</td>
                <td>{vendor.riskRating}</td>
                <td>
                  {vendor.isActive ? "Active" : "Inactive"}
                </td>
                <td>
                    <div className="action-icons">
                        <Pencil size={18} className="edit-icon" onClick={() => navigate(`/vendors/edit/${vendor.vendorId}`)}/>
                          <History
                              size={18}
                              className="edit-icon"
                              onClick={() => {
                                  setSelectedVendorId(vendor.vendorId);
                                  setShowHistoryModal(true);
                              }}
                          />
                           <Sparkles
                              size={18}
                              className="ai-icon"
                              onClick={() => {
                                  handleGenerateSummary(vendor.vendorId);
                              }}
                          />
                        <Trash2 size={18} className="delete-icon" onClick={() => {
                            setVendorToDelete(vendor.vendorId);
                            setShowDeleteModal(true);
                          }}/>
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {
        showSuccessModal && (
          <SuccessModal
            title="Vendor Deleted"
            message="The vendor has been deleted successfully."
            onClose={() => {
              setShowSuccessModal(false);
            }}
          />
        )
      }
      {
        showDeleteModal && (
          <ConfirmModal
            title="Delete Vendor"
            message="Are you sure you want to delete this vendor?"
            onCancel={() => {
              setShowDeleteModal(false);
            }}
            onConfirm={() => {
              handleDelete(vendorToDelete);
              setShowDeleteModal(false);
            }}
          />
        )
      }
      <ViewHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
        entityType="Vendor"
        entityId={selectedVendorId}
    />
      <AISummaryModal
          isOpen={showAISummaryModal}
          onClose={() => setShowAISummaryModal(false)}
          summary={aiSummary}
          loading={aiLoading}
          onRegenerate={() =>
              handleGenerateSummary(selectedVendorForAI)
          }
      />

    </div>
  );
}

export default Vendors;