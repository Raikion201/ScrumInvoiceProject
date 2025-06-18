package com.invoicebe.controller;

import com.invoicebe.entity.PurchaseRequest;
import com.invoicebe.service.PurchaseRequestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

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
}