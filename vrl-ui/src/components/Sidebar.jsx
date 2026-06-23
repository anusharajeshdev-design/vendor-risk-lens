import { NavLink, useNavigate } from "react-router-dom";

import {
    FaBuilding,
    FaExclamationTriangle,
    FaUsers,
    FaChartLine,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <div className="sidebar">

            <div className="sidebar-brand">

                <h1>VRL</h1>

                <span>Vendor Risk Lens</span>

            </div>

            <nav className="sidebar-nav">

                <NavLink to="/dashboard">
                    <FaChartLine className="menu-icon" />
                    <span>Dashboard</span>
                </NavLink>

                <NavLink to="/vendors">
                    <FaBuilding className="menu-icon" />
                    <span>Vendors</span>
                </NavLink>

                <NavLink to="/incidents">
                    <FaExclamationTriangle className="menu-icon" />
                    <span>Incidents</span>
                </NavLink>

                <NavLink to="/users">
                    <FaUsers className="menu-icon" />
                    <span>Users</span>
                </NavLink>

            </nav>

            <div className="sidebar-footer">

                <div className="profile-card">

                    <div className="profile-avatar">
                        AR
                    </div>

                    <div>

                        <div className="profile-name">
                            Anusha R
                        </div>

                        <div className="profile-role">
                            Administrator
                        </div>

                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span>Logout</span>
                </button>

            </div>

        </div>

    );
}

export default Sidebar;