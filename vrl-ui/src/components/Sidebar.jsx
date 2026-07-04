import { NavLink, useNavigate } from "react-router-dom";
import {
    FaBuilding,
    FaExclamationTriangle,
    FaUsers,
    FaChartLine,
    FaSignOutAlt,
    FaChevronLeft,
    FaChevronRight
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({ collapsed, setCollapsed }) {

    const navigate = useNavigate();

    const fullName = localStorage.getItem("fullName") || "";
    const roleName = localStorage.getItem("roleName") || "";

    const initials = fullName
        .split(" ")
        .map(name => name.charAt(0))
        .join("")
        .substring(0, 2)
        .toUpperCase();

    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");
    };

    return (

        <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

            {/* Collapse Button */}

             <button
                    className="collapse-btn"
                    onClick={() => setCollapsed(!collapsed)}
                >
                    {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
                </button>

                <div className="sidebar-brand">

                    <h1>VRL</h1>

                    {!collapsed && <span>Vendor Risk Lens</span>}

                </div>

            {/* Navigation */}

            <nav className="sidebar-nav">

                <NavLink to="/dashboard">

                    <FaChartLine className="menu-icon" />

                    {
                        !collapsed &&
                        <span>Dashboard</span>
                    }

                </NavLink>

                <NavLink to="/vendors">

                    <FaBuilding className="menu-icon" />

                    {
                        !collapsed &&
                        <span>Vendors</span>
                    }

                </NavLink>

                <NavLink to="/incidents">

                    <FaExclamationTriangle className="menu-icon" />

                    {
                        !collapsed &&
                        <span>Incidents</span>
                    }

                </NavLink>

                <NavLink to="/users">

                    <FaUsers className="menu-icon" />

                    {
                        !collapsed &&
                        <span>Users</span>
                    }

                </NavLink>

            </nav>

            {/* Footer */}

            <div className="sidebar-footer">

                <div className="profile-card">

                    <div className="profile-avatar">

                        {initials}

                    </div>

                    {

                        !collapsed &&

                        <div className="profile-details">

                            <div className="profile-name">

                                {fullName}

                            </div>

                            <div className="profile-role">

                                {roleName}

                            </div>

                        </div>

                    }

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >

                    <FaSignOutAlt />

                    {

                        !collapsed &&

                        <span>

                            Logout

                        </span>

                    }

                </button>

            </div>

        </aside>

    );
}

export default Sidebar;