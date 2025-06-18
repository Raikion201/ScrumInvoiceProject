package com.invoicebe.controller;

import com.invoicebe.model.Invoice; // Import Invoice
import jakarta.validation.Valid;
import com.invoicebe.model.PurchaseRequest;
import com.invoicebe.service.PurchaseRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/purchase-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseRequestController {
    private final PurchaseRequestService purchaseRequestService;

    @Autowired
    private PurchaseRequestService service;
    public PurchaseRequestController(PurchaseRequestService purchaseRequestService) {
        this.purchaseRequestService = purchaseRequestService;
    }

    @GetMapping
    public ResponseEntity<List<PurchaseRequest>> getPurchaseRequests(
        @RequestParam(required = false) String status,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDueDate,
        @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDueDate,
        @RequestParam(required = false) Boolean isPaid
    ) {
        try {
            List<PurchaseRequest> requests = service.getPurchaseRequests(status, startDueDate, endDueDate, isPaid);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }
    public ResponseEntity<List<PurchaseRequest>> getAllPurchaseRequests() {
        return ResponseEntity.ok(purchaseRequestService.getAllPurchaseRequests());
    }

        @GetMapping("/{id}")
    public ResponseEntity<PurchaseRequest> getPurchaseRequestById(@PathVariable Long id) {
        return purchaseRequestService.getPurchaseRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseRequest> updatePurchaseRequest(@PathVariable Long id, @Valid @RequestBody PurchaseRequest purchaseRequest) {
        return purchaseRequestService.updatePurchaseRequest(id, purchaseRequest)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseRequest(@PathVariable Long id) {
        if (purchaseRequestService.deletePurchaseRequest(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Endpoint to convert a Purchase Request to an Invoice.
     * @param id The ID of the PurchaseRequest to convert.
     * @return ResponseEntity with the created Invoice and HTTP status 201 Created on success,
     * or 404 Not Found if the PurchaseRequest does not exist.
     */
    @PutMapping("/{id}/convert-to-invoice") // New endpoint
    public ResponseEntity<Invoice> convertPurchaseRequestToInvoice(@PathVariable Long id) {
        Optional<Invoice> convertedInvoice = purchaseRequestService.convertPurchaseRequestToInvoice(id);

        return convertedInvoice
                .map(invoice -> new ResponseEntity<>(invoice, HttpStatus.CREATED)) // Return 201 Created for the new Invoice
                .orElse(ResponseEntity.notFound().build()); // 404 if PR not found or already converted
    }
}