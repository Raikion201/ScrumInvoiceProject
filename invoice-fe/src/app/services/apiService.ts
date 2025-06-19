import api from '../ultils/axiosConfig';

// Types
export interface PurchaseRequest {
    id?: number
    customerName: string
    customerEmail: string
    description: string
    totalAmount: number
    depositAmount: number
    dueDate: string
    status: 'PENDING' | 'DELIVERED' | 'CONVERTED_TO_INVOICE'
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

// Purchase Request API calls
export const purchaseRequestAPI = {
    // Create new purchase request
    create: async (data: PurchaseRequest): Promise<PurchaseRequest> => {
        const response = await api.post('/purchase-requests', data)
        return response.data
    },

    // Get all purchase requests
    getAll: async (): Promise<PurchaseRequest[]> => {
        const response = await api.get('/purchase-requests')
        return response.data
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