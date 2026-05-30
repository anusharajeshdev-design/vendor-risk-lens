import { useEffect, useState } from "react";
import { getVendors } from "../services/vendorService";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Vendors.css";

function Vendors() {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    const result = await getVendors();

    setVendors(result.data);
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
                        <Pencil size={18} className="edit-icon" />
                        <Trash2 size={18} className="delete-icon" />
                    </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Vendors;