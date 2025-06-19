// package com.invoicebe.controller;

// import com.invoicebe.model.Invoice; // Import Invoice
// import com.invoicebe.model.PurchaseRequest;
// import com.invoicebe.service.PurchaseRequestService;
// import jakarta.validation.Valid;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.util.List;
// import java.util.Optional;

// @RestController
// @RequestMapping("/api/purchase-requests")
// public class PurchaseRequestController {

//     private final PurchaseRequestService purchaseRequestService;

//     @Autowired
//     public PurchaseRequestController(PurchaseRequestService purchaseRequestService) {
//         this.purchaseRequestService = purchaseRequestService;
//     }

//     @PostMapping
//     public ResponseEntity<PurchaseRequest> createPurchaseRequest(@Valid @RequestBody PurchaseRequest purchaseRequest) {
//         PurchaseRequest createdRequest = purchaseRequestService.createPurchaseRequest(purchaseRequest);
//         return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
//     }

//     @GetMapping
//     public ResponseEntity<List<PurchaseRequest>> getAllPurchaseRequests() {
//         return ResponseEntity.ok(purchaseRequestService.getAllPurchaseRequests());
//     }

//     @GetMapping("/{id}")
//     public ResponseEntity<PurchaseRequest> getPurchaseRequestById(@PathVariable Long id) {
//         return purchaseRequestService.getPurchaseRequestById(id)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @PutMapping("/{id}")
//     public ResponseEntity<PurchaseRequest> updatePurchaseRequest(@PathVariable Long id, @Valid @RequestBody PurchaseRequest purchaseRequest) {
//         return purchaseRequestService.updatePurchaseRequest(id, purchaseRequest)
//                 .map(ResponseEntity::ok)
//                 .orElse(ResponseEntity.notFound().build());
//     }

//     @DeleteMapping("/{id}")
//     public ResponseEntity<Void> deletePurchaseRequest(@PathVariable Long id) {
//         if (purchaseRequestService.deletePurchaseRequest(id)) {
//             return ResponseEntity.noContent().build();
//         }
//         return ResponseEntity.notFound().build();
//     }

//     /**
//      * Endpoint to convert a Purchase Request to an Invoice.
//      * @param id The ID of the PurchaseRequest to convert.
//      * @return ResponseEntity with the created Invoice and HTTP status 201 Created on success,
//      * or 404 Not Found if the PurchaseRequest does not exist.
//      */
//     @PutMapping("/{id}/convert-to-invoice") // New endpoint
//     public ResponseEntity<Invoice> convertPurchaseRequestToInvoice(@PathVariable Long id) {
//         Optional<Invoice> convertedInvoice = purchaseRequestService.convertPurchaseRequestToInvoice(id);

//         return convertedInvoice
//                 .map(invoice -> new ResponseEntity<>(invoice, HttpStatus.CREATED)) // Return 201 Created for the new Invoice
//                 .orElse(ResponseEntity.notFound().build()); // 404 if PR not found or already converted
// }
package com.invoicebe.controller;

import com.invoicebe.model.Invoice;
import com.invoicebe.model.PurchaseRequest;
import com.invoicebe.service.PurchaseRequestService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public PurchaseRequestController(PurchaseRequestService purchaseRequestService) {
        this.purchaseRequestService = purchaseRequestService;
    }

    // Create
    @PostMapping
    public ResponseEntity<PurchaseRequest> createPurchaseRequest(@Valid @RequestBody PurchaseRequest purchaseRequest) {
        PurchaseRequest createdRequest = purchaseRequestService.createPurchaseRequest(purchaseRequest);
        return new ResponseEntity<>(createdRequest, HttpStatus.CREATED);
    }

    // Get All
    @GetMapping
    public ResponseEntity<List<PurchaseRequest>> getPurchaseRequests(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDueDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDueDate,
            @RequestParam(required = false) Boolean isPaid
    ) {
        try {
            List<PurchaseRequest> requests = purchaseRequestService.getPurchaseRequests(status, startDueDate, endDueDate, isPaid);
            return ResponseEntity.ok(requests);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }

    // Get by ID
    @GetMapping("/{id}")
    public ResponseEntity<PurchaseRequest> getPurchaseRequestById(@PathVariable Long id) {
        return purchaseRequestService.getPurchaseRequestById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update
    @PutMapping("/{id}")
    public ResponseEntity<PurchaseRequest> updatePurchaseRequest(@PathVariable Long id, @Valid @RequestBody PurchaseRequest request) {
        return purchaseRequestService.updatePurchaseRequest(id, request)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePurchaseRequest(@PathVariable Long id) {
        if (purchaseRequestService.deletePurchaseRequest(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    // Convert to Invoice
    @PutMapping("/{id}/convert-to-invoice")
    public ResponseEntity<Invoice> convertPurchaseRequestToInvoice(@PathVariable Long id) {
        Optional<Invoice> invoice = purchaseRequestService.convertPurchaseRequestToInvoice(id);
        return invoice.map(i -> new ResponseEntity<>(i, HttpStatus.CREATED))
                .orElse(ResponseEntity.notFound().build());
    }

    // Mark as Delivered
    @PutMapping("/{id}/mark-delivered")
    public ResponseEntity<PurchaseRequest> markAsDelivered(@PathVariable Long id) {
        return purchaseRequestService.markAsDelivered(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Auto-generate Bill
    @PostMapping("/{id}/auto-generate-bill")
    public ResponseEntity<PurchaseRequest> autoGenerateBill(@PathVariable Long id) {
        Optional<PurchaseRequest> updated = purchaseRequestService.autoGenerateBill(id);
        return updated.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    /**
     * Retrieves dashboard statistics for purchase requests
     * @return Dashboard statistics including counts by status, amounts, and recent requests
     */
    @GetMapping("/dashboard")
    public ResponseEntity<?> getDashboardStatistics() {
        try {
            System.out.println("Fetching dashboard statistics for purchase requests...");
            var statistics = purchaseRequestService.getDashboardStatistics();
            System.out.println("Dashboard statistics retrieved successfully");
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            System.err.println("Error fetching dashboard statistics: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching dashboard statistics");
        }
    }

    // Mark as Shipped (moves to Bills)
    @PutMapping("/{id}/mark-shipped")
    public ResponseEntity<PurchaseRequest> markAsShipped(@PathVariable Long id) {
        System.out.println("Marking purchase request #" + id + " as shipped");
        return purchaseRequestService.markAsShipped(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Mark as Paid (moves to Invoices)
    @PutMapping("/{id}/mark-paid")
    public ResponseEntity<PurchaseRequest> markAsPaid(@PathVariable Long id) {
        System.out.println("Marking bill #" + id + " as paid");
        return purchaseRequestService.markAsPaid(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Get all bills (shipped requests)
    @GetMapping("/bills")
    public ResponseEntity<List<PurchaseRequest>> getBills() {
        try {
            List<PurchaseRequest> bills = purchaseRequestService.getAllBills();
            System.out.println("Retrieved " + bills.size() + " bills");
            return ResponseEntity.ok(bills);
        } catch (Exception e) {
            System.err.println("Error retrieving bills: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
    
    // Get all paid requests (invoices)
    @GetMapping("/paid")
    public ResponseEntity<List<PurchaseRequest>> getPaidRequests() {
        try {
            List<PurchaseRequest> paid = purchaseRequestService.getAllPaidRequests();
            System.out.println("Retrieved " + paid.size() + " paid requests");
            return ResponseEntity.ok(paid);
        } catch (Exception e) {
            System.err.println("Error retrieving paid requests: " + e.getMessage());
            return ResponseEntity.status(500).body(null);
        }
    }
}
