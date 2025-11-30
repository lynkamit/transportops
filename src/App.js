import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import InvoiceForm from "./components/InvoiceForm";
import InvoiceList from "./components/InvoiceList";
import ClientForm from "./components/ClientForm";
import ClientList from "./components/ClientList";
import InvoiceDetails from "./components/InvoiceDetails";
import NavBar from "./components/NavBar";
import "./App.css";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("authToken"));
  const [invoices, setInvoices] = useState([]);
  const [clients, setClients] = useState([]);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <NavBar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/home" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><HomePage /></PrivateRoute>
        } />
        <Route path="/invoices/new" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><InvoiceForm setInvoices={setInvoices} /></PrivateRoute>
        } />
        <Route path="/invoices" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><InvoiceList invoices={invoices} /></PrivateRoute>
        } />
        <Route path="/invoices/:id" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><InvoiceDetails invoices={invoices} /></PrivateRoute>
        } />
        <Route path="/invoices/:id/edit" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><InvoiceForm setInvoices={setInvoices} invoices={invoices} /></PrivateRoute>
        } />
        <Route path="/clients/new" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><ClientForm setClients={setClients} /></PrivateRoute>
        } />
        <Route path="/clients" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><ClientList clients={clients} /></PrivateRoute>
        } />
        <Route path="/clients/:id" element={
          <PrivateRoute isAuthenticated={isAuthenticated}><div>Client Details Page (coming soon)</div></PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
