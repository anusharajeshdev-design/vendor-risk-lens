function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Vendor-Risk Lens Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Vendors</h3>
          <p>24</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
          }}
        >
          <h3>Open Incidents</h3>
          <p>8</p>
        </div>

        <div
          style={{
            border: "1px solid #ccc",
            padding: "20px",
            width: "200px",
            borderRadius: "10px",
          }}
        >
          <h3>Critical Risks</h3>
          <p>3</p>
          <p>4</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;