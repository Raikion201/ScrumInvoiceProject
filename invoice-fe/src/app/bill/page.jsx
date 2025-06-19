'use client'
import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, Mail, Calendar, DollarSign, User, Building, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import api from '../ultils/axiosConfig';

const ViewBillComponent = () => {
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch invoices from the backend API
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const response = await api.get('/api/invoices');
        
        // Transform the backend data to match the expected format
        const transformedInvoices = response.data.map(invoice => ({
          id: invoice.invoiceNumber,
          supplierName: invoice.customerName,
          supplierAddress: invoice.customerEmail || 'No address provided',
          amount: invoice.amount,
          currency: 'VND',
          issueDate: invoice.invoiceDate,
          dueDate: invoice.dueDate || invoice.invoiceDate,
          status: invoice.paid ? 'paid' : (new Date(invoice.dueDate) < new Date() ? 'overdue' : 'pending'),
          description: invoice.description || 'No description provided',
          items: [], // Backend doesn't provide line items yet
          purchaseRequest: `PR-${new Date().getFullYear()}-${invoice.id}`,
          depositPaid: 0, // Backend doesn't provide deposit information yet
          backendId: invoice.id // Keep track of the original ID for API operations
        }));
        
        setInvoices(transformedInvoices);
        setError(null);
      } catch (err) {
        console.error('Error fetching invoices:', err);
        setError('Failed to load invoices. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' ₫';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'text-green-600 bg-green-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'overdue': return <AlertCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid': return 'Paid';
      case 'pending': return 'Pending';
      case 'overdue': return 'Overdue';
      default: return 'Unknown';
    }
  };

  // Function to mark invoice as paid
  const markAsPaid = async (invoiceId) => {
    try {
      const invoice = invoices.find(inv => inv.backendId === invoiceId);
      if (!invoice) return;

      const updatedInvoice = { ...invoice, paid: true };
      await api.put(`/api/invoices/${invoiceId}`, updatedInvoice);

      // Update local state
      setInvoices(invoices.map(inv => 
        inv.backendId === invoiceId ? { ...inv, status: 'paid' } : inv
      ));
      
      if (selectedInvoice && selectedInvoice.backendId === invoiceId) {
        setSelectedInvoice({...selectedInvoice, status: 'paid'});
      }
      
    } catch (err) {
      console.error('Error updating invoice:', err);
      alert('Failed to update invoice. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Invoice Management System</h1>
                <p className="text-gray-600 mt-1">Manage and track invoices from suppliers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Invoice List - takes 1/3 width on large screens */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Invoice List</h2>
              
              {loading ? (
                <div className="text-center py-4">Loading invoices...</div>
              ) : error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
              ) : (
                <div className="space-y-3">
                  {invoices.map(invoice => (
                    <div
                      key={invoice.backendId}
                      onClick={() => setSelectedInvoice(invoice)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        selectedInvoice && selectedInvoice.backendId === invoice.backendId
                          ? 'bg-blue-50 border-blue-200 border-2'
                          : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-medium text-gray-900">{invoice.id}</h3>
                          <p className="text-sm text-gray-600">{invoice.supplierName}</p>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="font-semibold">{formatCurrency(invoice.amount)}</span>
                          <div className={`text-xs flex items-center gap-1 px-2 py-1 rounded-full ${getStatusColor(invoice.status)}`}>
                            {getStatusIcon(invoice.status)}
                            <span>{getStatusText(invoice.status)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Invoice Detail - takes 2/3 width on large screens */}
          <div className="lg:col-span-2">
            {selectedInvoice ? (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
                {/* Invoice Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{selectedInvoice.id}</h2>
                      <div className="flex items-center mt-1 text-sm text-gray-600">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>Issued: {selectedInvoice.issueDate}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-2 rounded-lg flex items-center gap-1 ${getStatusColor(selectedInvoice.status)}`}>
                      {getStatusIcon(selectedInvoice.status)}
                      <span className="font-medium">{getStatusText(selectedInvoice.status)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Actions */}
                <div className="p-4 bg-gray-50 flex flex-wrap gap-2 justify-end">
                  {selectedInvoice.status !== 'paid' && (
                    <button 
                      onClick={() => markAsPaid(selectedInvoice.backendId)}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Mark as Paid
                    </button>
                  )}
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </button>
                </div>
                
                {/* Invoice Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-gray-600 font-medium mb-2 flex items-center">
                      <Building className="w-4 h-4 mr-1" /> Supplier Details
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-semibold text-gray-800">{selectedInvoice.supplierName}</p>
                      <p className="text-gray-600 text-sm mt-1">{selectedInvoice.supplierAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-gray-600 font-medium mb-2 flex items-center">
                      <Calendar className="w-4 h-4 mr-1" /> Important Dates
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Issue Date:</span>
                        <span className="font-medium">{selectedInvoice.issueDate}</span>
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-gray-600">Due Date:</span>
                        <span className="font-medium">{selectedInvoice.dueDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Description */}
                <div className="px-6 py-4">
                  <h3 className="text-gray-600 font-medium mb-2">Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{selectedInvoice.description}</p>
                  </div>
                </div>
                
                {/* Invoice Items */}
                <div className="px-6 py-4">
                  <h3 className="text-gray-600 font-medium mb-2">Purchase Request</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-800">{selectedInvoice.purchaseRequest}</p>
                  </div>
                </div>
                
                {/* Invoice Total */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg text-gray-600">Total Amount:</span>
                    <span className="text-xl font-bold text-gray-900">{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
                  
                  {selectedInvoice.depositPaid > 0 && (
                    <>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-gray-600">Deposit Paid:</span>
                        <span className="font-medium text-green-600">{formatCurrency(selectedInvoice.depositPaid)}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-600">Balance Due:</span>
                        <span className="font-bold text-red-600">{formatCurrency(selectedInvoice.amount - selectedInvoice.depositPaid)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 flex flex-col items-center justify-center">
                <FileText className="w-16 h-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-600 mb-2">No Invoice Selected</h3>
                <p className="text-gray-500 text-center">Select an invoice from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBillComponent;
