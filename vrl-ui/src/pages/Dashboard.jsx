import { useEffect, useState } from "react";

import {
    getDashboardSummary,
    getRiskDistribution,
    getIncidentStatus,
    getRecentVendors
}
from "../services/dashboardService";

import "./Dashboard.css";

function Dashboard() {

    const [summary, setSummary] = useState(null);

    const [riskDistribution,
        setRiskDistribution] = useState(null);

    const [incidentStatus,
        setIncidentStatus] = useState(null);

    const [recentVendors,
        setRecentVendors] = useState([]);

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
                riskResult.data);

            setIncidentStatus(
                incidentResult.data);

            setRecentVendors(
                vendorsResult.data);

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

            {/* DISTRIBUTION */}

            <div className="dashboard-two-column">

                <div className="section-card">

                    <h3>
                        Risk Distribution
                    </h3>

                    {riskDistribution && (

                        <>

                            <div className="data-row">
                                <span>Low Risk</span>
                                <strong>
                                    {riskDistribution.lowRisk}
                                </strong>
                            </div>

                            <div className="data-row">
                                <span>Medium Risk</span>
                                <strong>
                                    {riskDistribution.mediumRisk}
                                </strong>
                            </div>

                            <div className="data-row">
                                <span>High Risk</span>
                                <strong>
                                    {riskDistribution.highRisk}
                                </strong>
                            </div>

                        </>

                    )}

                </div>

                <div className="section-card">

                    <h3>
                        Incident Status
                    </h3>

                    {incidentStatus && (

                        <>

                            <div className="data-row">
                                <span>Open</span>
                                <strong>
                                    {incidentStatus.open}
                                </strong>
                            </div>

                            <div className="data-row">
                                <span>In Progress</span>
                                <strong>
                                    {incidentStatus.inProgress}
                                </strong>
                            </div>

                            <div className="data-row">
                                <span>Closed</span>
                                <strong>
                                    {incidentStatus.closed}
                                </strong>
                            </div>

                        </>

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