package com.invoicebe.service;

import com.invoicebe.model.Invoice; // Import Invoice entity
import com.invoicebe.model.PurchaseRequest;
import com.invoicebe.repository.PurchaseRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PurchaseRequestService {

    private final PurchaseRequestRepository purchaseRequestRepository;
    private final InvoiceService invoiceService; // Inject InvoiceService here

    @Autowired
    public PurchaseRequestService(PurchaseRequestRepository purchaseRequestRepository,
                                  InvoiceService invoiceService) { // Add InvoiceService to constructor
        this.purchaseRequestRepository = purchaseRequestRepository;
        this.invoiceService = invoiceService; // Initialize it
    }

    /**
     * Creates a new Purchase Request and saves it to the database.
     *
     * @param purchaseRequest The PurchaseRequest object to be created.
     * @return The saved PurchaseRequest object, including its generated ID.
     */
    public PurchaseRequest createPurchaseRequest(PurchaseRequest purchaseRequest) {
        // You can set initial status here if not provided in request
        // if (purchaseRequest.getStatus() == null || purchaseRequest.getStatus().isEmpty()) {
        //     purchaseRequest.setStatus("PENDING");
        // }
        return purchaseRequestRepository.save(purchaseRequest);
    }

    /**
     * Retrieves a Purchase Request by its ID.
     * @param id The ID of the purchase request.
     * @return An Optional containing the PurchaseRequest if found, or empty if not.
     */
    public Optional<PurchaseRequest> getPurchaseRequestById(Long id) {
        return purchaseRequestRepository.findById(id);
    }

    /**
     * Retrieves all Purchase Requests.
     * @return A list of all PurchaseRequest objects.
     */
    public List<PurchaseRequest> getAllPurchaseRequests() {
        return purchaseRequestRepository.findAll();
    }

    /**
     * Updates an existing Purchase Request.
     * @param id The ID of the purchase request to update.
     * @param updatedRequest The PurchaseRequest object with updated details.
     * @return An Optional containing the updated PurchaseRequest if found, or empty if not.
     */
    public Optional<PurchaseRequest> updatePurchaseRequest(Long id, PurchaseRequest updatedRequest) {
        return purchaseRequestRepository.findById(id).map(existingRequest -> {
            existingRequest.setCustomerName(updatedRequest.getCustomerName());
            existingRequest.setCustomerEmail(updatedRequest.getCustomerEmail());
            existingRequest.setDescription(updatedRequest.getDescription());
            existingRequest.setTotalAmount(updatedRequest.getTotalAmount());
            existingRequest.setDepositAmount(updatedRequest.getDepositAmount());
            existingRequest.setDueDate(updatedRequest.getDueDate());
            existingRequest.setStatus(updatedRequest.getStatus());
            existingRequest.setIsPaid(updatedRequest.getIsPaid());
            existingRequest.setInvoiceDate(updatedRequest.getInvoiceDate());
            existingRequest.setInvoiceNumber(updatedRequest.getInvoiceNumber());

            return purchaseRequestRepository.save(existingRequest);
        });
    }

    /**
     * Deletes a Purchase Request by its ID.
     * @param id The ID of the purchase request to delete.
     * @return True if the purchase request was deleted, false otherwise.
     */
    public boolean deletePurchaseRequest(Long id) {
        if (purchaseRequestRepository.existsById(id)) {
            purchaseRequestRepository.deleteById(id);
            return true;
        }
        return false;
    }

    /**
     * Converts a Purchase Request into an Invoice and establishes the relationship.
     *
     * @param purchaseRequestId The ID of the PurchaseRequest to convert.
     * @return An Optional containing the newly created Invoice if conversion is successful,
     * or empty if the PurchaseRequest is not found or already converted.
     */
    public Optional<Invoice> convertPurchaseRequestToInvoice(Long purchaseRequestId) {
        return purchaseRequestRepository.findById(purchaseRequestId).map(purchaseRequest -> {
            // Check if it's already converted (optional, but good practice)
            if ("CONVERTED_TO_INVOICE".equals(purchaseRequest.getStatus())) {
                // Or throw a custom exception
                return null; // Indicates it's already processed
            }

            // 1. Create a new Invoice object from PurchaseRequest data
            Invoice newInvoice = Invoice.builder()
                    .invoiceNumber(purchaseRequest.getInvoiceNumber())
                    .customerName(purchaseRequest.getCustomerName())
                    .customerEmail(purchaseRequest.getCustomerEmail())
                    .amount(purchaseRequest.getTotalAmount()) // Use totalAmount for Invoice amount
                    .invoiceDate(purchaseRequest.getInvoiceDate())
                    .dueDate(purchaseRequest.getDueDate())
                    .description("Generated from Purchase Request: " + purchaseRequest.getDescription())
                    .paid(purchaseRequest.getIsPaid())
                    .purchaseRequest(purchaseRequest) // IMPORTANT: Set the relationship here!
                    .build();

            // 2. Save the new Invoice using InvoiceService
            Invoice createdInvoice = invoiceService.createInvoice(newInvoice);

            // 3. Update the PurchaseRequest status and link to the created Invoice
            purchaseRequest.setStatus("CONVERTED_TO_INVOICE");
            purchaseRequest.setInvoice(createdInvoice); // Set the inverse side of the relationship
            purchaseRequestRepository.save(purchaseRequest); // Save the updated PurchaseRequest

            return createdInvoice;
        });
    }

    /**
     * Retrieves purchase requests based on provided filters.
     *
     * @param status The status to filter by (can be null for no filtering)
     * @param startDueDate The start date for due date filtering (can be null)
     * @param endDueDate The end date for due date filtering (can be null)
     * @param isPaid Filter by payment status (can be null)
     * @return A list of PurchaseRequest objects matching the filter criteria
     */
    public List<PurchaseRequest> getPurchaseRequests(String status, LocalDate startDueDate, LocalDate endDueDate, Boolean isPaid) {
        return purchaseRequestRepository.findByFilters(status, startDueDate, endDueDate, isPaid);
    }

    /**
     * Marks a purchase request as delivered and optionally converts it to an invoice.
     *
     * @param id The ID of the purchase request to mark as delivered.
     * @return An Optional containing the updated PurchaseRequest if found, or empty if not.
     */
    public Optional<PurchaseRequest> markAsDelivered(Long id) {
        return purchaseRequestRepository.findById(id).map(req -> {
            if (!"DELIVERED".equals(req.getStatus())) {
                req.setStatus("DELIVERED");
                
                // Auto-generate invoice if not exists
                if (req.getInvoiceNumber() == null || req.getInvoiceNumber().isEmpty()) {
                    // Convert to invoice
                    convertPurchaseRequestToInvoice(id);
                }
            }
            return purchaseRequestRepository.save(req);
        });
    }

    /**
     * Automatically generates a bill for a delivered purchase request.
     *
     * @param id The ID of the purchase request for which to generate a bill.
     * @return An Optional containing the updated PurchaseRequest if found and status is DELIVERED,
     *         or empty if not found or not in DELIVERED status.
     */
    public Optional<PurchaseRequest> autoGenerateBill(Long id) {
        return purchaseRequestRepository.findById(id).map(req -> {
            if (!"DELIVERED".equalsIgnoreCase(req.getStatus())) {
                return null; // Not in correct status
            }
            
            // Generate invoice number
            String invoiceNumber = "INV-" + req.getId() + "-" + LocalDate.now().toString().replaceAll("-", "");
            req.setInvoiceNumber(invoiceNumber);
            req.setInvoiceDate(LocalDate.now());
            req.setIsPaid(true);
            return purchaseRequestRepository.save(req);
        });
    }

    /**
     * Retrieves dashboard statistics for purchase requests.
     * 
     * @return A map containing various statistics for the dashboard.
     */
    public Map<String, Object> getDashboardStatistics() {
        System.out.println("Calculating purchase request statistics for dashboard");
        
        List<PurchaseRequest> allRequests = purchaseRequestRepository.findAll();
        
        System.out.println("Total purchase requests: " + allRequests.size());
        
        Map<String, Object> statistics = new HashMap<>();
        
        // Count by status
        Map<String, Long> countByStatus = allRequests.stream()
                .collect(Collectors.groupingBy(
                        PurchaseRequest::getStatus,
                        Collectors.counting()
                ));
        statistics.put("countByStatus", countByStatus);
        System.out.println("Request count by status: " + countByStatus);
        
        // Calculate total amount
        BigDecimal totalAmount = allRequests.stream()
                .map(PurchaseRequest::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        statistics.put("totalAmount", totalAmount);
        System.out.println("Total amount of all requests: " + totalAmount);
        
        // Calculate paid amount
        BigDecimal paidAmount = allRequests.stream()
                .filter(PurchaseRequest::getIsPaid)
                .map(PurchaseRequest::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        statistics.put("paidAmount", paidAmount);
        System.out.println("Total paid amount: " + paidAmount);
        
        // Count overdue requests
        LocalDate today = LocalDate.now();
        long overdueCount = allRequests.stream()
                .filter(req -> "PENDING".equals(req.getStatus()))
                .filter(req -> req.getDueDate().isBefore(today))
                .count();
        statistics.put("overdueCount", overdueCount);
        System.out.println("Overdue requests: " + overdueCount);
        
        // Recent requests (last 7 days)
        LocalDate weekAgo = today.minusDays(7);
        List<PurchaseRequest> recentRequests = allRequests.stream()
                .filter(req -> req.getInvoiceDate().isAfter(weekAgo))
                .collect(Collectors.toList());
        statistics.put("recentRequestsCount", recentRequests.size());
        System.out.println("Recent requests (last 7 days): " + recentRequests.size());
        
        // Get 5 most recent requests for display
        List<PurchaseRequest> latestRequests = allRequests.stream()
                .sorted((r1, r2) -> r2.getInvoiceDate().compareTo(r1.getInvoiceDate()))
                .limit(5)
                .collect(Collectors.toList());
        statistics.put("latestRequests", latestRequests);
        System.out.println("Latest 5 requests retrieved for dashboard");
        
        return statistics;
    }
}