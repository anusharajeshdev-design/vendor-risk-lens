function DashboardCard({ title, value }) {
    return (
        <div className="kpi-card">
            <div className="kpi-title">
                {title}
            </div>

            <div className="kpi-value">
                {value}
            </div>
        </div>
    );
}

export default DashboardCard;