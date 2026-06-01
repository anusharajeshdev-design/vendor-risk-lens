import "./VendorForm.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createVendor, getVendorById, updateVendor } from "../services/vendorService";
import SuccessModal from "../components/SuccessModal";

function VendorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  useEffect(() => {

    if (!id) {
      return;
    }

    loadVendor();

  }, [id]);
  const loadVendor = async () => {
    try {

      const result = await getVendorById(id);

      if (result.success) {

        setVendor({
          vendorName: result.data.vendorName || "",
          vendorType: result.data.vendorType || "",
          contactEmail: result.data.contactEmail || "",
          website: result.data.website || "",
          riskRating: result.data.riskRating || "Low",
          ownerUserId: result.data.ownerUserId || "",
          lastReviewDate:
            result.data.lastReviewDate?.substring(0, 10) || "",
          nextReviewDate:
            result.data.nextReviewDate?.substring(0, 10) || "",
          isActive: result.data.isActive
        });
      }

    } catch (error) {

      console.error(error);
    }
  };
  const [vendor, setVendor] = useState({
    vendorName: "",
    vendorType: "",
    contactEmail: "",
    website: "",
    riskRating: "Low",
    ownerUserId: "",
    lastReviewDate: "",
    nextReviewDate: "",
    isActive: true,
    isDeleted: false
  });
  
  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setVendor((currentVendor) => ({
      ...currentVendor,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSave = async () => {
  try {

    let result;

    if (id) {

      result = await updateVendor(id, vendor);

    } else {

      result = await createVendor(vendor);
    }

    if (result.success) {

      setShowSuccessModal(true);

    } else {

      alert(result.message);
    }

  } catch (error) {

    console.error(error);

    alert("Error saving vendor");
  }
};

  return (
    <div className="form-page">
      <div
        className="back-link"
        onClick={() => navigate("/vendors")}
      >
        ← Back to Vendors
      </div>

      <div className="form-card">
        <h1>{id ? "Edit Vendor" : "Create Vendor"}</h1>

        <div className="form-grid">

          <div className="form-group">
            <label>Vendor Name *</label>
            <input
              type="text"
              name="vendorName"
              value={vendor.vendorName}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Vendor Type *</label>
            <select
              name="vendorType"
              value={vendor.vendorType}
              onChange={handleChange}
            >
              <option value="">Select Vendor Type</option>
              <option value="Cloud Provider">Cloud Provider</option>
              <option value="Software Vendor">Software Vendor</option>
              <option value="Security Vendor">Security Vendor</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input
              type="email"
              name="contactEmail"
              value={vendor.contactEmail}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input
              type="text"
              name="website"
              value={vendor.website}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Risk Rating *</label>
            <select
              name="riskRating"
              value={vendor.riskRating}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Vendor Owner</label>
            <select
              name="ownerUserId"
              value={vendor.ownerUserId}
              onChange={handleChange}
            >
              <option value="">Select Owner</option>
              <option value="1">Anusha</option>
              <option value="2">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label>Last Review Date</label>
            <input
              type="date"
              name="lastReviewDate"
              value={vendor.lastReviewDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Next Review Date</label>
            <input
              type="date"
              name="nextReviewDate"
              value={vendor.nextReviewDate}
              onChange={handleChange}
            />
          </div>

        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="isActive"
            checked={vendor.isActive}
            onChange={handleChange}
          />

          <label>Active Vendor</label>
        </div>

        <div className="button-container">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate("/vendors")}
          >
            Cancel
          </button>

          <button
            type="button"
            className="save-btn"
            onClick={handleSave}
          >
            {id ? "Update Vendor" : "Save Vendor"}
          </button>

        </div>
      </div>
      {
  showSuccessModal && (
    <SuccessModal
      title={id ? "Vendor Updated" : "Vendor Created"}
      message={
        id
          ? "Your vendor has been updated successfully."
          : "Your vendor has been saved successfully."
      }
      onClose={() => {
        setShowSuccessModal(false);
        navigate("/vendors");
      }}
    />
  )
}
    </div>
  );
}

export default VendorForm;