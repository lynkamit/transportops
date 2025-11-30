import React from "react";
import { useNavigate } from "react-router-dom";

const ClientList = ({ clients = [] }) => {
  const navigate = useNavigate();

  // Dummy rows for initial display
  const dummyClients = [
    { name: "Wayne Enterprises", email: "contact@wayne.com", phone: "555-1234", joined: "2025-11-20" },
    { name: "Stark Industries", email: "info@stark.com", phone: "555-5678", joined: "2025-11-22" },
    { name: "Oscorp", email: "support@oscorp.com", phone: "555-9012", joined: "2025-11-25" },
  ];

  // Merge dummy + real clients
  const allClients = [...dummyClients, ...clients];

  return (
    <div className="list-container">
      <h2>Clients</h2>
      {allClients.length > 0 ? (
        <table className="client-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allClients.map((client, idx) => (
              <tr key={idx}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>{client.joined}</td>
                <td>
                  <button
                    onClick={() => navigate(`/clients/${idx}`)}
                    className="details-btn"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No clients added yet.</p>
      )}
    </div>
  );
};

export default ClientList;
