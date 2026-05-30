import "./VendorForm.css";
import { useNavigate } from "react-router-dom";

function VendorForm() {
    const navigate = useNavigate();
  return (
    <div className="form-page">
        <div className="back-link" onClick={() => navigate("/vendors")}>
            ← Back to Vendors
        </div>
      <div className="form-card">
        <h1>Create Vendor</h1>

        <div className="form-grid">

          <div className="form-group">
            <label>Vendor Name</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Vendor Type</label>
            <select>
              <option>Select Vendor Type</option>
            </select>
          </div>

          <div className="form-group">
            <label>Contact Email</label>
            <input type="email" />
          </div>

          <div className="form-group">
            <label>Website</label>
            <input type="text" />
          </div>

          <div className="form-group">
            <label>Risk Rating</label>
            <select>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>

          <div className="form-group">
            <label>Vendor Owner</label>
            <select>
              <option>Select Owner</option>
            </select>
          </div>

          <div className="form-group">
            <label>Last Review Date</label>
            <input type="date" />
          </div>

          <div className="form-group">
            <label>Next Review Date</label>
            <input type="date" />
          </div>

        </div>

        <div className="checkbox-container">
          <input type="checkbox" />
          <label>Active Vendor</label>
        </div>

        <div className="button-container">
          <button className="cancel-btn">
            Cancel
          </button>

          <button className="save-btn">
            Save Vendor
          </button>
        </div>
      </div>
    </div>
  );
}

export default VendorForm;