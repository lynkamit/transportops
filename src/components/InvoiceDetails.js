import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const InvoiceDetails = ({ invoices = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Dummy invoices for initial display
  const dummyInvoices = [
    { client: "Wayne Enterprises", amount: "$5000", date: "2025-11-20" },
    { client: "Stark Industries", amount: "$12000", date: "2025-11-22" },
    { client: "Oscorp", amount: "$8000", date: "2025-11-25" },
  ];

  const allInvoices = [...dummyInvoices, ...invoices];
  const invoice = allInvoices[id];

  if (!invoice) {
    return <p>Invoice not found.</p>;
  }

  const handleEdit = () => {
    navigate(`/invoices/${id}/edit`);
  };

  const handleBack = () => {
    navigate("/invoices");
  };

  return (
    <div className="details-container">
      <h2>Invoice Details</h2>
      <div className="details-card">
        <p><strong>Client:</strong> {invoice.client}</p>
        <p><strong>Amount:</strong> {invoice.amount}</p>
        <p><strong>Date:</strong> {invoice.date}</p>
      </div>
      <div className="details-actions">
        <button onClick={handleBack}>Back</button>
        <button onClick={handleEdit}>Edit</button>
      </div>
    </div>
  );
};

export default InvoiceDetails;
