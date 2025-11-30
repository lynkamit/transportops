import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NumericFormat } from 'react-number-format';
import { LuCirclePlus, LuTrash2} from "react-icons/lu";

const InvoiceForm = ({ setInvoices, invoices = [] }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const initialState = useMemo(() => ({
    carrierName: "",
    carrierLoadNumber: "",
    clientCarrier: "",
    clientCarrierInvoiceNumber: "",
    invoiceDate: new Date().toISOString().split('T')[0],
    driverName: "Lucky3",
    pickupDate: "",
    pickupAddress: "",
    deliveryDate: "",
    deliveryAddress: "",
    specialNotes: "",
    agentName: "",
    agentEmail: "",
    phoneNumber: "",
    ext: "",
    faxNumber: "",
    billingRows: [{ description: "", amount: "" }]
  }), []);

   const [formState, setFormState] = useState(initialState);

  useEffect(() => {
      if (id !== undefined && invoices[id]) {
        setFormState({
          ...initialState,
          ...invoices[id],
          invoiceDate: invoices[id].invoiceDate || initialState.invoiceDate,
          driverName: invoices[id].driverName || "Lucky",
          billingRows: invoices[id].billingRows || [{ description: "", amount: "" }]
        });
      }
    }, [id, invoices, initialState]);

  const handleChange = (field, value) => {
    setFormState(prev => ({ ...prev, [field]: value }));
  };

  const handleBillingChange = (index, field, value) => {
    const updatedRows = [...formState.billingRows];
    updatedRows[index][field] = value;
    setFormState(prev => ({ ...prev, billingRows: updatedRows }));
  };

  const addBillingRow = () => {
    setFormState(prev => ({
      ...prev,
      billingRows: [...prev.billingRows, { description: "", amount: "" }]
    }));
  };

  const removeBillingRow = (index) => {
    setFormState(prev => ({
      ...prev,
      billingRows: prev.billingRows.filter((_, idx) => idx !== index)
    }));
  };

  // Add these helper functions inside your component

  const API_URL = "http://localhost:5000/api/invoices"; // Change to your backend URL

  const postInvoice = async (invoice) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice)
    });
    return res.json();
  };

  const updateInvoice = async (id, invoice) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(invoice)
    });
    return res.json();
  };

  // Update handleSubmit to use API calls
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id !== undefined && invoices[id]) {
      await updateInvoice(id, formState);
    } else {
      await postInvoice(formState);
    }
    navigate("/invoices");
  };


  const handleReset = () => {
    setFormState(initialState);
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="form-container">
      <h2>{id !== undefined ? "Update Invoice" : "Create Invoice"}</h2>
      <form onSubmit={handleSubmit} className="two-column-form">
        {/* Left Column */}
        <div className="form-column">
          <div className="form-box">
            <h3>Carrier & Invoice Details</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Carrier Name</label>
                <select value={formState.carrierName} onChange={e => handleChange("carrierName", e.target.value)}>
                  <option value="">Select Carrier</option>
                  <option value="LCM">LCM</option>
                  <option value="PBX">PBX</option>
                </select>
              </div>
              <div className="form-group"><label>Carrier Load Number</label><input value={formState.carrierLoadNumber} onChange={e => handleChange("carrierLoadNumber", e.target.value)} /></div>
              <div className="form-group"><label>Client Carrier</label><input value={formState.clientCarrier} onChange={e => handleChange("clientCarrier", e.target.value)} /></div>
              <div className="form-group"><label>Client Carrier Invoice Number</label><input value={formState.clientCarrierInvoiceNumber} onChange={e => handleChange("clientCarrierInvoiceNumber", e.target.value)} /></div>
              <div className="form-group"><label>Invoice Date</label><input type="date" value={formState.invoiceDate} onChange={e => handleChange("invoiceDate", e.target.value)} /></div>
              <div className="form-group"><label>Driver Name</label><input value={formState.driverName} onChange={e => handleChange("driverName", e.target.value)} /></div>
            </div>
          </div>

          <div className="form-box">
            <h3>Pickup & Delivery Details</h3>
            <div className="form-grid">
              <div className="form-group"><label>Pickup Date</label><input type="date" value={formState.pickupDate} onChange={e => handleChange("pickupDate", e.target.value)} /></div>
              <div className="form-group"><label>Pickup Address</label><input value={formState.pickupAddress} onChange={e => handleChange("pickupAddress", e.target.value)} /></div>
              <div className="form-group"><label>Delivery Date</label><input type="date" value={formState.deliveryDate} onChange={e => handleChange("deliveryDate", e.target.value)} /></div>
              <div className="form-group"><label>Delivery Address</label><input value={formState.deliveryAddress} onChange={e => handleChange("deliveryAddress", e.target.value)} /></div>
            </div>
            <div className="form-group full-width"><label>Special Notes</label><textarea value={formState.specialNotes} onChange={e => handleChange("specialNotes", e.target.value)} /></div>
          </div>
        </div>

        {/* Right Column */}
        <div className="form-column">
          <div className="form-box">
            <h3>Agent Details</h3>
            <div className="form-grid">
              <div className="form-group"><label>Agent Name</label><input value={formState.agentName} onChange={e => handleChange("agentName", e.target.value)} /></div>
              <div className="form-group"><label>Agent Email</label><input type="email" value={formState.agentEmail} onChange={e => handleChange("agentEmail", e.target.value)} /></div>
              <div className="form-group"><label>Phone Number</label><input value={formState.phoneNumber} onChange={e => handleChange("phoneNumber", e.target.value)} /></div>
              <div className="form-group"><label>Ext</label><input value={formState.ext} onChange={e => handleChange("ext", e.target.value)} /></div>
              <div className="form-group"><label>Fax Number</label><input value={formState.faxNumber} onChange={e => handleChange("faxNumber", e.target.value)} /></div>
            </div>
          </div>

          <div className="form-box">
            <h3>Billing Details</h3>
            <div className="form-grid">
              {formState.billingRows.map((row, idx) => (
                <div className="billing-row" key={idx}>
                  <div className="form-group">
                    <input
                      placeholder="Description"
                      value={row.description}
                      onChange={e => handleBillingChange(idx, "description", e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <NumericFormat
                      placeholder="Amount"
                      value={row.amount}
                      onValueChange={values => handleBillingChange(idx, "amount", values.value)}
                      thousandSeparator
                      allowNegative={false}
                      decimalScale={2}
                      fixedDecimalScale={false}
                      className="form-control"
                      isAllowed={({ floatValue }) => floatValue === undefined || (floatValue >= 0 && floatValue < 100000)}
                    />
                  </div>
                  {idx > 0 && (
                    <button
                      type="button"
                      className="remove-row-btn"
                      onClick={() => removeBillingRow(idx)}
                      aria-label="Remove row"
                    >
                      <LuTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addBillingRow} className="add-row-btn">
              <LuCirclePlus style={{ marginRight: "8px", fontSize: "1.2em" }} />
             </button>
          </div>
        </div>
      </form>
      <div className="form-actions">
        <button type="button" onClick={handleReset}>Reset</button>
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit" onClick={handleSubmit}>
          {id !== undefined ? "Update Invoice" : "Save Invoice"}
        </button>

      </div>
    </div>
  );
};

export default InvoiceForm;
