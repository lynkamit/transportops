import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar"; // Ensure NavBar is imported

const HomePage = () => {
  const navigate = useNavigate();

  // Immutable recent invoices data
  const recentInvoices = Object.freeze([
    { id: 1, client: "Acme Corp", amount: "$1,200", date: "Nov 25, 2025" },
    { id: 2, client: "Globex Inc", amount: "$850", date: "Nov 26, 2025" },
  ]);

  return (
    <>
      {/* Top navigation bar, always shown when authenticated */}
      <NavBar isAuthenticated={true} setIsAuthenticated={() => {}} />
      <div className="home-container">
        <h1>Welcome to TransportOps</h1>
        <p className="home-subtitle">
          Your central dashboard for managing invoices, clients, and operations.
        </p>

        {/* Main dashboard grid */}
        <div className="home-grid">
          {/* Invoices section */}
          <div className="home-card">
            <h2>Invoices</h2>
            <p>Create and track invoices with ease.</p>
            <button onClick={() => navigate("/invoices/new")}>Create Invoice</button>
            <button onClick={() => navigate("/invoices")}>View Invoices</button>
          </div>

          {/* Clients section */}
          <div className="home-card">
            <h2>Clients</h2>
            <p>Manage client information and relationships.</p>
            <button onClick={() => navigate("/clients/new")}>Add Client</button>
            <button onClick={() => navigate("/clients")}>View Clients</button>
          </div>

          {/* Reports section */}
          <div className="home-card">
            <h2>Reports</h2>
            <p>View insights and performance analytics.</p>
            <button>Generate Report</button>
          </div>
        </div>

        {/* Recent activity section */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <div className="activity-grid">
            {/* Latest invoices list */}
            <div className="activity-card">
              <h3>Latest Invoices</h3>
              <ul>
                {recentInvoices.map(invoice => (
                  <li key={invoice.id}>
                    {invoice.client} — {invoice.amount} ({invoice.date})
                  </li>
                ))}
              </ul>
            </div>
            {/* New clients list */}

          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
