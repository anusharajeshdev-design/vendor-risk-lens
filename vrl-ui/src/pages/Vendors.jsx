import { useEffect, useState } from "react";
import { getVendors, deleteVendor } from "../services/vendorService";
import { Pencil, Trash2 } from "lucide-react";
import SuccessModal from "../components/SuccessModal";
import ConfirmModal from "../components/ConfirmModal";
import { useNavigate } from "react-router-dom";

import "./Vendors.css";

function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    const result = await getVendors();

    setVendors(result.data);
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
  const navigate = useNavigate();
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Vendor Management</h1>

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
    </div>
  );
}

export default Vendors;