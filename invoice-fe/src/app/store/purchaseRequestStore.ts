import { create } from 'zustand'
import { purchaseRequestAPI, invoiceAPI, fetchDashboardStatistics, PurchaseRequest, Invoice, DashboardStatistics } from '../services/apiService'
import { toast } from 'sonner'

interface PurchaseRequestState {
    purchaseRequests: PurchaseRequest[]
    invoices: Invoice[]
    loading: boolean
    error: string | null
    dashboardStats: DashboardStatistics | null

    // Actions
    fetchPurchaseRequests: () => Promise<void>
    createPurchaseRequest: (data: PurchaseRequest) => Promise<void>
    updatePurchaseRequest: (id: number, data: PurchaseRequest) => Promise<void>
    deletePurchaseRequest: (id: number) => Promise<void>
    markAsDelivered: (id: number) => Promise<void>
    convertToInvoice: (id: number) => Promise<void>

    fetchInvoices: () => Promise<void>
    markInvoiceAsPaid: (id: number) => Promise<void>
    fetchDashboardStatistics: () => Promise<void>

    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
}

export const usePurchaseRequestStore = create<PurchaseRequestState>((set, get) => ({
    purchaseRequests: [],
    invoices: [],
    loading: false,
    error: null,
    dashboardStats: null,

    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),

    fetchPurchaseRequests: async () => {
        try {
            set({ loading: true, error: null })
            const data = await purchaseRequestAPI.getAll()
            console.log('Store: Updated purchase requests state with:', data)
            set({ purchaseRequests: Array.isArray(data) ? data : [] })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch purchase requests'
            set({ error: errorMessage })
            toast.error(errorMessage)
            // Always ensure we have a valid array even on error
            set(state => ({ purchaseRequests: Array.isArray(state.purchaseRequests) ? state.purchaseRequests : [] }))
        } finally {
            set({ loading: false })
        }
    },

    createPurchaseRequest: async (data: PurchaseRequest) => {
        try {
            set({ loading: true, error: null })
            const newRequest = await purchaseRequestAPI.create(data)
            console.log('Store: Added new purchase request to state:', newRequest)
            set((state) => ({
                purchaseRequests: [...state.purchaseRequests, newRequest]
            }))
            toast.success('Purchase request created successfully!')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to create purchase request'
            set({ error: errorMessage })
            toast.error(errorMessage)
        } finally {
            set({ loading: false })
        }
    },

    updatePurchaseRequest: async (id: number, data: PurchaseRequest) => {
        try {
            set({ loading: true, error: null })
            const updatedRequest = await purchaseRequestAPI.update(id, data)
            console.log('Store: Updated purchase request in state:', updatedRequest)
            set((state) => ({
                purchaseRequests: state.purchaseRequests.map(req =>
                    req.id === id ? updatedRequest : req
                )
            }))
            toast.success('Purchase request updated successfully!')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to update purchase request'
            set({ error: errorMessage })
            toast.error(errorMessage)
        } finally {
            set({ loading: false })
        }
    },

    deletePurchaseRequest: async (id: number) => {
        try {
            set({ loading: true, error: null })
            await purchaseRequestAPI.delete(id)
            set((state) => ({
                purchaseRequests: state.purchaseRequests.filter(req => req.id !== id)
            }))
            toast.success('Purchase request deleted successfully!')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to delete purchase request'
            set({ error: errorMessage })
            toast.error(errorMessage)
        } finally {
            set({ loading: false })
        }
    },

    markAsDelivered: async (id: number) => {
        try {
            set({ loading: true, error: null })
            const updatedRequest = await purchaseRequestAPI.markAsDelivered(id)
            set((state) => ({
                purchaseRequests: state.purchaseRequests.map(req =>
                    req.id === id ? updatedRequest : req
                )
            }))
            toast.success('Purchase request marked as delivered!')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to mark as delivered'
            set({ error: errorMessage })
            toast.error(errorMessage)
        } finally {
            set({ loading: false })
        }
    },

    convertToInvoice: async (id: number) => {
        try {
            set({ loading: true, error: null })
            const newInvoice = await purchaseRequestAPI.convertToInvoice(id)
            set((state) => ({
                invoices: [...state.invoices, newInvoice],
                purchaseRequests: state.purchaseRequests.map(req =>
                    req.id === id ? { ...req, status: 'CONVERTED_TO_INVOICE' } : req
                )
            }))
            toast.success('Purchase request converted to invoice successfully!')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to convert to invoice'
            set({ error: errorMessage })
            toast.error(errorMessage)
        } finally {
            set({ loading: false })
        }
    },

    fetchInvoices: async () => {
        try {
            set({ loading: true, error: null })
            const data = await invoiceAPI.getAll()
            set({ invoices: Array.isArray(data) ? data : [] })
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch invoices'
            set({ error: errorMessage })
            toast.error(errorMessage)
            // Always ensure we have a valid array even on error
            set(state => ({ invoices: Array.isArray(state.invoices) ? state.invoices : [] }))
        } finally {
            set({ loading: false })
        }
    },

    markInvoiceAsPaid: async (id: number) => {
        try {
            set({ loading: true, error: null })
            const updatedInvoice = await invoiceAPI.markAsPaid(id)
            set((state) => ({
                invoices: state.invoices.map(inv =>
                    inv.id === id ? updatedInvoice : inv
                )
            }))
            toast.success('Invoice marked as paid!')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to mark invoice as paid'
            set({ error: errorMessage })
            toast.error(errorMessage)
        } finally {
            set({ loading: false })
        }
    },

    fetchDashboardStatistics: async () => {
        set({ loading: true, error: null })
        try {
            const statistics = await fetchDashboardStatistics()
            set({ dashboardStats: statistics, loading: false })
            console.log("Dashboard statistics loaded successfully")
        } catch (error) {
            console.error("Error fetching dashboard statistics:", error)
            set({ 
                error: error instanceof Error ? error.message : 'Unknown error fetching dashboard statistics', 
                loading: false 
            })
        }
    }
}))