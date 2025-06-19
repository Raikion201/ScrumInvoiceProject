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

  const getStatusStyle = (status) => {
    switch (status) {
      case 'paid': return { color: '#059669', backgroundColor: '#ECFDF5' };
      case 'pending': return { color: '#D97706', backgroundColor: '#FEF3C7' };
      case 'overdue': return { color: '#DC2626', backgroundColor: '#FEE2E2' };
      default: return { color: '#4B5563', backgroundColor: '#F3F4F6' };
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
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom right, #EFF6FF, #FFFFFF, #F5F3FF)' 
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '2rem 1rem' 
      }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem', 
            border: '1px solid #F3F4F6' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
              <div style={{ 
                padding: '0.75rem', 
                background: 'linear-gradient(to right, #2563EB, #9333EA)', 
                borderRadius: '0.75rem' 
              }}>
                <FileText style={{ width: '2rem', height: '2rem', color: 'white' }} />
              </div>
              <div>
                <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#1F2937' }}>Invoice Management System</h1>
                <p style={{ color: '#4B5563', marginTop: '0.25rem' }}>Manage and track invoices from suppliers</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          {/* Invoice List */}
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '1rem', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
            padding: '1.5rem', 
            border: '1px solid #F3F4F6' 
          }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1F2937' }}>Invoice List</h2>
            
            {loading ? (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>Loading invoices...</div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '1rem 0', color: '#EF4444' }}>{error}</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {invoices.map(invoice => (
                  <div
                    key={invoice.backendId}
                    onClick={() => setSelectedInvoice(invoice)}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '0.75rem', 
                      cursor: 'pointer', 
                      transition: 'all 0.2s',
                      backgroundColor: selectedInvoice && selectedInvoice.backendId === invoice.backendId ? '#EFF6FF' : '#F9FAFB',
                      border: selectedInvoice && selectedInvoice.backendId === invoice.backendId ? '2px solid #BFDBFE' : '1px solid #E5E7EB',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ fontWeight: '500', color: '#111827' }}>{invoice.id}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#4B5563' }}>{invoice.supplierName}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontWeight: '600' }}>{formatCurrency(invoice.amount)}</span>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.25rem', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '9999px',
                          ...getStatusStyle(invoice.status)
                        }}>
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
          
          {/* Invoice Detail */}
          <div>
            {selectedInvoice ? (
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '1rem', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #F3F4F6' 
              }}>
                {/* Invoice Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>{selectedInvoice.id}</h2>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem', fontSize: '0.875rem', color: '#4B5563' }}>
                        <Calendar style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        <span>Issued: {selectedInvoice.issueDate}</span>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '0.5rem 0.75rem', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      ...getStatusStyle(selectedInvoice.status)
                    }}>
                      {getStatusIcon(selectedInvoice.status)}
                      <span style={{ fontWeight: '500' }}>{getStatusText(selectedInvoice.status)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Actions */}
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: '#F9FAFB', 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem',
                  justifyContent: 'flex-end' 
                }}>
                  {selectedInvoice.status !== 'paid' && (
                    <button 
                      onClick={() => markAsPaid(selectedInvoice.backendId)}
                      style={{ 
                        backgroundColor: '#059669', 
                        color: 'white', 
                        padding: '0.5rem 1rem', 
                        borderRadius: '0.5rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'background-color 0.2s'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#047857'}
                      onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#059669'}
                    >
                      <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                      Mark as Paid
                    </button>
                  )}
                  <button style={{ 
                    backgroundColor: '#E5E7EB', 
                    color: '#1F2937', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}>
                    <Download style={{ width: '1rem', height: '1rem' }} />
                    Download
                  </button>
                  <button style={{ 
                    backgroundColor: '#E5E7EB', 
                    color: '#1F2937', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}>
                    <Printer style={{ width: '1rem', height: '1rem' }} />
                    Print
                  </button>
                  <button style={{ 
                    backgroundColor: '#E5E7EB', 
                    color: '#1F2937', 
                    padding: '0.5rem 1rem', 
                    borderRadius: '0.5rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    border: 'none',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#D1D5DB'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#E5E7EB'}>
                    <Mail style={{ width: '1rem', height: '1rem' }} />
                    Email
                  </button>
                </div>
                
                {/* Invoice Details */}
                <div style={{ 
                  padding: '1.5rem', 
                  display: 'grid', 
                  gridTemplateColumns: '1fr', 
                  gap: '1.5rem' 
                }}>
                  <div>
                    <h3 style={{ 
                      color: '#4B5563', 
                      fontWeight: '500', 
                      marginBottom: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center' 
                    }}>
                      <Building style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} /> 
                      Supplier Details
                    </h3>
                    <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.5rem' }}>
                      <p style={{ fontWeight: '600', color: '#1F2937' }}>{selectedInvoice.supplierName}</p>
                      <p style={{ color: '#4B5563', fontSize: '0.875rem', marginTop: '0.25rem' }}>{selectedInvoice.supplierAddress}</p>
                    </div>
                  </div>
                  <div>
                    <h3 style={{ 
                      color: '#4B5563', 
                      fontWeight: '500', 
                      marginBottom: '0.5rem',
                      display: 'flex', 
                      alignItems: 'center' 
                    }}>
                      <Calendar style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} /> 
                      Important Dates
                    </h3>
                    <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.5rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#4B5563' }}>Issue Date:</span>
                        <span style={{ fontWeight: '500' }}>{selectedInvoice.issueDate}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span style={{ color: '#4B5563' }}>Due Date:</span>
                        <span style={{ fontWeight: '500' }}>{selectedInvoice.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Invoice Description */}
                  <div>
                    <h3 style={{ color: '#4B5563', fontWeight: '500', marginBottom: '0.5rem' }}>Description</h3>
                    <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.5rem' }}>
                      <p style={{ color: '#1F2937' }}>{selectedInvoice.description}</p>
                    </div>
                  </div>
                  
                  {/* Invoice Items */}
                  <div>
                    <h3 style={{ color: '#4B5563', fontWeight: '500', marginBottom: '0.5rem' }}>Purchase Request</h3>
                    <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.5rem' }}>
                      <p style={{ color: '#1F2937' }}>{selectedInvoice.purchaseRequest}</p>
                    </div>
                  </div>
                </div>
                
                {/* Invoice Total */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.125rem', color: '#4B5563' }}>Total Amount:</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(selectedInvoice.amount)}</span>
                  </div>
                  
                  {selectedInvoice.depositPaid > 0 && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <span style={{ color: '#4B5563' }}>Deposit Paid:</span>
                        <span style={{ fontWeight: '500', color: '#059669' }}>{formatCurrency(selectedInvoice.depositPaid)}</span>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        marginTop: '0.5rem', 
                        paddingTop: '0.5rem', 
                        borderTop: '1px solid #E5E7EB' 
                      }}>
                        <span style={{ color: '#4B5563' }}>Balance Due:</span>
                        <span style={{ fontWeight: 'bold', color: '#DC2626' }}>{formatCurrency(selectedInvoice.amount - selectedInvoice.depositPaid)}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '1rem', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                padding: '3rem', 
                border: '1px solid #F3F4F6',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileText style={{ width: '4rem', height: '4rem', color: '#D1D5DB', marginBottom: '1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: '500', color: '#4B5563', marginBottom: '0.5rem' }}>No Invoice Selected</h3>
                <p style={{ color: '#6B7280', textAlign: 'center' }}>Select an invoice from the list to view its details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBillComponent;
