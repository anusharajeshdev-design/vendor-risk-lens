import { useEffect, useState } from "react";

import { getDashboardSummary }
from "../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {

    const [summary, setSummary] = useState({
        totalVendors: 0,
        criticalVendors: 0,
        openIncidents: 0,
        activeUsers: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const result =
                await getDashboardSummary();

            setSummary(result.data);

        } catch (error) {

            console.error(error);
        }
    };

    return (

        <div className="page-container">

            <div className="page-header">

                <h1>Dashboard</h1>

            </div>

            <div className="dashboard-grid">

                <div className="dashboard-card">

                    <div className="card-label">
                        Total Vendors
                    </div>

                    <div className="card-value">
                        {summary.totalVendors}
                    </div>

                </div>

                <div className="dashboard-card">

                    <div className="card-label">
                        Critical Vendors
                    </div>

                    <div className="card-value">
                        {summary.criticalVendors}
                    </div>

                </div>

                <div className="dashboard-card">

                    <div className="card-label">
                        Open Incidents
                    </div>

                    <div className="card-value">
                        {summary.openIncidents}
                    </div>

                </div>

                <div className="dashboard-card">

                    <div className="card-label">
                        Active Users
                    </div>

                    <div className="card-value">
                        {summary.activeUsers}
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;