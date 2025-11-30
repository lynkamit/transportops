import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientForm = ({ setClients }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [joined, setJoined] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newClient = {
      name,
      email,
      phone,
      joined,
    };

    // Update clients state in App.js
    setClients((prev) => [...prev, newClient]);

    // Navigate back to clients list
    navigate("/clients");
  };

  return (
    <div className="form-container">
      <h2>Add Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Client Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date Joined</label>
          <input
            type="date"
            value={joined}
            onChange={(e) => setJoined(e.target.value)}
          />
        </div>

        <button type="submit">Save Client</button>
      </form>
    </div>
  );
};

export default ClientForm;
