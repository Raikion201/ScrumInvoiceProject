package com.invoicebe.service;

import com.invoicebe.model.Invoice; // Import Invoice entity

import com.invoicebe.model.PurchaseRequest;
import com.invoicebe.repository.PurchaseRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PurchaseRequestService {
    private final PurchaseRequestRepository purchaseRequestRepository;
    private final InvoiceService invoiceService; // Inject InvoiceService here

    @Autowired
    private PurchaseRequestRepository repository;

    public List<PurchaseRequest> getPurchaseRequests(String status, LocalDate startDueDate, LocalDate endDueDate, Boolean isPaid) {
        String statusEnum = status != null ? status.toUpperCase() : null;
        return repository.findByFilters(statusEnum, startDueDate, endDueDate, isPaid);
    }

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
            //purchaseRequest.setStatus("CONVERTED_TO_INVOICE");
            purchaseRequest.setInvoice(createdInvoice); // Set the inverse side of the relationship
            purchaseRequestRepository.save(purchaseRequest); // Save the updated PurchaseRequest

            return createdInvoice;
        });
    }
}