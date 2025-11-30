import React from "react";
import { useNavigate } from "react-router-dom";
import { LuFileSearch,LuTrash2, LuUpload, LuNotebookPen, LuMail, LuCirclePlus} from "react-icons/lu";
import { Tooltip } from "react-tooltip";

const InvoiceList = ({ invoices = [] }) => {
  const navigate = useNavigate();

  const dummyInvoices = [
    { id: 1, client: "Wayne Enterprises", amount: "$5000", date: "2025-11-20" },
    { id: 2, client: "Stark Industries", amount: "$12000", date: "2025-11-22" },
    { id: 3, client: "Oscorp", amount: "$8000", date: "2025-11-25" },
  ];

  const allInvoices = [
    ...dummyInvoices,
    ...invoices.map((inv, idx) => ({ id: dummyInvoices.length + idx + 1, ...inv })),
  ];

  return (
    <div className="list-container">
      <h2>Invoices</h2>
      <div className="list-actions">
        <button
          onClick={() => navigate("/invoices/new")}
          className="create-btn"
          data-tooltip-id="invoice-action-tooltip"
          data-tooltip-content="Create Invoice"
        >
          <LuCirclePlus style={{ marginRight: "8px", fontSize: "1.2em" }} />
        </button>
      </div>
      {allInvoices.length > 0 ? (
        <>
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allInvoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.client}</td>
                  <td>{invoice.amount}</td>
                  <td>{invoice.date}</td>
                  <td>
                    <button
                      className="icon-only-btn"
                      aria-label="View Invoice"
                      data-tooltip-id="invoice-action-tooltip"
                      data-tooltip-content="View Invoice"
                      onClick={() => navigate(`/invoices/${invoice.id}`)}
                    >
                      <LuFileSearch />
                    </button>
                    <button
                      className="icon-only-btn"
                      aria-label="Upload Invoice"
                      data-tooltip-id="invoice-action-tooltip"
                      data-tooltip-content="Upload Invoice"
                      onClick={() => {/* handle upload */}}
                    >
                      <LuUpload />
                    </button>
                    <button
                      className="icon-only-btn"
                      aria-label="Edit Invoice"
                      data-tooltip-id="invoice-action-tooltip"
                      data-tooltip-content="Edit Invoice"
                      onClick={() => navigate(`/invoices/${invoice.id}/edit`)}
                    >
                      <LuNotebookPen />
                    </button>
                    <button
                      className="icon-only-btn"
                      aria-label="Email Invoice"
                      data-tooltip-id="invoice-action-tooltip"
                      data-tooltip-content="Email Invoice"
                      onClick={() => {/* handle email */}}
                    >
                      <LuMail />
                    </button>
                    <button
                      className="icon-only-btn"
                      aria-label="Delete Invoice"
                      data-tooltip-id="invoice-action-tooltip"
                      data-tooltip-content="Delete Invoice"
                      onClick={() => {/* handle delete */}}
                    >
                      <LuTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Tooltip id="invoice-action-tooltip" delayShow={0} />
        </>
      ) : (
        <p>No invoices yet.</p>
      )}
    </div>
  );
};

export default InvoiceList;
