import React from "react";
import { useParams } from "react-router-dom";

const ClientDetails = ({ clients = [] }) => {
  const { id } = useParams();

  // Dummy clients for initial display
  const dummyClients = [
    { name: "Wayne Enterprises", email: "contact@wayne.com", phone: "555-1234", joined: "2025-11-20" },
    { name: "Stark Industries", email: "info@stark.com", phone: "555-5678", joined: "2025-11-22" },
    { name: "Oscorp", email: "support@oscorp.com", phone: "555-9012", joined: "2025-11-25" },
  ];

  const allClients = [...dummyClients, ...clients];
  const client = allClients[id];

  if (!client) {
    return <p>Client not found.</p>;
  }

  return (
    <div className="details-container">
      <h2>Client Details</h2>
      <div className="details-card">
        <p><strong>Name:</strong> {client.name}</p>
        <p><strong>Email:</strong> {client.email}</p>
        <p><strong>Phone:</strong> {client.phone}</p>
        <p><strong>Date Joined:</strong> {client.joined}</p>
      </div>
    </div>
  );
};

export default ClientDetails;
