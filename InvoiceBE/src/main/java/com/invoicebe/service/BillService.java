package com.invoicebe.service;

import com.invoicebe.model.Bill;
import com.invoicebe.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BillService {
    @Autowired
    private BillRepository repository;

    public Optional<Bill> getBillByPurchaseRequestId(Long purchaseRequestId) {
        return repository.findByPurchaseRequestId(purchaseRequestId);
    }
}