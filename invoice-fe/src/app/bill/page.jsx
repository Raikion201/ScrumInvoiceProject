'use client'
import React, { useState, useEffect } from 'react';
import { FileText, Download, Printer, Mail, Calendar, DollarSign, User, Building, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { billAPI } from '../services/apiService';
import axios from 'axios';
const ViewBillComponent = () => {
  const [selectedBill, setSelectedBill] = useState(null);
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bills from the backend API
  useEffect(() => {
    const fetchBills = async () => {
      try {
        setLoading(true);
        
        // Using the API client from your services
        const response = await billAPI.getAll();
        console.log('Bills fetched successfully:', response);
        
        // Transform the backend data to match the expected format
        const transformedBills = response.map(bill => ({
          id: bill.billNumber || `BILL-${bill.id}`,
          supplierName: bill.purchaseRequest ? bill.purchaseRequest.customerName : 'Unknown Supplier',
          supplierAddress: bill.purchaseRequest ? bill.purchaseRequest.customerEmail : 'No address provided',
          amount: bill.amount,
          currency: 'VND',
          issueDate: bill.issueDate ? new Date(bill.issueDate).toLocaleDateString() : new Date().toLocaleDateString(),
          dueDate: bill.dueDate ? new Date(bill.dueDate).toLocaleDateString() : new Date().toLocaleDateString(),
          status: bill.status === 'PAID' ? 'paid' : 
                  (new Date(bill.dueDate) < new Date() ? 'overdue' : 'pending'),
          description: bill.purchaseRequest ? bill.purchaseRequest.description : 'No description provided',
          purchaseRequest: `PR-${bill.purchaseRequest ? bill.purchaseRequest.id : bill.id}`,
          depositPaid: bill.purchaseRequest && bill.purchaseRequest.depositAmount ? bill.purchaseRequest.depositAmount : 0,
          backendId: bill.id
        }));
        
        setBills(transformedBills);
        setError(null);
      } catch (err) {
        console.error('Error fetching bills:', err);
        setError('Failed to load bills. Please try again later.');
        setBills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  // Function to mark bill as paid
  const markAsPaid = async (billId) => {
    try {
      await billAPI.markAsPaid(billId);
      
      // Update local state
      setBills(bills.map(bill => 
        bill.backendId === billId ? { ...bill, status: 'paid' } : bill
      ));
      
      if (selectedBill && selectedBill.backendId === billId) {
        setSelectedBill({...selectedBill, status: 'paid'});
      }
      
    } catch (err) {
      console.error('Error updating bill:', err);
      alert('Failed to update bill. Please try again.');
    }
  };

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
          {/* Bill List */}
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
            ) : bills.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '1rem 0', color: '#6B7280' }}>
                No bills found. Bills will appear here once they are created.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {bills.map(bill => (
                  <div
                    key={bill.backendId}
                    onClick={() => setSelectedBill(bill)}
                    style={{ 
                      padding: '1rem', 
                      borderRadius: '0.75rem', 
                      cursor: 'pointer', 
                      transition: 'all 0.2s',
                      backgroundColor: selectedBill && selectedBill.backendId === bill.backendId ? '#EFF6FF' : '#F9FAFB',
                      border: selectedBill && selectedBill.backendId === bill.backendId ? '2px solid #BFDBFE' : '1px solid #E5E7EB',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <h3 style={{ fontWeight: '500', color: '#111827' }}>{bill.id}</h3>
                        <p style={{ fontSize: '0.875rem', color: '#4B5563' }}>{bill.supplierName}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        <span style={{ fontWeight: '600' }}>{formatCurrency(bill.amount)}</span>
                        <div style={{ 
                          fontSize: '0.75rem', 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: '0.25rem', 
                          padding: '0.25rem 0.5rem', 
                          borderRadius: '9999px',
                          ...getStatusStyle(bill.status)
                        }}>
                          {getStatusIcon(bill.status)}
                          <span>{getStatusText(bill.status)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Bill Detail */}
          <div>
            {selectedBill ? (
              <div style={{ 
                backgroundColor: 'white', 
                borderRadius: '1rem', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
                border: '1px solid #F3F4F6' 
              }}>
                {/* Bill Header */}
                <div style={{ padding: '1.5rem', borderBottom: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1F2937' }}>{selectedBill.id}</h2>
                      <div style={{ display: 'flex', alignItems: 'center', marginTop: '0.25rem', fontSize: '0.875rem', color: '#4B5563' }}>
                        <Calendar style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
                        <span>Issued: {selectedBill.issueDate}</span>
                      </div>
                    </div>
                    <div style={{ 
                      padding: '0.5rem 0.75rem', 
                      borderRadius: '0.5rem', 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '0.25rem',
                      ...getStatusStyle(selectedBill.status)
                    }}>
                      {getStatusIcon(selectedBill.status)}
                      <span style={{ fontWeight: '500' }}>{getStatusText(selectedBill.status)}</span>
                    </div>
                  </div>
                </div>
                
                {/* Bill Actions */}
                <div style={{ 
                  padding: '1rem', 
                  backgroundColor: '#F9FAFB', 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '0.5rem',
                  justifyContent: 'flex-end' 
                }}>
                  {selectedBill.status !== 'paid' && (
                    <button 
                      onClick={() => markAsPaid(selectedBill.backendId)}
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
                
                {/* Bill Details */}
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
                      <p style={{ fontWeight: '600', color: '#1F2937' }}>{selectedBill.supplierName}</p>
                      <p style={{ color: '#4B5563', fontSize: '0.875rem', marginTop: '0.25rem' }}>{selectedBill.supplierAddress}</p>
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
                        <span style={{ fontWeight: '500' }}>{selectedBill.issueDate}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' }}>
                        <span style={{ color: '#4B5563' }}>Due Date:</span>
                        <span style={{ fontWeight: '500' }}>{selectedBill.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Bill Description */}
                  <div>
                    <h3 style={{ color: '#4B5563', fontWeight: '500', marginBottom: '0.5rem' }}>Description</h3>
                    <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.5rem' }}>
                      <p style={{ color: '#1F2937' }}>{selectedBill.description}</p>
                    </div>
                  </div>
                  
                  {/* Purchase Request */}
                  <div>
                    <h3 style={{ color: '#4B5563', fontWeight: '500', marginBottom: '0.5rem' }}>Purchase Request</h3>
                    <div style={{ backgroundColor: '#F9FAFB', padding: '1rem', borderRadius: '0.5rem' }}>
                      <p style={{ color: '#1F2937' }}>{selectedBill.purchaseRequest}</p>
                    </div>
                  </div>
                </div>
                
                {/* Bill Total */}
                <div style={{ padding: '1.5rem', borderTop: '1px solid #E5E7EB' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.125rem', color: '#4B5563' }}>Total Amount:</span>
                    <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{formatCurrency(selectedBill.amount)}</span>
                  </div>
                  
                  {selectedBill.depositPaid > 0 && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                        <span style={{ color: '#4B5563' }}>Deposit Paid:</span>
                        <span style={{ fontWeight: '500', color: '#059669' }}>{formatCurrency(selectedBill.depositPaid)}</span>
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
                        <span style={{ fontWeight: 'bold', color: '#DC2626' }}>{formatCurrency(selectedBill.amount - selectedBill.depositPaid)}</span>
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

