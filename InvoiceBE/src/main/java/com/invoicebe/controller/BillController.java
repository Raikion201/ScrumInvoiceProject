package com.invoicebe.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.invoicebe.model.Bill;
import com.invoicebe.service.BillService;

@RestController
@RequestMapping("/api/bills")
//@CrossOrigin(origins = "http://localhost:3000")
public class BillController {
    @Autowired
    private BillService service;

    @GetMapping("/by-purchase-request/{purchaseRequestId}")
    public ResponseEntity<Bill> getBillByPurchaseRequestId(@PathVariable Long purchaseRequestId) {
        Optional<Bill> bill = service.getBillByPurchaseRequestId(purchaseRequestId);
        return bill.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<Bill>> getAllBills() {
        List<Bill> bills = service.getAllBills();
        return ResponseEntity.ok(bills);
    }
    
    @PutMapping("/{id}/mark-paid")
    public ResponseEntity<Bill> markAsPaid(@PathVariable Long id) {
        return service.markBillAsPaid(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}