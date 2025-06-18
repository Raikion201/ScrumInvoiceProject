'use client'
import React from 'react';
import { Toaster } from 'sonner';
import Dashboard from '../component/Dashboard';

const PurchaseRequestsPage = () => {
    return (
        <>
            <Toaster position="top-right" richColors />
            <Dashboard />
        </>
    );
};

export default PurchaseRequestsPage; 