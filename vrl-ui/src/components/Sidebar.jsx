
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
    FaBars,
    FaTimes,
    FaBuilding,
    FaExclamationTriangle,
    FaUsers,
    FaChartLine,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {

    const navigate = useNavigate();

    const [collapsed, setCollapsed] = useState(false);

    const handleLogout = () => {

        localStorage.removeItem("token");

        navigate("/login");
    };

    return (

        <div
            className={
                collapsed
                    ? "sidebar collapsed"
                    : "sidebar"
            }
        >

            <div className="sidebar-header">

                <button
                    className="collapse-btn"
                    onClick={() =>
                        setCollapsed(!collapsed)
                    }
                >
                    {
                        collapsed
                            ? <FaBars />
                            : <FaTimes />
                    }
                </button>

            </div>

            <nav className="sidebar-nav">

                <Link to="/vendors">

                    <FaBuilding
                        className="menu-icon"
                    />

                    <span className="menu-text">
                        Vendors
                    </span>

                </Link>

                <Link to="/incidents">

                    <FaExclamationTriangle
                        className="menu-icon"
                    />

                    <span className="menu-text">
                        Incidents
                    </span>

                </Link>

                <Link to="/users">

                    <FaUsers
                        className="menu-icon"
                    />

                    <span className="menu-text">
                        Users
                    </span>

                </Link>

                <Link to="/dashboard">

                    <FaChartLine
                        className="menu-icon"
                    />

                    <span className="menu-text">
                        Dashboard
                    </span>

                </Link>
                

            </nav>

            <div className="sidebar-footer">

                <div className="profile-card">

                    <div className="profile-avatar">
                        AR
                    </div>

                    {!collapsed && (

                        <div>

                            <div className="profile-name">
                                Anusha R
                            </div>

                            <div className="profile-role">
                                Administrator
                            </div>

                        </div>

                    )}

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    {!collapsed && (

                        <span className="logout-text">
                            Logout
                        </span>

                    )}

                </button>

            </div>

        </div>

    );
}

export default Sidebar;

