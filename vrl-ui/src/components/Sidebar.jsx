import { NavLink, useNavigate } from "react-router-dom";

import {
    FaBuilding,
    FaExclamationTriangle,
    FaUsers,
    FaChartLine,
    FaSignOutAlt
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar({collapsed, setCollapsed}){

    const navigate = useNavigate();
    const fullName = localStorage.getItem("fullName");
    const roleName = localStorage.getItem("roleName");
    const initials =
    fullName
        ?.split(" ")
        .map(name => name[0])
        .join("")
        .toUpperCase();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (

        <div className={`sidebar ${ collapsed ? "collapsed" : "" }`} >

            <div className="sidebar-brand">
                <button
                        className="collapse-btn"
                        onClick={() => setCollapsed(!collapsed)}
                    >

                        {collapsed ? ">" : "<"}

                    </button>
                <h1>VRL</h1>

                <span>Vendor Risk Lens</span>

            </div>

            <nav className="sidebar-nav">

                <NavLink to="/dashboard">
                    <FaChartLine className="menu-icon" />
                    <span className="sidebar-label">Dashboard</span>
                </NavLink>

                <NavLink to="/vendors">
                    <FaBuilding className="menu-icon" />
                    <span className="sidebar-label">Vendors</span>
                </NavLink>

                <NavLink to="/incidents">
                    <FaExclamationTriangle className="menu-icon" />
                    <span className="sidebar-label">Incidents</span>
                </NavLink>

                <NavLink to="/users">
                    <FaUsers className="menu-icon" />
                    <span className="sidebar-label">Users</span>
                </NavLink>

            </nav>

            <div className="sidebar-footer">

                <div className="profile-card">

                    <div className="profile-name">
                        {fullName}
                    </div>

                    <div className="profile-role">
                        {roleName}
                    </div>

                </div>

                <button
                    className="logout-btn"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    <span className="sidebar-label">Logout</span>
                </button>

            </div>

        </div>

    );
}

export default Sidebar;