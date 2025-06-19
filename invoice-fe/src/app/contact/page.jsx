"use client";
import React, { useState } from 'react';
import api from '../ultils/axiosConfig';

export default function ContactPage() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    enquiry: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);
    try {
      await api.post('/api/contact', form);
      setSuccess('Your message has been sent successfully!');
      setForm({
        firstName: '',
        lastName: '',
        email: '',
        company: '',
        enquiry: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again or check CORS/backend.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom, #f9fafb, #f3f4f6)'
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '3rem 1rem',
      }}>
        <h1 style={{
          fontSize: '2.25rem',
          fontWeight: '800',
          textAlign: 'center',
          marginBottom: '3rem',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          backgroundImage: 'linear-gradient(to right, #2563eb, #7c3aed)',
          filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.05))'
        }}>
          Contact Us
        </h1>

        {/* Error message */}
        {error && (
          <div style={{
            backgroundColor: '#fee2e2',
            borderLeftWidth: '4px',
            borderLeftColor: '#ef4444',
            color: '#b91c1c',
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
          }}>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
              </svg>
              {error}
            </p>
          </div>
        )}
        {/* Success message */}
        {success && (
          <div style={{
            backgroundColor: '#d1fae5',
            borderLeftWidth: '4px',
            borderLeftColor: '#10b981',
            color: '#065f46',
            padding: '1rem',
            marginBottom: '1.5rem',
            borderRadius: '0.375rem',
            boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)'
          }}>
            <p style={{ display: 'flex', alignItems: 'center' }}>
              <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem', flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7V7a1 1 0 112 0v4a1 1 0 01-2 0zm1 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path>
              </svg>
              {success}
            </p>
          </div>
        )}

        <div style={{
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '0.75rem',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
          border: '1px solid rgba(229,231,235,0.5)'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            marginBottom: '1.5rem',
            color: '#1f2937',
            borderBottom: '1px solid #e5e7eb',
            paddingBottom: '0.5rem'
          }}>
            Send us a message
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.25rem', display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }} htmlFor="firstName">
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s',
                    outline: 'none',
                  }}
                  placeholder="First name"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }} htmlFor="lastName">
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem 1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    transition: 'all 0.2s',
                    outline: 'none',
                  }}
                  placeholder="Last name"
                  required
                />
              </div>
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }} htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                placeholder="you@example.com"
                required
              />
            </div>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }} htmlFor="company">
                Company
              </label>
              <input
                id="company"
                type="text"
                name="company"
                value={form.company}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                placeholder="Your company"
              />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#4b5563', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }} htmlFor="enquiry">
                Message
              </label>
              <textarea
                id="enquiry"
                name="enquiry"
                value={form.enquiry}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '0.5rem 1rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  minHeight: '8rem',
                  resize: 'vertical',
                  transition: 'all 0.2s',
                  outline: 'none',
                }}
                placeholder="Write your message here..."
                required
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontWeight: '500',
                  outline: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s',
                  backgroundColor: loading ? '#a5b4fc' : '#2563eb',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
                onMouseOver={e => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#1d4ed8';
                }}
                onMouseOut={e => {
                  if (!loading) e.currentTarget.style.backgroundColor = '#2563eb';
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
