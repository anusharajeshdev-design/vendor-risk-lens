import { useEffect, useState } from "react";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis
} from "recharts";

import {
    getDashboardSummary,
    getRiskDistribution,
    getIncidentStatus,
    getRecentVendors
} from "../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {

    const [summary, setSummary] = useState(null);

    const [riskDistribution,
        setRiskDistribution] = useState(null);

    const [incidentStatus,
        setIncidentStatus] = useState(null);

    const [recentVendors,
        setRecentVendors] = useState([]);

    const COLORS = [
    "#DBEAFE", // Low
    "#93C5FD", // Medium
    "#2563EB"  // High
    ];

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            const [
                summaryResult,
                riskResult,
                incidentResult,
                vendorsResult
            ] = await Promise.all([
                getDashboardSummary(),
                getRiskDistribution(),
                getIncidentStatus(),
                getRecentVendors()
            ]);

            setSummary(summaryResult.data);

            setRiskDistribution(
                riskResult.data
            );

            setIncidentStatus(
                incidentResult.data
            );

            setRecentVendors(
                vendorsResult.data
            );

        }
        catch (error) {

            console.error(error);
        }
    };

    if (!summary) {

        return <div>Loading...</div>;
    }

    return (

        <div className="page-container">

            <div className="page-header">

                <h1>
                    Dashboard
                </h1>

            </div>

            {/* KPI CARDS */}

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

                <div className="dashboard-card">
                    <div className="card-label">
                        Due For Review
                    </div>
                    <div className="card-value">
                        {summary.vendorsDueForReview}
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-label">
                        Critical Incidents
                    </div>
                    <div className="card-value">
                        {summary.criticalIncidents}
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-label">
                        Vendors Added
                    </div>
                    <div className="card-value">
                        {summary.vendorsAddedThisMonth}
                    </div>
                </div>

                <div className="dashboard-card">
                    <div className="card-label">
                        New Incidents
                    </div>
                    <div className="card-value">
                        {summary.incidentsOpenedThisMonth}
                    </div>
                </div>

            </div>

            {/* COMPLIANCE */}

            <div className="dashboard-section">

                <div className="section-card compliance-card">

                    <div className="section-title">
                        Compliance Score
                    </div>

                    <div className="compliance-score">
                        {summary.complianceScore}%
                    </div>

                </div>

            </div>

            {/* CHARTS */}

            <div className="dashboard-two-column">

                <div className="section-card">

                    <h3>
                        Risk Distribution
                    </h3>

                    {riskDistribution && (

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie
                                    data={[
                                        {
                                            name: "Low",
                                            value:
                                                riskDistribution.lowRisk
                                        },
                                        {
                                            name: "Medium",
                                            value:
                                                riskDistribution.mediumRisk
                                        },
                                        {
                                            name: "High",
                                            value:
                                                riskDistribution.highRisk
                                        }
                                    ]}
                                    dataKey="value"
                                    outerRadius={100}
                                    label
                                >

                                    {COLORS.map(
                                        (color, index) => (

                                            <Cell
                                                key={index}
                                                fill={color}
                                            />

                                        )
                                    )}

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    )}

                </div>

                <div className="section-card">

                    <h3>
                        Incident Status
                    </h3>

                    {incidentStatus && (

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={[
                                    {
                                        status: "Open",
                                        count:
                                            incidentStatus.open
                                    },
                                    {
                                        status: "Progress",
                                        count:
                                            incidentStatus.inProgress
                                    },
                                    {
                                        status: "Closed",
                                        count:
                                            incidentStatus.closed
                                    }
                                ]}
                            >

                                <XAxis
                                    dataKey="status"
                                />

                                <YAxis />

                                <Tooltip />

                                <Bar
                                    dataKey="count"
                                    fill="#4F7DF3"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    )}

                </div>

            </div>

            {/* RECENT VENDORS */}

            <div className="dashboard-section">

                <div className="section-card">

                    <h3>
                        Recent Vendors
                    </h3>

                    {recentVendors.map(vendor => (

                        <div
                            key={vendor.vendorId}
                            className="vendor-row"
                        >

                            <span>
                                {vendor.vendorName}
                            </span>

                            <span>
                                {vendor.riskRating}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default Dashboard;