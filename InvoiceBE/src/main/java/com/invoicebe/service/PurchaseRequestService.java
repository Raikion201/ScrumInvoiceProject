package com.invoicebe.service;

import com.invoicebe.entity.PurchaseRequest;
import com.invoicebe.entity.PurchaseRequest.Status;
import com.invoicebe.repository.PurchaseRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PurchaseRequestService {
    @Autowired
    private PurchaseRequestRepository repository;

    public List<PurchaseRequest> getPurchaseRequests(String status, LocalDate startDueDate, LocalDate endDueDate, Boolean isPaid) {
        Status statusEnum = status != null ? Status.valueOf(status.toUpperCase()) : null;
        return repository.findByFilters(statusEnum, startDueDate, endDueDate, isPaid);
    }
}