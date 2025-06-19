import api from '../ultils/axiosConfig'

// Types
export interface PurchaseRequest {
    id?: number
    customerName: string
    customerEmail: string
    description: string
    totalAmount: number
    depositAmount: number
    dueDate: string
    status: 'PENDING' | 'SHIPPED' | 'PAID'
    isPaid: boolean
    invoiceDate: string
    invoiceNumber: string
}

export interface Invoice {
    id?: number
    invoiceNumber: string
    customerName: string
    customerEmail: string
    amount: number
    invoiceDate: string
    dueDate: string
    description: string
    paid: boolean
    purchaseRequest?: PurchaseRequest
}

// Define the dashboard statistics interface
export interface DashboardStatistics {
  countByStatus: {
    PENDING?: number;
    DELIVERED?: number;
    CONVERTED_TO_INVOICE?: number;
  };
  totalAmount: number;
  paidAmount: number;
  overdueCount: number;
  recentRequestsCount: number;
  latestRequests: PurchaseRequest[];
}

// Purchase Request API calls
export const purchaseRequestAPI = {
    // Create new purchase request
    create: async (data: PurchaseRequest): Promise<PurchaseRequest> => {
        const response = await api.post('/purchase-requests', data)
        return response.data
    },

    // Get all purchase requests (only PENDING ones for the main tab)
    getAll: async (): Promise<PurchaseRequest[]> => {
        const response = await api.get('/purchase-requests', {
            params: {
                status: 'PENDING'  // Only fetch PENDING requests for the main Purchase Requests tab
            }
        });
        return response.data;
    },

    // Get purchase request by ID
    getById: async (id: number): Promise<PurchaseRequest> => {
        const response = await api.get(`/purchase-requests/${id}`)
        return response.data
    },

    // Update purchase request
    update: async (id: number, data: PurchaseRequest): Promise<PurchaseRequest> => {
        const response = await api.put(`/purchase-requests/${id}`, data)
        return response.data
    },

    // Delete purchase request
    delete: async (id: number): Promise<void> => {
        await api.delete(`/purchase-requests/${id}`)
    },

    // Mark as delivered
    markAsDelivered: async (id: number): Promise<PurchaseRequest> => {
        const response = await api.put(`/purchase-requests/${id}`, {
            status: 'DELIVERED'
        })
        return response.data
    },

    // Convert to invoice
    convertToInvoice: async (id: number): Promise<Invoice> => {
        const response = await api.put(`/purchase-requests/${id}/convert-to-invoice`)
        return response.data
    },

    // Mark as shipped (moves to Bills)
    markAsShipped: async (id: number): Promise<PurchaseRequest> => {
        const response = await api.put(`/purchase-requests/${id}/mark-shipped`)
        return response.data
    },

    // Mark as paid (moves to Invoices)
    markAsPaid: async (id: number): Promise<PurchaseRequest> => {
        const response = await api.put(`/purchase-requests/${id}/mark-paid`)
        return response.data
    },

    // Get all bills (SHIPPED status)
    getBills: async (): Promise<PurchaseRequest[]> => {
        const response = await api.get('/purchase-requests/bills')
        return response.data
    },

    // Get all paid requests (PAID status)
    getPaid: async (): Promise<PurchaseRequest[]> => {
        const response = await api.get('/purchase-requests/paid')
        return response.data
    },

    // Get dashboard statistics
    getDashboardStatistics: async (): Promise<DashboardStatistics> => {
        console.log('Fetching dashboard statistics...')
        const response = await api.get('/purchase-requests/dashboard')
        console.log('Dashboard statistics received:', response.data)
        return response.data
    }
}

// Invoice API calls
export const invoiceAPI = {
    // Get all invoices
    getAll: async (): Promise<Invoice[]> => {
        const response = await api.get('/invoices')
        return response.data
    },

    // Get invoice by ID
    getById: async (id: number): Promise<Invoice> => {
        const response = await api.get(`/invoices/${id}`)
        return response.data
    },

    // Update invoice
    update: async (id: number, data: Partial<Invoice>): Promise<Invoice> => {
        const response = await api.put(`/invoices/${id}`, data)
        return response.data
    },

    // Mark invoice as paid
    markAsPaid: async (id: number): Promise<Invoice> => {
        const response = await api.put(`/invoices/${id}`, {
            paid: true
        })
        return response.data
    }
}

// Fetch dashboard statistics
export const fetchDashboardStatistics = async (): Promise<DashboardStatistics> => {
  try {
    console.log('Fetching dashboard statistics');
    const response = await fetch(`http://localhost:8080/purchase-requests/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        // Add auth headers if needed
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard statistics: ${response.status}`);
    }

    const data = await response.json();
    console.log('Dashboard statistics fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    throw error;
  }
};