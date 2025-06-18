package com.invoicebe.controller;

<<<<<<< Updated upstream
import com.invoicebe.entity.PurchaseRequest;
import com.invoicebe.service.PurchaseRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
=======
import com.invoicebe.model.PurchaseRequest;
import com.invoicebe.repository.PurchaseRequestRepository;
import com.invoicebe.model.Invoice;
import com.invoicebe.service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
>>>>>>> Stashed changes
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
<<<<<<< Updated upstream

@RestController
@RequestMapping("/api/purchase-requests")
@CrossOrigin(origins = "http://localhost:3000")
public class PurchaseRequestController {
    @Autowired
    private PurchaseRequestService service;

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
}}
}
=======
import java.util.Optional;

@RestController
@RequestMapping("/api/purchase-requests")
public class PurchaseRequestController {
    @Autowired
    private PurchaseRequestRepository purchaseRequestRepository;

    @Autowired
    private InvoiceService invoiceService;

    @GetMapping
    public List<PurchaseRequest> getAllRequests() {
        return purchaseRequestRepository.findAll();
    }

    @PostMapping
    public PurchaseRequest createRequest(@RequestBody PurchaseRequest request) {
        request.setStatus("pending");
        request.setPaid(false);
        request.setInvoiceDate(LocalDate.now());
        return purchaseRequestRepository.save(request);
    }

    @PutMapping("/{id}/mark-delivered")
    public ResponseEntity<PurchaseRequest> markAsDelivered(@PathVariable Long id) {
        Optional<PurchaseRequest> optional = purchaseRequestRepository.findById(id);
        if (optional.isPresent()) {
            PurchaseRequest req = optional.get();
            if (!"delivered".equals(req.getStatus())) {
                req.setStatus("delivered");
                // Auto-generate invoice if not exists
                if (req.getInvoiceNumber() == null || req.getInvoiceNumber().isEmpty()) {
                    Invoice invoice = new Invoice();
                    invoice.invoiceNumber = "INV-" + System.currentTimeMillis();
                    invoice.customerName = req.getCustomerName();
                    invoice.customerEmail = req.getCustomerEmail();
                    invoice.amount = req.getTotalAmount();
                    invoice.invoiceDate = req.getInvoiceDate();
                    invoice.dueDate = req.getDueDate();
                    invoice.description = req.getDescription();
                    invoice.paid = req.isPaid();
                    Invoice savedInvoice = invoiceService.createInvoice(invoice);
                    req.setInvoiceNumber(savedInvoice.invoiceNumber);
                }
            }
            return ResponseEntity.ok(purchaseRequestRepository.save(req));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<PurchaseRequest> updateRequest(@PathVariable Long id, @RequestBody PurchaseRequest update) {
        Optional<PurchaseRequest> optional = purchaseRequestRepository.findById(id);
        if (optional.isPresent()) {
            PurchaseRequest req = optional.get();
            req.setCustomerEmail(update.getCustomerEmail());
            req.setCustomerName(update.getCustomerName());
            req.setDescription(update.getDescription());
            req.setTotalAmount(update.getTotalAmount());
            req.setDepositAmount(update.getDepositAmount());
            req.setDueDate(update.getDueDate());
            req.setInvoiceNumber(update.getInvoiceNumber());
            // Không update status/paid/invoiceDate ở đây
            return ResponseEntity.ok(purchaseRequestRepository.save(req));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/auto-generate-bill")
    public ResponseEntity<PurchaseRequest> autoGenerateBill(@PathVariable Long id) {
        Optional<PurchaseRequest> optional = purchaseRequestRepository.findById(id);
        if (optional.isPresent()) {
            PurchaseRequest req = optional.get();
            if (!"delivered".equalsIgnoreCase(req.getStatus())) {
                return ResponseEntity.badRequest().body(null);
            }
            // Sinh số hóa đơn tự động (ví dụ: "INV-" + id + "-" + yyyyMMdd)
            String invoiceNumber = "INV-" + req.getId() + "-" + java.time.LocalDate.now().toString().replaceAll("-", "");
            req.setInvoiceNumber(invoiceNumber);
            req.setInvoiceDate(java.time.LocalDate.now());
            req.setPaid(true);
            return ResponseEntity.ok(purchaseRequestRepository.save(req));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
>>>>>>> Stashed changes
