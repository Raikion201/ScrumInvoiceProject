package com.invoicebe.controller;

import com.invoicebe.model.Bill;
import com.invoicebe.service.BillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/bills")
@CrossOrigin(origins = "http://localhost:3000")
public class BillController {
    @Autowired
    private BillService service;

    @GetMapping("/by-purchase-request/{purchaseRequestId}")
    public ResponseEntity<Bill> getBillByPurchaseRequestId(@PathVariable Long purchaseRequestId) {
        Optional<Bill> bill = service.getBillByPurchaseRequestId(purchaseRequestId);
        return bill.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
}